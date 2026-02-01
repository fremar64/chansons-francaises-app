Voici un **diagramme d’architecture système CEREDIS**, formalisé selon la **méthode C4**, avec un **niveau “System Context” (C1)** et un **niveau “Container / Infrastructure” (C2)**.
Il est **orienté développeurs / architectes**, mais reste **lisible pour des bailleurs techniques**.

Je fournis les diagrammes en **Mermaid**, afin qu’ils soient :

* directement versionnables,
* intégrables dans un README ou une documentation technique,
* exportables en image si nécessaire.

---

# CEREDIS — Diagramme d’architecture système (C4)

---

## C1 — System Context Diagram

### CEREDIS dans son écosystème

```mermaid
C4Context
title CEREDIS – System Context Diagram

Person(learner, "Apprenant", "Élève de lycée")
Person(teacher, "Enseignant", "Encadrant pédagogique")
Person(researcher, "Chercheur", "Évaluation & recherche")

System(ceredis_app, "Application éducative CEREDIS",
       "Environnement numérique d’apprentissage par la chanson")

System_Ext(pocketbase, "PocketBase",
           "Base de données applicative")

System_Ext(cass, "CaSS",
           "Gestion des compétences, preuves et assertions")

System_Ext(ralph, "Ralph (LRS)",
           "Learning Record Store (xAPI)")

System_Ext(analytics, "Grafana / Superset",
           "Tableaux de bord Learning Analytics")

System_Ext(rstudio, "RStudio Server",
           "Analyses statistiques & évaluation d’impact")

System_Ext(ai, "IA adaptative (Ollama + Gemma/LLaMA)",
           "Feedback et personnalisation")

Rel(learner, ceredis_app, "Interagit avec")
Rel(teacher, ceredis_app, "Supervise et consulte")
Rel(researcher, analytics, "Analyse les résultats")

Rel(ceredis_app, pocketbase, "Stocke données applicatives")
Rel(ceredis_app, cass, "Envoie preuves / récupère profils")
Rel(ceredis_app, ralph, "Envoie traces xAPI")

Rel(cass, analytics, "Expose scores et indicateurs")
Rel(ralph, analytics, "Expose traces d’apprentissage")

Rel(analytics, rstudio, "Export CSV / données anonymisées")
Rel(cass, ai, "Fournit indicateurs (scores, profils)")
Rel(ai, ceredis_app, "Retourne feedback pédagogique")
```

---

### Lecture C1 (clé pour décideurs)

* **CEREDIS** est le **système central**.
* **CaSS** est la **vérité évaluative**.
* **PocketBase** est la **mémoire applicative**.
* **Learning Analytics + RStudio** constituent la **chaîne d’analyse scientifique**.
* **L’IA adaptative** agit **en aval**, jamais en décision.

---

## C2 — Container / Infrastructure Diagram

### Vue technique détaillée

```mermaid
C4Container
title CEREDIS – Container & Infrastructure Diagram

Person(learner, "Apprenant")
Person(teacher, "Enseignant")

Container(webapp, "Frontend CEREDIS",
          "Web / Mobile App",
          "UI, activités pédagogiques, restitution CECRL")

Container(api, "Backend CEREDIS",
          "API applicative",
          "Orchestration, sécurité, intégration systèmes")

Container(pocketbase, "PocketBase",
          "Database",
          "Utilisateurs, contenus, journaux d’usage")

Container(cass, "CaSS",
          "Competency Management System",
          "Compétences, preuves, assertions")

Container(sql_engine, "Couche CEREDIS SQL",
          "PostgreSQL",
          "Calculs scores, agrégations, seuils")

Container(ralph, "Ralph LRS",
          "xAPI Store",
          "Traces d’apprentissage")

Container(dashboards, "Grafana / Superset",
          "BI / Analytics",
          "Tableaux de bord enseignants / chercheurs")

Container(rstudio, "RStudio Server",
          "Statistical Computing",
          "Analyses pré/post, tailles d’effet")

Container(ai_engine, "IA adaptative",
          "Ollama + Gemma/LLaMA",
          "Feedback, recommandations pédagogiques")

Rel(learner, webapp, "Utilise")
Rel(teacher, webapp, "Supervise")

Rel(webapp, api, "Appels API sécurisés")
Rel(api, pocketbase, "CRUD données applicatives")

Rel(api, cass, "POST preuves / GET profils")
Rel(cass, sql_engine, "Stockage & calculs CEREDIS")

Rel(api, ralph, "Envoi événements xAPI")

Rel(sql_engine, dashboards, "Expose vues analytiques")
Rel(ralph, dashboards, "Expose traces xAPI")

Rel(dashboards, rstudio, "Export CSV / données agrégées")

Rel(cass, ai_engine, "Fournit indicateurs calculés")
Rel(ai_engine, api, "Retourne feedback & recommandations")
Rel(api, webapp, "Affiche feedback et guidance")
```

---

### Lecture C2 (clé développeurs)

* **Backend CEREDIS** orchestre tous les flux.
* **Les calculs CEREDIS vivent dans PostgreSQL**, pas dans le frontend.
* **Grafana / Superset** lisent des **vues**, jamais des tables brutes.
* **RStudio** travaille sur des **exports anonymisés**.
* **L’IA** consomme des **indicateurs stabilisés**, jamais des scores bruts de preuve.

---

## 3. Règles d’architecture à respecter (rappel critique)

### Règle 1 — Aucun calcul métier côté frontend

Toute logique d’évaluation est **centralisée** (CaSS + SQL CEREDIS).

### Règle 2 — CaSS est la source de vérité évaluative

Ni PocketBase, ni l’IA ne décident d’un niveau.

### Règle 3 — CECRL = façade, CEREDIS = moteur

Le CECRL est affiché, **le score CEREDIS explique**.

### Règle 4 — IA = accompagnement, pas certification

Aucune attribution de niveau par l’IA.

---

## 4. Ce que ce diagramme vous apporte

* Une **vision claire et partagée** de l’architecture,
* Un support :

  * pour les développeurs,
  * pour les partenaires techniques,
  * pour les bailleurs,
* Une base solide pour :

  * déploiement VPS / Docker,
  * audits,
  * montée en charge.

---

