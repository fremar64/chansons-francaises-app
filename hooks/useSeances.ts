/**
 * Hook pour récupérer les séances d'une chanson
 */

import { useMemo } from 'react';
import { getSeancesBySlug, getSeancesCeredisBySlug, hasParcoursForSlug } from '@/data/parcours';
import type { Seance } from '@/types/seance';
import type { SeanceCeredis } from '@/types/ceredis';

interface UseSeancesResult {
  seances: Seance[];
  seancesCeredis: SeanceCeredis[];
  loading: boolean;
  hasSeances: boolean;
}

/**
 * Hook pour récupérer les séances d'une chanson par son slug ou id
 * 
 * @param chansonId - Le slug ou id de la chanson
 * @returns Les séances disponibles
 */
export function useSeances(chansonId: string | undefined): UseSeancesResult {
  const result = useMemo(() => {
    if (!chansonId) {
      return {
        seances: [],
        seancesCeredis: [],
        loading: false,
        hasSeances: false,
      };
    }

    // Essayer de trouver les séances par différents slugs possibles
    const possibleSlugs = [
      chansonId,
      chansonId.toLowerCase(),
      chansonId.replace(/\s+/g, '-').toLowerCase(),
    ];

    for (const slug of possibleSlugs) {
      if (hasParcoursForSlug(slug)) {
        return {
          seances: getSeancesBySlug(slug),
          seancesCeredis: getSeancesCeredisBySlug(slug),
          loading: false,
          hasSeances: true,
        };
      }
    }

    return {
      seances: [],
      seancesCeredis: [],
      loading: false,
      hasSeances: false,
    };
  }, [chansonId]);

  return result;
}

/**
 * Hook pour récupérer une séance spécifique par son numéro ou ID
 * 
 * @param chansonId - Le slug ou id de la chanson
 * @param seanceIdentifier - Le numéro (1-based) ou l'ID de la séance
 */
export function useSeance(chansonId: string | undefined, seanceIdentifier: number | string) {
  const { seances, seancesCeredis, hasSeances } = useSeances(chansonId);

  const seance = useMemo(() => {
    if (typeof seanceIdentifier === 'number') {
      return seances.find(s => s.numero === seanceIdentifier) ?? null;
    }
    // Chercher par ID ou par numéro extrait de l'ID
    const byId = seances.find(s => s.id === seanceIdentifier);
    if (byId) return byId;
    
    // Essayer d'extraire le numéro de l'ID (ex: "lecoureur-s1" -> 1)
    const match = seanceIdentifier.match(/s(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return seances.find(s => s.numero === num) ?? null;
    }
    
    // Fallback: premier résultat
    return seances[0] ?? null;
  }, [seances, seanceIdentifier]);

  const seanceCeredis = useMemo(() => {
    if (!seance) return null;
    return seancesCeredis.find(s => s.id === seance.id || s.numero === seance.numero) ?? null;
  }, [seancesCeredis, seance]);

  return {
    seance,
    seanceCeredis,
    hasSeances,
    loading: false,
  };
}
