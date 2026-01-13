/**
 * NÉ EN 17 - SÉANCE 5
 * Production finale : Dissertation philosophique sur le destin
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ne17-s5-e1',
  numero: 1,
  titre: 'Introduction - Projet final',
  type: 'introduction',
  consigne: 'Préparez votre production finale',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `Cette dernière séance du parcours "Né en 17" est consacrée à une **production finale complexe**.
    
    **Objectif** : Rédiger une dissertation philosophique de 400-500 mots sur le thème du destin et de la contingence.
    
    **Ce que vous allez mobiliser** :
    - Le vocabulaire de la souffrance (séance 2)
    - Le conditionnel passé (séance 3)
    - L'argumentation éthique (séance 4)
    - Votre réflexion personnelle
    
    **Critères d'excellence** :
    - Maîtrise linguistique et grammaticale
    - Profondeur de la réflexion philosophique
    - Structure argumentative claire
    - Originalité de la pensée`
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1'],
    evidenceType: 'P1',
    niveau: 'C1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ne17-s5-e2',
  numero: 2,
  titre: 'Écoute de synthèse',
  type: 'ecoute_guidee',
  consigne: 'Dernière écoute avant la production',
  dureeEstimee: 5,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_guidee',
    contenu: 'Écoute globale avec prise de notes pour la dissertation'
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.3', '2.3'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ne17-s5-e3',
  numero: 3,
  titre: 'Plan de dissertation',
  type: 'texte_a_trous',
  consigne: 'Complétez ce plan de dissertation modèle',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `PLAN DE DISSERTATION

I. Introduction
   A. {{Accroche}} : référence à la chanson
   B. {{Problématique}} : le hasard détermine-t-il le destin ?
   C. {{Annonce}} du plan

II. Le poids du hasard
   A. La naissance : un {{fait}} arbitraire
   B. Les conséquences {{irréversibles}}
   C. L'{{injustice}} fondamentale

III. La liberté malgré tout
   A. La {{conscience}} de la contingence
   B. La {{responsabilité}} de mémoire
   C. Le {{choix}} de l'action

IV. Conclusion
   A. {{Synthèse}} des arguments
   B. {{Ouverture}} philosophique`,
      motsCaches: ['Accroche', 'Problématique', 'Annonce', 'fait', 'irréversibles', 'injustice', 'conscience', 'responsabilité', 'choix', 'Synthèse', 'Ouverture'],
      indicesOptionnels: [
        'Premier élément d\'une intro',
        'Question centrale',
        'Structure de l\'argumentation',
        'Événement non choisi',
        'Qui ne peuvent être changées',
        'Absence de justice',
        'Prise de conscience',
        'Devoir moral',
        'Décision libre',
        'Résumé des idées',
        'Prolongement de la réflexion'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.4'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran4: EcranCeredis = {
  id: 'ne17-s5-e4',
  numero: 4,
  titre: 'Dissertation philosophique',
  type: 'texte_libre',
  consigne: 'Rédigez votre dissertation complète',
  dureeEstimee: 25,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**Sujet** : "Entre le hasard de la naissance et la liberté de l'action : 
      quelle place pour la responsabilité individuelle ?"
      
      Rédigez une dissertation de 400-500 mots qui :
      1. Pose clairement la problématique dans l'introduction
      2. Développe au moins trois arguments structurés
      3. Intègre des références à la chanson
      4. Utilise le vocabulaire et les structures grammaticales étudiés
      5. Conclut avec une ouverture personnelle`,
      nombreMotsMin: 400,
      nombreMotsMax: 500,
      aideRedaction: [
        'Introduction : accroche (citation de la chanson) + problématique + annonce du plan',
        'Partie 1 : Le déterminisme du hasard (avec le conditionnel passé)',
        'Partie 2 : La liberté dans les contraintes',
        'Partie 3 : La responsabilité de mémoire',
        'Conclusion : synthèse + ouverture sur votre position personnelle'
      ],
      criteres: [
        { label: 'Structure et organisation', description: 'Plan clair, transitions, progression logique', points: 6 },
        { label: 'Profondeur philosophique', description: 'Réflexion nuancée, complexité de la pensée', points: 6 },
        { label: 'Maîtrise linguistique', description: 'Vocabulaire riche, correction grammaticale', points: 5 },
        { label: 'Références et exemples', description: 'Utilisation pertinente de la chanson et d\'autres références', points: 4 },
        { label: 'Originalité', description: 'Pensée personnelle, créativité argumentative', points: 4 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '3.3', '5.2', '5.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'C1',
    scoreMax: 25
  })
};

const ecran5: EcranCeredis = {
  id: 'ne17-s5-e5',
  numero: 5,
  titre: 'Auto-évaluation',
  type: 'quiz_qcm_justifie',
  consigne: 'Évaluez votre propre production',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Estimez la qualité de votre structure argumentative',
        options: [
          'Excellente - Plan très clair et logique',
          'Bonne - Plan correct avec quelques imprécisions',
          'Moyenne - Structure à améliorer',
          'Faible - Plan peu clair'
        ],
        reponseCorrecte: 0,
        explication: 'L\'auto-évaluation aide à progresser.',
        promptJustification: 'Identifiez précisément les points forts et faibles de votre structure',
        justificationMinLength: 50
      },
      {
        id: 'q2',
        question: 'Comment évaluez-vous votre utilisation du vocabulaire étudié ?',
        options: [
          'Excellente - Vocabulaire riche et pertinent',
          'Bonne - Utilisation correcte',
          'Moyenne - Quelques mots utilisés',
          'Faible - Peu de vocabulaire spécifique'
        ],
        reponseCorrecte: 0,
        explication: 'Le réinvestissement du vocabulaire est essentiel.',
        promptJustification: 'Donnez des exemples concrets de votre usage du vocabulaire',
        justificationMinLength: 50
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6', '5.7'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'ne17-s5-e6',
  numero: 6,
  titre: 'Journal de bord final',
  type: 'journal_reflexif',
  consigne: 'Bilan global du parcours',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Quel a été votre parcours d\'apprentissage à travers ces 5 séances sur "Né en 17" ?',
      contexte: 'Vous avez traversé un parcours complet : découverte, vocabulaire, grammaire, débat, production.',
      sousQuestions: [
        'Quels ont été vos plus grands défis ? Comment les avez-vous surmontés ?',
        'Qu\'avez-vous appris sur la langue française ?',
        'Qu\'avez-vous appris sur vous-même comme apprenant ?',
        'Comment cette chanson a-t-elle changé votre vision du monde ?'
      ],
      nombreMotsMin: 150,
      exemplesReponses: [
        'Retracer votre progression séance par séance',
        'Identifier vos stratégies d\'apprentissage efficaces',
        'Noter les liens entre langue, culture et réflexion personnelle',
        'Planifier vos apprentissages futurs'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6', '5.7'],
    evidenceType: 'P4',
    niveau: 'C1',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'ne17-s5-e7',
  numero: 7,
  titre: 'Bilan du parcours complet',
  type: 'bilan',
  consigne: 'Synthèse des 5 séances',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**PARCOURS "NÉ EN 17 À LEIDENSTADT" - COMPLET**
    
    🎯 **Compétences maîtrisées** :
    
    **Séance 1** - Découverte : Compréhension globale, question morale
    **Séance 2** - Vocabulaire : Champ lexical de la souffrance, analyse sémantique
    **Séance 3** - Grammaire : Conditionnel passé, expression de l'irréel
    **Séance 4** - Débat : Argumentation éthique, pensée nuancée
    **Séance 5** - Production : Dissertation philosophique complexe
    
    📊 **Progression CECRL** : A2 → B1 → B2 → C1
    
    ⭐ **Domaines couverts** : Tous (D1-D5)
    
    💡 **Compétence métalinguistique** : Développée tout au long du parcours
    
    🎉 **FÉLICITATIONS !** Vous avez complété un parcours exigeant qui allie 
    maîtrise linguistique et réflexion philosophique profonde.
    
    **Prochain parcours disponible** : "Là-bas" - Le thème de l'exil et de l'espoir`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'C1',
    scoreMax: 0
  })
};

export const seance5: SeanceCeredis = {
  id: 'ne17-s5',
  chansonId: 'ne17',
  numero: 5,
  titre: 'Production finale : Dissertation philosophique',
  description: `Séance de synthèse et de production complexe. Les apprenants mobilisent 
  l'ensemble des acquis (vocabulaire, grammaire, argumentation) pour produire une dissertation 
  philosophique de haut niveau sur le thème du destin et de la liberté.`,
  
  objectifs: [
    'Mobiliser l\'ensemble des acquis du parcours',
    'Rédiger une dissertation philosophique structurée',
    'Développer une argumentation complexe et nuancée',
    'Pratiquer l\'auto-évaluation critique',
    'Réfléchir sur son parcours d\'apprentissage global'
  ],
  
  dureeEstimee: 70,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7],
  
  competences: ['1.3', '2.3', '3.1', '3.2', '3.3', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D3', 'D5'],
    niveauCible: 'C1',
    scoreMaxTotal: 60,
    distributionEvidences: { P1: 1, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.3', '2.3', '3.1', '3.2', '3.3', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
  }
};

export default seance5;
