# 🚀 Migration des Données PocketBase → Supabase

**Prérequis** :
- ✅ Schéma Supabase déployé (4 tables créées)
- ✅ Connexion PocketBase fonctionnelle
- ✅ Variables d'environnement configurées (`.env.local`)

**Durée estimée** : 5-10 minutes

---

## 📋 Vue d'ensemble

La migration des données se fait en 3 étapes :

```
┌──────────────┐      ┌───────────────┐      ┌──────────────┐
│  PocketBase  │      │  Fichiers     │      │   Supabase   │
│   (SQLite)   │ ───> │  JSON temp    │ ───> │ (PostgreSQL) │
└──────────────┘      └───────────────┘      └──────────────┘
   Export                Transform              Import
   
1. export-pocketbase.js   2. transform-data.js   3. import-supabase.js
   - users                   - camelCase              - profiles
   - evidences               → snake_case             - evidences
   - progression             - Mappings champs        - activities
   - ceredis_scores          - Timestamps             - ceredis_scores
```

---

## 🔍 Étape 0 : Vérifier l'état des données

### PocketBase (source)

```bash
# Tester la connexion PocketBase
node test-supabase-connection.js
```

**Note** : Le script teste Supabase, mais vérifie aussi que PocketBase est accessible via `.env.local`

### Vérifier les collections PocketBase

```bash
# Créer un script de vérification PB
cat > test-pocketbase-data.js << 'EOF'
require('dotenv').config({ path: '.env.local' });
const PocketBase = require('pocketbase');

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

(async () => {
  console.log('\n📊 Comptage données PocketBase...\n');
  
  const collections = ['users', 'evidences', 'progression', 'ceredis_scores'];
  
  for (const col of collections) {
    try {
      const result = await pb.collection(col).getList(1, 1);
      console.log(`✅ ${col.padEnd(20)} → ${result.totalItems} enregistrements`);
    } catch (err) {
      console.log(`❌ ${col.padEnd(20)} → ERREUR: ${err.message}`);
    }
  }
  
  console.log('\n');
})();
EOF

node test-pocketbase-data.js
```

---

## 📤 Étape 1 : Export PocketBase

### Script : `scripts/migration/export-pocketbase.js`

```bash
# Exécuter l'export
node scripts/migration/export-pocketbase.js
```

### Sortie attendue

```
╔════════════════════════════════════════════════════════════╗
║       📤 EXPORT POCKETBASE → JSON                          ║
╚════════════════════════════════════════════════════════════╝

🔗 Connexion à : https://pocketbase-songs.ceredis.net

📊 Export en cours...
   ✅ users           → 15 enregistrements
   ✅ evidences       → 342 enregistrements
   ✅ progression     → 89 enregistrements
   ✅ ceredis_scores  → 15 enregistrements

💾 Fichiers créés :
   → scripts/migration/data/pb-users.json
   → scripts/migration/data/pb-evidences.json
   → scripts/migration/data/pb-progression.json
   → scripts/migration/data/pb-ceredis_scores.json

✅ Export terminé avec succès !
```

### Vérifier les fichiers exportés

```bash
# Lister les fichiers
ls -lh scripts/migration/data/

# Exemple : Voir le premier user
cat scripts/migration/data/pb-users.json | jq '.[0]'
```

---

## 🔄 Étape 2 : Transformation des données

### Script : `scripts/migration/transform-data.js`

Cette étape transforme les données PocketBase (camelCase) vers le format Supabase (snake_case).

```bash
# Exécuter la transformation
node scripts/migration/transform-data.js
```

### Transformations appliquées

| PocketBase (source) | Supabase (cible) | Notes |
|---------------------|------------------|-------|
| `users` collection | `profiles` table | + lien `auth.users` |
| `user` | `user_id` | FK vers auth.users |
| `competencyId` | `competency_id` | Nomenclature CEREDIS |
| `evidenceType` | `evidence_type` | P1, P2, P3, P4 |
| `activityType` | `activity_type` | Type d'activité |
| `activityId` | `activity_id` | ID activité |
| `seanceId` | `seance_id` | ID séance |
| `chansonId` | `chanson_id` | ID chanson |
| `isValidated` | `is_validated` | Validation admin |
| `created` | `created_at` | Timestamp ISO 8601 |
| `updated` | `updated_at` | Timestamp ISO 8601 |

### Sortie attendue

```
╔════════════════════════════════════════════════════════════╗
║       🔄 TRANSFORMATION POCKETBASE → SUPABASE              ║
╚════════════════════════════════════════════════════════════╝

📋 Transformation en cours...

   ✅ users → profiles
      - 15 enregistrements transformés
      - Champs mappés : name, email, role, isValidated → is_validated
      
   ✅ evidences → evidences
      - 342 enregistrements transformés
      - user → user_id, competencyId → competency_id
      - created → created_at, updated → updated_at
      
   ✅ progression → activities
      - 89 enregistrements transformés
      - seanceId → seance_id, timeSpent → time_spent
      
   ✅ ceredis_scores → ceredis_scores
      - 15 enregistrements transformés
      - domainScores → domain_scores (JSONB)

💾 Fichiers créés :
   → scripts/migration/data/supabase-profiles.json
   → scripts/migration/data/supabase-evidences.json
   → scripts/migration/data/supabase-activities.json
   → scripts/migration/data/supabase-ceredis_scores.json

✅ Transformation terminée avec succès !
```

### Vérifier les transformations

```bash
# Comparer avant/après
echo "=== AVANT (PocketBase) ==="
cat scripts/migration/data/pb-users.json | jq '.[0] | {id, email, isValidated, created}'

echo ""
echo "=== APRÈS (Supabase) ==="
cat scripts/migration/data/supabase-profiles.json | jq '.[0] | {id, email, is_validated, created_at}'
```

---

## 📥 Étape 3 : Import vers Supabase

### Script : `scripts/migration/import-supabase.js`

**⚠️ ATTENTION** : Cet import nécessite la `SUPABASE_SERVICE_ROLE_KEY` (présente dans `.env.local`)

```bash
# Exécuter l'import
node scripts/migration/import-supabase.js
```

### Sortie attendue

```
╔════════════════════════════════════════════════════════════╗
║       📥 IMPORT VERS SUPABASE                              ║
╚════════════════════════════════════════════════════════════╝

🔗 Connexion à : https://enaa-supabase.ceredis.net
🔑 Utilisation : Service Role Key (admin)

📋 Import en cours...

   ✅ profiles
      - 15 enregistrements importés (batch: 10)
      - Durée : 1.2s
      
   ✅ evidences
      - 342 enregistrements importés (batch: 50)
      - Durée : 2.8s
      
   ✅ activities
      - 89 enregistrements importés (batch: 50)
      - Durée : 0.9s
      
   ✅ ceredis_scores
      - 15 enregistrements importés (batch: 50)
      - Durée : 0.5s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╔════════════════════════════════════════════════════════════╗
║  ✅ MIGRATION DONNÉES TERMINÉE AVEC SUCCÈS !               ║
╚════════════════════════════════════════════════════════════╝

📊 Résumé :
   - Total : 461 enregistrements migrés
   - Durée totale : 5.4s
   - Taux de réussite : 100%
```

---

## ✅ Étape 4 : Validation Post-Migration

### Test 1 : Vérifier les comptages

```bash
# Réutiliser le script de test
node test-schema-deployed.js
```

**Résultat attendu** :
```
✅ profiles             → 15 ligne(s)
✅ evidences            → 342 ligne(s)
✅ activities           → 89 ligne(s)
✅ ceredis_scores       → 15 ligne(s)
```

### Test 2 : Vérifier l'intégrité des données

```bash
# Créer un script de validation
cat > test-data-integrity.js << 'EOF'
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  console.log('\n🔍 Vérification intégrité des données...\n');
  
  // Test 1 : Tous les profiles ont un email
  const { data: profilesNoEmail } = await supabase
    .from('profiles')
    .select('id')
    .is('email', null);
  console.log(`✅ Profiles sans email : ${profilesNoEmail?.length ?? 0} (doit être 0)`);
  
  // Test 2 : Toutes les evidences ont un user_id valide
  const { data: evidences } = await supabase
    .from('evidences')
    .select('user_id');
  const uniqueUsers = new Set(evidences?.map(e => e.user_id));
  console.log(`✅ Utilisateurs uniques dans evidences : ${uniqueUsers.size}`);
  
  // Test 3 : Scores CEREDIS entre 0 et 1000
  const { data: invalidScores } = await supabase
    .from('ceredis_scores')
    .select('ceredis_score')
    .or('ceredis_score.lt.0,ceredis_score.gt.1000');
  console.log(`✅ Scores invalides : ${invalidScores?.length ?? 0} (doit être 0)`);
  
  // Test 4 : Activities avec score >= 0
  const { data: negativeScores } = await supabase
    .from('activities')
    .select('score')
    .lt('score', 0);
  console.log(`✅ Scores négatifs : ${negativeScores?.length ?? 0} (doit être 0)`);
  
  console.log('\n');
})();
EOF

node test-data-integrity.js
```

### Test 3 : Comparer avec PocketBase

```bash
# Créer un script de comparaison
cat > compare-migration.js << 'EOF'
require('dotenv').config({ path: '.env.local' });
const PocketBase = require('pocketbase');
const { createClient } = require('@supabase/supabase-js');

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  console.log('\n📊 Comparaison PocketBase ↔ Supabase\n');
  
  const comparisons = [
    { pb: 'users', sb: 'profiles' },
    { pb: 'evidences', sb: 'evidences' },
    { pb: 'progression', sb: 'activities' },
    { pb: 'ceredis_scores', sb: 'ceredis_scores' }
  ];
  
  for (const { pb: pbCol, sb: sbTable } of comparisons) {
    try {
      const pbResult = await pb.collection(pbCol).getList(1, 1);
      const { count: sbCount } = await supabase
        .from(sbTable)
        .select('*', { count: 'exact', head: true });
      
      const match = pbResult.totalItems === sbCount ? '✅' : '⚠️';
      console.log(`${match} ${pbCol.padEnd(18)} → PB: ${pbResult.totalItems.toString().padStart(4)} | SB: ${(sbCount ?? 0).toString().padStart(4)}`);
    } catch (err) {
      console.log(`❌ ${pbCol.padEnd(18)} → ERREUR: ${err.message}`);
    }
  }
  
  console.log('\n');
})();
EOF

node compare-migration.js
```

---

## 🧪 Étape 5 : Tests Applicatifs

### Test 1 : Démarrer l'application

```bash
# Lancer le serveur de dev
npm run dev

# Ouvrir http://localhost:3000
```

### Test 2 : Login avec un utilisateur migré

1. Aller sur `/login`
2. Utiliser un email/password d'un user PocketBase existant
3. ⚠️ **NOTE** : Les passwords PocketBase ne seront PAS migrés (hashage différent)
   - Solution : Reset password ou créer nouveaux comptes

### Test 3 : Dashboard élève

```
URL : /dashboard/student
Vérifier :
- ✅ Affichage du score CEREDIS
- ✅ Liste des activités
- ✅ Graphiques de progression
- ✅ Evidences de compétences
```

### Test 4 : Dashboard enseignant

```
URL : /dashboard/teacher
Vérifier :
- ✅ Liste des élèves
- ✅ Statistiques globales
- ✅ Export CSV/JSON fonctionnel
```

---

## 🐛 Dépannage

### Erreur : "Auth user not found"

**Cause** : Les `user_id` dans les tables ne correspondent pas aux UUID `auth.users`  
**Solution** : 
1. Créer les users dans `auth.users` avant d'importer les données
2. Ou utiliser un script pour synchroniser les UUID

```sql
-- Vérifier les orphelins
SELECT p.id, p.email 
FROM profiles p 
LEFT JOIN auth.users u ON p.id = u.id 
WHERE u.id IS NULL;
```

### Erreur : "Foreign key violation"

**Cause** : Données importées dans le mauvais ordre  
**Solution** : Ordre d'import DOIT être :
1. `profiles` (premier - aucune FK)
2. `evidences` (FK → profiles.user_id)
3. `activities` (FK → profiles.user_id)
4. `ceredis_scores` (FK → profiles.user_id)

### Erreur : "RLS policy violation"

**Cause** : Import fait avec `ANON_KEY` au lieu de `SERVICE_ROLE_KEY`  
**Solution** : Vérifier `.env.local` contient `SUPABASE_SERVICE_ROLE_KEY`

### Erreur : "Duplicate key"

**Cause** : Import exécuté plusieurs fois  
**Solution** :
```sql
-- Vider les tables (ATTENTION : perte de données)
TRUNCATE TABLE ceredis_scores CASCADE;
TRUNCATE TABLE activities CASCADE;
TRUNCATE TABLE evidences CASCADE;
TRUNCATE TABLE profiles CASCADE;

-- Ré-exécuter l'import
```

---

## 📚 Scripts Disponibles

| Script | Description | Durée |
|--------|-------------|-------|
| `test-pocketbase-data.js` | Comptage PocketBase | 2s |
| `export-pocketbase.js` | Export PB → JSON | 10-30s |
| `transform-data.js` | Transform JSON | 5-10s |
| `import-supabase.js` | Import JSON → Supabase | 10-60s |
| `test-schema-deployed.js` | Vérifier tables | 2s |
| `test-data-integrity.js` | Validation données | 5s |
| `compare-migration.js` | Comparaison PB ↔ SB | 5s |

---

## 🎯 Checklist Complète

### Avant migration
- [ ] Schéma Supabase déployé
- [ ] Connexion PocketBase fonctionnelle
- [ ] `.env.local` complet (URL + ANON_KEY + SERVICE_ROLE_KEY)
- [ ] Backup PocketBase créé

### Pendant migration
- [ ] Export PocketBase réussi (4 fichiers JSON)
- [ ] Transformation réussie (4 fichiers transformés)
- [ ] Import Supabase réussi (0 erreurs)

### Après migration
- [ ] Comptages matchent (PB = SB)
- [ ] Tests d'intégrité passent
- [ ] Login fonctionne
- [ ] Dashboard élève affiche les données
- [ ] Dashboard enseignant affiche les stats
- [ ] Export analytics fonctionne

---

## 🎉 Après Migration Réussie

Une fois toutes les validations passées :

1. **Mettre à jour DEVLOG.md** avec la date de migration
2. **Créer un tag Git** : `git tag migration-supabase-v1.0`
3. **Backup final** de PocketBase pour archives
4. **Décommissioner PocketBase** (optionnel, garder en lecture seule temporairement)

**🎊 FÉLICITATIONS ! Migration terminée !**
