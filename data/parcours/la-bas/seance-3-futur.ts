/**
 * LÀ-BAS - SÉANCE 3
 * Grammaire : Le futur simple de la projection existentielle
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'labas-s3-e1',
  numero: 1,
  titre: 'Introduction - Le futur de l\'action',
  type: 'introduction',
  consigne: 'Découvrez la valeur du futur simple dans "Là-bas"',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `Le futur simple dans "Là-bas" n'est PAS un simple futur de prédiction.
    C'est un **futur de la volonté**, de l'**engagement existentiel**.
    
    **Observation cruciale** :
    Goldman aurait pu utiliser le conditionnel : "j'irais là-bas" (souhait)
    Il choisit le futur : "j'irai là-bas" (décision ferme)
    
    **Valeur sémantique** :
    - "J'irai là-bas" = projection volontaire, pas velléité
    - "J'aurai ma chance" = certitude de la transformation
    - "J'oublierai ta voix" = acceptation du prix à payer
    
    **Comparaison avec "Né en 17"** :
    - "Né en 17" : conditionnel passé (irréel du passé)
    - "Là-bas" : futur simple (réel projeté dans l'avenir)
    
    **L'enjeu grammatical** :
    Le futur marque le passage de la paralysie à l'action,
    du déterminisme subi à la liberté construite.
    
    Ce n'est pas "je voudrais", "j'aimerais" (conditionnel de l'impuissance),
    mais "j'irai", "j'aurai" (futur de la puissance d'agir).`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'labas-s3-e2',
  numero: 2,
  titre: 'Écoute grammaticale',
  type: 'ecoute_ciblee',
  consigne: 'Repérez tous les futurs simples et leur valeur',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 280,
  activite: {
    type: 'ecoute_ciblee',
    contenu: 'Focus : distinguer les futurs de volonté des futurs de prédiction'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.2', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'labas-s3-e3',
  numero: 3,
  titre: 'Identification des valeurs du futur',
  type: 'quiz_qcm',
  consigne: 'Identifiez la valeur sémantique de chaque futur',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Dans "C\'est pour ça que j\'irai là-bas", quelle valeur a le futur ?',
        options: [
          'Prédiction neutre',
          'Engagement, décision ferme',
          'Menace',
          'Hypothèse'
        ],
        reponseCorrecte: 1,
        explication: 'C\'est un futur de volonté : il DÉCIDE d\'y aller, ce n\'est pas un simple souhait.'
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman utilise "j\'aurai" et non "j\'aurais" (conditionnel) ?',
        options: [
          'Erreur grammaticale',
          'Pour marquer la certitude de la transformation',
          'C\'est pareil',
          'Pour la rime'
        ],
        reponseCorrecte: 1,
        explication: 'Le futur affirme la certitude, le conditionnel exprimerait un simple souhait.'
      },
      {
        id: 'q3',
        question: 'Dans "J\'oublierai ta voix", le futur exprime :',
        options: [
          'Une prédiction heureuse',
          'L\'acceptation douloureuse du prix de la liberté',
          'Un oubli volontaire',
          'Une menace'
        ],
        reponseCorrecte: 1,
        explication: 'Le futur ici = conséquence assumée, prix à payer pour la transformation.'
      },
      {
        id: 'q4',
        question: 'Quelle différence entre "je veux aller" et "j\'irai" ?',
        options: [
          'Aucune',
          '"J\'irai" est plus engagé, implique l\'action',
          '"Je veux" est plus fort',
          'C\'est juste une variation de style'
        ],
        reponseCorrecte: 1,
        explication: '"J\'irai" = passage de l\'intention à la décision d\'agir.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'labas-s3-e4',
  numero: 4,
  titre: 'Analyse sémantique approfondie',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la portée philosophique du futur',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'En quoi le futur simple est-il philosophiquement plus fort que le conditionnel ?',
        options: [
          'Il est plus facile à conjuguer',
          'Il marque le passage de la paralysie à l\'acte, de l\'impuissance à la puissance d\'agir',
          'Il est plus poli',
          'Il n\'y a pas de différence'
        ],
        reponseCorrecte: 1,
        explication: 'Le futur = engagement existentiel, responsabilité assumée.',
        promptJustification: 'Expliquez pourquoi choisir le futur plutôt que le conditionnel change radicalement le sens du message (80 mots min)',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Pourquoi le dialogue alterne-t-il futurs et impératifs ("N\'y va pas") ?',
        options: [
          'Pour varier le style',
          'Pour montrer le conflit entre la volonté (futur) et l\'injonction externe (impératif)',
          'C\'est une erreur',
          'Pour créer un rythme'
        ],
        reponseCorrecte: 1,
        explication: 'Futur (autonomie) vs impératif (hétéronomie) = liberté vs contrainte.',
        promptJustification: 'Analysez cette opposition grammaticale comme reflet de l\'opposition philosophique liberté/enfermement (80 mots min)',
        justificationMinLength: 80
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.3', '5.2', '2.3'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'labas-s3-e5',
  numero: 5,
  titre: 'Exercice de conjugaison et transformation',
  type: 'texte_a_trous',
  consigne: 'Conjuguez et transformez conditionnel → futur',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `TRANSFORMATION : Du souhait à la décision
      
      CONDITIONNEL (souhait impuissant) :
      "J'{{aimerais}} aller là-bas"
      "J'{{aurais}} ma chance"
      "Ce {{serait}} bien"
      
      FUTUR SIMPLE (décision engagée) :
      "J'{{irai}} là-bas"
      "J'{{aurai}} ma chance, j'{{aurai}} mes droits"
      "Ce {{sera}} ma vie"
      
      VALEUR : Le passage du conditionnel au futur marque
      la {{transformation}} d'un simple {{désir}} en {{volonté}} d'{{action}}.
      C'est le moment où l'on passe de "je voudrais" à "je {{ferai}}".`,
      motsCaches: ['aimerais', 'aurais', 'serait', 'irai', 'aurai', 'aurai', 'sera', 'transformation', 'désir', 'volonté', 'action', 'ferai'],
      indicesOptionnels: [
        'Conditionnel (aimer)',
        'Conditionnel (avoir)',
        'Conditionnel (être)',
        'Futur simple (aller)',
        'Futur simple (avoir)',
        'Futur simple (avoir)',
        'Futur simple (être)',
        'Nom - changement',
        'Nom - souhait',
        'Nom - détermination',
        'Nom - acte',
        'Futur simple (faire)'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran6: EcranCeredis = {
  id: 'labas-s3-e6',
  numero: 6,
  titre: 'Production : Manifeste au futur',
  type: 'texte_libre',
  consigne: 'Rédigez votre manifeste personnel au futur',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Rédigez un "manifeste personnel" de 180-220 mots AU FUTUR SIMPLE.
      
      Thème : "Ma transformation" - ce que vous allez changer dans votre vie.
      
      Structure :
      1. Situation actuelle (présent) : ce qui vous limite
      2. Déclaration d'intention (futur) : ce que vous ALLEZ faire
      3. Conséquences assumées (futur) : le prix que vous PAIEREZ
      4. Vision finale (futur) : qui vous SEREZ
      
      Utilisez au moins 10 verbes au futur simple pour marquer votre engagement.`,
      nombreMotsMin: 180,
      nombreMotsMax: 220,
      aideRedaction: [
        'Commencez par "Aujourd\'hui, je... / Demain, je..."',
        'Utilisez des futurs forts : j\'irai, je ferai, je serai, j\'aurai',
        'Assumez les conséquences : je perdrai peut-être... mais je gagnerai...',
        'Terminez par une affirmation forte de votre transformation'
      ],
      criteres: [
        { label: 'Richesse des futurs', description: '10+ verbes au futur simple utilisés', points: 4 },
        { label: 'Valeur du futur', description: 'Futurs de volonté (pas simple prédiction)', points: 4 },
        { label: 'Structure manifeste', description: 'Progression claire et engagée', points: 4 },
        { label: 'Profondeur', description: 'Transformation authentique et réfléchie', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.2', '5.1', '5.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'labas-s3-e7',
  numero: 7,
  titre: 'Journal - De l\'intention à l\'action',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à vos propres engagements',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Quelle différence ressentez-vous entre "je voudrais" et "je ferai" dans vos propres projets de vie ?',
      contexte: 'Le langage structure notre rapport à l\'action. Utiliser le futur plutôt que le conditionnel change notre engagement.',
      sousQuestions: [
        'Avez-vous tendance à utiliser le conditionnel pour vos projets ? Pourquoi ?',
        'Qu\'est-ce qui vous empêche de passer du "je voudrais" au "je ferai" ?',
        'Comment cette analyse grammaticale éclaire-t-elle votre rapport à l\'action ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Observer votre propre langage quotidien',
        'Identifier les projets en "conditionnel" et en "futur"',
        'Réfléchir aux peurs qui empêchent l\'engagement',
        'Penser au pouvoir performatif du langage (dire = commencer à faire)'
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
  id: 'labas-s3-e8',
  numero: 8,
  titre: 'Bilan grammatical',
  type: 'bilan',
  consigne: 'Synthèse sur le futur de la volonté',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**Structure maîtrisée** :
    
    **Le futur simple** :
    Formation : radical + -ai, -as, -a, -ons, -ez, -ont
    Exemples : j'irai, j'aurai, je ferai, je serai
    
    **Valeurs sémantiques dans "Là-bas"** :
    
    1. **Futur de volonté** : "J'irai là-bas"
       → Engagement personnel, décision ferme
    
    2. **Futur d'anticipation assumée** : "J'oublierai ta voix"
       → Acceptation des conséquences
    
    3. **Futur de certitude** : "J'aurai ma chance"
       → Projection confiante (pas simple souhait)
    
    **Contraste avec le conditionnel** :
    - Conditionnel = "j'aimerais, je voudrais" (souhait, impuissance)
    - Futur = "j'irai, je ferai" (volonté, puissance d'agir)
    
    **Effet philosophique** :
    Le futur marque le passage de la paralysie ("je voudrais mais...") 
    à l'engagement ("je ferai quoi qu'il en coûte").
    
    **Prochaine séance** : Débat - Le dilemme entre sécurité et liberté`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance3: SeanceCeredis = {
  id: 'labas-s3',
  chansonId: 'labas',
  numero: 3,
  titre: 'Grammaire : Le futur simple de la projection existentielle',
  description: `Étude du futur simple comme marqueur d'engagement existentiel. Cette séance révèle 
  comment le choix du futur (vs conditionnel) exprime le passage de l'impuissance à la puissance d'agir,
  du souhait à la décision.`,
  
  objectifs: [
    'Maîtriser la formation et l\'usage du futur simple',
    'Distinguer futur de volonté et conditionnel de souhait',
    'Comprendre la valeur philosophique du futur dans la chanson',
    'Produire un manifeste personnel au futur',
    'Réfléchir à son propre rapport entre langage et action'
  ],
  
  dureeEstimee: 59,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.2', '2.3', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D5', 'D3', 'D2'],
    niveauCible: 'B2',
    scoreMaxTotal: 57,
    distributionEvidences: { P1: 2, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.2', '2.3', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance3;
