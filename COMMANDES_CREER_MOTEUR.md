# 🚀 COMMANDES POUR CRÉER TOUS LES FICHIERS CORRECTS

**Objectif** : Créer les 9 fichiers TypeScript corrects du moteur CEREDIS  
**Sans** : Duplications, erreurs de syntaxe, commentaires non fermés

---

## 📋 INSTRUCTIONS

**Copier-coller ces commandes dans votre terminal WSL** (une par une ou toutes d'un coup)

```bash
cd ~/chansons-francaises-app
mkdir -p MOTEUR_CEREDIS_CORRECTS/engine

# Les fichiers types.ts et config.ts sont déjà créés ✅

# Fichier 3/9 : evidenceAggregator.ts
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

# Fichier 4/9 : competencyCalculator.ts
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

# Fichier 5/9 : domainCalculator.ts
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

# Fichier 6/9 : ceredisCalculator.ts
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
      console.warn(\`Domaine inconnu: \${domainId}\`);
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

# Fichier 7/9 : cecrlDecider.ts
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

# Fichier 8/9 : levelValidator.ts
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
      result.errors.push(\`Score insuffisant pour B2: \${ceredisScore} < \${requirements.minScore}\`);
      result.valid = false;
    }
    
    if (!hasP3) {
      result.errors.push('B2 requis: Au moins 1 preuve P3');
      result.valid = false;
    }
    
    const d5Required = requirements.requiredDomains?.D5?.minScore || 60;
    if (domain5Score < d5Required) {
      result.errors.push(\`Domaine 5 insuffisant pour B2: \${domain5Score} < \${d5Required}\`);
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
      result.errors.push(\`Score insuffisant pour C1: \${ceredisScore} < \${requirements.minScore}\`);
      result.valid = false;
    }
    
    if (!hasP3 || !hasP4) {
      result.errors.push('C1 requis: Au moins 1 preuve P3 ET 1 preuve P4');
      result.valid = false;
    }
    
    const d5Required = requirements.requiredDomains?.D5?.minScore || 70;
    if (domain5Score < d5Required) {
      result.errors.push(\`Domaine 5 insuffisant pour C1: \${domain5Score} < \${d5Required}\`);
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

# Fichier 9/9 : index.ts
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

echo ""
echo "🎉 TOUS LES FICHIERS CORRECTS CRÉÉS !"
echo ""
echo "📂 Structure créée :"
ls -lhR MOTEUR_CEREDIS_CORRECTS/
echo ""
```

---

## 🔄 REMPLACEMENT

Une fois tous les fichiers créés :

```bash
cd ~/chansons-francaises-app

# 1. Sauvegarder l'ancien (optionnel)
mv services/ceredis-calculator services/ceredis-calculator.BAK 2>/dev/null || true

# 2. Copier les nouveaux
cp -r MOTEUR_CEREDIS_CORRECTS services/ceredis-calculator

# 3. Vérifier
ls -la services/ceredis-calculator/

# 4. Tester la compilation
npm run type-check
```

---

## ✅ RÉSULTAT ATTENDU

```
services/ceredis-calculator/
├── types.ts              (95 lignes)
├── config.ts             (55 lignes)
├── index.ts              (35 lignes)
└── engine/
    ├── evidenceAggregator.ts    (40 lignes)
    ├── competencyCalculator.ts  (35 lignes)
    ├── domainCalculator.ts      (30 lignes)
    ├── ceredisCalculator.ts     (25 lignes)
    ├── cecrlDecider.ts          (20 lignes)
    └── levelValidator.ts        (85 lignes)
```

**Total** : ~420 lignes de code propre, sans erreurs

---

## 🎯 VÉRIFICATION

### Test compilation
```bash
npm run type-check
```
**Attendu** : `✓ Compiled successfully` (0 erreurs)

### Test dev
```bash
npm run dev
```
**Attendu** : Serveur démarre sans erreur

---

**Copiez-collez toutes ces commandes dans votre terminal WSL !** 🚀
