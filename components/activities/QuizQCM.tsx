'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionQCM } from '@/types/seance';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

interface QuizQCMProps {
  /** Questions du QCM */
  questions: QuestionQCM[];
  
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
  
  /** Callback appelé à la fin du quiz avec le score */
  onComplete: (score: number) => void;
  
  /** Mode debug (optionnel) */
  debug?: boolean;
}

interface QuestionState {
  answered: boolean;
  selectedOption: number | null;
  isCorrect: boolean;
}

export function QuizQCM({ 
  questions, 
  metadata,
  userId,
  userName,
  onComplete,
  debug = false
}: QuizQCMProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
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

  // Réinitialiser le timer au montage
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleSelectOption = (optionIndex: number) => {
    if (state?.answered) return;

    const isCorrect = optionIndex === question.reponseCorrecte;
    
    setQuestionStates(prev => ({
      ...prev,
      [question.id]: {
        answered: true,
        selectedOption: optionIndex,
        isCorrect,
      },
    }));
    setShowExplication(true);
  };

  const handleNext = async () => {
    setShowExplication(false);
    
    if (isLastQuestion) {
      // Calculer le score final
      const correctAnswers = Object.values(questionStates).filter(s => s.isCorrect).length;
      const totalQuestions = questions.length;
      const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
      const scoreRaw = correctAnswers;
      const maxScore = metadata.ceredis.scoreMax;
      
      // Calculer la durée
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (debug) {
        console.log('[QuizQCM] 🎯 Fin du quiz:', {
          correctAnswers,
          totalQuestions,
          scorePercentage,
          scoreRaw,
          maxScore,
          duration,
        });
      }

      // Tracker l'activité avec le service unifié
      await trackActivity({
        activityId: metadata.activityId,
        activityName: metadata.activityName,
        activityType: 'qcm',
        score: scoreRaw,
        maxScore: maxScore,
        ceredis: metadata.ceredis,
        chansonId: metadata.chansonId,
        seanceId: metadata.seanceId,
        niveau: metadata.niveau,
        duration,
        metadata: {
          correctAnswers,
          totalQuestions,
          scorePercentage,
          questionStates: Object.keys(questionStates).length,
        },
      });

      // Appeler le callback parent avec le pourcentage
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
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={state?.answered}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between",
                getOptionStyle(index),
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium text-sm",
                  state?.answered && index === question.reponseCorrecte && "border-green-500 bg-green-500 text-white",
                  state?.answered && index === state.selectedOption && !state.isCorrect && "border-red-500 bg-red-500 text-white",
                  !state?.answered && "border-current",
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
              {getOptionIcon(index)}
            </button>
          ))}
        </div>

        {/* Explication */}
        {showExplication && question.explication && (
          <div className={cn(
            "mt-6 p-4 rounded-lg border",
            state?.isCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200",
          )}>
            <div className="flex items-start gap-3">
              <HelpCircle className={cn(
                "h-5 w-5 mt-0.5 shrink-0",
                state?.isCorrect ? "text-green-600" : "text-amber-600",
              )} />
              <div>
                <p className="font-medium mb-1">
                  {state?.isCorrect ? 'Bonne réponse !' : 'Explication :'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {question.explication}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {state?.answered && (
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleNext} 
              className="gradient-accent"
              disabled={isTracking}
            >
              {isTracking 
                ? 'Enregistrement...'
                : isLastQuestion 
                  ? 'Voir mon score' 
                  : 'Question suivante'
              }
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
