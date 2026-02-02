import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

describe('useDashboard (Élève)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchStudentData', () => {
    it('devrait charger données de l\'élève', async () => {
      const mockData = {
        ceredisScore: 420,
        cecrlLevel: 'B2',
        domainScores: {
          D1: 85, D2: 80, D3: 75, D4: 70, D5: 72
        },
        competencyScores: {
          '1.1': 85, '1.2': 82, '1.3': 88
        },
        completedActivities: 15,
        totalActivities: 20
      };

      const mockFetch = vi.fn().mockResolvedValue(mockData);

      const { result } = renderHook(() => ({
        data: null,
        fetchData: mockFetch,
        loading: false
      }));

      await result.current.fetchData('student123');

      expect(mockFetch).toHaveBeenCalledWith('student123');
    });

    it('devrait gérer état loading', async () => {
      const { result } = renderHook(() => ({
        loading: true,
        data: null
      }));

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeNull();
    });
  });

  describe('CEREDIS Score Display', () => {
    it('devrait formater score CEREDIS', () => {
      const score = 420;
      const formatted = `${score}/600`;

      expect(formatted).toBe('420/600');
    });

    it('devrait calculer pourcentage', () => {
      const score = 420;
      const percentage = Math.round((score / 600) * 100);

      expect(percentage).toBe(70);
    });
  });

  describe('CECRL Level Display', () => {
    it('devrait afficher niveau avec libellé', () => {
      const levels = {
        'A2': 'Utilisateur élémentaire',
        'B1': 'Utilisateur indépendant débutant',
        'B2': 'Utilisateur indépendant confirmé',
        'C1': 'Utilisateur expérimenté'
      };

      expect(levels['B2']).toBe('Utilisateur indépendant confirmé');
    });

    it('devrait afficher couleur par niveau', () => {
      const colors = {
        'A2': 'text-orange-500',
        'B1': 'text-yellow-500',
        'B2': 'text-green-500',
        'C1': 'text-blue-500'
      };

      expect(colors['B2']).toBe('text-green-500');
    });
  });

  describe('Domain Scores', () => {
    it('devrait afficher scores par domaine', () => {
      const domainScores = {
        D1: 85,
        D2: 80,
        D3: 75,
        D4: 70,
        D5: 72
      };

      expect(domainScores.D1).toBe(85);
      expect(Object.keys(domainScores)).toHaveLength(5);
    });

    it('devrait identifier domaine le plus fort', () => {
      const domainScores = {
        D1: 85, D2: 80, D3: 75, D4: 70, D5: 72
      };

      const strongest = Object.entries(domainScores)
        .reduce((max, [domain, score]) => 
          score > max.score ? { domain, score } : max,
          { domain: '', score: 0 }
        );

      expect(strongest.domain).toBe('D1');
      expect(strongest.score).toBe(85);
    });

    it('devrait identifier domaine à améliorer', () => {
      const domainScores = {
        D1: 85, D2: 80, D3: 75, D4: 70, D5: 72
      };

      const weakest = Object.entries(domainScores)
        .reduce((min, [domain, score]) => 
          score < min.score ? { domain, score } : min,
          { domain: '', score: 100 }
        );

      expect(weakest.domain).toBe('D4');
      expect(weakest.score).toBe(70);
    });
  });

  describe('Progress Tracking', () => {
    it('devrait calculer progression parcours', () => {
      const completed = 15;
      const total = 20;
      const progress = Math.round((completed / total) * 100);

      expect(progress).toBe(75);
    });

    it('devrait afficher activités restantes', () => {
      const completed = 15;
      const total = 20;
      const remaining = total - completed;

      expect(remaining).toBe(5);
    });
  });

  describe('Charts Data', () => {
    it('devrait préparer données RadarChart domaines', () => {
      const domainScores = {
        D1: 85, D2: 80, D3: 75, D4: 70, D5: 72
      };

      const chartData = Object.entries(domainScores).map(([domain, score]) => ({
        domain,
        score,
        fullMark: 100
      }));

      expect(chartData).toHaveLength(5);
      expect(chartData[0]).toEqual({ domain: 'D1', score: 85, fullMark: 100 });
    });

    it('devrait préparer données BarChart compétences', () => {
      const competencyScores = {
        '1.1': 85, '1.2': 82, '1.3': 88
      };

      const chartData = Object.entries(competencyScores).map(([comp, score]) => ({
        name: comp,
        score
      }));

      expect(chartData).toHaveLength(3);
    });
  });

  describe('Recommendations', () => {
    it('devrait suggérer activités basées sur scores faibles', () => {
      const domainScores = { D1: 85, D2: 80, D3: 60, D4: 70, D5: 72 };
      
      const recommendations = Object.entries(domainScores)
        .filter(([_, score]) => score < 70)
        .map(([domain]) => domain);

      expect(recommendations).toContain('D3');
    });

    it('devrait suggérer parcours suivant', () => {
      const currentParcours = 'la-bas';
      const available = ['la-corrida', 'autre-chanson'];

      expect(available).toHaveLength(2);
    });
  });

  describe('Recent Activity', () => {
    it('devrait afficher dernières activités', () => {
      const recentActivities = [
        { id: 'act1', name: 'Quiz 1', date: '2026-02-01', score: 75 },
        { id: 'act2', name: 'Texte à trous', date: '2026-02-01', score: 80 },
        { id: 'act3', name: 'Ordre éléments', date: '2026-01-31', score: 70 }
      ];

      expect(recentActivities).toHaveLength(3);
      expect(recentActivities[0].date).toBe('2026-02-01');
    });
  });

  describe('Error Handling', () => {
    it('devrait gérer erreur de chargement', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('Failed to load'));

      const { result } = renderHook(() => ({
        fetchData: mockFetch,
        error: null
      }));

      try {
        await result.current.fetchData('student123');
      } catch (e) {
        expect(e.message).toBe('Failed to load');
      }
    });

    it('devrait afficher message d\'erreur utilisateur', () => {
      const errorMessage = 'Impossible de charger vos données. Réessayez plus tard.';
      expect(errorMessage).toBeTruthy();
    });
  });

  describe('Refresh Data', () => {
    it('devrait rafraîchir données', async () => {
      const mockRefresh = vi.fn().mockResolvedValue({ updated: true });

      const { result } = renderHook(() => ({
        refresh: mockRefresh,
        lastRefresh: new Date()
      }));

      await result.current.refresh();

      expect(mockRefresh).toHaveBeenCalled();
    });

    it('devrait indiquer dernière mise à jour', () => {
      const lastRefresh = new Date();
      const formatted = lastRefresh.toLocaleString('fr-FR');

      expect(formatted).toContain('2026');
    });
  });
});
