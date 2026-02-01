import type { CeredisConfig } from './types';

export const CEREDIS_CONFIG: CeredisConfig = {
  version: "1.0",
  scale: { min: 0, max: 600 },
  
  evidenceWeights: {
    P1: 0.15,
    P2: 0.30,
    P3: 0.35,
    P4: 0.20
  },

  domains: {
    D1: {
      name: "Compréhension de l'oral (chansons)",
      weight: 0.20,
      competencies: ["1.1", "1.2", "1.3"]
    },
    D2: {
      name: "Compréhension de l'écrit (paroles)",
      weight: 0.20,
      competencies: ["2.1", "2.2", "2.3"]
    },
    D3: {
      name: "Production écrite",
      weight: 0.20,
      competencies: ["3.1", "3.2", "3.3"]
    },
    D4: {
      name: "Interaction et interprétation",
      weight: 0.20,
      competencies: ["4.1", "4.2", "4.3"]
    },
    D5: {
      name: "Métalinguistique et métacognitif",
      weight: 0.20,
      competencies: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7"],
      minScore: 60
    }
  },

  cecrlThresholds: {
    A2: [200, 299],
    B1: [300, 399],
    B2: [400, 499],
    C1: [500, 599]
  },

  levels: {
    B2: {
      minScore: 400,
      requiredEvidenceTypes: ["P3"],
      requiredDomains: { D5: { minScore: 60 } }
    },
    C1: {
      minScore: 500,
      requiredEvidenceTypes: ["P3", "P4"],
      requiredDomains: { D5: { minScore: 70 } }
    }
  }
};
