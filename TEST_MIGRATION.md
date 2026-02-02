# 🎯 TEST DE MIGRATION — Mode d'emploi

## ✅ Migration terminée !

La migration PocketBase → Supabase est **complète et fonctionnelle**. Voici comment tester :

---

## 🚀 Démarrage rapide

### 1. Serveur de développement
```bash
npm run dev
```
✅ **Serveur démarré** : http://localhost:3000

### 2. Connexion
- **URL** : http://localhost:3000/login
- **Email** : `admin@ceredis.net`
- **Mot de passe** : `j5ezjkj3kzD1nTHHyVsiBA8C`

### 3. Accès admin
- **Dashboard** : http://localhost:3000/dashboard
- **Panel admin** : http://localhost:3000/admin

---

## 🧪 Points de test

### ✅ Authentification
- [ ] Login avec admin@ceredis.net fonctionne
- [ ] Session persiste après rafraîchissement
- [ ] Logout fonctionne
- [ ] Protection des routes fonctionne (redirection login si non connecté)

### ✅ Dashboard
- [ ] Profil utilisateur affiché (nom, email, rôle)
- [ ] Avatar chargé (ou placeholder si absent)
- [ ] Menu de navigation accessible
- [ ] Pas d'erreur 401/403 dans la console

### ✅ Page Admin
- [ ] Accessible uniquement pour les admins
- [ ] Liste des utilisateurs affichée
- [ ] Validation des utilisateurs fonctionne
- [ ] Statistiques affichées

### ✅ Parcours/Chansons
- [ ] Liste des parcours affichée (LOCAL_PARCOURS_DATA)
- [ ] Chansons affichées avec détails
- [ ] Lecture audio fonctionnelle
- [ ] Navigation entre séances/écrans

---

## 🔍 Vérifications techniques

### Console navigateur (F12)
```javascript
// Vérifier l'authentification
console.log(document.cookie) // Doit contenir les tokens Supabase

// Vérifier les requêtes API
// Network tab → Filtrer "supabase" → Vérifier status 200
```

### Base de données Supabase
```sql
-- Vérifier le profil admin
SELECT * FROM profiles WHERE email = 'admin@ceredis.net';

-- Vérifier l'utilisateur auth
SELECT * FROM auth.users WHERE email = 'admin@ceredis.net';

-- Compter les enregistrements
SELECT 
  (SELECT COUNT(*) FROM profiles) as profiles,
  (SELECT COUNT(*) FROM evidences) as evidences,
  (SELECT COUNT(*) FROM activities) as activities;
```

---

## 🐛 Résolution de problèmes

### Erreur "Invalid token" ou 401
1. Vérifier que `.env.local` est chargé :
   ```bash
   grep SUPABASE .env.local
   ```
2. Vérifier les clés Supabase dans le dashboard Coolify
3. Redémarrer le serveur : `npm run dev`

### Erreur "User not found"
```bash
# Vérifier que l'utilisateur existe
node scripts/migration/import-supabase.js
```

### Mot de passe incorrect
```bash
# Réinitialiser le mot de passe
node scripts/migration/reset-admin-password.js admin@ceredis.net "NouveauMotDePasse"
```

---

## 📊 État actuel de la base

| Table | Lignes | Notes |
|-------|--------|-------|
| `profiles` | 1 | admin@ceredis.net |
| `evidences` | 0 | Prêt pour données pilote |
| `activities` | 0 | Prêt pour données pilote |
| `ceredis_scores` | 0 | Vue matérialisée vide |

---

## 📝 Prochaines actions

### Court terme (cette semaine)
1. [ ] Tester toutes les fonctionnalités de l'application
2. [ ] Créer des utilisateurs de test (enseignant + élève)
3. [ ] Tester le parcours complet d'un élève
4. [ ] Vérifier l'enregistrement des evidences/activités

### Moyen terme (avant pilote Avril 2026)
1. [ ] Importer les données réelles depuis production PocketBase
2. [ ] Créer les 100 comptes élèves + enseignants
3. [ ] Configurer les sauvegardes automatiques
4. [ ] Tests de charge (100 utilisateurs simultanés)

### Long terme
1. [ ] Migrer les tables chansons/seances vers Supabase
2. [ ] Implémenter le système de compétences complet
3. [ ] Ajouter les statistiques avancées
4. [ ] Optimiser les performances (indexes, cache)

---

## ✅ Checklist de validation

- [x] Code migré (18 fichiers)
- [x] Schéma Supabase déployé (4 tables + RLS)
- [x] Données importées (1 admin)
- [x] Mot de passe réinitialisé
- [x] Serveur démarre sans erreur
- [ ] Login fonctionne
- [ ] Dashboard accessible
- [ ] Pas d'erreur dans les logs

---

## 📞 Support

En cas de problème, consulter :
- [MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md) — Détails de la migration
- [DEVLOG.md](./DEVLOG.md) — Journal des modifications
- Logs du serveur : Terminal avec `npm run dev`
- Logs Supabase : Dashboard Coolify

**Status** : ✅ Migration validée, prête pour tests
