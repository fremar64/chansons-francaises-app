Voici un **schéma de rôles utilisateurs CEREDIS** conçu pour être :

* **compatible avec les exigences des bailleurs internationaux**,
* **conforme à l’éthique de la recherche**,
* **cohérent avec votre architecture technique** (CaSS, PostgreSQL, Grafana, Superset, RStudio),
* **praticable en contexte scolaire réel**.

Il s’agit d’un **modèle de gouvernance des accès**, pas simplement d’un RBAC technique.

---

# CEREDIS — Schéma de rôles utilisateurs

## Gouvernance des accès et des usages

---

## 1. Principe directeur

> **Personne n’a accès à tout.
> Chacun voit exactement ce qui est nécessaire à son rôle institutionnel.**

CEREDIS repose sur une **séparation stricte** entre :

* pédagogie (enseignants),
* recherche (chercheurs),
* pilotage (bailleurs).

---

## 2. Trois rôles institutionnels principaux

| Rôle           | Finalité                       | Risque principal à éviter           |
| -------------- | ------------------------------ | ----------------------------------- |
| **Enseignant** | Faire apprendre et accompagner | Sur-interpréter les scores          |
| **Chercheur**  | Analyser scientifiquement      | Accéder à des données identifiantes |
| **Bailleur**   | Piloter et financer            | Confondre indicateurs et personnes  |

---

## 3. Rôle 1 — Enseignant

### Mission

* Suivre la progression de ses élèves,
* Identifier les besoins pédagogiques,
* Ajuster les activités d’apprentissage.

### Accès autorisés

| Composant             | Accès                                 |
| --------------------- | ------------------------------------- |
| Application éducative | Complet (ses classes)                 |
| CaSS                  | Lecture des compétences de ses élèves |
| Grafana               | Dashboards **classe / groupe**        |
| Superset              | Rapports agrégés classe               |
| RStudio               | ❌ Aucun                               |
| PostgreSQL brut       | ❌ Aucun                               |

### Données visibles

* scores CEREDIS individuels,
* niveaux CECRL,
* scores par domaine,
* **jamais** :

  * données des autres classes,
  * identités hors de sa classe,
  * données globales du projet.

### Finalité

> Soutenir la **régulation pédagogique**, pas classer les élèves.

---

## 4. Rôle 2 — Chercheur

### Mission

* Étudier les effets du dispositif,
* Tester des hypothèses,
* Publier des résultats.

### Accès autorisés

| Composant         | Accès                           |
| ----------------- | ------------------------------- |
| RStudio Server    | Complet                         |
| PostgreSQL (vues) | Accès aux vues anonymisées      |
| Superset          | Exploration avancée             |
| Grafana           | Monitoring global               |
| CaSS              | Lecture **preuves anonymisées** |
| Application       | ❌ Aucun                         |

### Données visibles

* données **pseudonymisées**,
* scores, domaines, compétences,
* historiques temporels,
* métadonnées (classe, niveau, âge si autorisé),
* **jamais** :

  * noms,
  * identifiants civils,
  * accès aux interfaces pédagogiques.

### Finalité

> Produire de la **connaissance scientifique**, pas gérer des élèves.

---

## 5. Rôle 3 — Bailleur / Décideur

### Mission

* Évaluer l’impact du projet,
* Piloter le financement,
* Décider des extensions.

### Accès autorisés

| Composant   | Accès                        |
| ----------- | ---------------------------- |
| Grafana     | Tableaux de bord **globaux** |
| Superset    | Rapports agrégés             |
| PostgreSQL  | ❌ Aucun                      |
| RStudio     | ❌ Aucun                      |
| CaSS        | ❌ Aucun                      |
| Application | ❌ Aucun                      |

### Données visibles

* indicateurs globaux :

  * score moyen,
  * progression,
  * % B1 → B2 → C1,
  * Domaine 5 moyen,
* comparaisons entre cohortes,
* graphiques temporels.

### Données invisibles

* tout identifiant individuel,
* toute donnée nominative,
* toute preuve brute.

### Finalité

> **Piloter par les résultats**, sans jamais exposer les personnes.

---

## 6. Mise en œuvre technique (résumé)

| Outil         | Enseignant      | Chercheur             | Bailleur |
| ------------- | --------------- | --------------------- | -------- |
| CaSS          | Scoped (classe) | Read-only (anonymisé) | Aucun    |
| PostgreSQL    | Aucun           | Vues                  | Aucun    |
| RStudio       | Aucun           | Full                  | Aucun    |
| Grafana       | Classe          | Global                | Global   |
| Superset      | Classe          | Global                | Global   |
| App éducative | Oui             | Non                   | Non      |

---

## 7. Conformité éthique & RGPD

Le schéma respecte :

* **minimisation des données**,
* **séparation des finalités**,
* **principe de moindre privilège**,
* **protection des mineurs**.

Il est conforme aux exigences :

* UNESCO (éthique),
* PNUD (gouvernance),
* Banque mondiale (redevabilité).

---

## 8. Valeur stratégique

Ce modèle permet :

* une **innovation pédagogique** sans risque institutionnel,
* une **recherche rigoureuse** sans violation éthique,
* un **pilotage politique** sans dérive de surveillance.

---

