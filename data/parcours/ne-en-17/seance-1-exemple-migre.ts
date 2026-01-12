/**
 * EXEMPLE DE SÉANCE MIGRÉE - "Né en 17" Séance 1
 * Démontre l'utilisation des types CEREDIS unifiés
 */

import { 
  createCeredisMetadata,
  generateSeanceGlobalMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

/**
 * SÉANCE 1 : Découverte - La question morale
 * 
 * Objectif : Première approche de la chanson "Né en 17 à Leidenstadt"
 * Durée : 50 minutes
 * Niveau : B2-C1
 * 
 * Cette séance démontre :
 * - L'utilisation de metadata CEREDIS sur chaque écran
 * - La progression P1 → P2 → P3 → P4
 * - L'intégration du Domaine 5 (métalinguistique)
 */

// ==========================================
// ÉCRANS DE LA SÉANCE
// ==========================================

const ecran1: EcranCeredis = {
  id: 'ne17-s1-e1',
  numero: 1,
  titre: 'Introduction - Contexte historique',
  type: 'introduction',
  consigne: 'Découvrez le contexte de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `Cette chanson de Jean-Jacques Goldman raconte l'histoire d'une personne 
    née en 1917 à Leidenstadt, pendant la Première Guerre mondiale. 
    Le narrateur s'interroge sur le hasard de la naissance et ses conséquences.`
  },
  // Metadata CEREDIS pour l'introduction
  ceredis: createCeredisMetadata({
    competencies: ['2.1'], // Compréhension écrite globale
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0 // Pas de score pour l'introduction
  })
};

const ecran2: EcranCeredis = {
  id: 'ne17-s1-e2',
  numero: 2,
  titre: 'Première écoute',
  type: 'ecoute_decouverte',
  consigne: 'Écoutez la chanson une première fois et concentrez-vous sur l\'ambiance générale',
  dureeEstimee: 5,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_decouverte',
    contenu: 'Écoute découverte'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.1', '5.2'], // CO globale + Relier forme/sens
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ne17-s1-e3',
  numero: 3,
  titre: 'Compréhension globale',
  type: 'quiz_qcm',
  consigne: 'Répondez aux questions sur le sens général de la chanson',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quel est le thème principal de la chanson ?',
        options: [
          'L\'amour et les relations',
          'Le hasard de la naissance et ses conséquences',
          'La guerre et la paix',
          'La musique et l\'art'
        ],
        reponseCorrecte: 1,
        explication: 'La chanson explore comment le lieu et la date de naissance déterminent le destin.'
      },
      {
        id: 'q2',
        question: 'Quelle période historique est évoquée ?',
        options: [
          'La Révolution française',
          'La Première Guerre mondiale',
          'La Seconde Guerre mondiale',
          'La guerre froide'
        ],
        reponseCorrecte: 2,
        explication: 'Le narrateur parle de 1917 et évoque l\'Holocauste.'
      },
      {
        id: 'q3',
        question: 'Quel sentiment domine dans la chanson ?',
        options: [
          'La joie',
          'La colère',
          'La tristesse et l\'injustice',
          'L\'espoir'
        ],
        reponseCorrecte: 2,
        explication: 'Le ton est grave et interroge l\'injustice du destin.'
      }
    ]
  },
  // P1 : Réception simple (QCM)
  ceredis: createCeredisMetadata({
    competencies: ['1.1', '2.1'], // CO + CE globale
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'ne17-s1-e4',
  numero: 4,
  titre: 'Analyse du vocabulaire',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez les mots-clés et justifiez vos choix',
  dureeEstimee: 10,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie "la contingence" dans le contexte de la chanson ?',
        options: [
          'La nécessité',
          'Le hasard',
          'La liberté',
          'La responsabilité'
        ],
        reponseCorrecte: 1,
        explication: 'La contingence désigne ce qui aurait pu être autrement, le hasard.',
        promptJustification: 'Expliquez comment ce concept est illustré dans la chanson',
        justificationMinLength: 50
      },
      {
        id: 'q2',
        question: 'Pourquoi le lieu "Leidenstadt" est-il symbolique ?',
        options: [
          'C\'est une ville célèbre',
          'Le nom évoque la souffrance (Leiden = souffrir en allemand)',
          'C\'est le lieu de naissance de Goldman',
          'C\'est une ville imaginaire'
        ],
        reponseCorrecte: 1,
        explication: 'Leidenstadt évoque "Leiden" (souffrir) en allemand.',
        promptJustification: 'Analysez le choix de ce nom par rapport au thème de la chanson',
        justificationMinLength: 50
      }
    ]
  },
  // P2 : Analyse guidée (QCM avec justification)
  // Valide aussi D5 car justification textuelle requise
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.1', '5.2'], // CE analytique + Métalinguistique
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'ne17-s1-e5',
  numero: 5,
  titre: 'Texte à trous - Verbes conjugués',
  type: 'texte_a_trous',
  consigne: 'Complétez le texte avec les verbes conjugués appropriés',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `Si j'{{étais}} né en 17 à Leidenstadt
      On {{aurait}} sûrement {{désigné}} mon étoile
      J'{{aurais}} {{passé}} les nuits à {{épier}} les trains`,
      motsCaches: ['étais', 'aurait', 'désigné', 'aurais', 'passé', 'épier'],
      indicesOptionnels: [
        'Imparfait (être)',
        'Conditionnel passé (avoir)',
        'Participe passé (désigner)',
        'Conditionnel passé (avoir)',
        'Participe passé (passer)',
        'Infinitif (épier)'
      ]
    }
  },
  // P2 : Analyse linguistique
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'], // Identifier formes + Valeur sémantique
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'ne17-s1-e6',
  numero: 6,
  titre: 'Débat interprétatif',
  type: 'texte_libre',
  consigne: 'Rédigez votre interprétation de la question morale posée par la chanson',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: 'Selon vous, quelle est la question morale principale de la chanson ? Développez votre réponse.',
      nombreMotsMin: 100,
      nombreMotsMax: 250,
      aideRedaction: [
        'Identifiez la question centrale',
        'Utilisez des exemples précis de la chanson',
        'Exprimez votre point de vue personnel',
        'Concluez sur l\'universalité du message'
      ],
      criteres: [
        { label: 'Identification de la question', description: 'La question morale est clairement identifiée', points: 4 },
        { label: 'Argumentation', description: 'Les arguments sont développés et illustrés', points: 5 },
        { label: 'Qualité de l\'expression', description: 'Clarté et richesse de l\'expression', points: 3 },
        { label: 'Profondeur de la réflexion', description: 'Réflexion personnelle et nuancée', points: 3 }
      ]
    }
  },
  // P3 : Production argumentée
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.5'], // Production + Mobilisation analyse
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'ne17-s1-e7',
  numero: 7,
  titre: 'Journal réflexif',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à votre propre rapport au hasard et à la contingence',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      titre: 'Ma réflexion sur le hasard',
      questionPrincipale: 'Comment cette chanson vous a-t-elle fait réfléchir sur votre propre vie ?',
      sousQuestions: [
        'Avez-vous déjà pensé au hasard de votre naissance ?',
        'Comment cette chanson change-t-elle votre perspective ?',
        'Quelles stratégies avez-vous utilisées pour comprendre les passages difficiles ?'
      ],
      promptsReflexion: [
        'Soyez honnête dans votre réflexion',
        'Il n\'y a pas de bonne ou mauvaise réponse',
        'Prenez le temps de réfléchir avant d\'écrire'
      ]
    }
  },
  // P4 : Métacognition
  ceredis: createCeredisMetadata({
    competencies: ['5.6'], // Verbaliser stratégies
    evidenceType: 'P4',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran8: EcranCeredis = {
  id: 'ne17-s1-e8',
  numero: 8,
  titre: 'Bilan de séance',
  type: 'bilan',
  consigne: 'Récapitulatif de ce que vous avez appris',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `Vous avez découvert la chanson "Né en 17 à Leidenstadt" et exploré la question morale qu'elle pose.
    
    **Points clés** :
    - Le hasard de la naissance détermine le destin
    - L'utilisation du conditionnel pour exprimer l'irréel
    - La dimension symbolique du nom "Leidenstadt"
    - L'importance de la réflexion personnelle face à une œuvre
    
    **Prochaine séance** : Analyse approfondie du vocabulaire de la souffrance`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'], // Métacognition
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

// ==========================================
// SÉANCE COMPLÈTE
// ==========================================

export const seance1: SeanceCeredis = {
  id: 'ne17-s1',
  chansonId: 'ne17',
  numero: 1,
  titre: 'Découverte : La question morale',
  description: `Première approche de la chanson "Né en 17 à Leidenstadt". 
  Cette séance explore le thème de la contingence et de l'injustice du destin à travers 
  l'histoire d'une personne née en 1917 à Leidenstadt.`,
  
  objectifs: [
    'Comprendre le contexte historique de la chanson',
    'Identifier la question morale centrale',
    'Analyser l\'utilisation du conditionnel et sa valeur sémantique',
    'Développer une réflexion personnelle sur le hasard et la contingence',
    'Verbaliser ses stratégies de compréhension'
  ],
  
  dureeEstimee: 50,
  
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
  
  // Compétences au format CEREDIS
  competences: ['1.1', '2.1', '2.2', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6'],
  
  // Metadata globale auto-générée
  ceredisGlobal: {
    domainesPrincipaux: ['D1', 'D2', 'D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 55,
    distributionEvidences: {
      P1: 2,  // 2 activités P1 (QCM simple, écoute)
      P2: 2,  // 2 activités P2 (QCM justifié, texte à trous)
      P3: 1,  // 1 activité P3 (texte libre)
      P4: 2   // 2 activités P4 (journal, bilan)
    },
    competencesUniques: ['1.1', '2.1', '2.2', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6']
  }
};

// ==========================================
// VALIDATION
// ==========================================

import { validateSeanceCeredis } from '@/types/ceredis';

const validation = validateSeanceCeredis(seance1);
if (!validation.valid) {
  console.error('❌ Erreurs de validation:', validation.errors);
} else {
  console.log('✅ Séance valide !');
}

// Export par défaut
export default seance1;
