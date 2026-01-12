/**
 * NÉ EN 17 - SÉANCE 3
 * Grammaire : Le conditionnel passé et l'expression de l'irréel
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
  id: 'ne17-s3-e1',
  numero: 1,
  titre: 'Introduction - Le conditionnel passé',
  type: 'introduction',
  consigne: 'Découvrez l\'usage grammatical central de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `La chanson "Né en 17 à Leidenstadt" est construite entièrement au conditionnel passé, 
    temps de l'irréel du passé. Goldman l'utilise pour exprimer ce qui aurait pu être mais n'a pas été.
    
    **Structure grammaticale** :
    - Conditionnel passé : auxiliaire au conditionnel présent + participe passé
    - "J'aurais eu", "On aurait désigné", "J'aurais passé"
    
    **Valeur sémantique** :
    - Exprime l'hypothèse sur le passé
    - Évoque un destin alternatif
    - Crée un effet de distance et de regret
    
    Cette séance vous permettra de maîtriser cette structure complexe et sa valeur expressive.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ne17-s3-e2',
  numero: 2,
  titre: 'Écoute grammaticale ciblée',
  type: 'ecoute_ciblee',
  consigne: 'Écoutez et repérez tous les verbes au conditionnel passé',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_ciblee',
    contenu: 'Focus sur les structures grammaticales au conditionnel passé',
    objectifCible: 'Identifier les formes verbales au conditionnel passé'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.2', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ne17-s3-e3',
  numero: 3,
  titre: 'Identification des formes',
  type: 'quiz_qcm',
  consigne: 'Identifiez les formes au conditionnel passé',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quelle est la forme correcte du conditionnel passé de "être" à la 1ère personne ?',
        options: [
          'Je serais',
          'J\'aurais été',
          'J\'avais été',
          'Je serai'
        ],
        reponseCorrecte: 1,
        explication: 'Le conditionnel passé se forme avec l\'auxiliaire au conditionnel présent + participe passé.'
      },
      {
        id: 'q2',
        question: 'Dans "On aurait désigné mon étoile", quel est l\'auxiliaire ?',
        options: [
          'être',
          'avoir',
          'aller',
          'faire'
        ],
        reponseCorrecte: 1,
        explication: 'Le verbe "désigner" se conjugue avec l\'auxiliaire avoir.'
      },
      {
        id: 'q3',
        question: 'Quelle valeur le conditionnel passé exprime-t-il dans cette chanson ?',
        options: [
          'Une action future',
          'Une action présente',
          'Un fait irréel du passé',
          'Une certitude'
        ],
        reponseCorrecte: 2,
        explication: 'Le conditionnel passé exprime ici ce qui aurait pu se passer mais ne s\'est pas produit.'
      },
      {
        id: 'q4',
        question: 'Comment se forme le conditionnel passé ?',
        options: [
          'Auxiliaire au présent + participe passé',
          'Auxiliaire au conditionnel présent + participe passé',
          'Auxiliaire à l\'imparfait + participe passé',
          'Verbe au futur + "avoir"'
        ],
        reponseCorrecte: 1,
        explication: 'Structure : auxiliaire (être/avoir) au conditionnel présent + participe passé du verbe.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'ne17-s3-e4',
  numero: 4,
  titre: 'Analyse de la valeur sémantique',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la valeur du conditionnel passé dans différents contextes',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman utilise-t-il le conditionnel passé plutôt que le passé composé ?',
        options: [
          'C\'est plus facile à conjuguer',
          'Pour exprimer l\'irréalité et le destin alternatif',
          'C\'est une erreur grammaticale',
          'Pour parler du futur'
        ],
        reponseCorrecte: 1,
        explication: 'Le conditionnel passé crée une distance avec la réalité et exprime ce qui n\'a pas eu lieu.',
        promptJustification: 'Expliquez comment ce choix grammatical renforce le message de la chanson',
        justificationMinLength: 60
      },
      {
        id: 'q2',
        question: 'Quel effet produit l\'accumulation de conditionnels passés dans la chanson ?',
        options: [
          'Un effet de répétition ennuyeux',
          'Un effet d\'insistance sur l\'irréel',
          'Un effet de confusion',
          'Aucun effet particulier'
        ],
        reponseCorrecte: 1,
        explication: 'La répétition martèle l\'idée d\'un destin qui aurait pu être différent.',
        promptJustification: 'Analysez comment cette accumulation crée une atmosphère particulière',
        justificationMinLength: 60
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.3', '5.2', '2.2'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'ne17-s3-e5',
  numero: 5,
  titre: 'Exercice de conjugaison',
  type: 'texte_a_trous',
  consigne: 'Conjuguez les verbes au conditionnel passé',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `Si je/j' {{étais}} né en 17 à Leidenstadt,
      On {{aurait}} sûrement {{désigné}} mon étoile,
      Et je/j' {{aurais}} {{passé}} mes nuits à {{épier}} les trains.
      
      Dans ces wagons qui {{auraient}} {{emmené}} mes frères,
      Voir ces visages qui {{auraient}} {{pu}} être les miens,
      Je/J' {{aurais}} {{cherché}} des yeux mon père.`,
      motsCaches: ['étais', 'aurait', 'désigné', 'aurais', 'passé', 'épier', 'auraient', 'emmené', 'auraient', 'pu', 'aurais', 'cherché'],
      indicesOptionnels: [
        'Imparfait (être)',
        'Conditionnel présent (avoir)',
        'Participe passé (désigner)',
        'Conditionnel présent (avoir)',
        'Participe passé (passer)',
        'Infinitif (épier)',
        'Conditionnel présent (avoir)',
        'Participe passé (emmener)',
        'Conditionnel présent (avoir)',
        'Participe passé (pouvoir)',
        'Conditionnel présent (avoir)',
        'Participe passé (chercher)'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 12
  })
};

const ecran6: EcranCeredis = {
  id: 'ne17-s3-e6',
  numero: 6,
  titre: 'Production grammaticale créative',
  type: 'texte_libre',
  consigne: 'Rédigez un texte au conditionnel passé',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Imaginez un autre destin alternatif pour le narrateur. Rédigez un paragraphe 
      (120-180 mots) en utilisant majoritairement le conditionnel passé pour décrire ce qui 
      aurait pu se passer si la personne était née à une autre époque ou dans un autre lieu.`,
      nombreMotsMin: 120,
      nombreMotsMax: 180,
      aideRedaction: [
        'Commencez par "Si j\'étais né(e)..."',
        'Utilisez au moins 6 verbes au conditionnel passé',
        'Créez un contraste entre le destin réel et le destin imaginé',
        'Terminez par une réflexion sur le hasard'
      ],
      criteres: [
        { label: 'Correction grammaticale', description: 'Formes du conditionnel passé correctes', points: 6 },
        { label: 'Richesse des structures', description: 'Variété des verbes et des constructions', points: 4 },
        { label: 'Cohérence narrative', description: 'Le récit est logique et fluide', points: 3 },
        { label: 'Créativité', description: 'Le destin alternatif est original et réfléchi', points: 2 }
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
  id: 'ne17-s3-e7',
  numero: 7,
  titre: 'Réflexion métalinguistique',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à votre apprentissage du conditionnel passé',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment la chanson vous a-t-elle aidé à comprendre l\'usage et la valeur du conditionnel passé ?',
      contexte: 'Apprendre une structure grammaticale dans un contexte authentique facilite la mémorisation et la compréhension.',
      sousQuestions: [
        'Quelles difficultés avez-vous rencontrées avec cette structure ?',
        'Comment allez-vous mémoriser la formation du conditionnel passé ?',
        'Dans quelles situations pourriez-vous utiliser ce temps à l\'avenir ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Identifier ce qui vous a aidé dans cette séance',
        'Proposer vos propres stratégies de mémorisation',
        'Faire des liens avec d\'autres temps verbaux que vous connaissez'
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
  id: 'ne17-s3-e8',
  numero: 8,
  titre: 'Bilan grammatical',
  type: 'bilan',
  consigne: 'Synthèse des apprentissages grammaticaux',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**Structure maîtrisée** :
    
    **Formation du conditionnel passé** :
    - Auxiliaire être/avoir au conditionnel présent
    - + Participe passé du verbe
    - Exemples : j'aurais été, on aurait désigné, nous serions partis
    
    **Valeur sémantique** :
    - Expression de l'irréel du passé
    - Évocation d'un destin alternatif
    - Distance temporelle et émotionnelle
    
    **Effet stylistique** :
    - Crée une atmosphère de regret
    - Martèle l'injustice du hasard
    - Renforce le message philosophique
    
    **Prochaine séance** : Débat - Culpabilité et responsabilité historique`
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

export const seance3: SeanceCeredis = {
  id: 'ne17-s3',
  chansonId: 'ne17',
  numero: 3,
  titre: 'Grammaire : Le conditionnel passé',
  description: `Étude approfondie du conditionnel passé, temps central de la chanson. 
  Cette séance permet de maîtriser la formation et la valeur sémantique de ce temps complexe 
  à travers un contexte authentique et signifiant.`,
  
  objectifs: [
    'Maîtriser la formation du conditionnel passé',
    'Comprendre la valeur sémantique de l\'irréel du passé',
    'Identifier les effets stylistiques produits',
    'Produire des énoncés au conditionnel passé',
    'Développer des stratégies de mémorisation grammaticale'
  ],
  
  dureeEstimee: 59,
  
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
  
  competences: ['1.2', '2.1', '2.2', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D5', 'D3', 'D2'],
    niveauCible: 'B2',
    scoreMaxTotal: 57,
    distributionEvidences: {
      P1: 2,
      P2: 2,
      P3: 1,
      P4: 2
    },
    competencesUniques: ['1.2', '2.1', '2.2', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance3;
