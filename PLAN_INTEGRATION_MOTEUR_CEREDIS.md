# 🎯 PLAN D'INTÉGRATION - Moteur CEREDIS dans Next.js

**Date**: 2026-01-12  
**Objectif**: Intégrer le moteur de calcul CEREDIS (Phase A) dans l'application Next.js

---

## 📊 SITUATION

### ✅ Ce qui existe (standalone)

**Archive**: `/mnt/user-data/outputs/ceredis-engine-v1.0.tar.gz`

**Modules** :
1. **evidenceAggregator.js** - Agrège les preuves par compétence
2. **competencyCalculator.js** - Calcule scores par compétence
3. **domainCalculator.js** - Calcule scores par domaine
4. **ceredisCalculator.js** - Calcule score global (0-600)
5. **cecrlDecider.js** - Décide du niveau CECRL
6. **levelValidator.js** - Valide règles B2/C1

**Configuration** :
- `config/ceredis.v1.json` : Configuration complète (19 compétences, 5 domaines, règles)

### ❌ Ce qui manque

Le moteur **n'est PAS intégré** dans l'app Next.js (`chansons-francaises-app`).

---

## 🎯 OBJECTIFS

1. ✅ Porter le moteur en **TypeScript**
2. ✅ Intégrer dans **Next.js** (`/services/ceredis-calculator/`)
3. ✅ Exposer comme **API Route** (`/app/api/ceredis/calculate`)
4. ✅ Connecter à **PocketBase** (au lieu de CaSS)
5. ✅ Intégrer avec **PostgreSQL** (sauvegarde résultats)
6. ✅ Ajouter **cache** et **optimisations**

---

## 🗂️ ARCHITECTURE CIBLE

```
chansons-francaises-app/
├── services/
│   ├── integration-unified/      [✅ Existe - Phase D1]
│   │   └── integration.unified.ts
│   │
│   └── ceredis-calculator/       [❌ À créer]
│       ├── engine/
│       │   ├── evidenceAggregator.ts
│       │   ├── competencyCalculator.ts
│       │   ├── domainCalculator.ts
│       │   ├── ceredisCalculator.ts
│       │   ├── cecrlDecider.ts
│       │   └── levelValidator.ts
│       ├── config.ts
│       ├── types.ts
│       └── index.ts
│
├── app/
│   └── api/
│       └── ceredis/
│           └── calculate/
│               └── route.ts       [❌ À créer]
│
└── lib/
    └── ceredis/                   [❌ À créer]
        ├── client.ts              (Helper frontend)
        └── hooks.ts               (React hooks)
```

---

## 📋 PLAN D'EXÉCUTION

### **Phase 1 : Porter le moteur en TypeScript** (3-4h)

#### Étape 1.1 : Créer la structure

```bash
mkdir -p services/ceredis-calculator/engine
touch services/ceredis-calculator/config.ts
touch services/ceredis-calculator/types.ts
touch services/ceredis-calculator/index.ts
```

#### Étape 1.2 : Définir les types

**Fichier** : `services/ceredis-calculator/types.ts`

```typescript
// Types pour les preuves (Evidences)
export interface Evidence {
  id: string;
  userId: string;
  competencyId: string;
  type: 'P1' | 'P2' | 'P3' | 'P4';
  score: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Résultat du calcul CEREDIS
export interface CeredisResult {
  userId: string;
  ceredisScore: number;
  cecrlLevel: 'A2' | 'B1' | 'B2' | 'C1';
  domainScores: Record<string, number>;
  competencyScores: Record<string, CompetencyScore>;
  validation: ValidationResult;
  computedAt: string;
  engineVersion: string;
}

export interface CompetencyScore {
  score: number;
  evidenceCount: number;
  evidenceTypes: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  degradationReason?: string;
}

// Configuration CEREDIS
export interface CeredisConfig {
  version: string;
  scale: { min: number; max: number };
  evidenceWeights: Record<string, number>;
  domains: Record<string, DomainConfig>;
  levels: Record<string, LevelRequirements>;
  cecrlThresholds: Record<string, [number, number]>;
}

export interface DomainConfig {
  name: string;
  weight: number;
  competencies: string[];
  minScore?: number;
}

export interface LevelRequirements {
  minScore: number;
  requiredEvidenceTypes: string[];
  requiredDomains?: Record<string, { minScore: number }>;
}
```

#### Étape 1.3 : Configuration

**Fichier** : `services/ceredis-calculator/config.ts`

```typescript
import type { CeredisConfig } from './types';

export const CEREDIS_CONFIG: CeredisConfig = {
  version: "1.0",
  scale: { min: 0, max: 600 },
  
  evidenceWeights: {
    P1: 0.15,
    P2: 0.30,
    P3: 0.35,
    P4: 0.20
  },

  domains: {
    D1: {
      name: "Compréhension de l'oral (chansons)",
      weight: 0.20,
      competencies: ["1.1", "1.2", "1.3"]
    },
    D2: {
      name: "Compréhension de l'écrit (paroles)",
      weight: 0.20,
      competencies: ["2.1", "2.2", "2.3"]
    },
    D3: {
      name: "Production écrite",
      weight: 0.20,
      competencies: ["3.1", "3.2", "3.3"]
    },
    D4: {
      name: "Interaction et interprétation",
      weight: 0.20,
      competencies: ["4.1", "4.2", "4.3"]
    },
    D5: {
      name: "Métalinguistique et métacognitif",
      weight: 0.20,
      competencies: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7"],
      minScore: 60
    }
  },

  cecrlThresholds: {
    A2: [200, 299],
    B1: [300, 399],
    B2: [400, 499],
    C1: [500, 599]
  },

  levels: {
    B2: {
      minScore: 400,
      requiredEvidenceTypes: ["P3"],
      requiredDomains: { D5: { minScore: 60 } }
    },
    C1: {
      minScore: 500,
      requiredEvidenceTypes: ["P3", "P4"],
      requiredDomains: { D5: { minScore: 70 } }
    }
  }
};
```

#### Étape 1.4 : Porter les modules

**Fichier** : `services/ceredis-calculator/engine/ceredisCalculator.ts`

```typescript
import type { CeredisConfig } from '../types';

/**
 * Calculer le score CEREDIS global (0-600)
 * 
 * Formule : Score = Σ(Score_domaine × Poids_domaine) × 6
 */
export function calculateCeredisScore(
  domainScores: Record<string, number>,
  config: CeredisConfig
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [domainId, score] of Object.entries(domainScores)) {
    const domainConfig = config.domains[domainId];
    
    if (!domainConfig) {
      console.warn(`Unknown domain: ${domainId}`);
      continue;
    }

    const weight = domainConfig.weight;
    weightedSum += score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;

  // Score moyen pondéré (0-100) × 6 = (0-600)
  const averageScore = weightedSum / totalWeight;
  const ceredisScore = averageScore * 6;

  return Math.round(ceredisScore * 100) / 100;
}

export function validateCeredisScore(
  score: number,
  config: CeredisConfig
): boolean {
  return score >= config.scale.min && score <= config.scale.max;
}
```

**Même pattern pour** :
- `evidenceAggregator.ts`
- `competencyCalculator.ts`
- `domainCalculator.ts`
- `cecrlDecider.ts`
- `levelValidator.ts`

#### Étape 1.5 : Point d'entrée

**Fichier** : `services/ceredis-calculator/index.ts`

```typescript
import type { Evidence, CeredisResult } from './types';
import { CEREDIS_CONFIG } from './config';
import { aggregateEvidences } from './engine/evidenceAggregator';
import { calculateCompetencyScores } from './engine/competencyCalculator';
import { calculateDomainScores } from './engine/domainCalculator';
import { calculateCeredisScore } from './engine/ceredisCalculator';
import { decideCecrlLevel } from './engine/cecrlDecider';
import { validateLevel } from './engine/levelValidator';

/**
 * Calculer le score CEREDIS pour un apprenant
 */
export async function computeCeredisScore(
  userId: string,
  evidences: Evidence[]
): Promise<CeredisResult> {
  // 1. Agréger par compétence
  const aggregated = aggregateEvidences(evidences);

  // 2. Calculer scores compétences
  const competencyScores = calculateCompetencyScores(
    aggregated,
    CEREDIS_CONFIG
  );

  // 3. Calculer scores domaines
  const domainScores = calculateDomainScores(
    competencyScores,
    CEREDIS_CONFIG
  );

  // 4. Calculer score CEREDIS global
  const ceredisScore = calculateCeredisScore(domainScores, CEREDIS_CONFIG);

  // 5. Décider niveau CECRL
  const cecrlLevel = decideCecrlLevel(ceredisScore, CEREDIS_CONFIG);

  // 6. Valider règles strictes
  const validation = validateLevel(
    cecrlLevel,
    ceredisScore,
    domainScores,
    evidences,
    CEREDIS_CONFIG
  );

  return {
    userId,
    ceredisScore,
    cecrlLevel: validation.level,
    domainScores,
    competencyScores,
    validation,
    computedAt: new Date().toISOString(),
    engineVersion: CEREDIS_CONFIG.version
  };
}
```

---

### **Phase 2 : API Route Next.js** (1h)

**Fichier** : `app/api/ceredis/calculate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { computeCeredisScore } from '@/services/ceredis-calculator';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      );
    }

    // 1. Récupérer toutes les Evidences depuis PocketBase
    const evidences = await pb.collection('evidences').getFullList({
      filter: `user = "${userId}"`,
      sort: '-created'
    });

    // 2. Calculer le score CEREDIS
    const result = await computeCeredisScore(userId, evidences);

    // 3. Sauvegarder dans PostgreSQL (optionnel)
    // await saveCeredisResult(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('CEREDIS calculation error:', error);
    return NextResponse.json(
      { error: 'Calculation failed' },
      { status: 500 }
    );
  }
}
```

**Endpoint** :
```
POST /api/ceredis/calculate
Body: { "userId": "user123" }

Response:
{
  "userId": "user123",
  "ceredisScore": 412.5,
  "cecrlLevel": "B2",
  "domainScores": {
    "D1": 70.0,
    "D2": 68.0,
    "D3": 65.0,
    "D4": 62.0,
    "D5": 72.0
  },
  "validation": {
    "valid": true,
    "errors": [],
    "warnings": []
  },
  "computedAt": "2026-01-12T10:30:00Z"
}
```

---

### **Phase 3 : Client frontend** (1h)

**Fichier** : `lib/ceredis/client.ts`

```typescript
export async function calculateUserScore(userId: string) {
  const response = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (!response.ok) {
    throw new Error('Failed to calculate score');
  }

  return response.json();
}
```

**Fichier** : `lib/ceredis/hooks.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { calculateUserScore } from './client';

export function useCeredisScore(userId: string) {
  return useQuery({
    queryKey: ['ceredis-score', userId],
    queryFn: () => calculateUserScore(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId
  });
}
```

**Usage dans composants** :

```typescript
import { useCeredisScore } from '@/lib/ceredis/hooks';

export function UserDashboard({ userId }) {
  const { data, isLoading } = useCeredisScore(userId);

  if (isLoading) return <div>Calcul en cours...</div>;

  return (
    <div>
      <h1>Score CEREDIS : {data.ceredisScore}/600</h1>
      <p>Niveau : {data.cecrlLevel}</p>
    </div>
  );
}
```

---

### **Phase 4 : PostgreSQL persistence** (1h)

**Fichier** : `services/ceredis-calculator/persistence.ts`

```typescript
import { sql } from '@vercel/postgres';
import type { CeredisResult } from './types';

export async function saveCeredisResult(result: CeredisResult) {
  // 1. Sauvegarder résultat principal
  const { rows } = await sql`
    INSERT INTO ceredis_results (
      user_id, 
      ceredis_score, 
      cecrl_level, 
      computed_at, 
      engine_version
    )
    VALUES (
      ${result.userId}, 
      ${result.ceredisScore}, 
      ${result.cecrlLevel}, 
      ${result.computedAt}, 
      ${result.engineVersion}
    )
    RETURNING id
  `;

  const resultId = rows[0].id;

  // 2. Sauvegarder scores domaines
  for (const [domainId, score] of Object.entries(result.domainScores)) {
    await sql`
      INSERT INTO ceredis_domain_scores (result_id, domain_id, score)
      VALUES (${resultId}, ${domainId}, ${score})
    `;
  }

  // 3. Sauvegarder scores compétences
  for (const [compId, data] of Object.entries(result.competencyScores)) {
    await sql`
      INSERT INTO ceredis_competency_scores (
        result_id, 
        competency_id, 
        score, 
        evidence_count, 
        evidence_types
      )
      VALUES (
        ${resultId}, 
        ${compId}, 
        ${data.score}, 
        ${data.evidenceCount}, 
        ${data.evidenceTypes}
      )
    `;
  }

  return resultId;
}
```

---

### **Phase 5 : Tests** (2h)

**Fichier** : `services/ceredis-calculator/__tests__/calculator.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../index';

describe('CEREDIS Calculator', () => {
  it('should calculate A2 level correctly', async () => {
    const evidences = [
      { 
        id: '1', 
        userId: 'test', 
        competencyId: '1.1', 
        type: 'P1', 
        score: 50,
        timestamp: new Date().toISOString()
      }
    ];

    const result = await computeCeredisScore('test', evidences);

    expect(result.ceredisScore).toBeGreaterThanOrEqual(200);
    expect(result.ceredisScore).toBeLessThan(300);
    expect(result.cecrlLevel).toBe('A2');
  });

  // Tests pour B1, B2, C1...
});
```

---

## 📊 ORDRE D'IMPLÉMENTATION

### Semaine 1 (Immédiat)

1. **Jour 1** : Phase 1 - Porter moteur en TypeScript
2. **Jour 2** : Phase 2 - API Route
3. **Jour 3** : Phase 3 - Client frontend
4. **Jour 4** : Phase 4 - PostgreSQL
5. **Jour 5** : Phase 5 - Tests

### Semaine 2 (Optimisations)

1. **Cache Redis** pour résultats
2. **Batch calculation** pour classes
3. **Dashboard temps réel**
4. **Export rapports**

---

## ✅ CRITÈRES DE SUCCÈS

- [ ] Moteur porté en TypeScript
- [ ] API Route fonctionnelle
- [ ] Client frontend utilisable
- [ ] PostgreSQL persistence
- [ ] Tests passent (100%)
- [ ] Documentation complète
- [ ] Performances < 500ms
- [ ] Cache opérationnel

---

## 🚀 AVANTAGES

### Architecture cohérente
- ✅ Tout dans Next.js
- ✅ TypeScript type-safe
- ✅ API REST exposée
- ✅ Réutilisable partout

### Performances
- ✅ Pas de requête externe
- ✅ Cache possible
- ✅ Edge-ready

### Maintenance
- ✅ Code centralisé
- ✅ Tests intégrés
- ✅ Déploiement unique

---

## 📚 RESSOURCES

### Code source moteur
- Archive : `/mnt/user-data/outputs/ceredis-engine-v1.0.tar.gz`
- README : Voir archive
- Tests : `tests/validation.test.js`

### Documentation
- CEREDIS spec : Phase B complète
- Types unifiés : Phase D1
- API integration : Phase D1

---

**Date création** : 2026-01-12  
**Version** : 1.0  
**Prêt pour implémentation** ✅
