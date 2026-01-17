# Tests d'intégration CEREDIS

Ce dossier contient des tests d'intégration pour valider la connexion CaSS et l'API Route de tracking.

## Lancer les tests

1. Démarrer le serveur Next.js :

   ```bash
   npm run dev
   ```

2. Dans un autre terminal, exécuter les tests :

   ```bash
   npx tsx tests/integration/cass.integration.test.ts
   npx tsx tests/integration/api-track.integration.test.ts
   ```

## Tests inclus

- **cass.integration.test.ts** :
  - Connexion CaSS (frameworks)
  - Création d'une assertion fictive
- **api-track.integration.test.ts** :
  - Appel API Route /api/ceredis/track avec payload fictif
  - Vérification du succès, des statements xAPI et assertions CaSS

## Pré-requis

- Les credentials CaSS doivent être valides dans `.env.local`
- Le serveur Next.js doit tourner sur http://localhost:3000
- Les dépendances doivent être installées (`npm install`)

