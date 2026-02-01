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
