# TEMPLATE POUR COMPOSANTS RESTANTS

Ce fichier contient les templates à suivre pour compléter les 3 composants restants.

---

## 1. TexteATrous.tsx

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { /* imports existants */ } from 'lucide-react';
import { /* imports UI existants */ } from '@/components/ui/...';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface TexteATrousData {
  // Types existants
}

interface TexteATrousProps {
  exercice: TexteATrousData;
  
  // NOUVEAU : Metadata CEREDIS
  metadata: {
    activityId: string;
    activityName: string;
    chansonId: string;
    seanceId: string;
    ceredis: CeredisMetadata;
    niveau: NiveauCECRL;
  };
  
  // NOUVEAU : User info
  userId: string;
  userName: string;
  
  onComplete: (score: number) => void;
  debug?: boolean;
}

export function TexteATrous({ 
  exercice, 
  metadata,     // NOUVEAU
  userId,       // NOUVEAU
  userName,     // NOUVEAU
  onComplete,
  debug = false // NOUVEAU
}: TexteATrousProps) {
  // États existants
  const [/* ... */] = useState(/* ... */);
  
  // NOUVEAU : Timer
  const startTimeRef = useRef<number>(Date.now());
  
  // NOUVEAU : Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });

  // NOUVEAU : Initialiser timer
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Logique existante...

  const handleSubmit = async () => {
    // Calcul du score existant
    const score = /* calcul existant */;
    const maxScore = metadata.ceredis.scoreMax;
    
    // NOUVEAU : Calcul durée
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    if (debug) {
      console.log('[TexteATrous] 📝 Soumission:', { score, maxScore, duration });
    }

    // NOUVEAU : Tracker l'activité
    await trackActivity({
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'texte_a_trous',
      score: score,
      maxScore: maxScore,
      ceredis: metadata.ceredis,
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.niveau,
      duration,
      metadata: {
        totalWords: exercice.motsCaches.length,
        correctWords: score,
        // Autres metadata pertinentes
      },
    });

    onComplete(score);
  };

  return (
    <Card>
      {/* UI existante */}
      
      <Button 
        onClick={handleSubmit}
        disabled={isTracking} // NOUVEAU : désactiver pendant tracking
      >
        {isTracking ? 'Enregistrement...' : 'Valider'}
      </Button>
    </Card>
  );
}
```

---

## 2. OrdreElements.tsx

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { /* imports existants */ } from 'lucide-react';
import { /* imports UI existants */ } from '@/components/ui/...';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface OrdreElementsData {
  // Types existants
}

interface OrdreElementsProps {
  exercice: OrdreElementsData;
  
  // NOUVEAU : Metadata CEREDIS
  metadata: {
    activityId: string;
    activityName: string;
    chansonId: string;
    seanceId: string;
    ceredis: CeredisMetadata;
    niveau: NiveauCECRL;
  };
  
  // NOUVEAU : User info
  userId: string;
  userName: string;
  
  onComplete: (score: number) => void;
  debug?: boolean;
}

export function OrdreElements({ 
  exercice, 
  metadata,     // NOUVEAU
  userId,       // NOUVEAU
  userName,     // NOUVEAU
  onComplete,
  debug = false // NOUVEAU
}: OrdreElementsProps) {
  // États existants
  const [/* ... */] = useState(/* ... */);
  
  // NOUVEAU : Timer
  const startTimeRef = useRef<number>(Date.now());
  
  // NOUVEAU : Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });

  // NOUVEAU : Initialiser timer
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Logique existante...

  const handleSubmit = async () => {
    // Calcul du score existant
    const correctPositions = /* calcul existant */;
    const totalElements = exercice.elements.length;
    const maxScore = metadata.ceredis.scoreMax;
    
    // NOUVEAU : Calcul durée
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    if (debug) {
      console.log('[OrdreElements] 🔢 Soumission:', { 
        correctPositions, 
        totalElements, 
        duration 
      });
    }

    // NOUVEAU : Tracker l'activité
    await trackActivity({
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'ordre_elements',
      score: correctPositions,
      maxScore: maxScore,
      ceredis: metadata.ceredis,
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.niveau,
      duration,
      metadata: {
        totalElements,
        correctPositions,
        // Autres metadata pertinentes
      },
    });

    onComplete(correctPositions);
  };

  return (
    <Card>
      {/* UI existante */}
      
      <Button 
        onClick={handleSubmit}
        disabled={isTracking} // NOUVEAU : désactiver pendant tracking
      >
        {isTracking ? 'Enregistrement...' : 'Valider'}
      </Button>
    </Card>
  );
}
```

---

## 3. JournalReflexif.tsx

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { /* imports existants */ } from 'lucide-react';
import { /* imports UI existants */ } from '@/components/ui/...';
import { useActivityTracking } from '@/hooks/useActivityTracking';
import type { CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';

export interface JournalReflexifData {
  // Types existants
}

interface JournalReflexifProps {
  exercice: JournalReflexifData;
  
  // NOUVEAU : Metadata CEREDIS
  metadata: {
    activityId: string;
    activityName: string;
    chansonId: string;
    seanceId: string;
    ceredis: CeredisMetadata;
    niveau: NiveauCECRL;
  };
  
  // NOUVEAU : User info
  userId: string;
  userName: string;
  
  onComplete: (score: number) => void;
  debug?: boolean;
}

export function JournalReflexif({ 
  exercice, 
  metadata,     // NOUVEAU
  userId,       // NOUVEAU
  userName,     // NOUVEAU
  onComplete,
  debug = false // NOUVEAU
}: JournalReflexifProps) {
  // États existants
  const [reflexion, setReflexion] = useState('');
  const [/* ... */] = useState(/* ... */);
  
  // NOUVEAU : Timer
  const startTimeRef = useRef<number>(Date.now());
  
  // NOUVEAU : Hook de tracking
  const { trackActivity, isTracking } = useActivityTracking({
    userId,
    userName,
    debug,
  });

  // NOUVEAU : Initialiser timer
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Logique existante...

  const handleSubmit = async () => {
    // Pour un journal réflexif, on donne souvent le score max
    // (évaluation qualitative par l'enseignant ensuite)
    const score = metadata.ceredis.scoreMax;
    
    // NOUVEAU : Calcul durée
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    if (debug) {
      console.log('[JournalReflexif] 📔 Soumission:', { 
        score, 
        reflexionLength: reflexion.length,
        duration 
      });
    }

    // NOUVEAU : Tracker l'activité avec la réflexion complète
    // IMPORTANT : response contient la réflexion (valide Domaine 5)
    await trackActivity({
      activityId: metadata.activityId,
      activityName: metadata.activityName,
      activityType: 'journal_reflexif',
      score: score,
      maxScore: score, // Score max par défaut
      ceredis: metadata.ceredis,
      chansonId: metadata.chansonId,
      seanceId: metadata.seanceId,
      niveau: metadata.niveau,
      duration,
      response: reflexion, // CRITIQUE : Réflexion métacognitive
      metadata: {
        reflexionLength: reflexion.length,
        wordCount: reflexion.split(/\s+/).length,
        // Autres metadata pertinentes
      },
    });

    onComplete(score);
  };

  return (
    <Card>
      {/* UI existante */}
      
      <Textarea
        value={reflexion}
        onChange={(e) => setReflexion(e.target.value)}
        placeholder="Partagez votre réflexion..."
      />
      
      <Button 
        onClick={handleSubmit}
        disabled={isTracking || reflexion.length < 50} // NOUVEAU
      >
        {isTracking ? 'Enregistrement...' : 'Soumettre'}
      </Button>
    </Card>
  );
}
```

---

## CHECKLIST POUR CHAQUE COMPOSANT

### Imports à ajouter
- [ ] `import { useActivityTracking } from '@/hooks/useActivityTracking';`
- [ ] `import type { CeredisMetadata } from '@/types/ceredis';`
- [ ] `import type { NiveauCECRL } from '@/services/integration-unified/types.unified';`
- [ ] `import { useRef } from 'react';`

### Props à ajouter
- [ ] `metadata: { activityId, activityName, chansonId, seanceId, ceredis, niveau }`
- [ ] `userId: string`
- [ ] `userName: string`
- [ ] `debug?: boolean`

### État à ajouter
- [ ] `const startTimeRef = useRef<number>(Date.now());`
- [ ] `const { trackActivity, isTracking } = useActivityTracking({ userId, userName, debug });`

### Logique à ajouter
- [ ] `useEffect(() => { startTimeRef.current = Date.now(); }, []);`
- [ ] Calcul `duration` dans handleSubmit
- [ ] Appel `await trackActivity({ ... })` dans handleSubmit
- [ ] `disabled={isTracking}` sur le bouton
- [ ] `{isTracking ? 'Enregistrement...' : 'Texte normal'}` sur le bouton

### Tracking à configurer
- [ ] `activityId` depuis metadata
- [ ] `activityType` correct ('texte_a_trous', 'ordre_elements', 'journal_reflexif')
- [ ] `score` calculé correctement
- [ ] `maxScore` depuis metadata.ceredis.scoreMax
- [ ] `response` si activité textuelle (P3/P4)
- [ ] `metadata` additionnelle pertinente

---

## TESTS À EFFECTUER

Pour chaque composant mis à jour :

1. **Compilation TypeScript** : `npm run build`
2. **Test UI** : Charger le composant
3. **Test tracking** : Compléter l'activité et vérifier :
   - Console logs si debug=true
   - Bouton désactivé pendant tracking
   - Message "Enregistrement..."
   - Pas d'erreur dans la console
4. **Test PocketBase** : Vérifier Evidence créée
5. **Test CaSS** : Vérifier Assertion créée (si applicable)
6. **Test xAPI** : Vérifier Statement envoyé

---

## RESSOURCES

- Hook: `hooks/useActivityTracking.ts`
- Types: `types/ceredis.ts`
- Service: `services/integration-unified/`
- Exemples: `QuizQCM.tsx`, `QuizQCMJustifie.tsx`
- Doc: `MIGRATION_GUIDE.md`
