import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../../index';
import type { Evidence } from '../../types';

describe('CEREDIS Score Calculator - Tests fonctionnels', () => {
  it('devrait calculer le score CEREDIS global (0-600)', async () => {
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

    expect(result.ceredisScore).toBeGreaterThan(350);
    expect(result.ceredisScore).toBeLessThan(475);
  });

  it('devrait retourner 0 pour des scores nuls', async () => {
    const result = await computeCeredisScore('s1', []);

    expect(result.ceredisScore).toBe(0);
  });

  it('devrait retourner 600 pour des scores parfaits', async () => {
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
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act${i}`,
        student_id: 's1'
      });
    });

    const result = await computeCeredisScore('s1', evidences);

    expect(result.ceredisScore).toBeGreaterThan(590);
    expect(result.ceredisScore).toBeLessThanOrEqual(600);
  });

  it('devrait calculer correctement avec score moyen de 50%', async () => {
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

    // 50% de 600 = 300
    expect(result.ceredisScore).toBeGreaterThan(270);
    expect(result.ceredisScore).toBeLessThan(330);
  });

  it('devrait pondérer tous les domaines équitablement', async () => {
    // Chaque domaine vaut 120 points sur 600
    const evidences: Evidence[] = [];
    
    // Domaine 1: 100%
    ['1.1', '1.2', '1.3'].forEach(comp => {
      evidences.push({
        competency_id: comp,
        score: 100,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: `act-${comp}`,
        student_id: 's1'
      });
    });

    // Domaines 2-5: 0%
    const result = await computeCeredisScore('s1', evidences);

    // Score devrait être ~120 (1 domaine sur 5)
    expect(result.ceredisScore).toBeGreaterThan(100);
    expect(result.ceredisScore).toBeLessThan(140);
  });

  it('devrait correspondre aux seuils CECRL', async () => {
    // A2: < 200
    // B1: 200-349
    // B2: 350-474
    // C1: 475-600
    
    const evidences: Evidence[] = [];
    const allComps = [
      '1.1', '1.2', '1.3',
      '2.1', '2.2', '2.3',
      '3.1', '3.2', '3.3',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
    ];

    // Score ~420 (B2)
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

    expect(result.ceredisScore).toBeGreaterThanOrEqual(200);
    expect(result.cecrlLevel).toMatch(/B1|B2/);
  });
});
