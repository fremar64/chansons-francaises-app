/**
 * SERVICE D'INTÉGRATION UNIFIÉ - Version API Route
 * 
 * Cette version utilise les API Routes Next.js pour éviter d'exposer
 * les credentials CaSS/xAPI au client.
 * 
 * Architecture :
 * - Frontend (ce fichier) → API Route Next.js → CaSS + xAPI + PocketBase
 * - JWT CaSS géré côté serveur uniquement
 * - Pas de credentials exposés au navigateur
 */

import { ceredisApi } from '@/lib/ceredis-api-client';
import type { NiveauCECRL } from '../integration/types';
import type { CompetencyId, EvidenceType } from './types.unified';

// ==========================================
// TYPES UNIFIÉS (compatibilité)
// ==========================================

export interface CeredisMetadata {
  competencies: CompetencyId[];
  evidenceType: EvidenceType;
  domaine: string;
  niveau: string;
  scoreMax: number;
}

export interface ActivityCompletionData {
  userId: string;
  userName: string;
  activityId: string;
  activityName: string;
  activityType: string;
  chansonId: string;
  seanceId: string;
  niveau: NiveauCECRL;
  score: number;
  maxScore: number;
  duration: number;
  response?: string;
  metadata?: Record<string, any>;
}

export interface ActivityStartData {
  userId: string;
  userName: string;
  activityId: string;
  activityName: string;
  activityType: string;
  chansonId: string;
  seanceId: string;
  niveau: NiveauCECRL;
}

export interface TrackingResult {
  success: boolean;
  xapiStatements: any[];
  cassAssertions: any[];
  errors: string[];
}

// ==========================================
// SERVICE D'INTÉGRATION (DÉLÉGUÉ À L'API)
// ==========================================

export class IntegrationService {
  /**
   * Track le début d'une activité
   */
  async trackActivityStart(data: ActivityStartData): Promise<void> {
    try {
      await ceredisApi.trackActivityStart(data);
      console.log('[Integration] ✅ Activity start tracked');
    } catch (error: any) {
      console.error('[Integration] ⚠️ Activity start tracking failed:', error.message);
    }
  }

  /**
   * Track la complétion d'une activité
   */
  async trackActivityCompletion(data: ActivityCompletionData): Promise<TrackingResult> {
    try {
      const result = await ceredisApi.trackActivityCompletion(data);
      
      if (result.success) {
        console.log('[Integration] ✅ Résultat:', {
          xapiStatements: result.xapiStatements.length,
          cassAssertions: result.cassAssertions.length,
          errors: result.errors.length,
        });
      } else {
        console.error('[Integration] ⚠️ Tracking avec erreurs:', result.errors);
      }

      return result;
    } catch (error: any) {
      console.error('[Integration] ❌ Tracking failed:', error);
      return {
        success: false,
        xapiStatements: [],
        cassAssertions: [],
        errors: [error.message],
      };
    }
  }

  /**
   * Obtenir le dashboard d'un utilisateur
   */
  async getUserDashboard(userId: string): Promise<any> {
    try {
      return await ceredisApi.getUserDashboard(userId);
    } catch (error: any) {
      console.error('[Integration] ❌ Dashboard fetch failed:', error);
      throw error;
    }
  }

  /**
   * Vérifier le statut de l'intégration
   */
  getStatus() {
    return {
      mode: 'api-route',
      description: 'Using Next.js API Routes for secure tracking',
      cassJwt: 'Managed server-side',
      xapi: 'Credentials on server only',
      pocketbase: 'Direct from client (no auth required for reading)',
    };
  }
}

// ==========================================
// INSTANCE SINGLETON
// ==========================================

export const integrationService = new IntegrationService();

// ==========================================
// BACKWARD COMPATIBILITY
// ==========================================

/**
 * Alias pour compatibilité avec le code existant
 */
export const unifiedIntegrationService = integrationService;

/**
 * Type pour compatibilité
 */
export type UnifiedActivityPayload = ActivityCompletionData;

/**
 * Type pour compatibilité
 */
export type UnifiedTrackingResult = TrackingResult;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Créer un payload de tracking depuis les données d'une activité
 * Helper pour simplifier la création de payloads
 */
export function createUnifiedPayload(
  userId: string,
  userName: string,
  activityId: string,
  activityName: string,
  activityType: string,
  score: number,
  maxScore: number,
  ceredis: CeredisMetadata,
  options: {
    chansonId: string;
    seanceId: string;
    niveau: NiveauCECRL;
    duration?: number;
    response?: string;
    metadata?: Record<string, any>;
  }
): ActivityCompletionData {
  return {
    userId,
    userName,
    activityId,
    activityName,
    activityType,
    chansonId: options.chansonId,
    seanceId: options.seanceId,
    niveau: options.niveau,
    score,
    maxScore,
    duration: options.duration || 0,
    response: options.response,
    metadata: options.metadata,
  };
}
