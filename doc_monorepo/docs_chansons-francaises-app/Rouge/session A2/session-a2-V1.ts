// English: Session data for A2 level (Rouge)
export default {
  id: 'rouge-a2',
  level: 'A2',
  title: 'Rouge — Compréhension globale et valeurs explicites',
  song: {
    title: 'Rouge',
    artist: 'Fredericks Goldman Jones',
    year: 1993
  },
  summary: "Objectifs: compréhension globale, repérage des valeurs explicites (paix, égalité, justice), expression d'une opinion simple.",
  pedagogicalObjectives: [
    "Comprendre le thème général de la chanson",
    "Identifier des mots-clés liés aux valeurs (amour, paix, école, bonheur)",
    "Exprimer une opinion simple sur le message de la chanson"
  ],
  competencies: [
    "Compréhension orale globale",
    "Production écrite courte",
    "Réaction personnelle simple"
  ],
  cecrlSkills: {
    comprehension: 'Compréhension de l\'oral (global)',
    production: 'Production écrite courte (1–2 phrases)',
    interaction: 'Réaction orale ou écrite simple',
    mediation: 'Non ciblé pour ce niveau'
  },
  screens: [
    {
      id: 'a2-ecoute-globale',
      type: 'listening',
      instruction: "Écoutez la chanson une première fois sans lire les paroles. Essayez de comprendre le thème général.",
      expectedAction: 'Écoute active (aucune réponse à saisir à cet écran)',
      evidenceType: 'reflection',
      evaluationMode: 'auto'
    },
    {
      id: 'a2-lecture-paroles',
      type: 'reading',
      instruction: "Lisez les paroles ci-dessous. Soulignez les mots qui parlent d\'amour, de paix, de bonheur, d\'école.",
      expectedAction: 'Sélection de mots / surlignage',
      evidenceType: 'choice',
      evaluationMode: 'auto'
    },
    {
      id: 'a2-qcm-lexique',
      type: 'comprehension',
      instruction: "QCM: Quel est le thème principal de la chanson ?",
      expectedAction: 'Choisir une option',
      evidenceType: 'choice',
      evaluationMode: 'auto',
      items: [
        { id: 'opt1', text: 'Un monde idéal (amour, pain, écoles, paix)' },
        { id: 'opt2', text: 'Un récit de voyage individuel' },
        { id: 'opt3', text: 'Une histoire d\'amour entre deux personnes' }
      ]
    },
    {
      id: 'a2-production-guidee',
      type: 'interpretation',
      instruction: "Écrivez 1–2 phrases: 'Cette chanson parle d\'un monde où...'",
      expectedAction: 'Rédaction courte (1–2 phrases)',
      evidenceType: 'text',
      evaluationMode: 'guided'
    },
    {
      id: 'a2-reflexion-courte',
      type: 'reflection',
      instruction: "Dites en une phrase si le message vous semble positif, négatif, ou mixte. Pourquoi ? (1 phrase)",
      expectedAction: 'Réponse courte',
      evidenceType: 'reflection',
      evaluationMode: 'guided'
    }
  ]
};
