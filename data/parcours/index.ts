/**
 * INDEX CENTRAL DE TOUS LES PARCOURS
 * 
 * Ce fichier centralise l'accès à tous les parcours pédagogiques disponibles.
 * Utilisez getSeancesBySlug() pour récupérer les séances d'une chanson.
 */

import type { SeanceCeredis } from '@/types/ceredis';
import type { Seance } from '@/types/seance';

// Import des parcours
import * as leCoureur from './le-coureur';
import * as cestTaChance from './cest-ta-chance';
import * as laBas from './la-bas';

// TODO: Ajouter les autres parcours quand ils seront disponibles
// import * as neEn17 from './ne-en-17';
// import * as laCorrida from './la-corrida';

/**
 * Type générique pour les métadonnées de parcours
 */
interface ParcoursMeta {
  id: string;
  titre: string;
  artiste: string;
  album: string;
  annee: number;
  niveau: string;
  dureeEstimee: number;
  theme: string;
  descriptionCourte: string;
  descriptionLongue: string;
}

/**
 * Map des parcours par slug
 */
export const PARCOURS_MAP: Record<string, { 
  meta: ParcoursMeta; 
  seances: SeanceCeredis[];
}> = {
  'le-coureur': {
    meta: leCoureur.parcoursMeta,
    seances: leCoureur.seances
  },
  'cest-ta-chance': {
    meta: cestTaChance.parcoursMeta,
    seances: cestTaChance.seances
  },
  'la-bas': {
    meta: laBas.parcoursMeta,
    seances: laBas.seances
  },
};

// TODO: Ajouter les autres parcours quand ils seront disponibles
// PARCOURS_MAP['ne-en-17-a-leidenstadt'] = { ... };
// PARCOURS_MAP['la-corrida'] = { ... };

/**
 * Récupère les séances CEREDIS d'une chanson par son slug
 */
export function getSeancesCeredisBySlug(slug: string): SeanceCeredis[] {
  const parcours = PARCOURS_MAP[slug];
  return parcours?.seances ?? [];
}

/**
 * Convertit les SeanceCeredis en Seance standard pour la compatibilité
 */
export function convertToSeance(seanceCeredis: SeanceCeredis): Seance {
  return {
    id: seanceCeredis.id,
    chansonId: seanceCeredis.chansonId,
    numero: seanceCeredis.numero,
    titre: seanceCeredis.titre,
    description: seanceCeredis.description,
    objectifs: seanceCeredis.objectifs,
    dureeEstimee: seanceCeredis.dureeEstimee,
    competences: seanceCeredis.competences,
    ecrans: seanceCeredis.ecrans.map(e => ({
      id: e.id,
      numero: e.numero,
      titre: e.titre,
      type: e.type,
      consigne: e.consigne,
      dureeEstimee: e.dureeEstimee,
      difficulte: e.difficulte,
      competencesCibles: e.competencesCibles,
      activite: e.activite,
      audioDebut: e.audioDebut,
      audioFin: e.audioFin,
    })),
    prerequis: seanceCeredis.prerequis,
    suivantes: seanceCeredis.suivantes,
  };
}

/**
 * Récupère les séances standard d'une chanson par son slug
 */
export function getSeancesBySlug(slug: string): Seance[] {
  const seancesCeredis = getSeancesCeredisBySlug(slug);
  return seancesCeredis.map(convertToSeance);
}

/**
 * Récupère les métadonnées d'un parcours par son slug
 */
export function getParcoursMeta(slug: string) {
  return PARCOURS_MAP[slug]?.meta ?? null;
}

/**
 * Liste de tous les slugs de parcours disponibles
 */
export function getAvailableParcoursSlugs(): string[] {
  return Object.keys(PARCOURS_MAP);
}

/**
 * Vérifie si un parcours existe pour un slug donné
 */
export function hasParcoursForSlug(slug: string): boolean {
  return slug in PARCOURS_MAP;
}

export default PARCOURS_MAP;
