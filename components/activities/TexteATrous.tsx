'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { CheckCircle2, HelpCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TexteATrousData } from '@/types/seance';
import { cn } from '@/lib/utils';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

interface TexteATrousProps {
  exercice: TexteATrousData;
  
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

interface TrouState {
  valeur: string;
  estCorrect: boolean | null;
  verifie: boolean;
}

export function TexteATrous({ 
  exercice, 
  metadata,
  userId,
  userName,
  onComplete,
  debug = false
}: TexteATrousProps) {
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

  // Parser le texte pour extraire les trous
  const segments = useMemo(() => {
    const regex = /\{\{([^}]+)\}\}/g;
    const parts: Array<{ type: 'text' | 'trou'; content: string; index?: number }> = [];
    let lastIndex = 0;
    let trouIndex = 0;
    let match;

    while ((match = regex.exec(exercice.texteAvecTrous)) !== null) {
      // Texte avant le trou
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: exercice.texteAvecTrous.slice(lastIndex, match.index),
        });
      }
      // Le trou lui-même
      parts.push({
        type: 'trou',
        content: match[1],
        index: trouIndex,
      });
      trouIndex++;
      lastIndex = regex.lastIndex;
    }

    // Texte après le dernier trou
    if (lastIndex < exercice.texteAvecTrous.length) {
      parts.push({
        type: 'text',
        content: exercice.texteAvecTrous.slice(lastIndex),
      });
    }

    return parts;
  }, [exercice.texteAvecTrous]);

  const nombreTrous = exercice.motsCaches.length;
  
  const [trous, setTrous] = useState<Record<number, TrouState>>(() => {
    const initial: Record<number, TrouState> = {};
    for (let i = 0; i < nombreTrous; i++) {
      initial[i] = { valeur: '', estCorrect: null, verifie: false };
    }
    return initial;
  });

  const [showIndices, setShowIndices] = useState<Set<number>>(new Set());
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (index: number, valeur: string) => {
    setTrous(prev => ({
      ...prev,
      [index]: { ...prev[index], valeur, verifie: false, estCorrect: null },
    }));
    setIsVerified(false);
  };

  const toggleIndice = (index: number) => {
    setShowIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Retire les accents
  };

  const verifierReponses = () => {
    const nouveauxTrous = { ...trous };
    
    exercice.motsCaches.forEach((motCorrect, index) => {
      const reponse = trous[index]?.valeur || '';
      const estCorrect = normalizeString(reponse) === normalizeString(motCorrect);
      nouveauxTrous[index] = {
        ...nouveauxTrous[index],
        estCorrect,
        verifie: true,
      };
    });

    setTrous(nouveauxTrous);
    setIsVerified(true);
  };

  const calculerScore = (): number => {
    const correctes = Object.values(trous).filter(t => t.estCorrect).length;
    return Math.round((correctes / nombreTrous) * 100);
  };

  const tousCorrects = Object.values(trous).every(t => t.estCorrect);
  const allFilled = Object.values(trous).every(t => t.valeur.trim() !== '');

  const handleSubmit = async () => {
    if (!isVerified) {
      verifierReponses();
    } else {
      // Calcul et tracking
      const correctes = Object.values(trous).filter(t => t.estCorrect).length;
      const scorePercentage = calculerScore();
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (debug) {
        console.log('[TexteATrous] 📝', { correctes, nombreTrous, scorePercentage, duration });
      }

      await trackActivity({
        activityId: metadata.activityId,
        activityName: metadata.activityName,
        activityType: 'texte_a_trous',
        score: correctes,
        maxScore: metadata.ceredis.scoreMax,
        ceredis: metadata.ceredis,
        chansonId: metadata.chansonId,
        seanceId: metadata.seanceId,
        niveau: metadata.niveau,
        duration,
        metadata: {
          totalTrous: nombreTrous,
          correctes,
          scorePercentage,
        },
      });

      onComplete(scorePercentage);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-6">
          Complétez les trous avec les mots manquants. Cliquez sur 💡 pour obtenir un indice.
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-6">
          <div className="text-lg leading-relaxed whitespace-pre-wrap">
            {segments.map((segment, i) => {
              if (segment.type === 'text') {
                return <span key={i}>{segment.content}</span>;
              }

              const index = segment.index!;
              const trouState = trous[index];
              const hasIndice = exercice.indicesOptionnels && exercice.indicesOptionnels[index];

              return (
                <span key={i} className="inline-flex items-center gap-1 mx-1">
                  <span className="relative">
                    <Input
                      value={trouState?.valeur || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      disabled={isVerified && trouState?.estCorrect}
                      className={cn(
                        "inline-block w-32 text-center font-medium",
                        trouState?.verifie && trouState?.estCorrect && "border-green-500 bg-green-50 text-green-900",
                        trouState?.verifie && !trouState?.estCorrect && "border-red-500 bg-red-50 text-red-900",
                      )}
                      placeholder="..."
                    />
                    {trouState?.verifie && trouState?.estCorrect && (
                      <CheckCircle2 className="absolute -right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    )}
                  </span>
                  {hasIndice && !isVerified && (
                    <button
                      onClick={() => toggleIndice(index)}
                      className="text-amber-500 hover:text-amber-600 transition-colors"
                      title="Voir l'indice"
                    >
                      <Lightbulb className="h-4 w-4" />
                    </button>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {showIndices.size > 0 && exercice.indicesOptionnels && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900 mb-2">Indices :</p>
                <ul className="text-sm text-amber-800 space-y-1">
                  {Array.from(showIndices).map(index => (
                    <li key={index}>
                      Trou {index + 1} : {exercice.indicesOptionnels![index]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {isVerified && (
          <div className={cn(
            "mb-6 p-4 rounded-lg border",
            tousCorrects ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200",
          )}>
            <div className="flex items-center gap-3">
              {tousCorrects ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Parfait ! Toutes les réponses sont correctes.</p>
                  </div>
                </>
              ) : (
                <>
                  <HelpCircle className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">
                      {calculerScore()}% de bonnes réponses
                    </p>
                    <p className="text-sm text-amber-800 mt-1">
                      Réponses attendues : {exercice.motsCaches.map((mot, i) => (
                        <span key={i}>
                          {i > 0 && ', '}
                          <strong className={trous[i]?.estCorrect ? 'text-green-700' : 'text-red-700'}>
                            {mot}
                          </strong>
                        </span>
                      ))}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          {!isVerified && (
            <Button
              onClick={handleSubmit}
              disabled={!allFilled}
              className="gradient-accent"
            >
              Vérifier mes réponses
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
