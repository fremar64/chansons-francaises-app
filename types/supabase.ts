/**
 * Types générés pour Supabase auto-hébergé
 * Basés sur le schéma PostgreSQL déployé sur Coolify
 * 
 * Généré manuellement car instance self-hosted (pas de project-ref)
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          username: string | null
          email: string
          role: 'student' | 'teacher' | 'admin'
          is_validated: boolean
          avatar_url: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          username?: string | null
          email: string
          role?: 'student' | 'teacher' | 'admin'
          is_validated?: boolean
          avatar_url?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          username?: string | null
          email?: string
          role?: 'student' | 'teacher' | 'admin'
          is_validated?: boolean
          avatar_url?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      evidences: {
        Row: {
          id: string
          user_id: string
          competency_id: string
          evidence_type: string
          score: number
          activity_type: string | null
          activity_id: string | null
          seance_id: string | null
          chanson_id: string | null
          response: Json | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competency_id: string
          evidence_type: string
          score: number
          activity_type?: string | null
          activity_id?: string | null
          seance_id?: string | null
          chanson_id?: string | null
          response?: Json | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competency_id?: string
          evidence_type?: string
          score?: number
          activity_type?: string | null
          activity_id?: string | null
          seance_id?: string | null
          chanson_id?: string | null
          response?: Json | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      activities: {
        Row: {
          id: string
          user_id: string
          seance_id: string | null
          score: number
          score_total: number
          score_max: number
          time_spent: number
          completed: boolean
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          seance_id?: string | null
          score?: number
          score_total?: number
          score_max?: number
          time_spent?: number
          completed?: boolean
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          seance_id?: string | null
          score?: number
          score_total?: number
          score_max?: number
          time_spent?: number
          completed?: boolean
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      ceredis_scores: {
        Row: {
          id: string
          user_id: string
          competency_id: string
          score: number
          confidence: number
          evidence_count: number
          last_evidence_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competency_id: string
          score?: number
          confidence?: number
          evidence_count?: number
          last_evidence_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competency_id?: string
          score?: number
          confidence?: number
          evidence_count?: number
          last_evidence_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ceredis_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}