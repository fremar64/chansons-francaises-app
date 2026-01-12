'use client';

import { useState, useEffect, useRef } from 'react';
import { GripVertical, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface OrdreElementsData {
  id: string;
  consigne: string;
  elements: Array<{
    id: string;
    texte: string;
    ordre: number; // Ordre correct
  }>;
  aide?: string;
}

interface OrdreElementsProps {
  exercice: OrdreElementsData;
  
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

export function OrdreElements({ 
  exercice, 
  metadata,
  userId,
  userName,
  onComplete,
  debug = false
}: OrdreElementsProps) {
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

  // Mélanger les éléments au chargement
  const [elements, setElements] = useState(() => {
    const shuffled = [...exercice.elements];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newElements = [...elements];
    const draggedElement = newElements[draggedIndex];
    newElements.splice(draggedIndex, 1);
    newElements.splice(index, 0, draggedElement);
    
    setElements(newElements);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newElements = [...elements];
    [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
    setElements(newElements);
  };

  const handleMoveDown = (index: number) => {
    if (index === elements.length - 1) return;
    const newElements = [...elements];
    [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
    setElements(newElements);
  };

  const verifierOrdre = () => {
    const newResults: Record<string, boolean> = {};
    elements.forEach((element, index) => {
      // L'ordre correct est basé sur l'index+1 (ordre 1-based)
      newResults[element.id] = element.ordre === index + 1;
    });
    setResults(newResults);
    setIsVerified(true);
  };

  const calculerScore = () => {
    const correct = Object.values(results).filter(Boolean).length;
    return Math.round((correct / elements.length) * 100);
  };

  const handleSubmit = async () => {
    if (!isVerified) {
      verifierOrdre();
    } else {
      // Calcul et tracking
      const correctPositions = Object.values(results).filter(Boolean).length;
      const totalElements = elements.length;
      const scorePercentage = calculerScore();
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (debug) {
        console.log('[OrdreElements] 🔢', {
          correctPositions,
          totalElements,
          scorePercentage,
          duration
        });
      }

      await trackActivity({
        activityId: metadata.activityId,
        activityName: metadata.activityName,
        activityType: 'ordre_elements',
        score: correctPositions,
        maxScore: metadata.ceredis.scoreMax,
        ceredis: metadata.ceredis,
        chansonId: metadata.chansonId,
        seanceId: metadata.seanceId,
        niveau: metadata.niveau,
        duration,
        metadata: {
          totalElements,
          correctPositions,
          scorePercentage,
        },
      });

      onComplete(scorePercentage);
    }
  };

  const allCorrect = isVerified && Object.values(results).every(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-display">
          Remettre dans l'ordre
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Consigne */}
        <div className="space-y-2">
          <p className="text-muted-foreground">{exercice.consigne}</p>
          {exercice.aide && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-900">{exercice.aide}</p>
            </div>
          )}
        </div>

        {/* Liste des éléments */}
        <div className="space-y-2">
          {elements.map((element, index) => (
            <div
              key={element.id}
              draggable={!isVerified}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "group flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
                !isVerified && "cursor-move hover:border-primary hover:bg-primary/5",
                isVerified && results[element.id] && "bg-green-50 border-green-500",
                isVerified && !results[element.id] && "bg-red-50 border-red-500",
                draggedIndex === index && "opacity-50"
              )}
            >
              {/* Icône de drag */}
              {!isVerified && (
                <GripVertical className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              )}
              
              {/* Icône de résultat */}
              {isVerified && (
                results[element.id] ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )
              )}

              {/* Numéro actuel */}
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
                !isVerified && "bg-muted text-muted-foreground",
                isVerified && results[element.id] && "bg-green-100 text-green-900",
                isVerified && !results[element.id] && "bg-red-100 text-red-900"
              )}>
                {index + 1}
              </div>

              {/* Texte */}
              <p className="flex-1 font-medium">{element.texte}</p>

              {/* Boutons de déplacement */}
              {!isVerified && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-primary/10 disabled:opacity-30"
                    title="Monter"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === elements.length - 1}
                    className="p-1 rounded hover:bg-primary/10 disabled:opacity-30"
                    title="Descendre"
                  >
                    ↓
                  </button>
                </div>
              )}

              {/* Ordre correct (si vérifié et incorrect) */}
              {isVerified && !results[element.id] && (
                <div className="text-sm text-red-700">
                  Devrait être en position {element.ordre}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Résultat global */}
        {isVerified && (
          <div className={cn(
            "p-4 rounded-lg border",
            allCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
          )}>
            <div className="flex items-center gap-3">
              {allCorrect ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">
                      Parfait ! Tous les éléments sont dans le bon ordre.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">
                      {calculerScore()}% de bonnes réponses
                    </p>
                    <p className="text-sm text-amber-800 mt-1">
                      {Object.values(results).filter(Boolean).length} / {elements.length} éléments correctement placés
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Bouton d'action */}
        <div className="flex justify-end">
          {!isVerified && (
            <Button
              onClick={handleSubmit}
              className="gradient-accent"
            >
              Vérifier l'ordre
            </Button>
          )}
          {isVerified && (
            <Button
              onClick={handleSubmit}
              disabled={isTracking}
              className="gradient-accent"
            >
              {isTracking ? 'Enregistrement...' : 'Continuer'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
