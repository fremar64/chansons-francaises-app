Voici le **schéma des rôles techniques CEREDIS**, directement exploitable pour configurer :

* **PostgreSQL** (source de vérité),
* **Superset** (exploration et reporting),
* **Grafana** (pilotage et monitoring),

en stricte conformité avec la **gouvernance institutionnelle** que nous avons définie.

---

# CEREDIS — Schéma des rôles techniques

## PostgreSQL · Superset · Grafana

---

## 1. Principe de sécurité fondamental

> **Tout accès est accordé au niveau minimal nécessaire.
> Aucune couche de visualisation ne contourne PostgreSQL.**

PostgreSQL est la **clef de voûte** de la sécurité.

---

# 2. PostgreSQL — Rôles et privilèges

## 2.1. Rôles PostgreSQL

| Rôle                | Usage                |
| ------------------- | -------------------- |
| `ceredis_owner`     | Schéma, migrations   |
| `ceredis_engine`    | Écriture moteur      |
| `ceredis_research`  | Lecture scientifique |
| `ceredis_teacher`   | Lecture classe       |
| `ceredis_dashboard` | Lecture agrégée      |
| `ceredis_nobody`    | Sécurité par défaut  |

---

## 2.2. Schémas PostgreSQL

| Schéma            | Contenu                      |
| ----------------- | ---------------------------- |
| `raw`             | preuves, identités (protégé) |
| `ceredis`         | scores calculés              |
| `views_research`  | vues pseudonymisées          |
| `views_teacher`   | vues par classe              |
| `views_dashboard` | agrégats globaux             |

---

## 2.3. Droits par rôle

| Rôle              | raw | ceredis | views_research | views_teacher | views_dashboard |
| ----------------- | --- | ------- | -------------- | ------------- | --------------- |
| ceredis_owner     | RW  | RW      | RW             | RW            | RW              |
| ceredis_engine    | RW  | RW      | ❌              | ❌             | ❌               |
| ceredis_research  | ❌   | ❌       | R              | ❌             | ❌               |
| ceredis_teacher   | ❌   | ❌       | ❌              | R             | ❌               |
| ceredis_dashboard | ❌   | ❌       | ❌              | ❌             | R               |

---

## 2.4. Exemple SQL

```sql
GRANT USAGE ON SCHEMA views_dashboard TO ceredis_dashboard;
GRANT SELECT ON ALL TABLES IN SCHEMA views_dashboard TO ceredis_dashboard;

REVOKE ALL ON SCHEMA raw FROM PUBLIC;
```

---

# 3. Superset — Rôles

## 3.1. Rôles Superset

| Rôle Superset | PostgreSQL          |
| ------------- | ------------------- |
| `Teacher`     | `ceredis_teacher`   |
| `Researcher`  | `ceredis_research`  |
| `Donor`       | `ceredis_dashboard` |
| `Admin`       | `ceredis_owner`     |

---

## 3.2. Permissions Superset

| Permission            | Teacher    | Researcher | Donor |
| --------------------- | ---------- | ---------- | ----- |
| Voir dashboards       | ✔ (classe) | ✔          | ✔     |
| Créer graphiques      | ❌          | ✔          | ❌     |
| Export CSV            | ❌          | ✔          | ❌     |
| Modifier requêtes SQL | ❌          | ✔          | ❌     |
| Accès tables brutes   | ❌          | ❌          | ❌     |

---

# 4. Grafana — Rôles

## 4.1. Datasources

| Datasource          | PostgreSQL rôle     |
| ------------------- | ------------------- |
| `CEREDIS_DASHBOARD` | `ceredis_dashboard` |
| `CEREDIS_TEACHER`   | `ceredis_teacher`   |
| `CEREDIS_RESEARCH`  | `ceredis_research`  |

---

## 4.2. Rôles Grafana

| Grafana          | Accès               |
| ---------------- | ------------------- |
| `TeacherViewer`  | `CEREDIS_TEACHER`   |
| `ResearchViewer` | `CEREDIS_RESEARCH`  |
| `DonorViewer`    | `CEREDIS_DASHBOARD` |
| `Admin`          | tous                |

---

# 5. Chaîne de sécurité complète

```
PostgreSQL (schémas cloisonnés)
   ↓
Superset / Grafana (rôles)
   ↓
Utilisateurs
```

Personne ne peut :

* voir ce qu’il ne doit pas,
* contourner PostgreSQL,
* inférer des identités.

---

# 6. Conformité bailleurs

| Exigence               | Réponse CEREDIS                    |
| ---------------------- | ---------------------------------- |
| Protection des mineurs | Cloisonnement raw                  |
| RGPD                   | Pseudonymisation                   |
| Audit                  | Rôles traçables                    |
| Non-ingérence          | Séparation pédagogique / politique |
| Intégrité scientifique | Chercheurs isolés                  |

---

## 7. Résultat stratégique

Vous avez maintenant :

* une **gouvernance d’accès claire**,
* un **système défendable devant l’UNESCO, le PNUD et la Banque mondiale**,
* une **architecture impossible à détourner**.

---

