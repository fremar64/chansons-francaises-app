// English: Session data for B1 level (Rouge)

const sessionB1Rouge = {
  id: "rouge-session-b1",
  title: "Comprendre les symboles de la chanson « Rouge »",
  song: "Rouge",
  level: "B1",

  pedagogicalObjectives: [
    "Expliquer le sens de symboles simples présents dans la chanson",
    "Distinguer des idées positives et des dangers évoqués dans le texte",
    "Justifier une interprétation à l’aide d’exemples tirés des paroles"
  ],

  competencies: [
    "Expliquer le sens d’un symbole simple à partir d’un texte",
    "Distinguer des idées positives et des dangers exprimés dans une chanson",
    "Justifier une interprétation par une citation ou un exemple du texte"
  ],

  cecrlSkills: {
    comprehension: "Compréhension de textes oraux et écrits sur des sujets familiers",
    production: "Production écrite simple et justifiée",
    interaction: "Échange guidé d’opinions",
    mediation: "Reformulation simple d’idées présentes dans un texte"
  },

  screens: [
    {
      id: "b1-rouge-screen-1",
      type: "listening",
      instruction:
        "Écoutez à nouveau la chanson « Rouge ». Faites attention aux passages qui parlent d’un monde idéal et à ceux qui évoquent des dangers ou des conflits.",
      expectedAction:
        "Choisir, parmi des extraits proposés, ceux qui parlent plutôt d’un idéal et ceux qui parlent plutôt de dangers.",
      evidence: {
        type: "choice",
        description:
          "Identification guidée de passages exprimant un idéal ou des dangers",
        relatedCompetency:
          "Distinguer des idées positives et des dangers exprimés dans une chanson"
      },
      evaluationMode: "auto"
    },

    {
      id: "b1-rouge-screen-2",
      type: "comprehension",
      instruction:
        "Selon vous, que représente la couleur « rouge » dans la chanson ?",
      expectedAction:
        "Choisir une réponse et justifier brièvement avec un exemple du texte.",
      options: [
        "La colère et la violence uniquement",
        "Un idéal collectif et l’espoir d’un monde meilleur",
        "Un événement historique précis",
        "Une couleur sans signification particulière"
      ],
      correctAnswer:
        "Un idéal collectif et l’espoir d’un monde meilleur",
      evidence: {
        type: "choice",
        description:
          "Identification du sens symbolique principal de la couleur « rouge »",
        relatedCompetency:
          "Expliquer le sens d’un symbole simple à partir d’un texte"
      },
      evaluationMode: "auto"
    },

    {
      id: "b1-rouge-screen-3",
      type: "interpretation",
      instruction:
        "Classez les éléments suivants en deux catégories : « Idéal » ou « Danger ». Appuyez-vous sur les paroles de la chanson.",
      expectedAction:
        "Classer des mots ou expressions selon qu’ils évoquent un idéal ou un danger.",
      evidence: {
        type: "choice",
        description:
          "Classement d’éléments du texte entre idéal et danger",
        relatedCompetency:
          "Distinguer des idées positives et des dangers exprimés dans une chanson"
      },
      evaluationMode: "auto"
    },

    {
      id: "b1-rouge-screen-4",
      type: "production",
      instruction:
        "Expliquez en 50 à 80 mots ce que représente le mot « rouge » dans la chanson. Appuyez-vous sur un exemple précis des paroles.",
      expectedAction:
        "Rédiger un court texte explicatif avec au moins un exemple du texte.",
      evidence: {
        type: "text",
        description:
          "Production écrite courte expliquant le symbole « rouge » à partir des paroles",
        relatedCompetency:
          "Justifier une interprétation par une citation ou un exemple du texte"
      },
      evaluationMode: "guided"
    },

    {
      id: "b1-rouge-screen-5",
      type: "reflection",
      instruction:
        "Selon vous, les idées présentées dans la chanson sont-elles faciles ou difficiles à réaliser dans la réalité ? Expliquez en une ou deux phrases.",
      expectedAction:
        "Exprimer une opinion personnelle simple et la justifier brièvement.",
      evidence: {
        type: "reflection",
        description:
          "Réaction personnelle justifiée sur les idées évoquées dans la chanson",
        relatedCompetency:
          "Justifier une interprétation par une citation ou un exemple du texte"
      },
      evaluationMode: "qualitative"
    }
  ]
};

export default sessionB1Rouge;
