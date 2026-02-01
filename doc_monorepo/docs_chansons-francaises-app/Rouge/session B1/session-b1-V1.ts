// English: Session data for B1 level (Rouge)
export default {
  id: 'rouge-b1',
  level: 'B1',
  title: 'Rouge — Explication des symboles et justification',
  song: {
    title: 'Rouge',
    artist: 'Fredericks Goldman Jones'
  },
  summary: "Objectifs: expliquer le symbole 'rouge', justifier des interprétations guidées, produire un texte explicatif simple.",
  pedagogicalObjectives: [
    "Expliquer ce que représente la couleur 'rouge' dans la chanson",
    "Différencier idéal et réalité à partir d'exemples du texte",
    "Produire un court texte justifiant une interprétation"
  ],
  competencies: [
    "Compréhension détaillée",
    "Production écrite simple (justification)",
    "Interaction guidée"
  ],
  cecrlSkills: {
    comprehension: "Compréhension détaillée: repérer des éléments de sens",
    production: "Rédaction d'un court paragraphe explicatif",
    interaction: "Répondre à une question ouverte et justifier",
    mediation: "Expliquer le sens d'un passage pour un pair"
  },
  screens: [
    {
      id: 'b1-ecoute-ciblee',
      type: 'listening',
      instruction: "Écoutez la chanson une seconde fois: repérez les passages qui évoquent 'idéaux' et ceux qui évoquent 'conflit/violence'.",
      expectedAction: 'Marquer les passages entendus (timestamps ou phrases)',
      evidenceType: 'choice',
      evaluationMode: 'auto'
    },
    {
      id: 'b1-analyse-mot-rouge',
      type: 'comprehension',
      instruction: "Question ouverte: Selon vous, que symbolise le mot 'rouge' dans cette chanson ? Citez une phrase pour appuyer.",
      expectedAction: 'Réponse guidée + citation',
      evidenceType: 'text',
      evaluationMode: 'guided'
    },
    {
      id: 'b1-classement-ideaux-realite',
      type: 'comprehension',
      instruction: "Classez les extraits fournis en 'idéal' ou 'réalité/danger'. Expliquez brièvement votre choix.",
      expectedAction: 'Classement + justification courte',
      evidenceType: 'text',
      evaluationMode: 'guided'
    },
    {
      id: 'b1-production-150',
      type: 'interpretation',
      instruction: "Rédigez un court paragraphe (80-120 mots) expliquant le sens du 'rouge' dans la chanson et pourquoi l'auteur met en tension idéal et réalité.",
      expectedAction: 'Rédaction 80-120 mots',
      evidenceType: 'text',
      evaluationMode: 'guided'
    }
  ]
};
