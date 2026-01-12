/**
 * NÉ EN 17 - SÉANCE 4
 * Débat : Culpabilité et responsabilité historique
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ne17-s4-e1',
  numero: 1,
  titre: 'Introduction - Questions éthiques',
  type: 'introduction',
  consigne: 'Entrez dans le débat moral et philosophique',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `Cette séance aborde les questions éthiques soulevées par la chanson :
    
    - **La culpabilité collective** : Peut-on être coupable par association ?
    - **La responsabilité historique** : Sommes-nous responsables du passé ?
    - **Le devoir de mémoire** : Pourquoi se souvenir ?
    - **L'injustice du hasard** : Comment vivre avec cette réalité ?
    
    Nous allons débattre de ces questions difficiles en respectant la diversité des points de vue.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ne17-s4-e2',
  numero: 2,
  titre: 'Écoute analytique - Vers le débat',
  type: 'ecoute_ciblee',
  consigne: 'Écoutez en identifiant les questions implicites',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_ciblee',
    contenu: 'Focus sur les interrogations morales de la chanson'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.3', '2.2'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ne17-s4-e3',
  numero: 3,
  titre: 'Compréhension des enjeux',
  type: 'quiz_qcm',
  consigne: 'Identifiez les problématiques éthiques',
  dureeEstimee: 8,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quelle question morale centrale pose la chanson ?',
        options: [
          'La liberté individuelle',
          'L\'injustice du hasard de la naissance',
          'La richesse et la pauvreté',
          'L\'amour et l\'amitié'
        ],
        reponseCorrecte: 1,
        explication: 'Goldman interroge pourquoi certains naissent victimes et d\'autres bourreaux par pur hasard.'
      },
      {
        id: 'q2',
        question: 'Le narrateur exprime-t-il de la culpabilité ?',
        options: [
          'Oui, il se sent coupable d\'être né au bon endroit',
          'Non, il refuse toute culpabilité',
          'C\'est ambigu, il interroge cette notion',
          'Il ne se pose pas la question'
        ],
        reponseCorrecte: 2,
        explication: 'La chanson questionne la légitimité d\'une culpabilité basée sur le hasard.'
      },
      {
        id: 'q3',
        question: 'Quel est le rôle du "devoir de mémoire" évoqué ?',
        options: [
          'Oublier le passé',
          'Se venger',
          'Témoigner et ne pas répéter l\'histoire',
          'Ignorer les différences'
        ],
        reponseCorrecte: 2,
        explication: 'Le devoir de mémoire vise à prévenir la répétition des tragédies.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '2.3'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'ne17-s4-e4',
  numero: 4,
  titre: 'Analyse argumentative',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez les arguments et prenez position',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Peut-on se sentir coupable du hasard de sa naissance privilégiée ?',
        options: [
          'Oui, c\'est une responsabilité morale',
          'Non, on ne choisit pas où l\'on naît',
          'C\'est une question complexe sans réponse simple',
          'Cela dépend des circonstances'
        ],
        reponseCorrecte: 2,
        explication: 'La chanson ne donne pas de réponse définitive, elle ouvre le débat.',
        promptJustification: 'Développez votre position personnelle sur cette question en 80 mots minimum',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Sommes-nous responsables des actes de nos ancêtres ?',
        options: [
          'Oui, totalement',
          'Non, pas du tout',
          'Nous avons une responsabilité de mémoire, pas de culpabilité',
          'Seulement si nous répétons les erreurs'
        ],
        reponseCorrecte: 2,
        explication: 'La distinction entre mémoire et culpabilité est essentielle.',
        promptJustification: 'Expliquez cette distinction entre responsabilité de mémoire et culpabilité personnelle',
        justificationMinLength: 80
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '3.1', '5.2', '5.5'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'ne17-s4-e5',
  numero: 5,
  titre: 'Organisation argumentative',
  type: 'ordre_elements',
  consigne: 'Ordonnez ces étapes d\'une argumentation éthique',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: 'Remettez dans l\'ordre les étapes d\'une argumentation sur le devoir de mémoire',
      elements: [
        { id: 'e1', texte: 'Présentation du contexte historique', ordre: 1 },
        { id: 'e2', texte: 'Exposition de la problématique morale', ordre: 2 },
        { id: 'e3', texte: 'Premier argument : responsabilité collective', ordre: 3 },
        { id: 'e4', texte: 'Contre-argument : innocence individuelle', ordre: 4 },
        { id: 'e5', texte: 'Synthèse : distinction mémoire/culpabilité', ordre: 5 },
        { id: 'e6', texte: 'Conclusion : nécessité du devoir de mémoire', ordre: 6 }
      ],
      aide: 'Une argumentation suit une progression logique'
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.4', '5.5'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'ne17-s4-e6',
  numero: 6,
  titre: 'Dissertation argumentée',
  type: 'texte_libre',
  consigne: 'Rédigez une dissertation sur une question éthique',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Sujet : "Le hasard de la naissance détermine-t-il notre destin ?"
      
      Rédigez une dissertation de 250-300 mots en :
      - Introduisant la problématique
      - Développant au moins deux arguments
      - Intégrant un contre-argument
      - Concluant avec une ouverture`,
      nombreMotsMin: 250,
      nombreMotsMax: 300,
      aideRedaction: [
        'Structure : Introduction, développement (thèse, antithèse), conclusion',
        'Utilisez des connecteurs logiques (d\'abord, ensuite, cependant, enfin)',
        'Référez-vous à la chanson comme illustration',
        'Nuancez votre propos, évitez les affirmations trop tranchées'
      ],
      criteres: [
        { label: 'Structure argumentative', description: 'Plan clair et progression logique', points: 5 },
        { label: 'Qualité des arguments', description: 'Arguments pertinents et développés', points: 5 },
        { label: 'Nuance et profondeur', description: 'Pensée nuancée, contre-arguments', points: 3 },
        { label: 'Expression écrite', description: 'Clarté, richesse du vocabulaire, correction', points: 2 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '3.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'C1',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'ne17-s4-e7',
  numero: 7,
  titre: 'Réflexion métacognitive sur le débat',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à votre participation au débat',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment cette séance a-t-elle fait évoluer votre réflexion sur les questions éthiques abordées ?',
      contexte: 'Participer à un débat éthique nécessite d\'écouter, argumenter et parfois changer d\'avis.',
      sousQuestions: [
        'Votre opinion a-t-elle évolué au cours de la séance ? Comment ?',
        'Quelles difficultés avez-vous rencontrées pour argumenter ?',
        'Qu\'avez-vous appris sur vous-même à travers ce débat ?'
      ],
      nombreMotsMin: 120,
      exemplesReponses: [
        'Identifier les moments où votre pensée a évolué',
        'Reconnaître la complexité des questions éthiques',
        'Noter vos stratégies pour construire un argument'
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
  id: 'ne17-s4-e8',
  numero: 8,
  titre: 'Bilan du débat',
  type: 'bilan',
  consigne: 'Synthèse des questions éthiques',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**Questions explorées** :
    
    - La culpabilité par association : légitimité et limites
    - La responsabilité historique vs la culpabilité personnelle
    - Le devoir de mémoire : un impératif moral
    - L'injustice du hasard : une réalité à accepter et à combattre
    
    **Compétences développées** :
    - Argumentation structurée
    - Nuance et complexité de la pensée
    - Écoute et respect des opinions divergentes
    - Expression écrite argumentée
    
    **Prochaine séance** : Production finale - Dissertation philosophique sur le destin`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B2',
    scoreMax: 0
  })
};

export const seance4: SeanceCeredis = {
  id: 'ne17-s4',
  chansonId: 'ne17',
  numero: 4,
  titre: 'Débat : Culpabilité et responsabilité',
  description: `Exploration des questions éthiques soulevées par la chanson : culpabilité collective, 
  responsabilité historique, devoir de mémoire. Développement de l'argumentation nuancée.`,
  
  objectifs: [
    'Comprendre les enjeux éthiques de la chanson',
    'Distinguer culpabilité et responsabilité de mémoire',
    'Construire une argumentation structurée',
    'Développer une pensée nuancée et critique',
    'Réfléchir sur son propre processus de réflexion éthique'
  ],
  
  dureeEstimee: 61,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '5.2', '5.4', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D3', 'D5', 'D2'],
    niveauCible: 'C1',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 2, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '5.2', '5.4', '5.5', '5.6', '5.7']
  }
};

export default seance4;
