# 📚 PHASE 3 - PLAN DE CRÉATION DES PARCOURS

**Date** : 2026-01-12  
**Objectif** : Créer 126 écrans avec metadata CEREDIS pour 4 chansons Goldman

---

## 🎯 VUE D'ENSEMBLE

### Objectif total : 126 écrans

| Chanson | Séances | Écrans/séance | Total écrans | Statut |
|---------|---------|---------------|--------------|--------|
| Né en 17 à Leidenstadt | 5 | 6 | 30 | ⏳ 1/5 |
| Là-bas | 5 | 6-7 | 31 | ⏳ 0/5 |
| C'est ta chance | 5 | 6-7 | 33 | ⏳ 0/5 |
| Le coureur | 5 | 6 | 32 | ⏳ 0/5 |
| **TOTAL** | **20** | **~6** | **126** | **5%** |

---

## 📊 ÉTAT ACTUEL

### Ce qui existe

**Fichiers présents** :
```
data/parcours/
├── ne-en-17/
│   ├── chanson.ts
│   ├── seance-1-decouverte.ts (ancien format)
│   ├── seance-1-exemple-migre.ts ✅ (nouveau format CEREDIS)
│   ├── seance-2-vocabulaire.ts (ancien format)
│   ├── seance-3-grammaire.ts (ancien format)
│   ├── seance-4-debat.ts (ancien format)
│   └── seance-5-production.ts (ancien format)
│
├── la-bas/
│   ├── chanson.ts
│   ├── seance-1-decouverte.ts (ancien format)
│   ├── seance-1.ts (ancien format)
│   ├── seance-2-vocabulaire.ts (ancien format)
│   ├── seance-3-grammaire.ts (ancien format)
│   ├── seance-4-debat.ts (ancien format)
│   └── seance-5-production.ts (ancien format)
│
└── cest-ta-chance/
    ├── chanson.ts
    ├── seance-1-decouverte.ts (ancien format)
    ├── seance-2-vocabulaire.ts (ancien format)
    ├── seance-3-grammaire.ts (ancien format)
    ├── seance-4-debat.ts (ancien format)
    └── seance-5-production.ts (ancien format)
```

**Constat** :
- ✅ 1 séance au format CEREDIS complet (seance-1-exemple-migre.ts)
- ❌ ~15 séances en ancien format (à migrer)
- ❌ "Le coureur" n'existe pas encore

---

## 🎨 STRUCTURE CIBLE PAR SÉANCE

### Pattern standard (6-7 écrans)

Chaque séance suit ce schéma :

```typescript
Écran 1: Introduction (P1, 5min, 0 pts)
Écran 2: Écoute découverte (P1, 5min, 0 pts)
Écran 3: QCM compréhension (P1, 8min, 8 pts)
Écran 4: QCM justifié ou analyse (P2, 10min, 12 pts)
Écran 5: Activité linguistique (P2, 7min, 10 pts)
Écran 6: Production écrite (P3, 12min, 15 pts)
Écran 7: Journal réflexif (P4, 8min, 10 pts)
Écran 8: Bilan (P4, 5min, 0 pts)

Total: 60 minutes, 55 points
```

### Distribution des types d'activités

| Type | Nombre | Exemples |
|------|--------|----------|
| Introduction | 1 | Contexte, consigne |
| Écoute | 1 | Découverte audio |
| QCM simple | 1 | Compréhension globale |
| QCM justifié | 1 | Analyse + justification |
| Texte à trous | 1 | Grammaire, vocabulaire |
| Ordre éléments | 0-1 | Structure phrastique |
| Texte libre | 1 | Production argumentée |
| Journal réflexif | 1 | Métacognition |
| Bilan | 1 | Synthèse |

---

## 📋 PLAN D'EXÉCUTION

### Stratégie : 3 étapes

#### **Étape 1 : Compléter "Né en 17"** (Priorité 1)

Créer les 4 séances manquantes en suivant le modèle de `seance-1-exemple-migre.ts` :

1. ✅ Séance 1 : Découverte - Question morale (FAIT)
2. ⏳ Séance 2 : Vocabulaire - Champ lexical de la souffrance
3. ⏳ Séance 3 : Grammaire - Le conditionnel passé
4. ⏳ Séance 4 : Débat - Culpabilité et responsabilité
5. ⏳ Séance 5 : Production - Dissertation sur le destin

**Fichiers à créer** :
- `seance-2-vocabulaire-migre.ts`
- `seance-3-grammaire-migre.ts`
- `seance-4-debat-migre.ts`
- `seance-5-production-migre.ts`

#### **Étape 2 : "Là-bas"** (Priorité 2)

Créer 5 séances complètes (31 écrans) :

1. Séance 1 : Découverte - Thème de l'exil
2. Séance 2 : Vocabulaire - Rêve et espoir
3. Séance 3 : Grammaire - Subjonctif et souhait
4. Séance 4 : Débat - Migration et identité
5. Séance 5 : Production - Lettre de là-bas

**Fichiers à créer** :
- `seance-1-exil.ts`
- `seance-2-vocabulaire.ts`
- `seance-3-subjonctif.ts`
- `seance-4-migration.ts`
- `seance-5-lettre.ts`

#### **Étape 3 : "C'est ta chance" + "Le coureur"** (Priorité 3)

**"C'est ta chance"** (33 écrans) :
1. Séance 1 : Découverte - Opportunité et courage
2. Séance 2 : Vocabulaire - Champ lexical du courage
3. Séance 3 : Grammaire - Impératif et conseil
4. Séance 4 : Débat - Prendre des risques
5. Séance 5 : Production - Discours motivationnel

**"Le coureur"** (32 écrans) :
1. Séance 1 : Découverte - Métaphore de la course
2. Séance 2 : Vocabulaire - Effort et persévérance
3. Séance 3 : Grammaire - Comparaison et métaphore
4. Séance 4 : Débat - Performance et humanité
5. Séance 5 : Production - Réflexion philosophique

---

## 🏗️ TEMPLATE GÉNÉRATEUR

### Script de génération automatique

Pour accélérer la création, créer un générateur TypeScript :

```typescript
// data/parcours/generator/seance-generator.ts

import type { SeanceCeredis, EcranCeredis } from '@/types/ceredis';
import { createCeredisMetadata } from '@/types/ceredis';

interface SeanceConfig {
  chansonId: string;
  numero: number;
  titre: string;
  theme: string;
  objectifPrincipal: string;
  competencesFocales: string[];
}

function generateSeance(config: SeanceConfig): SeanceCeredis {
  // Génération automatique basée sur le template
  // ...
}
```

---

## 📊 METADATA CEREDIS PAR CHANSON

### Distribution des compétences

Chaque chanson couvre **tous les domaines** :

| Domaine | Compétences couvertes | Focus |
|---------|----------------------|-------|
| **D1** | 1.1, 1.2, 1.3 | Compréhension orale |
| **D2** | 2.1, 2.2, 2.3 | Compréhension écrite |
| **D3** | 3.1, 3.2, 3.3 | Production écrite |
| **D4** | 4.1, 4.2, 4.3 | Interaction |
| **D5** | 5.1-5.7 | Métalinguistique |

### Distribution des preuves (Evidence Types)

Par séance :
- **P1** : 2 activités (QCM simple, écoute)
- **P2** : 2 activités (QCM justifié, linguistique)
- **P3** : 1 activité (production argumentée)
- **P4** : 2 activités (journal, bilan)

**Total parcours complet (20 séances)** :
- P1 : 40 activités
- P2 : 40 activités
- P3 : 20 activités
- P4 : 40 activités

---

## ✅ CHECKLIST DE VALIDATION

Pour chaque séance créée :

### Structure
- [ ] 6-8 écrans définis
- [ ] IDs uniques (format : `{chanson}-s{num}-e{num}`)
- [ ] Durées estimées réalistes (total ~50-60min)
- [ ] Progression logique P1 → P2 → P3 → P4

### Metadata CEREDIS
- [ ] Chaque écran a une metadata `ceredis`
- [ ] `competencies` pertinentes définies
- [ ] `evidenceType` approprié (P1-P4)
- [ ] `niveau` CECRL cohérent
- [ ] `scoreMax` défini (sauf intro/bilan)

### Contenu pédagogique
- [ ] Consignes claires
- [ ] Activités variées
- [ ] Questions de qualité
- [ ] Feedback pédagogique
- [ ] Objectifs d'apprentissage cohérents

### Domaine 5
- [ ] Au moins 2 activités D5 par séance
- [ ] Justifications textuelles (P2)
- [ ] Réflexion métacognitive (P4)
- [ ] Analyse linguistique explicite

### Validation technique
- [ ] `validateSeanceCeredis()` passe
- [ ] Types TypeScript corrects
- [ ] Export par défaut présent
- [ ] Imports fonctionnels

---

## 📈 MÉTRIQUES CIBLES

### Par séance
- Durée : 50-60 minutes
- Écrans : 6-8
- Score total : 45-55 points
- Compétences : 8-12 uniques
- Evidence types : P1 (2), P2 (2), P3 (1), P4 (2)

### Par chanson (5 séances)
- Durée : 250-300 minutes (4-5h)
- Écrans : 30-33
- Score total : 225-275 points
- Compétences : Toutes les 19
- Domaines : D1-D5 équilibrés

### Projet complet (20 séances)
- Durée : 1000-1200 minutes (16-20h)
- Écrans : 126
- Score total : 900-1100 points
- Compétences : 19 (couverture complète)
- Evidence types : 140 activités évaluables

---

## 🚀 ORDRE D'IMPLÉMENTATION

### Jour 1 : "Né en 17" (4 séances)
- Matin : Séances 2 et 3
- Après-midi : Séances 4 et 5
- Validation et tests

### Jour 2 : "Là-bas" (5 séances)
- Matin : Séances 1, 2, 3
- Après-midi : Séances 4 et 5
- Validation et tests

### Jour 3 : "C'est ta chance" + "Le coureur"
- Matin : "C'est ta chance" (5 séances)
- Après-midi : "Le coureur" (5 séances)
- Validation globale

---

## 🎯 PRIORITÉS

### Haute priorité (Immédiat)
1. ✅ Compléter "Né en 17" (modèle de référence)
2. Créer générateur/template
3. Documenter patterns

### Moyenne priorité
4. "Là-bas" complet
5. "C'est ta chance" complet

### Basse priorité
6. "Le coureur" complet
7. Tests E2E
8. Documentation utilisateur

---

## 💡 NOTES IMPORTANTES

### Cohérence pédagogique
- Suivre la progression CECRL (A2 → B1 → B2 → C1)
- Maintenir l'équilibre P1/P2/P3/P4
- Assurer la couverture D1-D5

### Qualité du contenu
- Questions ouvertes et stimulantes
- Analyses linguistiques précises
- Feedback constructif
- Respect des niveaux CECRL

### Integration technique
- Utiliser les composants Phase 2
- Metadata complète sur chaque écran
- Tracking automatique garanti
- Types TypeScript stricts

---

**Date de création** : 2026-01-12  
**Dernière mise à jour** : 2026-01-12  
**Statut** : En cours - 5% (1/20 séances)
