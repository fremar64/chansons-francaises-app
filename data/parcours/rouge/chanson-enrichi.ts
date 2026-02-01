/**
 * ROUGE - Fredericks Goldman Jones (1993)
 * MODULE OPÉRATIONNEL CECRL
 * 
 * Compétence-pivot :
 * "Analyser une chanson comme expression d'un idéal collectif
 * et de sa mise à l'épreuve historique"
 * 
 * Note: Ce fichier utilise une structure personnalisée différente du type Chanson PocketBase
 */
export const chansonRouge: any = {
  id: 'rouge',
  titre: 'Rouge',
  artiste: 'Fredericks Goldman Jones',
  album: 'Rouge',
  annee: 1993,
  duree: 378, // 6:18
  
  audio: {
    mp3: '/audio/chansons/jean-jacques-goldman/rouge.mp3'
  },
  
  niveauCible: ['B2', 'C1'],
  niveauMinimum: 'A2',
  
  // Contexte historique
  contexte: {
    date: '1993',
    evenements: [
      'Post-chute du Mur de Berlin (1989)',
      'Dissolution URSS (1991)',
      'Enregistrement avec Chœurs Armée rouge'
    ],
    citationAuteur: 'Le communisme a été l\'horreur absolue. Jetons les hommes et gardons les idées. (Goldman, 1994)'
  },
  
  themes: [
    'Idéaux collectifs',
    'Justice sociale',
    'Utopie et réalité',
    'Mémoire historique',
    'Transmission valeurs'
  ],
  
  symboles: {
    rouge: 'Révolution, idéaux, espoir',
    noir: 'Guerre, violence, temps sombres',
    phraseClé: 'Autant crever pour elles que ramper sans combattre'
  },
  
  // Compétences CEREDIS
  competences: {
    principales: ['1.1', '2.1', '3.2', '4.2', '5.1', '5.4', '5.6'],
    domaines: {
      D1: ['1.1', '1.2'],
      D2: ['2.1', '2.2', '2.3'],
      D3: ['3.2', '3.3'],
      D4: ['4.2'],
      D5: ['5.1', '5.4', '5.6', '5.7'] // CRUCIAL
    }
  },
  
  // Déclinaison MODULE OPÉRATIONNEL
  declinaisonCECRL: {
    A2: {
      titre: 'Compréhension thématique',
      descripteurs: ['idées bonheur/paix', 'futur', 'réaction simple']
    },
    B1: {
      titre: 'Compréhension critique',
      descripteurs: ['explique "rouge"', 'idéal/réalité', 'justifie']
    },
    B2: {
      titre: 'Analyse symbolique',
      descripteurs: ['symbole idéologique', 'idéal/violence'],
      required: 'P3'
    },
    C1: {
      titre: 'Lecture philosophique',
      descripteurs: ['idées vs régimes', 'hommage critique'],
      required: 'P3 + P4'
    }
  },
  
  valeursUNESCO: {
    educationCitoyennete: true,
    memoireHistorique: true,
    penseeCritique: true,
    educationPaix: true
  },
  
  notesPedagogiques: {
    themeSensible: true,
    approche: 'Distinction critique idéaux/régimes',
    vigilance: ['Pas d\'apologie', 'Encourager nuance']
  },
  
  tags: [
    'goldman',
    'histoire',
    'mémoire',
    'utopie',
    'B2-C1',
    'pensée-critique',
    'unesco'
  ]
};

export default chansonRouge;
