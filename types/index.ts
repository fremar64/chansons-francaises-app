/**
 * INDEX DES TYPES
 * Point d'entrée principal pour tous les types de l'application
 */

// Types de séances (existants)
export * from './seance';

// Types dashboard (existants)
export * from './dashboard';
export * from './teacher-dashboard';

// Types CEREDIS unifiés (nouveaux)
export * from './ceredis';

// Réexports pratiques pour éviter les imports multiples
export type {
  // Types séances de base
  Seance,
  Ecran,
  TypeEcran,
  ActiviteData,
  ProgressionSeance,
  
  // Types CEREDIS
  EcranCeredis,
  SeanceCeredis,
  CeredisMetadata,
  CompetencyId,
  DomaineId,
  EvidenceType,
  NiveauCECRL
} from './ceredis';
