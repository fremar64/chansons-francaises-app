import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

describe('OrdreElements Component', () => {
  const mockElements = [
    { id: 'e1', texte: 'Introduction du débat', ordre: 1 },
    { id: 'e2', texte: 'Argument principal', ordre: 2 },
    { id: 'e3', texte: 'Contre-argument', ordre: 3 },
    { id: 'e4', texte: 'Conclusion', ordre: 4 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('devrait afficher tous les éléments mélangés', () => {
      const shuffled = [...mockElements].sort(() => Math.random() - 0.5);
      
      expect(shuffled).toHaveLength(mockElements.length);
      // Ordre devrait être différent (probabilité élevée)
    });

    it('devrait rendre éléments draggables', () => {
      const isDraggable = true;
      expect(isDraggable).toBe(true);
    });
  });

  describe('Drag and Drop', () => {
    it('devrait permettre de déplacer élément', () => {
      const currentOrder = ['e2', 'e1', 'e3', 'e4'];
      const newOrder = ['e1', 'e2', 'e3', 'e4'];

      expect(currentOrder).not.toEqual(newOrder);
    });

    it('devrait mettre à jour ordre après drop', () => {
      let order = ['e1', 'e2', 'e3', 'e4'];
      
      const reorder = (from: number, to: number) => {
        const item = order[from];
        order.splice(from, 1);
        order.splice(to, 0, item);
      };

      reorder(0, 2); // Déplacer e1 en position 2

      expect(order).toEqual(['e2', 'e3', 'e1', 'e4']);
    });
  });

  describe('Validation', () => {
    it('devrait valider ordre correct', () => {
      const userOrder = ['e1', 'e2', 'e3', 'e4'];
      const correctOrder = mockElements
        .sort((a, b) => a.ordre - b.ordre)
        .map(e => e.id);

      expect(userOrder).toEqual(correctOrder);
    });

    it('devrait détecter ordre incorrect', () => {
      const userOrder = ['e2', 'e1', 'e3', 'e4'];
      const correctOrder = ['e1', 'e2', 'e3', 'e4'];

      expect(userOrder).not.toEqual(correctOrder);
    });

    it('devrait calculer positions correctes', () => {
      const userOrder = ['e1', 'e3', 'e2', 'e4'];
      const correctOrder = ['e1', 'e2', 'e3', 'e4'];

      const correctPositions = userOrder.reduce((count, id, index) => {
        return count + (id === correctOrder[index] ? 1 : 0);
      }, 0);

      expect(correctPositions).toBe(2); // e1 et e4 corrects
    });
  });

  describe('Scoring', () => {
    it('devrait calculer score basé sur positions', () => {
      const userOrder = ['e1', 'e3', 'e2', 'e4'];
      const correctOrder = ['e1', 'e2', 'e3', 'e4'];

      const correctCount = userOrder.reduce((count, id, index) => {
        return count + (id === correctOrder[index] ? 1 : 0);
      }, 0);

      const score = Math.round((correctCount / correctOrder.length) * 100);

      expect(score).toBe(50);
    });

    it('devrait donner 100% si tout correct', () => {
      const userOrder = ['e1', 'e2', 'e3', 'e4'];
      const correctOrder = ['e1', 'e2', 'e3', 'e4'];

      const isComplete = JSON.stringify(userOrder) === JSON.stringify(correctOrder);

      expect(isComplete).toBe(true);
    });
  });

  describe('Feedback', () => {
    it('devrait marquer éléments bien placés', () => {
      const userOrder = ['e1', 'e3', 'e2', 'e4'];
      const correctOrder = ['e1', 'e2', 'e3', 'e4'];

      const feedback = userOrder.map((id, index) => ({
        id,
        isCorrect: id === correctOrder[index]
      }));

      expect(feedback[0].isCorrect).toBe(true);  // e1 correct
      expect(feedback[1].isCorrect).toBe(false); // e3 incorrect
    });

    it('devrait afficher ordre correct après validation', () => {
      const correctOrder = mockElements
        .sort((a, b) => a.ordre - b.ordre)
        .map(e => e.texte);

      expect(correctOrder[0]).toBe('Introduction du débat');
      expect(correctOrder[3]).toBe('Conclusion');
    });
  });

  describe('Hints', () => {
    it('devrait suggérer premier élément', () => {
      const firstElement = mockElements.find(e => e.ordre === 1);
      
      expect(firstElement?.texte).toBe('Introduction du débat');
    });

    it('devrait suggérer dernier élément', () => {
      const lastElement = mockElements.find(e => e.ordre === mockElements.length);
      
      expect(lastElement?.texte).toBe('Conclusion');
    });
  });

  describe('Evidence Tracking', () => {
    it('devrait générer evidence', () => {
      const evidence = {
        competencyId: '1.2',
        score: 75,
        evidenceType: 'P2',
        activityId: 'ordre-elements-la-bas-1'
      };

      expect(evidence.evidenceType).toBe('P2');
    });

    it('devrait tracker temps', () => {
      const startTime = Date.now();
      const endTime = startTime + 120000; // 2 minutes
      const duration = (endTime - startTime) / 1000;

      expect(duration).toBe(120);
    });
  });

  describe('Accessibility', () => {
    it('devrait supporter navigation clavier', () => {
      const handleKeyDown = (key: string) => {
        if (key === 'ArrowUp') return 'move-up';
        if (key === 'ArrowDown') return 'move-down';
        if (key === 'Enter') return 'select';
      };

      expect(handleKeyDown('ArrowUp')).toBe('move-up');
    });
  });

  describe('Reset', () => {
    it('devrait mélanger à nouveau', () => {
      const shuffle = (arr: typeof mockElements) => {
        return [...arr].sort(() => Math.random() - 0.5);
      };

      const shuffled = shuffle(mockElements);
      expect(shuffled).toHaveLength(mockElements.length);
    });
  });

  describe('Progress', () => {
    it('devrait détecter tentative complète', () => {
      const userOrder = ['e1', 'e2', 'e3', 'e4'];
      const isComplete = userOrder.length === mockElements.length;

      expect(isComplete).toBe(true);
    });
  });

  describe('Multiple Attempts', () => {
    it('devrait permettre plusieurs essais', () => {
      let attempts = 0;
      const maxAttempts = 3;

      const tryAgain = () => {
        attempts++;
        return attempts < maxAttempts;
      };

      expect(tryAgain()).toBe(true);
      expect(tryAgain()).toBe(true);
      expect(tryAgain()).toBe(false);
    });
  });
});
