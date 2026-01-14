'use client';

/**
 * Composant TexteLibre
 * Permet la production écrite libre avec tracking des compétences :
 * - 3.1 : Exprimer une opinion personnelle argumentée
 * - 5.5 : Mobiliser l'analyse linguistique pour interpréter
 * - 5.6 : Verbaliser ses stratégies de compréhension
 * - 5.7 : Réguler consciemment sa production écrite
 */

import { useState, useEffect, useRef } from 'react';
import { Send, Info, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface TexteLibreData {
  id: string;
  consigne: string;
  contexte?: string;
  nombreMotsMin?: number;
  nombreMotsMax?: number;
  aideRedaction?: string[];
  criteres?: {
    label: string;
    description: string;
    points: number;
  }[];
  exempleReponse?: string;
}

interface TexteLibreProps {
  exercice: TexteLibreData;
  
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

export function TexteLibre({ 
  exercice, 
  metadata,
  userId,
  userName,
  onComplete,
  debug = false
}: TexteLibreProps) {
  const [texte, setTexte] = useState('');
  const [showAide, setShowAide] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  // Timer pour tracking
  const startTimeRef = useRef<number>(Date.now());
  
  // Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });
  
  const nombreMotsMin = exercice.nombreMotsMin || 50;
  const nombreMotsMax = exercice.nombreMotsMax || 300;

  // Réinitialiser le timer au montage
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Compter les mots
  useEffect(() => {
    const words = texte.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [texte]);

  // Vérifier si le texte est valide
  const isValidLength = wordCount >= nombreMotsMin && wordCount <= nombreMotsMax;
  const hasMinimumContent = wordCount >= Math.floor(nombreMotsMin * 0.8); // 80% du minimum

  // Calculer le score basé sur les critères
  const calculateScore = (): number => {
    if (!exercice.criteres || exercice.criteres.length === 0) {
      // Score par défaut basé sur la longueur
      if (wordCount < nombreMotsMin) {
        return Math.round((wordCount / nombreMotsMin) * 60);
      }
      return 80; // Score par défaut pour une production valide
    }
    
    // Score proportionnel au nombre de mots (simplifié)
    // En production réelle, cela serait évalué par l'enseignant ou IA
    const lengthScore = Math.min(wordCount / nombreMotsMin, 1) * 0.4;
    const baseScore = 0.6; // Score de base pour avoir soumis
    
    return Math.round((lengthScore + baseScore) * 100);
  };

  const handleSubmit = async () => {
    if (hasMinimumContent) {
      setIsSubmitted(true);
      const score = calculateScore();
      const maxScore = metadata.ceredis.scoreMax || 100;
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (debug) {
        console.log('[TexteLibre] 📝 Soumission:', {
          wordCount,
          score,
          maxScore,
          duration,
        });
      }

      // Tracker l'activité avec le service unifié
      // IMPORTANT : response contient le texte pour validation Domaine 5
      await trackActivity({
        activityId: metadata.activityId,
        activityName: metadata.activityName,
        activityType: 'texte_libre',
        score: score,
        maxScore: maxScore,
        ceredis: metadata.ceredis,
        chansonId: metadata.chansonId,
        seanceId: metadata.seanceId,
        niveau: metadata.niveau,
        duration,
        response: texte, // ⚠️ IMPORTANT : preuve réflexive pour Domaine 5
        metadata: {
          wordCount,
          nombreMotsMin,
          nombreMotsMax,
          isValidLength,
        },
      });

      onComplete(score);
    }
  };

  const getWordCountColor = () => {
    if (wordCount < nombreMotsMin) return 'text-amber-600';
    if (wordCount > nombreMotsMax) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Send className="h-5 w-5" />
            Production écrite
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className={cn("font-mono", getWordCountColor())}>
              {wordCount} / {nombreMotsMin}-{nombreMotsMax} mots
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Consigne */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Consigne :</h3>
          <p className="text-muted-foreground leading-relaxed">
            {exercice.consigne}
          </p>
        </div>

        {/* Contexte optionnel */}
        {exercice.contexte && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {exercice.contexte}
            </AlertDescription>
          </Alert>
        )}

        {/* Critères d'évaluation */}
        {exercice.criteres && exercice.criteres.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Critères d'évaluation :
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
              {exercice.criteres.map((critere, i) => (
                <li key={i}>
                  <span className="font-medium">{critere.label}</span>
                  {critere.description && ` : ${critere.description}`}
                  <span className="text-accent ml-2">({critere.points} pts)</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bouton aide */}
        {exercice.aideRedaction && exercice.aideRedaction.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAide(!showAide)}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            {showAide ? 'Masquer l\'aide' : 'Afficher l\'aide à la rédaction'}
          </Button>
        )}

        {/* Aide à la rédaction */}
        {showAide && exercice.aideRedaction && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Aide à la rédaction
            </h4>
            <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
              {exercice.aideRedaction.map((aide, i) => (
                <li key={i}>{aide}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Zone de texte */}
        {!isSubmitted ? (
          <div className="space-y-2">
            <Textarea
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              placeholder="Rédigez votre texte ici..."
              className="min-h-[200px] resize-y"
              disabled={isSubmitted}
            />
            
            {/* Indicateur de progression */}
            {wordCount > 0 && wordCount < nombreMotsMin && (
              <p className="text-sm text-amber-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Encore {nombreMotsMin - wordCount} mots minimum
              </p>
            )}
            
            {wordCount > nombreMotsMax && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Limite dépassée de {wordCount - nombreMotsMax} mots
              </p>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Texte soumis avec succès !
            </h4>
            <div className="prose prose-sm max-w-none text-green-800 whitespace-pre-wrap">
              {texte}
            </div>
          </div>
        )}

        {/* Bouton de soumission */}
        {!isSubmitted && (
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!hasMinimumContent}
              className="gradient-accent gap-2"
            >
              <Send className="h-4 w-4" />
              Soumettre ma production
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
