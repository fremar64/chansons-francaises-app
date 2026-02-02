#!/usr/bin/env node
/**
 * Export PocketBase Data
 * 
 * Script pour exporter toutes les données de PocketBase avant migration
 * Référence : MIGRATION_MASTER_PLAN.md - Jour 1
 * 
 * Usage: node scripts/migration/export-pocketbase.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env.local') });
const PocketBase = require('pocketbase/cjs');
const fs = require('fs').promises;
const path = require('path');

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;
const EXPORT_DIR = path.join(__dirname, '../../exports');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function exportCollection(pb, collectionName) {
  console.log(`\n📦 Exporting ${collectionName}...`);
  
  try {
    // Essayer d'abord avec getFullList simple
    let records;
    try {
      records = await pb.collection(collectionName).getFullList({
        $autoCancel: false
      });
    } catch (err) {
      // Si échec, essayer getList avec pagination
      console.log(`   ⚠️  getFullList failed, trying getList...`);
      const result = await pb.collection(collectionName).getList(1, 500, {
        $autoCancel: false
      });
      records = result.items;
    }
    
    const filePath = path.join(EXPORT_DIR, `${collectionName}.json`);
    await fs.writeFile(filePath, JSON.stringify(records, null, 2));
    
    console.log(`✅ Exported ${records.length} records from ${collectionName}`);
    return records.length;
  } catch (error) {
    console.error(`❌ Error exporting ${collectionName}:`, error.message);
    // Sauvegarder un fichier vide pour tracer l'erreur
    const filePath = path.join(EXPORT_DIR, `${collectionName}.json`);
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
    return 0;
  }
}

async function main() {
  console.log('🚀 Starting PocketBase export...');
  console.log(`📍 PocketBase URL: ${POCKETBASE_URL}`);
  
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('\n❌ Missing admin credentials!');
    console.error('   Please set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD in .env.local');
    process.exit(1);
  }
  
  await ensureDir(EXPORT_DIR);
  
  const pb = new PocketBase(POCKETBASE_URL);
  
  // Authentification admin
  try {
    console.log(`🔐 Authenticating as ${ADMIN_EMAIL}...`);
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authentication successful!\n');
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    console.error('   Please check PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD in .env.local');
    process.exit(1);
  }
  
  // Collections à exporter (basées sur les données réelles PocketBase)
  const collections = [
    'users',
    'chansons',
    'seances',
    'evidences',
    'progression',
    'competences',
    'evaluations_competences',
    'reponses'
  ];
  
  const stats = {};
  
  for (const collection of collections) {
    stats[collection] = await exportCollection(pb, collection);
  }
  
  // Sauvegarder statistiques
  const statsPath = path.join(EXPORT_DIR, '_export_stats.json');
  await fs.writeFile(statsPath, JSON.stringify({
    exportedAt: new Date().toISOString(),
    pocketbaseUrl: POCKETBASE_URL,
    collections: stats,
    totalRecords: Object.values(stats).reduce((sum, count) => sum + count, 0)
  }, null, 2));
  
  console.log('\n✨ Export complete!');
  console.log(`📁 Files saved to: ${EXPORT_DIR}`);
  console.log(`📊 Total records: ${Object.values(stats).reduce((sum, count) => sum + count, 0)}`);
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
