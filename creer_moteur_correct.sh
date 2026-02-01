#!/bin/bash
# Script de création des fichiers corrects du moteur CEREDIS
# Sans erreurs, sans duplications

cd /home/ceredis/chansons-francaises-app

# Créer la structure
mkdir -p MOTEUR_CEREDIS_CORRECTS/engine

echo "🔧 Création des fichiers corrects du moteur CEREDIS..."
echo ""

# Fichier 1 : types.ts (DÉJÀ CRÉÉ)
echo "✅ 1/9 types.ts - OK"

# Fichier 2 : config.ts
cat > MOTEUR_CEREDIS_CORRECTS/config.ts << 'EOF2'
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
EOF2
echo "✅ 2/9 config.ts - OK"

# Fichier 3 : engine/evidenceAggregator.ts
cat > MOTEUR_CEREDIS_CORRECTS/engine/evidenceAggregator.ts << 'EOF3'
import type { Evidence, AggregatedEvidence } from '../types';
import type { CompetencyId } from '@/types/ceredis';

export function aggregateEvidences(
  evidences: Evidence[]
): Map<CompetencyId, AggregatedEvidence> {
  const aggregated = new Map<CompetencyId, AggregatedEvidence>();

  for (const evidence of evidences) {
    const compId = evidence.competency_id;
    
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
    agg.evidenceTypes.add(evidence.evidence_type);
    
    if (evidence.score > agg.bestScore) {
      agg.bestScore = evidence.score;
    }
  }

  for (const [, agg] of aggregated.entries()) {
    const totalScore = agg.evidences.reduce((sum, e) => sum + e.score, 0);
    agg.avgScore = agg.count > 0 ? totalScore / agg.count : 0;
  }

  return aggregated;
}
EOF3
echo "✅ 3/9 engine/evidenceAggregator.ts - OK"

# Fichier 4 : engine/competencyCalculator.ts
cat > MOTEUR_CEREDIS_CORRECTS/engine/competencyCalculator.ts << 'EOF4'
import type { CompetencyId, EvidenceType } from '@/types/ceredis';
import type { AggregatedEvidence, CompetencyScore, CeredisConfig } from '../types';

export function calculateCompetencyScores(
  aggregated: Map<CompetencyId, AggregatedEvidence>,
  config: CeredisConfig
): Record<CompetencyId, CompetencyScore> {
  const scores: Record<string, CompetencyScore> = {};

  for (const [compId, agg] of aggregated.entries()) {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const evidence of agg.evidences) {
      const weight = config.evidenceWeights[evidence.evidence_type] || 0;
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
EOF4
echo "✅ 4/9 engine/competencyCalculator.ts - OK"

# Fichier 5 : engine/domainCalculator.ts
cat > MOTEUR_CEREDIS_CORRECTS/engine/domainCalculator.ts << 'EOF5'
import type { CompetencyId } from '@/types/ceredis';
import type { CompetencyScore, CeredisConfig } from '../types';

export function calculateDomainScores(
  competencyScores: Record<CompetencyId, CompetencyScore>,
  config: CeredisConfig
): Record<string, number> {
  const domainScores: Record<string, number> = {};

  for (const [domainId, domainConfig] of Object.entries(config.domains)) {
    const competencies = domainConfig.competencies;
    
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
EOF5
echo "✅ 5/9 engine/domainCalculator.ts - OK"

# Fichier 6 : engine/ceredisCalculator.ts
cat > MOTEUR_CEREDIS_CORRECTS/engine/ceredisCalculator.ts << 'EOF6'
import type { CeredisConfig } from '../types';

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

  const averageScore = weightedSum / totalWeight;
  const ceredisScore = averageScore * 6;

  return Math.round(ceredisScore * 100) / 100;
}
EOF6
echo "✅ 6/9 engine/ceredisCalculator.ts - OK"

# Fichier 7 : engine/cecrlDecider.ts
cat > MOTEUR_CEREDIS_CORRECTS/engine/cecrlDecider.ts << 'EOF7'
import type { CeredisConfig } from '../types';

export function decideCecrlLevel(
  ceredisScore: number,
  config: CeredisConfig
): 'A2' | 'B1' | 'B2' | 'C1' {
  for (const [level, [min, max]] of Object.entries(config.cecrlThresholds)) {
    if (ceredisScore >= min && ceredisScore <= max) {
      return level as 'A2' | 'B1' | 'B2' | 'C1';
    }
  }

  if (ceredisScore < 200) return 'A2';
  if (ceredisScore >= 600) return 'C1';
  
  return 'B1';
}
EOF7
echo "✅ 7/9 engine/cecrlDecider.ts - OK"

# Fichier 8 : engine/levelValidator.ts  
cat > MOTEUR_CEREDIS_CORRECTS/engine/levelValidator.ts << 'EOF8'
import type { Evidence, ValidationResult, CeredisConfig } from '../types';

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

  if (proposedLevel === 'A2' || proposedLevel === 'B1') {
    return result;
  }

  const evidenceTypes = new Set(evidences.map(e => e.evidence_type));
  const hasP3 = evidenceTypes.has('P3');
  const hasP4 = evidenceTypes.has('P4');
  const domain5Score = domainScores['D5'] || 0;

  result.validationDetails = { hasP3, hasP4, domain5Score };

  if (proposedLevel === 'B2') {
    const requirements = config.levels['B2'];
    
    if (ceredisScore < requirements.minScore) {
      result.errors.push(`Score insuffisant pour B2: ${ceredisScore} < ${requirements.minScore}`);
      result.valid = false;
    }

    if (!hasP3) {
      result.errors.push('B2 requis: Au moins 1 preuve P3');
      result.valid = false;
    }

    const d5Required = requirements.requiredDomains?.D5?.minScore || 60;
    if (domain5Score < d5Required) {
      result.errors.push(`Domaine 5 insuffisant pour B2: ${domain5Score} < ${d5Required}`);
      result.valid = false;
    }

    if (!result.valid) {
      result.level = 'B1';
      result.degraded = true;
      result.degradationReason = 'Règles B2 non respectées';
    }
  }

  if (proposedLevel === 'C1') {
    const requirements = config.levels['C1'];
    
    if (ceredisScore < requirements.minScore) {
      result.errors.push(`Score insuffisant pour C1: ${ceredisScore} < ${requirements.minScore}`);
      result.valid = false;
    }

    if (!hasP3 || !hasP4) {
      result.errors.push('C1 requis: Au moins 1 preuve P3 ET 1 preuve P4');
      result.valid = false;
    }

    const d5Required = requirements.requiredDomains?.D5?.minScore || 70;
    if (domain5Score < d5Required) {
      result.errors.push(`Domaine 5 insuffisant pour C1: ${domain5Score} < ${d5Required}`);
      result.valid = false;
    }

    if (!result.valid) {
      result.level = 'B2';
      result.degraded = true;
      result.degradationReason = 'Règles C1 non respectées';
    }
  }

  return result;
}
EOF8
echo "✅ 8/9 engine/levelValidator.ts - OK"

# Fichier 9 : index.ts
cat > MOTEUR_CEREDIS_CORRECTS/index.ts << 'EOF9'
import type { Evidence, CeredisResult } from './types';
import { CEREDIS_CONFIG } from './config';
import { aggregateEvidences } from './engine/evidenceAggregator';
import { calculateCompetencyScores } from './engine/competencyCalculator';
import { calculateDomainScores } from './engine/domainCalculator';
import { calculateCeredisScore } from './engine/ceredisCalculator';
import { decideCecrlLevel } from './engine/cecrlDecider';
import { validateLevel } from './engine/levelValidator';

export async function computeCeredisScore(
  userId: string,
  evidences: Evidence[]
): Promise<CeredisResult> {
  const aggregated = aggregateEvidences(evidences);
  const competencyScores = calculateCompetencyScores(aggregated, CEREDIS_CONFIG);
  const domainScores = calculateDomainScores(competencyScores, CEREDIS_CONFIG);
  const ceredisScore = calculateCeredisScore(domainScores, CEREDIS_CONFIG);
  const proposedLevel = decideCecrlLevel(ceredisScore, CEREDIS_CONFIG);
  const validation = validateLevel(proposedLevel, ceredisScore, domainScores, evidences, CEREDIS_CONFIG);

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

export { CEREDIS_CONFIG } from './config';
export type * from './types';
EOF9
echo "✅ 9/9 index.ts - OK"
echo ""
echo "🎉 Tous les fichiers corrects ont été créés !"
echo ""
echo "📂 Dossier : MOTEUR_CEREDIS_CORRECTS/"
echo ""
echo "🔄 Prochaines étapes :"
echo "1. Sauvegarder l'ancien : mv services/ceredis-calculator services/ceredis-calculator.BAK"
echo "2. Copier les nouveaux : cp -r MOTEUR_CEREDIS_CORRECTS services/ceredis-calculator"
echo "3. Tester la compilation : npm run type-check"
echo ""
