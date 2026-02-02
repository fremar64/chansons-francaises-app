# 🚀 MIGRATION MASTER PLAN - PocketBase → Supabase

**Date début** : Lundi 3 février 2026, 9h00  
**Date fin** : Vendredi 7 février 2026, 17h00  
**Durée** : 5 jours (40 heures)  
**Équipe** : 3-5 développeurs + GitHub Copilot (GPT-5.2 Codex, Claude Opus 4.5, Gemini 3 PRO)

---

## 🎯 OBJECTIF

Migrer l'application Next.js de PocketBase (SQLite) vers Supabase (PostgreSQL) en conservant toutes les fonctionnalités et données existantes.

---

## 📋 PRÉREQUIS

### Infrastructure
- [x] Instance Coolify fonctionnelle : https://coolify.ceredis.net
- [x] Instance Supabase déployée : https://enaa-supabase.ceredis.net
- [x] Instance PocketBase actuelle : https://pocketbase-songs.ceredis.net

### Accès
- [x] Credentials Supabase (anon key, service role key)
- [x] Credentials PocketBase
- [x] Accès repository GitHub
- [x] GitHub Copilot avec modèles premium activés

### Backup
- [ ] Backup complet PocketBase avant migration (CRITIQUE)
- [ ] Export données existantes
- [ ] Snapshot Vercel actuel

---

## 🗓️ PLANNING DÉTAILLÉ

### JOUR 1 (Lundi 3 février) - FONDATIONS

#### 9h00-10h00 : KICKOFF
**Réunion équipe complète**
- Présentation plan migration
- Assignment des tâches
- Setup environnement

#### 10h00-12h00 : INFRASTRUCTURE
**DEV 1 : Supabase Setup**
```bash
# Via Coolify Dashboard
1. Vérifier déploiement Supabase
2. Accéder Supabase Studio : https://enaa-supabase.ceredis.net/project/default
3. Récupérer credentials :
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
4. Tester connexion
```

**DEV 2 : Schéma PostgreSQL**
```bash
# Exécuter SQL depuis SUPABASE_SCHEMA.sql
1. Ouvrir SQL Editor dans Supabase Studio
2. Copier contenu de SUPABASE_SCHEMA.sql
3. Exécuter
4. Vérifier tables créées
```

**DEV 3 : Backup PocketBase**
```bash
# CRITIQUE - À faire AVANT toute modification
cd /chemin/vers/pocketbase
tar -czf pb-backup-$(date +%Y%m%d).tar.gz pb_data/
mv pb-backup-*.tar.gz ~/backups/

# Export collections
node scripts/export-pocketbase.js
```

**DEV 4 : Setup projet local**
```bash
git checkout -b migration/supabase
npm install @supabase/supabase-js @supabase/ssr

# Variables env
cp .env.local .env.migration.local
# Ajouter credentials Supabase
```

**DEV 5 : Documentation**
```bash
# Inventorier code à migrer
grep -r "pb.collection" --include="*.ts" --include="*.tsx" > migration-inventory.txt
grep -r "PocketBase" --include="*.ts" --include="*.tsx" >> migration-inventory.txt

# Compter fichiers à modifier
wc -l migration-inventory.txt
```

#### 14h00-18h00 : CLIENT SUPABASE
**TOUS : Créer client Supabase**

Voir fichier `SUPABASE_CLIENT_SETUP.md` pour code complet.

**DEV 1+2** : Client browser & server
**DEV 3+4** : Types TypeScript
**DEV 5** : Tests connexion

**LIVRABLES J1** :
- [x] Supabase accessible et testé
- [x] Schéma PostgreSQL créé
- [x] Backup PocketBase complet
- [x] Client Supabase configuré
- [x] Types TypeScript définis
- [x] Tests connexion passent

---

### JOUR 2 (Mardi 4 février) - SÉCURITÉ & STORAGE

#### 9h00-12h00 : ROW LEVEL SECURITY

**DEV 1+2 : RLS Policies**
```sql
-- Voir SUPABASE_RLS.sql pour toutes les policies

-- Activer RLS
ALTER TABLE evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ceredis_scores ENABLE ROW LEVEL SECURITY;

-- Policies evidences
CREATE POLICY "Users read own evidences"
  ON evidences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own evidences"
  ON evidences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Idem pour activities, ceredis_scores
```

**DEV 3 : Tester RLS**
```typescript
// Tests RLS
// 1. Se connecter comme user A
// 2. Tenter lire données user B
// 3. Vérifier échec (403)
// 4. Lire propres données
// 5. Vérifier succès
```

#### 14h00-18h00 : STORAGE

**DEV 4+5 : Storage Buckets**
```sql
-- Créer buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('chansons-audio', 'chansons-audio', true),
  ('chansons-covers', 'chansons-covers', true);

-- Policies storage
CREATE POLICY "Public read audio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chansons-audio');

CREATE POLICY "Public read covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chansons-covers');
```

**Migration fichiers** :
```bash
# Script migration fichiers PocketBase → Supabase Storage
node scripts/migrate-files-to-supabase.js

# Vérifier fichiers
# https://enaa-supabase.ceredis.net/storage/v1/object/public/chansons-audio/
```

**LIVRABLES J2** :
- [x] RLS configuré et testé
- [x] Storage buckets créés
- [x] Fichiers migrés
- [x] URLs publiques fonctionnelles

---

### JOUR 3 (Mercredi 5 février) - MIGRATION CODE (PARALLÈLE)

**STRATÉGIE** : 5 devs attaquent 5 couches en parallèle

#### DEV 1 : API Routes (8h)
```typescript
// Fichiers à migrer
app/api/ceredis/calculate/route.ts
app/api/evidences/route.ts
app/api/activities/route.ts
// ... autres routes

// PATTERN DE MIGRATION

// AVANT (PocketBase)
import PocketBase from 'pocketbase';
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  
  const evidences = await pb.collection('evidences').getFullList({
    filter: `user = "${userId}"`,
    sort: '-created'
  });
  
  return NextResponse.json(evidences);
}

// APRÈS (Supabase)
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  const supabase = createClient();
  
  const { data: evidences, error } = await supabase
    .from('evidences')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return NextResponse.json(evidences);
}
```

**PROMPT COPILOT** :
```
Convert this PocketBase API route to Supabase:
- Replace PocketBase client with Supabase server client
- Transform filter syntax (PocketBase → Supabase)
- Transform field names (snake_case)
- Add error handling
- Maintain response format
```

#### DEV 2 : Service Unifié (8h)
```typescript
// Fichier critique
services/integration-unified/integration.unified.ts

// AVANT
async createEvidence(data) {
  const record = await this.pb.collection('evidences').create({
    user: data.userId,
    competencyId: data.competencyId,
    type: data.evidenceType,
    score: data.score,
    // ...
  });
  return record;
}

// APRÈS
async createEvidence(data) {
  const { data: record, error } = await this.supabase
    .from('evidences')
    .insert({
      user_id: data.userId,
      competency_id: data.competencyId,
      evidence_type: data.evidenceType,
      score: data.score,
      // ...
    })
    .select()
    .single();
  
  if (error) throw error;
  return record;
}
```

**PROMPT COPILOT** :
```
Migrate UnifiedIntegrationService from PocketBase to Supabase:
- Replace all pb.collection() calls with supabase.from()
- Transform all field names to snake_case
- Add proper error handling
- Maintain same interface
- Keep mode dégradé logic
```

#### DEV 3 : Hooks React (8h)
```typescript
// Fichiers
hooks/useActivityTracking.ts
hooks/useCeredisScore.ts
lib/ceredis/hooks.ts

// AVANT
const pb = new PocketBase(url);
const evidences = await pb.collection('evidences').getFullList({
  filter: `user = "${userId}"`
});

// APRÈS
const supabase = createClient();
const { data: evidences } = await supabase
  .from('evidences')
  .select('*')
  .eq('user_id', userId);
```

**PROMPT COPILOT** :
```
Convert React hooks from PocketBase to Supabase:
- Replace PocketBase imports with Supabase client
- Update queries to use Supabase syntax
- Transform field names
- Maintain React Query integration
- Keep loading/error states
```

#### DEV 4 : Composants Dashboard (8h)
```typescript
// Fichiers
components/dashboard/CeredisScoreCard.tsx
components/dashboard/DomainRadarChart.tsx
components/dashboard/CompetencyGrid.tsx
app/dashboard/ceredis/page.tsx

// La plupart utilisent les hooks, donc peu de changements
// Vérifier les appels directs éventuels
```

**PROMPT COPILOT** :
```
Review dashboard components for any direct database calls:
- Replace any PocketBase calls with Supabase
- Ensure all data fetching uses hooks
- Update any hardcoded field names
- Test data transformations
```

#### DEV 5 : Auth & Middleware (8h)
```typescript
// Fichiers critiques
lib/auth/
middleware.ts (si existe)

// AVANT (PocketBase Auth)
const authData = await pb.collection('users').authWithPassword(email, password);
const user = pb.authStore.model;

// APRÈS (Supabase Auth)
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
const user = data.user;
```

**PROMPT COPILOT** :
```
Migrate authentication from PocketBase to Supabase:
- Replace PocketBase auth with Supabase Auth
- Update session handling
- Migrate user metadata
- Update middleware for session management
- Test login/logout flows
```

**LIVRABLES J3** :
- [x] Toutes API routes migrées
- [x] Service unifié migré
- [x] Hooks migrés
- [x] Dashboard adapté
- [x] Auth Supabase configurée
- [x] Code compile sans erreurs

---

### JOUR 4 (Jeudi 6 février) - MIGRATION DONNÉES + TESTS

#### 9h00-13h00 : MIGRATION DONNÉES

**DEV 1+2+3 : Migration données PocketBase → Supabase**

**Étape 1 : Export PocketBase**
```bash
node scripts/export-pocketbase.js

# Résultats
exports/users.json          # ~50 users
exports/evidences.json      # ~1000 evidences
exports/activities.json     # ~500 activities
exports/seances.json        # ~20 seances (si stockées)
```

**Étape 2 : Transformation**
```bash
node scripts/transform-data.js

# Transforme :
# - Field names : camelCase → snake_case
# - Relations : ID string → UUID
# - Timestamps : PB format → ISO8601
# - Metadata : nested objects → JSONB

# Résultats
transformed/users.json
transformed/evidences.json
transformed/activities.json
```

**Étape 3 : Import Supabase**
```bash
node scripts/import-supabase.js

# Import par batches de 1000
# Avec transaction rollback si erreur
# Logs détaillés
```

**Étape 4 : Vérification**
```sql
-- Compter records
SELECT 'users' as table_name, COUNT(*) FROM auth.users
UNION ALL
SELECT 'evidences', COUNT(*) FROM evidences
UNION ALL
SELECT 'activities', COUNT(*) FROM activities;

-- Comparer avec counts PocketBase
-- Doivent être identiques
```

**Étape 5 : Validation données**
```typescript
// Script validation
const pbEvidences = JSON.parse(fs.readFileSync('exports/evidences.json'));
const { data: sbEvidences } = await supabase.from('evidences').select('*');

// Vérifier counts
assert(pbEvidences.length === sbEvidences.length);

// Vérifier sample records
const pbSample = pbEvidences[0];
const sbSample = sbEvidences.find(e => e.id === pbSample.id);

assert(sbSample.competency_id === pbSample.competencyId);
assert(sbSample.score === pbSample.score);
// ... autres champs
```

#### 14h00-18h00 : TESTS INTÉGRATION

**DEV 4+5 : Tests complets**

**Test 1 : Tracking activité**
```typescript
test('should track activity completion', async () => {
  const payload = {
    userId: 'test-user-id',
    userName: 'Test User',
    ecranData: { /* ... */ },
    metadata: { /* ... */ }
  };
  
  const result = await unifiedIntegrationService.trackActivityCompletion(payload);
  
  // Vérifier evidence créée dans Supabase
  const { data: evidences } = await supabase
    .from('evidences')
    .select('*')
    .eq('user_id', 'test-user-id');
  
  expect(evidences.length).toBeGreaterThan(0);
  expect(evidences[0].competency_id).toBe(metadata.competences[0]);
});
```

**Test 2 : Calcul CEREDIS**
```typescript
test('should calculate CEREDIS score', async () => {
  // Créer evidences test
  await createTestEvidences('test-user', 10);
  
  // Calculer score
  const response = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    body: JSON.stringify({ userId: 'test-user' })
  });
  
  const score = await response.json();
  
  expect(score.ceredisScore).toBeGreaterThan(0);
  expect(score.cecrlLevel).toMatch(/A2|B1|B2|C1/);
});
```

**Test 3 : Dashboard**
```typescript
test('should display dashboard correctly', async () => {
  // Utiliser Playwright ou Cypress
  await page.goto('/dashboard/ceredis');
  
  // Vérifier éléments présents
  await expect(page.locator('.ceredis-score')).toBeVisible();
  await expect(page.locator('.cecrl-level')).toBeVisible();
  await expect(page.locator('.domain-radar')).toBeVisible();
});
```

**Test 4 : Auth flow**
```typescript
test('should authenticate user', async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword123'
  });
  
  expect(error).toBeNull();
  expect(data.user).toBeDefined();
  expect(data.session).toBeDefined();
});
```

**LIVRABLES J4** :
- [x] Toutes données migrées
- [x] Vérification counts OK
- [x] Validation sample data OK
- [x] Tests intégration passent
- [x] Tests E2E critiques passent

---

### JOUR 5 (Vendredi 7 février) - DÉPLOIEMENT & VALIDATION

#### 9h00-12h00 : TESTS E2E COMPLETS

**TOUS : Scénarios utilisateur complets**

**Scénario 1 : Parcours élève complet**
```typescript
test('Complete student journey', async () => {
  // 1. Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'student@test.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  // 2. Choisir parcours
  await page.goto('/');
  await page.click('text=Là-bas');
  
  // 3. Choisir séance
  await page.click('text=Séance 1');
  
  // 4. Compléter activité
  await page.click('text=Écran 1');
  // ... interactions ...
  await page.click('button:has-text("Soumettre")');
  
  // 5. Vérifier tracking
  await page.goto('/dashboard/ceredis');
  await expect(page.locator('.ceredis-score')).toContainText(/\d+/);
});
```

**Scénario 2 : Performance**
```typescript
test('should respond quickly', async () => {
  const start = Date.now();
  
  await fetch('/api/ceredis/calculate', {
    method: 'POST',
    body: JSON.stringify({ userId: 'test-user' })
  });
  
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(500); // < 500ms
});
```

**Scénario 3 : Concurrent users**
```typescript
test('should handle multiple users', async () => {
  // Simuler 10 users simultanés
  const promises = Array(10).fill(null).map((_, i) => 
    trackActivityCompletion({
      userId: `user-${i}`,
      // ...
    })
  );
  
  const results = await Promise.all(promises);
  expect(results.every(r => r.success)).toBe(true);
});
```

#### 14h00-16h00 : DÉPLOIEMENT STAGING

**DEV 1+2 : Déploiement Vercel**

```bash
# 1. Créer environment staging
vercel env add NEXT_PUBLIC_SUPABASE_URL staging
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY staging

# 2. Déployer
git push origin migration/supabase
vercel --env=staging

# 3. Tester déploiement
curl https://chansons-staging.vercel.app/api/health
```

**DEV 3+4 : Vérification staging**

```bash
# Tests sur staging
STAGING_URL=https://chansons-staging.vercel.app npm run test:e2e

# Vérifier :
# - Login fonctionne
# - Tracking fonctionne
# - Dashboard affiche données
# - Performance OK
```

#### 16h00-17h00 : DOCUMENTATION & RETRO

**DEV 5 : Documentation finale**

```markdown
# Migration PocketBase → Supabase - Rapport

## Résumé
- Début : 3 février 2026 9h00
- Fin : 7 février 2026 17h00
- Durée : 5 jours
- Équipe : 5 développeurs

## Résultats
✅ Schéma PostgreSQL créé
✅ RLS configuré
✅ Storage migré
✅ Code migré (100%)
✅ Données migrées (100%)
✅ Tests passent (100%)
✅ Déployé sur staging

## Statistiques migration
- Fichiers modifiés : XX
- Lignes code changées : XXXX
- Records migrés : XXXX
- Tests écrits : XX
- Bugs trouvés/fixés : X

## Rollback plan
1. Revenir à commit pre-migration
2. Restaurer backup PocketBase
3. Redéployer version stable
4. Temps estimé : 1h

## Prochaines étapes
1. Tests utilisateurs sur staging (lundi)
2. Corrections bugs si nécessaire (mardi)
3. Déploiement production (mercredi)
```

**TOUS : Rétrospective**
- Ce qui a bien marché
- Difficultés rencontrées
- Améliorations process
- Leçons apprises

#### 17h00 : 🎉 CÉLÉBRATION

**MIGRATION TERMINÉE !**

**LIVRABLES J5** :
- [x] Tests E2E passent 100%
- [x] Staging déployé et validé
- [x] Documentation complète
- [x] Rollback plan prêt
- [x] Rapport migration

---

## 📊 MÉTRIQUES DE SUCCÈS

### Performance
- [ ] API response time < 500ms (p95)
- [ ] Page load < 2s
- [ ] Time to interactive < 3s

### Fonctionnel
- [ ] Toutes features PocketBase fonctionnent
- [ ] Tracking activités OK
- [ ] Calcul CEREDIS OK
- [ ] Dashboard affiche données
- [ ] Auth fonctionne

### Data integrity
- [ ] Count records identique
- [ ] Sample validation OK
- [ ] Pas de perte données
- [ ] Relations conservées

### Tests
- [ ] Tests unitaires : >80% coverage
- [ ] Tests intégration : 100% passent
- [ ] Tests E2E : scénarios critiques OK

---

## 🚨 GESTION RISQUES

### Risque 1 : Migration données échoue
**Probabilité** : Moyenne  
**Impact** : Élevé  
**Mitigation** :
- Backup complet avant migration
- Validation progressive (par batches)
- Transaction avec rollback
- Tests sur données synthétiques d'abord

### Risque 2 : Bugs après migration
**Probabilité** : Moyenne  
**Impact** : Moyen  
**Mitigation** :
- Tests exhaustifs avant prod
- Déploiement staging d'abord
- Monitoring renforcé
- Rollback plan prêt

### Risque 3 : Performance dégradée
**Probabilité** : Faible  
**Impact** : Moyen  
**Mitigation** :
- Tests performance avant/après
- Index PostgreSQL optimisés
- Caching strategy
- Monitoring temps réponse

### Risque 4 : Équipe bloquée
**Probabilité** : Faible  
**Impact** : Élevé  
**Mitigation** :
- Claude disponible en continu
- Documentation complète
- Pair programming
- Daily standups

---

## 📞 COMMUNICATION

### Daily Standup (30min)
**Heure** : 9h00 chaque jour

**Format** :
1. Tour de table (5min/dev)
   - Hier : qu'ai-je fait ?
   - Aujourd'hui : que vais-je faire ?
   - Blockers : quels obstacles ?

2. Synchronisation (10min)
   - Dépendances entre tâches
   - Aide nécessaire
   - Ajustements planning

### End of Day (15min)
**Heure** : 17h30 chaque jour

**Format** :
1. Démo rapide (10min)
   - Montrer avancement
   - Tester fonctionnalités

2. Blockers pour demain (5min)
   - Problèmes non résolus
   - Aide nécessaire

### Slack/Discord
**Channel** : #migration-supabase

**Usage** :
- Questions techniques
- Partage code snippets
- Alerts problèmes
- Coordination temps réel

---

## ✅ CHECKLIST FINALE

### Pré-migration
- [ ] Backup PocketBase complet
- [ ] Export données
- [ ] Credentials Supabase récupérés
- [ ] GitHub Copilot configuré
- [ ] Environnement dev setup

### Migration
- [ ] Schéma PostgreSQL créé
- [ ] RLS configuré
- [ ] Storage migré
- [ ] Code migré (API, services, hooks, composants)
- [ ] Auth migrée
- [ ] Données migrées
- [ ] Tests passent

### Post-migration
- [ ] Staging déployé
- [ ] Tests E2E sur staging
- [ ] Performance validée
- [ ] Documentation écrite
- [ ] Rollback plan testé
- [ ] Équipe formée Supabase

### Production (Semaine 2)
- [ ] Tests utilisateurs sur staging
- [ ] Bugs critiques fixés
- [ ] Monitoring configuré
- [ ] Déploiement production
- [ ] Validation production

---

## 🎓 FORMATION ÉQUIPE

### Supabase Basics (1h)
**Quand** : Lundi matin après kickoff

**Contenu** :
1. Architecture Supabase (15min)
2. PostgreSQL vs SQLite (15min)
3. RLS concepts (15min)
4. Client Supabase API (15min)

### Pair Programming (continu)
- Junior + Senior sur tâches complexes
- Partage connaissances
- Code review en temps réel

### Documentation
- Lire docs Supabase : https://supabase.com/docs
- Lire docs Next.js SSR : https://nextjs.org/docs
- Consulter exemples : https://github.com/supabase/supabase/tree/master/examples

---

**Date création** : 1er février 2026  
**Version** : 1.0  
**Statut** : PRÊT POUR EXÉCUTION  
**Go/No-Go** : ✅ GO
