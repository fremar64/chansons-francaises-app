/**
 * SERVICE D'INTÉGRATION UNIFIÉ - Point d'entrée
 * 
 * Ce module combine :
 * - Phase C : PocketBase Evidences
 * - Next.js : CaSS Assertions + xAPI Statements
 * 
 * Usage :
 * ```typescript
 * import { unifiedIntegrationService, createUnifiedPayload } from '@/services/integration-unified';
 * 
 * const payload = createUnifiedPayload(...);
 * const result = await unifiedIntegrationService.trackActivityCompletion(payload);
 * ```
 */

export * from './integration.unified';
export * from './types.unified';

// Export explicite des exports principaux pour faciliter l'usage
export {
  integrationService,
  unifiedIntegrationService,
  createUnifiedPayload
} from './integration.unified';

export type {
  ActivityCompletionData as UnifiedActivityPayload,
  TrackingResult as UnifiedTrackingResult,
  CeredisMetadata,
  ActivityStartData
} from './integration.unified';

export type {
  CompetencyId,
  DomaineId,
  EvidenceType,
  NiveauCECRL,
  ActivityType,
  CompetenceDescription
} from './types.unified';
