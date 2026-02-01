/**
 * Page principale du Dashboard CEREDIS
 * Affiche le score global, le niveau CECRL, et le détail par domaine et compétence
 */

'use client';

import { useState } from 'react';
import { useCeredisScore } from '@/lib/ceredis/hooks';
import { CeredisScoreCard } from '@/components/dashboard/CeredisScoreCard';
import { DomainRadarChart } from '@/components/dashboard/DomainRadarChart';
import { CompetencyGrid } from '@/components/dashboard/CompetencyGrid';

export default function CeredisDashboard() {
  // TODO: Récupérer le vrai userId depuis la session
  const userId = 'demo-user'; // Remplacer par l'ID réel de l'utilisateur connecté
  
  const { data: scoreData, isLoading, error, refetch } = useCeredisScore(userId);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleRecalculate = async () => {
    setIsRecalculating(true);
    try {
      // Forcer le recalcul via l'API
      const response = await fetch('/api/ceredis/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      if (response.ok) {
        // Rafraîchir les données
        await refetch();
      } else {
        console.error('Erreur lors du recalcul');
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setIsRecalculating(false);
    }
  };

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">Calcul de votre score CEREDIS...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Erreur lors du chargement
            </h3>
            <p className="text-red-700">
              Impossible de calculer votre score CEREDIS. Veuillez réessayer plus tard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!scoreData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Pas encore de données
            </h3>
            <p className="text-blue-700">
              Vous n'avez pas encore complété d'activités. Commencez un parcours pour obtenir votre score CEREDIS !
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard CEREDIS
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Évaluation de vos compétences en français par les chansons
              </p>
            </div>
            
            <button
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRecalculating ? 'Recalcul en cours...' : 'Recalculer'}
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Score global - Carte CEREDIS complète */}
          <CeredisScoreCard score={scoreData} />

          {/* Alertes validation (erreurs et warnings) */}
          {(scoreData.validation.errors.length > 0 || scoreData.validation.warnings.length > 0) && (
            <div className="space-y-3">
              {/* Erreurs */}
              {scoreData.validation.errors.map((error, idx) => (
                <div key={`error-${idx}`} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">❌</span>
                    <p className="text-sm text-red-800 flex-1">{error}</p>
                  </div>
                </div>
              ))}
              
              {/* Avertissements */}
              {scoreData.validation.warnings.map((warning, idx) => (
                <div key={`warning-${idx}`} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <p className="text-sm text-amber-800 flex-1">{warning}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Radar des 5 domaines */}
          <DomainRadarChart domainScores={scoreData.domainScores} />

          {/* Grille des 19 compétences */}
          <CompetencyGrid competencyScores={scoreData.competencyScores} />
        </div>
      </div>
    </div>
  );
}
