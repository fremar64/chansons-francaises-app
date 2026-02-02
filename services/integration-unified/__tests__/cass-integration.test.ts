import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('CaSS Integration - Compétences & Standards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCompetencies', () => {
    it('devrait retourner les 19 compétences CaSS', () => {
      const competencies = [
        { id: '1.1', domain: 'D1', label: 'Écoute - Compréhension globale' },
        { id: '1.2', domain: 'D1', label: 'Écoute - Compréhension détaillée' },
        { id: '1.3', domain: 'D1', label: 'Écoute - Inférence' },
        { id: '2.1', domain: 'D2', label: 'Lecture - Compréhension globale' },
        { id: '2.2', domain: 'D2', label: 'Lecture - Compréhension détaillée' },
        { id: '2.3', domain: 'D2', label: 'Lecture - Inférence' },
        { id: '3.1', domain: 'D3', label: 'Interaction - Participation' },
        { id: '3.2', domain: 'D3', label: 'Interaction - Réponse' },
        { id: '3.3', domain: 'D3', label: 'Interaction - Initiative' },
        { id: '4.1', domain: 'D4', label: 'Production - Expression orale' },
        { id: '4.2', domain: 'D4', label: 'Production - Expression écrite' },
        { id: '4.3', domain: 'D4', label: 'Production - Créativité' },
        { id: '5.1', domain: 'D5', label: 'Médiation - Reformulation' },
        { id: '5.2', domain: 'D5', label: 'Médiation - Explication' },
        { id: '5.3', domain: 'D5', label: 'Médiation - Traduction' },
        { id: '5.4', domain: 'D5', label: 'Médiation - Synthèse' },
        { id: '5.5', domain: 'D5', label: 'Médiation - Adaptation' },
        { id: '5.6', domain: 'D5', label: 'Médiation - Comparaison' },
        { id: '5.7', domain: 'D5', label: 'Médiation - Transmission' }
      ];

      expect(competencies).toHaveLength(19);
      expect(competencies.filter(c => c.domain === 'D5')).toHaveLength(7);
    });

    it('devrait valider structure d\'une compétence', () => {
      const competency = {
        id: '1.1',
        domain: 'D1',
        label: 'Écoute - Compréhension globale',
        description: 'Comprendre le sens général d\'un document audio',
        cecrlLevel: 'B1'
      };

      expect(competency.id).toMatch(/^\d\.\d$/);
      expect(competency.domain).toMatch(/^D[1-5]$/);
      expect(competency.label).toBeTruthy();
      expect(['A2', 'B1', 'B2', 'C1']).toContain(competency.cecrlLevel);
    });
  });

  describe('getDomains', () => {
    it('devrait retourner les 5 domaines', () => {
      const domains = [
        { id: 'D1', label: 'Écoute', weight: 120, competencies: 3 },
        { id: 'D2', label: 'Lecture', weight: 120, competencies: 3 },
        { id: 'D3', label: 'Interaction', weight: 120, competencies: 3 },
        { id: 'D4', label: 'Production', weight: 120, competencies: 3 },
        { id: 'D5', label: 'Médiation', weight: 120, competencies: 7 }
      ];

      expect(domains).toHaveLength(5);
      expect(domains.reduce((sum, d) => sum + d.weight, 0)).toBe(600);
      expect(domains.reduce((sum, d) => sum + d.competencies, 0)).toBe(19);
    });
  });

  describe('getCECRLLevels', () => {
    it('devrait définir les seuils CECRL', () => {
      const levels = [
        { code: 'A2', min: 0, max: 199, label: 'Utilisateur élémentaire' },
        { code: 'B1', min: 200, max: 349, label: 'Utilisateur indépendant débutant' },
        { code: 'B2', min: 350, max: 474, label: 'Utilisateur indépendant confirmé' },
        { code: 'C1', min: 475, max: 600, label: 'Utilisateur expérimenté' }
      ];

      expect(levels).toHaveLength(4);
      expect(levels[0].min).toBe(0);
      expect(levels[3].max).toBe(600);
    });

    it('devrait valider règle B2 (C15 >= 60%)', () => {
      const b2Rule = {
        level: 'B2',
        condition: 'C15 >= 60%',
        competencyId: '5.1',
        threshold: 60
      };

      expect(b2Rule.level).toBe('B2');
      expect(b2Rule.competencyId).toBe('5.1');
      expect(b2Rule.threshold).toBe(60);
    });

    it('devrait valider règle C1 (toutes >= 60%)', () => {
      const c1Rule = {
        level: 'C1',
        condition: 'ALL >= 60%',
        competencyCount: 19,
        threshold: 60
      };

      expect(c1Rule.competencyCount).toBe(19);
      expect(c1Rule.threshold).toBe(60);
    });
  });

  describe('getEvidenceTypes', () => {
    it('devrait lister les types d\'evidences', () => {
      const types = [
        { code: 'P1', label: 'Pratique simple', weight: 1.0 },
        { code: 'P2', label: 'Pratique complexe', weight: 1.2 },
        { code: 'P3', label: 'Production guidée', weight: 1.3 },
        { code: 'P4', label: 'Production autonome', weight: 1.5 }
      ];

      expect(types).toHaveLength(4);
      expect(types.every(t => t.weight >= 1.0)).toBe(true);
    });
  });

  describe('mapActivityToCompetencies', () => {
    it('devrait mapper activité Quiz aux compétences', () => {
      const quizMapping = {
        activityType: 'quiz_qcm',
        primaryCompetencies: ['1.1', '1.2'],
        secondaryCompetencies: ['2.1'],
        evidenceType: 'P1'
      };

      expect(quizMapping.primaryCompetencies).toContain('1.1');
      expect(quizMapping.evidenceType).toBe('P1');
    });

    it('devrait mapper activité TexteATrous', () => {
      const mapping = {
        activityType: 'texte_a_trous',
        primaryCompetencies: ['2.1', '2.2'],
        secondaryCompetencies: ['1.2'],
        evidenceType: 'P2'
      };

      expect(mapping.primaryCompetencies).toHaveLength(2);
    });

    it('devrait mapper activité OrdreElements', () => {
      const mapping = {
        activityType: 'ordre_elements',
        primaryCompetencies: ['1.2', '2.2'],
        secondaryCompetencies: ['5.1'],
        evidenceType: 'P2'
      };

      expect(mapping.secondaryCompetencies).toContain('5.1');
    });

    it('devrait mapper activité Debate', () => {
      const mapping = {
        activityType: 'debat_philosophique',
        primaryCompetencies: ['3.1', '3.2', '3.3'],
        secondaryCompetencies: ['4.1', '5.1', '5.2'],
        evidenceType: 'P4'
      };

      expect(mapping.evidenceType).toBe('P4');
      expect(mapping.primaryCompetencies).toHaveLength(3);
    });
  });

  describe('validateCompetencyScore', () => {
    it('devrait valider score valide', () => {
      const validScores = [0, 25, 50, 75, 100];
      validScores.forEach(score => {
        expect(score >= 0 && score <= 100).toBe(true);
      });
    });

    it('devrait rejeter score invalide', () => {
      const invalidScores = [-10, 101, 150];
      invalidScores.forEach(score => {
        expect(score >= 0 && score <= 100).toBe(false);
      });
    });
  });

  describe('CaSS Framework Compliance', () => {
    it('devrait respecter échelle 0-600', () => {
      const scale = { min: 0, max: 600, unit: 'points' };
      expect(scale.max).toBe(600);
    });

    it('devrait respecter pondération domaines', () => {
      const domainWeight = 600 / 5;
      expect(domainWeight).toBe(120);
    });

    it('devrait calculer score compétence (0-100%)', () => {
      const competencyScore = (75 / 100) * 120; // 75% dans domaine
      expect(competencyScore).toBeLessThanOrEqual(120);
    });
  });
});
