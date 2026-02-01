Voici la **traduction SQL (DDL) complète, normalisée et directement exploitable** du modèle UML / ER CEREDIS.
Elle est **agnostique du SGBD**, mais optimisée pour **PostgreSQL** (recommandé en contexte CaSS / analytique).
Les commentaires intégrés servent de **documentation développeur**.

---

# SCHÉMA SQL CEREDIS

## Modèle de données – Évaluation & Analytique

---

## 0. Préambule

* Toutes les **données calculées** (`competency_score`, `domain_score`, `ceredis_score`, `cecrl_level`)
  👉 **ne doivent jamais être saisies manuellement**
* Elles peuvent être :

  * recalculées par service applicatif,
  * ou matérialisées via jobs / vues / triggers.

---

## 1. Agents (apprenants, enseignants, chercheurs)

```sql
CREATE TABLE agent (
    agent_id UUID PRIMARY KEY,
    role VARCHAR(20) NOT NULL CHECK (role IN ('learner', 'teacher', 'researcher')),
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 2. Framework CEREDIS

```sql
CREATE TABLE competency_framework (
    framework_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);
```

---

## 3. Domaines (1 à 5)

```sql
CREATE TABLE domain (
    domain_id INTEGER PRIMARY KEY,          -- ex: 1..5
    framework_id UUID NOT NULL REFERENCES competency_framework(framework_id),
    name TEXT NOT NULL,
    weight NUMERIC(4,3) NOT NULL CHECK (weight > 0 AND weight <= 1)
);
```

---

## 4. Compétences (X.Y)

```sql
CREATE TABLE competency (
    competency_id VARCHAR(10) PRIMARY KEY,  -- ex: '5.3'
    domain_id INTEGER NOT NULL REFERENCES domain(domain_id),
    label TEXT NOT NULL,
    target_cecrl VARCHAR(5) NOT NULL CHECK (target_cecrl IN ('A2', 'B1', 'B2', 'C1')),
    weight NUMERIC(4,3) NOT NULL CHECK (weight > 0 AND weight <= 1)
);
```

---

## 5. Preuves (Evidence)

```sql
CREATE TABLE evidence (
    evidence_id UUID PRIMARY KEY,
    agent_id UUID NOT NULL REFERENCES agent(agent_id),
    competency_id VARCHAR(10) NOT NULL REFERENCES competency(competency_id),
    evidence_type VARCHAR(2) NOT NULL CHECK (evidence_type IN ('P1', 'P2', 'P3', 'P4')),
    raw_score NUMERIC(5,2) NOT NULL CHECK (raw_score >= 0 AND raw_score <= 100),
    context TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

👉 **Seule table alimentée manuellement**

---

## 6. Assertions de compétences (scores calculés)

```sql
CREATE TABLE assertion (
    assertion_id UUID PRIMARY KEY,
    agent_id UUID NOT NULL REFERENCES agent(agent_id),
    competency_id VARCHAR(10) NOT NULL REFERENCES competency(competency_id),
    competency_score NUMERIC(5,2) CHECK (competency_score >= 0 AND competency_score <= 100),
    validation_status VARCHAR(20) NOT NULL
        CHECK (validation_status IN ('incomplet', 'partiel', 'acquis')),
    last_updated TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (agent_id, competency_id)
);
```

⚠️ `competency_score` est **calculé**, jamais saisi directement.

---

## 7. Scores par domaine (agrégats)

```sql
CREATE TABLE domain_score (
    domain_score_id UUID PRIMARY KEY,
    agent_id UUID NOT NULL REFERENCES agent(agent_id),
    domain_id INTEGER NOT NULL REFERENCES domain(domain_id),
    domain_score NUMERIC(5,2) CHECK (domain_score >= 0 AND domain_score <= 100),
    last_updated TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (agent_id, domain_id)
);
```

---

## 8. Profil CEREDIS global

```sql
CREATE TABLE ceredis_profile (
    profile_id UUID PRIMARY KEY,
    agent_id UUID NOT NULL UNIQUE REFERENCES agent(agent_id),
    ceredis_score NUMERIC(6,2) CHECK (ceredis_score >= 0 AND ceredis_score <= 600),
    cecrl_level VARCHAR(5) CHECK (cecrl_level IN ('A2', 'B1', 'B2', 'C1')),
    last_updated TIMESTAMP NOT NULL DEFAULT now()
);
```

👉 `cecrl_level` est **dérivé** du score CEREDIS + règles seuils.

---

## 9. Tables de référence CEREDIS (fortement recommandées)

### 9.1. Pondération des types de preuves

```sql
CREATE TABLE evidence_weight (
    evidence_type VARCHAR(2) PRIMARY KEY,
    weight NUMERIC(4,3) NOT NULL CHECK (weight > 0 AND weight <= 1)
);

INSERT INTO evidence_weight (evidence_type, weight) VALUES
('P1', 0.15),
('P2', 0.30),
('P3', 0.35),
('P4', 0.20);
```

---

### 9.2. Mapping score CEREDIS → CECRL

```sql
CREATE TABLE cecrl_threshold (
    cecrl_level VARCHAR(5) PRIMARY KEY,
    min_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL
);

INSERT INTO cecrl_threshold (cecrl_level, min_score, max_score) VALUES
('A2', 200, 299),
('B1', 300, 399),
('B2', 400, 499),
('C1', 500, 599);
```

---

## 10. Contraintes de cohérence (recommandations)

### 10.1. Interdiction de suppression en cascade

```sql
ALTER TABLE evidence
DROP CONSTRAINT evidence_agent_id_fkey,
ADD CONSTRAINT evidence_agent_id_fkey
FOREIGN KEY (agent_id) REFERENCES agent(agent_id)
ON DELETE RESTRICT;
```

👉 Préserve l’auditabilité.

---

## 11. Vue de traçabilité complète (optionnelle mais très utile)

```sql
CREATE VIEW v_ceredis_trace AS
SELECT
    a.agent_id,
    d.domain_id,
    d.name AS domain_name,
    c.competency_id,
    c.label AS competency_label,
    e.evidence_type,
    e.raw_score,
    asr.competency_score,
    ds.domain_score,
    cp.ceredis_score,
    cp.cecrl_level
FROM agent a
JOIN assertion asr ON asr.agent_id = a.agent_id
JOIN competency c ON c.competency_id = asr.competency_id
JOIN domain d ON d.domain_id = c.domain_id
LEFT JOIN evidence e ON e.agent_id = a.agent_id AND e.competency_id = c.competency_id
LEFT JOIN domain_score ds ON ds.agent_id = a.agent_id AND ds.domain_id = d.domain_id
LEFT JOIN ceredis_profile cp ON cp.agent_id = a.agent_id;
```

---

## 12. Bonnes pratiques d’implémentation (rappel crucial)

* ❌ Ne jamais écrire directement :

  * `competency_score`
  * `domain_score`
  * `ceredis_score`
  * `cecrl_level`
* ✅ Toujours recalculer à partir de :

  * `evidence.raw_score`
  * `evidence_weight`
  * pondérations CEREDIS

---

## 13. Ce que vous avez maintenant

Vous disposez :

* d’un **schéma SQL complet et cohérent**,
* aligné avec :

  * CaSS,
  * l’échelle CEREDIS,
  * le CECRL,
* prêt pour :

  * implémentation backend,
  * analytics,
  * audit bailleurs,
  * export R / Python.

---

