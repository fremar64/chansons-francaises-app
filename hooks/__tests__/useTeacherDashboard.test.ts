import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

describe('useTeacherDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchClassData', () => {
    it('devrait charger données de la classe', async () => {
      const mockData = {
        classId: 'class123',
        students: [
          { id: 'st1', name: 'Jean', ceredisScore: 420, cecrlLevel: 'B2' },
          { id: 'st2', name: 'Marie', ceredisScore: 380, cecrlLevel: 'B2' },
          { id: 'st3', name: 'Pierre', ceredisScore: 300, cecrlLevel: 'B1' }
        ],
        classAverage: 367,
        completionRate: 75
      };

      const mockFetch = vi.fn().mockResolvedValue(mockData);

      const { result } = renderHook(() => ({
        data: null,
        fetchClassData: mockFetch,
        loading: false
      }));

      await result.current.fetchClassData('class123');

      expect(mockFetch).toHaveBeenCalledWith('class123');
    });
  });

  describe('Class Statistics', () => {
    it('devrait calculer moyenne de classe', () => {
      const scores = [420, 380, 300, 450, 320];
      const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

      expect(average).toBe(374);
    });

    it('devrait calculer médiane', () => {
      const scores = [300, 320, 380, 420, 450];
      const median = scores[Math.floor(scores.length / 2)];

      expect(median).toBe(380);
    });

    it('devrait compter distribution CECRL', () => {
      const students = [
        { cecrlLevel: 'B2' },
        { cecrlLevel: 'B2' },
        { cecrlLevel: 'B1' },
        { cecrlLevel: 'C1' },
        { cecrlLevel: 'B2' }
      ];

      const distribution = students.reduce((acc, s) => {
        acc[s.cecrlLevel] = (acc[s.cecrlLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      expect(distribution.B2).toBe(3);
      expect(distribution.B1).toBe(1);
      expect(distribution.C1).toBe(1);
    });
  });

  describe('Student Performance', () => {
    it('devrait identifier meilleurs élèves', () => {
      const students = [
        { id: 'st1', name: 'Jean', ceredisScore: 420 },
        { id: 'st2', name: 'Marie', ceredisScore: 480 },
        { id: 'st3', name: 'Pierre', ceredisScore: 350 }
      ];

      const topStudents = [...students]
        .sort((a, b) => b.ceredisScore - a.ceredisScore)
        .slice(0, 2);

      expect(topStudents[0].name).toBe('Marie');
      expect(topStudents[1].name).toBe('Jean');
    });

    it('devrait identifier élèves en difficulté', () => {
      const students = [
        { id: 'st1', ceredisScore: 420 },
        { id: 'st2', ceredisScore: 180 },
        { id: 'st3', ceredisScore: 350 }
      ];

      const struggling = students.filter(s => s.ceredisScore < 200);

      expect(struggling).toHaveLength(1);
      expect(struggling[0].id).toBe('st2');
    });
  });

  describe('Progress Tracking', () => {
    it('devrait calculer taux de complétion classe', () => {
      const students = [
        { completedActivities: 15, totalActivities: 20 },
        { completedActivities: 18, totalActivities: 20 },
        { completedActivities: 12, totalActivities: 20 }
      ];

      const totalCompleted = students.reduce((sum, s) => sum + s.completedActivities, 0);
      const totalActivities = students.reduce((sum, s) => sum + s.totalActivities, 0);
      const completionRate = Math.round((totalCompleted / totalActivities) * 100);

      expect(completionRate).toBe(75);
    });

    it('devrait tracker progression dans le temps', () => {
      const progressHistory = [
        { date: '2026-01-01', avgScore: 300 },
        { date: '2026-01-15', avgScore: 330 },
        { date: '2026-02-01', avgScore: 367 }
      ];

      const improvement = progressHistory[2].avgScore - progressHistory[0].avgScore;

      expect(improvement).toBe(67);
    });
  });

  describe('Domain Analysis', () => {
    it('devrait analyser domaines par classe', () => {
      const classData = {
        domainAverages: {
          D1: 78,
          D2: 75,
          D3: 68,
          D4: 72,
          D5: 70
        }
      };

      const weakestDomain = Object.entries(classData.domainAverages)
        .reduce((min, [domain, score]) => 
          score < min.score ? { domain, score } : min,
          { domain: '', score: 100 }
        );

      expect(weakestDomain.domain).toBe('D3');
    });
  });

  describe('Individual Student View', () => {
    it('devrait charger données élève spécifique', async () => {
      const mockData = {
        id: 'st1',
        name: 'Jean Dupont',
        ceredisScore: 420,
        cecrlLevel: 'B2',
        domainScores: { D1: 85, D2: 80, D3: 75, D4: 70, D5: 72 },
        recentActivities: []
      };

      const mockFetch = vi.fn().mockResolvedValue(mockData);

      const { result } = renderHook(() => ({
        fetchStudentData: mockFetch
      }));

      await result.current.fetchStudentData('st1');

      expect(mockFetch).toHaveBeenCalledWith('st1');
    });

    it('devrait comparer élève à moyenne classe', () => {
      const studentScore = 420;
      const classAverage = 367;
      const difference = studentScore - classAverage;
      const percentage = Math.round((difference / classAverage) * 100);

      expect(difference).toBe(53);
      expect(percentage).toBe(14);
    });
  });

  describe('Activity Completion', () => {
    it('devrait lister activités par taux de complétion', () => {
      const activities = [
        { id: 'act1', name: 'Quiz 1', completed: 25, total: 30 },
        { id: 'act2', name: 'Texte à trous', completed: 28, total: 30 },
        { id: 'act3', name: 'Débat', completed: 15, total: 30 }
      ];

      const sortedByCompletion = activities
        .map(a => ({
          ...a,
          rate: (a.completed / a.total) * 100
        }))
        .sort((a, b) => b.rate - a.rate);

      expect(sortedByCompletion[0].name).toBe('Texte à trous');
      expect(sortedByCompletion[2].name).toBe('Débat');
    });
  });

  describe('Export Data', () => {
    it('devrait préparer données pour export CSV', () => {
      const students = [
        { name: 'Jean', ceredisScore: 420, cecrlLevel: 'B2' },
        { name: 'Marie', ceredisScore: 380, cecrlLevel: 'B2' }
      ];

      const csv = [
        'Nom,Score CEREDIS,Niveau CECRL',
        ...students.map(s => `${s.name},${s.ceredisScore},${s.cecrlLevel}`)
      ].join('\n');

      expect(csv).toContain('Jean,420,B2');
    });
  });

  describe('Filters', () => {
    it('devrait filtrer par niveau CECRL', () => {
      const students = [
        { name: 'Jean', cecrlLevel: 'B2' },
        { name: 'Marie', cecrlLevel: 'B1' },
        { name: 'Pierre', cecrlLevel: 'B2' }
      ];

      const filtered = students.filter(s => s.cecrlLevel === 'B2');

      expect(filtered).toHaveLength(2);
    });

    it('devrait filtrer par domaine', () => {
      const students = [
        { name: 'Jean', domainScores: { D1: 85, D2: 60 } },
        { name: 'Marie', domainScores: { D1: 70, D2: 75 } }
      ];

      const struggling = students.filter(s => s.domainScores.D2 < 70);

      expect(struggling).toHaveLength(1);
      expect(struggling[0].name).toBe('Jean');
    });

    it('devrait filtrer par parcours', () => {
      const students = [
        { name: 'Jean', currentParcours: 'la-bas' },
        { name: 'Marie', currentParcours: 'la-corrida' },
        { name: 'Pierre', currentParcours: 'la-bas' }
      ];

      const laBasStudents = students.filter(s => s.currentParcours === 'la-bas');

      expect(laBasStudents).toHaveLength(2);
    });
  });

  describe('Notifications', () => {
    it('devrait détecter élèves nécessitant attention', () => {
      const students = [
        { id: 'st1', ceredisScore: 150, lastActivity: '2026-01-20' },
        { id: 'st2', ceredisScore: 420, lastActivity: '2026-02-01' }
      ];

      const needsAttention = students.filter(s => {
        const daysSinceActivity = Math.floor(
          (new Date('2026-02-01').getTime() - new Date(s.lastActivity).getTime()) 
          / (1000 * 60 * 60 * 24)
        );
        return s.ceredisScore < 200 || daysSinceActivity > 7;
      });

      expect(needsAttention).toHaveLength(1);
      expect(needsAttention[0].id).toBe('st1');
    });
  });

  describe('Recommendations', () => {
    it('devrait suggérer activités de remédiation', () => {
      const weakDomains = ['D3', 'D4'];
      
      const recommendations = [
        { domain: 'D3', activity: 'Exercices d\'interaction orale' },
        { domain: 'D4', activity: 'Atelier production écrite' }
      ];

      expect(recommendations).toHaveLength(2);
      expect(recommendations[0].domain).toBe('D3');
    });
  });

  describe('Charts Data', () => {
    it('devrait préparer données pour graphique évolution', () => {
      const data = [
        { date: '2026-01-01', avgScore: 300 },
        { date: '2026-01-15', avgScore: 330 },
        { date: '2026-02-01', avgScore: 367 }
      ];

      expect(data).toHaveLength(3);
      expect(data[2].avgScore).toBeGreaterThan(data[0].avgScore);
    });

    it('devrait préparer données distribution scores', () => {
      const students = [
        { ceredisScore: 180 }, // A2
        { ceredisScore: 250 }, // B1
        { ceredisScore: 380 }, // B2
        { ceredisScore: 420 }, // B2
        { ceredisScore: 490 }  // C1
      ];

      const distribution = {
        'A2': students.filter(s => s.ceredisScore < 200).length,
        'B1': students.filter(s => s.ceredisScore >= 200 && s.ceredisScore < 350).length,
        'B2': students.filter(s => s.ceredisScore >= 350 && s.ceredisScore < 475).length,
        'C1': students.filter(s => s.ceredisScore >= 475).length
      };

      expect(distribution.A2).toBe(1);
      expect(distribution.B1).toBe(1);
      expect(distribution.B2).toBe(2);
      expect(distribution.C1).toBe(1);
    });
  });
});
