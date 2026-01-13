/**
 * TYPES CEREDIS UNIFIÉS
 * 
 * Ce fichier centralise tous les types CEREDIS et étend les types existants
 * avec la metadata CEREDIS nécessaire pour le tracking automatique.
 * 
 * Import recommandé :
 * ```typescript
 * import type { CompetencyId, CeredisMetadata, EcranCeredis } from '@/types/ceredis';
 * ```
 */

// ==========================================
// RÉEXPORT DES TYPES UNIFIÉS
// ==========================================

export type {
  CompetencyId,
  DomaineId,
  EvidenceType,
  NiveauCECRL,
  ActivityType,
  CompetenceDescription,
  CeredisMetadata
} from '@/services/integration-unified/types.unified';

export {
  COMPETENCES_MAP,
  getCompetenceDescription,
  getCompetencesByDomaine,
  isDomain5Competency,
  getDomaine
} from '@/services/integration-unified/types.unified';

// ==========================================
// EXTENSIONS DES TYPES EXISTANTS
// ==========================================

import type { Ecran, Seance, ActiviteData } from './seance';
import type { CeredisMetadata, CompetencyId, EvidenceType, DomaineId, NiveauCECRL } from '@/services/integration-unified/types.unified';

/**
 * Écran avec metadata CEREDIS
 * Extension du type Ecran existant
 */
export interface EcranCeredis extends Ecran {
  /**
   * Metadata CEREDIS pour le tracking automatique
   * Cette metadata est requise pour créer les Evidences, Assertions CaSS et Statements xAPI
   */
  ceredis: CeredisMetadata;
}

/**
 * Séance avec metadata CEREDIS
 * Extension du type Seance existant
 */
export interface SeanceCeredis extends Omit<Seance, 'ecrans'> {
  /**
   * Écrans avec metadata CEREDIS
   */
  ecrans: EcranCeredis[];
  
  /**
   * Metadata CEREDIS globale de la séance (optionnelle)
   * Peut être utilisée pour des statistiques ou des filtres
   */
  ceredisGlobal?: {
    domainesPrincipaux: DomaineId[];
    niveauCible: NiveauCECRL;
    scoreMaxTotal: number;
    distributionEvidences: {
      P1: number; // Nombre d'activités P1
      P2: number; // Nombre d'activités P2
      P3: number; // Nombre d'activités P3
      P4: number; // Nombre d'activités P4
    };
    competencesUniques: CompetencyId[]; // Liste des compétences travaillées
  };
}

/**
 * Activité avec metadata CEREDIS
 * Peut être utilisée pour typer les activités individuelles
 */
export interface ActiviteCeredis {
  data: ActiviteData;
  ceredis: CeredisMetadata;
}

// ==========================================
// HELPERS POUR CRÉER LA METADATA
// ==========================================

/**
 * Options pour créer une metadata CEREDIS
 */
export interface CreateCeredisMetadataOptions {
  competencies: CompetencyId[];
  evidenceType: EvidenceType;
  niveau: NiveauCECRL;
  scoreMax: number;
  domaine?: DomaineId; // Optionnel, sera déduit si absent
}

/**
 * Créer une metadata CEREDIS
 * Déduit automatiquement le domaine principal si non fourni
 */
export function createCeredisMetadata(options: CreateCeredisMetadataOptions): CeredisMetadata {
  const { competencies, evidenceType, niveau, scoreMax } = options;
  
  // Déduire le domaine principal si non fourni
  let domaine = options.domaine;
  if (!domaine && competencies.length > 0) {
    // Prendre le domaine de la première compétence
    const firstComp = competencies[0];
    const domaineNumber = firstComp.split('.')[0];
    domaine = `D${domaineNumber}` as DomaineId;
  }
  
  if (!domaine) {
    throw new Error('Impossible de déduire le domaine. Veuillez le spécifier explicitement.');
  }
  
  return {
    competencies,
    evidenceType,
    domaine,
    niveau,
    scoreMax
  };
}

/**
 * Vérifier si un écran a une metadata CEREDIS
 */
export function hasCeredisMetadata(ecran: Ecran | EcranCeredis): ecran is EcranCeredis {
  return 'ceredis' in ecran && ecran.ceredis !== undefined;
}

/**
 * Extraire les compétences uniques d'une séance
 */
export function extractUniqueCompetencies(seance: SeanceCeredis): CompetencyId[] {
  const competencies = new Set<CompetencyId>();
  
  seance.ecrans.forEach(ecran => {
    if (hasCeredisMetadata(ecran)) {
      ecran.ceredis.competencies.forEach(comp => competencies.add(comp));
    }
  });
  
  return Array.from(competencies);
}

/**
 * Calculer la distribution des types de preuves dans une séance
 */
export function calculateEvidenceDistribution(seance: SeanceCeredis): {
  P1: number;
  P2: number;
  P3: number;
  P4: number;
} {
  const distribution = { P1: 0, P2: 0, P3: 0, P4: 0 };
  
  seance.ecrans.forEach(ecran => {
    if (hasCeredisMetadata(ecran)) {
      const type = ecran.ceredis.evidenceType;
      distribution[type]++;
    }
  });
  
  return distribution;
}

/**
 * Calculer le score maximum total d'une séance
 */
export function calculateTotalMaxScore(seance: SeanceCeredis): number {
  return seance.ecrans.reduce((total, ecran) => {
    if (hasCeredisMetadata(ecran)) {
      return total + ecran.ceredis.scoreMax;
    }
    return total;
  }, 0);
}

/**
 * Extraire les domaines principaux d'une séance
 */
export function extractMainDomains(seance: SeanceCeredis): DomaineId[] {
  const domains = new Set<DomaineId>();
  
  seance.ecrans.forEach(ecran => {
    if (hasCeredisMetadata(ecran)) {
      domains.add(ecran.ceredis.domaine);
    }
  });
  
  return Array.from(domains);
}

/**
 * Générer automatiquement la metadata globale d'une séance
 */
export function generateSeanceGlobalMetadata(seance: SeanceCeredis): SeanceCeredis['ceredisGlobal'] {
  return {
    domainesPrincipaux: extractMainDomains(seance),
    niveauCible: seance.ecrans[0]?.ceredis?.niveau || 'B1',
    scoreMaxTotal: calculateTotalMaxScore(seance),
    distributionEvidences: calculateEvidenceDistribution(seance),
    competencesUniques: extractUniqueCompetencies(seance)
  };
}

// ==========================================
// MAPPING TYPES D'ÉCRANS → TYPES D'ACTIVITÉS
// ==========================================

import type { TypeEcran } from './seance';

/**
 * Mapper un TypeEcran vers un ActivityType pour le service unifié
 */
export function mapTypeEcranToActivityType(typeEcran: TypeEcran): string {
  const mapping: Record<TypeEcran, string> = {
    'introduction': 'introduction',
    'ecoute_decouverte': 'ecoute_decouverte',
    'ecoute_ciblee': 'ecoute_guidee',
    'ecoute_guidee': 'ecoute_guidee',
    'comprehension': 'comprehension',
    'quiz_qcm': 'qcm',
    'quiz_qcm_justifie': 'qcm_justifie',
    'texte_a_trous': 'texte_a_trous',
    'ordre_elements': 'ordre_elements',
    'analyse_textuelle': 'analyse_guidee',
    'grammaire': 'grammaire',
    'vocabulaire': 'vocabulaire',
    'production_ecrite': 'production_ecrite',
    'production_orale': 'production_orale',
    'texte_libre': 'texte_libre',
    'journal_reflexif': 'journal_reflexif',
    'debat': 'debat',
    'bilan': 'bilan'
  };
  
  return mapping[typeEcran] || typeEcran;
}

// ==========================================
// VALIDATIONS
// ==========================================

/**
 * Valider qu'une metadata CEREDIS est bien formée
 */
export function validateCeredisMetadata(metadata: CeredisMetadata): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!metadata.competencies || metadata.competencies.length === 0) {
    errors.push('Au moins une compétence doit être spécifiée');
  }
  
  if (!['P1', 'P2', 'P3', 'P4'].includes(metadata.evidenceType)) {
    errors.push(`Type de preuve invalide: ${metadata.evidenceType}`);
  }
  
  if (!['D1', 'D2', 'D3', 'D4', 'D5'].includes(metadata.domaine)) {
    errors.push(`Domaine invalide: ${metadata.domaine}`);
  }
  
  if (metadata.scoreMax <= 0) {
    errors.push('Le score maximum doit être positif');
  }
  
  // Vérifier cohérence domaine / compétences
  metadata.competencies.forEach(comp => {
    const compDomaine = `D${comp.split('.')[0]}` as DomaineId;
    if (compDomaine !== metadata.domaine) {
      errors.push(`Incohérence : compétence ${comp} (domaine ${compDomaine}) ne correspond pas au domaine déclaré ${metadata.domaine}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Valider qu'un écran CEREDIS est bien formé
 */
export function validateEcranCeredis(ecran: EcranCeredis): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!ecran.ceredis) {
    errors.push('Metadata CEREDIS manquante');
    return { valid: false, errors };
  }
  
  const metadataValidation = validateCeredisMetadata(ecran.ceredis);
  if (!metadataValidation.valid) {
    errors.push(...metadataValidation.errors);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Valider qu'une séance CEREDIS est bien formée
 */
export function validateSeanceCeredis(seance: SeanceCeredis): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!seance.ecrans || seance.ecrans.length === 0) {
    errors.push('La séance doit contenir au moins un écran');
    return { valid: false, errors };
  }
  
  seance.ecrans.forEach((ecran, index) => {
    const ecranValidation = validateEcranCeredis(ecran);
    if (!ecranValidation.valid) {
      errors.push(`Écran ${index + 1} (${ecran.id}): ${ecranValidation.errors.join(', ')}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ==========================================
// TYPES POUR MIGRATION
// ==========================================

/**
 * Type pour migrer un ancien écran vers un écran CEREDIS
 */
export type EcranMigration = {
  ancien: Ecran;
  nouveau: EcranCeredis;
  changesSummary: string[];
};

/**
 * Créer un écran CEREDIS depuis un écran existant
 */
export function migrateEcranToCeredis(
  ecran: Ecran,
  metadata: CreateCeredisMetadataOptions
): EcranCeredis {
  const ceredisMetadata = createCeredisMetadata(metadata);
  
  return {
    ...ecran,
    ceredis: ceredisMetadata
  };
}
