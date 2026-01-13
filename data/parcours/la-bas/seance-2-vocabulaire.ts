/**
 * LÀ-BAS - SÉANCE 2
 * Vocabulaire : Le champ lexical de la liberté et de l'enfermement
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'labas-s2-e1',
  numero: 1,
  titre: 'Introduction - Opposition ici/là-bas',
  type: 'introduction',
  consigne: 'Explorez le vocabulaire structurant de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `Cette séance explore le **vocabulaire philosophique** de "Là-bas" organisé autour 
    de l'opposition fondamentale **ici / là-bas**.
    
    **Champ lexical de l'enfermement (ICI)** :
    - "Nos rêves sont étroits" → limitation, confinement mental
    - "Tout est joué d'avance" → déterminisme total
    - "Les autres imposent leur loi" → hétéronomie (absence d'autonomie)
    - "Grillage" → emprisonnement symbolique
    
    **Champ lexical de la liberté (LÀ-BAS)** :
    - "Neuf et sauvage" → vierge, non domestiqué
    - "Libre continent sans grillage" → espace ouvert
    - "J'aurai ma chance, j'aurai mes droits" → autonomie conquise
    - "Tout ce que tu mérites est à toi" → justice restaurée
    
    **L'enjeu du vocabulaire** :
    Ce n'est pas un simple contraste géographique. C'est l'opposition entre 
    **déterminisme** (ici) et **liberté** (là-bas), **aliénation** et **authenticité**.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'labas-s2-e2',
  numero: 2,
  titre: 'Écoute lexicale ciblée',
  type: 'ecoute_ciblee',
  consigne: 'Repérez les mots de l\'opposition ici/là-bas',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 280,
  activite: {
    type: 'ecoute_ciblee',
    contenu: 'Focus sur le vocabulaire contrasté : étroit/libre, grillage/sans grillage, etc.'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.2', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'labas-s2-e3',
  numero: 3,
  titre: 'Identification du vocabulaire',
  type: 'quiz_qcm',
  consigne: 'Classez les mots selon leur connotation',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie "nos rêves sont étroits" ?',
        options: [
          'Nos rêves sont petits',
          'Nos possibilités sont limitées par les structures sociales',
          'Nous manquons d\'imagination',
          'Nous dormons mal'
        ],
        reponseCorrecte: 1,
        explication: '"Étroit" évoque le confinement mental imposé par le déterminisme social.'
      },
      {
        id: 'q2',
        question: 'Quelle est la connotation de "neuf et sauvage" ?',
        options: [
          'Dangereux et primitif',
          'Non domestiqué, vierge de contraintes',
          'Récent et moderne',
          'Violent et brutal'
        ],
        reponseCorrecte: 1,
        explication: '"Sauvage" ici = libre des structures aliénantes, pas "barbare".'
      },
      {
        id: 'q3',
        question: 'Que symbolise le "grillage" ?',
        options: [
          'Une clôture physique',
          'Les structures mentales qui emprisonnent',
          'La sécurité',
          'La frontière d\'un pays'
        ],
        reponseCorrecte: 1,
        explication: 'Le grillage est métaphorique : ce sont les cadres mentaux imposés.'
      },
      {
        id: 'q4',
        question: '"Les autres imposent leur loi" signifie :',
        options: [
          'Il y a des lois injustes',
          'Absence d\'autonomie, hétéronomie',
          'Il y a trop de règlements',
          'La démocratie ne fonctionne pas'
        ],
        reponseCorrecte: 1,
        explication: 'Hétéronomie = être soumis à la loi des autres (vs autonomie = sa propre loi).'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'labas-s2-e4',
  numero: 4,
  titre: 'Analyse sémantique approfondie',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez les nuances du vocabulaire',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman dit "libre continent sans grillage" et non "pays libre" ?',
        options: [
          '"Continent" évoque plus d\'espace',
          '"Continent" suggère une transformation radicale, pas juste un déménagement',
          'C\'est plus poétique',
          'Il parle de l\'Amérique'
        ],
        reponseCorrecte: 1,
        explication: '"Continent" = espace mental vaste, pas simplement géographique.',
        promptJustification: 'Expliquez pourquoi "continent" a une portée plus métaphysique que "pays" (70 mots min)',
        justificationMinLength: 70
      },
      {
        id: 'q2',
        question: 'Quelle différence entre "J\'aurai mes droits" et "J\'ai mes droits" ?',
        options: [
          'C\'est la même chose',
          'Le futur marque qu\'ici, on ne les a PAS',
          'Une erreur grammaticale',
          'Juste une variation stylistique'
        ],
        reponseCorrecte: 1,
        explication: 'Le futur souligne l\'absence actuelle de droits réels.',
        promptJustification: 'Analysez ce que révèle ce futur sur la situation présente (70 mots min)',
        justificationMinLength: 70
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'labas-s2-e5',
  numero: 5,
  titre: 'Classement par intensité',
  type: 'ordre_elements',
  consigne: 'Ordonnez ces termes du moins au plus contraignant',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: 'Classez ces expressions par intensité de contrainte croissante (La dernière expression marque la perte totale d\'identité)',
      elements: [
        { id: 'e1', texte: 'Rêves étroits', ordre: 1 },
        { id: 'e2', texte: 'Tout est joué d\'avance', ordre: 2 },
        { id: 'e3', texte: 'Dépend de ta naissance', ordre: 3 },
        { id: 'e4', texte: 'Les autres imposent leur loi', ordre: 4 },
        { id: 'e5', texte: 'Je me perds si je reste là', ordre: 5 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.4'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'labas-s2-e6',
  numero: 6,
  titre: 'Production lexicale créative',
  type: 'texte_libre',
  consigne: 'Rédigez votre propre opposition ici/là-bas',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Rédigez un texte de 180-220 mots structuré en deux parties :
      
      **PARTIE 1 - ICI** : Décrivez une situation d'enfermement (mental, social, familial)
      en utilisant le vocabulaire de la contrainte.
      
      **PARTIE 2 - LÀ-BAS** : Décrivez la transformation libératrice correspondante
      en utilisant le vocabulaire de la liberté.
      
      Utilisez au moins 8 mots du vocabulaire étudié.`,
      nombreMotsMin: 180,
      nombreMotsMax: 220,
      aideRedaction: [
        'ICI : étroit, grillage, imposer, joué d\'avance, pas le choix',
        'LÀ-BAS : libre, neuf, sauvage, droits, chance, mériter',
        'Créez un contraste fort',
        'Terminez sur l\'espoir de transformation'
      ],
      criteres: [
        { label: 'Richesse lexicale', description: '8+ mots du vocabulaire étudié', points: 5 },
        { label: 'Opposition structurée', description: 'Contraste clair ici/là-bas', points: 4 },
        { label: 'Qualité stylistique', description: 'Fluidité, cohérence', points: 3 },
        { label: 'Profondeur', description: 'Évoque vraiment la transformation intérieure', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.2', '5.2', '5.5'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'labas-s2-e7',
  numero: 7,
  titre: 'Journal - Le poids des mots',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez au pouvoir du vocabulaire',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment le vocabulaire utilisé par Goldman rend-il tangible l\'opposition entre enfermement et liberté ?',
      contexte: 'Les mots ne sont pas neutres. Ils façonnent notre perception de la réalité.',
      sousQuestions: [
        'Quels mots vous ont particulièrement marqué ? Pourquoi ?',
        'Avez-vous découvert des nuances que vous ne perceviez pas avant ?',
        'Comment ce vocabulaire vous aide-t-il à penser votre propre situation ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Identifier les mots qui résonnent avec votre expérience',
        'Réfléchir à la différence entre contrainte externe et interne',
        'Penser au pouvoir des mots pour libérer ou enfermer'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6', '5.7'],
    evidenceType: 'P4',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran8: EcranCeredis = {
  id: 'labas-s2-e8',
  numero: 8,
  titre: 'Bilan lexical',
  type: 'bilan',
  consigne: 'Synthèse du vocabulaire maîtrisé',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**Vocabulaire maîtrisé** :
    
    **Champ lexical de l'enfermement** :
    - Étroit, grillage, joué d'avance, imposer, pas le choix
    - → Évoque le déterminisme social, l'hétéronomie
    
    **Champ lexical de la liberté** :
    - Neuf, sauvage, libre, sans grillage, droits, chance, mériter
    - → Évoque l'autonomie, la transformation, la justice
    
    **Opposition structurante** :
    ICI (présent/enfermement) ↔ LÀ-BAS (futur/liberté)
    
    **Nuances philosophiques** :
    - "Neuf et sauvage" ≠ exotisme, mais dé-familiarisation
    - "Continent sans grillage" = espace mental, pas géographique
    - Le futur = projection volontaire, pas simple souhait
    
    **Prochaine séance** : Grammaire - Le futur simple de la projection existentielle`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance2: SeanceCeredis = {
  id: 'labas-s2',
  chansonId: 'labas',
  numero: 2,
  titre: 'Vocabulaire : Liberté et enfermement',
  description: `Exploration du vocabulaire philosophique structuré autour de l'opposition ici/là-bas.
  Cette séance révèle comment les mots de Goldman ne sont pas décoratifs mais porteurs 
  d'une vision métaphysique de l'enfermement et de la libération.`,
  
  objectifs: [
    'Maîtriser le champ lexical de l\'enfermement et de la liberté',
    'Comprendre la portée métaphysique du vocabulaire',
    'Analyser l\'opposition structurante ici/là-bas',
    'Produire un texte utilisant ce vocabulaire contrasté',
    'Réfléchir au pouvoir des mots sur notre perception'
  ],
  
  dureeEstimee: 56,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.2', '2.1', '2.2', '2.3', '3.2', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 2, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.2', '2.1', '2.2', '2.3', '3.2', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
  }
};

export default seance2;
