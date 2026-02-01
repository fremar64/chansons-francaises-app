/**
 * Types pour le moteur de calcul CEREDIS
 * 
 * Utilise les types de base depuis types/ceredis.ts
 * pour CompetencyId, EvidenceType
 */

import type { CompetencyId, EvidenceType } from '@/types/ceredis';

// Evidence = Preuve d'apprentissage (structure PocketBase)
export interface Evidence {
  id: string;
  user: string;                    // ID utilisateur
  competency_id: CompetencyId;     // Ex: "1.1", "2.3", "5.7"
  evidence_type: EvidenceType;     // P1, P2, P3, P4
  score: number;                   // 0-100
  created: string;                 // ISO date
  activity_type?: string;
  seance_id?: string;
  parcours?: string;
  metadata?: Record<string, any>;
}

// Evidence agrégée par compétence
export interface AggregatedEvidence {
  competencyId: CompetencyId;
  evidences: Evidence[];
  count: number;
  avgScore: number;
  bestScore: number;
  evidenceTypes: Set<EvidenceType>;
}

// Score par compétence
export interface CompetencyScore {
  score: number;
  evidenceCount: number;
  evidenceTypes: EvidenceType[];
  lastUpdated?: string;
}

export type CompetencyScores = Record<CompetencyId, CompetencyScore>;

// Scores par domaine
export type DomainScores = Record<string, number>;

// Résultat de validation
export interface ValidationResult {
  level: 'A2' | 'B1' | 'B2' | 'C1';
  valid: boolean;
  originalLevel?: 'A2' | 'B1' | 'B2' | 'C1';
  degraded?: boolean;
  errors: string[];
  warnings: string[];
  degradationReason?: string;
  validationDetails?: {
    hasP3?: boolean;
    hasP4?: boolean;
    domain5Score?: number;
    [key: string]: any;
  };
}

// Résultat complet du calcul CEREDIS
export interface CeredisResult {
  userId: string;
  ceredisScore: number;
  cecrlLevel: 'A2' | 'B1' | 'B2' | 'C1';
  domainScores: DomainScores;
  competencyScores: CompetencyScores;
  validation: ValidationResult;
  computedAt: string;
  engineVersion: string;
}

// Configuration d'un domaine
export interface DomainConfig {
  name: string;
  weight: number;
  competencies: CompetencyId[];
  minScore?: number;
}

// Règles pour un niveau CECRL
export interface LevelRequirements {
  minScore: number;
  requiredEvidenceTypes: EvidenceType[];
  requiredDomains?: Record<string, { minScore: number }>;
}

// Configuration CEREDIS
export interface CeredisConfig {
  version: string;
  scale: { min: number; max: number };
  evidenceWeights: Record<EvidenceType, number>;
  domains: Record<string, DomainConfig>;
  cecrlThresholds: Record<string, [number, number]>;
  levels: Record<string, LevelRequirements>;
}
