/**
 * C'EST TA CHANCE - INDEX DU PARCOURS COMPLET
 * 
 * Parcours pédagogique complet sur la chanson "C'est ta chance" de Jean-Jacques Goldman
 * 
 * Thème central : Les injustices de la vie et la nécessité de conquérir 
 * par soi-même ce que la vie ne nous a pas donné
 * 
 * 5 séances, 41 écrans
 * Niveau : A2-B2 (progression)
 * Durée totale estimée : ~344 minutes (~5h45)
 */

import { seance1 } from './seance-1-decouverte';
import { seance2 } from './seance-2-vocabulaire-migre';
import { seance3 } from './seance-3-grammaire-migre';
import { seance4 } from './seance-4-debat-migre';
import { seance5 } from './seance-5-production-migre';

import type { SeanceCeredis } from '@/types/ceredis';

/**
 * Métadonnées du parcours
 */
export const parcoursMeta = {
  id: 'cest-ta-chance',
  titre: "C'est ta chance",
  artiste: 'Jean-Jacques Goldman',
  album: 'Non homologué',
  annee: 1985,
  
  niveau: 'A2-B2',
  dureeEstimee: 344, // minutes
  
  theme: `Les injustices de la vie et la nécessité de conquérir par soi-même 
          ce que la vie ne nous a pas donné`,
  
  descriptionCourte: `Parcours philosophique sur le paradoxe de Goldman : 
                       ne pas avoir eu de chance à la naissance = justement ta chance`,
  
  descriptionLongue: `"C'est ta chance" s'adresse aux défavorisés de la vie :
  - Celles qui ne sont pas nées jolies
  - Ceux qui n'ont pas de privilèges hérités
  - Tous les "moins que rien" de la société
  
  Le message radical : la souffrance initiale devient source de force.
  "Là où est ta plus grande douleur, là est ton plus grand bonheur" (Nietzsche)
  
  Ce parcours explore :
  1. Le paradoxe central (manque → chance)
  2. Le vocabulaire de la transformation (blessure → force)
  3. La grammaire de la nécessité (il faudra que tu...)
  4. Le débat éthique (accepter ou refuser les injustices)
  5. La production créative (lettre à soi-même)`,
  
  connexionsPhilosophiques: [
    'Nietzsche : "Ce qui ne me tue pas me rend plus fort"',
    'René Char : "La lucidité est la blessure la plus rapprochée du soleil"',
    'Sartre : mauvaise foi vs authenticité',
    'Hegel : dialectique de la transformation'
  ],
  
  connexionsGoldman: [
    'Là-bas : même refus du déterminisme social',
    'Né en 17 : même questionnement sur le hasard de la naissance',
    'Envole-moi : même appel à l\'émancipation par l\'intelligence',
    'Il suffira d\'un signe : rupture avec la condition imposée'
  ],
  
  keywords: [
    'résilience', 'transformation', 'injustice', 'lucidité', 
    'blessure', 'force', 'dissonance', 'dissidence', 
    'subjonctif', 'futur de nécessité', 'débat', 'argumentation'
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
=== PARCOURS "C'EST TA CHANCE" ===

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
1. Découverte : Les injustices et la transformation
2. Vocabulaire : Souffrance, blessure, intelligence, lucidité
3. Grammaire : Le futur de la nécessité
4. Débat : Accepter ou refuser les injustices
5. Production : Lettre à soi-même / Manifeste personnel

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
