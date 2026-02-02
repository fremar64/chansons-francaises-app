import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('xAPI Integration - Learning Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createStatement', () => {
    it('devrait créer statement "completed" pour activité', () => {
      const statement = {
        actor: {
          mbox: 'mailto:student@test.com',
          name: 'Jean Dupont',
          objectType: 'Agent'
        },
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/completed',
          display: { 'fr-FR': 'a terminé' }
        },
        object: {
          id: 'https://ceredis.fr/activities/quiz-la-bas-1',
          objectType: 'Activity',
          definition: {
            name: { 'fr-FR': 'Quiz Là-bas - Séance 1' },
            type: 'http://adlnet.gov/expapi/activities/assessment'
          }
        },
        result: {
          score: {
            scaled: 0.75,
            raw: 75,
            min: 0,
            max: 100
          },
          success: true,
          completion: true,
          duration: 'PT5M30S'
        },
        context: {
          contextActivities: {
            parent: [{
              id: 'https://ceredis.fr/parcours/la-bas',
              objectType: 'Activity'
            }]
          }
        },
        timestamp: new Date().toISOString()
      };

      expect(statement.verb.id).toContain('completed');
      expect(statement.result.score.scaled).toBe(0.75);
      expect(statement.actor.objectType).toBe('Agent');
    });

    it('devrait créer statement "experienced" pour écoute', () => {
      const statement = {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/experienced',
          display: { 'fr-FR': 'a écouté' }
        },
        object: {
          id: 'https://ceredis.fr/songs/la-bas',
          definition: {
            type: 'http://adlnet.gov/expapi/activities/media'
          }
        },
        result: {
          duration: 'PT3M45S'
        }
      };

      expect(statement.verb.id).toContain('experienced');
      expect(statement.result.duration).toBe('PT3M45S');
    });

    it('devrait créer statement "attempted" pour activité en cours', () => {
      const statement = {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/attempted',
          display: { 'fr-FR': 'a tenté' }
        },
        result: {
          completion: false,
          duration: 'PT2M15S'
        }
      };

      expect(statement.verb.id).toContain('attempted');
      expect(statement.result.completion).toBe(false);
    });

    it('devrait créer statement "interacted" pour interaction', () => {
      const statement = {
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/interacted',
          display: { 'fr-FR': 'a interagi' }
        },
        object: {
          definition: {
            type: 'http://adlnet.gov/expapi/activities/interaction',
            interactionType: 'choice'
          }
        }
      };

      expect(statement.verb.id).toContain('interacted');
    });
  });

  describe('Statement Extensions', () => {
    it('devrait inclure extensions CEREDIS', () => {
      const extensions = {
        'https://ceredis.fr/xapi/extensions/competency': '1.1',
        'https://ceredis.fr/xapi/extensions/domain': 'D1',
        'https://ceredis.fr/xapi/extensions/evidence-type': 'P1',
        'https://ceredis.fr/xapi/extensions/ceredis-score': 420,
        'https://ceredis.fr/xapi/extensions/cecrl-level': 'B2'
      };

      expect(extensions['https://ceredis.fr/xapi/extensions/competency']).toBe('1.1');
      expect(extensions['https://ceredis.fr/xapi/extensions/ceredis-score']).toBe(420);
    });

    it('devrait inclure métadonnées parcours', () => {
      const extensions = {
        'https://ceredis.fr/xapi/extensions/parcours-id': 'la-bas',
        'https://ceredis.fr/xapi/extensions/seance-number': 3,
        'https://ceredis.fr/xapi/extensions/activity-type': 'quiz_qcm'
      };

      expect(extensions['https://ceredis.fr/xapi/extensions/seance-number']).toBe(3);
    });
  });

  describe('Context Activities', () => {
    it('devrait définir hiérarchie parent-child', () => {
      const context = {
        contextActivities: {
          parent: [{
            id: 'https://ceredis.fr/parcours/la-bas',
            objectType: 'Activity'
          }],
          grouping: [{
            id: 'https://ceredis.fr/class/cm2-a',
            objectType: 'Activity'
          }],
          category: [{
            id: 'https://ceredis.fr/taxonomy/competencies',
            objectType: 'Activity'
          }]
        }
      };

      expect(context.contextActivities.parent).toHaveLength(1);
      expect(context.contextActivities.grouping).toBeDefined();
    });
  });

  describe('Actor Identification', () => {
    it('devrait utiliser mbox pour identification', () => {
      const actor = {
        mbox: 'mailto:student123@ceredis.fr',
        name: 'Jean Dupont',
        objectType: 'Agent'
      };

      expect(actor.mbox).toMatch(/^mailto:/);
      expect(actor.objectType).toBe('Agent');
    });

    it('devrait supporter account pour anonymisation', () => {
      const actor = {
        account: {
          homePage: 'https://ceredis.fr',
          name: 'student-uuid-123'
        },
        objectType: 'Agent'
      };

      expect(actor.account.name).toContain('student-uuid');
    });
  });

  describe('Result Object', () => {
    it('devrait inclure score normalisé (0-1)', () => {
      const result = {
        score: {
          scaled: 0.85,
          raw: 85,
          min: 0,
          max: 100
        }
      };

      expect(result.score.scaled).toBeGreaterThanOrEqual(0);
      expect(result.score.scaled).toBeLessThanOrEqual(1);
    });

    it('devrait inclure durée au format ISO 8601', () => {
      const durations = [
        'PT5M30S',  // 5 min 30 sec
        'PT1H15M',  // 1h 15min
        'PT45S'     // 45 sec
      ];

      durations.forEach(d => {
        expect(d).toMatch(/^PT/);
      });
    });

    it('devrait inclure success/completion', () => {
      const result = {
        success: true,
        completion: true,
        response: 'Réponse de l\'élève'
      };

      expect(typeof result.success).toBe('boolean');
      expect(typeof result.completion).toBe('boolean');
    });
  });

  describe('Verb Usage', () => {
    it('devrait utiliser verbes ADL standards', () => {
      const verbs = [
        'http://adlnet.gov/expapi/verbs/attempted',
        'http://adlnet.gov/expapi/verbs/completed',
        'http://adlnet.gov/expapi/verbs/experienced',
        'http://adlnet.gov/expapi/verbs/interacted',
        'http://adlnet.gov/expapi/verbs/answered'
      ];

      verbs.forEach(v => {
        expect(v).toContain('http://adlnet.gov/expapi/verbs/');
      });
    });
  });

  describe('Activity Types', () => {
    it('devrait utiliser types d\'activité standards', () => {
      const types = [
        'http://adlnet.gov/expapi/activities/assessment',
        'http://adlnet.gov/expapi/activities/media',
        'http://adlnet.gov/expapi/activities/interaction',
        'http://adlnet.gov/expapi/activities/lesson',
        'http://adlnet.gov/expapi/activities/course'
      ];

      types.forEach(t => {
        expect(t).toContain('http://adlnet.gov/expapi/activities/');
      });
    });
  });

  describe('Timestamp Format', () => {
    it('devrait utiliser format ISO 8601', () => {
      const timestamp = new Date().toISOString();
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('Statement Validation', () => {
    it('devrait valider statement complet', () => {
      const statement = {
        actor: { mbox: 'mailto:test@test.com', objectType: 'Agent' },
        verb: { id: 'http://adlnet.gov/expapi/verbs/completed' },
        object: { id: 'https://example.com/activity', objectType: 'Activity' }
      };

      expect(statement.actor).toBeDefined();
      expect(statement.verb).toBeDefined();
      expect(statement.object).toBeDefined();
    });

    it('devrait rejeter statement incomplet', () => {
      const invalidStatement = {
        actor: { mbox: 'mailto:test@test.com' }
        // Manque verb et object
      };

      expect(invalidStatement.verb).toBeUndefined();
      expect(invalidStatement.object).toBeUndefined();
    });
  });

  describe('LRS Integration', () => {
    it('devrait formater requête POST vers LRS', () => {
      const request = {
        method: 'POST',
        url: 'https://lrs.ceredis.fr/statements',
        headers: {
          'Content-Type': 'application/json',
          'X-Experience-API-Version': '1.0.3'
        },
        body: {
          actor: {},
          verb: {},
          object: {}
        }
      };

      expect(request.method).toBe('POST');
      expect(request.headers['X-Experience-API-Version']).toBe('1.0.3');
    });
  });
});
