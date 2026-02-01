// scripts/import-la-bas.ts
import PocketBase from 'pocketbase';
import { chansonData } from '../data/parcours/la-bas/chanson';

// URL de votre instance PocketBase
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'https://votre-instance-pocketbase.url';
// Identifiants admin (optionnel si accès public)
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
    await pb.collection('chansons').update(id, chansonData);
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