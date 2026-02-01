# 🚀 PROMPT MAÎTRE - Intégration Moteur CEREDIS dans Next.js

**Objectif** : Porter le moteur de calcul CEREDIS (Phase A) depuis JavaScript standalone vers TypeScript et l'intégrer complètement dans l'application Next.js.

---

## 📋 CONTEXTE PROJET

### Application
- **Framework** : Next.js 15 avec App Router
- **Language** : TypeScript strict
- **Styling** : Tailwind CSS
- **Backend** : PocketBase (https://pocketbase-songs.ceredis.net)
- **Déploiement** : Vercel

### Moteur CEREDIS existant
- **Archive** : `/mnt/user-data/outputs/ceredis-engine-v1.0.tar.gz`
- **Localisation** : JavaScript standalone (6 modules)
- **État** : ✅ Fonctionnel, testé, validé
- **Statut** : ❌ Non intégré dans Next.js

### Ce qui existe déjà
- ✅ Collections PocketBase : users, progression, evidences
- ✅ Service unifié : `services/integration-unified/` (PocketBase + CaSS + xAPI)
- ✅ Types harmonisés : `types/ceredis.ts` (19 compétences, 5 domaines)
- ✅ Dashboard frontend : Graphique radar, historique, progression
- ✅ Hook useDashboard : Charge les données et calcule scores approximatifs

### Ce qui manque (À IMPLÉMENTER)
- ❌ Moteur CEREDIS porté en TypeScript
- ❌ API Route `/api/ceredis/calculate`
- ❌ Client frontend pour appeler l'API
- ❌ Calcul précis du score CEREDIS (0-600)
- ❌ Validation stricte des règles B2/C1
- ❌ Persistence PostgreSQL (optionnel)

---

## 🎯 OBJECTIF DE L'INTÉGRATION

Créer un système complet de calcul CEREDIS qui :

1. **Récupère** les evidences depuis PocketBase
2. **Calcule** le score CEREDIS précis (0-600) avec le moteur
3. **Détermine** le niveau CECRL (A2, B1, B2, C1) avec validation des règles
4. **Retourne** les résultats via API REST
5. **Affiche** dans le dashboard (remplace l'estimation actuelle)
6. **Sauvegarde** dans PostgreSQL pour cache (optionnel)

---

## 📊 ARCHITECTURE CIBLE

```
chansons-francaises-app/
├── services/
│   └── ceredis-calculator/           ← À CRÉER
│       ├── engine/                    ← Porter 6 modules JS → TS
│       │   ├── evidenceAggregator.ts
│       │   ├── competencyCalculator.ts
│       │   ├── domainCalculator.ts
│       │   ├── ceredisCalculator.ts
│       │   ├── cecrlDecider.ts
│       │   └── levelValidator.ts
│       ├── config.ts                  ← Configuration CEREDIS
│       ├── types.ts                   ← Types du moteur
│       ├── index.ts                   ← Point d'entrée
│       └── README.md                  ← Documentation
│
├── app/api/
│   └── ceredis/
│       └── calculate/
│           └── route.ts               ← À CRÉER (API endpoint)
│
└── lib/
    └── ceredis/                       ← À CRÉER
        ├── client.ts                  ← Client HTTP
        └── hooks.ts                   ← React hooks

DÉJÀ EXISTANT (Ne pas modifier) :
├── services/integration-unified/      ✅ Service unifié
├── types/ceredis.ts                   ✅ Types compétences
├── hooks/useDashboard.ts              ✅ Dashboard hook
└── components/dashboard/              ✅ Composants UI
```

---

## 📐 SPÉCIFICATIONS DU MOTEUR CEREDIS

### Système de notation

**Score CEREDIS** : 0 à 600 points
- Calculé à partir des 5 domaines (D1-D5)
- Chaque domaine : 0-100 points
- Formule : `Score = Σ(Score_domaine × Poids_domaine) × 6`

**Niveaux CECRL** :
- **A2** : 200-299 points
- **B1** : 300-399 points
- **B2** : 400-499 points (+ règles strictes)
- **C1** : 500-599 points (+ règles strictes)

### 19 Compétences CEREDIS

**Domaine 1 (D1)** : Compréhension de l'oral (chansons)
- 1.1 : Identifier structures rythmiques et mélodiques
- 1.2 : Saisir sens global chanson
- 1.3 : Percevoir variations phonétiques

**Domaine 2 (D2)** : Compréhension de l'écrit (paroles)
- 2.1 : Comprendre paroles explicites
- 2.2 : Interpréter paroles implicites
- 2.3 : Analyser procédés stylistiques

**Domaine 3 (D3)** : Production écrite
- 3.1 : Rédiger textes descriptifs
- 3.2 : Composer textes narratifs
- 3.3 : Argumenter par écrit

**Domaine 4 (D4)** : Interaction et interprétation
- 4.1 : Interagir autour chansons
- 4.2 : Interpréter textes poétiques
- 4.3 : Adapter registre de langue

**Domaine 5 (D5)** : Métalinguistique et métacognitif
- 5.1 : Analyser structures grammaticales
- 5.2 : Explorer champ lexical
- 5.3 : Identifier figures de style
- 5.4 : Réfléchir stratégies d'apprentissage
- 5.5 : Auto-évaluer performances
- 5.6 : Réguler apprentissage
- 5.7 : Justifier démarches linguistiques

### 4 Types de preuves (Evidences)

**P1** (Poids 0.15) : Reconnaissance
- Identifier, reconnaître, nommer
- QCM simples, repérage

**P2** (Poids 0.30) : Compréhension
- Expliquer, décrire, résumer
- Questions ouvertes courtes

**P3** (Poids 0.35) : Application
- Appliquer, utiliser, transposer
- Exercices pratiques, justifications

**P4** (Poids 0.20) : Création/Analyse
- Créer, analyser, évaluer
- Productions originales, analyses approfondies

### Règles de validation strictes

**Pour B2** (400-499 points) :
- ✅ Score global ≥ 400
- ✅ Au moins 1 preuve P3 dans n'importe quel domaine
- ✅ Domaine 5 (métalinguistique) ≥ 60/100

**Pour C1** (500-599 points) :
- ✅ Score global ≥ 500
- ✅ Au moins 1 preuve P3 ET 1 preuve P4
- ✅ Domaine 5 (métalinguistique) ≥ 70/100

**Si règles non respectées** : Dégradation automatique au niveau inférieur
- B2 non validé → retour à B1
- C1 non validé → retour à B2

---

## 🔧 PHASE 1 : PORTER LE MOTEUR EN TYPESCRIPT

### Étape 1.1 : Types TypeScript

**Fichier** : `services/ceredis-calculator/types.ts`

```typescript
/**
 * Types pour le moteur de calcul CEREDIS
 * 
 * IMPORTANT : Utiliser les types de base depuis types/ceredis.ts
 * pour CompetencyId, DomainId, EvidenceType
 */

import type { CompetencyId, EvidenceType } from '@/types/ceredis';

// Evidence = Preuve d'apprentissage
export interface Evidence {
  id: string;
  userId: string;
  competencyId: CompetencyId;  // Ex: "1.1", "2.3", "5.7"
  evidenceType: EvidenceType;  // P1, P2, P3, P4
  score: number;               // 0-100
  timestamp: string;           // ISO date
  metadata?: {
    activityType?: string;
    seanceId?: string;
    parcours?: string;
    duration?: number;
    [key: string]: any;
  };
}

// Résultat du calcul CEREDIS
export interface CeredisResult {
  userId: string;
  ceredisScore: number;              // 0-600
  cecrlLevel: 'A2' | 'B1' | 'B2' | 'C1';
  domainScores: Record<string, number>;  // D1-D5 : scores 0-100
  competencyScores: Record<CompetencyId, CompetencyScore>;
  validation: ValidationResult;
  computedAt: string;                // ISO timestamp
  engineVersion: string;             // "1.0"
}

// Score détaillé par compétence
export interface CompetencyScore {
  score: number;                     // 0-100
  evidenceCount: number;             // Nombre de preuves
  evidenceTypes: EvidenceType[];     // [P1, P2, P3]
  lastUpdated?: string;              // ISO timestamp
}

// Résultat de validation des règles
export interface ValidationResult {
  valid: boolean;
  level: 'A2' | 'B1' | 'B2' | 'C1';
  originalLevel?: 'A2' | 'B1' | 'B2' | 'C1';
  degraded?: boolean;
  errors: string[];
  warnings: string[];
  degradationReason?: string;
  validationDetails?: {
    hasP3?: boolean;
    hasP4?: boolean;
    domain5Score?: number;
    [key: string]: any;
  };
}

// Configuration CEREDIS
export interface CeredisConfig {
  version: string;
  scale: { min: number; max: number };
  evidenceWeights: Record<EvidenceType, number>;
  domains: Record<string, DomainConfig>;
  cecrlThresholds: Record<string, [number, number]>;
  levels: Record<string, LevelRequirements>;
}

// Configuration d'un domaine
export interface DomainConfig {
  name: string;
  weight: number;                    // Poids dans le calcul global
  competencies: CompetencyId[];      // Liste des compétences
  minScore?: number;                 // Score minimum requis
}

// Règles pour un niveau CECRL
export interface LevelRequirements {
  minScore: number;
  requiredEvidenceTypes: EvidenceType[];
  requiredDomains?: Record<string, { minScore: number }>;
}

// Evidence agrégée par compétence
export interface AggregatedEvidence {
  competencyId: CompetencyId;
  evidences: Evidence[];
  count: number;
  avgScore: number;
  bestScore: number;
  evidenceTypes: Set<EvidenceType>;
}
```

### Étape 1.2 : Configuration

**Fichier** : `services/ceredis-calculator/config.ts`

```typescript
import type { CeredisConfig } from './types';

export const CEREDIS_CONFIG: CeredisConfig = {
  version: "1.0",
  
  scale: { 
    min: 0, 
    max: 600 
  },
  
  // Poids des types de preuves
  evidenceWeights: {
    P1: 0.15,  // Reconnaissance
    P2: 0.30,  // Compréhension
    P3: 0.35,  // Application
    P4: 0.20   // Création/Analyse
  },

  // Configuration des 5 domaines
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
      minScore: 60  // Score minimum pour certains niveaux
    }
  },

  // Seuils CECRL [min, max]
  cecrlThresholds: {
    A2: [200, 299],
    B1: [300, 399],
    B2: [400, 499],
    C1: [500, 599]
  },

  // Règles de validation par niveau
  levels: {
    B2: {
      minScore: 400,
      requiredEvidenceTypes: ["P3"],
      requiredDomains: { 
        D5: { minScore: 60 } 
      }
    },
    C1: {
      minScore: 500,
      requiredEvidenceTypes: ["P3", "P4"],
      requiredDomains: { 
        D5: { minScore: 70 } 
      }
    }
  }
};
```

### Étape 1.3 : Module 1 - Agrégation des preuves

**Fichier** : `services/ceredis-calculator/engine/evidenceAggregator.ts`

```typescript
import type { Evidence, AggregatedEvidence } from '../types';
import type { CompetencyId } from '@/types/ceredis';

/**
 * Agrège les preuves (evidences) par compétence
 * 
 * Pour chaque compétence :
 * - Regroupe toutes les evidences
 * - Calcule score moyen
 * - Identifie meilleur score
 * - Liste les types de preuves présentes
 * 
 * @param evidences Liste des preuves
 * @returns Map des preuves agrégées par compétence
 */
export function aggregateEvidences(
  evidences: Evidence[]
): Map<CompetencyId, AggregatedEvidence> {
  const aggregated = new Map<CompetencyId, AggregatedEvidence>();

  for (const evidence of evidences) {
    const compId = evidence.competencyId;
    
    if (!aggregated.has(compId)) {
      aggregated.set(compId, {
        competencyId: compId,
        evidences: [],
        count: 0,
        avgScore: 0,
        bestScore: 0,
        evidenceTypes: new Set()
      });
    }

    const agg = aggregated.get(compId)!;
    agg.evidences.push(evidence);
    agg.count++;
    agg.evidenceTypes.add(evidence.evidenceType);
    
    // Mettre à jour meilleur score
    if (evidence.score > agg.bestScore) {
      agg.bestScore = evidence.score;
    }
  }

  // Calculer scores moyens
  for (const [compId, agg] of aggregated.entries()) {
    const totalScore = agg.evidences.reduce((sum, e) => sum + e.score, 0);
    agg.avgScore = agg.count > 0 ? totalScore / agg.count : 0;
  }

  return aggregated;
}

/**
 * Récupère les types de preuves uniques présents
 * 
 * @param evidences Liste des preuves
 * @returns Set des types présents (P1, P2, P3, P4)
 */
export function getUniqueEvidenceTypes(evidences: Evidence[]): Set<string> {
  return new Set(evidences.map(e => e.evidenceType));
}

/**
 * Filtre les preuves par type
 * 
 * @param evidences Liste des preuves
 * @param type Type à filtrer (P1, P2, P3, P4)
 * @returns Preuves du type demandé
 */
export function filterByEvidenceType(
  evidences: Evidence[],
  type: string
): Evidence[] {
  return evidences.filter(e => e.evidenceType === type);
}
```

### Étape 1.4 : Module 2 - Calcul par compétence

**Fichier** : `services/ceredis-calculator/engine/competencyCalculator.ts`

```typescript
import type { CompetencyId, EvidenceType } from '@/types/ceredis';
import type { 
  AggregatedEvidence, 
  CompetencyScore, 
  CeredisConfig 
} from '../types';

/**
 * Calcule le score pour chaque compétence
 * 
 * Méthode de calcul :
 * 1. Pour chaque evidence, appliquer le poids selon son type
 * 2. Calculer la moyenne pondérée
 * 3. Normaliser sur 100
 * 
 * @param aggregated Preuves agrégées par compétence
 * @param config Configuration CEREDIS
 * @returns Scores par compétence
 */
export function calculateCompetencyScores(
  aggregated: Map<CompetencyId, AggregatedEvidence>,
  config: CeredisConfig
): Record<CompetencyId, CompetencyScore> {
  const scores: Record<string, CompetencyScore> = {};

  for (const [compId, agg] of aggregated.entries()) {
    // Calculer score pondéré
    let weightedSum = 0;
    let totalWeight = 0;

    for (const evidence of agg.evidences) {
      const weight = config.evidenceWeights[evidence.evidenceType] || 0;
      weightedSum += evidence.score * weight;
      totalWeight += weight;
    }

    const finalScore = totalWeight > 0 
      ? Math.round((weightedSum / totalWeight) * 100) / 100
      : 0;

    scores[compId] = {
      score: Math.min(100, Math.max(0, finalScore)),
      evidenceCount: agg.count,
      evidenceTypes: Array.from(agg.evidenceTypes) as EvidenceType[],
      lastUpdated: new Date().toISOString()
    };
  }

  return scores;
}

/**
 * Vérifie si une compétence a un score suffisant
 * 
 * @param score Score de la compétence
 * @param threshold Seuil minimum
 * @returns true si score >= seuil
 */
export function isCompetencyValid(
  score: CompetencyScore,
  threshold: number
): boolean {
  return score.score >= threshold;
}
```

### Étape 1.5 : Module 3 - Calcul par domaine

**Fichier** : `services/ceredis-calculator/engine/domainCalculator.ts`

```typescript
import type { CompetencyId } from '@/types/ceredis';
import type { CompetencyScore, CeredisConfig } from '../types';

/**
 * Calcule le score pour chaque domaine (D1-D5)
 * 
 * Score domaine = Moyenne des scores des compétences du domaine
 * 
 * @param competencyScores Scores par compétence
 * @param config Configuration CEREDIS
 * @returns Scores par domaine (D1-D5)
 */
export function calculateDomainScores(
  competencyScores: Record<CompetencyId, CompetencyScore>,
  config: CeredisConfig
): Record<string, number> {
  const domainScores: Record<string, number> = {};

  for (const [domainId, domainConfig] of Object.entries(config.domains)) {
    const competencies = domainConfig.competencies;
    
    // Calculer moyenne des compétences du domaine
    let totalScore = 0;
    let count = 0;

    for (const compId of competencies) {
      if (competencyScores[compId]) {
        totalScore += competencyScores[compId].score;
        count++;
      }
    }

    domainScores[domainId] = count > 0
      ? Math.round((totalScore / count) * 100) / 100
      : 0;
  }

  return domainScores;
}

/**
 * Vérifie si un domaine respecte le score minimum requis
 * 
 * @param domainId ID du domaine (D1-D5)
 * @param score Score du domaine
 * @param config Configuration CEREDIS
 * @returns true si score >= minimum requis
 */
export function isDomainValid(
  domainId: string,
  score: number,
  config: CeredisConfig
): boolean {
  const domainConfig = config.domains[domainId];
  if (!domainConfig || !domainConfig.minScore) {
    return true; // Pas de minimum requis
  }
  return score >= domainConfig.minScore;
}
```

### Étape 1.6 : Module 4 - Score CEREDIS global

**Fichier** : `services/ceredis-calculator/engine/ceredisCalculator.ts`

```typescript
import type { CeredisConfig } from '../types';

/**
 * Calcule le score CEREDIS global (0-600)
 * 
 * Formule : Score = Σ(Score_domaine × Poids_domaine) × 6
 * 
 * Explication :
 * - Chaque domaine a un poids (0.20 pour tous actuellement)
 * - On fait la moyenne pondérée des domaines (0-100)
 * - On multiplie par 6 pour obtenir le score sur 600
 * 
 * @param domainScores Scores par domaine (0-100)
 * @param config Configuration CEREDIS
 * @returns Score CEREDIS (0-600)
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
      console.warn(`Domaine inconnu: ${domainId}`);
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

  // Arrondir à 2 décimales
  return Math.round(ceredisScore * 100) / 100;
}

/**
 * Valide que le score CEREDIS est dans les bornes
 * 
 * @param score Score CEREDIS
 * @param config Configuration CEREDIS
 * @returns true si score entre min et max
 */
export function validateCeredisScore(
  score: number,
  config: CeredisConfig
): boolean {
  return score >= config.scale.min && score <= config.scale.max;
}

/**
 * Normalise un score CEREDIS dans les bornes
 * 
 * @param score Score à normaliser
 * @param config Configuration CEREDIS
 * @returns Score normalisé entre min et max
 */
export function normalizeCeredisScore(
  score: number,
  config: CeredisConfig
): number {
  return Math.max(
    config.scale.min,
    Math.min(config.scale.max, score)
  );
}
```

### Étape 1.7 : Module 5 - Niveau CECRL

**Fichier** : `services/ceredis-calculator/engine/cecrlDecider.ts`

```typescript
import type { CeredisConfig } from '../types';

/**
 * Détermine le niveau CECRL basé sur le score CEREDIS
 * 
 * Seuils :
 * - A2 : 200-299
 * - B1 : 300-399
 * - B2 : 400-499
 * - C1 : 500-599
 * 
 * Note : La validation des règles strictes se fait dans levelValidator
 * 
 * @param ceredisScore Score CEREDIS (0-600)
 * @param config Configuration CEREDIS
 * @returns Niveau CECRL
 */
export function decideCecrlLevel(
  ceredisScore: number,
  config: CeredisConfig
): 'A2' | 'B1' | 'B2' | 'C1' {
  // Trouver le niveau correspondant au score
  for (const [level, [min, max]] of Object.entries(config.cecrlThresholds)) {
    if (ceredisScore >= min && ceredisScore <= max) {
      return level as 'A2' | 'B1' | 'B2' | 'C1';
    }
  }

  // Par défaut : A2 si score < 200, C1 si score > 599
  if (ceredisScore < 200) return 'A2';
  if (ceredisScore >= 600) return 'C1';
  
  return 'B1'; // Fallback
}

/**
 * Récupère les seuils pour un niveau CECRL
 * 
 * @param level Niveau CECRL
 * @param config Configuration CEREDIS
 * @returns [min, max] ou undefined
 */
export function getLevelThresholds(
  level: string,
  config: CeredisConfig
): [number, number] | undefined {
  return config.cecrlThresholds[level];
}

/**
 * Calcule le pourcentage de progression dans un niveau
 * 
 * @param score Score CEREDIS
 * @param level Niveau CECRL actuel
 * @param config Configuration CEREDIS
 * @returns Pourcentage (0-100)
 */
export function calculateLevelProgress(
  score: number,
  level: 'A2' | 'B1' | 'B2' | 'C1',
  config: CeredisConfig
): number {
  const thresholds = config.cecrlThresholds[level];
  if (!thresholds) return 0;

  const [min, max] = thresholds;
  const range = max - min;
  const progress = ((score - min) / range) * 100;

  return Math.max(0, Math.min(100, Math.round(progress)));
}
```

### Étape 1.8 : Module 6 - Validation des règles

**Fichier** : `services/ceredis-calculator/engine/levelValidator.ts`

```typescript
import type { Evidence, ValidationResult, CeredisConfig } from '../types';

/**
 * Valide les règles strictes pour B2 et C1
 * 
 * B2 REQUIS :
 * - Score ≥ 400
 * - Au moins 1 preuve P3
 * - Domaine 5 ≥ 60
 * 
 * C1 REQUIS :
 * - Score ≥ 500
 * - Au moins 1 preuve P3 ET 1 preuve P4
 * - Domaine 5 ≥ 70
 * 
 * Si règles non respectées → Dégradation au niveau inférieur
 * 
 * @param proposedLevel Niveau proposé par le score
 * @param ceredisScore Score CEREDIS
 * @param domainScores Scores par domaine
 * @param evidences Liste des preuves
 * @param config Configuration CEREDIS
 * @returns Résultat de validation avec niveau final
 */
export function validateLevel(
  proposedLevel: 'A2' | 'B1' | 'B2' | 'C1',
  ceredisScore: number,
  domainScores: Record<string, number>,
  evidences: Evidence[],
  config: CeredisConfig
): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    level: proposedLevel,
    originalLevel: proposedLevel,
    degraded: false,
    errors: [],
    warnings: [],
    validationDetails: {}
  };

  // A2 et B1 : pas de règles strictes
  if (proposedLevel === 'A2' || proposedLevel === 'B1') {
    return result;
  }

  // Récupérer types de preuves présentes
  const evidenceTypes = new Set(evidences.map(e => e.evidenceType));
  const hasP3 = evidenceTypes.has('P3');
  const hasP4 = evidenceTypes.has('P4');
  const domain5Score = domainScores['D5'] || 0;

  result.validationDetails = {
    hasP3,
    hasP4,
    domain5Score
  };

  // VALIDATION B2
  if (proposedLevel === 'B2') {
    const requirements = config.levels['B2'];
    
    // Vérifier score minimum
    if (ceredisScore < requirements.minScore) {
      result.errors.push(`Score insuffisant pour B2: ${ceredisScore} < ${requirements.minScore}`);
      result.valid = false;
    }

    // Vérifier P3
    if (!hasP3) {
      result.errors.push('B2 requis: Au moins 1 preuve P3');
      result.valid = false;
    }

    // Vérifier Domaine 5
    const d5Required = requirements.requiredDomains?.D5?.minScore || 60;
    if (domain5Score < d5Required) {
      result.errors.push(`Domaine 5 insuffisant pour B2: ${domain5Score} < ${d5Required}`);
      result.valid = false;
    }

    // Si validation échoue → Dégradation à B1
    if (!result.valid) {
      result.level = 'B1';
      result.degraded = true;
      result.degradationReason = 'Règles B2 non respectées';
    }
  }

  // VALIDATION C1
  if (proposedLevel === 'C1') {
    const requirements = config.levels['C1'];
    
    // Vérifier score minimum
    if (ceredisScore < requirements.minScore) {
      result.errors.push(`Score insuffisant pour C1: ${ceredisScore} < ${requirements.minScore}`);
      result.valid = false;
    }

    // Vérifier P3 ET P4
    if (!hasP3 || !hasP4) {
      result.errors.push('C1 requis: Au moins 1 preuve P3 ET 1 preuve P4');
      result.valid = false;
    }

    // Vérifier Domaine 5
    const d5Required = requirements.requiredDomains?.D5?.minScore || 70;
    if (domain5Score < d5Required) {
      result.errors.push(`Domaine 5 insuffisant pour C1: ${domain5Score} < ${d5Required}`);
      result.valid = false;
    }

    // Si validation échoue → Dégradation à B2
    if (!result.valid) {
      result.level = 'B2';
      result.degraded = true;
      result.degradationReason = 'Règles C1 non respectées';
    }
  }

  return result;
}

/**
 * Génère un rapport de validation lisible
 * 
 * @param validation Résultat de validation
 * @returns Rapport textuel
 */
export function generateValidationReport(
  validation: ValidationResult
): string {
  const lines: string[] = [];
  
  lines.push(`Niveau : ${validation.level}`);
  
  if (validation.degraded) {
    lines.push(`⚠️ Dégradé depuis ${validation.originalLevel}`);
    lines.push(`Raison : ${validation.degradationReason}`);
  }
  
  if (validation.errors.length > 0) {
    lines.push('\nErreurs :');
    validation.errors.forEach(err => lines.push(`  - ${err}`));
  }
  
  if (validation.warnings.length > 0) {
    lines.push('\nAvertissements :');
    validation.warnings.forEach(warn => lines.push(`  - ${warn}`));
  }
  
  return lines.join('\n');
}
```

### Étape 1.9 : Point d'entrée principal

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
 * FONCTION PRINCIPALE
 * 
 * Calcule le score CEREDIS complet pour un apprenant
 * 
 * Pipeline :
 * 1. Agréger evidences par compétence
 * 2. Calculer scores par compétence (avec pondération P1-P4)
 * 3. Calculer scores par domaine (D1-D5)
 * 4. Calculer score CEREDIS global (0-600)
 * 5. Déterminer niveau CECRL
 * 6. Valider règles strictes B2/C1
 * 
 * @param userId ID de l'utilisateur
 * @param evidences Liste des preuves
 * @returns Résultat CEREDIS complet
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
  const ceredisScore = calculateCeredisScore(
    domainScores,
    CEREDIS_CONFIG
  );

  // 5. Décider niveau CECRL
  const proposedLevel = decideCecrlLevel(ceredisScore, CEREDIS_CONFIG);

  // 6. Valider règles strictes
  const validation = validateLevel(
    proposedLevel,
    ceredisScore,
    domainScores,
    evidences,
    CEREDIS_CONFIG
  );

  // Construire résultat
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

// Exports
export { CEREDIS_CONFIG } from './config';
export type * from './types';
```

---

## 🌐 PHASE 2 : API ROUTE NEXT.JS

**Fichier** : `app/api/ceredis/calculate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { computeCeredisScore } from '@/services/ceredis-calculator';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

/**
 * POST /api/ceredis/calculate
 * 
 * Calcule le score CEREDIS pour un utilisateur
 * 
 * Body: { userId: string }
 * 
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

    // 2. Transformer au format attendu par le moteur
    const formattedEvidences = evidences.map(e => ({
      id: e.id,
      userId: e.user,
      competencyId: e.competency_id,
      evidenceType: e.evidence_type,
      score: e.score,
      timestamp: e.created,
      metadata: {
        activityType: e.activity_type,
        seanceId: e.seance_id,
        parcours: e.parcours,
        ...e.metadata
      }
    }));

    // 3. Calculer le score CEREDIS
    const result = await computeCeredisScore(userId, formattedEvidences);

    // 4. TODO: Sauvegarder dans PostgreSQL (optionnel)
    // await saveCeredisResult(result);

    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error('CEREDIS calculation error:', error);
    return NextResponse.json(
      { 
        error: 'Calculation failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ceredis/calculate?userId=xxx
 * 
 * Récupère le dernier score calculé (si cache PostgreSQL)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      );
    }

    // TODO: Récupérer depuis PostgreSQL cache
    // const cached = await getCachedCeredisResult(userId);
    // if (cached) return NextResponse.json(cached);

    // Si pas de cache, recalculer
    return POST(request);
    
  } catch (error: any) {
    console.error('CEREDIS fetch error:', error);
    return NextResponse.json(
      { 
        error: 'Fetch failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
```

---

## 💻 PHASE 3 : CLIENT FRONTEND

### Client HTTP

**Fichier** : `lib/ceredis/client.ts`

```typescript
import type { CeredisResult } from '@/services/ceredis-calculator/types';

/**
 * Calcule le score CEREDIS pour un utilisateur
 * 
 * @param userId ID de l'utilisateur
 * @returns Résultat CEREDIS
 */
export async function calculateUserScore(
  userId: string
): Promise<CeredisResult> {
  const response = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ userId })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || 'Failed to calculate score');
  }

  return response.json();
}

/**
 * Récupère le score CEREDIS mis en cache
 * 
 * @param userId ID de l'utilisateur
 * @returns Résultat CEREDIS ou null
 */
export async function getCachedUserScore(
  userId: string
): Promise<CeredisResult | null> {
  try {
    const response = await fetch(
      `/api/ceredis/calculate?userId=${userId}`,
      { method: 'GET' }
    );

    if (!response.ok) return null;
    
    return response.json();
  } catch {
    return null;
  }
}
```

### React Hook

**Fichier** : `lib/ceredis/hooks.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateUserScore, getCachedUserScore } from './client';

/**
 * Hook pour charger le score CEREDIS d'un utilisateur
 * 
 * Usage :
 * const { data, isLoading, error, refetch } = useCeredisScore(userId);
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

/**
 * Hook pour recalculer le score CEREDIS
 * 
 * Usage :
 * const { mutate: recalculate, isPending } = useRecalculateCeredisScore();
 * recalculate(userId);
 */
export function useRecalculateCeredisScore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calculateUserScore,
    onSuccess: (data, userId) => {
      // Invalider le cache pour forcer un refresh
      queryClient.setQueryData(['ceredis-score', userId], data);
      queryClient.invalidateQueries({ 
        queryKey: ['ceredis-score', userId] 
      });
    }
  });
}
```

---

## 🔄 PHASE 4 : INTÉGRATION DASHBOARD

**Modifier** : `hooks/useDashboard.ts`

```typescript
// REMPLACER la section de calcul approximatif par :

import { calculateUserScore } from '@/lib/ceredis/client';

// Dans le useEffect :
try {
  // Calculer le score CEREDIS PRÉCIS via le moteur
  const ceredisResult = await calculateUserScore(user.id);
  
  scoreCeredis = ceredisResult.ceredisScore;
  niveauCecrl = ceredisResult.cecrlLevel;
  
  // Utiliser les scores de domaines du moteur
  Object.keys(domainesScores).forEach(domain => {
    if (ceredisResult.domainScores[domain] !== undefined) {
      domainesScores[domain] = ceredisResult.domainScores[domain];
    }
  });
  
} catch (error) {
  console.error('Erreur calcul CEREDIS:', error);
  // Fallback sur estimation si moteur échoue
  // ... garder le code d'estimation existant
}
```

---

## ✅ CHECKLIST D'IMPLÉMENTATION

### Phase 1 : Moteur (services/ceredis-calculator/)
- [ ] types.ts - Types TypeScript
- [ ] config.ts - Configuration CEREDIS
- [ ] engine/evidenceAggregator.ts
- [ ] engine/competencyCalculator.ts
- [ ] engine/domainCalculator.ts
- [ ] engine/ceredisCalculator.ts
- [ ] engine/cecrlDecider.ts
- [ ] engine/levelValidator.ts
- [ ] index.ts - Point d'entrée
- [ ] Tests unitaires (optionnel)

### Phase 2 : API (app/api/)
- [ ] api/ceredis/calculate/route.ts - POST et GET

### Phase 3 : Client (lib/ceredis/)
- [ ] client.ts - HTTP client
- [ ] hooks.ts - React hooks

### Phase 4 : Intégration
- [ ] Modifier useDashboard.ts pour utiliser le moteur
- [ ] Tester le calcul E2E
- [ ] Vérifier dashboard avec scores précis

### Phase 5 : PostgreSQL (Optionnel)
- [ ] Schéma table ceredis_results
- [ ] Fonction saveCeredisResult()
- [ ] Fonction getCachedCeredisResult()
- [ ] Intégrer dans route.ts

---

## 🧪 TESTS À EFFECTUER

### Test 1: Calcul basique
```typescript
// Créer 3 evidences de test
// Vérifier que le calcul retourne un résultat
// Vérifier que le score est entre 0-600
```

### Test 2: Validation B2
```typescript
// Score 420, avec P3, D5 = 65
// → Doit retourner B2 validé
```

### Test 3: Dégradation B2 → B1
```typescript
// Score 410, sans P3
// → Doit dégrader à B1
```

### Test 4: Dashboard intégration
```typescript
// Créer evidences
// Appeler /api/ceredis/calculate
// Vérifier dashboard affiche score précis
```

---

## 📚 DOCUMENTATION À CRÉER

**Fichier** : `services/ceredis-calculator/README.md`

```markdown
# Moteur de Calcul CEREDIS

## Vue d'ensemble
Moteur de calcul des scores CEREDIS (0-600) et niveaux CECRL (A2-C1)

## Architecture
- 6 modules de calcul
- Pipeline en 6 étapes
- Configuration centralisée
- Type-safe TypeScript

## Usage
\`\`\`typescript
import { computeCeredisScore } from '@/services/ceredis-calculator';
const result = await computeCeredisScore(userId, evidences);
\`\`\`

## API
POST /api/ceredis/calculate

## Références
- PLAN_INTEGRATION_MOTEUR_CEREDIS.md
- ETAT_LIEUX_MOTEUR.md
```

---

## ⚠️ NOTES IMPORTANTES

### Compatibilité types
- Utiliser les types depuis `types/ceredis.ts` : CompetencyId, EvidenceType
- Ne pas redéfinir les 19 compétences
- Mapper correctement PocketBase → Moteur

### Gestion d'erreurs
- Try-catch autour de chaque étape
- Logs détaillés pour debug
- Messages d'erreur clairs

### Performance
- Cache les résultats (QueryClient)
- Envisager PostgreSQL pour historique
- Optimiser requêtes PocketBase

### Tests
- Tester chaque module isolément
- Tests E2E complets
- Valider règles B2/C1

---

## 🎯 PRIORITÉS

1. **URGENT** : Phases 1-3 (Moteur + API + Client)
2. **Important** : Phase 4 (Intégration dashboard)
3. **Nice to have** : Phase 5 (PostgreSQL cache)
4. **Optionnel** : Tests unitaires exhaustifs

---

## 📞 SUPPORT

En cas de problème :
1. Consulter PLAN_INTEGRATION_MOTEUR_CEREDIS.md
2. Vérifier ETAT_LIEUX_MOTEUR.md
3. Comparer avec l'archive ceredis-engine-v1.0.tar.gz

---

**Prompt créé le** : 26 janvier 2026  
**Version** : 1.0  
**Statut** : Prêt pour GitHub Copilot
