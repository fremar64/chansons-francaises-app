# 🚀 MIGRATION POCKETBASE → SUPABASE

**Date préparation** : 1er février 2026  
**Date début migration** : Lundi 3 février 2026, 9h00  
**Date fin** : Vendredi 7 février 2026, 17h00  
**Status** : ✅ INFRASTRUCTURE PRÊTE

---

## 📋 ÉTAT DES LIEUX

### Inventaire code PocketBase
- **94 fichiers** contiennent du code PocketBase
- **~40 fichiers sources** principaux à migrer :
  - 4 API routes
  - 4 pages
  - 6 composants + hooks
  - 2 services d'intégration
  - 15 scripts maintenance
  - 5 fichiers de données

### Infrastructure préparée
- ✅ Clients Supabase créés (`lib/supabase/`)
- ✅ Scripts migration prêts (`scripts/migration/`)
- ✅ Types PostgreSQL définis
- ✅ Variables environnement configurées
- ✅ Documentation complète (`dossier-migration/`)

---

## 🗂️ STRUCTURE MIGRATION

```
chansons-francaises-app/
├── dossier-migration/              # Documentation complète
│   ├── MIGRATION_MASTER_PLAN.md   # Plan 5 jours détaillé
│   ├── COPILOT_PROMPTS.md         # 8 prompts spécialisés
│   ├── README_MIGRATION_SUPABASE.md
│   └── SUPABASE_SCHEMA.sql        # Schéma PostgreSQL complet
│
├── lib/supabase/                   # Clients Supabase
│   ├── client.ts                   # Browser client
│   ├── server.ts                   # Server client
│   └── types.ts                    # Types Database
│
├── scripts/migration/              # Scripts migration données
│   ├── export-pocketbase.js        # Export PB → exports/*.json
│   ├── transform-data.js           # Transform → transformed/*.json
│   └── import-supabase.js          # Import → Supabase PostgreSQL
│
└── migration-inventory.txt         # Liste complète fichiers PB
```

---

## 📅 PLANNING MIGRATION

### JOUR 1 - Lundi 3 février : FONDATIONS
**9h00-12h00** : Setup infrastructure
- Déployer Supabase sur Coolify
- Exécuter SUPABASE_SCHEMA.sql
- Backup complet PocketBase
- Configurer credentials

**14h00-18h00** : Clients & Tests
- Tester connexion clients
- Valider types TypeScript
- Tests basiques CRUD

**LIVRABLE J1** : Infrastructure Supabase opérationnelle

---

### JOUR 2 - Mardi 4 février : SÉCURITÉ & STORAGE
**9h00-12h00** : Row Level Security
- Activer RLS sur tables
- Créer policies evidences
- Créer policies activities
- Tests RLS

**14h00-18h00** : Storage
- Créer buckets (chansons-audio, chansons-covers)
- Configurer policies storage
- Migrer fichiers PB → Supabase Storage

**LIVRABLE J2** : RLS + Storage configurés

---

### JOUR 3 - Mercredi 5 février : MIGRATION CODE (PARALLÈLE)
**Stratégie** : 5 développeurs en parallèle, 1 couche chacun

**DEV 1** : API Routes (8h)
- `app/api/ceredis/calculate/route.ts`
- `app/api/evidences/route.ts`
- `app/api/analytics/**/*.ts`
- Utiliser **COPILOT PROMPT 1**

**DEV 2** : Service Unifié (8h)  
- `services/integration-unified/integration.unified.ts`
- ⚠️ NE PAS toucher CaSS/xAPI
- Utiliser **COPILOT PROMPT 2**

**DEV 3** : Hooks React (8h)
- `hooks/useActivityTracking.ts`
- `hooks/useCeredisScore.ts`
- `lib/ceredis/hooks.ts`
- Utiliser **COPILOT PROMPT 3**

**DEV 4** : Composants (8h)
- `components/dashboard/**/*.tsx`
- `app/**/page.tsx`
- Utiliser **COPILOT PROMPT 4**

**DEV 5** : Auth (8h)
- `lib/auth/`
- `middleware.ts`
- Pages login/register
- Utiliser **COPILOT PROMPT 5**

**17h00** : Review collectif  
**LIVRABLE J3** : Code compile sans erreurs

---

### JOUR 4 - Jeudi 6 février : DONNÉES & TESTS
**9h00-13h00** : Migration données réelles
```bash
# 1. Backup final PocketBase
tar -czf pb-backup-final.tar.gz /pocketbase/pb_data

# 2. Export
node scripts/migration/export-pocketbase.js

# 3. Transform
node scripts/migration/transform-data.js

# 4. Import
SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/migration/import-supabase.js

# 5. Validation
# Vérifier counts, sample data
```

**14h00-18h00** : Tests intégration
- Tests tracking activités
- Tests calcul CEREDIS
- Tests dashboard
- Tests E2E critiques

**LIVRABLE J4** : Données migrées + Tests passent

---

### JOUR 5 - Vendredi 7 février : DÉPLOIEMENT
**9h00-12h00** : Tests E2E complets
- Parcours élève complet
- Tests performance
- Tests concurrence

**14h00-16h00** : Déploiement staging
- Deploy Vercel staging
- Tests sur staging
- Fix bugs finaux

**16h00-17h00** : Documentation
- Rapport migration
- Guide rollback
- Changelog

**17h00** : 🎉 **CÉLÉBRATION**

**LIVRABLE J5** : Application en staging + Documentation complète

---

## 🛠️ UTILISATION GITHUB COPILOT

### Configuration
Votre plan GitHub Copilot Premium inclut :
- **GPT-5.2 Codex** - Génération code rapide
- **Claude Opus 4.5** - Compréhension contexte
- **Gemini 3 PRO** - Transformations complexes

### Workflow
1. **Ouvrir fichier** à migrer
2. **Sélectionner code** PocketBase
3. **Cmd/Ctrl + I** (Copilot inline chat)
4. **Coller prompt** depuis `dossier-migration/COPILOT_PROMPTS.md`
5. **Copilot génère** le code migré
6. **Review et ajuster**
7. **Tester** : `npm run type-check && npm run test`
8. **Commit**

### Exemple transformation

**AVANT** (PocketBase) :
```typescript
import PocketBase from 'pocketbase';
const pb = new PocketBase(url);

const evidences = await pb.collection('evidences').getFullList({
  filter: `user = "${userId}"`,
  sort: '-created'
});
```

**APRÈS** (Supabase) :
```typescript
import { createClient } from '@/lib/supabase/server';
const supabase = createClient();

const { data: evidences, error } = await supabase
  .from('evidences')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

if (error) throw error;
```

---

## 🔧 SCRIPTS MIGRATION

### 1. Export PocketBase
```bash
node scripts/migration/export-pocketbase.js
# Résultat : exports/evidences.json, exports/activities.json, etc.
```

### 2. Transform données
```bash
node scripts/migration/transform-data.js
# Transforme : camelCase → snake_case
# Résultat : transformed/evidences.json, etc.
```

### 3. Import Supabase
```bash
SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/migration/import-supabase.js
# Importe vers PostgreSQL
# Vérifie counts automatiquement
```

---

## ✅ CHECKLIST PRÉ-MIGRATION

Avant de commencer lundi :

### Infrastructure
- [ ] Instance Supabase déployée sur Coolify
- [ ] URL Supabase accessible
- [ ] Credentials récupérés (anon key + service role key)
- [ ] Variables env configurées

### Backup
- [ ] Backup complet PocketBase effectué
- [ ] Export données test réalisé
- [ ] Snapshot Vercel actuel créé

### Équipe
- [ ] 3-5 développeurs disponibles
- [ ] GitHub Copilot Premium activé
- [ ] Documentation lue par tous
- [ ] Rôles assignés

---

## 🚨 AIDE & SUPPORT

### Documentation
- **Plan complet** : `dossier-migration/MIGRATION_MASTER_PLAN.md`
- **Prompts Copilot** : `dossier-migration/COPILOT_PROMPTS.md`
- **Guide utilisateur** : `dossier-migration/README_MIGRATION_SUPABASE.md`
- **Schéma SQL** : `dossier-migration/SUPABASE_SCHEMA.sql`

### Ressources Supabase
- Guide officiel : https://supabase.com/docs
- API Reference : https://supabase.com/docs/reference/javascript
- RLS Guide : https://supabase.com/docs/guides/auth/row-level-security
- Next.js exemple : https://github.com/supabase/supabase/tree/master/examples/auth/nextjs

### En cas de problème
1. Consulter `COPILOT_PROMPTS.md` pour le prompt approprié
2. Vérifier `migration-inventory.txt` pour liste complète fichiers
3. Tester avec petit batch de données d'abord
4. Utiliser GitHub Copilot pour débogage

---

## 🎯 CRITÈRES DE SUCCÈS

### Technique
- [ ] Application fonctionne sur Supabase
- [ ] Toutes données migrées (100%)
- [ ] Aucune perte de données
- [ ] Tests passent (100%)
- [ ] Performance ≥ PocketBase

### Business
- [ ] Prêt pour pilote avril (100 élèves)
- [ ] Prêt pour scale septembre (300k)
- [ ] Analytics natifs disponibles
- [ ] Rollback plan documenté

---

## 📊 MÉTRIQUES

### Préparation (1er février)
- ✅ 11 packages Supabase installés
- ✅ 3 fichiers clients créés
- ✅ 3 scripts migration créés
- ✅ 94 fichiers inventoriés
- ✅ Documentation complète

### À venir (3-7 février)
- [ ] ~40 fichiers sources migrés
- [ ] ~1000 evidences transférées
- [ ] ~500 activities transférées
- [ ] ~50 users migrés
- [ ] 211 tests toujours au vert

---

**Status** : ✅ **PRÊT POUR LUNDI 3 FÉVRIER 9H00**

**LET'S GO !** 🚀
