Nous allons maintenant **verrouiller méthodologiquement le cœur du système de mesure** :
les **règles d’agrégation des preuves CaSS**, avec **pondération par type de preuve**, en cohérence stricte avec :

* votre **référentiel CEREDIS**,
* l’**échelle CEREDIS continue (0–600)**,
* l’alignement critique avec le **Cadre européen commun de référence pour les langues**,
* et les exigences de **traçabilité scientifique** attendues par les bailleurs.

Ce qui suit constitue un **cadre normatif interne** : il doit être considéré comme **non optionnel** dans l’implémentation.

---

# RÈGLES D’AGRÉGATION DES PREUVES CaSS

## Référentiel CEREDIS – Spécification méthodologique

---

## 1. Principe fondamental (à expliciter officiellement)

> **Une compétence n’est jamais évaluée directement :
> elle est inférée à partir d’un ensemble pondéré de preuves hétérogènes.**

Autrement dit :

* les **preuves** sont premières,
* les **scores de compétence** sont des **estimations construites**,
* la validité repose sur la **diversité contrôlée des preuves**.

---

## 2. Typologie canonique des preuves CEREDIS

Toutes les preuves collectées dans CaSS doivent être classées **dans une et une seule catégorie**.

### 2.1. Les 4 types de preuves retenus

| Code   | Type de preuve                 | Nature cognitive               |
| ------ | ------------------------------ | ------------------------------ |
| **P1** | Réponse guidée / ciblée        | Reconnaissance – compréhension |
| **P2** | Analyse linguistique écrite    | Structuration conceptuelle     |
| **P3** | Production écrite autonome     | Mobilisation intégrée          |
| **P4** | Preuve métacognitive réflexive | Régulation consciente          |

👉 Cette typologie est **définitive** pour la phase pilote.

---

## 3. Pondération par type de preuve (globale CEREDIS)

### 3.1. Pondérations de référence

| Type   | Pondération | Justification scientifique     |
| ------ | ----------- | ------------------------------ |
| **P1** | 15 %        | Faible profondeur cognitive    |
| **P2** | 30 %        | Accès explicite aux mécanismes |
| **P3** | 35 %        | Intégration et transfert       |
| **P4** | 20 %        | Métacognition et contrôle      |

👉 Ces pondérations traduisent une thèse forte :
**la maîtrise langagière se manifeste dans la production contrôlée et la réflexivité**, pas dans la simple reconnaissance.

---

## 4. Règle d’agrégation par compétence (niveau micro)

Chaque compétence (X.Y) est associée à **plusieurs preuves**, idéalement de types différents.

### 4.1. Formule de calcul par compétence

[
Score_{compétence} =
\sum (Score_{preuve_i} \times Poids_{type_i})
]

où :

* chaque **preuve** est évaluée sur **0–100 %**,
* le **poids** dépend du type P1–P4.

---

### 4.2. Règle de diversité minimale (non négociable)

| Niveau CECRL de la compétence | Preuves minimales requises |
| ----------------------------- | -------------------------- |
| A2                            | ≥ 1 × P1 + 1 × P2          |
| B1                            | ≥ 1 × P2 + 1 × P3          |
| B2                            | ≥ 1 × P2 + 1 × P3 + 1 × P4 |
| C1                            | ≥ 1 × P3 + 1 × P4          |

👉 **Sans respect de cette diversité, la compétence ne peut pas être validée**, quel que soit le score.

---

## 5. Règles spécifiques par domaine CEREDIS

### 5.1. Domaines 1 à 4 (communicatifs)

| Domaine      | Contraintes spécifiques              |
| ------------ | ------------------------------------ |
| Oral / Écrit | ≥ 1 preuve P3 obligatoire            |
| Interaction  | ≥ 1 preuve P3 ou interaction simulée |
| Tous         | P1 seul interdit au-delà de A2       |

---

### 5.2. Domaine 5 — Métalinguistique & métacognitif

👉 **Règles renforcées (signature CEREDIS)**

| Compétence 5.x | Règle spécifique                      |
| -------------- | ------------------------------------- |
| 5.1 – 5.2      | P2 obligatoire                        |
| 5.3 – 5.4      | P2 + P3 obligatoires                  |
| 5.5            | P3 + P4 obligatoires                  |
| 5.6            | **P4 obligatoire (preuve dominante)** |
| 5.7            | P3 avec versions successives + P4     |

⚠️ **Aucune compétence du Domaine 5 ne peut être validée sans preuve métacognitive explicite au niveau B2 et C1.**

---

## 6. Règle de plafonnement (anti-artéfact)

Pour éviter les effets de surperformance artificielle :

### 6.1. Plafond par type de preuve

| Type | Contribution maximale      |
| ---- | -------------------------- |
| P1   | ≤ 40 % du score compétence |
| P2   | ≤ 60 %                     |
| P3   | ≤ 70 %                     |
| P4   | ≤ 50 %                     |

👉 Empêche qu’un élève “compense” l’absence de production ou de réflexivité par des réponses guidées.

---

## 7. Exemple concret (Compétence 5.3 – B2)

| Preuve                  | Type | Score | Poids | Contribution |
| ----------------------- | ---- | ----- | ----- | ------------ |
| Analyse du conditionnel | P2   | 80 %  | 30 %  | 24           |
| Commentaire écrit       | P3   | 65 %  | 35 %  | 22,75        |
| Journal réflexif        | P4   | 70 %  | 20 %  | 14           |
| **Total**               |      |       |       | **60,75 %**  |

→ Score compétence 5.3 ≈ **61 %**
→ Niveau CEREDIS : **B2 bas → B2 moyen**

---

## 8. Règle de progression temporelle (pilotage longitudinal)

Dans CaSS :

* les **preuves sont horodatées**,
* les scores de compétence sont :

  * recalculés dynamiquement,
  * pondérés par récence si souhaité (option phase 2).

👉 Cela permet :

* des **courbes de progression**,
* l’identification de **seuils cognitifs**,
* des analyses pré/post expérimentation.

---

## 9. Compatibilité institutionnelle (point clé bailleurs)

* Le **niveau CECRL affiché** est déterminé **après agrégation**,
* Les preuves restent **qualitatives et auditables**,
* Le score numérique est :

  * explicatif,
  * interne,
  * scientifiquement justifié.

👉 Vous respectez strictement l’esprit du CECRL tout en le **rendant mesurable**.

---

## 10. Ce que vous avez maintenant

Vous disposez désormais :

1. d’un **modèle d’agrégation formel**,
2. compatible avec CaSS,
3. cohérent avec l’échelle CEREDIS,
4. défendable scientifiquement,
5. prêt pour une **phase pilote instrumentée**.

---

