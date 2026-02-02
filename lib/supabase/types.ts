/**
 * Supabase Database Types
 * 
 * Ces types seront générés automatiquement depuis le schéma PostgreSQL
 * via la commande : npx supabase gen types typescript --project-id xxx
 * 
 * Pour l'instant, définissons les types de base manuellement basés sur SUPABASE_SCHEMA.sql
 * Version 1.1 : Ajout table profiles + champs score_total/score_max dans activities
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          username: string | null;
          email: string | null;
          role: 'student' | 'teacher' | 'admin';
          is_validated: boolean;
          avatar_url: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          username?: string | null;
          email?: string | null;
          role?: 'student' | 'teacher' | 'admin';
          is_validated?: boolean;
          avatar_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          username?: string | null;
          email?: string | null;
          role?: 'student' | 'teacher' | 'admin';
          is_validated?: boolean;
          avatar_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      evidences: {
        Row: {
          id: string;
          user_id: string;
          competency_id: string;
          evidence_type: 'P1' | 'P2' | 'P3' | 'P4';
          score: number;
          activity_type: string | null;
          activity_id: string | null;
          seance_id: string | null;
          chanson_id: string | null;
          response: Json | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          competency_id: string;
          evidence_type: 'P1' | 'P2' | 'P3' | 'P4';
          score: number;
          activity_type?: string | null;
          activity_id?: string | null;
          seance_id?: string | null;
          chanson_id?: string | null;
          response?: Json | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          competency_id?: string;
          evidence_type?: 'P1' | 'P2' | 'P3' | 'P4';
          score?: number;
          activity_type?: string | null;
          activity_id?: string | null;
          seance_id?: string | null;
          chanson_id?: string | null;
          response?: Json | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          seance_id: string;
          ecran_id: string;
          activity_type: string;
          score: number | null;
          score_total: number;
          score_max: number;
          time_spent: number | null;
          completed_at: string;
          response: Json | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          seance_id: string;
          ecran_id: string;
          activity_type: string;
          score?: number | null;
          score_total?: number;
          score_max?: number;
          time_spent?: number | null;
          completed_at?: string;
          response?: Json | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          seance_id?: string;
          ecran_id?: string;
          activity_type?: string;
          score?: number | null;
          score_total?: number;
          score_max?: number;
          time_spent?: number | null;
          completed_at?: string;
          response?: Json | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ceredis_scores: {
        Row: {
          id: string;
          user_id: string;
          ceredis_score: number;
          cecrl_level: 'A2' | 'B1' | 'B2' | 'C1';
          domain_scores: Json;
          competency_scores: Json;
          validation: Json;
          computed_at: string;
          engine_version: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          ceredis_score: number;
          cecrl_level: 'A2' | 'B1' | 'B2' | 'C1';
          domain_scores: Json;
          competency_scores: Json;
          validation: Json;
          computed_at: string;
          engine_version: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          ceredis_score?: number;
          cecrl_level?: 'A2' | 'B1' | 'B2' | 'C1';
          domain_scores?: Json;
          competency_scores?: Json;
          validation?: Json;
          computed_at?: string;
          engine_version?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
