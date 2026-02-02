-- ============================================================================
-- SUPABASE SCHEMA - Application ENAA Chansons Françaises
-- ============================================================================
-- Date : 1er février 2026
-- Version : 1.1 (ajout profiles + champs activities)
-- PostgreSQL : 15+
-- 
-- Instructions :
-- 1. Ouvrir Supabase Studio : https://enaa-supabase.ceredis.net/project/default
-- 2. Aller dans SQL Editor
-- 3. Copier-coller ce fichier complet
-- 4. Exécuter
-- ============================================================================

-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TABLE : PROFILES (Profils utilisateurs)
-- ============================================================================

CREATE TABLE public.profiles (
  -- Identifiants
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Informations utilisateur
  name TEXT,
  username TEXT,
  email TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  is_validated BOOLEAN DEFAULT false NOT NULL,
  
  -- Métadonnées
  avatar_url TEXT,
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index pour performances
CREATE UNIQUE INDEX idx_profiles_username ON profiles(username) WHERE username IS NOT NULL;
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_is_validated ON profiles(is_validated);

-- Commentaires
COMMENT ON TABLE profiles IS 'Profils utilisateurs de l\'application';
COMMENT ON COLUMN profiles.role IS 'Rôle de l\'utilisateur (student, teacher, admin)';
COMMENT ON COLUMN profiles.is_validated IS 'Indique si l\'utilisateur a été validé par un administrateur';

-- ============================================================================
-- TABLE : EVIDENCES (Preuves de compétences)
-- ============================================================================

CREATE TABLE public.evidences (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Métadonnées CEREDIS
  competency_id TEXT NOT NULL CHECK (competency_id ~ '^[1-5]\.[1-7]$'),
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('P1', 'P2', 'P3', 'P4')),
  score NUMERIC(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  
  -- Contexte activité
  activity_type TEXT,
  activity_id TEXT,
  seance_id TEXT,
  chanson_id TEXT,
  
  -- Données
  response JSONB,
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index pour performances
CREATE INDEX idx_evidences_user_id ON evidences(user_id);
CREATE INDEX idx_evidences_competency_id ON evidences(competency_id);
CREATE INDEX idx_evidences_evidence_type ON evidences(evidence_type);
CREATE INDEX idx_evidences_created_at ON evidences(created_at DESC);
CREATE INDEX idx_evidences_user_competency ON evidences(user_id, competency_id);

-- Commentaires
COMMENT ON TABLE evidences IS 'Preuves de compétences des apprenants';
COMMENT ON COLUMN evidences.competency_id IS 'ID compétence CEREDIS (format: D.C, ex: 1.1, 5.7)';
COMMENT ON COLUMN evidences.evidence_type IS 'Type de preuve (P1=connaissance, P2=compréhension, P3=application, P4=analyse)';
COMMENT ON COLUMN evidences.score IS 'Score obtenu (0-100)';
COMMENT ON COLUMN evidences.response IS 'Réponse de l\'apprenant (JSONB)';
COMMENT ON COLUMN evidences.metadata IS 'Métadonnées additionnelles (JSONB)';

-- ============================================================================
-- TABLE : ACTIVITIES (Activités complétées)
-- ============================================================================

CREATE TABLE public.activities (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Contexte pédagogique
  seance_id TEXT NOT NULL,
  ecran_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  
  -- Performance (scores détaillés pour analytics)
  score NUMERIC(5,2) CHECK (score >= 0 AND score <= 100),
  score_total NUMERIC(7,2) DEFAULT 0 CHECK (score_total >= 0),
  score_max NUMERIC(7,2) DEFAULT 0 CHECK (score_max >= 0),
  time_spent INTEGER CHECK (time_spent >= 0), -- secondes
  
  -- Données
  completed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  response JSONB,
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index pour performances
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_seance_id ON activities(seance_id);
CREATE INDEX idx_activities_completed_at ON activities(completed_at DESC);
CREATE INDEX idx_activities_user_seance ON activities(user_id, seance_id);

-- Commentaires
COMMENT ON TABLE activities IS 'Historique des activités complétées par les apprenants';
COMMENT ON COLUMN activities.seance_id IS 'ID de la séance (ex: la-bas-seance-1)';
COMMENT ON COLUMN activities.ecran_id IS 'ID de l\'écran (ex: lb-s1-e1)';
COMMENT ON COLUMN activities.activity_type IS 'Type d\'activité (quiz_qcm, texte_libre, etc.)';
COMMENT ON COLUMN activities.time_spent IS 'Temps passé en secondes';
COMMENT ON COLUMN activities.score_total IS 'Score total cumulé (pour analytics)';
COMMENT ON COLUMN activities.score_max IS 'Score maximum possible cumulé (pour analytics)';

-- ============================================================================
-- TABLE : CEREDIS_SCORES (Cache des scores calculés)
-- ============================================================================

CREATE TABLE public.ceredis_scores (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Scores
  ceredis_score NUMERIC(6,2) NOT NULL CHECK (ceredis_score >= 0 AND ceredis_score <= 600),
  cecrl_level TEXT NOT NULL CHECK (cecrl_level IN ('A2', 'B1', 'B2', 'C1')),
  
  -- Détails
  domain_scores JSONB NOT NULL,
  competency_scores JSONB NOT NULL,
  validation JSONB NOT NULL,
  
  -- Métadonnées
  computed_at TIMESTAMPTZ NOT NULL,
  engine_version TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index pour performances
CREATE INDEX idx_ceredis_scores_user_id ON ceredis_scores(user_id);
CREATE INDEX idx_ceredis_scores_cecrl_level ON ceredis_scores(cecrl_level);
CREATE INDEX idx_ceredis_scores_computed_at ON ceredis_scores(computed_at DESC);

-- Commentaires
COMMENT ON TABLE ceredis_scores IS 'Cache des scores CEREDIS calculés pour chaque utilisateur';
COMMENT ON COLUMN ceredis_scores.ceredis_score IS 'Score global CEREDIS (0-600)';
COMMENT ON COLUMN ceredis_scores.cecrl_level IS 'Niveau CECRL déterminé (A2, B1, B2, C1)';
COMMENT ON COLUMN ceredis_scores.domain_scores IS 'Scores par domaine (D1-D5) en JSONB';
COMMENT ON COLUMN ceredis_scores.competency_scores IS 'Scores par compétence (1.1-5.7) en JSONB';
COMMENT ON COLUMN ceredis_scores.validation IS 'Résultat validation règles (JSONB)';

-- ============================================================================
-- TRIGGERS : Auto-update timestamps
-- ============================================================================

-- Fonction trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour profiles
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour evidences
CREATE TRIGGER update_evidences_updated_at 
  BEFORE UPDATE ON evidences
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour activities
CREATE TRIGGER update_activities_updated_at 
  BEFORE UPDATE ON activities
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour ceredis_scores
CREATE TRIGGER update_ceredis_scores_updated_at 
  BEFORE UPDATE ON ceredis_scores
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ceredis_scores ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- POLICIES : PROFILES
-- ============================================================================

-- Lecture : utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Lecture : teachers peuvent lire tous les profils élèves
CREATE POLICY "Teachers can read student profiles"
  ON profiles
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'teacher'
    )
  );

-- Insertion : auto-création profil lors de l'inscription
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Mise à jour : utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- POLICIES : EVIDENCES
-- ============================================================================

-- Lecture : utilisateurs peuvent lire leurs propres evidences
CREATE POLICY "Users can read their own evidences"
  ON evidences
  FOR SELECT
  USING (auth.uid() = user_id);

-- Insertion : utilisateurs peuvent créer leurs propres evidences
CREATE POLICY "Users can insert their own evidences"
  ON evidences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Mise à jour : utilisateurs peuvent mettre à jour leurs propres evidences
CREATE POLICY "Users can update their own evidences"
  ON evidences
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Suppression : pas de suppression par défaut (à activer si nécessaire)
-- CREATE POLICY "Users can delete their own evidences"
--   ON evidences
--   FOR DELETE
--   USING (auth.uid() = user_id);

-- ============================================================================
-- POLICIES : ACTIVITIES
-- ============================================================================

-- Lecture : utilisateurs peuvent lire leurs propres activités
CREATE POLICY "Users can read their own activities"
  ON activities
  FOR SELECT
  USING (auth.uid() = user_id);

-- Insertion : utilisateurs peuvent créer leurs propres activités
CREATE POLICY "Users can insert their own activities"
  ON activities
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- POLICIES : CEREDIS_SCORES
-- ============================================================================

-- Lecture : utilisateurs peuvent lire leur propre score
CREATE POLICY "Users can read their own score"
  ON ceredis_scores
  FOR SELECT
  USING (auth.uid() = user_id);

-- Insertion/Update : service role uniquement (via API)
CREATE POLICY "Service role can manage scores"
  ON ceredis_scores
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Créer buckets pour fichiers
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('chansons-audio', 'chansons-audio', true),
  ('chansons-covers', 'chansons-covers', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Policy : Lecture publique audio
CREATE POLICY "Public can read audio files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'chansons-audio');

-- Policy : Lecture publique covers
CREATE POLICY "Public can read cover images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'chansons-covers');

-- Policy : Upload admin uniquement (via service role)
CREATE POLICY "Service role can upload audio"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'chansons-audio' 
    AND auth.jwt()->>'role' = 'service_role'
  );

CREATE POLICY "Service role can upload covers"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'chansons-covers' 
    AND auth.jwt()->>'role' = 'service_role'
  );

-- ============================================================================
-- VUES UTILES (optionnel, pour analytics)
-- ============================================================================

-- Vue : Statistiques par utilisateur
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  e.user_id,
  COUNT(DISTINCT e.id) as total_evidences,
  COUNT(DISTINCT e.competency_id) as competencies_worked,
  COUNT(DISTINCT a.seance_id) as seances_completed,
  AVG(e.score) as avg_score,
  MAX(e.created_at) as last_activity
FROM evidences e
LEFT JOIN activities a ON a.user_id = e.user_id
GROUP BY e.user_id;

COMMENT ON VIEW user_stats IS 'Statistiques agrégées par utilisateur';

-- Vue : Distribution des preuves
CREATE OR REPLACE VIEW evidence_distribution AS
SELECT 
  evidence_type,
  COUNT(*) as count,
  AVG(score) as avg_score,
  MIN(score) as min_score,
  MAX(score) as max_score
FROM evidences
GROUP BY evidence_type
ORDER BY evidence_type;

COMMENT profiles'),
      ('evidences'),
      ('activities'),
      ('ceredis_scores')
  ) AS expected(table_name)
  WHERE NOT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name = expected.table_name
  );
  
  IF missing_tables IS NOT NULL THEN
    RAISE EXCEPTION 'Tables manquantes: %', array_to_string(missing_tables, ', ');
  ELSE
    RAISE NOTICE 'Toutes les tables ont été créées avec succès';
  END IF;
END $$;

-- Vérifier que RLS est activé
DO $$
DECLARE
  tables_without_rls TEXT[];
BEGIN
  SELECT ARRAY_AGG(tablename)
  INTO tables_without_rls
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN ('profiles', l, pour tests)
-- ============================================================================

-- Vous pouvez ajouter des données de test ici si nécessaire
-- INSERT INTO ...

-- ============================================================================
-- VÉRIFICATIONS FINALES
-- ============================================================================

-- Vérifier que toutes les tables existent
DO $$
DECLARE
  missing_tables TEXT[];
BEGIN
  SELECT ARRAY_AGG(table_name)
  INTO missing_tables
  FROM (
    VALUES 
      ('evidences'),
      ('activities'),
      ('ceredis_scores')
  ) AS expected(table_name)
  WHERE NOT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name = expected.table_name
  );
  
  IF missing_tables IS NOT NULL THEN
    RAISE EXCEPTION 'Tables manquantes: %', array_to_string(missing_tables, ', ');
  ELSE
    RAISE NOTICE 'Toutes les tables ont été créées avec succès';
  END IF;
END $$;

-- Vérifier que RLS est activé
DO $$
DECLARE
  tables_without_rls TEXT[];
BEGIN
  SELECT ARRAY_AGG(tablename)
  INTO tables_without_rls
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN ('evidences', 'activities', 'ceredis_scores')
    AND NOT EXISTS (
      SELECT 1 
      FROM pg_policies 
      WHERE schemaname = 'public' 
        AND tablename = pg_tables.tablename
    );
  
  IF tables_without_rls IS NOT NULL THEN
    RAISE WARNING 'Tables sans policies RLS: %', array_to_string(tables_without_rls, ', ');
  ELSE
    RAISE NOTICE 'RLS configuré sur toutes les tables';
  END IF;
END $$;

-- Afficher résumé
SELECT 
  'Schema creation complete' as status,
  COUNT(DISTINCT table_name) as tables_created,
  COUNT(DISTINCT indexname) as indexes_created,
  COUNT(DISTINCT policyname) as policies_created
FROM (
  SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
  UNION ALL
  SELECT tablename as table_name FROM pg_indexes WHERE schemaname = 'public'
  UNION ALL
  SELECT tablename as table_name FROM pg_policies WHERE schemaname = 'public'
) stats;

-- ============================================================================
-- FIN DU SCHÉMA
-- ============================================================================
-- 
-- Prochaines étapes :
-- 1. Vérifier que toutes les tables sont créées
-- 2. Tester insertion/lecture avec RLS
-- 3. Migrer données depuis PocketBase
-- 4. Configurer client Supabase dans Next.js
-- 
-- ============================================================================
