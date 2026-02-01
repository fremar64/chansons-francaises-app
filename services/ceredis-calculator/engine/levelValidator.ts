import type { Evidence, ValidationResult, CeredisConfig } from '../types';

/**
 * Valide les règles strictes pour B2 et C1
 *
 * B2 REQUIS :
 * - Score ≥ 400
 * - Au moins 1 preuve P3
 * - Domaine 5 ≥ 60
 *
 * C1 REQUIS :
 * - Score ≥ 500
 * - Au moins 1 preuve P3 ET 1 preuve P4
 * - Domaine 5 ≥ 70
 *
 * Si règles non respectées → Dégradation au niveau inférieur
 *
 * @param proposedLevel Niveau proposé par le score
 * @param ceredisScore Score CEREDIS
 * @param domainScores Scores par domaine
 * @param evidences Liste des preuves
 * @param config Configuration CEREDIS
 * @returns Résultat de validation avec niveau final
 */
export function validateLevel(
  proposedLevel: 'A2' | 'B1' | 'B2' | 'C1',
  ceredisScore: number,
  domainScores: Record<string, number>,
  evidences: Evidence[],
  config: CeredisConfig
): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    level: proposedLevel,
    errors: [],
    warnings: [],
    validationDetails: {}
  };

  // A2 et B1 : pas de règles strictes
  if (proposedLevel === 'A2' || proposedLevel === 'B1') {
    return result;
  }

  // Récupérer types de preuves présentes
  const evidenceTypes = new Set(evidences.map(e => e.evidence_type));
  const hasP3 = evidenceTypes.has('P3');
  const hasP4 = evidenceTypes.has('P4');
  const domain5Score = domainScores['D5'] || 0;

  result.validationDetails = {
    hasP3,
    hasP4,
    domain5Score
  };

  // VALIDATION B2
  if (proposedLevel === 'B2') {
    const requirements = config.levels['B2'];
    if (ceredisScore < requirements.minScore) {
      result.valid = false;
      result.errors.push('Score global inférieur au minimum B2');
    }
    if (!hasP3) {
      result.valid = false;
      result.errors.push('Au moins une preuve P3 requise pour B2');
    }
    if (domain5Score < (requirements.requiredDomains?.D5?.minScore ?? 0)) {
      result.valid = false;
      result.errors.push('Domaine D5 insuffisant pour B2');
    }

    if (!result.valid) {
      result.degraded = true;
      result.originalLevel = 'B2';
      result.level = 'B1';
      result.degradationReason = 'Règles B2 non respectées';
    }
  }

  // VALIDATION C1
  if (proposedLevel === 'C1') {
    const requirements = config.levels['C1'];
    if (ceredisScore < requirements.minScore) {
      result.valid = false;
      result.errors.push('Score global inférieur au minimum C1');
    }
    if (!hasP3 || !hasP4) {
      result.valid = false;
      result.errors.push('Preuves P3 et P4 requises pour C1');
    }
    if (domain5Score < (requirements.requiredDomains?.D5?.minScore ?? 0)) {
      result.valid = false;
      result.errors.push('Domaine D5 insuffisant pour C1');
    }

    if (!result.valid) {
      result.degraded = true;
      result.originalLevel = 'C1';
      result.level = 'B2';
      result.degradationReason = 'Règles C1 non respectées';
    }
  }

  return result;
}

/**
 * Génère un rapport de validation lisible
 *
 * @param validation Résultat de validation
 * @returns Rapport textuel
 */
export function generateValidationReport(
  validation: ValidationResult
): string {
  const lines: string[] = [];
  
  lines.push(`Niveau : ${validation.level}`);
  
  if (validation.degraded) {
    lines.push(`⚠️ Dégradé depuis ${validation.originalLevel}`);
    lines.push(`Raison : ${validation.degradationReason}`);
  }
  
  if (validation.errors.length > 0) {
    lines.push('\nErreurs :');
    validation.errors.forEach(err => lines.push(`  - ${err}`));
  }
  
  if (validation.warnings.length > 0) {
    lines.push('\nAvertissements :');
    validation.warnings.forEach(warn => lines.push(`  - ${warn}`));
  }
  
  return lines.join('\n');
}
