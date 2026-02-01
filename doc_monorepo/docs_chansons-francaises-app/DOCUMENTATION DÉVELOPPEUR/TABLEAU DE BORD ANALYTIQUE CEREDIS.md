Voici une **conception complète et opérationnelle du tableau de bord analytique CEREDIS**, pensée **dès l’origine pour un double usage** :

* **enseignant** (pilotage pédagogique fin, remédiation),
* **chercheur / équipe CEREDIS / bailleurs** (analyse scientifique, évaluation d’impact).

Le principe directeur est constant :

> **Un même socle de données (CaSS + échelle CEREDIS),
> deux vues, deux niveaux de lecture, deux responsabilités.**

---

# TABLEAU DE BORD ANALYTIQUE CEREDIS

## Architecture, indicateurs et visualisations

---

## 1. Principes de conception (non négociables)

### Principe 1 — Séparation stricte des usages

* **Enseignant** : décision pédagogique locale, immédiate
* **Chercheur / pilotage** : analyse globale, longitudinale, statistique

👉 Même données, **niveaux d’abstraction différents**.

---

### Principe 2 — CECRL visible, score CEREDIS explicatif

* Le **CECRL** est toujours visible (lisibilité institutionnelle)
* Le **score CEREDIS** est :

  * visible pour enseignants / chercheurs,
  * masqué ou simplifié pour élèves

---

### Principe 3 — Traçabilité descendante

Tout indicateur agrégé doit permettre de **redescendre** vers :

> domaine → compétence → preuves

---

## 2. Architecture générale du tableau de bord

```
CaSS (preuves, assertions)
        ↓
Couche analytique CEREDIS
        ↓
Tableaux de bord
 ├── Vue Enseignant
 └── Vue Chercheur / Pilotage
```

---

## 3. Vue ENSEIGNANT — Pilotage pédagogique

### 3.1. Objectifs de la vue enseignant

* suivre la **progression réelle** de chaque élève,
* identifier **où** et **pourquoi** un élève bloque,
* cibler des **remédiations précises** (et non générales).

---

### 3.2. Page 1 — Synthèse élève (vue individuelle)

#### Indicateurs principaux

| Indicateur          | Description          |
| ------------------- | -------------------- |
| Niveau CECRL actuel | A2 / B1 / B2 / C1    |
| Score CEREDIS       | ex. 452 / 600        |
| Zone de progression | B2- / B2 / B2+       |
| Tendance            | ↗ / → / ↘ (30 jours) |

#### Visualisations recommandées

* jauge CECRL + barre de progression vers le niveau suivant,
* sparkline (progression temporelle du score CEREDIS).

---

### 3.3. Page 2 — Profil par domaines (diagnostic)

#### Graphique central

* **Radar ou barres** (5 axes) :

  * D1 Oral
  * D2 Écrit
  * D3 Production
  * D4 Interaction
  * D5 Métacognition

#### Lecture pédagogique

* domaine fort / domaine faible,
* détection immédiate d’un **déséquilibre cognitif**.

---

### 3.4. Page 3 — Compétences critiques

Liste filtrable :

| Compétence | Score | Seuil requis | Statut |
| ---------- | ----- | ------------ | ------ |
| 5.3        | 58 %  | 60 %         | ❌      |
| 3.2        | 72 %  | 60 %         | ✅      |

👉 Cette vue est **essentielle** pour comprendre :

* pourquoi un élève n’accède pas au niveau supérieur,
* quelle compétence est **verrou bloquant**.

---

### 3.5. Page 4 — Analyse qualitative des preuves

Pour une compétence donnée :

* liste des preuves P1–P4,
* type, date, score,
* accès direct au contenu (texte, annotation).

👉 Permet à l’enseignant de :

* comprendre un score,
* ajuster son évaluation,
* dialoguer pédagogiquement avec l’élève.

---

## 4. Vue CHERCHEUR / PILOTAGE — Analyse scientifique

### 4.1. Objectifs de la vue chercheur

* mesurer l’**efficacité du dispositif**,
* analyser l’impact du **Domaine 5**,
* produire des indicateurs **publiables et auditables**.

---

### 4.2. Page 1 — Vue cohorte (macro)

#### Indicateurs globaux

* distribution des niveaux CECRL (avant / après),
* score CEREDIS moyen,
* écart-type, médiane.

#### Visualisations

* histogramme des scores CEREDIS,
* boxplots par domaine.

---

### 4.3. Page 2 — Analyse de progression (pré / post)

| Indicateur             | Description       |
| ---------------------- | ----------------- |
| Δ Score CEREDIS        | gain moyen        |
| Δ par domaine          | effet différencié |
| % franchissement B1→B2 | indicateur clé    |

👉 Vue centrale pour les bailleurs.

---

### 4.4. Page 3 — Analyse du Domaine 5 (signature CEREDIS)

Indicateurs spécifiques :

* score moyen Domaine 5,
* corrélation :

  * Domaine 5 ↔ Production écrite,
  * Domaine 5 ↔ progression CECRL.

👉 Permet de tester empiriquement votre **hypothèse centrale** :

> la métacognition améliore la maîtrise langagière.

---

### 4.5. Page 4 — Analyse par type de preuve

Graphiques recommandés :

* répartition P1 / P2 / P3 / P4,
* contribution réelle de chaque type au score final,
* comparaison élèves forts / faibles.

👉 Données **très précieuses scientifiquement**.

---

## 5. Indicateurs clés normalisés (KPI CEREDIS)

### KPI pédagogiques

* taux de compétences seuils validées,
* temps moyen pour franchir un niveau,
* profils de blocage typiques.

### KPI scientifiques / bailleurs

* gain moyen CEREDIS,
* effet Domaine 5 (Δ),
* réduction des écarts inter-élèves.

---

## 6. Gouvernance des données (important)

| Donnée                | Visible élève | Enseignant | Chercheur |
| --------------------- | ------------- | ---------- | --------- |
| CECRL                 | ✅             | ✅          | ✅         |
| Score CEREDIS         | ⚠️ simplifié  | ✅          | ✅         |
| Preuves               | ❌             | ✅          | ✅         |
| Analyses statistiques | ❌             | ❌          | ✅         |

👉 Conforme aux exigences éthiques et institutionnelles.

---

## 7. Implémentation technique (recommandations)

* Backend : extraction CaSS → vues analytiques
* Formats : JSON + CSV (recherche)
* Outils possibles :

  * Metabase / Superset / Power BI,
  * R / Python pour analyses avancées,
  * visualisations web intégrées à l’app.

---

## 8. Ce que ce tableau de bord apporte concrètement

* **Aux enseignants** : un véritable outil de diagnostic cognitif
* **Aux chercheurs** : un instrument de mesure exploitable
* **Aux bailleurs** : des résultats clairs, quantifiés, auditables
* **Au projet CEREDIS** : une crédibilité scientifique rare en EdTech

---

