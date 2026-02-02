require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║       🔍 VÉRIFICATION SCHÉMA SUPABASE                    ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

(async () => {
  const tables = ['profiles', 'evidences', 'activities', 'ceredis_scores'];
  let allSuccess = true;
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      console.log(`✅ ${table.padEnd(20)} → ${count ?? 0} ligne(s)`);
    } catch (err) {
      console.log(`❌ ${table.padEnd(20)} → ERREUR: ${err.message}`);
      allSuccess = false;
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (allSuccess) {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  ✅ SCHÉMA SUPABASE DÉPLOYÉ AVEC SUCCÈS !               ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    console.log('📋 Prochaines étapes :');
    console.log('   1. Tester l\'application (npm run dev)');
    console.log('   2. Migrer les données PocketBase');
    console.log('   3. Tests E2E');
    console.log('   4. 🎉 Migration terminée !\n');
  } else {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  ⚠️  SCHÉMA NON DÉPLOYÉ                                  ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    console.log('📋 Actions requises :');
    console.log('   1. Ouvrir Supabase Studio');
    console.log('   2. SQL Editor → New Query');
    console.log('   3. Copier-coller dossier-migration/SUPABASE_SCHEMA.sql');
    console.log('   4. Cliquer sur Run');
    console.log('   5. Relancer ce test\n');
    console.log('📚 Guide complet : dossier-migration/DEPLOY_SCHEMA.md\n');
  }
})();
