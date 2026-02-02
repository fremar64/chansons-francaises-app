-- ============================================================
-- SCHEMA SUPABASE - Version sans commentaires
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE: profiles (users metadata)
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  is_validated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_validated ON profiles(is_validated);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- TABLE: evidences
-- ============================================================

CREATE TABLE IF NOT EXISTS evidences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  competency_id TEXT NOT NULL,
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('P1', 'P2', 'P3', 'P4')),
  score NUMERIC(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  
  activity_type TEXT,
  activity_id TEXT,
  seance_id TEXT,
  ecran_id TEXT,
  chanson_id TEXT,
  
  response JSONB,
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_evidences_user ON evidences(user_id);
CREATE INDEX idx_evidences_competency ON evidences(competency_id);
CREATE INDEX idx_evidences_type ON evidences(evidence_type);
CREATE INDEX idx_evidences_created ON evidences(created_at DESC);
CREATE INDEX idx_evidences_user_competency ON evidences(user_id, competency_id);
CREATE INDEX idx_evidences_response ON evidences USING GIN(response);
CREATE INDEX idx_evidences_metadata ON evidences USING GIN(metadata);

ALTER TABLE evidences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own evidences"
  ON evidences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evidences"
  ON evidences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own evidences"
  ON evidences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all evidences"
  ON evidences FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- TABLE: activities
-- ============================================================

CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  seance_id TEXT NOT NULL,
  ecran_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  
  score NUMERIC(5,2) CHECK (score >= 0 AND score <= 100),
  time_spent INTEGER,
  
  response JSONB,
  metadata JSONB,
  
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_seance ON activities(seance_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_completed ON activities(completed_at DESC);
CREATE INDEX idx_activities_user_seance ON activities(user_id, seance_id);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own activities"
  ON activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all activities"
  ON activities FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- TABLE: ceredis_scores
-- ============================================================

CREATE TABLE IF NOT EXISTS ceredis_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  ceredis_score NUMERIC(6,2) NOT NULL CHECK (ceredis_score >= 0 AND ceredis_score <= 600),
  cecrl_level TEXT NOT NULL CHECK (cecrl_level IN ('A2', 'B1', 'B2', 'C1')),
  
  domain_scores JSONB NOT NULL,
  competency_scores JSONB NOT NULL,
  validation JSONB,
  
  computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  engine_version TEXT DEFAULT '1.0',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ceredis_user ON ceredis_scores(user_id);
CREATE INDEX idx_ceredis_level ON ceredis_scores(cecrl_level);
CREATE INDEX idx_ceredis_computed ON ceredis_scores(computed_at DESC);
CREATE INDEX idx_ceredis_user_latest ON ceredis_scores(user_id, computed_at DESC);

ALTER TABLE ceredis_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own scores"
  ON ceredis_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all scores"
  ON ceredis_scores FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('chansons-audio', 'chansons-audio', true, 52428800, ARRAY['audio/mpeg', 'audio/mp3']),
  ('chansons-covers', 'chansons-covers', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for audio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chansons-audio');

CREATE POLICY "Service role upload audio"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'chansons-audio' AND auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Public read access for covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chansons-covers');

CREATE POLICY "Service role upload covers"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'chansons-covers' AND auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_evidences_updated_at
  BEFORE UPDATE ON evidences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- VIEWS
-- ============================================================

CREATE OR REPLACE VIEW user_stats AS
SELECT 
  e.user_id,
  COUNT(DISTINCT e.id) as total_evidences,
  COUNT(DISTINCT e.competency_id) as competencies_covered,
  AVG(e.score) as average_score,
  MAX(e.created_at) as last_evidence_date
FROM evidences e
GROUP BY e.user_id;

CREATE OR REPLACE VIEW evidence_distribution AS
SELECT 
  evidence_type,
  COUNT(*) as count,
  AVG(score) as avg_score
FROM evidences
GROUP BY evidence_type;

-- ============================================================
-- FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION get_domain_average(p_user_id UUID, p_domain TEXT)
RETURNS NUMERIC AS $$
DECLARE
  v_avg NUMERIC;
BEGIN
  SELECT AVG(score) INTO v_avg
  FROM evidences
  WHERE user_id = p_user_id
    AND competency_id LIKE p_domain || '%';
  
  RETURN COALESCE(v_avg, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- VERIFICATION
-- ============================================================

DO $$
BEGIN
  RAISE NOTICE 'Schema created successfully!';
  RAISE NOTICE 'Tables: profiles, evidences, activities, ceredis_scores';
  RAISE NOTICE 'Storage buckets: chansons-audio, chansons-covers';
  RAISE NOTICE 'Views: user_stats, evidence_distribution';
END $$;
