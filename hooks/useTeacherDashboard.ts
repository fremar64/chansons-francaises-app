/**
 * Hook useTeacherDashboard
 * Récupère et agrège les données pour le Dashboard Enseignant
 * 
 * Conforme au document "TABLEAU DE BORD ANALYTIQUE CEREDIS"
 * Accès scoped aux données de la classe de l'enseignant
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { pb } from '@/lib/pocketbase';
import { COMPETENCES_CEREDIS } from '@/services/integration/types';
import type {
  SyntheseEleve,
  StatistiquesClasse,
  ProfilDomaineEleve,
  CompetenceCritique,
  PreuveDetail,
  ClasseInfo,
  ExportConfig,
  ExportResult,
  PointProgression
} from '@/types/teacher-dashboard';
import type { NiveauCECRL } from '@/services/integration/types';

// Données de domaines
const DOMAINES = [
  { id: '1', name: 'Compréhension orale', abbrev: 'CO' as const, couleur: '#3B82F6', competencesIds: ['1.1', '1.2', '1.3'] },
  { id: '2', name: 'Compréhension écrite', abbrev: 'CE' as const, couleur: '#10B981', competencesIds: ['2.1', '2.2', '2.3'] },
  { id: '3', name: 'Production écrite', abbrev: 'PE' as const, couleur: '#F59E0B', competencesIds: ['3.1', '3.2', '3.3'] },
  { id: '4', name: 'Interaction', abbrev: 'INT' as const, couleur: '#EF4444', competencesIds: ['4.1', '4.2', '4.3'] },
  { id: '5', name: 'Métacognition', abbrev: 'META' as const, couleur: '#8B5CF6', competencesIds: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'] }
];

// ============================================================================
// DONNÉES MOCK POUR DÉVELOPPEMENT (déterministes pour SSR)
// ============================================================================

// Générateur pseudo-aléatoire déterministe basé sur seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

function generateMockHistorique(seedOffset: number = 0): PointProgression[] {
  const points: PointProgression[] = [];
  let score = 350 + seededRandom(seedOffset) * 100;
  
  for (let i = 30; i >= 0; i--) {
    // Utiliser des dates fixes basées sur une date de référence
    const baseDate = new Date('2026-01-13T00:00:00.000Z');
    baseDate.setDate(baseDate.getDate() - i);
    score += (seededRandom(seedOffset + i + 100) - 0.4) * 15;
    score = Math.max(200, Math.min(550, score));
    points.push({
      date: baseDate.toISOString(),
      score: Math.round(score)
    });
  }
  return points;
}

function generateMockEleves(): SyntheseEleve[] {
  const prenoms = ['Antoine', 'Marie', 'Lucas', 'Emma', 'Hugo', 'Léa', 'Nathan', 'Chloé', 'Théo', 'Manon'];
  const noms = ['Dupont', 'Martin', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Michel'];
  
  return prenoms.map((prenom, i) => {
    const scoreCEREDIS = 250 + Math.floor(seededRandom(i * 10) * 300);
    const niveau = getNiveauFromScoreMock(scoreCEREDIS);
    const historiqueScores = generateMockHistorique(i * 100);
    const tendanceValue = historiqueScores[historiqueScores.length - 1].score - historiqueScores[0].score;
    
    // Date fixe basée sur l'index
    const baseDate = new Date('2026-01-13T00:00:00.000Z');
    baseDate.setDate(baseDate.getDate() - Math.floor(seededRandom(i * 20) * 7));
    
    return {
      id: `eleve-${i + 1}`,
      nom: noms[i],
      prenom: prenom,
      niveauCECRL: niveau,
      scoreCEREDIS,
      zoneProgression: getZoneProgressionMock(scoreCEREDIS, niveau),
      tendance: tendanceValue > 10 ? 'hausse' : tendanceValue < -10 ? 'baisse' : 'stable',
      historiqueScores,
      derniereActivite: baseDate.toISOString(),
      activitesCompletees: 10 + Math.floor(seededRandom(i * 30) * 30),
      tempsTotal: 3600 + Math.floor(seededRandom(i * 40) * 18000)
    };
  });
}

function getNiveauFromScoreMock(score: number): NiveauCECRL {
  if (score >= 600) return 'C2';
  if (score >= 500) return 'C1';
  if (score >= 400) return 'B2';
  if (score >= 300) return 'B1';
  if (score >= 200) return 'A2';
  return 'A1';
}

function getZoneProgressionMock(scoreCEREDIS: number, niveauCECRL: NiveauCECRL): string {
  const seuilsBas: Partial<Record<NiveauCECRL, number>> = {
    'A1': 0, 'A2': 200, 'A2+': 250, 'B1': 300, 'B1+': 350, 'B2': 400, 'B2+': 450, 'C1': 500, 'C1+': 550, 'C2': 600
  };
  const seuilsHaut: Partial<Record<NiveauCECRL, number>> = {
    'A1': 199, 'A2': 299, 'A2+': 299, 'B1': 399, 'B1+': 399, 'B2': 499, 'B2+': 499, 'C1': 599, 'C1+': 599, 'C2': 600
  };
  
  const bas = seuilsBas[niveauCECRL] ?? 0;
  const haut = seuilsHaut[niveauCECRL] ?? 600;
  const range = haut - bas;
  const position = scoreCEREDIS - bas;
  const ratio = position / range;
  
  if (ratio < 0.33) return `${niveauCECRL}-`;
  if (ratio > 0.66) return `${niveauCECRL}+`;
  return niveauCECRL;
}

function generateMockProfilDomaines(): ProfilDomaineEleve[] {
  return DOMAINES.map((domaine, i) => ({
    domaineId: domaine.id,
    domaineName: domaine.name,
    abbrev: domaine.abbrev,
    score: 40 + Math.floor(seededRandom(i * 5 + 200) * 50),
    scoreMax: 100,
    couleur: domaine.couleur,
    niveauAtteint: ['A2', 'B1', 'B2'][Math.floor(seededRandom(i * 5 + 300) * 3)] as NiveauCECRL,
    competencesMaitrisees: Math.floor(seededRandom(i * 5 + 400) * domaine.competencesIds.length),
    competencesTotal: domaine.competencesIds.length
  }));
}

function generateMockCompetencesCritiques(): CompetenceCritique[] {
  const competences: CompetenceCritique[] = [];
  
  Object.entries(COMPETENCES_CEREDIS).forEach(([id, comp], index) => {
    const score = Math.floor(seededRandom(index * 7 + 500) * 100);
    const seuilRequis = 60;
    
    competences.push({
      id,
      nom: comp.name,
      score,
      seuilRequis,
      statut: score >= seuilRequis ? 'atteint' : score >= seuilRequis - 15 ? 'en_cours' : 'non_atteint',
      ecart: score - seuilRequis,
      domaineId: comp.domain,
      niveau: comp.level,
      estVerrou: score < seuilRequis && ['5.3', '3.2', '2.1'].includes(id)
    });
  });
  
  return competences.sort((a, b) => a.ecart - b.ecart); // Trier par écart (les plus faibles en premier)
}

function generateMockPreuves(eleveId: string): PreuveDetail[] {
  const types: Array<'P1' | 'P2' | 'P3' | 'P4'> = ['P1', 'P2', 'P3', 'P4'];
  const typeLabels = {
    'P1': 'Réponse guidée',
    'P2': 'Analyse linguistique',
    'P3': 'Production autonome',
    'P4': 'Métacognition'
  };
  
  const preuves: PreuveDetail[] = [];
  // Extraire un seed numérique depuis l'ID de l'élève
  const eleveIndex = parseInt(eleveId.replace('eleve-', '')) || 1;
  
  for (let i = 0; i < 12; i++) {
    const seedBase = eleveIndex * 100 + i;
    const type = types[Math.floor(seededRandom(seedBase + 600) * types.length)];
    
    // Date fixe basée sur l'index
    const baseDate = new Date('2026-01-13T00:00:00.000Z');
    baseDate.setDate(baseDate.getDate() - Math.floor(seededRandom(seedBase + 700) * 30));
    
    preuves.push({
      id: `preuve-${eleveId}-${i}`,
      type,
      typeLabel: typeLabels[type],
      score: 50 + Math.floor(seededRandom(seedBase + 800) * 50),
      date: baseDate.toISOString(),
      competenceId: `${Math.floor(seededRandom(seedBase + 900) * 5) + 1}.${Math.floor(seededRandom(seedBase + 1000) * 3) + 1}`,
      chanson: ['Là-bas', 'Né en 17 à Leidenstadt', 'La Bohème'][Math.floor(seededRandom(seedBase + 1100) * 3)],
      seance: `Séance ${Math.floor(seededRandom(seedBase + 1200) * 4) + 1}`,
      statut: seededRandom(seedBase + 1300) > 0.2 ? 'valide' : 'en_attente'
    });
  }
  
  return preuves.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function calculateMockStatistiques(eleves: SyntheseEleve[]): StatistiquesClasse {
  const scores = eleves.map(e => e.scoreCEREDIS);
  const scoreMoyen = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  // Écart-type
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - scoreMoyen, 2), 0) / scores.length;
  const ecartType = Math.round(Math.sqrt(variance));
  
  // Médiane
  const sorted = [...scores].sort((a, b) => a - b);
  const mediane = sorted.length % 2 === 0
    ? Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2)
    : sorted[Math.floor(sorted.length / 2)];
  
  // Répartition par niveau
  const repartitionNiveaux: Record<NiveauCECRL, number> = { 
    'A1': 0, 'A2': 0, 'A2+': 0, 
    'B1': 0, 'B1+': 0, 'B2': 0, 'B2+': 0, 
    'C1': 0, 'C1+': 0, 'C2': 0 
  };
  eleves.forEach(e => { repartitionNiveaux[e.niveauCECRL]++; });
  
  return {
    nombreEleves: eleves.length,
    scoreMoyen,
    ecartType,
    mediane,
    repartitionNiveaux,
    scoresMoyensDomaines: DOMAINES.map((d, i) => ({
      domaineId: d.id,
      domaineName: d.name,
      abbrev: d.abbrev,
      scoreMoyen: 40 + Math.floor(seededRandom(i * 11 + 1400) * 40)
    })),
    tauxCompetencesValidees: 45 + Math.floor(seededRandom(1500) * 30),
    verrousCommuns: generateMockCompetencesCritiques().filter(c => c.estVerrou).slice(0, 3),
    progressionMoyenne: Math.round((seededRandom(1600) - 0.3) * 30)
  };
}

// ============================================================================
// FONCTIONS D'EXPORT
// ============================================================================

function exportToCSV(eleves: SyntheseEleve[], statistiques: StatistiquesClasse | null): string {
  const headers = ['Nom', 'Prénom', 'Niveau CECRL', 'Score CEREDIS', 'Zone', 'Tendance', 'Activités', 'Temps (min)', 'Dernière activité'];
  const rows = eleves.map(e => [
    e.nom,
    e.prenom,
    e.niveauCECRL,
    e.scoreCEREDIS.toString(),
    e.zoneProgression,
    e.tendance,
    e.activitesCompletees.toString(),
    Math.round(e.tempsTotal / 60).toString(),
    e.derniereActivite ? new Date(e.derniereActivite).toLocaleDateString('fr-FR') : 'N/A'
  ]);
  
  let csv = headers.join(';') + '\n';
  csv += rows.map(r => r.join(';')).join('\n');
  
  if (statistiques) {
    csv += '\n\n--- STATISTIQUES CLASSE ---\n';
    csv += `Score moyen;${statistiques.scoreMoyen}\n`;
    csv += `Écart-type;${statistiques.ecartType}\n`;
    csv += `Médiane;${statistiques.mediane}\n`;
    csv += `Taux compétences validées;${statistiques.tauxCompetencesValidees}%\n`;
  }
  
  return csv;
}

function exportToJSON(
  eleves: SyntheseEleve[], 
  statistiques: StatistiquesClasse | null,
  includeDetails: boolean
): string {
  const data = {
    exportDate: new Date().toISOString(),
    classe: {
      statistiques: statistiques
    },
    eleves: includeDetails 
      ? eleves 
      : eleves.map(e => ({
          id: e.id,
          nom: e.nom,
          prenom: e.prenom,
          niveauCECRL: e.niveauCECRL,
          scoreCEREDIS: e.scoreCEREDIS,
          zoneProgression: e.zoneProgression,
          tendance: e.tendance
        }))
  };
  
  return JSON.stringify(data, null, 2);
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

export function useTeacherDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [classe, setClasse] = useState<ClasseInfo | null>(null);
  const [eleves, setEleves] = useState<SyntheseEleve[]>([]);
  const [eleveSelectionne, setEleveSelectionne] = useState<SyntheseEleve | null>(null);
  const [statistiques, setStatistiques] = useState<StatistiquesClasse | null>(null);
  const [profilDomaines, setProfilDomaines] = useState<ProfilDomaineEleve[]>([]);
  const [competencesCritiques, setCompetencesCritiques] = useState<CompetenceCritique[]>([]);
  const [preuves, setPreuves] = useState<PreuveDetail[]>([]);

  // Sélectionner un élève et charger ses données détaillées
  const selectEleve = useCallback((eleve: SyntheseEleve) => {
    setEleveSelectionne(eleve);
    setProfilDomaines(generateMockProfilDomaines());
    setCompetencesCritiques(generateMockCompetencesCritiques());
    setPreuves(generateMockPreuves(eleve.id));
  }, []);

  // Charger les données de la classe
  const fetchClasseData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Pour le moment, utiliser les données mock
      // TODO: Remplacer par appels réels à PocketBase/CaSS
      
      const mockEleves = generateMockEleves();
      const mockStats = calculateMockStatistiques(mockEleves);
      
      setClasse({
        id: 'classe-1',
        nom: 'Classe FLE B1-B2',
        niveau: 'B1-B2',
        nombreEleves: mockEleves.length
      });
      
      setEleves(mockEleves);
      setStatistiques(mockStats);
      
      // Sélectionner le premier élève par défaut
      if (mockEleves.length > 0) {
        selectEleve(mockEleves[0]);
      }
      
    } catch (err) {
      console.error('[TeacherDashboard] Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [user, selectEleve]);

  // Exporter les données
  const exportData = useCallback((config: ExportConfig): ExportResult => {
    const dataEleves = config.scope === 'eleve' && config.eleveId
      ? eleves.filter(e => e.id === config.eleveId)
      : eleves;
    
    let data: string;
    let mimeType: string;
    let extension: string;
    
    if (config.format === 'csv') {
      data = exportToCSV(dataEleves, statistiques);
      mimeType = 'text/csv;charset=utf-8';
      extension = 'csv';
    } else {
      data = exportToJSON(dataEleves, statistiques, config.includeDetails);
      mimeType = 'application/json';
      extension = 'json';
    }
    
    const filename = `export_${config.scope}_${new Date().toISOString().split('T')[0]}.${extension}`;
    
    return {
      filename,
      data,
      mimeType,
      size: new Blob([data]).size
    };
  }, [eleves, statistiques]);

  // Télécharger l'export
  const downloadExport = useCallback((config: ExportConfig) => {
    const result = exportData(config);
    
    const blob = new Blob([result.data], { type: result.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return result;
  }, [exportData]);

  // Filtrer les compétences critiques
  const getCompetencesVerrous = useCallback(() => {
    return competencesCritiques.filter(c => c.estVerrou);
  }, [competencesCritiques]);

  // Filtrer les preuves par compétence
  const getPreuvesByCompetence = useCallback((competenceId: string) => {
    return preuves.filter(p => p.competenceId === competenceId);
  }, [preuves]);

  useEffect(() => {
    fetchClasseData();
  }, [fetchClasseData]);

  return {
    // État
    loading,
    error,
    classe,
    eleves,
    eleveSelectionne,
    statistiques,
    profilDomaines,
    competencesCritiques,
    preuves,
    
    // Actions
    refresh: fetchClasseData,
    selectEleve,
    exportData,
    downloadExport,
    
    // Helpers
    getCompetencesVerrous,
    getPreuvesByCompetence
  };
}

export default useTeacherDashboard;
