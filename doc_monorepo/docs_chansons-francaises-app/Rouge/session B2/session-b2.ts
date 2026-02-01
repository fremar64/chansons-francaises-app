// English: Session data for B2 level (Rouge)
export default {
  id: 'rouge-b2',
  level: 'B2',
  title: 'Rouge — Analyse symbolique et argumentation',
  song: {
    title: 'Rouge',
    artist: 'Fredericks Goldman Jones'
  },
  summary: "Objectifs: analyser la dimension idéologique et symbolique, construire une argumentation structurée, confronter deux lectures.",
  pedagogicalObjectives: [
    "Interpréter 'rouge' comme symbole idéologique",
    "Analyser l\'opposition idéal / violence dans le texte",
    "Écrire une argumentation structurée (150–200 mots)"
  ],
  competencies: [
    "Compréhension implicite",
    "Production écrite argumentée",
    "Interaction interprétative (débat structuré)"
  ],
  cecrlSkills: {
    comprehension: 'Compréhension implicite et inférences',
    production: 'Argumentation écrite 150–200 mots',
    interaction: 'Débat / confrontation de lectures',
    mediation: 'Synthèse de points de vue opposés'
  },
  screens: [
    {
      id: 'b2-lecture-implicite',
      type: 'reading',
      instruction: "Relisez les paroles et notez trois passages qui montrent la tension entre utopie et conflit.",
      expectedAction: 'Liste de passages + brève annotation',
      evidenceType: 'text',
      evaluationMode: 'auto'
    },
    {
      id: 'b2-dilemme-interpretatif',
      type: 'debate',
      instruction: "Débat guidé: 'Faut-il défendre un idéal même s'il conduit à la violence ?' Préparez deux arguments pour et deux contre.",
      expectedAction: 'Préparation d\'arguments (2 pour / 2 contre)',
      evidenceType: 'argument',
      evaluationMode: 'qualitative'
    },
    {
      id: 'b2-redaction-argumentee',
      type: 'interpretation',
      instruction: "Rédigez une argumentation (150–200 mots) en prenant position et en mobilisant des éléments de la chanson.",
      expectedAction: 'Rédaction 150–200 mots (argumentation structurée)',
      evidenceType: 'argument',
      evaluationMode: 'guided'
    },
    {
      id: 'b2-confrontation-lectures',
      type: 'debate',
      instruction: "Confrontez deux lectures proposées (utopie vs critique) et rédigez une synthèse de 80–120 mots.",
      expectedAction: 'Synthèse 80–120 mots',
      evidenceType: 'text',
      evaluationMode: 'qualitative'
    }
  ]
};
