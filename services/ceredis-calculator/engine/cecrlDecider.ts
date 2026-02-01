import type { CeredisConfig } from '../types';

export function decideCecrlLevel(
  ceredisScore: number,
  config: CeredisConfig
): 'A2' | 'B1' | 'B2' | 'C1' {
  for (const [level, [min, max]] of Object.entries(config.cecrlThresholds)) {
    if (ceredisScore >= min && ceredisScore <= max) {
      return level as 'A2' | 'B1' | 'B2' | 'C1';
    }
  }
  
  if (ceredisScore < 200) return 'A2';
  if (ceredisScore >= 600) return 'C1';
  
  return 'B1';
}
