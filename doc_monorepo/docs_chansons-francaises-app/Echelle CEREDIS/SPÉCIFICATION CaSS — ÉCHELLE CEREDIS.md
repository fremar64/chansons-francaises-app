Nous allons maintenant **traduire l’architecture théorique CEREDIS en règles CaSS explicites, opérationnelles et auditables**, c’est-à-dire en **champs, attributs, relations et calculs** tels qu’ils doivent exister **dans ou autour de CaSS**.

L’objectif est double :

1. permettre à CaSS de **porter réellement l’échelle CEREDIS** (et pas seulement des labels CECRL),
2. garantir une **traçabilité complète : preuve → compétence → domaine → score global → niveau CECRL**.

Ce qui suit constitue une **spécification technique et méthodologique de référence**.

---

# SPÉCIFICATION CaSS — ÉCHELLE CEREDIS

## Champs, attributs, relations et règles de calcul

---

## 1. Principe d’architecture (rappel structurant)

> CaSS n’est pas un moteur d’évaluation “pédagogique”,
> c’est un **registre de compétences et d’assertions**.
>
> 👉 CEREDIS transforme CaSS en **infrastructure de mesure**,
> en ajoutant une **couche de calcul normée**, explicite et contrôlée.

---

## 2. Objets CaSS mobilisés (vue d’ensemble)

| Objet CaSS              | Rôle dans CEREDIS                       |
| ----------------------- | --------------------------------------- |
| **CompetencyFramework** | Référentiel CEREDIS                     |
| **Competency**          | Compétences X.Y                         |
| **Assertion**           | État d’une compétence pour un apprenant |
| **Evidence**            | Preuves P1–P4                           |
| **Agent**               | Apprenant / évaluateur                  |
| **Relation**            | Lien preuve → assertion                 |

---

## 3. NIVEAU 1 — Preuves (Evidence)

### 3.1. Champs obligatoires pour chaque preuve

Chaque **Evidence** doit comporter les champs suivants :

| Champ          | Type          | Description          |
| -------------- | ------------- | -------------------- |
| `evidenceId`   | UUID          | Identifiant unique   |
| `competencyId` | UUID          | Compétence concernée |
| `agentId`      | UUID          | Apprenant            |
| `evidenceType` | Enum          | P1, P2, P3 ou P4     |
| `rawScore`     | Float (0–100) | Score brut attribué  |
| `timestamp`    | DateTime      | Date de production   |
| `context`      | String        | Activité / chanson   |
| `validator`    | UUID          | Enseignant / système |

👉 **Règle absolue** : aucune preuve sans `rawScore`.

---

### 3.2. Pondération par type de preuve (rappel normatif)

| `evidenceType` | Poids (`w_type`) |
| -------------- | ---------------- |
| P1             | 0,15             |
| P2             | 0,30             |
| P3             | 0,35             |
| P4             | 0,20             |

Ces poids **ne sont pas stockés dans chaque preuve**,
mais dans une **table de référence CEREDIS**.

---

## 4. NIVEAU 2 — Assertions de compétences (Assertion)

### 4.1. Champs obligatoires d’une assertion

Chaque **Assertion** (état d’une compétence X.Y pour un apprenant) doit contenir :

| Champ              | Type          | Description                   |
| ------------------ | ------------- | ----------------------------- |
| `assertionId`      | UUID          | Identifiant                   |
| `competencyId`     | UUID          | X.Y                           |
| `agentId`          | UUID          | Apprenant                     |
| `competencyScore`  | Float (0–100) | Score calculé                 |
| `validationStatus` | Enum          | non acquis / partiel / acquis |
| `lastUpdated`      | DateTime      | Dernier calcul                |

⚠️ `competencyScore` est **calculé**, jamais saisi manuellement.

---

### 4.2. Calcul du score de compétence (règle formelle)

Pour une compétence donnée :

[
\text{competencyScore} =
\sum_{i=1}^{n} (\text{rawScore}*i \times w*{\text{type}_i})
]

avec contraintes :

* respect des **preuves minimales par niveau CECRL**,
* respect des **plafonds par type de preuve**,
* exclusion automatique si diversité non respectée.

👉 Si une règle n’est pas satisfaite → `validationStatus = "incomplet"`.

---

## 5. NIVEAU 3 — Scores par domaine

Les domaines **ne sont pas des objets CaSS natifs**,
mais des **agrégats logiques** définis par CEREDIS.

### 5.1. Table de correspondance Domaine → Compétences

Exemple :

| Domaine   | Compétences   |
| --------- | ------------- |
| Domaine 1 | 1.1, 1.2, 1.3 |
| Domaine 2 | 2.1, 2.2, 2.3 |
| Domaine 3 | 3.1, 3.2, 3.3 |
| Domaine 4 | 4.1, 4.2, 4.3 |
| Domaine 5 | 5.1 → 5.7     |

---

### 5.2. Calcul du score de domaine

[
Score_{domaine} =
\sum (\text{competencyScore}*j \times w*{\text{competency}_j})
]

Chaque domaine produit un score **0–100**.

---

## 6. NIVEAU 4 — Score global CEREDIS (0–600)

### 6.1. Pondérations des domaines (rappel)

| Domaine   | Poids |
| --------- | ----- |
| Domaine 1 | 0,20  |
| Domaine 2 | 0,20  |
| Domaine 3 | 0,25  |
| Domaine 4 | 0,15  |
| Domaine 5 | 0,20  |

---

### 6.2. Calcul du score global

[
Score_{CEREDIS} =
\sum (Score_{domaine_k} \times w_{domaine_k}) \times 6
]

👉 Le facteur ×6 permet de passer de **0–100** à **0–600**.

Ce score est stocké comme **attribut calculé global** :

| Champ          | Type          |
| -------------- | ------------- |
| `ceredisScore` | Float (0–600) |

---

## 7. NIVEAU 5 — Attribution du niveau CECRL

Le niveau CECRL est un **attribut dérivé**, jamais évalué directement.

### 7.1. Mapping CEREDIS → CECRL

| `ceredisScore` | Niveau CECRL |
| -------------- | ------------ |
| 200–299        | A2           |
| 300–399        | B1           |
| 400–499        | B2           |
| 500–599        | C1           |

### 7.2. Règles supplémentaires (rappel)

* seuils planchers par domaine,
* compétences seuils obligatoires,
* preuves P4 requises à B2/C1.

Si une condition échoue :
→ niveau CECRL **inférieur** attribué.

---

## 8. Ce que CaSS DOIT exposer / NE PAS exposer

### 8.1. Attributs internes (mesure)

* `rawScore`
* `competencyScore`
* `domainScore`
* `ceredisScore`

### 8.2. Attributs externes (communication)

* `CECRL_Level` (A2–C1)
* progression visuelle (% vers niveau suivant)

👉 Conformité totale avec le **Cadre européen commun de référence pour les langues**.

---

## 9. Schéma logique synthétique

```
Evidence (P1–P4, rawScore)
        ↓
Assertion (competencyScore)
        ↓
Domaine (domainScore)
        ↓
CEREDIS_Score (0–600)
        ↓
CECRL_Level (A2–C1)
```

---

## 10. Ce que vous avez maintenant

Vous disposez :

* d’une **spécification CaSS complète**,
* d’un **système de calcul explicite et auditables**,
* d’une **échelle continue réellement implémentable**,
* d’une **compatibilité institutionnelle totale**.

---

