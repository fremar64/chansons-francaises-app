/**
 * SERVICE D'INTÉGRATION UNIFIÉ
 * Combine Phase C (PocketBase) + Next.js existant (CaSS + xAPI)
 * 
 * Ce service unifié gère automatiquement :
 * 1. Création d'Evidences dans PocketBase (Phase C)
 * 2. Création d'Assertions CaSS (Next.js existant)
 * 3. Envoi de Statements xAPI vers Ralph LRS (Next.js existant)
 * 4. Application des règles Domaine 5
 */

import { cassService, type CassService } from '../integration/cass.service';
import { xapiService, type XApiService } from '../integration/xapi.service';
import type { NiveauCECRL, CassAssertion, XApiStatement } from '../integration/types';
import { COMPETENCES_CEREDIS } from '../integration/types';
import type { CompetencyId, EvidenceType } from './types.unified';

// ==========================================
// CONFIGURATION
// ==========================================

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net';
const EVIDENCES_COLLECTION = 'evidences';

// ==========================================
// RÈGLES DOMAINE 5
// ==========================================

/**
 * Types d'activités considérés comme "preuves réflexives"
 */
const ACTIVITES_REFLEXIVES = [
  'journal_reflexif',
  'auto_evaluation',
  'bilan',
  'texte_libre',
  'production_ecrite',
  'commentaire_compose',
  'dissertation'
];

/**
 * Types d'activités considérés comme "preuves linguistiques"
 */
const ACTIVITES_LINGUISTIQUES = [
  'analyse_guidee',
  'qcm_avec_justification',
  'qcm_justifie',
  'texte_trous',
  'texte_a_trous',
  'ordre_elements',
  'reperage_formes'
];

/**
 * Activités qui fournissent AUTOMATIQUEMENT une preuve réflexive
 */
const ACTIVITES_AUTO_REFLEXIVES = [
  'texte_libre',
  'journal_reflexif',
  'production_ecrite',
  'commentaire_compose',
  'dissertation',
  'qcm_avec_justification',
  'qcm_justifie'
];

// ==========================================
// TYPES UNIFIÉS
// ==========================================

/**
 * Metadata CEREDIS pour une activité (Phase C)
 */
export interface CeredisMetadata {
  competencies: CompetencyId[];
  evidenceType: EvidenceType;
  domaine: string;
  niveau: string;
  scoreMax: number;
}

/**
 * Evidence PocketBase (Phase C)
 */
export interface Evidence {
  agentId: string;
  competencyId: CompetencyId;
  type: EvidenceType;
  score: number;        // Pourcentage 0-100
  timestamp: number;
  activityId: string;
  activityName?: string;
  metadata?: Record<string, any>;
}

/**
 * Payload unifié pour le tracking d'activité
 * Combine Phase C + Next.js existant
 */
export interface UnifiedActivityPayload {
  // Identifiants utilisateur
  userId: string;
  userName: string;
  
  // Identifiants activité
  activityId: string;
  activityName: string;
  activityType: string;
  
  // Contexte pédagogique
  chansonId: string;
  seanceId: string;
  niveau: NiveauCECRL;
  
  // Performance
  score: number;        // Score brut obtenu
  maxScore: number;     // Score maximum possible
  duration?: number;    // Durée en secondes
  
  // Metadata CEREDIS (Phase C)
  ceredis: CeredisMetadata;
  
  // Réponse de l'apprenant (pour règles Domaine 5)
  response?: string;
  
  // Metadata additionnelle
  metadata?: Record<string, any>;
  
  // Timestamp de début (optionnel)
  startTime?: number;
}

/**
 * Résultat unifié du tracking
 */
export interface UnifiedTrackingResult {
  success: boolean;
  evidencesCreated: number;        // PocketBase
  cassAssertions: CassAssertion[]; // CaSS
  xapiStatements: XApiStatement[]; // Ralph LRS
  errors: string[];
}

// ==========================================
// SERVICE UNIFIÉ
// ==========================================

export class UnifiedIntegrationService {
  private cass: CassService;
  private xapi: XApiService;
  private pocketbaseUrl: string;
  private enabled: {
    pocketbase: boolean;
    cass: boolean;
    xapi: boolean;
  };

  constructor(
    cass: CassService = cassService,
    xapi: XApiService = xapiService,
    pocketbaseUrl: string = POCKETBASE_URL
  ) {
    this.cass = cass;
    this.xapi = xapi;
    this.pocketbaseUrl = pocketbaseUrl;
    
    // Vérifier les configurations
    this.enabled = {
      pocketbase: !!pocketbaseUrl,
      cass: !!process.env.NEXT_PUBLIC_CASS_API_KEY,
      xapi: !!(process.env.NEXT_PUBLIC_LRS_USERNAME && process.env.NEXT_PUBLIC_LRS_PASSWORD)
    };

    // Logs de configuration
    if (!this.enabled.pocketbase) {
      console.warn('[UnifiedIntegration] PocketBase URL non configurée');
    }
    if (!this.enabled.cass) {
      console.warn('[UnifiedIntegration] CaSS désactivé (clé API manquante)');
    }
    if (!this.enabled.xapi) {
      console.warn('[UnifiedIntegration] xAPI désactivé (credentials LRS manquants)');
    }
  }

  /**
   * FONCTION PRINCIPALE : Enregistrer la complétion d'une activité
   * 
   * Cette fonction gère automatiquement :
   * 1. Création d'Evidences PocketBase (Phase C)
   * 2. Création d'Assertions CaSS (Next.js)
   * 3. Envoi de Statements xAPI (Next.js)
   * 4. Application des règles Domaine 5
   */
  async trackActivityCompletion(payload: UnifiedActivityPayload): Promise<UnifiedTrackingResult> {
    const result: UnifiedTrackingResult = {
      success: true,
      evidencesCreated: 0,
      cassAssertions: [],
      xapiStatements: [],
      errors: []
    };

    const scoreRatio = payload.score / payload.maxScore;
    const scorePercentage = scoreRatio * 100;
    const isSuccess = scoreRatio >= 0.6; // 60% minimum

    console.log(`[UnifiedIntegration] 📊 Tracking activité "${payload.activityId}"`);
    console.log(`[UnifiedIntegration] Score: ${payload.score}/${payload.maxScore} (${scorePercentage.toFixed(1)}%)`);

    // ==============================
    // 0. RÈGLE DE COHÉRENCE DOMAINE 5
    // ==============================
    const canValidateDomain5 = this.canValidateDomain5Competencies(
      payload.activityType,
      payload.response
    );
    
    if (!canValidateDomain5 && payload.ceredis.competencies.some(c => c.startsWith('5.'))) {
      console.log(`[UnifiedIntegration] ⚠️ Activité "${payload.activityType}" ne peut pas valider directement les compétences Domaine 5`);
    }

    // ==============================
    // 1. POCKETBASE : Créer Evidences
    // ==============================
    if (this.enabled.pocketbase) {
      try {
        const evidences: Evidence[] = payload.ceredis.competencies.map(competencyId => ({
          agentId: payload.userId,
          competencyId,
          type: payload.ceredis.evidenceType,
          score: scorePercentage,
          timestamp: Date.now(),
          activityId: payload.activityId,
          activityName: payload.activityName,
          metadata: {
            userName: payload.userName,
            chansonId: payload.chansonId,
            seanceId: payload.seanceId,
            niveau: payload.niveau,
            duration: payload.duration,
            rawScore: payload.score,
            maxScore: payload.maxScore,
            activityType: payload.activityType,
            ...payload.metadata
          }
        }));

        const pocketbaseResults = await Promise.allSettled(
          evidences.map(evidence => this.createEvidence(evidence))
        );

        const successfulEvidences = pocketbaseResults.filter(r => r.status === 'fulfilled').length;
        result.evidencesCreated = successfulEvidences;

        const failedEvidences = pocketbaseResults
          .filter(r => r.status === 'rejected')
          .map(r => (r as PromiseRejectedResult).reason?.message || 'Unknown error');
        
        if (failedEvidences.length > 0) {
          result.errors.push(...failedEvidences.map(err => `PocketBase: ${err}`));
        }

        console.log(`[UnifiedIntegration] ✅ PocketBase: ${successfulEvidences} Evidences créées`);
      } catch (error: any) {
        result.errors.push(`PocketBase: ${error.message}`);
        console.error('[UnifiedIntegration] ❌ Erreur PocketBase:', error);
      }
    }

    // ==============================
    // 2. xAPI : Statement "completed"
    // ==============================
    if (this.enabled.xapi) {
      try {
        const completedStatement = this.xapi.createCompletedStatement(
          payload.userId,
          payload.userName,
          payload.activityId,
          payload.activityName,
          payload.score,
          payload.maxScore,
          payload.duration || 0,
          payload.activityType,
          {
            chansonId: payload.chansonId,
            seanceId: payload.seanceId
          }
        );

        await this.xapi.sendStatement(completedStatement);
        result.xapiStatements.push(completedStatement);
        
        console.log(`[UnifiedIntegration] ✅ xAPI: Statement "completed" envoyé`);
      } catch (error: any) {
        result.errors.push(`xAPI completed: ${error.message}`);
        console.error('[UnifiedIntegration] ❌ Erreur xAPI completed:', error);
      }
    }

    // ==============================
    // 3. CaSS : Créer Assertions (si réussite)
    // ==============================
    if (this.enabled.cass && isSuccess) {
      try {
        const evidenceUrl = `${this.pocketbaseUrl}/response/${payload.activityId}`;
        
        // Créer assertions avec filtre Domaine 5
        const assertions = await this.cass.createMultipleAssertions(
          payload.userId,
          payload.activityId,
          payload.activityType,
          payload.niveau,
          payload.score,
          payload.maxScore,
          evidenceUrl,
          canValidateDomain5
        );

        result.cassAssertions.push(...assertions);
        
        console.log(`[UnifiedIntegration] ✅ CaSS: ${assertions.length} Assertions créées`);

        // ==============================
        // 4. xAPI : Statements "mastered" pour chaque compétence
        // ==============================
        if (this.enabled.xapi && assertions.length > 0) {
          for (const assertion of assertions) {
            try {
              const compId = assertion.competency as CompetencyId;
              const comp = COMPETENCES_CEREDIS[compId];
              
              if (comp) {
                const masteredStatement = this.xapi.createMasteredStatement(
                  payload.userId,
                  payload.userName,
                  compId,
                  comp.name,
                  comp.level,
                  assertion['@id']
                );

                await this.xapi.sendStatement(masteredStatement);
                result.xapiStatements.push(masteredStatement);
              }
            } catch (error: any) {
              result.errors.push(`xAPI mastered ${assertion.competency}: ${error.message}`);
            }
          }
          
          console.log(`[UnifiedIntegration] ✅ xAPI: ${assertions.length} Statements "mastered" envoyés`);
        }
      } catch (error: any) {
        result.errors.push(`CaSS: ${error.message}`);
        console.error('[UnifiedIntegration] ❌ Erreur CaSS:', error);
      }
    }

    result.success = result.errors.length === 0;

    // Log résumé
    console.log('[UnifiedIntegration] 📊 RÉSUMÉ:', {
      success: result.success,
      evidences: result.evidencesCreated,
      cassAssertions: result.cassAssertions.length,
      xapiStatements: result.xapiStatements.length,
      errors: result.errors.length
    });

    return result;
  }

  /**
   * Enregistrer le début d'une activité (xAPI uniquement)
   */
  async trackActivityStart(data: Omit<UnifiedActivityPayload, 'score' | 'maxScore' | 'duration' | 'ceredis'>): Promise<void> {
    if (!this.enabled.xapi) return;

    try {
      const statement = this.xapi.createAttemptedStatement(
        data.userId,
        data.userName,
        data.activityId,
        data.activityName,
        data.activityType,
        {
          chansonId: data.chansonId,
          seanceId: data.seanceId
        }
      );

      await this.xapi.sendStatement(statement);
      console.log(`[UnifiedIntegration] ✅ xAPI: Statement "attempted" envoyé`);
    } catch (error) {
      console.error('[UnifiedIntegration] ❌ Erreur track start:', error);
    }
  }

  /**
   * Créer une Evidence dans PocketBase
   */
  private async createEvidence(evidence: Evidence): Promise<void> {
    const response = await fetch(`${this.pocketbaseUrl}/api/collections/${EVIDENCES_COLLECTION}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evidence),
      credentials: 'include',
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create evidence: ${error}`);
    }
  }

  /**
   * RÈGLE DE COHÉRENCE DOMAINE 5
   * 
   * Vérifie si une activité peut valider des compétences du Domaine 5 (métalinguistique).
   * 
   * Conditions pour valider une compétence 5.x :
   * 1. L'activité est de type "auto-réflexif", OU
   * 2. L'activité fournit une réponse textuelle (justification)
   */
  private canValidateDomain5Competencies(activityType: string, response?: string): boolean {
    // Les activités auto-réflexives peuvent toujours valider le Domaine 5
    if (ACTIVITES_AUTO_REFLEXIVES.includes(activityType)) {
      return true;
    }

    // Les activités linguistiques AVEC justification textuelle peuvent valider le Domaine 5
    if (ACTIVITES_LINGUISTIQUES.includes(activityType) && response && response.trim().length >= 20) {
      return true;
    }

    // Les QCM simples, texte à trous simples, etc. ne peuvent PAS valider le Domaine 5
    return false;
  }

  /**
   * Vérifier la connexion aux 3 systèmes
   */
  async testConnections(): Promise<{
    pocketbase: boolean;
    cass: boolean;
    xapi: boolean;
  }> {
    const [pocketbaseOk, cassOk, xapiOk] = await Promise.allSettled([
      this.checkPocketBaseConnection(),
      this.enabled.cass ? this.cass.testConnection() : Promise.resolve(false),
      this.enabled.xapi ? this.xapi.testConnection() : Promise.resolve(false)
    ]);

    return {
      pocketbase: pocketbaseOk.status === 'fulfilled' ? pocketbaseOk.value : false,
      cass: cassOk.status === 'fulfilled' ? cassOk.value : false,
      xapi: xapiOk.status === 'fulfilled' ? xapiOk.value : false
    };
  }

  /**
   * Vérifier la connexion à PocketBase
   */
  private async checkPocketBaseConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.pocketbaseUrl}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('[UnifiedIntegration] Erreur connexion PocketBase:', error);
      return false;
    }
  }

  /**
   * Obtenir le statut de l'intégration
   */
  getStatus() {
    return {
      pocketbase: {
        enabled: this.enabled.pocketbase,
        configured: !!this.pocketbaseUrl
      },
      cass: {
        enabled: this.enabled.cass,
        configured: !!process.env.NEXT_PUBLIC_CASS_API_KEY
      },
      xapi: {
        enabled: this.enabled.xapi,
        configured: !!(process.env.NEXT_PUBLIC_LRS_USERNAME && process.env.NEXT_PUBLIC_LRS_PASSWORD)
      }
    };
  }
}

// ==========================================
// INSTANCE SINGLETON
// ==========================================

export const unifiedIntegrationService = new UnifiedIntegrationService();

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Créer un payload unifié depuis les données d'une activité
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
    startTime?: number;
  }
): UnifiedActivityPayload {
  return {
    userId,
    userName,
    activityId,
    activityName,
    activityType,
    score,
    maxScore,
    ceredis,
    ...options
  };
}
