Parfait.
Je fournis ci-dessous le **pack opérationnel complet CEREDIS – Grafana** :
requêtes SQL, définition des panneaux et logique d’alertes, alignés sur **CEREDIS v1.1** et vos **vues certifiées PostgreSQL**.

---

# 1. Dashboard **Bailleurs – Pilotage stratégique**

## 1.1 Indicateurs clés (vues)

Source : `views_dashboard.v_ceredis_kpi`

| Indicateur  | SQL                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------- |
| Score moyen | `SELECT run_id AS time, mean_score FROM views_dashboard.v_ceredis_kpi ORDER BY run_id;`  |
| % B2        | `SELECT run_id AS time, rate_b2*100 FROM views_dashboard.v_ceredis_kpi ORDER BY run_id;` |
| % C1        | `SELECT run_id AS time, rate_c1*100 FROM views_dashboard.v_ceredis_kpi ORDER BY run_id;` |
| Effectif    | `SELECT run_id AS time, learners FROM views_dashboard.v_ceredis_kpi ORDER BY run_id;`    |

### Panneaux Grafana

| Type       | Titre               |
| ---------- | ------------------- |
| TimeSeries | Score CEREDIS moyen |
| TimeSeries | % d’élèves B2       |
| TimeSeries | % d’élèves C1       |
| Stat       | Nombre d’apprenants |

---

## 1.2 Alertes bailleurs

### Alerte 1 — **Stagnation du score**

Déclencheur :

```
mean_score(current_run) - mean_score(previous_run) < 5
```

Message :

> “Alerte CEREDIS : progression insuffisante des scores globaux.”

---

### Alerte 2 — **B2 non atteint**

Déclencheur :

```
rate_b2 < 0.25
```

Message :

> “Alerte CEREDIS : moins de 25% des apprenants atteignent B2.”

---

# 2. Dashboard **Chercheurs – Métacognition**

Sources :

* `views_research.v_domain5`
* `views_research.v_learner_profile`

---

## 2.1 Requêtes

### Distribution Domaine 5

```sql
SELECT domain5_score FROM views_research.v_domain5;
```

### Corrélation Domaine 5 ↔ CEREDIS

```sql
SELECT
  d.domain5_score,
  p.ceredis_score
FROM views_research.v_domain5 d
JOIN views_research.v_learner_profile p
  ON d.learner_hash = p.learner_hash;
```

---

## 2.2 Panneaux

| Type         | Titre                                |
| ------------ | ------------------------------------ |
| Histogram    | Distribution Domaine 5               |
| Scatter plot | Domaine 5 vs Score global            |
| Table        | Apprenants extrêmes (top/bottom 10%) |

---

## 2.3 Alerte scientifique

### Alerte — Effondrement métacognitif

Déclencheur :

```
AVG(domain5_score) < 50
```

Message :

> “Alerte CEREDIS : niveau métacognitif insuffisant (Domaine 5 < 50).”

---

# 3. Dashboard **Enseignants – Pilotage de classe**

Source : `views_teacher.v_class_profile`

---

## 3.1 Requêtes

### Tableau élèves

```sql
SELECT
  agent_id,
  ceredis_score,
  cecrl_level
FROM views_teacher.v_class_profile
ORDER BY ceredis_score DESC;
```

### Répartition CECRL

```sql
SELECT
  cecrl_level,
  COUNT(*) AS count
FROM views_teacher.v_class_profile
GROUP BY cecrl_level;
```

---

## 3.2 Panneaux

| Type      | Titre                    |
| --------- | ------------------------ |
| Table     | Scores des élèves        |
| Bar chart | Répartition CECRL        |
| Gauge     | Score moyen de la classe |

---

## 3.3 Alerte pédagogique

### Alerte — Classe en difficulté

Déclencheur :

```
AVG(ceredis_score) < 350
```

Message :

> “Alerte CEREDIS : la classe est majoritairement en dessous du niveau B1.”

---

# 4. Gouvernance des alertes

| Alerte            | Destinataire              |
| ----------------- | ------------------------- |
| B2 / Score global | Bailleur + Chef de projet |
| Domaine 5         | Chercheurs                |
| Classe faible     | Enseignant                |

---

# 5. Résultat

Vous disposez maintenant d’un système :

* **quantifié**,
* **surveillé en continu**,
* **aligné CECRL + métacognition**,
* **prêt pour bailleurs, enseignants et chercheurs**.

---

