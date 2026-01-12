'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface JournalReflexifData {
  id: string;
  questionPrincipale: string;
  contexte?: string;
  sousQuestions?: string[];
  nombreMotsMin?: number;
  exemplesReponses?: string[];
}

interface JournalReflexifProps {
  exercice: JournalReflexifData;
  
  /** Metadata CEREDIS pour le tracking */
  metadata: {
    activityId: string;
    activityName: string;
    chansonId: string;
    seanceId: string;
    ceredis: CeredisMetadata;
    niveau: NiveauCECRL;
  };
  
  /** ID utilisateur */
  userId: string;
  
  /** Nom utilisateur */
  userName: string;
  
  onComplete: (score: number) => void;
  
  /** Mode debug */
  debug?: boolean;
}

export function JournalReflexif({ 
  exercice, 
  metadata,
  userId,
  userName,
  onComplete,
  debug = false
}: JournalReflexifProps) {
  // Timer pour tracking
  const startTimeRef = useRef<number>(Date.now());
  
  // Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // État pour la réflexion principale
  const [reflexion, setReflexion] = useState('');
  
  // État pour les sous-questions
  const [reponses, setReponses] = useState<Record<string, string>>({});
  
  // État de soumission
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nombreMotsMin = exercice.nombreMotsMin || 50;

  // Compter les mots
  const wordCount = reflexion.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isValidLength = wordCount >= nombreMotsMin;

  const handleSousQuestionChange = (index: number, value: string) => {
    setReponses(prev => ({
      ...prev,
      [`q${index}`]: value
    }));
  };

  const handleSubmit = async () => {
    // Compiler toutes les réponses dans une réflexion complète
    const reflexionComplete = `
QUESTION PRINCIPALE: ${exercice.questionPrincipale}

RÉFLEXION:
${reflexion}

${exercice.sousQuestions ? exercice.sousQuestions.map((q, i) => `
SOUS-QUESTION ${i + 1}: ${q}
RÉPONSE: ${reponses[`q${i}`] || 'Non répondue'}
`).join('\n') : ''}
    `.trim();

    // Pour un journal réflexif, on donne le score max par défaut
    // (évaluation qualitative par l'enseignant ensuite)
    const score = metadata.ceredis.scoreMax;
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const totalWordCount = reflexionComplete.split(/\s+/).length;

    if (debug) {
      console.log('[JournalReflexif] 📔', {
        score,
        wordCount: totalWordCount,
        duration,
        reflexionLength: reflexionComplete.length
      });
    }

    setIsSubmitted(true);

    // CRITIQUE : Envoyer la réflexion complète dans response
    // C'est ce qui permet de valider le Domaine 5 (P4 - métacognition)
    await trackActivity({
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'journal_reflexif',
      score: score,
      maxScore: score,
      ceredis: metadata.ceredis,
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.niveau,
      duration,
      response: reflexionComplete, // IMPORTANT : Réflexion métacognitive complète
      metadata: {
        wordCount: totalWordCount,
        reflexionLength: reflexionComplete.length,
        sousQuestionsCount: exercice.sousQuestions?.length || 0,
      },
    });

    onComplete(score);
  };

  const getProgressColor = () => {
    if (wordCount < nombreMotsMin) return 'text-amber-600';
    return 'text-green-600';
  };

  const getProgressPercentage = () => {
    return Math.min((wordCount / nombreMotsMin) * 100, 100);
  };

  return (
    <Card>
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Journal réflexif
          </CardTitle>
          <Badge variant="outline" className={cn(getProgressColor())}>
            {wordCount} mot{wordCount > 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Contexte */}
        {exercice.contexte && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{exercice.contexte}</AlertDescription>
          </Alert>
        )}

        {/* Question principale */}
        <div className="space-y-3">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">{exercice.questionPrincipale}</h3>
            <p className="text-sm text-muted-foreground">
              Minimum {nombreMotsMin} mots
            </p>
          </div>

          <Textarea
            value={reflexion}
            onChange={(e) => setReflexion(e.target.value)}
            placeholder="Partagez votre réflexion personnelle..."
            className="min-h-[200px] resize-y"
            disabled={isSubmitted}
          />

          {/* Barre de progression */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all rounded-full",
                  wordCount < nombreMotsMin ? "bg-amber-500" : "bg-green-500"
                )}
                style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className={cn(getProgressColor(), "font-medium")}>
                {wordCount} / {nombreMotsMin} mots minimum
              </span>
              {wordCount < nombreMotsMin && (
                <span className="text-amber-600">
                  Encore {nombreMotsMin - wordCount} mot{nombreMotsMin - wordCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sous-questions */}
        {exercice.sousQuestions && exercice.sousQuestions.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground">
              Questions complémentaires :
            </h4>
            {exercice.sousQuestions.map((question, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium">
                  {index + 1}. {question}
                </label>
                <Textarea
                  value={reponses[`q${index}`] || ''}
                  onChange={(e) => handleSousQuestionChange(index, e.target.value)}
                  placeholder="Votre réponse..."
                  className="min-h-[100px]"
                  disabled={isSubmitted}
                />
              </div>
            ))}
          </div>
        )}

        {/* Exemples de réponses */}
        {exercice.exemplesReponses && exercice.exemplesReponses.length > 0 && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium text-blue-900 mb-2 text-sm">
              💡 Pistes de réflexion :
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              {exercice.exemplesReponses.map((exemple, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{exemple}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Message de confirmation */}
        {isSubmitted && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Votre réflexion a été enregistrée avec succès ! Merci pour votre participation.
            </AlertDescription>
          </Alert>
        )}

        {/* Bouton de soumission */}
        {!isSubmitted && (
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!isValidLength || isTracking}
              className="gradient-accent gap-2"
            >
              {isTracking ? 'Enregistrement...' : (
                <>
                  <Send className="h-4 w-4" />
                  Soumettre ma réflexion
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
