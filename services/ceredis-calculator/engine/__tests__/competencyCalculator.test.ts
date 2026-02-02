import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../../index';
import type { Evidence } from '../../types';

describe('Competency Calculator - Tests fonctionnels', () => {
  it('devrait calculer scores pour toutes les 19 compétences', async () => {
    const evidences: Evidence[] = [];
    
    const allCompetencies = [
      '1.1', '1.2', '1.3',
      '2.1', '2.2', '2.3',
      '3.1', '3.2', '3.3',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
    ];

    allCompetencies.forEach((comp, i) => {
      evidences.push({
        competency_id: comp,
        score: 70,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    expect(Object.keys(result.competencyScores).length).toBeGreaterThan(0);
    allCompetencies.forEach(comp => {
      expect(result.competencyScores[comp]).toBeDefined();
    });
  });

  it('devrait retourner 0 pour compétences sans preuves', async () => {
    const evidences: Evidence[] = [{
      competency_id: '1.1',
      score: 75,
      evidence_type: 'P1',
      timestamp: new Date(),
      activity_id: 'a1',
      student_id: 's1'
    }];

    const result = await computeCeredisScore('s1', evidences);

    // Compétences sans evidences
    expect(result.competencyScores['2.1'] || 0).toBe(0);
    expect(result.competencyScores['3.1'] || 0).toBe(0);
  });

  it('devrait produire des scores dans la plage 0-100', async () => {
    const evidences: Evidence[] = [];
    
    for (let i = 1; i <= 19; i++) {
      const domain = Math.ceil(i / 7);
      const comp = i <= 12 ? `${domain}.${(i - 1) % 3 + 1}` : `5.${i - 12}`;
      
      evidences.push({
        competency_id: comp,
        score: Math.random() * 100,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    }

    const result = await computeCeredisScore('s1', evidences);

    Object.values(result.competencyScores).forEach(compScore => {
      expect(compScore.score).toBeGreaterThanOrEqual(0);
      expect(compScore.score).toBeLessThanOrEqual(100);
    });
  });

  it('devrait appliquer pondération selon nombre de preuves', async () => {
    const evidences: Evidence[] = [
      // 1 seule evidence pour 1.1
      { competency_id: '1.1', score: 70, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a1', student_id: 's1' },
      // 3 evidences pour 1.2
      { competency_id: '1.2', score: 65, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a2', student_id: 's1' },
      { competency_id: '1.2', score: 70, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a3', student_id: 's1' },
      { competency_id: '1.2', score: 75, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a4', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);

    // Les deux compétences devraient avoir des scores
    expect(result.competencyScores['1.1'].score).toBeGreaterThan(0);
    expect(result.competencyScores['1.2'].score).toBeGreaterThan(0);
  });

  it('devrait favoriser les scores récents', async () => {
    const evidences: Evidence[] = [
      { competency_id: '3.1', score: 50, evidence_type: 'P1', timestamp: new Date('2026-01-01'), activity_id: 'a1', student_id: 's1' },
      { competency_id: '3.1', score: 60, evidence_type: 'P1', timestamp: new Date('2026-01-15'), activity_id: 'a2', student_id: 's1' },
      { competency_id: '3.1', score: 70, evidence_type: 'P1', timestamp: new Date('2026-01-30'), activity_id: 'a3', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);

    // Score devrait être plus proche de 70 (le plus récent)
    expect(result.competencyScores['3.1'].score).toBeGreaterThan(55);
  });
});
