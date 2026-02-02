import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../../index';
import type { Evidence } from '../../types';

describe('Domain Calculator - Tests fonctionnels', () => {
  it('devrait calculer scores pour les 5 domaines', async () => {
    const evidences: Evidence[] = [];
    
    // Au moins une evidence par domaine
    ['1.1', '2.1', '3.1', '4.1', '5.1'].forEach((comp, i) => {
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

    expect(result.domainScores).toBeDefined();
    expect(result.domainScores.D1).toBeGreaterThan(0);
    expect(result.domainScores.D2).toBeGreaterThan(0);
    expect(result.domainScores.D3).toBeGreaterThan(0);
    expect(result.domainScores.D4).toBeGreaterThan(0);
    expect(result.domainScores.D5).toBeGreaterThan(0);
  });

  it('devrait calculer D1 (Écoute) comme moyenne de 1.1, 1.2, 1.3', async () => {
    const evidences: Evidence[] = [
      { competency_id: '1.1', score: 60, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a1', student_id: 's1' },
      { competency_id: '1.2', score: 70, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a2', student_id: 's1' },
      { competency_id: '1.3', score: 80, evidence_type: 'P1', timestamp: new Date(), activity_id: 'a3', student_id: 's1' }
    ];

    const result = await computeCeredisScore('s1', evidences);

    // Moyenne devrait être ~70
    expect(result.domainScores.D1).toBeGreaterThan(65);
    expect(result.domainScores.D1).toBeLessThan(75);
  });

  it('devrait calculer D5 (Médiation) avec 7 compétences', async () => {
    const evidences: Evidence[] = [];
    
    ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'].forEach((comp, i) => {
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

    expect(result.domainScores.D5).toBeGreaterThan(0);
    expect(result.domainScores.D5).toBeLessThanOrEqual(100);
  });

  it('devrait retourner 0 pour domaines sans compétences évaluées', async () => {
    const evidences: Evidence[] = [{
      competency_id: '1.1',
      score: 75,
      evidence_type: 'P1',
      timestamp: new Date(),
      activity_id: 'a1',
      student_id: 's1'
    }];

    const result = await computeCeredisScore('s1', evidences);

    // D2, D3, D4 sans evidences devraient être 0
    expect(result.domainScores.D2 || 0).toBe(0);
    expect(result.domainScores.D3 || 0).toBe(0);
  });

  it('devrait produire des scores dans la plage 0-100', async () => {
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
        score: Math.random() * 100,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    Object.values(result.domainScores).forEach(score => {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  it('devrait être cohérent avec des scores équilibrés', async () => {
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
        score: 70,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    // Tous les domaines devraient être autour de 70
    Object.values(result.domainScores).forEach(score => {
      expect(score).toBeGreaterThan(65);
      expect(score).toBeLessThan(75);
    });
  });
});
