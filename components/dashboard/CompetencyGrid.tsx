/**
 * Grille affichant les 19 compétences CEREDIS organisées par domaine
 */

'use client';

import { DOMAIN_INFO, COMPETENCY_INFO, type CompetencyScore } from '@/lib/ceredis/types';

interface CompetencyGridProps {
  competencyScores: Record<string, CompetencyScore>;
}

export function CompetencyGrid({ competencyScores }: CompetencyGridProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Détail des 19 compétences</h3>
      
      <div className="space-y-6">
        {Object.entries(DOMAIN_INFO).map(([domainId, domainInfo]) => (
          <div key={domainId} className="border-l-4 pl-4" style={{ borderColor: domainInfo.color }}>
            <h4 className="font-medium text-gray-900 mb-3">
              {domainInfo.name}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {domainInfo.competencies.map((compId) => {
                const compInfo = COMPETENCY_INFO[compId];
                const compScore = competencyScores[compId];
                
                if (!compInfo) return null;
                
                const hasData = compScore && compScore.evidenceCount > 0;
                const score = hasData ? compScore.score : 0;
                
                return (
                  <div
                    key={compId}
                    className={`p-3 rounded-lg border transition-all ${
                      hasData 
                        ? 'bg-gray-50 border-gray-300' 
                        : 'bg-gray-100 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-mono font-semibold text-gray-600">
                          {compId}
                        </span>
                        <h5 className="text-sm font-medium text-gray-900 mt-1">
                          {compInfo.name}
                        </h5>
                      </div>
                      {hasData && (
                        <span className="text-lg font-bold" style={{ color: domainInfo.color }}>
                          {score.toFixed(0)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">
                      {compInfo.description}
                    </p>
                    
                    {hasData ? (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500">
                          {compScore.evidenceCount} preuve{compScore.evidenceCount > 1 ? 's' : ''}
                        </span>
                        <div className="flex gap-1">
                          {compScore.evidenceTypes.map((type, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Non travaillée
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Légende types de preuves */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h5 className="text-xs font-semibold text-gray-700 mb-2">Types de preuves</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-medium">P1</span>
            <span className="text-gray-600">Reconnaissance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-medium">P2</span>
            <span className="text-gray-600">Compréhension</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-medium">P3</span>
            <span className="text-gray-600">Analyse</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-medium">P4</span>
            <span className="text-gray-600">Métacognition</span>
          </div>
        </div>
      </div>
    </div>
  );
}
