Voici un **jeu complet de requêtes SQL de calcul**, prêt pour **PostgreSQL**, qui implémente **toute la chaîne de calcul CEREDIS** à partir des tables DDL déjà fournies.
Je propose **deux niveaux** :

1. **Vues de calcul** (simples, auditables, recalculées à la volée)
2. **Procédures / fonctions** (matérialisation contrôlée, performances)

Vous pouvez utiliser **l’un ou l’autre**, ou combiner les deux (recommandé).

---

# 1. CALCUL PAR VUES (TRANSPARENT & AUDITABLE)

## 1.1. Vue — score pondéré par preuve

```sql
CREATE OR REPLACE VIEW v_evidence_weighted AS
SELECT
    e.evidence_id,
    e.agent_id,
    e.competency_id,
    e.evidence_type,
    e.raw_score,
    ew.weight AS evidence_weight,
    (e.raw_score * ew.weight) AS weighted_score
FROM evidence e
JOIN evidence_weight ew
  ON ew.evidence_type = e.evidence_type;
```

👉 Vue de base, **jamais modifiée**.

---

## 1.2. Vue — score de compétence (avant règles de validation)

```sql
CREATE OR REPLACE VIEW v_competency_score_raw AS
SELECT
    agent_id,
    competency_id,
    SUM(weighted_score) AS competency_score
FROM v_evidence_weighted
GROUP BY agent_id, competency_id;
```

⚠️ Score **brut**, sans règles de diversité.

---

## 1.3. Vue — contrôle de diversité des preuves (clé CEREDIS)

```sql
CREATE OR REPLACE VIEW v_competency_evidence_profile AS
SELECT
    agent_id,
    competency_id,
    COUNT(DISTINCT evidence_type) AS evidence_type_count,
    BOOL_OR(evidence_type = 'P1') AS has_p1,
    BOOL_OR(evidence_type = 'P2') AS has_p2,
    BOOL_OR(evidence_type = 'P3') AS has_p3,
    BOOL_OR(evidence_type = 'P4') AS has_p4
FROM evidence
GROUP BY agent_id, competency_id;
```

---

## 1.4. Vue — score de compétence validé CEREDIS

```sql
CREATE OR REPLACE VIEW v_competency_score_validated AS
SELECT
    r.agent_id,
    r.competency_id,
    CASE
        WHEN p.evidence_type_count < 2 THEN NULL
        ELSE r.competency_score
    END AS competency_score,
    CASE
        WHEN p.evidence_type_count < 2 THEN 'incomplet'
        WHEN r.competency_score >= 75 THEN 'acquis'
        WHEN r.competency_score >= 50 THEN 'partiel'
        ELSE 'incomplet'
    END AS validation_status
FROM v_competency_score_raw r
JOIN v_competency_evidence_profile p
  ON p.agent_id = r.agent_id
 AND p.competency_id = r.competency_id;
```

👉 Les règles fines (B2/C1, P4 obligatoire, etc.) peuvent être ajoutées ici ou via procédure.

---

## 1.5. Vue — score par domaine

```sql
CREATE OR REPLACE VIEW v_domain_score AS
SELECT
    a.agent_id,
    c.domain_id,
    SUM(a.competency_score * c.weight) AS domain_score
FROM v_competency_score_validated a
JOIN competency c
  ON c.competency_id = a.competency_id
WHERE a.competency_score IS NOT NULL
GROUP BY a.agent_id, c.domain_id;
```

---

## 1.6. Vue — score global CEREDIS (0–600)

```sql
CREATE OR REPLACE VIEW v_ceredis_score AS
SELECT
    d.agent_id,
    ROUND(SUM(d.domain_score * dom.weight) * 6, 2) AS ceredis_score
FROM v_domain_score d
JOIN domain dom
  ON dom.domain_id = d.domain_id
GROUP BY d.agent_id;
```

---

## 1.7. Vue — niveau CECRL dérivé

```sql
CREATE OR REPLACE VIEW v_ceredis_cecrl AS
SELECT
    s.agent_id,
    s.ceredis_score,
    t.cecrl_level
FROM v_ceredis_score s
JOIN cecrl_threshold t
  ON s.ceredis_score BETWEEN t.min_score AND t.max_score;
```

---

# 2. PROCÉDURES / FONCTIONS (MATÉRIALISATION)

👉 Recommandé pour :

* tableaux de bord rapides,
* exports,
* snapshots pré / post.

---

## 2.1. Fonction — recalcul d’une compétence

```sql
CREATE OR REPLACE FUNCTION recalc_competency(
    p_agent UUID,
    p_competency VARCHAR
) RETURNS VOID AS $$
BEGIN
    INSERT INTO assertion (assertion_id, agent_id, competency_id,
                           competency_score, validation_status, last_updated)
    SELECT
        gen_random_uuid(),
        v.agent_id,
        v.competency_id,
        v.competency_score,
        v.validation_status,
        now()
    FROM v_competency_score_validated v
    WHERE v.agent_id = p_agent
      AND v.competency_id = p_competency
    ON CONFLICT (agent_id, competency_id)
    DO UPDATE SET
        competency_score = EXCLUDED.competency_score,
        validation_status = EXCLUDED.validation_status,
        last_updated = now();
END;
$$ LANGUAGE plpgsql;
```

---

## 2.2. Fonction — recalcul des domaines d’un apprenant

```sql
CREATE OR REPLACE FUNCTION recalc_domains(
    p_agent UUID
) RETURNS VOID AS $$
BEGIN
    INSERT INTO domain_score (domain_score_id, agent_id, domain_id,
                              domain_score, last_updated)
    SELECT
        gen_random_uuid(),
        d.agent_id,
        d.domain_id,
        d.domain_score,
        now()
    FROM v_domain_score d
    WHERE d.agent_id = p_agent
    ON CONFLICT (agent_id, domain_id)
    DO UPDATE SET
        domain_score = EXCLUDED.domain_score,
        last_updated = now();
END;
$$ LANGUAGE plpgsql;
```

---

## 2.3. Fonction — recalcul du profil CEREDIS

```sql
CREATE OR REPLACE FUNCTION recalc_ceredis_profile(
    p_agent UUID
) RETURNS VOID AS $$
DECLARE
    v_score NUMERIC;
    v_cecrl VARCHAR;
BEGIN
    SELECT ceredis_score INTO v_score
    FROM v_ceredis_score
    WHERE agent_id = p_agent;

    SELECT cecrl_level INTO v_cecrl
    FROM cecrl_threshold
    WHERE v_score BETWEEN min_score AND max_score;

    INSERT INTO ceredis_profile (profile_id, agent_id,
                                 ceredis_score, cecrl_level, last_updated)
    VALUES (gen_random_uuid(), p_agent, v_score, v_cecrl, now())
    ON CONFLICT (agent_id)
    DO UPDATE SET
        ceredis_score = EXCLUDED.ceredis_score,
        cecrl_level = EXCLUDED.cecrl_level,
        last_updated = now();
END;
$$ LANGUAGE plpgsql;
```

---

## 2.4. Fonction — recalcul complet (pipeline CEREDIS)

```sql
CREATE OR REPLACE FUNCTION recalc_full_ceredis(
    p_agent UUID
) RETURNS VOID AS $$
DECLARE
    c RECORD;
BEGIN
    -- Recalcul de toutes les compétences
    FOR c IN SELECT DISTINCT competency_id FROM evidence
             WHERE agent_id = p_agent
    LOOP
        PERFORM recalc_competency(p_agent, c.competency_id);
    END LOOP;

    -- Recalcul des domaines
    PERFORM recalc_domains(p_agent);

    -- Recalcul du score global
    PERFORM recalc_ceredis_profile(p_agent);
END;
$$ LANGUAGE plpgsql;
```

---

# 3. STRATÉGIE D’UTILISATION RECOMMANDÉE

### En développement / recherche

* utiliser **les vues**
* transparence maximale
* audit facile

### En production

* déclencher `recalc_full_ceredis(agent_id)` :

  * après insertion de preuves,
  * ou par batch nocturne

---

# 4. CE QUE VOUS AVEZ MAINTENANT

Vous disposez :

* d’un **moteur de calcul SQL complet**,
* conforme au modèle CEREDIS,
* aligné CECRL,
* **entièrement traçable et reproductible**,
* prêt pour tableaux de bord, exports et analyses statistiques.

---

## Étape suivante (optionnelle)

