import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../index';
import type { Evidence } from '../types';

describe('CEREDIS Calculator - Tests d\'intégration', () => {
  it('devrait calculer un résultat complet', async () => {
    const evidences: Evidence[] = [
      {
        competency_id: '1.1',
        score: 75,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: 'act1',
        student_id: 'student1'
      }
    ];

    const result = await computeCeredisScore('student1', evidences);

    expect(result).toBeDefined();
    expect(result.ceredisScore).toBeGreaterThanOrEqual(0);
    expect(result.ceredisScore).toBeLessThanOrEqual(600);
    expect(['A2', 'B1', 'B2', 'C1']).toContain(result.cecrlLevel);
  });

  it('devrait retourner A2 pour liste vide', async () => {
    const result = await computeCeredisScore('student1', []);

    expect(result.ceredisScore).toBe(0);
    expect(result.cecrlLevel).toBe('A2');
  });

  it('devrait calculer niveau B2 avec scores appropriés', async () => {
    const evidences: Evidence[] = [];
    
    // Scores moyens pour ~400 points
    const competencies = [
      '1.1', '1.2', '1.3',
      '2.1', '2.2', '2.3',
      '3.1', '3.2', '3.3',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
    ];

    competencies.forEach((comp, i) => {
      evidences.push({
        competency_id: comp,
        score: 70,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 'student1'
      });
    });

    const result = await computeCeredisScore('student1', evidences);

    expect(result.cecrlLevel).toMatch(/B1|B2/);
    expect(result.ceredisScore).toBeGreaterThan(200);
  });

  it('devrait inclure metadata', async () => {
    const evidences: Evidence[] = [{
      competency_id: '1.1',
      score: 75,
      evidence_type: 'P1',
      timestamp: new Date(),
      activity_id: 'act1',
      student_id: 'student1'
    }];

    const result = await computeCeredisScore('student1', evidences);

    expect(result.computedAt).toBeDefined();
    expect(result.engineVersion).toBeDefined();
    expect(result.userId).toBe('student1');
  });

  it('devrait valider structure des scores', async () => {
    const evidences: Evidence[] = [{
      competency_id: '1.1',
      score: 80,
      evidence_type: 'P2',
      timestamp: new Date(),
      activity_id: 'act1',
      student_id: 'student1'
    }];

    const result = await computeCeredisScore('student1', evidences);

    expect(result.domainScores).toBeDefined();
    expect(result.competencyScores).toBeDefined();
    expect(result.validation).toBeDefined();
    expect(result.validation).toHaveProperty('valid');
  });
});
