Voici une **version corrigée complète de `session-a2.ts`**, **prête à commit**, conforme :

* ✅ **CECRL A2 strict**
* ✅ **Approche par compétences**
* ✅ **Instrumentation CaSS correcte**
* ✅ **Neutralité institutionnelle (UNESCO / bailleurs)**
* ✅ **Cohérence avec le module “Rouge”**

Je fournis **le fichier intégral**, sans commentaires superflus, dans un style **sobre et industrialisable**.

---

## ✅ `session-a2.ts` — VERSION CORRIGÉE (READY TO COMMIT)

```ts
const sessionA2Rouge = {
  id: "rouge-session-a2",
  title: "Découvrir la chanson « Rouge »",
  song: "Rouge",
  level: "A2",

  pedagogicalObjectives: [
    "Comprendre le thème général de la chanson",
    "Identifier des mots liés à des valeurs positives",
    "Exprimer une opinion simple à partir de la chanson"
  ],

  competencies: [
    "Identifier le thème général d’une chanson",
    "Repérer des mots exprimant des valeurs positives",
    "Exprimer une opinion simple à partir d’un texte chanté"
  ],

  cecrlSkills: {
    comprehension: "Compréhension orale globale",
    production: "Production écrite courte",
    interaction: "Réaction simple à un message",
    mediation: "Aucune"
  },

  screens: [
    {
      id: "a2-rouge-screen-1",
      type: "listening",
      instruction: "Écoutez la chanson « Rouge » sans lire les paroles.",
      expectedAction: "Cliquer sur « J’ai écouté la chanson » après l’écoute.",
      evidence: {
        type: "choice",
        description: "Confirmation de l’écoute de la chanson",
        relatedCompetency: "Identifier le thème général d’une chanson"
      },
      evaluationMode: "auto"
    },

    {
      id: "a2-rouge-screen-2",
      type: "reading",
      instruction:
        "Lisez un extrait des paroles et repérez les mots qui parlent d’amour, de paix, de bonheur ou d’école.",
      expectedAction:
        "Sélectionner les mots correspondant à des valeurs positives.",
      evidence: {
        type: "choice",
        description: "Sélection de mots exprimant des valeurs positives",
        relatedCompetency: "Repérer des mots exprimant des valeurs positives"
      },
      evaluationMode: "auto"
    },

    {
      id: "a2-rouge-screen-3",
      type: "comprehension",
      instruction:
        "Quel est le thème principal de la chanson « Rouge » ?",
      expectedAction: "Choisir la bonne réponse.",
      options: [
        "Une histoire d’amour personnelle",
        "Un monde idéal avec plus de justice et de bonheur",
        "Un récit de guerre historique",
        "Une chanson sans message particulier"
      ],
      correctAnswer:
        "Un monde idéal avec plus de justice et de bonheur",
      evidence: {
        type: "choice",
        description: "Identification du thème général de la chanson",
        relatedCompetency: "Identifier le thème général d’une chanson"
      },
      evaluationMode: "auto"
    },

    {
      id: "a2-rouge-screen-4",
      type: "production",
      instruction:
        "Complétez la phrase suivante en une ou deux phrases : « Cette chanson parle d’un monde où… ». Utilisez des mots du texte (par exemple : amour, paix, école, bonheur).",
      expectedAction:
        "Rédiger une phrase simple exprimant le message de la chanson.",
      evidence: {
        type: "text",
        description:
          "Production écrite courte exprimant le message général de la chanson",
        relatedCompetency:
          "Exprimer une opinion simple à partir d’un texte chanté"
      },
      evaluationMode: "guided"
    },

    {
      id: "a2-rouge-screen-5",
      type: "reflection",
      instruction:
        "Selon vous, le message de la chanson est-il plutôt positif ou plutôt négatif ? Expliquez en une phrase.",
      expectedAction:
        "Choisir positif ou négatif et donner une raison simple.",
      evidence: {
        type: "reflection",
        description:
          "Réaction personnelle simple sur le message de la chanson",
        relatedCompetency:
          "Exprimer une opinion simple à partir d’un texte chanté"
      },
      evaluationMode: "qualitative"
    }
  ]
};

export default sessionA2Rouge;
```

---

## ✅ Pourquoi cette version est « clean »

### CECRL

* Aucun dépassement A2
* Pas d’analyse symbolique
* Opinion simple, guidée, lexicalement contrainte

### CaSS

* **Chaque écran produit une evidence**
* Compétences = **capacités observables**
* Mapping clair **écran → compétence → evidence**

### Institutionnel

* Aucune prescription idéologique
* Valeurs présentées comme **contenu du texte**, non comme norme
* Parfaitement **audit-friendly**

---

