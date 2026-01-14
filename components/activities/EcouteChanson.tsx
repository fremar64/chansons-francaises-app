'use client';

import { useState, useEffect, useRef } from 'react';
import { Headphones, Music2, Play, Pause, RotateCcw, Volume2, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface EcouteChansonData {
  id: string;
  titre: string;
  artiste: string;
  audioUrl: string;
  type: 'ecoute_decouverte' | 'ecoute_ciblee';
  consigne: string;
  objectifs?: string[];
  conseilsEcoute?: string[];
  // Pour écoute ciblée
  focusElements?: string[];
  // Timestamps optionnels pour un extrait
  audioDebut?: number;
  audioFin?: number;
  // Paroles synchronisées (optionnel)
  parolesSynchronisees?: Array<{
    temps: number;
    texte: string;
  }>;
}

interface EcouteChansonProps {
  data: EcouteChansonData;
  
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
  className?: string;
  
  /** Mode debug */
  debug?: boolean;
}

export function EcouteChanson({ 
  data, 
  metadata,
  userId,
  userName,
  onComplete, 
  className,
  debug = false
}: EcouteChansonProps) {
  const [hasListened, setHasListened] = useState(false);
  const [listeningProgress, setListeningProgress] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Timer pour tracking
  const startTimeRef = useRef<number>(Date.now());
  
  // Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });
  
  const isDecouverte = data.type === 'ecoute_decouverte';
  const minimumListenPercentage = isDecouverte ? 70 : 50; // % minimum à écouter

  // Réinitialiser le timer au montage
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Gestion de la mise à jour du temps
  const handleTimeUpdate = (currentTime: number) => {
    // Calculer la progression (en tenant compte des timestamps de début/fin si présents)
    const startTime = data.audioDebut ?? 0;
    const endTime = data.audioFin ?? 0;
    
    if (endTime > startTime) {
      // Extrait spécifique
      const progress = ((currentTime - startTime) / (endTime - startTime)) * 100;
      setListeningProgress(Math.min(100, Math.max(0, progress)));
    }
    
    // Mise à jour des paroles synchronisées
    if (data.parolesSynchronisees && data.parolesSynchronisees.length > 0) {
      const index = data.parolesSynchronisees.findIndex((line, i) => {
        const nextLine = data.parolesSynchronisees?.[i + 1];
        return currentTime >= line.temps && (!nextLine || currentTime < nextLine.temps);
      });
      setCurrentLyricIndex(index);
    }
  };

  // Vérifier si l'utilisateur a suffisamment écouté
  useEffect(() => {
    if (listeningProgress >= minimumListenPercentage && !hasListened) {
      setHasListened(true);
    }
  }, [listeningProgress, minimumListenPercentage, hasListened]);

  const handleComplete = async () => {
    setIsCompleted(true);
    
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    // Activité non notée (engagement, P1) - score basé sur progression d'écoute
    const score = hasListened ? metadata.ceredis.scoreMax : 0;
    const maxScore = metadata.ceredis.scoreMax || 0;

    if (debug) {
      console.log('[EcouteChanson] 🎧 Complétion:', {
        hasListened,
        listeningProgress,
        duration,
        score,
      });
    }

    // Tracker l'activité avec le service unifié
    await trackActivity({
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: data.type === 'ecoute_decouverte' ? 'ecoute_decouverte' : 'ecoute_ciblee',
      score: score,
      maxScore: maxScore,
      ceredis: metadata.ceredis,
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.niveau,
      duration,
      metadata: {
        listeningProgress: Math.round(listeningProgress),
        hasListened,
        type: data.type,
      },
    });

    onComplete();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={cn(
          "h-14 w-14 rounded-xl flex items-center justify-center",
          isDecouverte ? "bg-blue-500/10" : "bg-purple-500/10"
        )}>
          <Headphones className={cn(
            "h-7 w-7",
            isDecouverte ? "text-blue-500" : "text-purple-500"
          )} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={cn(
              isDecouverte 
                ? "border-blue-500/50 text-blue-600 dark:text-blue-400" 
                : "border-purple-500/50 text-purple-600 dark:text-purple-400"
            )}>
              {isDecouverte ? "Écoute découverte" : "Écoute ciblée"}
            </Badge>
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            {data.titre}
          </h2>
          <p className="text-muted-foreground">{data.artiste}</p>
        </div>
      </div>

      {/* Consigne */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground mb-2">Consigne</p>
              <p className="text-muted-foreground">{data.consigne}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectifs (pour écoute découverte) */}
      {isDecouverte && data.objectifs && data.objectifs.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="font-medium text-foreground mb-3">Objectifs de cette écoute :</p>
            <ul className="space-y-2">
              {data.objectifs.map((obj, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-500">{index + 1}</span>
                  </span>
                  {obj}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Focus (pour écoute ciblée) */}
      {!isDecouverte && data.focusElements && data.focusElements.length > 0 && (
        <Card className="border-purple-500/30">
          <CardContent className="p-4">
            <p className="font-medium text-foreground mb-3">
              🎯 Éléments à repérer pendant l'écoute :
            </p>
            <div className="flex flex-wrap gap-2">
              {data.focusElements.map((element, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-purple-500/10 text-purple-700 dark:text-purple-300"
                >
                  {element}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conseils d'écoute */}
      {data.conseilsEcoute && data.conseilsEcoute.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">💡 Conseils :</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {data.conseilsEcoute.map((conseil, index) => (
              <li key={index}>• {conseil}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Lecteur Audio */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Music2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{data.titre}</p>
              <p className="text-sm text-muted-foreground">{data.artiste}</p>
            </div>
          </div>

          <AudioPlayer 
            src={data.audioUrl}
            showVolume={true}
            showTime={true}
            onTimeUpdate={handleTimeUpdate}
            className="mb-4"
          />

          {/* Progression d'écoute */}
          {data.audioDebut !== undefined && data.audioFin !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progression de l'écoute</span>
                <span>{Math.round(listeningProgress)}%</span>
              </div>
              <Progress value={listeningProgress} className="h-2" />
            </div>
          )}
        </div>
      </Card>

      {/* Paroles synchronisées */}
      {data.parolesSynchronisees && data.parolesSynchronisees.length > 0 && (
        <Card>
          <CardContent className="p-4 max-h-64 overflow-y-auto">
            <p className="font-medium text-foreground mb-3">📝 Paroles :</p>
            <div className="space-y-2">
              {data.parolesSynchronisees.map((line, index) => (
                <p 
                  key={index}
                  className={cn(
                    "text-sm transition-all duration-300 py-1 px-2 rounded",
                    index === currentLyricIndex 
                      ? "bg-accent/20 text-foreground font-medium" 
                      : "text-muted-foreground"
                  )}
                >
                  {line.texte || "♪ ♪ ♪"}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bouton Continuer */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleComplete}
          disabled={isCompleted}
          className={cn(
            "min-w-[200px]",
            isCompleted && "bg-green-500 hover:bg-green-500"
          )}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Terminé
            </>
          ) : (
            <>
              J'ai écouté la chanson
              <Headphones className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default EcouteChanson;
