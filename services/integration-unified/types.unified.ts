/**
 * TYPES UNIFIÉS CEREDIS
 * Harmonise Phase B/C avec Next.js existant
 */

// ==========================================
// COMPÉTENCES CEREDIS (Phase B)
// ==========================================

/**
 * IDs des compétences CEREDIS (format Phase B)
 * Domaines : D1-D5
 * Compétences : X.Y (ex: 1.1, 2.3, 5.6)
 */
export type CompetencyId =
  // Domaine 1 : Compréhension orale
  | '1.1' | '1.2' | '1.3'
  // Domaine 2 : Compréhension écrite
  | '2.1' | '2.2' | '2.3'
  // Domaine 3 : Production écrite
  | '3.1' | '3.2' | '3.3'
  // Domaine 4 : Interaction
  | '4.1' | '4.2' | '4.3'
  // Domaine 5 : Métalinguistique et métacognitif
  | '5.1' | '5.2' | '5.3' | '5.4' | '5.5' | '5.6' | '5.7';

/**
 * IDs des domaines CEREDIS
 */
export type DomaineId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';

/**
 * Types de preuves (Phase B)
 * P1 : Réception simple
 * P2 : Analyse guidée
 * P3 : Production argumentée
 * P4 : Métacognition
 */
export type EvidenceType = 'P1' | 'P2' | 'P3' | 'P4';

// ==========================================
// NIVEAUX CECRL
// ==========================================

/**
 * Niveaux CECRL standard
 */
export type NiveauCECRL = 
  | 'A1' | 'A2' | 'A2+' 
  | 'B1' | 'B1+' | 'B2' | 'B2+'
  | 'C1' | 'C1+' | 'C2';

// ==========================================
// METADATA CEREDIS (Phase B/C)
// ==========================================

/**
 * Metadata CEREDIS complète pour une activité
 * Format Phase B/C
 */
export interface CeredisMetadata {
  /** Compétences travaillées (format CEREDIS) */
  competencies: CompetencyId[];
  
  /** Type de preuve généré */
  evidenceType: EvidenceType;
  
  /** Domaine principal */
  domaine: DomaineId;
  
  /** Niveau CECRL cible */
  niveau: NiveauCECRL;
  
  /** Score maximum possible */
  scoreMax: number;
}

// ==========================================
// MAPPING COMPÉTENCES
// ==========================================

/**
 * Description complète d'une compétence CEREDIS
 */
export interface CompetenceDescription {
  id: CompetencyId;
  domaine: DomaineId;
  name: string;
  description: string;
  level: NiveauCECRL;
}

/**
 * Map des 19 compétences CEREDIS
 */
export const COMPETENCES_MAP: Record<CompetencyId, CompetenceDescription> = {
  // Domaine 1 : Compréhension orale
  '1.1': {
    id: '1.1',
    domaine: 'D1',
    name: 'Compréhension globale orale',
    description: 'Comprendre le sens général d\'un message oral',
    level: 'A2'
  },
  '1.2': {
    id: '1.2',
    domaine: 'D1',
    name: 'Compréhension détaillée orale',
    description: 'Identifier des informations spécifiques dans un message oral',
    level: 'B1'
  },
  '1.3': {
    id: '1.3',
    domaine: 'D1',
    name: 'Compréhension implicite orale',
    description: 'Comprendre le sens implicite, l\'intention, l\'ironie',
    level: 'B2'
  },

  // Domaine 2 : Compréhension écrite
  '2.1': {
    id: '2.1',
    domaine: 'D2',
    name: 'Compréhension globale écrite',
    description: 'Comprendre le sens général d\'un texte',
    level: 'A2'
  },
  '2.2': {
    id: '2.2',
    domaine: 'D2',
    name: 'Compréhension détaillée écrite',
    description: 'Identifier des informations spécifiques dans un texte',
    level: 'B1'
  },
  '2.3': {
    id: '2.3',
    domaine: 'D2',
    name: 'Compréhension analytique écrite',
    description: 'Analyser la structure et les procédés d\'un texte',
    level: 'B2'
  },

  // Domaine 3 : Production écrite
  '3.1': {
    id: '3.1',
    domaine: 'D3',
    name: 'Production écrite simple',
    description: 'Écrire des textes courts et simples',
    level: 'A2'
  },
  '3.2': {
    id: '3.2',
    domaine: 'D3',
    name: 'Production écrite structurée',
    description: 'Rédiger des textes cohérents et organisés',
    level: 'B1'
  },
  '3.3': {
    id: '3.3',
    domaine: 'D3',
    name: 'Production écrite argumentée',
    description: 'Développer une argumentation structurée',
    level: 'B2'
  },

  // Domaine 4 : Interaction
  '4.1': {
    id: '4.1',
    domaine: 'D4',
    name: 'Interaction simple',
    description: 'Échanger des informations simples',
    level: 'A2'
  },
  '4.2': {
    id: '4.2',
    domaine: 'D4',
    name: 'Interaction collaborative',
    description: 'Participer à une discussion, coopérer',
    level: 'B1'
  },
  '4.3': {
    id: '4.3',
    domaine: 'D4',
    name: 'Interaction argumentative',
    description: 'Débattre, défendre un point de vue',
    level: 'B2'
  },

  // Domaine 5 : Métalinguistique et métacognitif
  '5.1': {
    id: '5.1',
    domaine: 'D5',
    name: 'Conscience phonologique',
    description: 'Identifier et manipuler les sons de la langue',
    level: 'B1'
  },
  '5.2': {
    id: '5.2',
    domaine: 'D5',
    name: 'Conscience morphologique',
    description: 'Analyser la structure des mots',
    level: 'B1'
  },
  '5.3': {
    id: '5.3',
    domaine: 'D5',
    name: 'Conscience syntaxique',
    description: 'Comprendre la structure des phrases',
    level: 'B2'
  },
  '5.4': {
    id: '5.4',
    domaine: 'D5',
    name: 'Conscience textuelle',
    description: 'Analyser l\'organisation des textes',
    level: 'B2'
  },
  '5.5': {
    id: '5.5',
    domaine: 'D5',
    name: 'Conscience pragmatique',
    description: 'Comprendre l\'usage de la langue en contexte',
    level: 'C1'
  },
  '5.6': {
    id: '5.6',
    domaine: 'D5',
    name: 'Métacognition',
    description: 'Réfléchir sur son propre apprentissage',
    level: 'B2'
  },
  '5.7': {
    id: '5.7',
    domaine: 'D5',
    name: 'Conscience interculturelle',
    description: 'Comprendre les aspects culturels de la langue',
    level: 'B2'
  }
};

// ==========================================
// TYPES D'ACTIVITÉS
// ==========================================

/**
 * Types d'activités pédagogiques
 */
export type ActivityType =
  | 'introduction'
  | 'ecoute_decouverte'
  | 'ecoute_guidee'
  | 'quiz_qcm'
  | 'qcm'
  | 'quiz_qcm_justifie'
  | 'qcm_justifie'
  | 'qcm_avec_justification'
  | 'texte_a_trous'
  | 'texte_trous'
  | 'ordre_elements'
  | 'texte_libre'
  | 'production_ecrite'
  | 'journal_reflexif'
  | 'analyse_textuelle'
  | 'analyse_guidee'
  | 'debat'
  | 'bilan'
  | 'auto_evaluation';

// ==========================================
// HELPERS
// ==========================================

/**
 * Obtenir la description d'une compétence
 */
export function getCompetenceDescription(competencyId: CompetencyId): CompetenceDescription | undefined {
  return COMPETENCES_MAP[competencyId];
}

/**
 * Obtenir toutes les compétences d'un domaine
 */
export function getCompetencesByDomaine(domaine: DomaineId): CompetenceDescription[] {
  return Object.values(COMPETENCES_MAP).filter(c => c.domaine === domaine);
}

/**
 * Vérifier si une compétence appartient au Domaine 5
 */
export function isDomain5Competency(competencyId: CompetencyId): boolean {
  return competencyId.startsWith('5.');
}

/**
 * Obtenir le domaine d'une compétence
 */
export function getDomaine(competencyId: CompetencyId): DomaineId {
  const domaineNumber = competencyId.split('.')[0];
  return `D${domaineNumber}` as DomaineId;
}
