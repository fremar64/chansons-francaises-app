/**
 * Script pour importer "Le coureur" dans PocketBase
 * 
 * Usage:
 *   npx tsx scripts/import-le-coureur.ts
 * 
 * Les credentials sont lus depuis .env.local
 * 
 * Ou via l'interface admin PocketBase:
 *   https://pocketbase-songs.ceredis.net/_/
 */

import PocketBase from 'pocketbase';
import { config } from 'dotenv';

// Charger .env.local
config({ path: '.env.local' });

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@ceredis.net';
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

// Données de "Le coureur" pour PocketBase
const leCoureurData = {
  titre: 'Le coureur',
  artiste: 'Jean-Jacques Goldman',
  album: 'Non homologué',
  annee: 1985,
  duree: 270, // 4:30 en secondes
  genre: ['variété française', 'chanson à texte', 'chanson sociale'],
  niveau: 'B2',
  themes: ['déracinement', 'mondialisation', 'identité', 'post-colonialisme', 'ambivalence'],
  paroles: `Je courais sur la plage abritée des alizés
Pieds nus comme couraient mes ancêtres
Je courais après les vagues
Et la pluie qui me mouillait
Et j'avais un vieux compte à régler

Là-bas il y a du sable et de l'or et des alizés
Je la caressais naguère
Cette terre

Oh j'ai bien vu derrière ses lunettes
Un type avec un chronomètre
Ma mère une larme, un murmure
Des dollars et leur signature

J'ai pris le grand avion blanc du lundi
Loin du sable et des alizés
J'suis arrivé dans le froid des villes
Venu d'où les touristes s'en vont

On m'a touché, mesuré comme on fait d'un cheval
Sur un tapis, toujours courir
Plein d'électrodes
Pissé dans un bocal
Et ça faisait mal

On m'a mis un numéro sur le dos
Des cris, des drapeaux
J'cours toujours en rond dans c't'espèce d'enclos
Perdre, gagner à quoi ça rime
Les autres coureurs au lieu des vagues
Le béton gris des capitales

Des clous aux pieds pour écorcher la terre
Des clous aux pieds pour écorcher la terre

J'suis étranger partout aujourd'hui
Le hasard a croisé ma vie
Était-ce un mal, un bien
C'est ainsi`,
  paroles_synchronisees: [
    { temps: 0, texte: "" },
    { temps: 12, texte: "Je courais sur la plage abritée des alizés" },
    { temps: 18, texte: "Pieds nus comme couraient mes ancêtres" },
    { temps: 24, texte: "Je courais après les vagues" },
    { temps: 28, texte: "Et la pluie qui me mouillait" },
    { temps: 32, texte: "Et j'avais un vieux compte à régler" },
    { temps: 40, texte: "" },
    { temps: 48, texte: "Là-bas il y a du sable et de l'or et des alizés" },
    { temps: 56, texte: "Je la caressais naguère" },
    { temps: 62, texte: "Cette terre" },
    { temps: 70, texte: "" },
    { temps: 78, texte: "Oh j'ai bien vu derrière ses lunettes" },
    { temps: 84, texte: "Un type avec un chronomètre" },
    { temps: 90, texte: "Ma mère une larme, un murmure" },
    { temps: 96, texte: "Des dollars et leur signature" },
    { temps: 105, texte: "" },
    { temps: 112, texte: "J'ai pris le grand avion blanc du lundi" },
    { temps: 118, texte: "Loin du sable et des alizés" },
    { temps: 124, texte: "J'suis arrivé dans le froid des villes" },
    { temps: 130, texte: "Venu d'où les touristes s'en vont" },
    { temps: 140, texte: "" },
    { temps: 148, texte: "On m'a touché, mesuré comme on fait d'un cheval" },
    { temps: 156, texte: "Sur un tapis, toujours courir" },
    { temps: 162, texte: "Plein d'électrodes" },
    { temps: 166, texte: "Pissé dans un bocal" },
    { temps: 170, texte: "Et ça faisait mal" },
    { temps: 180, texte: "" },
    { temps: 188, texte: "On m'a mis un numéro sur le dos" },
    { temps: 194, texte: "Des cris, des drapeaux" },
    { temps: 200, texte: "J'cours toujours en rond dans c't'espèce d'enclos" },
    { temps: 208, texte: "Perdre, gagner à quoi ça rime" },
    { temps: 214, texte: "Les autres coureurs au lieu des vagues" },
    { temps: 220, texte: "Le béton gris des capitales" },
    { temps: 230, texte: "" },
    { temps: 238, texte: "Des clous aux pieds pour écorcher la terre" },
    { temps: 246, texte: "Des clous aux pieds pour écorcher la terre" },
    { temps: 256, texte: "" },
    { temps: 262, texte: "J'suis étranger partout aujourd'hui" },
    { temps: 268, texte: "Le hasard a croisé ma vie" },
    { temps: 274, texte: "Était-ce un mal, un bien" },
    { temps: 280, texte: "C'est ainsi" }
  ],
  audio_url: "",  // PocketBase n'accepte pas les chemins locaux
  cover_url: "",
  video_url: "",
  vocabulaire_cle: [
    { mot: "alizés", definition: "Vents réguliers des régions tropicales", exemple: "Je courais sur la plage abritée des alizés", categorie: "nom", niveau: "B2" },
    { mot: "ancêtres", definition: "Personnes dont on descend", exemple: "Pieds nus comme couraient mes ancêtres", categorie: "nom", niveau: "A2" },
    { mot: "caresser", definition: "Toucher doucement avec tendresse", exemple: "Je la caressais naguère (la terre)", categorie: "verbe", niveau: "A2" },
    { mot: "écorcher", definition: "Blesser en arrachant la peau", exemple: "Des clous aux pieds pour écorcher la terre", categorie: "verbe", niveau: "B1" },
    { mot: "naguère", definition: "Autrefois (registre soutenu)", exemple: "Je la caressais naguère", categorie: "adverbe", niveau: "B2" },
    { mot: "étranger", definition: "Qui n'est pas chez soi", exemple: "J'suis étranger partout aujourd'hui", categorie: "nom/adj", niveau: "A2" }
  ],
  points_grammaire: [
    { point: "Imparfait", explication: "Description du passé habituel (vie d'origine)", exemples: ["Je courais", "Je caressais"], usage: "Évoquer le passé révolu", niveau: "A2" },
    { point: "Passé composé", explication: "Événements ponctuels (rupture)", exemples: ["J'ai pris l'avion", "On m'a mis un numéro"], usage: "Marquer les moments de transformation", niveau: "A2" },
    { point: "Voix passive", explication: "Sujet subit l'action (déshumanisation)", exemples: ["On m'a touché", "On m'a mesuré"], usage: "Montrer que le sujet n'a pas le contrôle", niveau: "B1" }
  ],
  contexte_culturel: `# Le Coureur - Contexte

## Récit de déracinement

"Le coureur" raconte l'histoire d'un jeune athlète africain repéré par un recruteur occidental. Le récit suit 7 étapes :

1. **Vie d'origine** : Plage, alizés, course pieds nus
2. **Découverte** : Le recruteur avec son chronomètre
3. **Transaction** : Dollars contre signature des parents
4. **Transplantation** : Voyage en avion vers les villes froides
5. **Déshumanisation** : Tests médicaux, corps-objet
6. **Transformation** : Numéro sur le dos, compétition
7. **Bilan** : "Étranger partout", ambivalence

## Question centrale

La mondialisation est-elle émancipation ou aliénation ?

## Métaphore clé

- AVANT : "Je la caressais naguère" (tendresse)
- APRÈS : "Des clous aux pieds pour écorcher la terre" (violence)

## Contexte post-colonial

Goldman évoque le recrutement des talents du Sud par le Nord, la marchandisation du corps, la perte d'identité.`,
  actif: true
};

async function importLeCoureur() {
  const pb = new PocketBase(POCKETBASE_URL);
  
  console.log('🎵 Import de "Le coureur" dans PocketBase...');
  console.log(`📡 URL: ${POCKETBASE_URL}`);
  
  // Vérifier le mot de passe
  if (!ADMIN_PASSWORD) {
    console.error('❌ Variable PB_ADMIN_PASSWORD non définie.');
    console.log('\n💡 Usage :');
    console.log('   PB_ADMIN_PASSWORD=votre_mot_de_passe npx tsx scripts/import-le-coureur.ts');
    console.log('\n💡 Alternative : Importez manuellement via l\'interface admin :');
    console.log(`   ${POCKETBASE_URL}/_/`);
    return;
  }
  
  try {
    // Authentification admin
    console.log(`🔐 Authentification avec ${ADMIN_EMAIL}...`);
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authentification réussie !');
    
    // Vérifier si la chanson existe déjà
    try {
      const existing = await pb.collection('chansons').getFirstListItem(`titre = "Le coureur"`);
      console.log('⚠️ "Le coureur" existe déjà dans PocketBase avec l\'ID:', existing.id);
      console.log('Pour mettre à jour, supprimez d\'abord l\'entrée existante.');
      return;
    } catch {
      // La chanson n'existe pas, on peut continuer
    }
    
    // Créer la chanson
    const record = await pb.collection('chansons').create(leCoureurData);
    
    console.log('✅ "Le coureur" importé avec succès !');
    console.log('   ID:', record.id);
    console.log('   Titre:', record.titre);
    console.log('   Artiste:', record.artiste);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error);
    console.log('\n💡 Alternative : Importez manuellement via l\'interface admin :');
    console.log(`   ${POCKETBASE_URL}/_/`);
  }
}

// Exécuter si appelé directement
importLeCoureur();

// Export pour utilisation comme module
export { leCoureurData, importLeCoureur };
