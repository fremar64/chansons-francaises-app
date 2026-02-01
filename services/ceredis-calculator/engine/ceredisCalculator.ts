import type { CeredisConfig } from '../types';

/**
 * Calcule le score CEREDIS global (0-600)
 *
 * Formule : Score = Σ(Score_domaine × Poids_domaine) × 6
 *
 * Explication :
 * - Chaque domaine a un poids (0.20 pour tous actuellement)
 * - On fait la moyenne pondérée des domaines (0-100)
 * - On multiplie par 6 pour obtenir le score sur 600
 *
 * @param domainScores Scores par domaine (0-100)
 * @param config Configuration CEREDIS
 * @returns Score CEREDIS (0-600)
 */
export function calculateCeredisScore(
  domainScores: Record<string, number>,
  config: CeredisConfig
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [domainId, score] of Object.entries(domainScores)) {
    const domainConfig = config.domains[domainId];
    
    if (!domainConfig) {
      console.warn(`Domaine inconnu: ${domainId}`);
      continue;
    }

    const weight = domainConfig.weight;
    weightedSum += score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;

  // Score moyen pondéré (0-100) × 6 = (0-600)
  const averageScore = weightedSum / totalWeight;
  const ceredisScore = averageScore * 6;

  // Arrondir à 2 décimales
  return Math.round(ceredisScore * 100) / 100;
}

/**
 * Valide que le score CEREDIS est dans les bornes
 *
 * @param score Score CEREDIS
 * @param config Configuration CEREDIS
 * @returns true si score entre min et max
 */
export function validateCeredisScore(
  score: number,
  config: CeredisConfig
): boolean {
  return score >= config.scale.min && score <= config.scale.max;
}

/**
 * Normalise un score CEREDIS dans les bornes
 *
 * @param score Score à normaliser
 * @param config Configuration CEREDIS
 * @returns Score normalisé entre min et max
 */
export function normalizeCeredisScore(
  score: number,
  config: CeredisConfig
): number {
  return Math.max(
    config.scale.min,
    Math.min(config.scale.max, score)
  );
}
