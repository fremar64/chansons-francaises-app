# 🚀 PROMPT MAÎTRE - Intégration Moteur CEREDIS dans Next.js

**Pour**: GitHub Copilot  
**Date**: 26 janvier 2026  
**Objectif**: Porter et intégrer le moteur de calcul CEREDIS dans l'application Next.js

---

## 📋 TABLE DES MATIÈRES

1. [Contexte du Projet](#contexte)
2. [État Actuel](#etat-actuel)
3. [Objectif Final](#objectif)
4. [Architecture Cible](#architecture)
5. [Moteur Existant (Source)](#moteur-source)
6. [Plan d'Implémentation](#plan)
7. [Code à Générer](#code)
8. [Tests & Validation](#tests)
9. [Checklist Finale](#checklist)

---

## 📖 CONTEXTE DU PROJET {#contexte}

### Projet
**Application d'apprentissage du français par les chansons**

### Stack technique
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: PocketBase (déployé sur Coolify)
- **Base de données**: PostgreSQL (pour persistence CEREDIS)
- **Déploiement**: Vercel

### Système CEREDIS
**CEREDIS** = Centre de Ressources Didactiques et Scolaires

**Objectif**: Évaluer les compétences linguistiques des apprenants sur une échelle de 0-600 avec attribution d'un niveau CECRL (A2-C1).

**Composants du système**:
1. **19 compétences** réparties en 5 domaines
2. **4 types de preuves** (P1, P2, P3, P4) avec pondérations différentes
3. **5 domaines** (D1-D5) avec règles spécifiques
4. **Règles de validation strictes** pour B2 et C1

---

## 🎯 ÉTAT ACTUEL {#etat-actuel}

### ✅ Ce qui existe

#### 1. Moteur CEREDIS standalone (JavaScript)
**Location**: Archive `/mnt/user-data/outputs/ceredis-engine-v1.0.tar.gz`

**Modules** (6 fichiers JavaScript):
- `evidenceAggregator.js` - Agrège les preuves par compétence
- `competencyCalculator.js` - Calcule scores par compétence
- `domainCalculator.js` - Calcule scores par domaine (D1-D5)
- `ceredisCalculator.js` - Calcule score global (0-600)
- `cecrlDecider.js` - Décide du niveau CECRL (A2-C1)
- `levelValidator.js` - Valide les règles strictes B2/C1

**Configuration**:
- `config/ceredis.v1.json` - Configuration complète (19 compétences, 5 domaines, règles)

#### 2. Collections PocketBase
- ✅ **users** - Utilisateurs authentifiés
- ✅ **progression** - Progressions des séances
- ✅ **evidences** - Preuves d'apprentissage (à créer)

#### 3. Application Next.js
- ✅ Authentification PocketBase fonctionnelle
- ✅ Dashboard avec composants (RadarCompetences, HistoriqueActivites, ProgressionGlobale)
- ✅ Hook `useDashboard()` qui charge les données
- ✅ Types CEREDIS harmonisés dans `types/ceredis.ts`

### ❌ Ce qui manque

1. **Moteur CEREDIS en TypeScript** dans Next.js
2. **API Route** `/api/ceredis/calculate` pour calculer les scores
3. **Persistence PostgreSQL** pour sauvegarder les résultats
4. **Intégration automatique** après complétion d'activité
5. **Hook React** `useCeredisScore()` pour le frontend

---

## 🎯 OBJECTIF FINAL {#objectif}

### Vision
Intégrer le moteur CEREDIS dans Next.js pour :
1. Calculer automatiquement les scores après chaque activité
2. Fournir une API REST pour calculer les scores à la demande
3. Afficher les résultats précis dans le dashboard
4. Sauvegarder les résultats dans PostgreSQL

### Critères de succès
- ✅ Moteur porté en TypeScript (100% type-safe)
- ✅ API Route fonctionnelle et testée
- ✅ Calculs identiques au moteur JavaScript original
- ✅ Hook React utilisable dans les composants
- ✅ Dashboard affiche les scores réels (pas estimés)
- ✅ Tests unitaires passent (100%)

---

## 🏗️ ARCHITECTURE CIBLE {#architecture}

### Structure des dossiers

```
chansons-francaises-app/
├── services/
│   └── ceredis-calculator/           [NOUVEAU]
│       ├── engine/
│       │   ├── evidenceAggregator.ts      ← Porter JS → TS
│       │   ├── competencyCalculator.ts    ← Porter JS → TS
│       │   ├── domainCalculator.ts        ← Porter JS → TS
│       │   ├── ceredisCalculator.ts       ← Porter JS → TS
│       │   ├── cecrlDecider.ts            ← Porter JS → TS
│       │   └── levelValidator.ts          ← Porter JS → TS
│       ├── config.ts                      ← Configuration CEREDIS
│       ├── types.ts                       ← Types TypeScript
│       ├── index.ts                       ← Point d'entrée principal
│       └── persistence.ts                 ← PostgreSQL persistence
│
├── app/
│   └── api/
│       └── ceredis/
│           └── calculate/
│               └── route.ts               [NOUVEAU] ← API Route
│
└── lib/
    └── ceredis/                           [NOUVEAU]
        ├── client.ts                      ← Helper frontend
        └── hooks.ts                       ← React hooks
```

### Flux de données

```
1. Utilisateur complète une activité
   ↓
2. Service unifié crée Evidences dans PocketBase
   ↓
3. [AUTOMATIQUE] Trigger calcul CEREDIS
   ↓
4. Moteur CEREDIS (services/ceredis-calculator)
   ├─→ Agrège evidences
   ├─→ Calcule scores compétences
   ├─→ Calcule scores domaines
   ├─→ Calcule score global (0-600)
   ├─→ Décide niveau CECRL
   └─→ Valide règles B2/C1
   ↓
5. Sauvegarde dans PostgreSQL
   ↓
6. Retour au frontend
   ↓
7. Dashboard mis à jour (hook useCeredisScore)
```

---

## 📦 MOTEUR EXISTANT - CODE SOURCE {#moteur-source}

### Configuration CEREDIS (ceredis.v1.json)

```json
{
  "version": "1.0",
  "scale": {
    "min": 0,
    "max": 600
  },
  "evidenceWeights": {
    "P1": 0.15,
    "P2": 0.30,
    "P3": 0.35,
    "P4": 0.20
  },
  "domains": {
    "D1": {
      "name": "Compréhension de l'oral (chansons)",
      "weight": 0.20,
      "competencies": ["1.1", "1.2", "1.3"]
    },
    "D2": {
      "name": "Compréhension de l'écrit (paroles)",
      "weight": 0.20,
      "competencies": ["2.1", "2.2", "2.3"]
    },
    "D3": {
      "name": "Production écrite",
      "weight": 0.20,
      "competencies": ["3.1", "3.2", "3.3"]
    },
    "D4": {
      "name": "Interaction et interprétation",
      "weight": 0.20,
      "competencies": ["4.1", "4.2", "4.3"]
    },
    "D5": {
      "name": "Métalinguistique et métacognitif",
      "weight": 0.20,
      "competencies": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7"],
      "minScore": 60
    }
  },
  "cecrlThresholds": {
    "A2": [200, 299],
    "B1": [300, 399],
    "B2": [400, 499],
    "C1": [500, 599]
  },
  "levels": {
    "B2": {
      "minScore": 400,
      "requiredEvidenceTypes": ["P3"],
      "requiredDomains": {
        "D5": { "minScore": 60 }
      }
    },
    "C1": {
      "minScore": 500,
      "requiredEvidenceTypes": ["P3", "P4"],
      "requiredDomains": {
        "D5": { "minScore": 70 }
      }
    }
  }
}
```

### Module 1: evidenceAggregator.js

```javascript
/**
 * Agrège les preuves par compétence
 * Groupe toutes les evidences d'un utilisateur par competency_id
 */
function aggregateEvidences(evidences) {
  const aggregated = {};
  
  evidences.forEach(evidence => {
    const compId = evidence.competency_id;
    
    if (!aggregated[compId]) {
      aggregated[compId] = [];
    }
    
    aggregated[compId].push({
      type: evidence.evidence_type,
      score: evidence.score,
      timestamp: evidence.created
    });
  });
  
  return aggregated;
}

module.exports = { aggregateEvidences };
```

### Module 2: competencyCalculator.js

```javascript
/**
 * Calcule le score pour chaque compétence
 * Applique les pondérations P1, P2, P3, P4
 */
function calculateCompetencyScores(aggregatedEvidences, config) {
  const scores = {};
  
  Object.entries(aggregatedEvidences).forEach(([compId, evidences]) => {
    let weightedSum = 0;
    let totalWeight = 0;
    
    evidences.forEach(evidence => {
      const weight = config.evidenceWeights[evidence.type];
      weightedSum += evidence.score * weight;
      totalWeight += weight;
    });
    
    scores[compId] = {
      score: totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0,
      evidenceCount: evidences.length,
      evidenceTypes: [...new Set(evidences.map(e => e.type))]
    };
  });
  
  return scores;
}

module.exports = { calculateCompetencyScores };
```

### Module 3: domainCalculator.js

```javascript
/**
 * Calcule le score pour chaque domaine (D1-D5)
 * Moyenne des scores des compétences du domaine
 */
function calculateDomainScores(competencyScores, config) {
  const domainScores = {};
  
  Object.entries(config.domains).forEach(([domainId, domainConfig]) => {
    const compIds = domainConfig.competencies;
    const scores = compIds
      .map(compId => competencyScores[compId]?.score || 0)
      .filter(score => score > 0);
    
    if (scores.length > 0) {
      domainScores[domainId] = Math.round(
        (scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100
      ) / 100;
    } else {
      domainScores[domainId] = 0;
    }
  });
  
  return domainScores;
}

module.exports = { calculateDomainScores };
```

### Module 4: ceredisCalculator.js

```javascript
/**
 * Calcule le score CEREDIS global (0-600)
 * Formule : Σ(Score_domaine × Poids_domaine) × 6
 */
function calculateCeredisScore(domainScores, config) {
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(domainScores).forEach(([domainId, score]) => {
    const domain = config.domains[domainId];
    if (domain) {
      weightedSum += score * domain.weight;
      totalWeight += domain.weight;
    }
  });
  
  if (totalWeight === 0) return 0;
  
  const averageScore = weightedSum / totalWeight;
  const ceredisScore = averageScore * 6;
  
  return Math.round(ceredisScore * 100) / 100;
}

module.exports = { calculateCeredisScore };
```

### Module 5: cecrlDecider.js

```javascript
/**
 * Décide du niveau CECRL basé sur le score CEREDIS
 * A2: 200-299, B1: 300-399, B2: 400-499, C1: 500-599
 */
function decideCecrlLevel(ceredisScore, config) {
  for (const [level, [min, max]] of Object.entries(config.cecrlThresholds)) {
    if (ceredisScore >= min && ceredisScore <= max) {
      return level;
    }
  }
  
  if (ceredisScore < 200) return 'A1';
  if (ceredisScore >= 600) return 'C2';
  
  return 'A2';
}

module.exports = { decideCecrlLevel };
```

### Module 6: levelValidator.js

```javascript
/**
 * Valide les règles strictes pour B2 et C1
 * B2 : Requiert P3 + D5 ≥ 60%
 * C1 : Requiert P3 + P4 + D5 ≥ 70%
 */
function validateLevel(cecrlLevel, ceredisScore, domainScores, evidences, config) {
  const validation = {
    level: cecrlLevel,
    valid: true,
    errors: [],
    warnings: [],
    degradationReason: null
  };
  
  // Pas de validation pour A1, A2, B1
  if (!['B2', 'C1'].includes(cecrlLevel)) {
    return validation;
  }
  
  const levelConfig = config.levels[cecrlLevel];
  
  // 1. Vérifier le score minimum
  if (ceredisScore < levelConfig.minScore) {
    validation.valid = false;
    validation.errors.push(`Score insuffisant pour ${cecrlLevel}`);
    return validation;
  }
  
  // 2. Vérifier les types de preuves requis
  const evidenceTypes = [...new Set(evidences.map(e => e.evidence_type))];
  const missingTypes = levelConfig.requiredEvidenceTypes.filter(
    type => !evidenceTypes.includes(type)
  );
  
  if (missingTypes.length > 0) {
    validation.valid = false;
    validation.errors.push(
      `Types de preuves manquants pour ${cecrlLevel}: ${missingTypes.join(', ')}`
    );
    validation.degradationReason = `Manque ${missingTypes.join(', ')}`;
    
    // Dégrader au niveau inférieur
    validation.level = cecrlLevel === 'C1' ? 'B2' : 'B1';
  }
  
  // 3. Vérifier les scores minimum par domaine
  if (levelConfig.requiredDomains) {
    Object.entries(levelConfig.requiredDomains).forEach(([domainId, requirements]) => {
      const domainScore = domainScores[domainId] || 0;
      
      if (domainScore < requirements.minScore) {
        validation.valid = false;
        validation.errors.push(
          `${domainId} insuffisant pour ${cecrlLevel}: ${domainScore}% < ${requirements.minScore}%`
        );
        validation.degradationReason = `${domainId} < ${requirements.minScore}%`;
        
        // Dégrader
        validation.level = cecrlLevel === 'C1' ? 'B2' : 'B1';
      }
    });
  }
  
  return validation;
}

module.exports = { validateLevel };
```

---

## 📝 PLAN D'IMPLÉMENTATION {#plan}

### Phase 1: Types TypeScript (30min)

**Fichier**: `services/ceredis-calculator/types.ts`

```typescript
// Types pour les preuves (Evidences)
export interface Evidence {
  id: string;
  user: string;
  competency_id: string;
  evidence_type: 'P1' | 'P2' | 'P3' | 'P4';
  score: number;
  created: string;
  activity_type?: string;
  seance_id?: string;
  parcours?: string;
  metadata?: Record<string, any>;
}

// Résultat agrégé par compétence
export interface AggregatedEvidence {
  type: 'P1' | 'P2' | 'P3' | 'P4';
  score: number;
  timestamp: string;
}

export type AggregatedEvidences = Record<string, AggregatedEvidence[]>;

// Score par compétence
export interface CompetencyScore {
  score: number;
  evidenceCount: number;
  evidenceTypes: string[];
}

export type CompetencyScores = Record<string, CompetencyScore>;

// Scores par domaine
export type DomainScores = Record<string, number>;

// Résultat de validation
export interface ValidationResult {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  valid: boolean;
  errors: string[];
  warnings: string[];
  degradationReason?: string;
}

// Résultat complet du calcul CEREDIS
export interface CeredisResult {
  userId: string;
  ceredisScore: number;
  cecrlLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  domainScores: DomainScores;
  competencyScores: CompetencyScores;
  validation: ValidationResult;
  computedAt: string;
  engineVersion: string;
}

// Configuration CEREDIS
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

export interface CeredisConfig {
  version: string;
  scale: { min: number; max: number };
  evidenceWeights: Record<string, number>;
  domains: Record<string, DomainConfig>;
  cecrlThresholds: Record<string, [number, number]>;
  levels: Record<string, LevelRequirements>;
}
```

### Phase 2: Configuration (15min)

**Fichier**: `services/ceredis-calculator/config.ts`

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

### Phase 3: Modules du moteur (2h)

**À générer** : Porter chaque module JS → TS

1. `services/ceredis-calculator/engine/evidenceAggregator.ts`
2. `services/ceredis-calculator/engine/competencyCalculator.ts`
3. `services/ceredis-calculator/engine/domainCalculator.ts`
4. `services/ceredis-calculator/engine/ceredisCalculator.ts`
5. `services/ceredis-calculator/engine/cecrlDecider.ts`
6. `services/ceredis-calculator/engine/levelValidator.ts`

**Instructions pour Copilot** :
- Convertir le JavaScript en TypeScript
- Ajouter les types stricts partout
- Garder la même logique exacte
- Ajouter JSDoc pour la documentation
- Export nommé (pas de default)

### Phase 4: Point d'entrée (30min)

**Fichier**: `services/ceredis-calculator/index.ts`

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
 * 
 * @param userId - ID de l'utilisateur
 * @param evidences - Liste des preuves d'apprentissage
 * @returns Résultat complet du calcul CEREDIS
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

// Export de la config pour tests
export { CEREDIS_CONFIG } from './config';
export * from './types';
```

### Phase 5: API Route (1h)

**Fichier**: `app/api/ceredis/calculate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { computeCeredisScore } from '@/services/ceredis-calculator';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

/**
 * POST /api/ceredis/calculate
 * Calcule le score CEREDIS pour un utilisateur
 * 
 * Body: { userId: string }
 * Returns: CeredisResult
 */
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

    if (evidences.length === 0) {
      return NextResponse.json(
        { 
          error: 'No evidences found',
          message: 'User has no learning evidences yet'
        },
        { status: 404 }
      );
    }

    // 2. Calculer le score CEREDIS
    const result = await computeCeredisScore(userId, evidences as any);

    // 3. TODO: Sauvegarder dans PostgreSQL
    // await saveCeredisResult(result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('CEREDIS calculation error:', error);
    return NextResponse.json(
      { 
        error: 'Calculation failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ceredis/calculate?userId=xxx
 * Alternative GET endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter required' },
        { status: 400 }
      );
    }

    // Même logique que POST
    const evidences = await pb.collection('evidences').getFullList({
      filter: `user = "${userId}"`,
      sort: '-created'
    });

    if (evidences.length === 0) {
      return NextResponse.json(
        { 
          error: 'No evidences found',
          message: 'User has no learning evidences yet'
        },
        { status: 404 }
      );
    }

    const result = await computeCeredisScore(userId, evidences as any);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('CEREDIS calculation error:', error);
    return NextResponse.json(
      { 
        error: 'Calculation failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
```

### Phase 6: Client Frontend (30min)

**Fichier**: `lib/ceredis/client.ts`

```typescript
import type { CeredisResult } from '@/services/ceredis-calculator/types';

/**
 * Calculer le score CEREDIS d'un utilisateur
 */
export async function calculateUserScore(userId: string): Promise<CeredisResult> {
  const response = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to calculate score');
  }

  return response.json();
}
```

**Fichier**: `lib/ceredis/hooks.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { calculateUserScore } from './client';

/**
 * Hook pour charger le score CEREDIS d'un utilisateur
 * 
 * @example
 * const { data, isLoading, error } = useCeredisScore(userId);
 */
export function useCeredisScore(userId: string) {
  return useQuery({
    queryKey: ['ceredis-score', userId],
    queryFn: () => calculateUserScore(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
    retry: 1
  });
}
```

### Phase 7: PostgreSQL Persistence (1h)

**Fichier**: `services/ceredis-calculator/persistence.ts`

```typescript
import { sql } from '@vercel/postgres';
import type { CeredisResult } from './types';

/**
 * Sauvegarder le résultat CEREDIS dans PostgreSQL
 */
export async function saveCeredisResult(result: CeredisResult): Promise<string> {
  // 1. Sauvegarder résultat principal
  const { rows } = await sql`
    INSERT INTO ceredis_results (
      user_id, 
      ceredis_score, 
      cecrl_level, 
      computed_at, 
      engine_version,
      validation_valid,
      validation_errors
    )
    VALUES (
      ${result.userId}, 
      ${result.ceredisScore}, 
      ${result.cecrlLevel}, 
      ${result.computedAt}, 
      ${result.engineVersion},
      ${result.validation.valid},
      ${JSON.stringify(result.validation.errors)}
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
        ${JSON.stringify(data.evidenceTypes)}
      )
    `;
  }

  return resultId;
}

/**
 * Récupérer le dernier résultat CEREDIS d'un utilisateur
 */
export async function getLatestCeredisResult(userId: string): Promise<CeredisResult | null> {
  const { rows } = await sql`
    SELECT * FROM ceredis_results
    WHERE user_id = ${userId}
    ORDER BY computed_at DESC
    LIMIT 1
  `;

  if (rows.length === 0) return null;

  const row = rows[0];

  // Charger scores domaines
  const { rows: domainRows } = await sql`
    SELECT domain_id, score FROM ceredis_domain_scores
    WHERE result_id = ${row.id}
  `;

  const domainScores = Object.fromEntries(
    domainRows.map(r => [r.domain_id, r.score])
  );

  // Charger scores compétences
  const { rows: compRows } = await sql`
    SELECT competency_id, score, evidence_count, evidence_types
    FROM ceredis_competency_scores
    WHERE result_id = ${row.id}
  `;

  const competencyScores = Object.fromEntries(
    compRows.map(r => [
      r.competency_id,
      {
        score: r.score,
        evidenceCount: r.evidence_count,
        evidenceTypes: JSON.parse(r.evidence_types)
      }
    ])
  );

  return {
    userId: row.user_id,
    ceredisScore: row.ceredis_score,
    cecrlLevel: row.cecrl_level,
    domainScores,
    competencyScores,
    validation: {
      level: row.cecrl_level,
      valid: row.validation_valid,
      errors: JSON.parse(row.validation_errors || '[]'),
      warnings: [],
      degradationReason: row.degradation_reason
    },
    computedAt: row.computed_at,
    engineVersion: row.engine_version
  };
}
```

### Phase 8: Migrations PostgreSQL (30min)

**Fichier**: `scripts/migrations/001_create_ceredis_tables.sql`

```sql
-- Table principale des résultats CEREDIS
CREATE TABLE IF NOT EXISTS ceredis_results (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  ceredis_score DECIMAL(5,2) NOT NULL,
  cecrl_level VARCHAR(2) NOT NULL,
  computed_at TIMESTAMP NOT NULL,
  engine_version VARCHAR(10) NOT NULL,
  validation_valid BOOLEAN NOT NULL,
  validation_errors JSONB DEFAULT '[]',
  degradation_reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_computed (user_id, computed_at DESC)
);

-- Table des scores par domaine
CREATE TABLE IF NOT EXISTS ceredis_domain_scores (
  id SERIAL PRIMARY KEY,
  result_id INTEGER NOT NULL REFERENCES ceredis_results(id) ON DELETE CASCADE,
  domain_id VARCHAR(2) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_result_domain (result_id, domain_id)
);

-- Table des scores par compétence
CREATE TABLE IF NOT EXISTS ceredis_competency_scores (
  id SERIAL PRIMARY KEY,
  result_id INTEGER NOT NULL REFERENCES ceredis_results(id) ON DELETE CASCADE,
  competency_id VARCHAR(10) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  evidence_count INTEGER NOT NULL,
  evidence_types JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_result_comp (result_id, competency_id)
);

-- Indexes pour performance
CREATE INDEX idx_ceredis_user_latest ON ceredis_results(user_id, computed_at DESC);
CREATE INDEX idx_domains_result ON ceredis_domain_scores(result_id);
CREATE INDEX idx_competencies_result ON ceredis_competency_scores(result_id);
```

---

## 🧪 TESTS & VALIDATION {#tests}

### Tests unitaires

**Fichier**: `services/ceredis-calculator/__tests__/calculator.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../index';
import type { Evidence } from '../types';

describe('CEREDIS Calculator', () => {
  // Test données minimales (niveau A2)
  it('should calculate A2 level correctly', async () => {
    const evidences: Evidence[] = [
      {
        id: '1',
        user: 'test-user',
        competency_id: '1.1',
        evidence_type: 'P1',
        score: 50,
        created: new Date().toISOString()
      }
    ];

    const result = await computeCeredisScore('test-user', evidences);

    expect(result.ceredisScore).toBeGreaterThanOrEqual(0);
    expect(result.ceredisScore).toBeLessThan(300);
    expect(result.cecrlLevel).toBe('A2');
    expect(result.validation.valid).toBe(true);
  });

  // Test niveau B2 avec règles strictes
  it('should calculate B2 level with validation', async () => {
    const evidences: Evidence[] = [
      // Preuves pour toutes les compétences
      ...['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '4.1', '4.2', '4.3'].map((compId, i) => ({
        id: `${i}`,
        user: 'test-user',
        competency_id: compId,
        evidence_type: 'P3' as const,
        score: 70,
        created: new Date().toISOString()
      })),
      // Domaine 5 avec score ≥ 60%
      ...['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'].map((compId, i) => ({
        id: `d5-${i}`,
        user: 'test-user',
        competency_id: compId,
        evidence_type: 'P3' as const,
        score: 65,
        created: new Date().toISOString()
      }))
    ];

    const result = await computeCeredisScore('test-user', evidences);

    expect(result.ceredisScore).toBeGreaterThanOrEqual(400);
    expect(result.cecrlLevel).toBe('B2');
    expect(result.validation.valid).toBe(true);
    expect(result.domainScores.D5).toBeGreaterThanOrEqual(60);
  });

  // Test dégradation B2 → B1 (manque P3)
  it('should degrade B2 to B1 if missing P3', async () => {
    const evidences: Evidence[] = [
      ...['1.1', '1.2', '1.3', '2.1', '2.2', '2.3'].map((compId, i) => ({
        id: `${i}`,
        user: 'test-user',
        competency_id: compId,
        evidence_type: 'P2' as const, // Seulement P2, pas de P3
        score: 70,
        created: new Date().toISOString()
      }))
    ];

    const result = await computeCeredisScore('test-user', evidences);

    // Score pourrait être dans le range B2 mais niveau dégradé
    if (result.ceredisScore >= 400) {
      expect(result.validation.valid).toBe(false);
      expect(result.cecrlLevel).toBe('B1');
      expect(result.validation.errors.length).toBeGreaterThan(0);
    }
  });

  // Test calcul scores domaines
  it('should calculate domain scores correctly', async () => {
    const evidences: Evidence[] = [
      { id: '1', user: 'test', competency_id: '1.1', evidence_type: 'P2', score: 80, created: '' },
      { id: '2', user: 'test', competency_id: '1.2', evidence_type: 'P2', score: 70, created: '' },
      { id: '3', user: 'test', competency_id: '1.3', evidence_type: 'P2', score: 90, created: '' }
    ];

    const result = await computeCeredisScore('test', evidences);

    // Domaine 1 devrait être la moyenne : (80+70+90)/3 = 80
    expect(result.domainScores.D1).toBeCloseTo(80, 1);
  });
});
```

### Tests d'intégration

**Fichier**: `__tests__/integration/ceredis-api.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('CEREDIS API Integration', () => {
  it('should calculate score via API', async () => {
    const response = await fetch('http://localhost:3000/api/ceredis/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'test-user-with-evidences' })
    });

    expect(response.status).toBe(200);
    
    const result = await response.json();
    
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('ceredisScore');
    expect(result).toHaveProperty('cecrlLevel');
    expect(result).toHaveProperty('domainScores');
    expect(result).toHaveProperty('competencyScores');
    expect(result).toHaveProperty('validation');
  });

  it('should return 404 if no evidences', async () => {
    const response = await fetch('http://localhost:3000/api/ceredis/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user-without-evidences' })
    });

    expect(response.status).toBe(404);
  });
});
```

---

## ✅ CHECKLIST FINALE {#checklist}

### Phase 1: Types & Config
- [ ] `services/ceredis-calculator/types.ts` créé avec tous les types
- [ ] `services/ceredis-calculator/config.ts` créé avec CEREDIS_CONFIG
- [ ] Tous les types exportés depuis `types.ts`
- [ ] Configuration validée (19 compétences, 5 domaines)

### Phase 2: Modules Engine
- [ ] `engine/evidenceAggregator.ts` porté en TypeScript
- [ ] `engine/competencyCalculator.ts` porté en TypeScript
- [ ] `engine/domainCalculator.ts` porté en TypeScript
- [ ] `engine/ceredisCalculator.ts` porté en TypeScript
- [ ] `engine/cecrlDecider.ts` porté en TypeScript
- [ ] `engine/levelValidator.ts` porté en TypeScript
- [ ] Tous les modules typés strictement (pas de `any`)
- [ ] JSDoc ajoutée sur toutes les fonctions

### Phase 3: Point d'entrée
- [ ] `services/ceredis-calculator/index.ts` créé
- [ ] Fonction `computeCeredisScore()` implémentée
- [ ] Pipeline complet : agrégation → calcul → validation
- [ ] Exports corrects (types + fonctions)

### Phase 4: API Route
- [ ] `app/api/ceredis/calculate/route.ts` créé
- [ ] Endpoint POST fonctionnel
- [ ] Endpoint GET fonctionnel (optionnel)
- [ ] Connexion PocketBase pour charger evidences
- [ ] Gestion d'erreurs (400, 404, 500)
- [ ] Retour JSON correct

### Phase 5: Client Frontend
- [ ] `lib/ceredis/client.ts` créé
- [ ] Fonction `calculateUserScore()` implémentée
- [ ] `lib/ceredis/hooks.ts` créé
- [ ] Hook `useCeredisScore()` avec React Query
- [ ] Cache configuré (5min staleTime)

### Phase 6: PostgreSQL
- [ ] `services/ceredis-calculator/persistence.ts` créé
- [ ] Fonction `saveCeredisResult()` implémentée
- [ ] Fonction `getLatestCeredisResult()` implémentée
- [ ] Migrations SQL créées (`001_create_ceredis_tables.sql`)
- [ ] Tables créées dans PostgreSQL
- [ ] Indexes ajoutés pour performance

### Phase 7: Tests
- [ ] Tests unitaires créés (`calculator.test.ts`)
- [ ] Test A2 passant
- [ ] Test B2 passant
- [ ] Test C1 passant
- [ ] Test dégradation passant
- [ ] Tests d'intégration API créés
- [ ] Tous les tests passent (100%)

### Phase 8: Intégration Dashboard
- [ ] `hooks/useDashboard.ts` modifié pour utiliser vraie API
- [ ] Dashboard affiche scores CEREDIS réels
- [ ] Graphique radar avec vraies données
- [ ] Niveau CECRL affiché correctement

### Phase 9: Documentation
- [ ] README.md créé dans `services/ceredis-calculator/`
- [ ] Exemples d'utilisation ajoutés
- [ ] Documentation API complète
- [ ] Guide de déploiement

### Phase 10: Validation finale
- [ ] Calculs identiques au moteur JS original
- [ ] Pas de régression sur les tests
- [ ] Performance < 500ms par calcul
- [ ] Code type-safe (pas d'erreurs TypeScript)
- [ ] Pas de console.log en production
- [ ] Code reviewed et validé

---

## 🎯 CONSIGNES POUR GITHUB COPILOT

### Général
- **Langage** : TypeScript strict (mode strict activé)
- **Style** : Code propre, bien commenté, type-safe
- **Pas de `any`** : Toujours typer correctement
- **Exports** : Exports nommés (pas de default)
- **JSDoc** : Sur toutes les fonctions publiques

### Logique métier
- **Porter fidèlement** : La logique JS doit être identique en TS
- **Pas de simplification** : Garder toutes les vérifications
- **Tests** : Valider que les résultats sont identiques

### Performance
- **Pas de boucles inutiles** : Optimiser les calculs
- **Cache** : Utiliser React Query pour le cache côté client
- **Batch operations** : Pour PostgreSQL si nécessaire

### Sécurité
- **Validation des entrées** : Toujours valider userId, evidences
- **Gestion d'erreurs** : Try/catch partout avec messages clairs
- **Pas de logs sensibles** : Ne jamais logger des données utilisateur

### Code quality
- **Fonctions pures** : Autant que possible
- **Immutabilité** : Pas de mutation des paramètres
- **Lisibilité** : Noms de variables explicites
- **Modularité** : Chaque module fait une chose bien

---

## 📚 RESSOURCES

### Documentation
- **Next.js API Routes** : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **PocketBase JS SDK** : https://pocketbase.io/docs/client-side-integration
- **React Query** : https://tanstack.com/query/latest/docs/framework/react/overview
- **Vercel Postgres** : https://vercel.com/docs/storage/vercel-postgres

### Fichiers de référence
- **Types CEREDIS** : `types/ceredis.ts` (déjà existant)
- **Service unifié** : `services/integration-unified/` (exemple d'architecture)
- **Hook dashboard** : `hooks/useDashboard.ts` (exemple de hook)

---

## 🚀 COMMANDES DE DÉVELOPPEMENT

```bash
# Installation des dépendances
npm install @vercel/postgres

# Lancer les tests
npm run test

# Lancer les tests en watch mode
npm run test:watch

# Type checking
npm run type-check

# Build production
npm run build

# Lancer le serveur
npm run dev
```

---

## 🎯 CRITÈRES DE SUCCÈS

### Fonctionnel
✅ API `/api/ceredis/calculate` retourne un résultat valide  
✅ Hook `useCeredisScore()` charge les données  
✅ Dashboard affiche le score CEREDIS réel  
✅ Niveau CECRL correct avec règles de validation  
✅ Scores par domaine calculés correctement  

### Technique
✅ 100% TypeScript (pas de `any`)  
✅ Tous les tests passent  
✅ Pas d'erreurs de compilation  
✅ Performance < 500ms  
✅ Code documenté (JSDoc)  

### Qualité
✅ Code review passé  
✅ Pas de duplication de code  
✅ Gestion d'erreurs complète  
✅ Logs appropriés (sans données sensibles)  
✅ Prêt pour production  

---

**Ce prompt contient TOUT ce dont GitHub Copilot a besoin pour implémenter le moteur CEREDIS.**

**Durée estimée** : 6-8 heures de développement  
**Complexité** : Moyenne (logique existante à porter)  
**Priorité** : Haute (bloque analytics avancées)

---

**FIN DU PROMPT MAÎTRE**
