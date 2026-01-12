/**
 * NÉ EN 17 - SÉANCE 2
 * Vocabulaire : Le champ lexical de la souffrance
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

// ==========================================
// ÉCRANS DE LA SÉANCE
// ==========================================

const ecran1: EcranCeredis = {
  id: 'ne17-s2-e1',
  numero: 1,
  titre: 'Introduction - Le vocabulaire de la souffrance',
  type: 'introduction',
  consigne: 'Découvrez le champ lexical central de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `Dans cette séance, nous allons explorer le vocabulaire de la souffrance et de l'injustice 
    présent dans "Né en 17 à Leidenstadt". Goldman utilise un lexique riche et précis pour évoquer 
    la tragédie de l'Holocauste et l'arbitraire du destin.
    
    **Mots-clés à découvrir** :
    - L'étoile (symbole de persécution)
    - Les trains (déportation)
    - La fumée (camps d'extermination)
    - L'innocence perdue`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ne17-s2-e2',
  numero: 2,
  titre: 'Écoute ciblée - Repérage lexical',
  type: 'ecoute_cibl ee',
  consigne: 'Écoutez et repérez les mots liés à la souffrance',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_ciblee',
    contenu: 'Écoute avec focus sur le vocabulaire'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.2', '2.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ne17-s2-e3',
  numero: 3,
  titre: 'Identification du champ lexical',
  type: 'quiz_qcm',
  consigne: 'Identifiez les mots appartenant au champ lexical de la souffrance',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quel mot désigne le symbole de persécution des Juifs ?',
        options: [
          'La croix',
          'L\'étoile',
          'Le croissant',
          'La médaille'
        ],
        reponseCorrecte: 1,
        explication: 'L\'étoile jaune était le symbole imposé aux Juifs pendant l\'Holocauste.'
      },
      {
        id: 'q2',
        question: 'Que représentent les "trains" dans la chanson ?',
        options: [
          'Le voyage',
          'Le progrès',
          'La déportation',
          'La liberté'
        ],
        reponseCorrecte: 2,
        explication: 'Les trains sont une métonymie des convois de déportation vers les camps.'
      },
      {
        id: 'q3',
        question: 'Que symbolise "la fumée" dans le contexte de la chanson ?',
        options: [
          'L\'industrie',
          'Le brouillard',
          'Les camps d\'extermination',
          'La pollution'
        ],
        reponseCorrecte: 2,
        explication: 'La fumée évoque les crématoires des camps de concentration.'
      },
      {
        id: 'q4',
        question: 'Quel terme désigne le caractère aléatoire du destin ?',
        options: [
          'La fatalité',
          'La contingence',
          'La nécessité',
          'La prédestination'
        ],
        reponseCorrecte: 1,
        explication: 'La contingence exprime ce qui aurait pu être autrement, le hasard.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'ne17-s2-e4',
  numero: 4,
  titre: 'Analyse sémantique approfondie',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la valeur connotative des mots et justifiez',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman utilise-t-il "désigner mon étoile" plutôt que "porter mon étoile" ?',
        options: [
          'C\'est plus poétique',
          '"Désigner" insiste sur l\'acte de stigmatisation',
          'C\'est une erreur de syntaxe',
          'Les deux sont équivalents'
        ],
        reponseCorrecte: 1,
        explication: '"Désigner" met l\'accent sur l\'acte volontaire et injuste de marquage.',
        promptJustification: 'Expliquez la différence de sens entre "désigner" et "porter" dans ce contexte',
        justificationMinLength: 50
      },
      {
        id: 'q2',
        question: 'Quelle figure de style est utilisée dans "J\'aurais passé les nuits à épier les trains" ?',
        options: [
          'Une métaphore',
          'Une métonymie',
          'Une litote',
          'Une périphrase'
        ],
        reponseCorrecte: 1,
        explication: 'C\'est une métonymie : les trains représentent la déportation.',
        promptJustification: 'Analysez l\'effet produit par cette figure de style',
        justificationMinLength: 50
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'ne17-s2-e5',
  numero: 5,
  titre: 'Classement lexical',
  type: 'ordre_elements',
  consigne: 'Classez ces mots selon leur intensité émotionnelle (du moins au plus intense)',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: 'Ordonnez ces mots du champ lexical de la souffrance par intensité croissante',
      elements: [
        { id: 'e1', texte: 'Tristesse', ordre: 1 },
        { id: 'e2', texte: 'Souffrance', ordre: 2 },
        { id: 'e3', texte: 'Désespoir', ordre: 3 },
        { id: 'e4', texte: 'Tragédie', ordre: 4 },
        { id: 'e5', texte: 'Horreur', ordre: 5 },
        { id: 'e6', texte: 'Apocalypse', ordre: 6 }
      ],
      aide: 'Pensez à l\'échelle d\'intensité émotionnelle et au degré de gravité'
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.1', '5.4'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'ne17-s2-e6',
  numero: 6,
  titre: 'Production lexicale créative',
  type: 'texte_libre',
  consigne: 'Rédigez un paragraphe utilisant le vocabulaire de la séance',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Imaginez que vous êtes un narrateur qui évoque un événement historique tragique. 
      Rédigez un court paragraphe (150-200 mots) en utilisant au moins 5 mots du champ lexical 
      de la souffrance étudiés dans cette séance.`,
      nombreMotsMin: 150,
      nombreMotsMax: 200,
      aideRedaction: [
        'Utilisez le vocabulaire étudié : étoile, trains, fumée, etc.',
        'Créez une atmosphère sombre et grave',
        'Variez l\'intensité émotionnelle',
        'Terminez sur une note réflexive'
      ],
      criteres: [
        { label: 'Richesse lexicale', description: 'Utilisation pertinente de 5+ mots du champ lexical', points: 5 },
        { label: 'Cohérence narrative', description: 'Le récit est cohérent et fluide', points: 4 },
        { label: 'Qualité stylistique', description: 'Style adapté au sujet, figures de style', points: 3 },
        { label: 'Profondeur émotionnelle', description: 'Le texte évoque l\'émotion de manière subtile', points: 3 }
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
  id: 'ne17-s2-e7',
  numero: 7,
  titre: 'Journal réflexif sur le vocabulaire',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à l\'impact du choix des mots',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment le vocabulaire utilisé par Goldman affecte-t-il votre compréhension émotionnelle de la chanson ?',
      contexte: 'Le choix des mots n\'est jamais anodin, surtout quand on évoque des sujets aussi graves.',
      sousQuestions: [
        'Quels mots vous ont le plus marqué ? Pourquoi ?',
        'Avez-vous découvert de nouveaux mots ou de nouvelles nuances ?',
        'Comment allez-vous retenir ce vocabulaire ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Réfléchir à l\'impact émotionnel des mots',
        'Identifier vos propres stratégies d\'apprentissage',
        'Faire des liens avec vos connaissances historiques'
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
  id: 'ne17-s2-e8',
  numero: 8,
  titre: 'Bilan lexical',
  type: 'bilan',
  consigne: 'Synthèse du vocabulaire appris',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**Vocabulaire clé maîtrisé** :
    
    - **Champ lexical de la persécution** : étoile, désigner, marquage
    - **Champ lexical de la déportation** : trains, convois, fumée
    - **Vocabulaire de l'intensité** : tragédie, horreur, apocalypse
    - **Termes philosophiques** : contingence, hasard, destin
    
    **Figures de style identifiées** :
    - Métonymie : les trains pour la déportation
    - Symbolisme : l'étoile, la fumée
    
    **Prochaine séance** : Grammaire - Le conditionnel passé et l'expression de l'irréel`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

// ==========================================
// SÉANCE COMPLÈTE
// ==========================================

export const seance2: SeanceCeredis = {
  id: 'ne17-s2',
  chansonId: 'ne17',
  numero: 2,
  titre: 'Vocabulaire : Le champ lexical de la souffrance',
  description: `Exploration approfondie du vocabulaire utilisé par Goldman pour évoquer la tragédie 
  de l'Holocauste. Cette séance développe la conscience lexicale et la sensibilité au choix des mots.`,
  
  objectifs: [
    'Identifier le champ lexical de la souffrance et de la persécution',
    'Analyser la valeur connotative et symbolique des mots',
    'Classer les mots selon leur intensité émotionnelle',
    'Produire un texte en utilisant le vocabulaire étudié',
    'Réfléchir sur l\'impact du choix lexical'
  ],
  
  dureeEstimee: 56,
  
  ecrans: [
    ecran1,
    ecran2,
    ecran3,
    ecran4,
    ecran5,
    ecran6,
    ecran7,
    ecran8
  ],
  
  competences: ['1.2', '2.1', '2.2', '3.2', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 55,
    distributionEvidences: {
      P1: 2,
      P2: 2,
      P3: 1,
      P4: 2
    },
    competencesUniques: ['1.2', '2.1', '2.2', '3.2', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
  }
};

export default seance2;
