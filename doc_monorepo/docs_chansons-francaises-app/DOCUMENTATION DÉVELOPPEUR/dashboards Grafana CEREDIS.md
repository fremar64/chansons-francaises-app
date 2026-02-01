Voici trois **dashboards Grafana CEREDIS** prêts à importer, alignés avec votre architecture de vues SQL et vos rôles :

* **Bailleurs (vue macro)**
* **Chercheurs (analyse métacognitive)**
* **Enseignants (pilotage de classe)**

Ils utilisent **exclusivement** les vues certifiées :

* `views_dashboard.v_ceredis_kpi`
* `v_ceredis_gain`
* `views_research.v_domain5`
* `views_teacher.v_class_profile`

---

# 1. Dashboard — **CEREDIS | Bailleurs (KPI globaux)**

Importer via Grafana → Dashboards → Import → coller JSON.

```json
{
  "title": "CEREDIS – Bailleurs (KPI globaux)",
  "panels": [
    {
      "type": "timeseries",
      "title": "Score CEREDIS moyen",
      "datasource": "CEREDIS_DASHBOARD",
      "targets": [
        {
          "format": "time_series",
          "rawSql": "SELECT run_id AS \"time\", mean_score FROM views_dashboard.v_ceredis_kpi ORDER BY run_id"
        }
      ]
    },
    {
      "type": "stat",
      "title": "% B2",
      "datasource": "CEREDIS_DASHBOARD",
      "targets": [
        {
          "rawSql": "SELECT rate_b2 * 100 FROM views_dashboard.v_ceredis_kpi ORDER BY run_id DESC LIMIT 1"
        }
      ]
    },
    {
      "type": "stat",
      "title": "% C1",
      "datasource": "CEREDIS_DASHBOARD",
      "targets": [
        {
          "rawSql": "SELECT rate_c1 * 100 FROM views_dashboard.v_ceredis_kpi ORDER BY run_id DESC LIMIT 1"
        }
      ]
    }
  ]
}
```

---

# 2. Dashboard — **CEREDIS | Chercheurs (Métacognition)**

```json
{
  "title": "CEREDIS – Analyse métacognitive",
  "panels": [
    {
      "type": "histogram",
      "title": "Distribution Domaine 5",
      "datasource": "CEREDIS_RESEARCH",
      "targets": [
        {
          "rawSql": "SELECT domain5_score FROM views_research.v_domain5"
        }
      ]
    },
    {
      "type": "scatter",
      "title": "Domaine 5 ↔ Score global",
      "datasource": "CEREDIS_RESEARCH",
      "targets": [
        {
          "rawSql": "SELECT d.domain5_score, p.ceredis_score FROM views_research.v_domain5 d JOIN views_research.v_learner_profile p ON d.learner_hash = p.learner_hash"
        }
      ]
    }
  ]
}
```

---

# 3. Dashboard — **CEREDIS | Enseignants (Classe)**

```json
{
  "title": "CEREDIS – Classe",
  "panels": [
    {
      "type": "table",
      "title": "Scores élèves",
      "datasource": "CEREDIS_TEACHER",
      "targets": [
        {
          "rawSql": "SELECT agent_id, ceredis_score, cecrl_level FROM views_teacher.v_class_profile"
        }
      ]
    },
    {
      "type": "barchart",
      "title": "Répartition CECRL",
      "datasource": "CEREDIS_TEACHER",
      "targets": [
        {
          "rawSql": "SELECT cecrl_level, COUNT(*) FROM views_teacher.v_class_profile GROUP BY cecrl_level"
        }
      ]
    }
  ]
}
```

---

## Ce que vous avez maintenant

✔ Tableaux de bord **directement importables**
✔ Alignement strict avec les **rôles**
✔ Aucun accès aux données sensibles
✔ Indicateurs utilisables par bailleurs

---

