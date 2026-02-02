'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

// Import des données de parcours locaux
import cestTaChanceParcours from '@/data/parcours/cest-ta-chance';
import leCoureurParcours from '@/data/parcours/le-coureur';
import laBasParcours from '@/data/parcours/la-bas';

// Type unifié pour l'affichage (compatible avec les cartes existantes)
export interface ChansonDisplay {
  id: string;
  slug: string; // Slug pour les URLs (ex: "cest-ta-chance")
  titre: string;
  artiste: string;
  album?: string;
  annee: number;
  genre: string[];
  pochette: string;
  audioUrl?: string;
  niveauCECRL: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  typeTexte: 'narratif' | 'descriptif' | 'argumentatif' | 'poétique';
  thematiques: string[];
  duree: number;
  nombreSeances: number;
  competencesCibles: string[];
}

// Données de fallback depuis les parcours locaux
const LOCAL_PARCOURS_DATA: ChansonDisplay[] = [
  {
    id: 'cest-ta-chance',
    slug: 'cest-ta-chance',
    titre: cestTaChanceParcours.meta.titre,
    artiste: cestTaChanceParcours.meta.artiste,
    album: cestTaChanceParcours.meta.album,
    annee: cestTaChanceParcours.meta.annee,
    genre: ['pop', 'chanson française'],
    pochette: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: '/audio/chansons/jean-jacques-goldman/cest-ta-chance.mp3',
    niveauCECRL: 'B1',
    typeTexte: 'argumentatif',
    thematiques: ['résilience', 'émancipation sociale', 'encouragement'],
    duree: 195,
    nombreSeances: cestTaChanceParcours.stats.nombreSeances,
    competencesCibles: ['compréhension orale', 'expression écrite', 'débat']
  },
  {
    id: 'le-coureur',
    slug: 'le-coureur',
    titre: leCoureurParcours.meta.titre,
    artiste: leCoureurParcours.meta.artiste,
    album: leCoureurParcours.meta.album || 'Non homologué',
    annee: leCoureurParcours.meta.annee,
    genre: ['pop', 'chanson française'],
    pochette: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop',
    audioUrl: '/audio/chansons/jean-jacques-goldman/le-coureur.mp3',
    niveauCECRL: 'B2',
    typeTexte: 'narratif',
    thematiques: ['mondialisation', 'déracinement', 'identité'],
    duree: 280,
    nombreSeances: leCoureurParcours.stats.nombreSeances,
    competencesCibles: ['compréhension écrite', 'analyse', 'production écrite']
  },
  {
    id: 'la-bas',
    slug: 'la-bas',
    titre: laBasParcours.parcoursMeta.titre,
    artiste: laBasParcours.parcoursMeta.artiste,
    album: laBasParcours.parcoursMeta.album || 'Entre gris clair et gris foncé',
    annee: laBasParcours.parcoursMeta.annee,
    genre: ['pop', 'chanson française'],
    pochette: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
    audioUrl: '/audio/chansons/jean-jacques-goldman/la-bas.mp3',
    niveauCECRL: 'B2',
    typeTexte: 'poétique',
    thematiques: ['voyage', 'liberté', 'ailleurs'],
    duree: 300,
    nombreSeances: laBasParcours.statistiques.nombreSeances,
    competencesCibles: ['compréhension orale', 'vocabulaire', 'expression']
  }
];

// Fonction pour créer un slug à partir d'un titre
function createSlug(titre: string): string {
  return titre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Type pour une chanson Supabase (si table existe)
interface SupabaseChanson {
  id: string;
  titre: string;
  artiste: string;
  album?: string;
  annee?: number;
  genre?: string[];
  cover_url?: string;
  audio_url?: string;
  niveau: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  themes?: string[];
  duree: number;
  points_grammaire?: any[];
}

// Convertit une chanson Supabase vers le format d'affichage
function convertSupabaseToDisplay(chanson: SupabaseChanson, seanceCount: number = 0): ChansonDisplay {
  // Convertir points_grammaire en strings si ce sont des objets
  let competences: string[] = [];
  if (chanson.points_grammaire) {
    if (Array.isArray(chanson.points_grammaire)) {
      competences = chanson.points_grammaire.map(p => {
        if (typeof p === 'string') return p;
        if (typeof p === 'object' && p !== null && 'point' in p) {
          return p.point as string;
        }
        return '';
      }).filter(Boolean);
    }
  }

  return {
    id: chanson.id,
    slug: createSlug(chanson.titre),
    titre: chanson.titre,
    artiste: chanson.artiste,
    album: chanson.album,
    annee: chanson.annee || new Date().getFullYear(),
    genre: chanson.genre || [],
    pochette: chanson.cover_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`,
    audioUrl: chanson.audio_url,
    niveauCECRL: chanson.niveau,
    typeTexte: 'narratif', // Valeur par défaut
    thematiques: chanson.themes || [],
    duree: chanson.duree,
    nombreSeances: seanceCount,
    competencesCibles: competences
  };
}

/**
 * Hook pour charger et gérer la liste des chansons
 * Utilise les données locales par défaut (TODO: fusionner avec Supabase si table chansons existe)
 */
export function useChansons() {
  const [chansons, setChansons] = useState<ChansonDisplay[]>(LOCAL_PARCOURS_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pour l'instant, on utilise uniquement les données locales
    // TODO: Implémenter la fusion avec Supabase quand la table chansons sera créée
    setChansons(LOCAL_PARCOURS_DATA);
  }, []);

  return { chansons, loading, error };
}

/**
 * Hook pour charger une chanson spécifique par son ID
 * @param id - L'ID de la chanson
 */
export function useChanson(id: string) {
  const [chanson, setChanson] = useState<SupabaseChanson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Adapter selon le schéma Supabase si la table chansons existe
        // Pour l'instant, retourner null car la table n'existe pas encore
        setChanson(null);
      } catch (err) {
        console.error('Erreur lors du chargement de la chanson:', err);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetch();
    }
  }, [id]);

  return { chanson, loading, error };
}
