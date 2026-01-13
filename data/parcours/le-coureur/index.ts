/**
 * LE COUREUR - INDEX DU PARCOURS COMPLET
 * 
 * Parcours pédagogique complet sur la chanson "Le coureur" de Jean-Jacques Goldman
 * 
 * Thème central : La mondialisation est-elle émancipation ou aliénation ?
 * Structure : Récit de déracinement en 7 étapes chronologiques
 * 
 * 5 séances, 43 écrans
 * Niveau : B1-B2 (progression)
 * Durée totale estimée : ~339 minutes (~5h40)
 */

import { seance1 } from './seance-1-decouverte';
import { seance2 } from './seance-2-vocabulaire';
import { seance3 } from './seance-3-grammaire';
import { seance4 } from './seance-4-debat';
import { seance5 } from './seance-5-production';

import type { SeanceCeredis } from '@/types/ceredis';

/**
 * Métadonnées du parcours
 */
export const parcoursMeta = {
  id: 'le-coureur',
  titre: 'Le coureur',
  artiste: 'Jean-Jacques Goldman',
  album: 'Non homologué',
  annee: 1985,
  
  niveau: 'B1-B2',
  dureeEstimee: 339, // minutes
  
  theme: `La mondialisation est-elle émancipation ou aliénation ? 
          Récit de déracinement d'un jeune athlète africain recruté par l'Occident.`,
  
  descriptionCourte: `Parcours philosophique sur l'ambivalence de la mondialisation : 
                       le coureur a-t-il gagné ou perdu dans sa transformation ?`,
  
  descriptionLongue: `"Le coureur" raconte l'histoire d'un jeune athlète africain 
  repéré sur une plage tropicale par un recruteur occidental.
  
  Le récit suit 7 étapes chronologiques :
  1. Vie d'origine (plage, alizés, pieds nus, ancêtres)
  2. Découverte (recruteur avec chronomètre)
  3. Transaction (dollars et signature des parents)
  4. Transplantation (avion, froid des villes)
  5. Déshumanisation (mesuré comme un cheval, électrodes)
  6. Transformation (numéro, compétition, écorcher la terre)
  7. Bilan ambivalent (étranger partout, "Était-ce un mal, un bien / C'est ainsi")
  
  Ce parcours explore :
  1. La structure narrative du déracinement
  2. Les 4 champs lexicaux (nature, modernité, déshumanisation, mondialisation)
  3. Les temps du récit (imparfait vs passé composé)
  4. Le débat sur la mondialisation (gains et pertes)
  5. La production d'un récit de transformation ambivalente`,
  
  connexionsPhilosophiques: [
    'Post-colonialisme : recrutement des talents du Sud par le Nord',
    'Nietzsche : contingence et hasard ("Le hasard a croisé ma vie")',
    'Aliénation : "étranger partout" (double aliénation)',
    'Dialectique : émancipation ET aliénation simultanées',
    'Heidegger : authenticité vs inauthenticité'
  ],
  
  connexionsGoldman: [
    'Né en 17 : même thème du hasard et de la contingence',
    'Là-bas : même questionnement sur la liberté',
    'C\'est ta chance : même transformation du manque en force',
    'Envole-moi : même critique des inégalités Nord-Sud'
  ],
  
  keywords: [
    'déracinement', 'mondialisation', 'identité', 'post-colonialisme',
    'ambivalence', 'imparfait', 'passé composé', 'voix passive',
    'caresser', 'écorcher', 'aliénation', 'émancipation',
    'étranger', 'transformation', 'récit'
  ],
  
  metaphoreCentrale: {
    avant: 'Je la caressais naguère',
    apres: 'Des clous aux pieds pour écorcher la terre',
    signification: 'Transformation du rapport harmonieux (caresser) en rapport violent (écorcher) avec la nature'
  },
  
  etapesDuRecit: [
    { numero: 1, titre: 'Vie d\'origine', motsClés: ['plage', 'alizés', 'pieds nus', 'ancêtres', 'caresser'] },
    { numero: 2, titre: 'Découverte', motsClés: ['chronomètre', 'lunettes', 'recruteur'] },
    { numero: 3, titre: 'Transaction', motsClés: ['dollars', 'signature', 'larme', 'parents'] },
    { numero: 4, titre: 'Transplantation', motsClés: ['avion', 'froid', 'villes', 'touristes', 'automobiles'] },
    { numero: 5, titre: 'Déshumanisation', motsClés: ['cheval', 'bocal', 'électrodes', 'tapis', 'mal'] },
    { numero: 6, titre: 'Transformation', motsClés: ['numéro', 'drapeaux', 'rond', 'clous', 'écorcher'] },
    { numero: 7, titre: 'Bilan', motsClés: ['étranger', 'hasard', 'mal', 'bien', 'ainsi'] }
  ]
};

/**
 * Toutes les séances du parcours
 */
export const seances: SeanceCeredis[] = [
  seance1,
  seance2,
  seance3,
  seance4,
  seance5
];

/**
 * Statistiques du parcours
 */
export const parcoursStats = {
  nombreSeances: seances.length,
  nombreEcrans: seances.reduce((sum, s) => sum + s.ecrans.length, 0),
  dureeEstimeeTotale: seances.reduce((sum, s) => sum + s.dureeEstimee, 0),
  scoreMaxTotal: seances.reduce((sum, s) => sum + (s.ceredisGlobal?.scoreMaxTotal ?? 0), 0),
  
  distributionEvidences: {
    P1: seances.reduce((sum, s) => sum + (s.ceredisGlobal?.distributionEvidences?.P1 ?? 0), 0),
    P2: seances.reduce((sum, s) => sum + (s.ceredisGlobal?.distributionEvidences?.P2 ?? 0), 0),
    P3: seances.reduce((sum, s) => sum + (s.ceredisGlobal?.distributionEvidences?.P3 ?? 0), 0),
    P4: seances.reduce((sum, s) => sum + (s.ceredisGlobal?.distributionEvidences?.P4 ?? 0), 0)
  },
  
  competencesUniques: [...new Set(seances.flatMap(s => s.competences))]
};

/**
 * Résumé du parcours
 */
export const parcoursSummary = `
=== PARCOURS "LE COUREUR" ===

📊 STATISTIQUES :
- ${parcoursStats.nombreSeances} séances
- ${parcoursStats.nombreEcrans} écrans
- ${Math.round(parcoursStats.dureeEstimeeTotale / 60)}h ${parcoursStats.dureeEstimeeTotale % 60}min durée totale
- ${parcoursStats.scoreMaxTotal} points maximum

📈 DISTRIBUTION DES PREUVES :
- P1 (Réception) : ${parcoursStats.distributionEvidences.P1} activités
- P2 (Analyse) : ${parcoursStats.distributionEvidences.P2} activités
- P3 (Production) : ${parcoursStats.distributionEvidences.P3} activités
- P4 (Réflexion) : ${parcoursStats.distributionEvidences.P4} activités

🎯 SÉANCES :
1. Découverte : Le récit de déracinement (7 étapes)
2. Vocabulaire : Nature, modernité, déshumanisation
3. Grammaire : Imparfait vs passé composé, voix passive
4. Débat : Mondialisation - Émancipation ou aliénation ?
5. Production : Récit de transformation ambivalente

🔑 MÉTAPHORE CENTRALE :
- AVANT : "Je la caressais naguère" (harmonie)
- APRÈS : "Des clous aux pieds pour écorcher la terre" (violence)

✅ COMPÉTENCES VISÉES :
${parcoursStats.competencesUniques.join(', ')}
`;

// Exports nommés
export { seance1, seance2, seance3, seance4, seance5 };

// Export par défaut
export default {
  meta: parcoursMeta,
  seances,
  stats: parcoursStats,
  summary: parcoursSummary
};
