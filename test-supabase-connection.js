require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║       🔌 TEST CONNEXION SUPABASE                         ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

console.log('URL:', url);
console.log('Anon Key:', key?.slice(0, 50) + '...\n');

if (!url || !key) {
  console.error('❌ Variables d\'environnement manquantes !');
  console.error('   Vérifier que .env.local existe et contient :');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

(async () => {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test 1 : Connexion de base
    console.log('📡 Test 1: Connexion à la base de données...');
    const { data, error } = await supabase
      .from('evidences')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('   ⚠️  Table "evidences" n\'existe pas encore');
        console.log('   ℹ️  NORMAL - le schéma SQL n\'a pas encore été exécuté');
        console.log('   ✅ Mais la connexion fonctionne !\n');
      } else if (error.message.includes('JWT') || error.message.includes('token')) {
        console.error('   ❌ Erreur d\'authentification:', error.message);
        console.error('   💡 Vérifier que les clés sont correctes');
        process.exit(1);
      } else {
        console.error('   ❌ Erreur:', error.message);
        process.exit(1);
      }
    } else {
      console.log('   ✅ Connexion réussie !');
      console.log('   📊 Count actuel:', data);
    }
    
    // Test 2 : Storage
    console.log('📦 Test 2: Storage buckets...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.log('   ⚠️  Erreur storage:', bucketError.message);
    } else {
      console.log('   ✅ Storage accessible');
      if (buckets && buckets.length > 0) {
        console.log('   📁 Buckets:', buckets.map(b => b.name).join(', '));
      } else {
        console.log('   📁 Buckets: aucun (normal - pas encore créés)');
      }
    }
    
    // Test 3 : Auth
    console.log('\n🔐 Test 3: Service d\'authentification...');
    const { data: session } = await supabase.auth.getSession();
    console.log('   ✅ Auth service accessible');
    console.log('   👤 Session:', session.session ? 'Active' : 'Aucune (normal)');
    
    // Résumé
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║  ✅ CONNEXION SUPABASE RÉUSSIE !                         ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    
    console.log('📋 Prochaines étapes :');
    console.log('   1. Exécuter le schéma SQL (créer tables)');
    console.log('   2. Migrer les données PocketBase');
    console.log('   3. Tests E2E');
    console.log('   4. 🎉 Migration terminée !\n');
    
  } catch (err) {
    console.error('\n❌ Test échoué:', err.message);
    console.error('\n💡 Dépannage :');
    console.error('   1. Vérifier que l\'URL est correcte (Kong gateway)');
    console.error('   2. Vérifier que les clés commencent par "eyJ"');
    console.error('   3. Vérifier que les services Supabase tournent :');
    console.error('      docker ps | grep supabase');
    console.error('   4. Vérifier les logs Kong :');
    console.error('      docker logs supabase-kong-rkgssw4wk8owsk4w080o0wg0\n');
    process.exit(1);
  }
})();
