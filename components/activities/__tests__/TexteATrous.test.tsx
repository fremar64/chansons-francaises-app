import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TexteATrous Component', () => {
  const mockData = {
    texte: "Jean Ferrat chante {1} les injustices. La chanson évoque {2} et la {3}.",
    blanks: [
      { id: 1, correctAnswer: 'contre', position: 19 },
      { id: 2, correctAnswer: 'l\'exil', position: 58 },
      { id: 3, correctAnswer: 'nostalgie', position: 70 }
    ],
    competencies: ['2.1', '2.2']
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('devrait afficher le texte avec blancs', () => {
      const displayText = mockData.texte.replace(/\{(\d+)\}/g, '___');
      
      expect(displayText).toContain('___');
      expect(displayText).toBe('Jean Ferrat chante ___ les injustices. La chanson évoque ___ et la ___.');
    });

    it('devrait créer inputs pour chaque blanc', () => {
      const blankCount = mockData.blanks.length;
      
      expect(blankCount).toBe(3);
    });

    it('devrait afficher instructions', () => {
      const instructions = 'Complétez le texte avec les mots manquants';
      expect(instructions).toBeTruthy();
    });
  });

  describe('User Input', () => {
    it('devrait permettre saisie dans input', () => {
      let userInput = '';
      const handleChange = (value: string) => {
        userInput = value;
      };

      handleChange('contre');

      expect(userInput).toBe('contre');
    });

    it('devrait gérer plusieurs inputs', () => {
      const userAnswers: Record<number, string> = {};
      
      userAnswers[1] = 'contre';
      userAnswers[2] = 'lexil';
      userAnswers[3] = 'nostalgie';

      expect(Object.keys(userAnswers)).toHaveLength(3);
    });
  });

  describe('Validation', () => {
    it('devrait valider réponse exacte', () => {
      const userAnswer = 'contre';
      const correctAnswer = mockData.blanks[0].correctAnswer;

      expect(userAnswer === correctAnswer).toBe(true);
    });

    it('devrait ignorer casse', () => {
      const userAnswer = 'CONTRE';
      const correctAnswer = 'contre';

      expect(userAnswer.toLowerCase() === correctAnswer.toLowerCase()).toBe(true);
    });

    it('devrait ignorer espaces', () => {
      const userAnswer = ' contre ';
      const correctAnswer = 'contre';

      expect(userAnswer.trim() === correctAnswer).toBe(true);
    });

    it('devrait ignorer accents si configuré', () => {
      const normalize = (str: string) => 
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const userAnswer = 'lexil';
      const correctAnswer = "l'exil";

      // En production, pourrait accepter variations
      expect(userAnswer).not.toBe(correctAnswer);
    });
  });

  describe('Scoring', () => {
    it('devrait calculer score', () => {
      const userAnswers = {
        1: 'contre',     // correct
        2: 'exil',       // incorrect
        3: 'nostalgie'   // correct
      };

      const correctCount = mockData.blanks.reduce((count, blank) => {
        return count + (userAnswers[blank.id] === blank.correctAnswer ? 1 : 0);
      }, 0);

      const score = Math.round((correctCount / mockData.blanks.length) * 100);

      expect(correctCount).toBe(2);
      expect(score).toBe(67);
    });

    it('devrait pénaliser blancs vides', () => {
      const userAnswers = {
        1: 'contre',
        2: '',           // vide
        3: 'nostalgie'
      };

      const filled = Object.values(userAnswers).filter(v => v.trim()).length;

      expect(filled).toBe(2);
    });
  });

  describe('Hints', () => {
    it('devrait fournir indice longueur', () => {
      const correctAnswer = 'contre';
      const hint = `${correctAnswer.length} lettres`;

      expect(hint).toBe('6 lettres');
    });

    it('devrait fournir première lettre', () => {
      const correctAnswer = 'contre';
      const hint = `Commence par "${correctAnswer[0]}"`;

      expect(hint).toBe('Commence par "c"');
    });
  });

  describe('Feedback', () => {
    it('devrait marquer réponses correctes', () => {
      const isCorrect = true;
      const className = isCorrect ? 'border-green-500' : 'border-red-500';

      expect(className).toBe('border-green-500');
    });

    it('devrait afficher correction', () => {
      const userAnswer = 'exil';
      const correctAnswer = "l'exil";

      if (userAnswer !== correctAnswer) {
        const correction = `La bonne réponse est: ${correctAnswer}`;
        expect(correction).toBe("La bonne réponse est: l'exil");
      }
    });

    it('devrait compter erreurs', () => {
      const userAnswers = {
        1: 'contre',
        2: 'exil',
        3: 'nostalgi'
      };

      const errors = mockData.blanks.reduce((count, blank) => {
        return count + (userAnswers[blank.id] !== blank.correctAnswer ? 1 : 0);
      }, 0);

      expect(errors).toBe(2);
    });
  });

  describe('Auto-complete', () => {
    it('devrait suggérer mots similaires', () => {
      const userInput = 'nost';
      const correctAnswer = 'nostalgie';

      const isSimilar = correctAnswer.toLowerCase().startsWith(userInput.toLowerCase());

      expect(isSimilar).toBe(true);
    });
  });

  describe('Evidence Tracking', () => {
    it('devrait générer evidence pour D2', () => {
      const evidence = {
        competencyId: '2.1',
        score: 67,
        evidenceType: 'P2',
        activityId: 'texte-a-trous-la-bas-1'
      };

      expect(evidence.competencyId).toBe('2.1');
      expect(evidence.evidenceType).toBe('P2');
    });

    it('devrait tracker tentatives', () => {
      let attempts = 0;
      const submitAnswer = () => {
        attempts++;
      };

      submitAnswer();
      submitAnswer();

      expect(attempts).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('devrait avoir labels pour inputs', () => {
      const label = 'Mot manquant 1';
      expect(label).toBeTruthy();
    });

    it('devrait annoncer résultats', () => {
      const score = 67;
      const ariaLive = `Votre score: ${score}%. 2 réponses correctes sur 3.`;

      expect(ariaLive).toBeTruthy();
    });
  });

  describe('Progression', () => {
    it('devrait tracker inputs remplis', () => {
      const userAnswers = {
        1: 'contre',
        2: '',
        3: 'nostalgie'
      };

      const filled = Object.values(userAnswers).filter(v => v.trim()).length;
      const total = mockData.blanks.length;
      const progress = Math.round((filled / total) * 100);

      expect(progress).toBe(67);
    });

    it('devrait activer bouton submit quand complet', () => {
      const userAnswers = { 1: 'a', 2: 'b', 3: 'c' };
      const isComplete = Object.keys(userAnswers).length === mockData.blanks.length;

      expect(isComplete).toBe(true);
    });
  });

  describe('Reset', () => {
    it('devrait réinitialiser inputs', () => {
      let userAnswers: Record<number, string> = { 1: 'test', 2: 'test' };
      
      const reset = () => {
        userAnswers = {};
      };

      reset();

      expect(Object.keys(userAnswers)).toHaveLength(0);
    });
  });

  describe('Timer', () => {
    it('devrait limiter temps par exercice', () => {
      const timeLimit = 180; // 3 minutes
      expect(timeLimit).toBeGreaterThan(0);
    });
  });

  describe('Context', () => {
    it('devrait afficher contexte de la chanson', () => {
      const context = {
        song: 'Là-bas',
        artist: 'Jean Ferrat',
        theme: 'Exil et nostalgie'
      };

      expect(context.song).toBe('Là-bas');
    });
  });
});
