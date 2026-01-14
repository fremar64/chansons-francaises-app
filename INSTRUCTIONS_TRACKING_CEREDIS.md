# 🎯 INSTRUCTIONS : AJOUT DU TRACKING CEREDIS AUX COMPOSANTS

## 📍 CONTEXTE

Vous intégrez les écrans CEREDIS dans la page de séance. Actuellement :
- ✅ **QuizQCM**, **TexteATrous**, **JournalReflexif**, **OrdreElements** ont déjà le tracking CEREDIS
- ❌ **TexteLibre**, **EcouteChanson**, **EcranIntroduction** n'ont PAS le tracking CEREDIS

**Objectif** : Ajouter le tracking CEREDIS aux 3 composants manquants pour avoir un système cohérent.

---

## 🏗️ ARCHITECTURE DU TRACKING CEREDIS

### Service d'intégration

Le service `integration-unified.ts` gère automatiquement :
- Envoi des statements xAPI vers le LRS Ralph
- Création des assertions CaSS (compétences)
- Application de la règle de cohérence Domaine 5 (métalinguistique)

### Deux méthodes principales

```typescript
// 1. Track le début d'une activité
await integrationService.trackActivityStart({
  userId,
  userName,
  activityId,
  activityName,
  activityType,
  chansonId,
  seanceId,
  niveau,
});

// 2. Track la complétion d'une activité
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
  duration,
  response, // Important pour les activités réflexives (Domaine 5)
});
```

### Interface ActivityMetadata

Tous les composants CEREDIS reçoivent cette prop :

```typescript
interface ActivityMetadata {
  activityId: string;
  activityName: string;
  chansonId: string;
  seanceId: string;
  ceredis: {
    competences: string[];
    typePreuve: 'P1' | 'P2' | 'P3' | 'P4';
    domaine: CeredisDomaineId;
    niveau: NiveauCECRL;
  };
}
```

---

## 📚 MODÈLE DE RÉFÉRENCE : JournalReflexif.tsx

Ce composant a **déjà** le tracking CEREDIS complet. Utilisez-le comme modèle !

**Emplacement** : `components/parcours/activities/JournalReflexif.tsx`

### Structure du tracking dans JournalReflexif

```typescript
import { integrationService } from '@/services/integration-unified/integration.unified';

interface JournalReflexifProps {
  exercice: { /* ... */ };
  metadata: ActivityMetadata;
  userId: string;
  userName: string;
  onComplete: (data: { reponse: string; score: number }) => void;
}

export function JournalReflexif({ exercice, metadata, userId, userName, onComplete }: JournalReflexifProps) {
  const startTimeRef = useRef<number>(Date.now());

  // 1. Track START au montage du composant
  useEffect(() => {
    integrationService.trackActivityStart({
      userId,
      userName,
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'journal_reflexif',
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.ceredis.niveau,
    });
  }, []);

  // 2. Track COMPLETION quand l'utilisateur soumet
  const handleSubmit = async () => {
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    const score = /* calcul du score */;
    const maxScore = /* score maximum */;

    await integrationService.trackActivityCompletion({
      userId,
      userName,
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'journal_reflexif',
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.ceredis.niveau,
      score,
      maxScore,
      duration,
      response: reponse, // ⚠️ IMPORTANT pour Domaine 5
    });

    onComplete({ reponse, score });
  };

  return (/* ... UI ... */);
}
```

---

## 🔧 COMPOSANT 1 : TexteLibre.tsx

### État actuel

**Emplacement** : `components/parcours/activities/TexteLibre.tsx`

**Props actuelles** :
```typescript
interface TexteLibreProps {
  exercice: {
    id: string;
    consigne: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
  };
  onComplete: (reponse: string) => void;
}
```

### Modifications à apporter

#### 1. Mettre à jour l'interface

```typescript
interface TexteLibreProps {
  exercice: {
    id: string;
    consigne: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
  };
  metadata: ActivityMetadata;      // ✅ AJOUTER
  userId: string;                   // ✅ AJOUTER
  userName: string;                 // ✅ AJOUTER
  onComplete: (reponse: string) => void;
}
```

#### 2. Ajouter l'import

```typescript
import { integrationService } from '@/services/integration-unified/integration.unified';
import type { ActivityMetadata } from '@/services/integration-unified/types';
```

#### 3. Ajouter le tracking START

```typescript
export function TexteLibre({ exercice, metadata, userId, userName, onComplete }: TexteLibreProps) {
  const [reponse, setReponse] = useState('');
  const startTimeRef = useRef<number>(Date.now());

  // Track START au montage
  useEffect(() => {
    integrationService.trackActivityStart({
      userId,
      userName,
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'texte_libre',
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.ceredis.niveau,
    });
  }, [metadata, userId, userName]);

  // ... reste du composant
}
```

#### 4. Ajouter le tracking COMPLETION

```typescript
const handleSubmit = async () => {
  const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
  const wordCount = reponse.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  // Score basé sur longueur minimale (si définie)
  let score = 10;
  let maxScore = 10;
  
  if (exercice.minLength && wordCount < exercice.minLength) {
    score = Math.round((wordCount / exercice.minLength) * 10);
  }

  // Track la complétion
  await integrationService.trackActivityCompletion({
    userId,
    userName,
    activityId: metadata.activityId,
    activityName: metadata.activityName,
    activityType: 'texte_libre',
    chansonId: metadata.chansonId,
    seanceId: metadata.seanceId,
    niveau: metadata.ceredis.niveau,
    score,
    maxScore,
    duration,
    response: reponse, // ⚠️ IMPORTANT : preuve réflexive pour Domaine 5
  });

  onComplete(reponse);
};
```

### Type d'activité

**activityType** : `'texte_libre'`

Ce type est déjà mappé dans `MAPPING_ACTIVITES_COMPETENCES` (services/integration/types.ts) vers des compétences de production écrite.

---

## 🔧 COMPOSANT 2 : EcouteChanson.tsx

### État actuel

**Emplacement** : `components/parcours/activities/EcouteChanson.tsx`

**Props actuelles** : Probablement quelque chose comme :
```typescript
interface EcouteProps {
  chanson: {
    titre: string;
    artiste: string;
    audioUrl: string;
    paroles?: string;
  };
  onComplete: () => void;
}
```

### Modifications à apporter

#### 1. Mettre à jour l'interface

```typescript
interface EcouteProps {
  chanson: {
    titre: string;
    artiste: string;
    audioUrl: string;
    paroles?: string;
  };
  metadata: ActivityMetadata;      // ✅ AJOUTER
  userId: string;                   // ✅ AJOUTER
  userName: string;                 // ✅ AJOUTER
  onComplete: () => void;
}
```

#### 2. Ajouter les imports

```typescript
import { integrationService } from '@/services/integration-unified/integration.unified';
import type { ActivityMetadata } from '@/services/integration-unified/types';
```

#### 3. Ajouter le tracking START

```typescript
export function EcouteChanson({ chanson, metadata, userId, userName, onComplete }: EcouteProps) {
  const startTimeRef = useRef<number>(Date.now());

  // Track START au montage
  useEffect(() => {
    integrationService.trackActivityStart({
      userId,
      userName,
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'ecoute_chanson',
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.ceredis.niveau,
    });
  }, [metadata, userId, userName]);

  // ... reste du composant
}
```

#### 4. Ajouter le tracking COMPLETION

```typescript
const handleContinue = async () => {
  const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

  // Activité non notée (engagement, P1)
  await integrationService.trackActivityCompletion({
    userId,
    userName,
    activityId: metadata.activityId,
    activityName: metadata.activityName,
    activityType: 'ecoute_chanson',
    chansonId: metadata.chansonId,
    seanceId: metadata.seanceId,
    niveau: metadata.ceredis.niveau,
    score: 0,      // Non noté
    maxScore: 0,   // Non noté
    duration,
  });

  onComplete();
};
```

### Type d'activité

**activityType** : `'ecoute_chanson'`

⚠️ **IMPORTANT** : Ce type n'existe peut-être pas encore dans le mapping. 

**Si vous obtenez une erreur**, ajoutez-le dans `services/integration/types.ts` :

```typescript
export const MAPPING_ACTIVITES_COMPETENCES: Record<string, string[]> = {
  // ... mappings existants
  
  // Ajouter ce mapping :
  'ecoute_chanson': ['1.1', '1.2'], // Compréhension orale
};
```

---

## 🔧 COMPOSANT 3 : EcranIntroduction.tsx

### État actuel

**Emplacement** : `components/parcours/activities/EcranIntroduction.tsx`

**Props actuelles** : Probablement :
```typescript
interface IntroductionProps {
  titre: string;
  description: string;
  objectifs?: string[];
  onCommencer: () => void;
}
```

### Modifications à apporter

#### 1. Mettre à jour l'interface

```typescript
interface IntroductionProps {
  titre: string;
  description: string;
  objectifs?: string[];
  metadata: ActivityMetadata;      // ✅ AJOUTER
  userId: string;                   // ✅ AJOUTER
  userName: string;                 // ✅ AJOUTER
  onCommencer: () => void;
}
```

#### 2. Ajouter les imports

```typescript
import { integrationService } from '@/services/integration-unified/integration.unified';
import type { ActivityMetadata } from '@/services/integration-unified/types';
```

#### 3. Ajouter le tracking START

```typescript
export function EcranIntroduction({ titre, description, objectifs, metadata, userId, userName, onCommencer }: IntroductionProps) {
  const startTimeRef = useRef<number>(Date.now());

  // Track START au montage
  useEffect(() => {
    integrationService.trackActivityStart({
      userId,
      userName,
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'introduction',
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.ceredis.niveau,
    });
  }, [metadata, userId, userName]);

  // ... reste du composant
}
```

#### 4. Ajouter le tracking COMPLETION

```typescript
const handleCommencer = async () => {
  const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

  // Activité non notée (engagement, P4)
  await integrationService.trackActivityCompletion({
    userId,
    userName,
    activityId: metadata.activityId,
    activityName: metadata.activityName,
    activityType: 'introduction',
    chansonId: metadata.chansonId,
    seanceId: metadata.seanceId,
    niveau: metadata.ceredis.niveau,
    score: 0,      // Non noté
    maxScore: 0,   // Non noté
    duration,
  });

  onCommencer();
};
```

### Type d'activité

**activityType** : `'introduction'`

⚠️ **IMPORTANT** : Ce type n'existe peut-être pas encore dans le mapping.

**Si vous obtenez une erreur**, ajoutez-le dans `services/integration/types.ts` :

```typescript
export const MAPPING_ACTIVITES_COMPETENCES: Record<string, string[]> = {
  // ... mappings existants
  
  // Ajouter ce mapping :
  'introduction': [], // Pas de compétences spécifiques, juste engagement (P4)
};
```

---

## ✅ CHECKLIST DE VALIDATION

Après avoir modifié les 3 composants :

### Pour chaque composant

- [ ] Interface mise à jour avec `metadata`, `userId`, `userName`
- [ ] Import de `integrationService` ajouté
- [ ] Import de `ActivityMetadata` ajouté
- [ ] `useRef` pour `startTimeRef` créé
- [ ] `useEffect` pour `trackActivityStart` au montage
- [ ] `trackActivityCompletion` appelé avant `onComplete`
- [ ] Calcul de `duration` correct
- [ ] `score` et `maxScore` appropriés
- [ ] `response` inclus pour activités avec texte (TexteLibre)

### Compilation

```bash
npm run build
```

- [ ] Aucune erreur TypeScript
- [ ] Les 3 composants compilent sans erreur

### Types d'activités

Vérifier dans `services/integration/types.ts` :

- [ ] `'texte_libre'` existe dans `MAPPING_ACTIVITES_COMPETENCES`
- [ ] `'ecoute_chanson'` existe (ou l'ajouter)
- [ ] `'introduction'` existe (ou l'ajouter)

---

## 🧪 TESTS À EFFECTUER

### Test 1 : TexteLibre

1. Lancer `npm run dev`
2. Naviguer vers une séance avec un écran TexteLibre
3. Remplir le champ texte
4. Soumettre
5. Vérifier dans la console :
   ```
   [Integration] ✅ Résultat: { xapiStatements: 2, cassAssertions: X, errors: 0 }
   ```

### Test 2 : EcouteChanson

1. Naviguer vers une séance avec écoute
2. Écouter (ou pas)
3. Cliquer sur "Continuer"
4. Vérifier le tracking dans la console

### Test 3 : EcranIntroduction

1. Naviguer vers une séance (écran 1 = introduction)
2. Lire l'introduction
3. Cliquer sur "Commencer"
4. Vérifier le tracking dans la console

### Test 4 : Dashboard enseignant

Si vous avez un dashboard enseignant :
1. Vérifier que les nouvelles activités apparaissent
2. Vérifier que les compétences sont bien trackées
3. Vérifier les statistiques

---

## 📦 MAPPINGS À AJOUTER (si nécessaire)

Si les types d'activités `ecoute_chanson` et `introduction` n'existent pas encore, ajoutez-les dans `services/integration/types.ts` :

### Emplacement

Fichier : `services/integration/types.ts`

Constante : `MAPPING_ACTIVITES_COMPETENCES`

### Code à ajouter

```typescript
export const MAPPING_ACTIVITES_COMPETENCES: Record<string, string[]> = {
  // ... mappings existants (qcm, texte_trous, etc.)
  
  // ✅ AJOUTER CES LIGNES :
  
  // Écoute active (compréhension orale)
  'ecoute_chanson': ['1.1', '1.2'],
  
  // Introduction de séance (engagement, P4)
  'introduction': [],
  
  // Production écrite libre
  'texte_libre': ['3.1', '3.2', '3.3'],
};
```

---

## 🎯 RÉSUMÉ

### Objectif

Ajouter le tracking CEREDIS complet aux 3 composants :
1. **TexteLibre** : Production écrite
2. **EcouteChanson** : Compréhension orale
3. **EcranIntroduction** : Engagement

### Modèle

Utilisez **JournalReflexif.tsx** comme référence.

### Pattern commun

1. Ajouter les props : `metadata`, `userId`, `userName`
2. Importer `integrationService`
3. Créer `startTimeRef` avec `useRef`
4. `trackActivityStart` dans `useEffect` au montage
5. `trackActivityCompletion` avant `onComplete`

### Compilation

Après chaque composant, testez avec `npm run build`.

### Tests

Testez chaque composant dans l'application avec `npm run dev`.

---

## 📞 SI VOUS RENCONTREZ DES PROBLÈMES

### Erreur : "Cannot find name 'ActivityMetadata'"

**Solution** : Ajoutez l'import
```typescript
import type { ActivityMetadata } from '@/services/integration-unified/types';
```

### Erreur : "Type '...' is not assignable to type 'ActivityCompletionData'"

**Solution** : Vérifiez que tous les champs requis sont présents :
- userId, userName, activityId, activityName, activityType
- chansonId, seanceId, niveau
- score, maxScore, duration

### Erreur : "Aucune compétence mappée pour [activityType]"

**Solution** : Ajoutez le type d'activité dans `MAPPING_ACTIVITES_COMPETENCES`

---

## ✅ SUCCÈS

Une fois les 3 composants modifiés et la compilation réussie, vous aurez :

✅ Un système de tracking CEREDIS complet et cohérent  
✅ Tous les écrans trackés (introduction, écoute, exercices, production)  
✅ Données xAPI envoyées au LRS  
✅ Assertions CaSS créées pour les compétences  
✅ Règle de cohérence Domaine 5 appliquée automatiquement  

**Vous pourrez alors intégrer ces composants dans la page de séance avec confiance !**

---

**BON COURAGE !** 🚀
