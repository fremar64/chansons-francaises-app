'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Music2, BookOpen, CheckCircle, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

interface EcranIntroductionProps {
  contenu: string;
  type: 'introduction' | 'ecoute_decouverte' | 'ecoute_guidee' | 'bilan';
  
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
  
  onComplete: () => void;
  
  /** Mode debug */
  debug?: boolean;
}

export function EcranIntroduction({ 
  contenu, 
  type, 
  metadata,
  userId,
  userName,
  onComplete,
  debug = false
}: EcranIntroductionProps) {
  // Timer pour tracking
  const startTimeRef = useRef<number>(Date.now());
  
  // Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });

  // Réinitialiser le timer au montage
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'introduction':
        return <BookOpen className="h-6 w-6" />;
      case 'ecoute_decouverte':
      case 'ecoute_guidee':
        return <Music2 className="h-6 w-6" />;
      case 'bilan':
        return <Trophy className="h-6 w-6" />;
      default:
        return <CheckCircle className="h-6 w-6" />;
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'introduction':
        return 'Commencer';
      case 'ecoute_decouverte':
      case 'ecoute_guidee':
        return 'J\'ai écouté, continuer';
      case 'bilan':
        return 'Terminer la séance';
      default:
        return 'Continuer';
    }
  };

  const getHeaderStyle = () => {
    switch (type) {
      case 'bilan':
        return 'gradient-accent';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Header décoratif */}
      <div className={cn(
        "p-6 text-primary-foreground",
        getHeaderStyle(),
      )}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <p className="text-sm text-primary-foreground/80 capitalize">
              {type.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Contenu Markdown */}
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-display text-lg font-medium text-foreground mt-4 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic">{children}</em>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ),
              hr: () => <hr className="my-6 border-border" />,
            }}
          >
            {contenu}
          </ReactMarkdown>
        </div>

        {/* Bouton d'action */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={async () => {
              const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
              // Activité non notée (engagement, P1 ou P4)
              const score = metadata.ceredis.scoreMax || 0;
              const maxScore = metadata.ceredis.scoreMax || 0;

              if (debug) {
                console.log('[EcranIntroduction] 📖 Complétion:', {
                  type,
                  duration,
                  score,
                });
              }

              // Tracker l'activité avec le service unifié
              await trackActivity({
                activityId: metadata.activityId,
                activityName: metadata.activityName,
                activityType: type,
                score: score,
                maxScore: maxScore,
                ceredis: metadata.ceredis,
                chansonId: metadata.chansonId,
                seanceId: metadata.seanceId,
                niveau: metadata.niveau,
                duration,
                metadata: {
                  type,
                  contentLength: contenu.length,
                },
              });

              onComplete();
            }}
            className={cn(
              "min-w-[200px]",
              type === 'bilan' ? 'gradient-accent shadow-glow' : 'gradient-accent',
            )}
          >
            {getButtonText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
