# 🚀 GUIDE SETUP SUPABASE - Démarrage Rapide

**À faire EN PARALLÈLE pendant la migration du code**

---

## 1. Déployer Supabase sur Coolify (15 minutes)

### Accéder à Coolify
```
URL: https://coolify.ceredis.net
Login: [vos credentials]
```

### Créer nouveau projet
1. Cliquer **"New Resource"**
2. Sélectionner **"Supabase"**
3. Configuration :
   - **Name**: `enaa-supabase`
   - **Domain**: `enaa-supabase.ceredis.net`
   - **PostgreSQL version**: 15
   - **Port**: 5432

4. Cliquer **"Deploy"**
5. Attendre ~5 minutes

### Récupérer les credentials
Une fois déployé :
1. Aller dans **Settings** → **Environment Variables**
2. Noter :
   ```
   SUPABASE_URL=https://enaa-supabase.ceredis.net
   SUPABASE_ANON_KEY=[copier la clé]
   SUPABASE_SERVICE_ROLE_KEY=[copier la clé]
   ```

---

## 2. Configurer le schéma PostgreSQL (5 minutes)

### Accéder à Supabase Studio
```
URL: https://enaa-supabase.ceredis.net
Login: avec vos credentials Coolify
```

### Exécuter le schéma
1. Aller dans **SQL Editor**
2. Ouvrir le fichier `dossier-migration/SUPABASE_SCHEMA.sql`
3. **Copier TOUT le contenu**
4. **Coller** dans l'éditeur SQL
5. Cliquer **"Run"**
6. Vérifier que tout est vert ✅

### Vérifier les tables
1. Aller dans **Table Editor**
2. Vérifier que ces tables existent :
   - ✅ evidences
   - ✅ activities  
   - ✅ ceredis_scores

---

## 3. Configurer les variables d'environnement (2 minutes)

### Dans le projet
Créer `.env.local` :
```bash
cd /home/ceredis/chansons-francaises-app
cp .env.migration.example .env.local
```

Éditer `.env.local` et remplacer :
```env
NEXT_PUBLIC_SUPABASE_URL=https://enaa-supabase.ceredis.net
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... [votre clé]
SUPABASE_SERVICE_ROLE_KEY=eyJ... [votre clé]
```

---

## 4. Tester la connexion (2 minutes)

```bash
# Test rapide connexion
cd /home/ceredis/chansons-francaises-app
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
supabase.from('evidences').select('count').then(r => 
  console.log('✅ Connexion OK:', r)
);
"
```

Si vous voyez `✅ Connexion OK:`, c'est bon !

---

## 5. Backup PocketBase (IMPORTANT - 5 minutes)

```bash
# Exécuter le script de backup
cd /home/ceredis/chansons-francaises-app
node scripts/migration/export-pocketbase.js

# Vérifier
ls -lh exports/
# Vous devriez voir: evidences.json, activities.json, etc.
```

---

## ✅ CHECKLIST SETUP

- [ ] Supabase déployé sur Coolify
- [ ] Credentials récupérés
- [ ] SUPABASE_SCHEMA.sql exécuté
- [ ] Tables créées et visibles
- [ ] .env.local configuré
- [ ] Test connexion OK
- [ ] Backup PocketBase fait

**Temps total : ~30 minutes**

Une fois tout coché, la migration du code peut utiliser Supabase ! 🎉
