'use client';

/**
 * Composant QuizQCMJustifie
 * QCM avec justification textuelle obligatoire pour valider les compétences Domaine 5
 * 
 * MAPPING OPÉRATIONNEL FINAL - Règle §4.3 :
 * "Aucune compétence métalinguistique ne doit être validée uniquement sur la base de QCM"
 * 
 * Ce composant permet de valider :
 * - 1.1, 2.1 : Compréhension (via les réponses QCM)
 * - 5.1, 5.2 : Métalinguistique (via la justification textuelle)
 * 
 * Compétences CEREDIS ciblées : 1.1, 2.1, 5.1, 5.2
 */

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Send, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { QuestionQCM } from '@/types/seance';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface QuestionQCMJustifie extends QuestionQCM {
  /** Prompt pour guider la justification */
  promptJustification?: string;
  /** Nombre minimum de caractères pour la justification */
  justificationMinLength?: number;
}

interface QuizQCMJustifieProps {
  /** Questions du quiz avec justification */
  questions: QuestionQCMJustifie[];
  
  /** Metadata CEREDIS pour le tracking */
  metadata: {
    activityId: string;
    activityName: string;
    chansonId: string;
    seanceId: string;
    ceredis: CeredisMetadata;
    niveau: NiveauCECRL;
  };
  
  /** ID de l'utilisateur */
  userId: string;
  
  /** Nom de l'utilisateur */
  userName: string;
  
  /** Callback appelé à la fin avec score et justifications */
  onComplete: (score: number) => void;
  
  /** Titre optionnel */
  titre?: string;
  
  /** Mode debug */
  debug?: boolean;
}

interface QuestionState {
  answered: boolean;
  selectedOption: number | null;
  isCorrect: boolean;
  justification: string;
}

export function QuizQCMJustifie({ 
  questions, 
  metadata,
  userId,
  userName,
  onComplete,
  titre,
  debug = false
}: QuizQCMJustifieProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>(() => {
    const initial: Record<string, QuestionState> = {};
    questions.forEach(q => {
      initial[q.id] = { answered: false, selectedOption: null, isCorrect: false, justification: '' };
    });
    return initial;
  });
  const [showExplication, setShowExplication] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });

  const question = questions[currentQuestion];
  const state = questionStates[question.id];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const minJustificationLength = question.justificationMinLength || 30;

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleSelectOption = (optionIndex: number) => {
    if (state?.answered) return;

    const isCorrect = optionIndex === question.reponseCorrecte;
    
    setQuestionStates(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        answered: true,
        selectedOption: optionIndex,
        isCorrect,
      },
    }));
    setShowExplication(true);
  };

  const handleJustificationChange = (value: string) => {
    setQuestionStates(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        justification: value,
      },
    }));
  };

  const isJustificationValid = () => {
    return state?.justification && state.justification.trim().length >= minJustificationLength;
  };

  const handleNext = async () => {
    setShowExplication(false);
    
    if (isLastQuestion) {
      // Calculer le score
      const correctAnswers = Object.values(questionStates).filter(s => s.isCorrect).length;
      const totalQuestions = questions.length;
      const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
      const scoreRaw = correctAnswers;
      const maxScore = metadata.ceredis.scoreMax;
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      // Compiler toutes les justifications
      const allJustifications = questions.map(q => ({
        question: q.question,
        selected: q.options[questionStates[q.id].selectedOption || 0],
        correct: questionStates[q.id].isCorrect,
        justification: questionStates[q.id].justification,
      }));

      const justificationsText = allJustifications
        .map((j, i) => `Q${i + 1}: ${j.justification}`)
        .join('\n\n');

      if (debug) {
        console.log('[QuizQCMJustifie] 🎯 Fin du quiz:', {
          correctAnswers,
          totalQuestions,
          scorePercentage,
          justificationsLength: justificationsText.length,
        });
      }

      // Tracker avec les justifications (important pour Domaine 5)
      await trackActivity({
        activityId: metadata.activityId,
        activityName: metadata.activityName,
        activityType: 'qcm_justifie',
        score: scoreRaw,
        maxScore: maxScore,
        ceredis: metadata.ceredis,
        chansonId: metadata.chansonId,
        seanceId: metadata.seanceId,
        niveau: metadata.niveau,
        duration,
        response: justificationsText, // Justifications pour Domaine 5
        metadata: {
          correctAnswers,
          totalQuestions,
          scorePercentage,
          justifications: allJustifications,
        },
      });

      onComplete(scorePercentage);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!state?.answered) {
      return 'border-border hover:border-accent hover:bg-accent/5 cursor-pointer';
    }

    if (index === question.reponseCorrecte) {
      return 'border-green-500 bg-green-50 text-green-900';
    }

    if (index === state.selectedOption && !state.isCorrect) {
      return 'border-red-500 bg-red-50 text-red-900';
    }

    return 'border-border opacity-50';
  };

  const getOptionIcon = (index: number) => {
    if (!state?.answered) return null;

    if (index === question.reponseCorrecte) {
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }

    if (index === state.selectedOption && !state.isCorrect) {
      return <XCircle className="h-5 w-5 text-red-600" />;
    }

    return null;
  };

  return (
    <Card>
      {titre && (
        <CardHeader>
          <CardTitle>{titre}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
          <span>Question {currentQuestion + 1} sur {questions.length}</span>
          <div className="flex gap-1">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={cn(
                  "h-2 w-6 rounded-full",
                  i === currentQuestion && "bg-accent",
                  i < currentQuestion && (questionStates[q.id]?.isCorrect ? "bg-green-500" : "bg-red-400"),
                  i > currentQuestion && "bg-muted",
                )}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <h2 className="font-display text-xl font-semibold mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={state?.answered}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all text-left",
                getOptionStyle(index)
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full border-2 font-medium text-sm",
                  state?.answered && index === question.reponseCorrecte && "border-green-500 bg-green-500 text-white",
                  state?.answered && index === state.selectedOption && !state.isCorrect && "border-red-500 bg-red-500 text-white",
                  !state?.answered && "border-current"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
              {getOptionIcon(index)}
            </button>
          ))}
        </div>

        {/* Explication et Justification */}
        {showExplication && (
          <div className="space-y-4 mt-6 pt-6 border-t">
            {/* Explication */}
            {question.explication && (
              <div className={cn(
                "p-4 rounded-lg border",
                state.isCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
              )}>
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className={cn(
                    "h-4 w-4",
                    state.isCorrect ? "text-green-600" : "text-amber-600"
                  )} />
                  {state.isCorrect ? 'Bonne réponse !' : 'Explication'}
                </h4>
                <p className="text-sm">{question.explication}</p>
              </div>
            )}

            {/* Zone de justification */}
            <div className="space-y-2">
              <Label htmlFor="justification" className="font-medium">
                {question.promptJustification || 'Expliquez votre raisonnement :'}
              </Label>
              <Textarea
                id="justification"
                value={state.justification}
                onChange={(e) => handleJustificationChange(e.target.value)}
                placeholder="Justifiez votre choix en expliquant comment vous avez analysé la question..."
                className="min-h-[100px] resize-y"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className={cn(
                  state.justification.length >= minJustificationLength ? "text-green-600" : "text-amber-600"
                )}>
                  {state.justification.length} / {minJustificationLength} caractères minimum
                </span>
                {!isJustificationValid() && (
                  <span className="text-amber-600">
                    Justification requise pour continuer
                  </span>
                )}
              </div>
            </div>

            {/* Bouton suivant */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleNext}
                disabled={!isJustificationValid() || isTracking}
                className="gradient-accent gap-2"
              >
                {isTracking ? (
                  'Enregistrement...'
                ) : isLastQuestion ? (
                  <>
                    <Send className="h-4 w-4" />
                    Terminer le quiz
                  </>
                ) : (
                  'Question suivante →'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
