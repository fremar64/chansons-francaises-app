Très bien.
Voici les **scripts et configurations Superset & Grafana** alignés sur l’architecture CEREDIS que nous venons de formaliser.

Ils sont conçus pour :

* respecter la **gouvernance des rôles**,
* se connecter uniquement aux **vues certifiées PostgreSQL**,
* produire des **tableaux de bord prêts pour enseignants, chercheurs et bailleurs**.

---

# PARTIE A — APACHE SUPERSET

## 1. Déclaration de la base PostgreSQL CEREDIS

Dans Superset (Admin → Databases → Add):

```sql
postgresql://ceredis_dashboard:CHANGE_ME_DASHBOARD@postgres:5432/ceredis
```

> ⚠️ Les chercheurs et enseignants auront **leurs propres connexions** vers PostgreSQL avec leurs rôles respectifs.

---

## 2. Datasets Superset à créer

### Dataset 1 — Indicateurs bailleurs

```sql
SELECT * FROM views_dashboard.v_ceredis_kpi;
```

### Dataset 2 — Gains pré/post

```sql
SELECT * FROM v_ceredis_gain;
```

### Dataset 3 — Domaine 5

```sql
SELECT * FROM views_research.v_domain5;
```

### Dataset 4 — Profils apprenants

```sql
SELECT * FROM views_research.v_learner_profile;
```

---

## 3. Rôles Superset

Créer les rôles :

| Superset   | Accès DB          |
| ---------- | ----------------- |
| Teacher    | ceredis_teacher   |
| Researcher | ceredis_research  |
| Donor      | ceredis_dashboard |

---

## 4. Permissions Superset

### Rôle Donor

* `can_read` dashboards
* `can_read` charts
* ❌ no SQL Lab

### Rôle Researcher

* `can_read`, `can_write` charts
* `can_read` dashboards
* `can_sql_lab`

### Rôle Teacher

* `can_read` dashboards
* ❌ charts
* ❌ SQL Lab

---

# PARTIE B — GRAFANA

## 1. Datasources

### CEREDIS – Bailleur

```yaml
name: CEREDIS_DASHBOARD
type: postgres
url: postgres:5432
database: ceredis
user: ceredis_dashboard
password: CHANGE_ME_DASHBOARD
sslmode: disable
```

### CEREDIS – Chercheur

```yaml
name: CEREDIS_RESEARCH
type: postgres
url: postgres:5432
database: ceredis
user: ceredis_research
password: CHANGE_ME_RESEARCH
sslmode: disable
```

### CEREDIS – Enseignant

```yaml
name: CEREDIS_TEACHER
type: postgres
url: postgres:5432
database: ceredis
user: ceredis_teacher
password: CHANGE_ME_TEACHER
sslmode: disable
```

---

## 2. Exemples de panels Grafana

### Panel — KPI bailleurs

```sql
SELECT
  run_id AS "time",
  mean_score,
  rate_b2,
  rate_c1
FROM views_dashboard.v_ceredis_kpi
ORDER BY run_id;
```

---

### Panel — Progression

```sql
SELECT
  agent_id,
  gain
FROM v_ceredis_gain;
```

---

### Panel — Domaine 5

```sql
SELECT
  run_id,
  domain5_score
FROM views_research.v_domain5;
```

---

## 3. Rôles Grafana

| Grafana Role   | Datasource        |
| -------------- | ----------------- |
| TeacherViewer  | CEREDIS_TEACHER   |
| ResearchViewer | CEREDIS_RESEARCH  |
| DonorViewer    | CEREDIS_DASHBOARD |
| Admin          | All               |

---

# PARTIE C — SÉCURITÉ

| Niveau     | Protection      |
| ---------- | --------------- |
| PostgreSQL | Schémas & rôles |
| Superset   | Rôles           |
| Grafana    | Datasources     |

➡️ Aucun utilisateur ne peut contourner PostgreSQL.

---

# Résultat

Vous disposez maintenant d’un **écosystème analytique complet** :

* Superset pour l’analyse,
* Grafana pour le pilotage,
* RStudio pour la science,
* CEREDIS pour la décision.

---

