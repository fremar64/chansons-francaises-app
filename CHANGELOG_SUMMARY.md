# Changelog (Résumé)

Date: 2026-01-26

Principales modifications incluses dans la mise à jour fusionnée depuis
`feature/ceredis-engine-integration` → `main` :

- Authentification
  - Correction de l'intégration PocketBase : `AuthContext` mis à jour,
    récupération complète du profil utilisateur après `register` / `login` / `refresh`.
  - Remplacement de la protection serveur (NextAuth/proxy) par une protection
    client-side via `ProtectedRoute` (évite les redirections SSR incorrectes).
  - Scripts d'administration PocketBase ajoutés : mise à jour du schéma,
    correction de l'utilisateur admin, tests de login.

- Documentation
  - Ajout de fichiers explicatifs et guides : `RESOLUTION_AUTHENTIFICATION.md`,
    `SOLUTION_AUTHENTIFICATION.md`, `GUIDE_RESOLUTION_AUTH.md`, `DASHBOARD_COMPLET_RECAP.md`.

- Dashboard & UI
  - Ajout / amélioration des composants dashboard : RadarCompetences,
    HistoriqueActivites, ProgressionGlobale, ScoreCard, DomainRadar.
  - Hook `useDashboard` et `useCeredisScore` pour calcul des statistiques et score CEREDIS.

- Backend & Services
  - Intégration partielle du moteur CEREDIS (services/ceredis-calculator/engine).
  - API routes pour calculs CEREDIS et tracking.

- Tests & CI
  - Tests unitaires et d'intégration ajoutés (Vitest, Playwright + e2e)
  - Workflow CI ajouté: `.github/workflows/ci.yml`

Notes:
- Voir les fichiers de documentation pour les détails, procédures et scripts.
- Si vous déployez, vérifiez les variables d'environnement PocketBase / CaSS / xAPI
  et exécutez les scripts `scripts/pb-update-users-schema.ts` et
  `scripts/pb-fix-admin-user.ts` si nécessaire.

-- équipe dev
