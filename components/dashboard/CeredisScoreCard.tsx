/**
 * Carte de score CEREDIS complète
 * Affiche le score global, le niveau CECRL, et les informations de progression
 */

'use client';

import { 
  getCecrlColor, 
  getProgressInLevel, 
  getPointsToNextLevel,
  CECRL_DESCRIPTIONS,
  type CeredisScore
} from '@/lib/ceredis/types';

interface CeredisScoreCardProps {
  score: CeredisScore;
}

export function CeredisScoreCard({ score }: CeredisScoreCardProps) {
  const progressInLevel = getProgressInLevel(score.ceredisScore, score.cecrlLevel);
  const pointsToNext = getPointsToNextLevel(score.ceredisScore, score.cecrlLevel);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* En-tête avec niveau CECRL */}
      <div className={`bg-gradient-to-r ${getCecrlColor(score.cecrlLevel)} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">Niveau CECRL</p>
            <p className="text-white text-3xl font-bold">{score.cecrlLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm font-medium">Score CEREDIS</p>
            <p className="text-white text-3xl font-bold">{score.ceredisScore.toFixed(1)}</p>
            <p className="text-white/60 text-xs">/ 600</p>
          </div>
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="px-6 py-5 space-y-4">
        {/* Description du niveau */}
        <div>
          <p className="text-sm text-gray-600 text-center">
            {CECRL_DESCRIPTIONS[score.cecrlLevel]}
          </p>
        </div>

        {/* Barre de progression dans le niveau */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-gray-700">
              Progression dans {score.cecrlLevel}
            </h4>
            <span className="text-xs font-medium text-gray-600">
              {progressInLevel}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${getCecrlColor(score.cecrlLevel)} transition-all duration-500`}
              style={{ width: `${progressInLevel}%` }}
            />
          </div>
        </div>

        {/* Points pour niveau suivant */}
        {pointsToNext !== null ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <p className="text-sm text-blue-900">
              <span className="font-bold">{pointsToNext.toFixed(1)} points</span> pour atteindre le niveau suivant
            </p>
          </div>
        ) : (
          <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
            <p className="text-sm text-purple-900 font-bold text-center">
              🎉 Niveau maximum atteint !
            </p>
          </div>
        )}

        {/* Métadonnées */}
        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-500">Calculé le</p>
              <p className="font-medium text-gray-700">
                {new Date(score.computedAt).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-gray-500">
                {new Date(score.computedAt).toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Moteur</p>
              <p className="font-medium text-gray-700">v{score.engineVersion}</p>
            </div>
          </div>
        </div>

        {/* Validation status */}
        {!score.validation.valid && (
          <div className="pt-3 border-t border-gray-100">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <p className="text-xs font-semibold text-amber-900 mb-1">
                ⚠️ Niveau ajusté
              </p>
              {score.validation.degradationReason && (
                <p className="text-xs text-amber-800">
                  {score.validation.degradationReason}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
