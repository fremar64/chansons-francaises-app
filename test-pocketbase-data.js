require('dotenv').config({ path: '.env.local' });
const PocketBase = require('pocketbase').default;

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

(async () => {
  console.log('\n📊 Comptage données PocketBase...\n');
  
  const collections = ['users', 'evidences', 'progression', 'ceredis_scores'];
  
  for (const col of collections) {
    try {
      const result = await pb.collection(col).getList(1, 1);
      console.log(`✅ ${col.padEnd(20)} → ${result.totalItems} enregistrements`);
    } catch (err) {
      console.log(`❌ ${col.padEnd(20)} → ERREUR: ${err.message}`);
    }
  }
  
  console.log('\n');
})();
