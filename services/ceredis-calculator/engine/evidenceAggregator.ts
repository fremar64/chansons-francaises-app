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
