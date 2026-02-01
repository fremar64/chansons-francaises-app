Voici la **DOCUMENTATION DÉVELOPPEUR CEREDIS – Architecture technique**, rédigée comme un **document de référence officiel**, utilisable :

* par des développeurs backend / data,
* par un intégrateur CaSS,
* par un auditeur technique,
* comme annexe d’architecture dans un dossier bailleurs / recherche.

Le document est **auto-suffisant**, cohérent avec tout ce que nous avons construit, et ne suppose aucune connaissance préalable de nos échanges.

---

# DOCUMENTATION DÉVELOPPEUR

## Architecture technique CEREDIS

### Référentiel de compétences – Évaluation – Analytique

---

## 1. Finalité du document

Ce document décrit l’**architecture technique complète du dispositif CEREDIS**, depuis la collecte des preuves d’apprentissage jusqu’à la production :

* d’un **score continu CEREDIS**,
* d’un **niveau CECRL dérivé**,
* et d’indicateurs analytiques exploitables pédagogiquement et scientifiquement.

Il constitue la **référence normative technique** du projet.

---

## 2. Principes fondateurs de l’architecture

### 2.1. Séparation stricte des responsabilités

| Couche                  | Responsabilité                             |
| ----------------------- | ------------------------------------------ |
| Application pédagogique | Produire des activités et des preuves      |
| CaSS                    | Stocker compétences, assertions et preuves |
| Couche CEREDIS          | Calculer, agréger, décider                 |
| Tableaux de bord        | Visualiser et analyser                     |

👉 **Aucune couche ne doit empiéter sur une autre.**

---

### 2.2. Principe fondamental de mesure

> **Les niveaux CECRL ne sont jamais évalués directement.**
> Ils sont **inférés** à partir de preuves agrégées.

Le système mesure :

* des **preuves**,
* des **compétences**,
* des **domaines**,
  avant de produire un niveau normatif.

---

## 3. Vue d’ensemble de l’architecture

```
Application CEREDIS
   (activités pédagogiques)
            ↓
         PREUVES
     (Evidence – P1 à P4)
            ↓
        CaSS CORE
   (Assertions de compétences)
            ↓
   COUCHE CEREDIS
 (calculs & agrégations)
            ↓
  PROFIL CEREDIS
 (score + CECRL)
            ↓
 TABLEAUX DE BORD
```

---

## 4. Modèle de données (rappel synthétique)

### 4.1. Objets centraux

| Objet          | Rôle                          |
| -------------- | ----------------------------- |
| Evidence       | Donnée brute d’évaluation     |
| Assertion      | Score calculé par compétence  |
| DomainScore    | Agrégation par domaine        |
| CEREDISProfile | Vue synthétique par apprenant |

👉 **Evidence est la seule donnée saisie manuellement.**

---

### 4.2. Types de preuves (canonique CEREDIS)

| Code | Type                 | Fonction cognitive |
| ---- | -------------------- | ------------------ |
| P1   | Réponse guidée       | Reconnaissance     |
| P2   | Analyse linguistique | Structuration      |
| P3   | Production autonome  | Intégration        |
| P4   | Métacognition        | Régulation         |

---

## 5. Échelle CEREDIS et CECRL

### 5.1. Échelle continue

* **CEREDIS Score** : 0 → 600
* Score interne, continu, cumulatif

### 5.2. Mapping CECRL

| CEREDIS | CECRL |
| ------- | ----- |
| 200–299 | A2    |
| 300–399 | B1    |
| 400–499 | B2    |
| 500–599 | C1    |

Le CECRL est :

* **dérivé**,
* **explicable**,
* **audit-able**.

---

## 6. Règles de calcul (vue fonctionnelle)

### 6.1. Calcul par preuve

Chaque preuve possède :

* un `rawScore` (0–100),
* un poids selon son type (P1–P4).

---

### 6.2. Calcul par compétence

[
Score_{compétence} = \sum (Score_{preuve} \times Poids_{preuve})
]

Avec contraintes :

* diversité minimale de preuves,
* plafonnement par type,
* règles renforcées pour le Domaine 5.

---

### 6.3. Calcul par domaine

[
Score_{domaine} = \sum (Score_{compétence} \times Poids_{compétence})
]

---

### 6.4. Calcul global CEREDIS

[
Score_{CEREDIS} = \sum (Score_{domaine} \times Poids_{domaine}) \times 6
]

---

## 7. Décision CECRL (logique métier)

Un niveau CECRL est attribué **si et seulement si** :

1. le score CEREDIS atteint le seuil numérique,
2. tous les domaines dépassent leur seuil plancher,
3. les compétences seuils sont validées,
4. les preuves P3 / P4 requises sont présentes.

👉 Toute décision est **traçable a posteriori**.

---

## 8. Implémentation SQL (rôle des composants)

| Composant | Usage                     |
| --------- | ------------------------- |
| Tables    | Stockage persistant       |
| Vues      | Calcul transparent        |
| Fonctions | Matérialisation contrôlée |
| Jobs      | Recalcul batch            |

Les calculs doivent être :

* **déterministes**,
* **reproductibles**,
* **idempotents**.

---

## 9. Stratégie de recalcul

### 9.1. Recalcul événementiel

* déclenché à l’insertion d’une preuve,
* recalcul local (1 compétence → 1 domaine → profil).

### 9.2. Recalcul batch

* nightly job,
* recalcul complet (sécurisation).

---

## 10. Gouvernance des données

### 10.1. Données visibles par rôle

| Donnée        | Élève | Enseignant | Chercheur |
| ------------- | ----- | ---------- | --------- |
| CECRL         | ✅     | ✅          | ✅         |
| Score CEREDIS | ⚠️    | ✅          | ✅         |
| Domaines      | ❌     | ✅          | ✅         |
| Compétences   | ❌     | ✅          | ✅         |
| Preuves       | ❌     | ✅          | ✅         |

---

### 10.2. Traçabilité et audit

Chaque score doit permettre une descente complète :

```
CECRL → CEREDIS → Domaine → Compétence → Preuve
```

---

## 11. Sécurité et intégrité

* interdiction de modification directe des scores,
* journalisation des recalculs,
* anonymisation pour exports recherche,
* conservation des preuves (non destructives).

---

## 12. Extensibilité du système

L’architecture permet sans refonte :

* ajout du niveau C2,
* ajout de nouveaux domaines,
* ajout de nouveaux types de preuves,
* interconnexion LRS / xAPI / R / Python.

---

## 13. Bonnes pratiques de développement

### À FAIRE

* utiliser les vues pour débogage,
* versionner les règles CEREDIS,
* documenter tout changement de seuil.

### À NE PAS FAIRE

* coder les règles dans l’interface,
* afficher les scores bruts aux élèves,
* court-circuiter la couche CEREDIS.

---

## 14. Statut du document

Ce document est :

* la **référence technique officielle CEREDIS**,
* valable pour la phase pilote,
* révisable uniquement par décision scientifique / institutionnelle.

---

## 15. Conclusion

L’architecture CEREDIS :

* transforme CaSS en **instrument de mesure scientifique**,
* respecte strictement le **Cadre européen commun de référence pour les langues**,
* offre une **granularité d’analyse inédite** dans un cadre institutionnel.

Elle place le projet CEREDIS à un niveau **rarement atteint dans les dispositifs EdTech**, à la frontière entre **ingénierie pédagogique**, **science des données** et **évaluation normative**.

---

