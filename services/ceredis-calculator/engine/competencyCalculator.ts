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
