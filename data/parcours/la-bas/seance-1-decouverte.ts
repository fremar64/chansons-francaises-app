/**
 * LÀ-BAS - SÉANCE 1
 * Découverte : La liberté conquise contre le déterminisme social
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'labas-s1-e1',
  numero: 1,
  titre: 'Introduction - Un hymne philosophique à la liberté',
  type: 'introduction',
  consigne: 'Découvrez la profondeur philosophique de "Là-bas"',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `"Là-bas" n'est pas une simple chanson sur le rêve d'exotisme. C'est une œuvre philosophique 
    profonde sur la **liberté conquise contre le déterminisme social**.
    
    **Le contexte philosophique** :
    "Là-bas" n'est pas un lieu géographique - c'est une **transformation intérieure et existentielle**.
    Goldman pose la question fondamentale : comment se libérer des déterminismes de la naissance ?
    
    **Les deux voix du dialogue** :
    - **La voix masculine** (Goldman) : l'arrachement métaphysique, la quête de liberté authentique
    - **La voix féminine** (Sirima) : l'ancrage dans le familier, la sécurité du "rester ici"
    
    **L'enjeu existentiel** :
    "Tout dépend de ta naissance / Et moi je ne suis pas bien né"
    → Goldman refuse cette fatalité. "Là-bas" = le refus de se réduire aux déterminismes sociaux.
    
    **La question centrale** : Quand on n'est "pas bien né", doit-on accepter son sort ou se rebeller ?`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '2.2'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'labas-s1-e2',
  numero: 2,
  titre: 'Écoute philosophique',
  type: 'ecoute_decouverte',
  consigne: 'Écoutez le dialogue entre les deux voix, l\'opposition ici/là-bas',
  dureeEstimee: 5,
  audioDebut: 0,
  audioFin: 280,
  activite: {
    type: 'ecoute_decouverte',
    contenu: `Concentrez-vous sur :
    - La voix masculine qui affirme "C'est pour ça que j'irais là-bas"
    - La voix féminine qui répond "N'y va pas"
    - L'opposition structurelle ici/là-bas = présent/futur = déterminisme/liberté`
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.1', '1.2', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'labas-s1-e3',
  numero: 3,
  titre: 'Compréhension philosophique',
  type: 'quiz_qcm',
  consigne: 'Identifiez les thèmes philosophiques centraux',
  dureeEstimee: 8,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Que représente vraiment "là-bas" dans la chanson ?',
        options: [
          'Un pays étranger où émigrer',
          'Une transformation intérieure, une liberté conquise',
          'Un simple rêve d\'exotisme',
          'Le passé idéalisé'
        ],
        reponseCorrecte: 1,
        explication: '"Là-bas" est un arrachement métaphysique, pas une destination géographique.'
      },
      {
        id: 'q2',
        question: 'Quelle est la signification de "Tout dépend de ta naissance / Et moi je ne suis pas bien né" ?',
        options: [
          'Une plainte sur sa famille',
          'La dénonciation du déterminisme social',
          'Un regret nostalgique',
          'Une excuse pour ne pas agir'
        ],
        reponseCorrecte: 1,
        explication: 'Goldman refuse la fatalité des origines sociales et affirme la possibilité de se libérer.'
      },
      {
        id: 'q3',
        question: 'Que symbolise la voix féminine qui dit "N\'y va pas" ?',
        options: [
          'La jalousie',
          'L\'amour possessif',
          'La tentation du quotidien rassurant (la "déchéance" heideggérienne)',
          'La sagesse'
        ],
        reponseCorrecte: 2,
        explication: 'Elle incarne la Verfallen (déchéance) : fuir l\'angoisse existentielle en restant dans le familier.'
      },
      {
        id: 'q4',
        question: '"Je me perds si je reste là" signifie :',
        options: [
          'Je vais mourir ici',
          'Je perds mon authenticité en acceptant les déterminismes',
          'Je m\'ennuie',
          'Je veux voyager'
        ],
        reponseCorrecte: 1,
        explication: 'Rester = se perdre soi-même en acceptant ce que les autres ont fait de nous.'
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
  id: 'labas-s1-e4',
  numero: 4,
  titre: 'Analyse du vocabulaire philosophique',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la densité philosophique des mots',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman utilise-t-il "neuf et sauvage" plutôt que "beau et exotique" ?',
        options: [
          'Pour faire plus poétique',
          'Pour évoquer une dé-familiarisation du monde (Unheimlichkeit)',
          'Parce qu\'il aime la nature',
          'Pour critiquer la civilisation'
        ],
        reponseCorrecte: 1,
        explication: '"Neuf et sauvage" évoque l\'inquiétante étrangeté, la sortie de l\'ordinaire non questionné.',
        promptJustification: 'Expliquez comment "neuf et sauvage" suggère une rupture métaphysique avec le monde familier (80 mots min)',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Que signifie "Libre continent sans grillage" ?',
        options: [
          'Un pays sans frontières',
          'La sortie des structures mentales qui nous emprisonnent',
          'L\'Amérique du XIXe siècle',
          'Un endroit sans lois'
        ],
        reponseCorrecte: 1,
        explication: 'Ce n\'est pas l\'absence de contraintes extérieures, mais la libération des cadres mentaux.',
        promptJustification: 'Analysez cette métaphore : en quoi les "grillages" sont-ils d\'abord mentaux, intérieurs ? (80 mots min)',
        justificationMinLength: 80
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
  id: 'labas-s1-e5',
  numero: 5,
  titre: 'Le futur simple de la projection',
  type: 'texte_a_trous',
  consigne: 'Identifiez les futurs simples et leur valeur sémantique',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `C'est pour ça que {{j'irais}} là-bas
      
      {{J'aurai}} ma chance, {{j'aurai}} mes droits
      Et la fierté qu'ici je {{n'ai}} pas
      
      Je {{te}} {{perdrai}} peut-être là-bas
      Mais je {{me}} {{perds}} si je {{reste}} là
      
      VALEUR : Le futur simple ici n'exprime pas un simple souhait, mais une {{projection}} vers un avenir 
      à {{bâtir}} dès maintenant. C'est un futur de la {{volonté}} et de l'{{action}}.`,
      motsCaches: ['j\'irais', 'J\'aurai', 'j\'aurai', 'n\'ai', 'te', 'perdrai', 'me', 'perds', 'reste', 'projection', 'bâtir', 'volonté', 'action'],
      indicesOptionnels: [
        'Futur simple (aller)',
        'Futur simple (avoir)',
        'Futur simple (avoir)',
        'Présent (avoir) négatif',
        'Pronom COD',
        'Futur simple (perdre)',
        'Pronom réfléchi',
        'Présent (perdre)',
        'Présent (rester)',
        'Nom - avenir anticipé',
        'Verbe infinitif - construire',
        'Nom - détermination',
        'Nom - transformation'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'labas-s1-e6',
  numero: 6,
  titre: 'Dissertation : Liberté et déterminisme',
  type: 'texte_libre',
  consigne: 'Rédigez une réflexion philosophique',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Sujet : "Peut-on se libérer des déterminismes de la naissance ?"
      
      Goldman affirme : "Tout dépend de ta naissance / Et moi je ne suis pas bien né" 
      puis : "Je me perds si je reste là".
      
      Rédigez une dissertation de 250-300 mots qui :
      1. Pose le problème du déterminisme social
      2. Explore la réponse de Goldman (le "là-bas" comme transformation)
      3. Analyse les risques de cette quête ("Je te perdrai peut-être")
      4. Prend position sur cette tension entre sécurité et liberté`,
      nombreMotsMin: 250,
      nombreMotsMax: 300,
      aideRedaction: [
        'Introduction : La tension entre déterminisme et liberté',
        'Partie 1 : Le poids du déterminisme social ("Tout dépend de ta naissance")',
        'Partie 2 : La liberté comme arrachement ("Là-bas" = transformation intérieure)',
        'Partie 3 : Le prix de la liberté (perdre les attachements)',
        'Conclusion : Votre position personnelle sur ce dilemme existentiel'
      ],
      criteres: [
        { label: 'Profondeur philosophique', description: 'Compréhension des enjeux métaphysiques', points: 6 },
        { label: 'Structure argumentative', description: 'Organisation claire et progression logique', points: 4 },
        { label: 'Analyse de la chanson', description: 'Références précises aux paroles', points: 3 },
        { label: 'Qualité de l\'expression', description: 'Clarté, vocabulaire philosophique approprié', points: 2 }
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
  id: 'labas-s1-e7',
  numero: 7,
  titre: 'Journal - Ma propre liberté',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à votre propre quête de liberté',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Qu\'est-ce qui, dans votre propre vie, pourrait être votre "là-bas" - cette transformation intérieure nécessaire ?',
      contexte: 'La liberté n\'est pas donnée, elle se conquiert. Goldman nous interroge sur nos propres "grillages" mentaux.',
      sousQuestions: [
        'Quels sont les déterminismes (sociaux, familiaux, culturels) qui pèsent sur vous ?',
        'Avez-vous déjà ressenti le besoin d\'un "là-bas", d\'une transformation ?',
        'Quel prix seriez-vous prêt(e) à payer pour cette liberté ?',
        'Comment cette chanson change-t-elle votre perspective sur la liberté ?'
      ],
      nombreMotsMin: 120,
      exemplesReponses: [
        'Identifier honnêtement les contraintes qui pèsent sur vos choix',
        'Réfléchir à ce que serait pour vous une vie authentiquement libre',
        'Penser aux renoncements qu\'implique toute quête de liberté',
        'Ne pas confondre liberté et simple évasion'
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
  id: 'labas-s1-e8',
  numero: 8,
  titre: 'Bilan philosophique',
  type: 'bilan',
  consigne: 'Synthèse de la découverte philosophique',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**Concepts philosophiques découverts** :
    
    - **Le déterminisme social** : "Tout dépend de ta naissance"
    - **La liberté conquise** : "Là-bas" comme transformation intérieure, pas destination géographique
    - **L'arrachement métaphysique** : sortir des structures mentales qui nous emprisonnent
    - **Le prix de la liberté** : "Je te perdrai peut-être / Mais je me perds si je reste là"
    - **Déchéance vs authenticité** : rester dans le familier ou oser l'inconnu
    
    **Goldman comme penseur** :
    Cette chanson révèle Goldman non comme simple auteur de variété, mais comme **penseur de la liberté**.
    Il pose les vraies questions existentielles : comment être libre quand tout semble joué d'avance ?
    
    **Convergences thématiques** :
    - "Envole-moi" : "À coups de livres je franchirai tous ces murs"
    - "C'est ta chance" : "Ta puissance naîtra là" (transformer le "pas de chance" en force)
    - "Il suffira d'un signe" : "Déchirées nos guenilles de vauriens"
    
    **Prochaine séance** : Le vocabulaire de la liberté et de l'enfermement`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B2',
    scoreMax: 0
  })
};

export const seance1: SeanceCeredis = {
  id: 'labas-s1',
  chansonId: 'labas',
  numero: 1,
  titre: 'Découverte : La liberté conquise contre le déterminisme',
  description: `Découverte philosophique de "Là-bas" comme œuvre sur la liberté authentique.
  Cette séance révèle la profondeur métaphysique de la chanson : "là-bas" n'est pas un lieu,
  mais une transformation intérieure qui refuse les déterminismes sociaux.`,
  
  objectifs: [
    'Comprendre "là-bas" comme transformation intérieure, pas destination géographique',
    'Identifier le thème du déterminisme social et de la liberté conquise',
    'Analyser le dialogue entre les deux voix (ancrage vs arrachement)',
    'Saisir la valeur du futur simple (projection volontaire, pas simple souhait)',
    'Réfléchir personnellement sur la liberté et ses renoncements'
  ],
  
  dureeEstimee: 60,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'C1',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 2, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance1;
