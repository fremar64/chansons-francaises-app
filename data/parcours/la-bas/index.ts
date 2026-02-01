/**
 * LÀ-BAS - INDEX DU PARCOURS COMPLET
 * 
 * Parcours pédagogique complet sur la chanson "Là-bas" de Jean-Jacques Goldman
 * 
 * Thème central : Déterminisme social vs liberté métaphysique - Le dilemme tragique
 * 
 * 5 séances, 40 écrans
 * Niveau : A2 → C1 (progression)
 * Durée totale estimée : 372 minutes (6h12)
 * Points total : 322
 */

import { seance1 } from './seance-1-decouverte';
import { seance2 } from './seance-2-vocabulaire';
import { seance3 } from './seance-3-grammaire';
import { seance4 } from './seance-4-langage-symbolique';
import { seance5 } from './seance-5-debat-philosophique';

import type { SeanceCeredis } from '@/types/ceredis';

/**
 * Métadonnées du parcours
 */
export const parcoursMeta = {
  id: 'la-bas',
  titre: 'Là-bas',
  artiste: 'Jean-Jacques Goldman',
  album: 'Positif',
  annee: 1984,
  niveau: 'A2-C1',
  dureeEstimee: 372,
  theme: 'Liberté vs déterminisme social - Le dilemme tragique',
  descriptionCourte: 'Exploration philosophique approfondie du conflit entre liberté métaphysique et attachement affectif',
  descriptionLongue: `Parcours complet de 5 séances (372 minutes) qui traite "Là-bas" comme une grande œuvre philosophique. 
  Progression de la découverte initiale (B1) jusqu'à l'analyse métaphysique et le débat philosophique (C1). 
  Explore les thèmes du déterminisme social (Bourdieu), de l'ambivalence ontologique ICI/LÀ-BAS (Heidegger), 
  du langage symbolique de l'expérience limite (Job, Rimbaud, Nietzsche), et du dilemme tragique (Sophocles, Sartre, Levinas). 
  Mobilise les 19 compétences CEREDIS avec un focus majeur sur le domaine 5 (métalinguistique et métacognitif).`
};

/**
 * Liste des séances du parcours
 */
export const seances: SeanceCeredis[] = [
  seance1,
  seance2,
  seance3,
  seance4,
  seance5
];

/**
 * Statistiques globales du parcours
 */
export const statistiques = {
  nombreSeances: 5,
  nombreEcrans: 40,
  dureeTotal: 372, // minutes
  pointsTotal: 322,
  niveauCible: 'C1',
  progression: ['A2', 'B1', 'B2', 'C1']
};

/**
 * Distribution des preuves
 */
export const distributionEvidences = {
  P1: 8,
  P2: 13,
  P3: 6,
  P4: 8
};

/**
 * Compétences uniques mobilisées (toutes les 19)
 */
export const competencesUniques = [
  '1.1', '1.2', '1.3',
  '2.1', '2.2', '2.3',
  '3.1', '3.2', '3.3',
  '4.1', '4.2', '4.3',
  '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
];

/**
 * Thèmes philosophiques abordés
 */
export const themesPhilosophiques = [
  'Déterminisme social vs liberté métaphysique',
  'Ambivalence ontologique (Heidegger)',
  'Expérience métaphysique limite',
  'Dilemme tragique',
  'Responsabilité pour l\'autre (Levinas)',
  'Solitude ontologique',
  'Altérité radicale'
];

/**
 * Auteurs philosophiques référencés
 */
export const auteursPhilosophiques = [
  'Heidegger', 'Sartre', 'Levinas', 'Nietzsche', 'Bourdieu',
  'Descartes', 'Camus', 'Platon', 'Sophocles', 'Rimbaud',
  'Dostoïevski', 'Jung', 'Héraclite', 'Aristote'
];

/**
 * Convergences avec d'autres chansons de Goldman
 */
export const convergencesGoldman = [
  { titre: 'Envole-moi', theme: 'Aspiration à la transcendance' },
  { titre: 'Appartenir', theme: 'Liberté individuelle absolue' },
  { titre: 'Qu\'elle soit elle', theme: 'Solitude comme condition de l\'amour' },
  { titre: 'Né en 17 à Leidenstadt', theme: 'Déterminisme historique' },
  { titre: 'C\'est ta chance', theme: 'Saisir l\'opportunité' }
];

// Export par défaut pour compatibilité
export default {
  parcoursMeta,
  seances,
  statistiques,
  distributionEvidences,
  competencesUniques,
  themesPhilosophiques,
  auteursPhilosophiques,
  convergencesGoldman
};
