
Voici la **formalisation officielle de la release scientifique CEREDIS v1.1**, rédigée comme un **document de référence normative**, utilisable **tel quel** :

* pour le pilotage scientifique,
* pour les bailleurs,
* pour les partenaires institutionnels,
* comme base de citation dans un article ou un rapport.

---

# CEREDIS v1.1

## Release scientifique officielle

**Statut : FIGÉE (baseline normative)**

---

## 1. Identification de la version

* **Nom du référentiel** : CEREDIS – Français par la chanson
* **Version** : **v1.1**
* **Statut** : Release scientifique figée
* **Date de gel** : *(à renseigner, ex. 2026-01-08)*
* **Portée** : Phase pilote lycée (Seconde / Première)
* **Cadre de référence** : CECRL enrichi (approche critique et métacognitive)

---

## 2. Finalité de la version v1.1

CEREDIS v1.1 constitue une **version stabilisée et auditée** du dispositif d’évaluation :

* fondée sur une **échelle numérique continue**,
* alignée sur le CECRL sans s’y réduire,
* intégrant explicitement la **dimension métalinguistique et métacognitive**,
* implémentée via un **moteur déterministe, versionné et testable**.

👉 Cette version est considérée comme **référence scientifique** pour toute expérimentation, analyse statistique ou communication institutionnelle.

---

## 3. Éléments constitutifs figés

### 3.1. Référentiel de compétences

* **5 domaines** (D1 à D5)
* **Domaine 5** : Métalinguistique & Métacognitif

  * **7 compétences atomiques** (5.1 → 5.7)
  * niveaux cibles explicites (A2 → C1)
  * preuves argumentées obligatoires

👉 La définition sémantique et opérationnelle de ces compétences est **figée**.

---

### 3.2. Échelle CEREDIS (continue)

* **Plage** : 0 → 600
* **Fonction** : mesure interne fine des apprentissages
* **Statut** : instrument de mesure, non communiqué directement aux apprenants

#### Mapping CECRL (figé)

| CEREDIS | CECRL |
| ------- | ----- |
| 200–299 | A2    |
| 300–399 | B1    |
| 400–499 | B2    |
| 500–599 | C1    |

---

## 4. Règles décisionnelles normatives (v1.1)

### 4.1. Principe général

> **Un niveau CECRL n’est jamais attribué sur la base du score seul.**

Les niveaux **B2** et **C1** sont soumis à des **conditions qualitatives bloquantes**.

---

### 4.2. Règles B2 (figées)

* Score CEREDIS ≥ **400**
* Présence d’au moins une preuve **P3**
* **Domaine 5 ≥ 60**

➡️ À défaut : **plafonnement au niveau B1**

---

### 4.3. Règles C1 (figées)

* Score CEREDIS ≥ **500**
* Présence d’au moins une preuve **P3** **ET** une **P4**
* **Domaine 5 ≥ 70**

➡️ À défaut : **plafonnement au niveau B2**

---

### 4.4. Principe de non-compensation

* Aucun domaine (D1–D4), même très élevé, **ne peut compenser** un Domaine 5 insuffisant.
* La métacognition est une **condition structurelle** de l’accès aux niveaux avancés.

---

## 5. Implémentation technique figée

### 5.1. Moteur CEREDIS

* **Technologie** : Node.js
* **Architecture** :

  * stateless
  * lecture seule sur CaSS
  * règles pilotées par configuration JSON
* **Sorties** :

  * scores par compétence
  * scores par domaine
  * score CEREDIS global
  * niveau CECRL dérivé

---

### 5.2. Calcul et automatisation

* support **mono-agent** et **batch multi-agents**
* **parallélisme contrôlé** (pool de workers)
* journal d’exécution par batch
* recalcul reproductible à l’identique

---

## 6. Dispositif de validation (golden tests)

CEREDIS v1.1 est assorti d’un **ensemble complet de tests normatifs** :

### 6.1. Tests golden par niveau

* B2
* C1

### 6.2. Tests golden par domaine

* Domaine 5 (bloquant)
* principe de non-compensation inter-domaines

### 6.3. Tests golden par compétence

* compétences 5.1 à 5.7
* validation des invariants cognitifs et métacognitifs

👉 Toute modification future qui ferait échouer ces tests constitue une **rupture de version**.

---

## 7. Conditions de modification et versionnement

### 7.1. Ce qui est autorisé **sans changer de version**

* ajout de données
* nouveaux apprenants
* nouvelles chansons
* amélioration de l’interface
* optimisation technique **sans impact décisionnel**

---

### 7.2. Ce qui impose une **nouvelle version CEREDIS**

* modification des seuils
* modification des règles B2 / C1
* ajout ou suppression de compétences
* modification des pondérations
* modification du Domaine 5

➡️ Toute modification de ce type implique :

* incrément de version (v1.2, v2.0…)
* nouvelle campagne de tests golden
* documentation scientifique associée

---

## 8. Statut institutionnel de CEREDIS v1.1

CEREDIS v1.1 peut être :

* utilisé comme **instrument d’évaluation pilote**,
* cité dans des **rapports UNESCO / PNUD / Banque mondiale**,
* exploité dans des **analyses statistiques pré/post**,
* décrit dans une **publication scientifique**,
* audité comme dispositif d’évaluation formalisé.

---

## 9. Résumé exécutif (1 paragraphe)

> CEREDIS v1.1 est une version scientifique figée d’un référentiel et d’un moteur d’évaluation du français par la chanson, aligné sur le CECRL mais enrichi par une modélisation métalinguistique et métacognitive explicite. Il repose sur une échelle continue, des règles décisionnelles bloquantes pour les niveaux avancés (B2, C1), et un moteur déterministe intégralement testé par des tests normatifs. Cette version constitue la base de référence pour toute expérimentation, analyse ou communication institutionnelle.

---

