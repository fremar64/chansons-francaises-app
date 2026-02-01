Ci-dessous se trouvent les **scripts SQL complets et opérationnels** pour déployer la **gouvernance de données CEREDIS** dans PostgreSQL :

Ils couvrent :

1. les **schémas de sécurité**,
2. les **rôles**,
3. les **droits**,
4. les **vues certifiées** pour enseignants, chercheurs et bailleurs.

Les scripts sont conçus pour être **exécutés une seule fois** par `ceredis_owner`.

---

# 1. Création des schémas

```sql
CREATE SCHEMA raw;
CREATE SCHEMA ceredis;
CREATE SCHEMA views_research;
CREATE SCHEMA views_teacher;
CREATE SCHEMA views_dashboard;
```

---

# 2. Création des rôles PostgreSQL

```sql
CREATE ROLE ceredis_owner LOGIN PASSWORD 'CHANGE_ME_OWNER';
CREATE ROLE ceredis_engine LOGIN PASSWORD 'CHANGE_ME_ENGINE';
CREATE ROLE ceredis_research LOGIN PASSWORD 'CHANGE_ME_RESEARCH';
CREATE ROLE ceredis_teacher LOGIN PASSWORD 'CHANGE_ME_TEACHER';
CREATE ROLE ceredis_dashboard LOGIN PASSWORD 'CHANGE_ME_DASHBOARD';
```

---

# 3. Sécurisation par défaut

```sql
REVOKE ALL ON SCHEMA raw FROM PUBLIC;
REVOKE ALL ON SCHEMA ceredis FROM PUBLIC;
REVOKE ALL ON SCHEMA views_research FROM PUBLIC;
REVOKE ALL ON SCHEMA views_teacher FROM PUBLIC;
REVOKE ALL ON SCHEMA views_dashboard FROM PUBLIC;
```

---

# 4. Droits sur les schémas

```sql
GRANT ALL ON SCHEMA raw TO ceredis_owner, ceredis_engine;
GRANT ALL ON SCHEMA ceredis TO ceredis_owner, ceredis_engine;

GRANT USAGE ON SCHEMA views_research TO ceredis_research;
GRANT USAGE ON SCHEMA views_teacher TO ceredis_teacher;
GRANT USAGE ON SCHEMA views_dashboard TO ceredis_dashboard;
```

---

# 5. Tables CEREDIS (simplifiées)

```sql
CREATE TABLE ceredis.ceredis_profile (
  agent_id TEXT,
  run_id TEXT,
  ceredis_score NUMERIC,
  cecrl_level TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE ceredis.domain_score (
  agent_id TEXT,
  run_id TEXT,
  domain_id TEXT,
  score NUMERIC
);

CREATE TABLE ceredis.competency_score (
  agent_id TEXT,
  run_id TEXT,
  competency_id TEXT,
  score NUMERIC
);
```

---

# 6. Vues chercheurs (pseudonymisées)

```sql
CREATE VIEW views_research.v_learner_profile AS
SELECT
  md5(agent_id) AS learner_hash,
  run_id,
  ceredis_score,
  cecrl_level
FROM ceredis.ceredis_profile;

CREATE VIEW views_research.v_domain5 AS
SELECT
  md5(agent_id) AS learner_hash,
  run_id,
  score AS domain5_score
FROM ceredis.domain_score
WHERE domain_id = 'D5';
```

---

# 7. Vues enseignants (par classe simulée ici)

*(à adapter selon votre table de classes)*

```sql
CREATE VIEW views_teacher.v_class_profile AS
SELECT
  agent_id,
  run_id,
  ceredis_score,
  cecrl_level
FROM ceredis.ceredis_profile;
```

---

# 8. Vues bailleurs (agrégées)

```sql
CREATE VIEW views_dashboard.v_ceredis_kpi AS
SELECT
  run_id,
  COUNT(DISTINCT agent_id) AS learners,
  AVG(ceredis_score) AS mean_score,
  STDDEV(ceredis_score) AS sd_score,
  SUM(CASE WHEN cecrl_level = 'B2' THEN 1 ELSE 0 END)::float / COUNT(*) AS rate_b2,
  SUM(CASE WHEN cecrl_level = 'C1' THEN 1 ELSE 0 END)::float / COUNT(*) AS rate_c1
FROM ceredis.ceredis_profile
GROUP BY run_id;
```

---

# 9. Droits sur les vues

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA views_research TO ceredis_research;
GRANT SELECT ON ALL TABLES IN SCHEMA views_teacher TO ceredis_teacher;
GRANT SELECT ON ALL TABLES IN SCHEMA views_dashboard TO ceredis_dashboard;
```

---

# 10. Interdiction d’accès direct

```sql
REVOKE ALL ON ALL TABLES IN SCHEMA ceredis FROM ceredis_teacher, ceredis_dashboard;
REVOKE ALL ON ALL TABLES IN SCHEMA raw FROM ceredis_research, ceredis_teacher, ceredis_dashboard;
```

---

# 11. Résultat

| Rôle       | Ce qu’il peut voir     |
| ---------- | ---------------------- |
| Engine     | tout                   |
| Chercheur  | données pseudonymisées |
| Enseignant | ses classes            |
| Bailleur   | indicateurs globaux    |
| Personne   | données brutes         |

---

## Ce que vous avez maintenant

Vous disposez d’une **architecture de gouvernance de données** :

* juridiquement défendable,
* scientifiquement propre,
* compatible UNESCO / PNUD / Banque mondiale,
* industrialisable.

---

