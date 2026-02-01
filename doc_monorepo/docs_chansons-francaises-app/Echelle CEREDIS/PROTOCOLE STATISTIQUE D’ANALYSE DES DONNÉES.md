Voici la **formalisation complète du protocole statistique d’analyse des données CEREDIS**, conçue pour être :

* **scientifiquement robuste** (niveau recherche),
* **compatible avec vos choix méthodologiques** (CaSS + échelle CEREDIS),
* **lisible et défendable** auprès des bailleurs (UNESCO, PNUD, Banque mondiale),
* **directement opérable** lors de la phase pilote (avril).

Ce protocole peut être utilisé **tel quel** comme annexe méthodologique.

---

# PROTOCOLE STATISTIQUE D’ANALYSE DES DONNÉES

## Dispositif CEREDIS – Phase pilote (pré / post)

---

## 1. Objectifs généraux de l’analyse

L’analyse statistique vise à :

1. **mesurer l’impact du dispositif CEREDIS** sur les apprentissages en français ;
2. **quantifier la progression** des apprenants entre un temps initial (pré-test) et un temps final (post-test) ;
3. **tester l’hypothèse centrale CEREDIS** :

   > la métacognition et l’analyse métalinguistique (Domaine 5) contribuent significativement à la maîtrise langagière globale ;
4. fournir des **indicateurs objectivés** pour le pilotage pédagogique et le reporting bailleurs.

---

## 2. Design expérimental retenu

### 2.1. Type de design

* **Design quasi-expérimental longitudinal**
* Mesures répétées sur les mêmes sujets :

  * **T0 (pré-test)** : avant utilisation de l’application
  * **T1 (post-test)** : après la séquence CEREDIS

👉 Justification :
dans un contexte scolaire réel, la randomisation stricte est difficile ; le suivi intra-sujets maximise la puissance statistique.

---

### 2.2. Population étudiée

* Élèves de lycée (Seconde / Première)
* Effectif attendu :

  * *n* ≈ 30–60 (phase pilote)
* Unité d’analyse principale : **l’élève**

---

## 3. Variables analysées

### 3.1. Variables principales (quantitatives continues)

| Variable                 | Description                     |
| ------------------------ | ------------------------------- |
| **Score CEREDIS global** | 0–600                           |
| Score Domaine 1          | Compréhension orale             |
| Score Domaine 2          | Compréhension écrite            |
| Score Domaine 3          | Production écrite               |
| Score Domaine 4          | Interaction                     |
| **Score Domaine 5**      | Métalinguistique & métacognitif |

👉 Ces scores sont issus **directement des calculs CaSS**.

---

### 3.2. Variables secondaires (qualitatives / ordinales)

| Variable                | Type                     |
| ----------------------- | ------------------------ |
| Niveau CECRL            | Ordinal (A2, B1, B2, C1) |
| Zone de transition      | Ordinal (B1+, B2−, etc.) |
| Type dominant de preuve | Catégorielle (P1–P4)     |

---

### 3.3. Variables de contrôle (si disponibles)

* Classe / niveau scolaire
* Sexe (si autorisé)
* Fréquence d’usage de l’application
* Nombre total de preuves produites

---

## 4. Hypothèses statistiques formalisées

### H1 — Progression globale

> Le score CEREDIS global est significativement plus élevé à T1 qu’à T0.

### H2 — Progression par domaines

> Les scores des Domaines 1 à 4 progressent significativement entre T0 et T1.

### H3 — Effet spécifique du Domaine 5

> La progression du Domaine 5 est corrélée positivement à la progression en production écrite (Domaine 3).

### H4 — Franchissement de seuil CECRL

> Une proportion significative d’élèves franchit au moins un seuil CECRL (ex. B1 → B2).

---

## 5. Méthodes statistiques retenues

### 5.1. Analyse descriptive (obligatoire)

À T0 et T1 :

* moyenne, médiane
* écart-type
* min / max
* distribution (histogrammes)

---

### 5.2. Analyse de progression pré / post

#### Cas n ≥ 30 (distribution ~ normale)

* **Test t apparié** :

  * Score CEREDIS global
  * Scores par domaine

#### Cas n < 30 ou distribution non normale

* **Test de Wilcoxon signé-rang**

👉 Le choix du test sera justifié par un test de normalité (Shapiro–Wilk).

---

### 5.3. Taille d’effet (obligatoire pour les bailleurs)

Pour chaque test significatif :

* **Cohen’s d** (test t)
* ou **r** (Wilcoxon)

👉 Interprétation recommandée :

* d ≈ 0,2 : effet faible
* d ≈ 0,5 : effet moyen
* d ≥ 0,8 : effet fort

---

## 6. Analyses spécifiques CEREDIS (forte valeur ajoutée)

### 6.1. Corrélations Domaine 5 ↔ autres domaines

* **Corrélation de Pearson** (ou Spearman si non-normalité) entre :

  * Δ Domaine 5 et Δ Domaine 3 (production écrite)
  * Δ Domaine 5 et Δ Score CEREDIS global

👉 Permet de tester empiriquement la **thèse métacognitive CEREDIS**.

---

### 6.2. Analyse de profils d’apprenants

* Clustering exploratoire (optionnel, si n suffisant) :

  * profils à forte métacognition,
  * profils à forte performance mais faible réflexivité,
  * profils en difficulté globale.

---

### 6.3. Analyse par type de preuve

* Comparaison des élèves selon la proportion de preuves P3/P4 produites
* Test d’association entre :

  * diversité des preuves,
  * progression CEREDIS.

---

## 7. Analyse des seuils CECRL

### 7.1. Indicateurs clés

* % d’élèves par niveau CECRL à T0 et T1
* % de franchissement de seuil (ex. B1 → B2)
* % d’élèves en zone de transition

### 7.2. Test statistique possible

* Test de McNemar (pour changement de catégorie)
* Analyse descriptive commentée si effectifs faibles

---

## 8. Gestion des données manquantes

* Données manquantes < 5 % : exclusion pairwise
* > 5 % : analyse de sensibilité
* Aucune imputation automatique sans justification explicite

---

## 9. Outils et reproductibilité

### 9.1. Outils recommandés

* **R / RStudio** (prioritaire)

  * `tidyverse`
  * `lme4` (si modèles mixtes)
  * `effectsize`
* Export CaSS → CSV (anonymisé)

---

### 9.2. Traçabilité et éthique

* Données anonymisées (ID apprenant pseudonymisé)
* Scripts versionnés
* Résultats reproductibles

---

## 10. Présentation des résultats (bailleurs / décideurs)

### Indicateurs phares à communiquer

* gain moyen CEREDIS (Δ),
* taille d’effet,
* % de franchissement CECRL,
* corrélation Domaine 5 ↔ production écrite.

👉 Les résultats seront :

* **quantitatifs**,
* **argumentés**,
* **interprétables pédagogiquement**.

---

## 11. Conclusion méthodologique

Ce protocole permet :

* une **évaluation rigoureuse de l’impact** de CEREDIS,
* une **mise à l’épreuve empirique** de votre modèle métacognitif,
* une **valorisation scientifique et institutionnelle** du projet.

Il est **parfaitement adapté** à une phase pilote et extensible à une expérimentation de plus grande ampleur.

---

