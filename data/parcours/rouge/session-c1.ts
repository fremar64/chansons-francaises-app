// English: Session data for C1 level (Rouge)
export default {
  id: 'rouge-c1',
  level: 'C1',
  title: 'Rouge — Lecture historico-philosophique et mémoire critique',
  song: {
    title: 'Rouge',
    artist: 'Fredericks Goldman Jones'
  },
  summary: "Objectifs: analyse historico-philosophique, remise en perspective des idéaux, réflexivité critique et production élaborée.",

  const sessionC1Rouge = {
    id: "rouge-session-c1",
    title: "Mémoire, idéaux collectifs et distance critique dans la chanson « Rouge »",
    song: "Rouge",
    level: "C1",

    pedagogicalObjectives: [
      "Analyser une chanson comme mise en mémoire d’un idéal collectif",
      "Distinguer les idées exprimées dans une œuvre de leurs usages historiques",
      "Construire une réflexion critique et distanciée à partir d’un texte symbolique"
    ],

    competencies: [
      "Analyser une chanson comme mise en mémoire d’un idéal collectif",
      "Distinguer un idéal de ses réalisations historiques",
      "Construire une réflexion critique en mobilisant plusieurs niveaux d’analyse"
    ],

    cecrlSkills: {
      comprehension: "Compréhension fine et critique de textes complexes à forte charge symbolique",
      production: "Production écrite élaborée, structurée et nuancée",
      interaction: "Discussion critique et argumentée de points de vue complexes",
      mediation: "Mise en relation et synthèse d’interprétations multiples"
    },

    screens: [
      {
        id: "c1-rouge-screen-1",
        type: "analysis",
        instruction:
          "Analysez la chanson « Rouge » comme une œuvre de mémoire. Repérez ce qui relève de l’idéal collectif, de l’histoire et de la mise à distance critique.",
        expectedAction:
          "Identifier et classer des éléments du texte selon qu’ils relèvent de l’idéal, de l’histoire ou de la distance critique.",
        evidence: {
          type: "argument",
          description:
            "Analyse structurée distinguant idéal collectif, références historiques et mise à distance critique",
          relatedCompetency:
            "Analyser une chanson comme mise en mémoire d’un idéal collectif"
        },
        evaluationMode: "guided"
      },

      {
        id: "c1-rouge-screen-2",
        type: "interpretation",
        instruction:
          "La chanson « Rouge » peut être lue comme un hommage critique à des idéaux collectifs. Expliquez cette idée sans porter de jugement normatif.",
        expectedAction:
          "Rédiger une analyse expliquant la notion d’hommage critique à partir du texte.",
        evidence: {
          type: "argument",
          description:
            "Interprétation distanciée de la chanson comme hommage critique",
          relatedCompetency:
            "Distinguer un idéal de ses réalisations historiques"
        },
        evaluationMode: "guided"
      },

      {
        id: "c1-rouge-screen-3",
        type: "production",
        instruction:
          "Rédigez un texte argumenté de 250 à 300 mots répondant à la question suivante : « En quoi la chanson “Rouge” permet-elle de réfléchir à la transmission des idéaux collectifs tout en en montrant les limites historiques ? »\n\nVotre texte devra :\n- s’appuyer uniquement sur la chanson,\n- distinguer clairement idées et usages historiques,\n- adopter une posture analytique et non prescriptive.",
        expectedAction:
          "Produire une argumentation structurée et distanciée à partir du texte de la chanson.",
        evidence: {
          type: "argument",
          description:
            "Production écrite longue analysant la transmission des idéaux et leurs limites historiques",
          relatedCompetency:
            "Construire une réflexion critique en mobilisant plusieurs niveaux d’analyse"
        },
        evaluationMode: "qualitative"
      },

      {
        id: "c1-rouge-screen-4",
        type: "reflection",
        instruction:
          "Selon vous, pourquoi est-il important de distinguer un idéal de ses réalisations historiques lorsqu’on analyse une œuvre artistique ? Répondez en quelques phrases.",
        expectedAction:
          "Formuler une réflexion critique et distanciée sur l’analyse des idéaux dans l’art.",
        evidence: {
          type: "reflection",
          description:
            "Réflexion métacritique sur la distinction entre idéaux et usages historiques",
          relatedCompetency:
            "Construire une réflexion critique en mobilisant plusieurs niveaux d’analyse"
        },
        evaluationMode: "qualitative"
      }
    ]
  };

  export default sessionC1Rouge;
