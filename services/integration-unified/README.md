# Service d'Intégration Unifié

Ce service combine les fonctionnalités de Phase C (PocketBase) et Next.js existant (CaSS + xAPI) en un seul service cohérent.

## 🎯 Fonctionnalités

Le service unifié gère automatiquement :

1. **PocketBase** : Création d'Evidences (Phase C)
2. **CaSS** : Création d'Assertions de compétences
3. **Ralph LRS** : Envoi de Statements xAPI
4. **Règles Domaine 5** : Application automatique des règles de cohérence

## 📦 Architecture

```
integration-unified/
├── integration.unified.ts  # Service principal
├── types.unified.ts        # Types unifiés
├── index.ts                # Point d'entrée
└── README.md               # Documentation
```

## 🚀 Utilisation

### Import

```typescript
import { 
  unifiedIntegrationService, 
  createUnifiedPayload,
  type CeredisMetadata 
} from '@/services/integration-unified';
```

### Exemple complet

```typescript
// 1. Définir la metadata CEREDIS
const ceredisMetadata: CeredisMetadata = {
  competencies: ['1.1', '2.1'],
  evidenceType: 'P1',
  domaine: 'D1',
  niveau: 'A2',
  scoreMax: 8
};

// 2. Créer le payload
const payload = createUnifiedPayload(
  'user123',              // userId
  'Marie Dupont',         // userName
  'ne17-s1-e1',          // activityId
  'Première écoute',     // activityName
  'qcm',                 // activityType
  6,                     // score obtenu
  8,                     // score maximum
  ceredisMetadata,       // metadata CEREDIS
  {
    chansonId: 'ne17',
    seanceId: 'seance-1',
    niveau: 'A2',
    duration: 120,       // secondes
  }
);

// 3. Enregistrer la complétion
const result = await unifiedIntegrationService.trackActivityCompletion(payload);

// 4. Vérifier le résultat
if (result.success) {
  console.log(`✅ Evidences créées: ${result.evidencesCreated}`);
  console.log(`✅ Assertions CaSS: ${result.cassAssertions.length}`);
  console.log(`✅ Statements xAPI: ${result.xapiStatements.length}`);
} else {
  console.error(`❌ Erreurs:`, result.errors);
}
```

## 📊 Résultat du tracking

Le service retourne un objet `UnifiedTrackingResult` :

```typescript
interface UnifiedTrackingResult {
  success: boolean;                   // true si aucune erreur
  evidencesCreated: number;           // Nombre d'Evidences PocketBase
  cassAssertions: CassAssertion[];    // Assertions CaSS créées
  xapiStatements: XApiStatement[];    // Statements xAPI envoyés
  errors: string[];                   // Erreurs éventuelles
}
```

## 🔧 Configuration

Le service nécessite les variables d'environnement suivantes :

```env
# PocketBase (Phase C)
NEXT_PUBLIC_POCKETBASE_URL=https://pocketbase-songs.ceredis.net

# CaSS (Next.js)
NEXT_PUBLIC_CASS_API_KEY=your-cass-key
NEXT_PUBLIC_CASS_API_URL=https://cass.example.com

# xAPI / Ralph LRS (Next.js)
NEXT_PUBLIC_LRS_ENDPOINT=https://ralph.ceredis.net/xapi
NEXT_PUBLIC_LRS_USERNAME=your-username
NEXT_PUBLIC_LRS_PASSWORD=your-password
```

### Modes dégradés

Le service fonctionne en mode dégradé si certaines configurations manquent :

- **Sans PocketBase** : Pas de création d'Evidences (mais CaSS + xAPI fonctionnent)
- **Sans CaSS** : Pas d'Assertions (mais PocketBase + xAPI fonctionnent)
- **Sans xAPI** : Pas de Statements (mais PocketBase + CaSS fonctionnent)

## 🎓 Règles Domaine 5

Le service applique automatiquement les règles de cohérence pour le Domaine 5 (métalinguistique) :

### Principe

Une compétence du Domaine 5 (5.1 à 5.7) ne peut être validée que si :
1. L'activité est de type "auto-réflexif" (journal, texte libre, etc.), **OU**
2. L'activité fournit une justification textuelle (≥ 20 caractères)

### Types d'activités

**Activités auto-réflexives** (valident automatiquement D5) :
- `journal_reflexif`
- `texte_libre`
- `production_ecrite`
- `qcm_justifie`
- `dissertation`

**Activités linguistiques** (valident D5 seulement avec justification) :
- `qcm_avec_justification`
- `analyse_guidee`
- `texte_a_trous` (avec justification)

**Activités simples** (ne valident PAS D5) :
- `qcm` (sans justification)
- `ordre_elements` (sans justification)
- `texte_a_trous` (sans justification)

## 🧪 Tests de connexion

Vérifier que tous les systèmes sont accessibles :

```typescript
const status = await unifiedIntegrationService.testConnections();

console.log('PocketBase:', status.pocketbase ? '✅' : '❌');
console.log('CaSS:', status.cass ? '✅' : '❌');
console.log('xAPI:', status.xapi ? '✅' : '❌');
```

## 📈 Vérifier le statut

```typescript
const status = unifiedIntegrationService.getStatus();

console.log('Configuration:', {
  pocketbase: status.pocketbase.configured,
  cass: status.cass.configured,
  xapi: status.xapi.configured
});
```

## 🔄 Migration depuis l'ancien service

### Ancien code (Next.js)

```typescript
import { integrationService } from '@/services/integration';

await integrationService.trackActivityCompletion({
  userId,
  userName,
  activityId,
  activityName,
  activityType,
  chansonId,
  seanceId,
  niveau,
  score,
  maxScore,
  duration
});
```

### Nouveau code (Unifié)

```typescript
import { unifiedIntegrationService, createUnifiedPayload } from '@/services/integration-unified';

const payload = createUnifiedPayload(
  userId,
  userName,
  activityId,
  activityName,
  activityType,
  score,
  maxScore,
  ceredisMetadata,  // NOUVEAU : metadata CEREDIS
  {
    chansonId,
    seanceId,
    niveau,
    duration
  }
);

await unifiedIntegrationService.trackActivityCompletion(payload);
```

### Différence principale

Le nouveau service **requiert** la metadata CEREDIS :

```typescript
const ceredisMetadata: CeredisMetadata = {
  competencies: ['1.1', '2.1'],  // Compétences travaillées
  evidenceType: 'P1',            // Type de preuve
  domaine: 'D1',                 // Domaine principal
  niveau: 'A2',                  // Niveau CECRL
  scoreMax: 8                    // Score maximum
};
```

## 🎯 Avantages du service unifié

1. **Un seul appel** au lieu de trois
2. **Gestion automatique** des règles Domaine 5
3. **Cohérence** garantie entre les 3 systèmes
4. **Gestion d'erreurs** robuste
5. **Mode dégradé** si un système est indisponible
6. **Types unifiés** Phase B/C + Next.js

## 📝 Notes importantes

- **Score** : Le service accepte le score brut (ex: 6/8) et calcule automatiquement le pourcentage
- **Durée** : Optionnelle, en secondes
- **Metadata** : Peut contenir des données additionnelles qui seront stockées dans PocketBase
- **Compétences** : Format CEREDIS standard ('1.1', '2.2', etc.)

## 🐛 Debugging

Activer les logs détaillés :

```typescript
// Le service log automatiquement :
// - [UnifiedIntegration] au début
// - ✅ pour les succès
// - ❌ pour les erreurs
// - 📊 pour les résumés
```

## 🚀 Prochaines étapes

1. Mettre à jour les composants d'activités
2. Créer le hook `useActivityTracking`
3. Migrer les séances existantes
4. Tests E2E
