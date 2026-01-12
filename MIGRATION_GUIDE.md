# GUIDE DE MIGRATION - Types CEREDIS Unifiés

**Date**: 2026-01-12  
**Étape**: 1.2 - Harmonisation des types

---

## 🎯 Objectif

Migrer progressivement le code existant pour utiliser les types CEREDIS unifiés.

---

## 📦 NOUVEAUX IMPORTS

### Avant

```typescript
// Ancien - Imports multiples
import type { Ecran, Seance } from '@/types/seance';
import type { CassAssertion } from '@/services/integration/types';
```

### Après

```typescript
// Nouveau - Import centralisé
import type { 
  EcranCeredis, 
  SeanceCeredis, 
  CeredisMetadata,
  CompetencyId 
} from '@/types/ceredis';

// Ou encore plus simple
import type { EcranCeredis, SeanceCeredis } from '@/types';
```

---

## 🔄 MIGRATION DES ÉCRANS

### Exemple 1 : Écran Quiz QCM Simple

#### Avant (sans metadata CEREDIS)

```typescript
const ecran: Ecran = {
  id: 'ne17-s1-e1',
  numero: 1,
  titre: 'Première écoute',
  type: 'quiz_qcm',
  consigne: 'Écoutez la chanson et répondez aux questions',
  activite: {
    type: 'quiz_qcm',
    questions: [...]
  },
  competencesCibles: ['CO_GLOBALE', 'CE_NARRATIVE'] // ❌ Format ancien
};
```

#### Après (avec metadata CEREDIS)

```typescript
import { createCeredisMetadata } from '@/types/ceredis';

const ecran: EcranCeredis = {
  id: 'ne17-s1-e1',
  numero: 1,
  titre: 'Première écoute',
  type: 'quiz_qcm',
  consigne: 'Écoutez la chanson et répondez aux questions',
  activite: {
    type: 'quiz_qcm',
    questions: [...]
  },
  // ✅ Metadata CEREDIS structurée
  ceredis: createCeredisMetadata({
    competencies: ['1.1', '2.1'],  // Format CEREDIS standard
    evidenceType: 'P1',            // Type de preuve
    niveau: 'A2',                  // Niveau CECRL
    scoreMax: 8                    // Score maximum
  })
};
```

### Exemple 2 : Écran Journal Réflexif (Domaine 5)

```typescript
const ecran: EcranCeredis = {
  id: 'ne17-s5-e3',
  numero: 15,
  titre: 'Journal réflexif final',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à votre parcours',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'journal-final',
      titre: 'Bilan métacognitif',
      questionPrincipale: 'Comment avez-vous progressé ?',
      sousQuestions: [
        'Quelles stratégies avez-vous utilisées ?',
        'Qu\'avez-vous appris sur votre apprentissage ?'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],         // Métacognition
    evidenceType: 'P4',            // Preuve réflexive
    niveau: 'B2',
    scoreMax: 10
  })
};
```

---

## 🔄 MIGRATION DES SÉANCES

### Exemple : Séance complète

#### Avant

```typescript
const seance: Seance = {
  id: 'ne17-s1',
  chansonId: 'ne17',
  numero: 1,
  titre: 'Découverte',
  description: 'Première approche de la chanson',
  objectifs: [
    'Comprendre le contexte historique',
    'Identifier le thème principal'
  ],
  dureeEstimee: 50,
  ecrans: [
    // Écrans sans metadata CEREDIS
  ],
  competences: ['CO_GLOBALE', 'CULTURE_HISTOIRE'] // ❌ Format ancien
};
```

#### Après

```typescript
import { 
  generateSeanceGlobalMetadata,
  type SeanceCeredis 
} from '@/types/ceredis';

const seance: SeanceCeredis = {
  id: 'ne17-s1',
  chansonId: 'ne17',
  numero: 1,
  titre: 'Découverte',
  description: 'Première approche de la chanson',
  objectifs: [
    'Comprendre le contexte historique',
    'Identifier le thème principal'
  ],
  dureeEstimee: 50,
  ecrans: [
    // Écrans avec metadata CEREDIS (EcranCeredis[])
  ],
  competences: ['1.1', '2.1', '5.2'], // ✅ Format CEREDIS
  // ✅ Metadata globale auto-générée
  ceredisGlobal: generateSeanceGlobalMetadata(seance)
};
```

---

## 🛠️ HELPERS DE MIGRATION

### 1. Créer metadata rapidement

```typescript
import { createCeredisMetadata } from '@/types/ceredis';

// P1 : Réception simple (QCM, écoute)
const metadataP1 = createCeredisMetadata({
  competencies: ['1.1'],
  evidenceType: 'P1',
  niveau: 'A2',
  scoreMax: 8
});

// P2 : Analyse guidée (QCM justifié, texte à trous)
const metadataP2 = createCeredisMetadata({
  competencies: ['5.1', '5.2'],
  evidenceType: 'P2',
  niveau: 'B1',
  scoreMax: 10
});

// P3 : Production argumentée (Texte libre)
const metadataP3 = createCeredisMetadata({
  competencies: ['3.1', '3.2'],
  evidenceType: 'P3',
  niveau: 'B2',
  scoreMax: 15
});

// P4 : Métacognition (Journal réflexif)
const metadataP4 = createCeredisMetadata({
  competencies: ['5.6'],
  evidenceType: 'P4',
  niveau: 'B2',
  scoreMax: 10
});
```

### 2. Valider avant d'utiliser

```typescript
import { validateEcranCeredis, validateSeanceCeredis } from '@/types/ceredis';

// Valider un écran
const validation = validateEcranCeredis(ecran);
if (!validation.valid) {
  console.error('Erreurs:', validation.errors);
}

// Valider une séance complète
const seanceValidation = validateSeanceCeredis(seance);
if (!seanceValidation.valid) {
  console.error('Erreurs:', seanceValidation.errors);
}
```

### 3. Migrer un écran existant

```typescript
import { migrateEcranToCeredis } from '@/types/ceredis';

// Écran ancien
const ancienEcran: Ecran = { ... };

// Migrer avec metadata
const nouvelEcran = migrateEcranToCeredis(ancienEcran, {
  competencies: ['1.1'],
  evidenceType: 'P1',
  niveau: 'A2',
  scoreMax: 8
});
```

### 4. Extraire des statistiques

```typescript
import { 
  extractUniqueCompetencies,
  calculateTotalMaxScore,
  extractMainDomains
} from '@/types/ceredis';

// Extraire les compétences uniques
const competences = extractUniqueCompetencies(seance);
// → ['1.1', '2.1', '5.2', '5.6']

// Calculer le score max total
const scoreMax = calculateTotalMaxScore(seance);
// → 86

// Extraire les domaines principaux
const domaines = extractMainDomains(seance);
// → ['D1', 'D2', 'D5']
```

---

## 📋 CHECKLIST DE MIGRATION

### Pour chaque fichier de séance

- [ ] Importer les types CEREDIS
- [ ] Changer `Ecran` → `EcranCeredis`
- [ ] Changer `Seance` → `SeanceCeredis`
- [ ] Ajouter `ceredis: { ... }` à chaque écran
- [ ] Mettre à jour `competences` au format CEREDIS
- [ ] Générer `ceredisGlobal` (optionnel)
- [ ] Valider avec `validateSeanceCeredis()`
- [ ] Tester le chargement de la séance

### Pour chaque composant d'activité

- [ ] Importer `CeredisMetadata` et `CompetencyId`
- [ ] Ajouter props `metadata: CeredisMetadata`
- [ ] Ajouter props `userId: string` et `userName: string`
- [ ] Intégrer `unifiedIntegrationService`
- [ ] Tester le tracking

---

## 🎯 ORDRE DE MIGRATION RECOMMANDÉ

### Phase 1 : Fichiers de données (1-2 jours)

1. `data/parcours/ne-en-17/seance-1.ts`
2. `data/parcours/ne-en-17/seance-2.ts`
3. ... (toutes les séances "Né en 17")
4. Autres parcours

### Phase 2 : Composants (1 jour)

1. `components/activities/QuizQCM.tsx`
2. `components/activities/QuizQCMJustifie.tsx`
3. `components/activities/TexteLibre.tsx`
4. `components/activities/TexteATrous.tsx`
5. `components/activities/OrdreElements.tsx`
6. `components/activities/JournalReflexif.tsx`

### Phase 3 : Pages et services (0.5 jour)

1. Pages qui consomment les séances
2. Services qui utilisent les types

---

## ⚠️ POINTS D'ATTENTION

### 1. Compatibilité ascendante

Les anciens types (`Ecran`, `Seance`) continuent de fonctionner. La migration peut être progressive.

### 2. Validation stricte

Les types CEREDIS sont plus stricts :
- Les compétences doivent être au format `'X.Y'`
- Le `evidenceType` doit être `'P1' | 'P2' | 'P3' | 'P4'`
- Le `domaine` doit être `'D1' | 'D2' | 'D3' | 'D4' | 'D5'`

### 3. Règles Domaine 5

Le service unifié applique automatiquement les règles :
- Les compétences 5.x nécessitent une preuve réflexive
- Les QCM simples ne valident pas le Domaine 5
- Les activités avec justification peuvent valider D5

---

## 📚 EXEMPLES COMPLETS

Voir les fichiers d'exemple dans `/data/parcours/ne-en-17/` après migration.

---

## 🆘 BESOIN D'AIDE ?

1. Consulter `types/ceredis.ts` pour la doc complète
2. Consulter `services/integration-unified/README.md`
3. Utiliser les fonctions de validation pour détecter les problèmes

---

**Guide créé** : 2026-01-12  
**Version** : 1.0  
**Statut** : Prêt pour migration 🚀
