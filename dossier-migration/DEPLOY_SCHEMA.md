# 🚀 Déploiement du Schéma Supabase

**Statut** : ✅ Connexion Supabase fonctionnelle  
**Prochaine étape** : Créer les 4 tables + RLS policies  
**Durée estimée** : 2-3 minutes

---

## 📋 Prérequis

✅ Variables d'environnement configurées dans `.env.local`  
✅ Connexion Supabase testée avec `test-supabase-connection.js`  
✅ Schéma SQL prêt : `dossier-migration/SUPABASE_SCHEMA.sql` (18K)

---

## 🎯 Méthode 1 : Via Supabase Studio (Recommandé)

### Étape 1 : Ouvrir Supabase Studio

```bash
# Ouvrir dans le navigateur
https://enaa-supabase.ceredis.net
```

**Identifiants** : Utiliser les credentials configurés lors du déploiement Coolify

### Étape 2 : Accéder au SQL Editor

1. Dans le menu latéral gauche, cliquer sur **SQL Editor**
2. Cliquer sur **New Query** (ou le bouton `+`)

### Étape 3 : Copier le schéma SQL

```bash
# Afficher le contenu du schéma
cat dossier-migration/SUPABASE_SCHEMA.sql
```

**Ou** ouvrir le fichier dans VS Code et copier tout le contenu (Ctrl+A, Ctrl+C)

### Étape 4 : Coller et exécuter

1. Coller le contenu complet dans l'éditeur SQL
2. Cliquer sur **Run** (ou Ctrl+Enter)
3. Attendre l'exécution (~2-3 secondes)

### Étape 5 : Vérifier le résultat

✅ **Succès** : Message vert "Success. No rows returned"  
❌ **Erreur** : Lire le message d'erreur et vérifier les logs

### Étape 6 : Vérifier les tables créées

1. Dans le menu latéral, cliquer sur **Table Editor**
2. Vérifier que les 4 tables apparaissent :
   - ✅ `profiles`
   - ✅ `evidences`
   - ✅ `activities`
   - ✅ `ceredis_scores`

---

## 🤖 Méthode 2 : Via CLI Supabase (Alternative)

### Prérequis CLI

```bash
# Installer Supabase CLI (si pas déjà fait)
npm install -g supabase

# Login
supabase login
```

### Déployer le schéma

```bash
# Se connecter au projet
supabase link --project-ref <PROJECT_REF>

# Exécuter le schéma
supabase db push --db-url "postgresql://postgres:[PASSWORD]@enaa-supabase.ceredis.net:5432/postgres"
```

**Note** : Cette méthode nécessite la chaîne de connexion PostgreSQL directe

---

## 🐳 Méthode 3 : Via psql (Terminal direct)

### Connexion PostgreSQL

```bash
# Récupérer la connection string depuis Supabase Studio
# Settings → Database → Connection string (Direct connection)

# Exécuter le schéma
psql "postgresql://postgres:[PASSWORD]@enaa-supabase.ceredis.net:5432/postgres" \
  -f dossier-migration/SUPABASE_SCHEMA.sql
```

---

## ✅ Validation Post-Déploiement

### Test 1 : Vérifier les tables

```bash
# Créer test-schema-deployed.js
cat > test-schema-deployed.js << 'EOF'
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  console.log('\n🔍 Vérification des tables...\n');
  
  const tables = ['profiles', 'evidences', 'activities', 'ceredis_scores'];
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      console.log(`✅ ${table.padEnd(20)} → ${count ?? 0} lignes`);
    } catch (err) {
      console.log(`❌ ${table.padEnd(20)} → ERREUR: ${err.message}`);
    }
  }
  
  console.log('\n');
})();
EOF

# Exécuter le test
node test-schema-deployed.js
```

**Résultat attendu** :
```
🔍 Vérification des tables...

✅ profiles              → 0 lignes
✅ evidences             → 0 lignes
✅ activities            → 0 lignes
✅ ceredis_scores        → 0 lignes
```

### Test 2 : Vérifier les RLS policies

```bash
# Dans Supabase Studio
# Authentication → Policies
```

Vérifier que chaque table a ses policies :
- `profiles` : 3 policies (SELECT, INSERT, UPDATE)
- `evidences` : 2 policies (SELECT, INSERT)
- `activities` : 3 policies (SELECT, INSERT, UPDATE)
- `ceredis_scores` : 2 policies (SELECT, INSERT)

### Test 3 : Vérifier les triggers

```sql
-- Dans SQL Editor, exécuter :
SELECT 
  trigger_name, 
  event_object_table, 
  action_timing, 
  event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;
```

**Résultat attendu** : 4 triggers `update_updated_at_column`

---

## 🐛 Dépannage

### Erreur : "relation already exists"

**Cause** : Les tables existent déjà  
**Solution** : 
```sql
-- Supprimer les tables existantes (ATTENTION : perte de données)
DROP TABLE IF EXISTS ceredis_scores CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS evidences CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Puis ré-exécuter SUPABASE_SCHEMA.sql
```

### Erreur : "permission denied"

**Cause** : Rôle insuffisant  
**Solution** : S'assurer d'être connecté avec le rôle `postgres` ou `service_role`

### Erreur : "extension does not exist"

**Cause** : Extensions PostgreSQL non activées  
**Solution** :
```sql
-- Activer les extensions manuellement
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Erreur de connexion

**Cause** : URL ou credentials incorrects  
**Solution** : Vérifier `.env.local` et l'état du service Supabase

```bash
# Vérifier que Supabase est bien démarré
curl -I https://enaa-supabase.ceredis.net

# Vérifier les logs Docker (si déployé sur Coolify)
docker logs supabase-kong-<ID>
```

---

## 📊 Contenu du Schéma v1.2

### Tables créées (4)

1. **profiles** (Profils utilisateurs)
   - Colonnes : `id`, `name`, `username`, `email`, `role`, `is_validated`, `avatar_url`, `metadata`
   - Foreign Key : `auth.users(id)` ON DELETE CASCADE
   - Index : `username`, `role`, `email`, `is_validated`

2. **evidences** (Preuves de compétences)
   - Colonnes : `id`, `user_id`, `competency_id`, `evidence_type`, `score`, `activity_type`, etc.
   - Foreign Key : `auth.users(id)` ON DELETE CASCADE
   - Index : `user_id`, `competency_id`, `created_at`
   - Check : `score BETWEEN 0 AND 100`

3. **activities** (Activités élèves)
   - Colonnes : `id`, `user_id`, `seance_id`, `score`, `score_total`, `score_max`, `time_spent`
   - Foreign Key : `auth.users(id)` ON DELETE CASCADE
   - Index : `user_id`, `seance_id`, `created_at`

4. **ceredis_scores** (Scores CEREDIS agrégés)
   - Colonnes : `id`, `user_id`, `ceredis_score`, `cecrl_level`, `domain_scores`, `competency_scores`
   - Foreign Key : `auth.users(id)` ON DELETE CASCADE
   - Index : `user_id`, `cecrl_level`, `ceredis_score`

### Sécurité RLS

- **Row Level Security activé** sur toutes les tables
- **Policies** : Les utilisateurs ne peuvent accéder qu'à leurs propres données
- **Exceptions** : Les enseignants peuvent voir les données de leurs élèves

### Fonctionnalités

- **Triggers** : `updated_at` automatiquement mis à jour
- **Fonctions** : `update_updated_at_column()` pour les timestamps
- **Storage** : Buckets `avatars` et `audio` avec policies

---

## 🎯 Après le Déploiement

Une fois le schéma déployé avec succès :

### ✅ Prochaines étapes

1. **Tester l'application** :
   ```bash
   npm run dev
   # Ouvrir http://localhost:3000
   # Essayer login/register
   ```

2. **Migrer les données PocketBase** :
   ```bash
   # Export
   node scripts/migration/export-pocketbase.js
   
   # Transform
   node scripts/migration/transform-data.js
   
   # Import
   node scripts/migration/import-supabase.js
   ```

3. **Régénérer les types TypeScript** :
   ```bash
   npx supabase gen types typescript \
     --project-id <PROJECT_ID> \
     --schema public \
     > lib/supabase/types.generated.ts
   ```

4. **Tests E2E** :
   ```bash
   npm run test:e2e
   ```

---

## 📚 Références

- [Supabase SQL Editor Docs](https://supabase.com/docs/guides/database/overview)
- [RLS Policies Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [SUPABASE_SCHEMA.sql](./SUPABASE_SCHEMA.sql) - Schéma complet v1.2
- [MIGRATION_COMPLETE_STATUS.md](./MIGRATION_COMPLETE_STATUS.md) - État migration

---

**✅ Prêt à déployer le schéma !**  
**📍 Commencer par la Méthode 1 (Supabase Studio) - la plus simple**
