Voici un **schéma d’architecture de données CEREDIS**, **formel, audit-able et directement exploitable** par :

* un développeur (implémentation CaSS / services adjacents),
* un data scientist (analyses, statistiques),
* un comité scientifique ou des bailleurs (compréhension du dispositif).

Je le présente en **trois niveaux complémentaires** :

1. schéma conceptuel,
2. schéma logique (objets & relations),
3. schéma de calcul (flux de scores).

---

# SCHÉMA D’ARCHITECTURE DE DONNÉES CEREDIS

## Preuves → Compétences → Domaines → Score global

---

## 1. Schéma conceptuel (vue d’ensemble)

```
ACTIVITÉS PÉDAGOGIQUES
        ↓
     PREUVES
 (P1, P2, P3, P4)
        ↓
   COMPÉTENCES
     (X.Y)
        ↓
     DOMAINES
   (1 à 5)
        ↓
 SCORE CEREDIS
     (0–600)
        ↓
  NIVEAU CECRL
   (A2–C1)
```

👉 Lecture clé :
**on ne mesure jamais directement un niveau**,
on **l’infère** à partir de preuves agrégées.

---

## 2. Schéma logique (objets et relations)

### 2.1. Entités principales

```
[Agent]
  └── agentId
  └── rôle (apprenant / évaluateur)

[Evidence]
  └── evidenceId
  └── agentId
  └── competencyId
  └── evidenceType (P1 | P2 | P3 | P4)
  └── rawScore (0–100)
  └── timestamp
  └── contexte (chanson, activité)

[Competency]
  └── competencyId (X.Y)
  └── domainId
  └── niveauCECRL_cible

[Assertion]
  └── assertionId
  └── agentId
  └── competencyId
  └── competencyScore (0–100)
  └── validationStatus
  └── lastUpdated

[Domain]
  └── domainId (1 à 5)
  └── domainScore (0–100)

[CEREDIS_Profile]
  └── agentId
  └── ceredisScore (0–600)
  └── cecrlLevel (A2 | B1 | B2 | C1)
```

---

### 2.2. Relations structurantes

```
Agent 1 ──── n Evidence
Evidence n ──── 1 Competency
Competency 1 ──── 1 Domain
Competency 1 ──── n Assertion
Agent 1 ──── n Assertion
Domain 1 ──── 1 CEREDIS_Profile
```

👉 **Relation clé** :
`Evidence → Assertion` = cœur du calcul.

---

## 3. Schéma de calcul (flux métrique détaillé)

### 3.1. Niveau 1 — Calcul par preuve

Chaque preuve est évaluée indépendamment.

```
Evidence:
  rawScore ∈ [0–100]
  evidenceType ∈ {P1, P2, P3, P4}
```

Les pondérations sont **externes** :

```
PoidsPreuve:
  P1 → 0,15
  P2 → 0,30
  P3 → 0,35
  P4 → 0,20
```

---

### 3.2. Niveau 2 — Agrégation en score de compétence

```
Pour chaque Competency X.Y et Agent A :

competencyScore(A, X.Y) =
  Σ (rawScore_i × poids(evidenceType_i))
```

Avec contraintes :

* diversité minimale de preuves,
* plafonnement par type,
* règles spécifiques Domaine 5.

➡️ Résultat stocké dans **Assertion**.

---

### 3.3. Niveau 3 — Agrégation par domaine

```
Pour chaque Domain D et Agent A :

domainScore(A, D) =
  Σ (competencyScore_j × poidsCompétence_j)
```

Résultat normalisé sur **0–100**.

---

### 3.4. Niveau 4 — Score global CEREDIS

```
ceredisScore(A) =
  Σ (domainScore_k × poidsDomaine_k) × 6
```

Poids domaines :

```
D1 → 0,20
D2 → 0,20
D3 → 0,25
D4 → 0,15
D5 → 0,20
```

➡️ Résultat ∈ **[0–600]**

---

### 3.5. Niveau 5 — Décision CECRL

```
Si ceredisScore ∈ [400–499]
ET tous les domaines ≥ seuils
ET compétences seuils validées
ET preuves requises présentes
→ CECRL_Level = B2
```

Sinon :
→ niveau inférieur ou zone de transition.

---

## 4. Schéma synthétique “pipeline de données”

```
[Evidence P1–P4]
   │  rawScore
   ▼
[Assertion / Compétence X.Y]
   │  competencyScore
   ▼
[Domain 1..5]
   │  domainScore
   ▼
[CEREDIS_Score 0–600]
   │
   ▼
[CECRL_Level A2–C1]
```

---

## 5. Séparation stricte des couches (principe clé)

| Couche        | Rôle                   | Visible     |
| ------------- | ---------------------- | ----------- |
| Preuves       | Données brutes         | Chercheur   |
| Compétences   | Estimation cognitive   | Enseignant  |
| Domaines      | Profil d’apprentissage | Enseignant  |
| Score CEREDIS | Mesure continue        | Chercheur   |
| CECRL         | Référence normative    | Institution |

👉 Cette séparation est **fondamentale** pour la conformité institutionnelle.

---

## 6. Ce que ce schéma garantit

* **Traçabilité totale** (audit possible à tout niveau),
* **Mesure scientifique** (scores continus),
* **Lisibilité CECRL** (niveaux standards),
* **Extensibilité** (C2, nouveaux domaines),
* **Interopérabilité** (export statistiques, LRS, xAPI).

---

