/**
 * Graphique radar pour visualiser les scores des 5 domaines CEREDIS
 */

'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DOMAIN_INFO } from '@/lib/ceredis/types';

interface DomainRadarChartProps {
  domainScores: Record<string, number>;
}

export function DomainRadarChart({ domainScores }: DomainRadarChartProps) {
  // Préparer les données pour le radar chart
  const data = Object.entries(DOMAIN_INFO).map(([id, info]) => ({
    domain: info.name,
    score: domainScores[id] || 0,
    fullMark: 100
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Profil des 5 domaines</h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="domain" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => {
              // Abréger les noms trop longs
              if (value.length > 30) {
                return value.substring(0, 27) + '...';
              }
              return value;
            }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#9ca3af', fontSize: 10 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
          <Tooltip
            formatter={(value: number | undefined) => {
              if (value === undefined) return ['N/A', 'Score'];
              return [`${value.toFixed(1)}/100`, 'Score'];
            }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.5rem'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Légende détaillée */}
      <div className="mt-6 space-y-3">
        {Object.entries(DOMAIN_INFO).map(([id, info]) => {
          const score = domainScores[id] || 0;
          return (
            <div key={id} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: info.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {info.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 ml-2">
                    {score.toFixed(1)}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${score}%`,
                      backgroundColor: info.color
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Description des domaines */}
      <div className="mt-6 text-xs text-gray-500 space-y-1">
        <p><strong>D1-D4</strong> : Compétences linguistiques (écoute, lecture, écriture, interaction)</p>
        <p><strong>D5</strong> : Réflexion sur la langue (vocabulaire, grammaire, culture, métacognition)</p>
      </div>
    </div>
  );
}
