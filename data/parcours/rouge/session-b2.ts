// English: Session data for B2 level (Rouge)

const sessionB2Rouge = {
  id: "rouge-session-b2",
  title: "Interpréter les idéaux et les tensions dans la chanson « Rouge »",
  song: "Rouge",
  level: "B2",

  pedagogicalObjectives: [
    "Interpréter le sens implicite d’une chanson à partir de ses symboles",
    "Analyser la tension entre idéal collectif et risques évoqués dans le texte",
    "Construire une argumentation nuancée à partir de plusieurs interprétations possibles"
  ],

  competencies: [
    "Analyser une chanson comme expression d’un idéal collectif",
    "Identifier les tensions entre espoir et danger dans un texte symbolique",
    "Argumenter une interprétation en confrontant deux points de vue"
  ],

  cecrlSkills: {
    comprehension: "Compréhension fine de textes complexes à contenu implicite",
    production: "Production écrite structurée et argumentée",
    interaction: "Confrontation raisonnée de points de vue",
    mediation: "Synthèse de différentes interprétations d’un même texte"
  },

  screens: [
    {
      id: "b2-rouge-screen-1",
      type: "reading",
      instruction:
        "Lisez attentivement les paroles de la chanson « Rouge ». Repérez les passages qui évoquent un idéal collectif et ceux qui évoquent des risques ou des conflits.",
      expectedAction:
        "Sélectionner, parmi des extraits proposés, ceux qui relèvent plutôt de l’idéal et ceux qui relèvent plutôt du danger.",
      evidence: {
        type: "choice",
        description:
          "Identification des passages exprimant un idéal collectif ou des risques",
        relatedCompetency:
          "Identifier les tensions entre espoir et danger dans un texte symbolique"
      },
      evaluationMode: "auto"
    },

    {
      id: "b2-rouge-screen-2",
      type: "interpretation",
      instruction:
        "Selon vous, quel est le sens principal de la chanson « Rouge » ? Choisissez l’interprétation qui vous semble la plus juste.",
      expectedAction:
        "Choisir une interprétation et expliquer brièvement son choix à l’aide du texte.",
      options: [
        "Une célébration simple d’un monde idéal sans limites",
        "Une évocation poétique d’un idéal collectif accompagnée de mises en garde",
        "Un récit historique précis sur un événement du passé",
        "Une chanson uniquement descriptive sans message symbolique"
      ],
      correctAnswer:
        "Une évocation poétique d’un idéal collectif accompagnée de mises en garde",
      evidence: {
        type: "argument",
        description:
          "Choix argumenté d’une interprétation globale de la chanson",
        relatedCompetency:
          "Analyser une chanson comme expression d’un idéal collectif"
      },
      evaluationMode: "guided"
    },

    {
      id: "b2-rouge-screen-3",
      type: "analysis",
      instruction:
        "La chanson présente à la fois des images d’espoir et des images de danger. Expliquez cette tension en vous appuyant sur deux exemples précis du texte.",
      expectedAction:
        "Rédiger un court texte explicatif montrant la coexistence de l’idéal et du danger.",
      evidence: {
        type: "argument",
        description:
          "Analyse argumentée de la tension entre idéal et danger à partir du texte",
        relatedCompetency:
          "Identifier les tensions entre espoir et danger dans un texte symbolique"
      },
      evaluationMode: "guided"
    },

    {
      id: "b2-rouge-screen-4",
      type: "production",
      instruction:
        "Rédigez un texte argumenté de 150 à 180 mots répondant à la question suivante : « En quoi la chanson “Rouge” peut-elle être comprise comme une réflexion sur les idéaux collectifs et leurs risques ? » Appuyez-vous uniquement sur les paroles.",
      expectedAction:
        "Produire une argumentation structurée à partir du texte de la chanson.",
      evidence: {
        type: "argument",
        description:
          "Production écrite argumentée analysant les idéaux et les risques évoqués dans la chanson",
        relatedCompetency:
          "Argumenter une interprétation en confrontant deux points de vue"
      },
      evaluationMode: "qualitative"
    },

    {
      id: "b2-rouge-screen-5",
      type: "reflection",
      instruction:
        "Selon vous, pourquoi une chanson peut-elle présenter des idéaux tout en montrant leurs limites ou leurs dangers ? Répondez en quelques phrases.",
      expectedAction:
        "Formuler une réflexion personnelle nuancée à partir de l’analyse du texte.",
      evidence: {
        type: "reflection",
        description:
          "Réflexion personnelle sur la complexité des idéaux collectifs",
        relatedCompetency:
          "Argumenter une interprétation en confrontant deux points de vue"
      },
      evaluationMode: "qualitative"
    }
  ]
};

export default sessionB2Rouge;
