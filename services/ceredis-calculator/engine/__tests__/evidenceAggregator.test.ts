import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../../index';
import type { Evidence } from '../../types';

describe('Evidence Aggregation - Tests fonctionnels', () => {
  it('devrait agréger correctement multiples evidences par compétence', async () => {
    const evidences: Evidence[] = [
      { competency_id: '1.1', score: 60, evidence_type: 'P1', timestamp: new Date('2026-01-01'), activity_id: 'a1', student_id: 's1' },
      { competency_id: '1.1', score: 70, evidence_type: 'P1', timestamp: new Date('2026-01-02'), activity_id: 'a2', student_id: 's1' },
      { competency_id: '1.1', score: 80, evidence_type: 'P2', timestamp: new Date('2026-01-03'), activity_id: 'a3', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);

    // Score devrait refléter progression
    const comp11Score = result.competencyScores['1.1'];
    expect(comp11Score.score).toBeGreaterThan(60);
  });

  it('devrait gérer liste vide', async () => {
    const result = await computeCeredisScore('s1', []);
    expect(result.ceredisScore).toBe(0);
  });

  it('devrait calculer moyenne avec evidences multiples', async () => {
    const evidences: Evidence[] = [
      { competency_id: '2.1', score: 60, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a1', student_id: 's1' },
      { competency_id: '2.1', score: 80, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a2', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);
    
    // Devrait avoir un score pour 2.1
    expect(result.competencyScores['2.1'].score).toBeGreaterThan(0);
  });

  it('devrait grouper par compétence', async () => {
    const evidences: Evidence[] = [
      { competency_id: '1.1', score: 75, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a1', student_id: 's1' },
      { competency_id: '2.1', score: 80, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a2', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);

    expect(result.competencyScores['1.1']).toBeDefined();
    expect(result.competencyScores['2.1']).toBeDefined();
  });

  it('devrait ignorer scores invalides', async () => {
    const evidences: Evidence[] = [
      { competency_id: '4.1', score: -10, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a1', student_id: 's1' },
      { competency_id: '4.1', score: 75, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a2', student_id: 's1' },
      { competency_id: '4.1', score: 150, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a3', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);
    
    // Devrait avoir comptabilisé l'evidence valide
    expect(result.competencyScores['4.1'].score).toBeGreaterThan(0);
    expect(result.competencyScores['4.1'].score).toBeLessThanOrEqual(100);
  });
});
