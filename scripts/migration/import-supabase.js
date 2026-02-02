#!/usr/bin/env node
/**
 * Import to Supabase
 * 
 * Importe les données transformées vers Supabase PostgreSQL
 * Utilise le service role key pour bypasser RLS
 * 
 * Référence : MIGRATION_MASTER_PLAN.md - Jour 4
 * 
 * Usage: node scripts/migration/import-supabase.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env.local') });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TRANSFORM_DIR = path.join(__dirname, '../../transformed');
const BATCH_SIZE = 1000;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function importCollection(supabase, tableName, filePath) {
  console.log(`\n📥 Importing ${tableName}...`);
  
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    console.log(`   Found ${data.length} records`);
    
    let imported = 0;
    let errors = 0;
    
    // Importer par batches pour éviter timeouts
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      
      const { data: inserted, error } = await supabase
        .from(tableName)
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`   ❌ Batch ${i / BATCH_SIZE + 1} failed:`, error.message);
        errors += batch.length;
      } else {
        imported += inserted.length;
        console.log(`   ✅ Imported batch ${Math.floor(i / BATCH_SIZE) + 1} (${inserted.length} records)`);
      }
    }
    
    console.log(`✅ ${tableName}: ${imported} imported, ${errors} errors`);
    return { imported, errors };
  } catch (error) {
    console.error(`❌ Error importing ${tableName}:`, error.message);
    return { imported: 0, errors: 0 };
  }
}

async function verifyImport(supabase, tableName, expectedCount) {
  const { count, error } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error(`❌ Error verifying ${tableName}:`, error.message);
    return false;
  }
  
  const match = count === expectedCount;
  console.log(`   ${match ? '✅' : '⚠️'} ${tableName}: ${count} / ${expectedCount} records`);
  return match;
}

async function importProfiles(supabase, filePath) {
  console.log(`\n📥 Importing profiles (auth.users + public.profiles)...`);
  
  try {
    const profiles = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    console.log(`   Found ${profiles.length} profiles`);
    
    let imported = 0;
    let errors = 0;
    
    for (const profile of profiles) {
      // 1. Créer l'utilisateur dans auth.users avec service role key
      // Note: Les mots de passe PocketBase ne peuvent pas être migrés (hashing différent)
      // On crée un mot de passe temporaire que l'utilisateur devra changer
      const tempPassword = `Temp-${Math.random().toString(36).slice(2, 10)}!`;
      
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: profile.email,
        password: tempPassword,
        email_confirm: true, // Auto-confirmer l'email
        user_metadata: {
          name: profile.name,
          username: profile.username,
          role: profile.role
        }
      });
      
      if (authError) {
        console.error(`   ❌ Failed to create auth user ${profile.email}:`, authError.message);
        errors++;
        continue;
      }
      
      console.log(`   ✅ Created auth user: ${profile.email} (ID: ${authUser.user.id})`);
      console.log(`      Temp password: ${tempPassword} (user must reset)`);
      
      // 2. Créer le profil public avec l'ID d'auth
      const publicProfile = {
        ...profile,
        id: authUser.user.id // Utiliser l'ID généré par auth.users
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert(publicProfile);
      
      if (profileError) {
        console.error(`   ❌ Failed to create profile ${profile.email}:`, profileError.message);
        errors++;
        continue;
      }
      
      imported++;
      console.log(`   ✅ Created profile for: ${profile.name}`);
    }
    
    console.log(`✅ profiles: ${imported} imported, ${errors} errors`);
    return { imported, errors };
  } catch (error) {
    console.error(`❌ Error importing profiles:`, error.message);
    return { imported: 0, errors: 0 };
  }
}

async function main() {
  console.log('🚀 Starting Supabase import...');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}\n`);
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  const stats = {};
  
  // 1. D'abord importer les profiles (crée auth.users + public.profiles)
  const profilesPath = path.join(TRANSFORM_DIR, 'profiles.json');
  stats.profiles = await importProfiles(supabase, profilesPath);
  
  // 2. Ensuite importer les autres collections
  const collections = ['evidences', 'activities'];
  
  for (const collection of collections) {
    const filePath = path.join(TRANSFORM_DIR, `${collection}.json`);
    stats[collection] = await importCollection(supabase, collection, filePath);
  }
  
  // Vérifier l'import
  console.log('\n🔍 Verifying import...');
  await verifyImport(supabase, 'profiles', stats.profiles.imported);
  for (const collection of collections) {
    const expected = stats[collection].imported;
    await verifyImport(supabase, collection, expected);
  }
  
  // Sauvegarder statistiques
  const statsPath = path.join(TRANSFORM_DIR, '_import_stats.json');
  await fs.writeFile(statsPath, JSON.stringify({
    importedAt: new Date().toISOString(),
    supabaseUrl: SUPABASE_URL,
    collections: stats,
    totalImported: Object.values(stats).reduce((sum, s) => sum + s.imported, 0),
    totalErrors: Object.values(stats).reduce((sum, s) => sum + s.errors, 0)
  }, null, 2));
  
  console.log('\n✨ Import complete!');
  console.log(`📊 Total imported: ${Object.values(stats).reduce((sum, s) => sum + s.imported, 0)}`);
  console.log(`⚠️  Total errors: ${Object.values(stats).reduce((sum, s) => sum + s.errors, 0)}`);
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
