/**
 * LÀ-BAS - INDEX DU PARCOURS
 * 
 * Parcours pédagogique sur la chanson "Là-bas" de Jean-Jacques Goldman & Sirima
 * 
 * Thème central : La liberté conquise contre le déterminisme social
 * 
 * Niveau : B2-C1
 * Durée totale estimée : ~320 minutes
 */

import { seance1 } from './seance-1-decouverte';
import { seance2 } from './seance-2-vocabulaire';
import { seance3 } from './seance-3-grammaire';

import type { SeanceCeredis } from '@/types/ceredis';

/**
 * Métadonnées du parcours
 */
export const parcoursMeta = {
  id: 'la-bas',
  titre: 'Là-bas',
  artiste: 'Jean-Jacques Goldman & Sirima',
  album: 'Entre gris clair et gris foncé',
  annee: 1987,
  
  niveau: 'B2-C1',
  dureeEstimee: 320, // minutes
  
  theme: `La liberté conquise contre le déterminisme social. 
          "Là-bas" n'est pas un lieu géographique mais une transformation existentielle.`,
  
  descriptionCourte: `Parcours philosophique sur le refus du déterminisme : 
                       quand on n'est "pas bien né", doit-on accepter son sort ?`,
  
  descriptionLongue: `"Là-bas" est un dialogue philosophique entre deux voix :
  - La voix masculine (Goldman) : l'arrachement, la quête de liberté
  - La voix féminine (Sirima) : l'ancrage, la sécurité du familier
  
  L'enjeu central : "Tout dépend de ta naissance / Et moi je ne suis pas bien né"
  Goldman refuse cette fatalité sociale.
  
  Ce parcours explore :
  1. Le dialogue philosophique ici/là-bas
  2. Le vocabulaire de l'aspiration et de l'enfermement
  3. La grammaire de l'hypothèse (conditionnel)`,
  
  connexionsPhilosophiques: [
    'Sartre : "L\'existence précède l\'essence"',
    'Bourdieu : Le déterminisme social',
    'Camus : La révolte contre l\'absurde'
  ],
  
  connexionsGoldman: [
    "C'est ta chance : même refus du déterminisme",
    'Le coureur : même thème de déracinement',
    'Envole-moi : même appel à l\'émancipation'
  ],
  
  keywords: [
    'liberté', 'déterminisme', 'ailleurs', 'transformation',
    'dialogue', 'opposition', 'conditionnel', 'hypothèse'
  ]
};

/**
 * Toutes les séances du parcours
 */
export const seances: SeanceCeredis[] = [
  seance1,
  seance2,
  seance3
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

// Exports nommés
export { seance1, seance2, seance3 };

// Export par défaut
export default {
  meta: parcoursMeta,
  seances,
  stats: parcoursStats
};
