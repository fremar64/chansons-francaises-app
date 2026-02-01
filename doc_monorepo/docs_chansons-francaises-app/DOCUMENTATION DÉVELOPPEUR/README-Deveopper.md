Voici un **README développeur court (onboarding)**, pensé pour une **prise en main rapide** par un développeur backend / data rejoignant le projet CEREDIS.

---

# CEREDIS — Developer README

## Onboarding technique (version courte)

---

## 1. Objectif du projet

CEREDIS est un dispositif d’évaluation des apprentissages en français **par la chanson**, fondé sur :

* un référentiel de compétences aligné et enrichi par rapport au **Cadre européen commun de référence pour les langues**,
* une **échelle numérique continue CEREDIS (0–600)**,
* une implémentation sur **CaSS** (Competency and Skills System),
* une couche analytique destinée au pilotage pédagogique et à la recherche.

👉 **Le CECRL est la sortie normative.**
👉 **CEREDIS est l’instrument interne de mesure.**

---

## 2. Principe clé à comprendre immédiatement

> **On ne calcule jamais directement un niveau CECRL.**

Le système fonctionne ainsi :

```
Preuves (P1–P4)
   → Compétences (scores 0–100)
      → Domaines (scores 0–100)
         → Score CEREDIS (0–600)
            → Niveau CECRL (A2–C1)
```

La **seule donnée saisie manuellement** est la preuve (`Evidence`).

---

## 3. Architecture technique (résumé)

### Composants

* **Application pédagogique** : génère les preuves
* **CaSS** : stocke compétences, preuves, assertions
* **Couche CEREDIS (SQL)** :

  * vues de calcul,
  * fonctions de recalcul,
  * règles de décision
* **Tableaux de bord** : enseignants / chercheurs

---

## 4. Modèle de données (essentiel)

Tables principales :

| Table             | Rôle                           |
| ----------------- | ------------------------------ |
| `evidence`        | Données brutes (P1–P4, scores) |
| `assertion`       | Score par compétence (calculé) |
| `domain_score`    | Score par domaine (calculé)    |
| `ceredis_profile` | Score global + CECRL           |

⚠️ **Ne jamais écrire manuellement** :

* `competency_score`
* `domain_score`
* `ceredis_score`
* `cecrl_level`

---

## 5. Calculs (ce que fait le système)

* pondération des preuves (P1–P4),
* agrégation par compétence,
* agrégation par domaine,
* calcul du score CEREDIS,
* dérivation du niveau CECRL par seuils.

Tout est implémenté via :

* **vues SQL** (audit / debug),
* **fonctions SQL** (`recalc_full_ceredis(agent_id)`).

---

## 6. Workflow développeur typique

1. L’application insère une **preuve** (`INSERT INTO evidence`)
2. Le backend appelle :

   ```sql
   SELECT recalc_full_ceredis(:agent_id);
   ```
3. Les tables calculées sont mises à jour
4. Les tableaux de bord lisent :

   * `ceredis_profile`
   * `domain_score`
   * `assertion`

---

## 7. Bonnes pratiques (à respecter strictement)

### À FAIRE

* utiliser les vues pour comprendre un score,
* conserver toutes les preuves (auditabilité),
* versionner toute modification des règles CEREDIS.

### À NE PAS FAIRE

* recalculer côté frontend,
* exposer le score CEREDIS brut aux élèves,
* modifier les seuils sans validation scientifique.

---

## 8. Pour aller plus loin

Documents de référence du projet :

* Architecture technique CEREDIS (document complet)
* DDL SQL + vues + procédures
* Protocole statistique pré/post
* Spécification du tableau de bord analytique

---

## 9. Contact projet

CEREDIS est un projet **à exigence scientifique élevée**.
Toute modification structurelle (scores, seuils, domaines) doit être **documentée et validée**.

---

### TL;DR

* **Tu n’évalues pas des niveaux, tu calcules des preuves.**
* **CEREDIS mesure, le CECRL communique.**
* **Une seule source de vérité : la base de données.**

Bienvenue dans le projet CEREDIS.
