/**
 * Hook pour le tracking automatique des activités
 * Simplifie l'utilisation du service d'intégration unifié dans les composants
 */

'use client';

import { useState, useCallback } from 'react';
import { 
  unifiedIntegrationService,
  createUnifiedPayload,
  type CeredisMetadata,
  type UnifiedTrackingResult
} from '@/services/integration-unified';
import type { NiveauCECRL } from '@/types/ceredis';

// TODO: Remplacer par un vrai hook d'authentification
// Pour l'instant, on utilise des valeurs de test
const TEMP_USER = {
  id: 'user-temp-123',
  name: 'Utilisateur Test'
};

export interface UseActivityTrackingOptions {
  /**
   * ID utilisateur (optionnel, sera récupéré du contexte auth si disponible)
   */
  userId?: string;
  
  /**
   * Nom utilisateur (optionnel, sera récupéré du contexte auth si disponible)
   */
  userName?: string;
  
  /**
   * Callback appelé après un tracking réussi
   */
  onSuccess?: (result: UnifiedTrackingResult) => void;
  
  /**
   * Callback appelé en cas d'erreur
   */
  onError?: (error: Error) => void;
  
  /**
   * Activer les logs de debug
   */
  debug?: boolean;
}

export interface TrackActivityParams {
  activityId: string;
  activityName: string;
  activityType: string;
  score: number;
  maxScore: number;
  ceredis: CeredisMetadata;
  chansonId: string;
  seanceId: string;
  niveau: NiveauCECRL;
  duration?: number;
  response?: string;
  metadata?: Record<string, any>;
}

export function useActivityTracking(options: UseActivityTrackingOptions = {}) {
  const [isTracking, setIsTracking] = useState(false);
  const [lastResult, setLastResult] = useState<UnifiedTrackingResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // TODO: Récupérer userId et userName depuis un contexte d'authentification
  // const { user } = useAuth(); // À implémenter
  const userId = options.userId || TEMP_USER.id;
  const userName = options.userName || TEMP_USER.name;

  /**
   * Tracker la complétion d'une activité
   */
  const trackActivity = useCallback(
    async (params: TrackActivityParams): Promise<UnifiedTrackingResult> => {
      setIsTracking(true);
      setError(null);

      try {
        if (options.debug) {
          console.log('[useActivityTracking] 📊 Tracking activité:', {
            activityId: params.activityId,
            score: `${params.score}/${params.maxScore}`,
            userId,
          });
        }

        // Créer le payload unifié
        const payload = createUnifiedPayload(
          userId,
          userName,
          params.activityId,
          params.activityName,
          params.activityType,
          params.score,
          params.maxScore,
          params.ceredis,
          {
            chansonId: params.chansonId,
            seanceId: params.seanceId,
            niveau: params.niveau,
            duration: params.duration,
            response: params.response,
            metadata: params.metadata,
          }
        );

        // Appeler le service unifié
        const result = await unifiedIntegrationService.trackActivityCompletion(payload);

        setLastResult(result);

        if (result.success) {
          if (options.debug) {
            console.log('[useActivityTracking] ✅ Tracking réussi:', {
              cassAssertions: result.cassAssertions.length,
              xapiStatements: result.xapiStatements.length,
            });
          }
          options.onSuccess?.(result);
        } else {
          if (options.debug) {
            console.error('[useActivityTracking] ⚠️ Tracking avec erreurs:', result.errors);
          }
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erreur inconnue');
        setError(error);
        
        if (options.debug) {
          console.error('[useActivityTracking] ❌ Erreur tracking:', error);
        }
        
        options.onError?.(error);
        
        // Retourner un résultat d'erreur
        return {
          success: false,
          cassAssertions: [],
          xapiStatements: [],
          errors: [error.message],
        };
      } finally {
        setIsTracking(false);
      }
    },
    [userId, userName, options]
  );

  /**
   * Tracker le début d'une activité (xAPI uniquement)
   */
  const trackActivityStart = useCallback(
    async (params: Omit<TrackActivityParams, 'score' | 'maxScore' | 'duration' | 'ceredis'>) => {
      try {
        if (options.debug) {
          console.log('[useActivityTracking] 🎬 Tracking début activité:', params.activityId);
        }

        await unifiedIntegrationService.trackActivityStart({
          userId,
          userName,
          activityId: params.activityId,
          activityName: params.activityName,
          activityType: params.activityType,
          chansonId: params.chansonId,
          seanceId: params.seanceId,
          niveau: params.niveau,
        });

        if (options.debug) {
          console.log('[useActivityTracking] ✅ Début activité tracké');
        }
      } catch (err) {
        if (options.debug) {
          console.error('[useActivityTracking] ❌ Erreur tracking début:', err);
        }
      }
    },
    [userId, userName, options]
  );

  /**
   * Réinitialiser l'état
   */
  const reset = useCallback(() => {
    setLastResult(null);
    setError(null);
  }, []);

  return {
    // État
    isTracking,
    lastResult,
    error,
    
    // Fonctions
    trackActivity,
    trackActivityStart,
    reset,
    
    // Infos utilisateur
    userId,
    userName,
  };
}

/**
 * Hook simplifié pour récupérer seulement les infos utilisateur
 * Utile quand on veut juste passer userId/userName aux composants
 */
export function useUserInfo() {
  // TODO: Récupérer depuis contexte d'authentification
  return {
    userId: TEMP_USER.id,
    userName: TEMP_USER.name,
  };
}
