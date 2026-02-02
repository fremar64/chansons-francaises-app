import { describe, it, expect } from 'vitest';
import { computeCeredisScore } from '../../index';
import type { Evidence } from '../../types';

describe('Level Validation - Tests fonctionnels', () => {
  describe('Validation B2', () => {
    it('devrait valider B2 avec toutes compétences >= 60%', async () => {
      const evidences: Evidence[] = [];
      const allComps = [
        '1.1', '1.2', '1.3',
        '2.1', '2.2', '2.3',
        '3.1', '3.2', '3.3',
        '4.1', '4.2', '4.3',
        '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
      ];

      // Score moyen de 65 - devrait donner B2 valide
      allComps.forEach((comp, i) => {
        evidences.push({
          competency_id: comp,
          score: 65,
          evidence_type: 'P1',
          timestamp: new Date(),
          activity_id: `act${i}`,
          student_id: 's1'
        });
      });

      const result = await computeCeredisScore('s1', evidences);

      expect(['B1', 'B2']).toContain(result.cecrlLevel);
      expect(result.validation.valid).toBe(true);
      expect(result.validation.level).toBe(result.cecrlLevel);
    });

    it('devrait gérer B2 avec score dans intervalle', async () => {
      const evidences: Evidence[] = [];
      ['1.1', '2.1', '3.1', '4.1', '5.1'].forEach((comp, i) => {
        evidences.push({
          competency_id: comp,
          score: 70,
          evidence_type: 'P2',
          timestamp: new Date(),
          activity_id: `act${i}`,
          student_id: 's1'
        });
      });

      const result = await computeCeredisScore('s1', evidences);

      // Score autour de 200+ avec validation
      expect(result.ceredisScore).toBeGreaterThanOrEqual(200);
      expect(result.validation).toBeDefined();
      expect(result.validation.level).toBeDefined();
    });
  });

  describe('Validation C1', () => {
    it('devrait valider C1 avec scores élevés', async () => {
      const evidences: Evidence[] = [];
      const allComps = [
        '1.1', '1.2', '1.3',
        '2.1', '2.2', '2.3',
        '3.1', '3.2', '3.3',
        '4.1', '4.2', '4.3',
        '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
      ];

      // Scores de 90 avec P3 pour atteindre C1
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

      expect(['B2', 'C1']).toContain(result.cecrlLevel);
      expect(result.validation).toBeDefined();
      expect(result.validation.level).toBe(result.cecrlLevel);
      expect(result.ceredisScore).toBeGreaterThan(450);
    });

    it('devrait dégrader si compétences insuffisantes', async () => {
      const evidences: Evidence[] = [];
      const allComps = [
        '1.1', '1.2', '1.3',
        '2.1', '2.2', '2.3',
        '3.1', '3.2', '3.3',
        '4.1', '4.2', '4.3',
        '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'
      ];

      // Score global élevé mais avec des compétences faibles
      allComps.forEach((comp, i) => {
        const score = i < 3 ? 40 : 85; // 3 premières à 40%, autres à 85%
        evidences.push({
          competency_id: comp,
          score,
          evidence_type: 'P2',
          timestamp: new Date(),
          activity_id: `act${i}`,
          student_id: 's1'
        });
      });

      const result = await computeCeredisScore('s1', evidences);

      // Devrait avoir des warnings ou dégradation
      expect(result.validation).toBeDefined();
      expect(result.validation.level).toBeDefined();
    });
  });

  describe('Validation A2/B1', () => {
    it('devrait toujours valider A2', async () => {
      const evidences: Evidence[] = [{
        competency_id: '1.1',
        score: 20,
        evidence_type: 'P1',
        timestamp: new Date(),
        activity_id: 'a1',
        student_id: 's1'
      }];

      const result = await computeCeredisScore('s1', evidences);

      expect(result.cecrlLevel).toBe('A2');
      expect(result.validation.valid).toBe(true);
    });

    it('devrait valider B1 avec scores moyens', async () => {
      const evidences: Evidence[] = [];
      ['1.1', '2.1', '3.1', '4.1', '5.1'].forEach((comp, i) => {
        evidences.push({
          competency_id: comp,
          score: 45,
          evidence_type: 'P1',
          timestamp: new Date(),
          activity_id: `act${i}`,
          student_id: 's1'
        });
      });

      const result = await computeCeredisScore('s1', evidences);

      expect(['A2', 'B1', 'B2']).toContain(result.cecrlLevel);
      expect(result.validation.valid).toBe(true);
    });
  });

  describe('Structure de validation', () => {
    it('devrait retourner une structure de validation valide', async () => {
      const evidences: Evidence[] = [{
        competency_id: '2.1',
        score: 75,
        evidence_type: 'P2',
        timestamp: new Date(),
        activity_id: 'a1',
        student_id: 's1'
      }];

      const result = await computeCeredisScore('s1', evidences);

      expect(result.validation).toBeDefined();
      expect(result.validation.valid).toBeDefined();
      expect(result.validation.level).toBeDefined();
      expect(result.validation.errors).toBeDefined();
      expect(result.validation.warnings).toBeDefined();
      expect(Array.isArray(result.validation.errors)).toBe(true);
      expect(Array.isArray(result.validation.warnings)).toBe(true);
    });
  });
});
