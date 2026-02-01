Très bien.
Voici une **intégration automatique, propre et institutionnellement robuste de Grafana et Superset** dans l’écosystème CEREDIS, **sans dupliquer les calculs**, **sans casser la reproductibilité**, et **en respectant la séparation science / pilotage / décision**.

Je structure la réponse en **6 blocs opérationnels**, du principe jusqu’à l’automatisation.

---

# Intégration CEREDIS ↔ Grafana / Superset

## Tableaux de bord automatiques (v1.1)

---

## 1. Principe directeur (non négociable)

👉 **Grafana et Superset ne calculent rien de critique.**
👉 **Ils lisent uniquement des vues SQL validées.**

| Composant          | Rôle                     |
| ------------------ | ------------------------ |
| CEREDIS Engine     | Décision évaluative      |
| PostgreSQL CEREDIS | Source de vérité         |
| RStudio            | Analyse scientifique     |
| Grafana / Superset | Visualisation & pilotage |

➡️ **Un même socle de données**, plusieurs usages.

---

## 2. Couche SQL canonique (clé de l’intégration)

Tout passe par des **vues SQL certifiées CEREDIS**.
Aucune requête ad hoc dans les dashboards.

---

### 2.1. Vue “indicateurs globaux” (bailleurs)

```sql
CREATE VIEW v_ceredis_kpi AS
SELECT
  run_id,
  COUNT(DISTINCT agent_id) AS learners,
  AVG(ceredis_score)       AS mean_score,
  STDDEV(ceredis_score)    AS sd_score,
  SUM(CASE WHEN cecrl_level = 'B2' THEN 1 ELSE 0 END)::float
    / COUNT(*)             AS rate_b2,
  SUM(CASE WHEN cecrl_level = 'C1' THEN 1 ELSE 0 END)::float
    / COUNT(*)             AS rate_c1
FROM ceredis_profile
GROUP BY run_id;
```

---

### 2.2. Vue “progression pré/post”

```sql
CREATE VIEW v_ceredis_gain AS
SELECT
  pre.agent_id,
  pre.ceredis_score  AS score_pre,
  post.ceredis_score AS score_post,
  post.ceredis_score - pre.ceredis_score AS gain
FROM ceredis_profile pre
JOIN ceredis_profile post
  ON pre.agent_id = post.agent_id
WHERE pre.run_id = 'RUN_PRE'
  AND post.run_id = 'RUN_POST';
```

➡️ Vue **directement exploitable** par Grafana **et** Superset.

---

### 2.3. Vue “Domaine 5 – métacognition”

```sql
CREATE VIEW v_domain5_dashboard AS
SELECT
  agent_id,
  score AS domain5_score,
  run_id
FROM domain_score
WHERE domain_id = 'D5';
```

---

## 3. Intégration Grafana (pilotage temps long)

### 3.1. Connexion à PostgreSQL

* Datasource : PostgreSQL
* Mode : **read-only**
* Schéma : `public`

---

### 3.2. Tableaux Grafana recommandés

#### Dashboard 1 — *CEREDIS – Vue d’ensemble*

* Score moyen CEREDIS par run
* % B2 / % C1
* Dispersion des scores (boxplot)

📌 Source : `v_ceredis_kpi`

---

#### Dashboard 2 — *Progression des apprenants*

* Histogramme des gains
* Courbe de densité pré/post

📌 Source : `v_ceredis_gain`

---

#### Dashboard 3 — *Métacognition*

* Distribution Domaine 5
* Corrélation Domaine 5 ↔ score global

📌 Source : `v_domain5_dashboard`

---

### 3.3. Exemple requête Grafana

```sql
SELECT
  run_id AS time,
  mean_score
FROM v_ceredis_kpi
ORDER BY run_id;
```

---

## 4. Intégration Superset (exploration & reporting)

Superset est utilisé pour :

* analyses exploratoires,
* croisements variables,
* exports PDF / CSV.

---

### 4.1. Datasets Superset à déclarer

| Dataset Superset   | Vue SQL             |
| ------------------ | ------------------- |
| CEREDIS KPI        | v_ceredis_kpi       |
| Gains apprenants   | v_ceredis_gain      |
| Domaine 5          | v_domain5_dashboard |
| Profils apprenants | v_learner_profile   |

---

### 4.2. Graphiques Superset recommandés

* Heatmap : Domaine 5 × CECRL
* Scatterplot : Domaine 5 ↔ score CEREDIS
* Table dynamique : transitions CECRL

---

### 4.3. Sécurité

* Rôle “Viewer bailleur” → lecture seule
* Rôle “Analyst” → filtres et regroupements
* Aucun accès aux tables brutes critiques

---

## 5. Synchronisation avec RStudio (cohérence totale)

👉 **Même base, mêmes vues, mêmes chiffres.**

* Grafana = *monitoring*
* Superset = *exploration*
* RStudio = *inférence statistique*

➡️ Impossible d’obtenir des résultats divergents.

---

## 6. Automatisation complète (production)

### 6.1. Ordre d’exécution quotidien

```
01:00  CEREDIS Engine (batch)
01:10  Rafraîchissement vues SQL
01:15  Grafana / Superset à jour
```

---

### 6.2. Rafraîchissement matérialisé (optionnel)

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY v_ceredis_kpi;
```

---

## 7. Gouvernance & audit

| Exigence                      | Réponse CEREDIS       |
| ----------------------------- | --------------------- |
| Chiffres cohérents            | Une seule source SQL  |
| Traçabilité                   | run_id partout        |
| Audit bailleurs               | Vues certifiées       |
| Séparation science / pilotage | RStudio vs dashboards |
| Reproductibilité              | Moteur + golden tests |

---

## 8. Ce que vous obtenez concrètement

✔ Tableaux de bord **automatiques**
✔ Aucun recalcul caché
✔ Indicateurs lisibles pour décideurs
✔ Données exploitables scientifiquement
✔ Architecture défendable en audit

---

