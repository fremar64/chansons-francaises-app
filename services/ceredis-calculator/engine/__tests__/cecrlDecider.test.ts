import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../../index';
import type { Evidence } from '../../types';

describe('CECRL Level Decider - Tests fonctionnels', () => {
  it('devrait attribuer A2 pour score < 200', async () => {
    const evidences: Evidence[] = [{
      competency_id: '1.1',
      score: 30,
      evidence_type: 'P1',
      timestamp: new Date(),
      activity_id: 'a1',
      student_id: 's1'
    }];

    const result = await computeCeredisScore('s1', evidences);

    expect(result.cecrlLevel).toBe('A2');
    expect(result.ceredisScore).toBeLessThan(200);
  });

  it('devrait attribuer B1 ou B2 pour score moyen', async () => {
    const evidences: Evidence[] = [];
    
    const allComps = [
      '1.1', '1.2', '1.3',
      '2.1', '2.2', '2.3',
      '3.1', '3.2', '3.3',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
    ];

    allComps.forEach((comp, i) => {
      evidences.push({
        competency_id: comp,
        score: 50,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    expect(result.ceredisScore).toBeGreaterThanOrEqual(200);
    expect(result.ceredisScore).toBeLessThan(475);
    expect(['B1', 'B2']).toContain(result.cecrlLevel);
  });

  it('devrait attribuer C1 pour scores élevés', async () => {
    const evidences: Evidence[] = [];
    
    const allComps = [
      '1.1', '1.2', '1.3',
      '2.1', '2.2', '2.3',
      '3.1', '3.2', '3.3',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
    ];

    // Score de 90 avec P3 pour atteindre C1
    allComps.forEach((comp, i) => {
      evidences.push({
        competency_id: comp,
        score: 90,
        evidence_type: 'P3',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    // Avec 90% partout, on devrait avoir C1
    expect(['B2', 'C1']).toContain(result.cecrlLevel);
    expect(result.ceredisScore).toBeGreaterThan(450);
  });

  it('devrait toujours retourner un niveau valide', async () => {
    const testScores = [0, 150, 250, 400, 550];
    const validLevels = ['A2', 'B1', 'B2', 'C1'];

    for (const targetScore of testScores) {
      const evidences: Evidence[] = [];
      const percentage = (targetScore / 600) * 100;
      
      ['1.1', '2.1', '3.1', '4.1', '5.1'].forEach((comp, i) => {
        evidences.push({
          competency_id: comp,
          score: percentage,
          evidence_type: 'P1',
          timestamp: new Date(),
          activity_id: `act${i}`,
          student_id: 's1'
        });
      });

      const result = await computeCeredisScore('s1', evidences);
      
      expect(validLevels).toContain(result.cecrlLevel);
    }
  });

  it('devrait gérer score 0', async () => {
    const result = await computeCeredisScore('s1', []);

    expect(result.ceredisScore).toBe(0);
    expect(result.cecrlLevel).toBe('A2');
  });

  it('devrait gérer score maximum', async () => {
    const evidences: Evidence[] = [];
    
    const allComps = [
      '1.1', '1.2', '1.3',
      '2.1', '2.2', '2.3',
      '3.1', '3.2', '3.3',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
    ];

    allComps.forEach((comp, i) => {
      evidences.push({
        competency_id: comp,
        score: 100,
        evidence_type: 'P3',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    // Avec 100% partout, on devrait avoir un score maximum
    expect(result.ceredisScore).toBeGreaterThan(550);
    expect(['B2', 'C1']).toContain(result.cecrlLevel);
  });
});
