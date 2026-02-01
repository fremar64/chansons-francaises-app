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
