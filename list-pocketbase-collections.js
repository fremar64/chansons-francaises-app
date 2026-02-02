require('dotenv').config({ path: '.env.local' });
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

(async () => {
  try {
    // Auth admin
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL,
      process.env.PB_ADMIN_PASSWORD
    );
    
    console.log('\n📋 Collections disponibles dans PocketBase:\n');
    
    // Lister toutes les collections
    const collections = await pb.collections.getFullList({ sort: 'name' });
    
    for (const col of collections) {
      try {
        const count = await pb.collection(col.name).getList(1, 1);
        console.log(`✅ ${col.name.padEnd(30)} → ${count.totalItems} enregistrements`);
      } catch (err) {
        console.log(`❌ ${col.name.padEnd(30)} → Erreur: ${err.message}`);
      }
    }
    
    console.log('\n');
  } catch (error) {
    console.error('Erreur:', error.message);
  }
})();
