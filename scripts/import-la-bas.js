// scripts/import-la-bas.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const PocketBase = require('pocketbase/cjs');
const fs = require('fs');
const path = require('path');

const chansonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/parcours/la-bas/chanson.json'), 'utf-8')
);

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

async function main() {
  const pb = new PocketBase(POCKETBASE_URL);

  // Authentification admin si nécessaire
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  }

  // Vérifier si la chanson existe déjà (par titre)
  const existing = await pb.collection('chansons').getList(1, 1, {
    filter: `titre="${chansonData.titre}"`
  });

  if (existing.items.length > 0) {
    // Mise à jour si déjà présente
    const id = existing.items[0].id;
    
    // Exclure les champs de type "file" qui causent des erreurs
    const dataToUpdate = { ...chansonData };
    delete dataToUpdate.audio_url;
    delete dataToUpdate.cover_url;
    
    await pb.collection('chansons').update(id, dataToUpdate);
    console.log(`Chanson mise à jour : ${chansonData.titre}`);
  } else {
    // Création sinon
    await pb.collection('chansons').create(chansonData);
    console.log(`Chanson importée : ${chansonData.titre}`);
  }
}

main().catch(err => {
  console.error('Erreur import PocketBase:', err);
  process.exit(1);
});
