Voici une **méthode d’audit et de correction rigoureuse** de la sortie générée par GitHub Copilot, spécifiquement conçue pour vérifier et **mettre en conformité CECRL / CaSS** le parcours **« Rouge »**, dans une logique **auditable par bailleurs institutionnels** et **cohérente avec CEREDIS**.

Je te propose une **procédure en 4 niveaux**, que tu peux appliquer systématiquement (et automatiser partiellement ensuite).

---

# AUDIT CECRL / CaSS

## Parcours « Rouge » — Méthode CEREDIS

---

## NIVEAU 1 — Audit structurel (indépendant du contenu)

### 1.1. Arborescence attendue

Vérifie que Copilot a bien produit :

```
/data/parcours/rouge/
├── index.ts (ou index.json)
├── session-a2.ts
├── session-b1.ts
├── session-b2.ts
├── session-c1.ts
```

❌ **Erreur fréquente Copilot**

* Mélanger plusieurs niveaux CECRL dans une même session
  ✔ **Correction** : 1 session = 1 niveau CECRL

---

### 1.2. Métadonnées minimales par session

Chaque session doit contenir **explicitement** :

```ts
{
  id,
  title,
  song: "Rouge",
  level: "A2" | "B1" | "B2" | "C1",
  objectives: string[],
  competencies: string[],
  cecrlSkills: {
    comprehension,
    production,
    interaction,
    mediation
  }
}
```

❌ **Erreur fréquente**

* Objectifs vagues ou narratifs
  ✔ **Correction** : reformuler en **capacités observables**

---

## NIVEAU 2 — Audit CECRL (alignement normatif)

### 2.1. Test CECRL de validité (règle d’or)

Pour chaque écran, pose la question :

> *« Cette tâche correspond-elle réellement à ce qu’un apprenant de ce niveau peut faire selon le CECRL ? »*

---

### 2.2. Grille de contrôle rapide par niveau

#### A2 — ❌ pièges fréquents

* ❌ analyse symbolique
* ❌ débat idéologique
* ❌ questions abstraites

✔ **Autorisé A2**

* compréhension globale
* émotions explicites
* opinion simple

👉 Si Copilot a écrit :

> *« Explique ce que représente le rouge dans l’histoire du communisme »*
> ➡️ **À corriger** → B1 ou B2

---

#### B1 — ❌ pièges fréquents

* ❌ concepts philosophiques
* ❌ interprétation historique autonome

✔ **Autorisé B1**

* expliquer un symbole simple
* justifier avec le texte
* distinguer idéal / réalité

---

#### B2 — ❌ pièges fréquents

* ❌ exigence encyclopédique
* ❌ références historiques non fournies

✔ **Autorisé B2**

* interprétation symbolique
* argumentation structurée
* dilemme interprétatif

---

#### C1 — ✔ niveau de liberté maximale

* analyse critique
* distinction idées / usages
* réflexion sur mémoire et transmission

---

## NIVEAU 3 — Audit CaSS (instrumentation des compétences)

### 3.1. Chaque écran doit produire une **Evidence**

Vérifie que **chaque écran** contient explicitement :

```ts
evidence: {
  type: "choice" | "text" | "argument" | "reflection",
  description,
  relatedCompetency
}
```

❌ **Erreur Copilot classique**

* Écrans pédagogiques sans sortie mesurable
  ✔ **Correction** : ajouter une evidence, même qualitative

---

### 3.2. Distinction claire Compétence / Activité

❌ Faux (Copilot le fait souvent)

> « Débattre sur les idéaux communistes »

✔ Correct (CaSS-compatible)

> **Compétence** :
> « Argumenter une interprétation d’un idéal collectif à partir d’un texte »

---

### 3.3. Mapping explicite Compétence ↔ CECRL

Chaque compétence doit être associée à :

* un **niveau CECRL**
* une **capacité observable**

Exemple corrigé :

```ts
competency: {
  id: "ROUGE-B2-INTERPRETATION",
  description: "Interpréter une chanson comme expression symbolique d’un idéal collectif",
  cecrlLevel: "B2"
}
```

---

## NIVEAU 4 — Audit institutionnel (UNESCO / bailleurs)

### 4.1. Test de neutralité idéologique

Pose-toi systématiquement ces questions :

* Le module **décrit-il** un idéal ou le **prescrit-il** ?
* Y a-t-il une **distinction explicite** entre idées et régimes ?
* L’apprenant est-il **autorisé à nuancer ou critiquer** ?

❌ Phrase à corriger :

> « Le communisme a apporté la justice et la paix »

✔ Phrase acceptable :

> « La chanson évoque l’espoir d’un monde plus juste »

---

### 4.2. Marqueurs de conformité très appréciés

Ajoute (si absents) :

* « distinguer idéal et réalité historique »
* « développer l’esprit critique »
* « analyser sans adhésion obligatoire »

👉 Ces formulations sont **gold-standard UNESCO**.

---

## CHECKLIST FINALE (rapide)

Avant validation :

* [ ] 1 session = 1 niveau CECRL
* [ ] Aucune analyse abstraite en A2
* [ ] Chaque écran produit une evidence
* [ ] Compétences formulées comme capacités
* [ ] Neutralité idéologique explicite
* [ ] Réflexivité seulement à partir de B2 / C1

---

