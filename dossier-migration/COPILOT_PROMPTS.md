# 🤖 COPILOT PROMPTS - Migration PocketBase → Supabase

**Guide pour GitHub Copilot avec modèles premium (GPT-5.2 Codex, Claude Opus 4.5, Gemini 3 PRO)**

Ces prompts sont optimisés pour une migration rapide et correcte du code.

---

## 📋 RÈGLES GÉNÉRALES POUR TOUS LES PROMPTS

### Context à fournir à Copilot

```
Project: ENAA Chansons Françaises (Next.js 16 + TypeScript)
Task: Migrate from PocketBase (SQLite) to Supabase (PostgreSQL)
Database: PostgreSQL 15 with Row Level Security
Auth: Supabase Auth (replacing PocketBase Auth)
```

### Conventions de nommage

```
PocketBase (camelCase) → Supabase (snake_case)

Examples:
- userId → user_id
- competencyId → competency_id
- evidenceType → evidence_type
- createdAt → created_at
```

### Pattern général

```typescript
// AVANT (PocketBase)
import PocketBase from 'pocketbase';
const pb = new PocketBase(url);
const records = await pb.collection('evidences').getFullList({
  filter: `user = "${userId}"`,
  sort: '-created'
});

// APRÈS (Supabase)
import { createClient } from '@/lib/supabase/server';
const supabase = createClient();
const { data: records, error } = await supabase
  .from('evidences')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

if (error) throw error;
```

---

## 🎯 PROMPT 1 : API ROUTES

### Context

```
File type: Next.js 16 API Route (app/api/**/route.ts)
Current: Uses PocketBase client directly
Target: Use Supabase server client with proper error handling
```

### Prompt Copilot

```
Convert this Next.js API route from PocketBase to Supabase:

Requirements:
1. Replace PocketBase imports with @/lib/supabase/server createClient
2. Transform all pb.collection() calls to supabase.from()
3. Convert field names from camelCase to snake_case:
   - user → user_id
   - competencyId → competency_id
   - evidenceType → evidence_type
   - createdAt → created_at
   - updatedAt → updated_at
4. Convert filter syntax:
   - PB: filter: `user = "${userId}"`
   - SB: .eq('user_id', userId)
5. Convert sort syntax:
   - PB: sort: '-created'
   - SB: .order('created_at', { ascending: false })
6. Add proper error handling:
   - Check error object from Supabase
   - Throw or return error response
7. Maintain exact response format
8. Keep TypeScript types strict

Example transformation:
- await pb.collection('evidences').getFullList({...})
- becomes: const { data, error } = await supabase.from('evidences').select('*')...

Generate the complete migrated code.
```

### Fichiers concernés

```
app/api/ceredis/calculate/route.ts
app/api/evidences/route.ts
app/api/activities/route.ts
app/api/dashboard/stats/route.ts
[... autres API routes]
```

---

## 🎯 PROMPT 2 : SERVICE UNIFIÉ

### Context

```
File: services/integration-unified/integration.unified.ts
Critical service that handles PocketBase + CaSS + xAPI
Must maintain exact same interface
Only replace PocketBase calls, keep CaSS and xAPI unchanged
```

### Prompt Copilot

```
Migrate the UnifiedIntegrationService from PocketBase to Supabase:

Critical requirements:
1. Keep the EXACT SAME public interface (methods, parameters, return types)
2. Only modify PocketBase-related code
3. DO NOT touch CaSS integration code
4. DO NOT touch xAPI integration code
5. DO NOT touch mode dégradé logic

Transformations needed:
1. Replace PocketBase client initialization:
   - BEFORE: this.pb = new PocketBase(url)
   - AFTER: import Supabase client from @/lib/supabase/server

2. Convert all createEvidence calls:
   - BEFORE: await this.pb.collection('evidences').create({...})
   - AFTER: await this.supabase.from('evidences').insert({...}).select().single()

3. Transform field names in evidence creation:
   - user: userId → user_id: userId
   - competencyId → competency_id
   - type: evidenceType → evidence_type: evidenceType
   - activityType → activity_type
   - activityId → activity_id
   - seanceId → seance_id
   - chansonId → chanson_id

4. Handle Supabase response format:
   - const { data, error } = await supabase...
   - if (error) handle appropriately
   - return data

5. Preserve mode dégradé:
   - If Supabase call fails, log error
   - Continue with CaSS and xAPI
   - Don't break entire flow

6. Keep all helper methods unchanged:
   - createCassAssertion()
   - sendXapiStatement()
   - applyDomain5Rules()

Generate complete migrated service maintaining exact behavior.
```

---

## 🎯 PROMPT 3 : REACT HOOKS

### Context

```
Files: hooks/*.ts, lib/ceredis/hooks.ts
React hooks using PocketBase for data fetching
Must work with React Query / TanStack Query
Client-side code (not server-side)
```

### Prompt Copilot

```
Convert React hooks from PocketBase to Supabase client-side:

Requirements:
1. Import Supabase browser client:
   - import { createClient } from '@/lib/supabase/client'
   
2. Replace PocketBase initialization:
   - BEFORE: const pb = new PocketBase(url)
   - AFTER: const supabase = createClient()

3. Convert query syntax:
   - pb.collection('evidences').getFullList({filter, sort})
   - → supabase.from('evidences').select('*').eq(...).order(...)

4. Transform field names (camelCase → snake_case)

5. Handle Supabase response:
   - const { data, error } = await supabase...
   - if (error) throw error
   - return data

6. Maintain React Query integration:
   - Keep useQuery hooks
   - Keep queryKey format
   - Keep staleTime, refetchInterval
   - Keep enabled conditions

7. Preserve loading/error states

Example hook transformation:
```typescript
// BEFORE
export function useActivityTracking({ userId }) {
  const pb = new PocketBase(url);
  
  const trackActivity = async (payload) => {
    const evidence = await pb.collection('evidences').create({
      user: userId,
      competencyId: payload.competencyId,
      type: payload.type,
      score: payload.score
    });
    return evidence;
  };
  
  return { trackActivity };
}

// AFTER
export function useActivityTracking({ userId }) {
  const supabase = createClient();
  
  const trackActivity = async (payload) => {
    const { data: evidence, error } = await supabase
      .from('evidences')
      .insert({
        user_id: userId,
        competency_id: payload.competencyId,
        evidence_type: payload.type,
        score: payload.score
      })
      .select()
      .single();
    
    if (error) throw error;
    return evidence;
  };
  
  return { trackActivity };
}
```

Generate complete migrated hooks.
```

---

## 🎯 PROMPT 4 : COMPOSANTS REACT

### Context

```
Files: components/**/*.tsx, app/**/page.tsx
React components that may have direct database calls
Most should use hooks, but verify
```

### Prompt Copilot

```
Review and migrate React components from PocketBase to Supabase:

Tasks:
1. Search for direct PocketBase usage:
   - Look for: new PocketBase()
   - Look for: pb.collection()
   - Look for: pb.authStore

2. If found direct usage:
   - Replace with Supabase client
   - Follow same patterns as hooks migration
   
3. If using hooks:
   - Verify hooks are already migrated
   - Update any field name references if needed
   - Transform camelCase → snake_case in data access

4. Update data access patterns:
   - evidence.userId → evidence.user_id
   - evidence.competencyId → evidence.competency_id
   - evidence.evidenceType → evidence.evidence_type
   - evidence.createdAt → evidence.created_at

5. Check TypeScript interfaces:
   - Update interface definitions if needed
   - Ensure type safety maintained

6. Verify display logic:
   - Ensure data still displays correctly
   - Check date formatting
   - Check null/undefined handling

Generate migrated components with proper data access.
```

---

## 🎯 PROMPT 5 : AUTHENTICATION

### Context

```
Files: lib/auth/*, middleware.ts, login/signup pages
Critical: Auth flow must work correctly
Supabase Auth replaces PocketBase Auth
```

### Prompt Copilot

```
Migrate authentication from PocketBase to Supabase Auth:

Complete transformation needed:
1. Login flow:
   BEFORE:
   ```typescript
   const authData = await pb.collection('users').authWithPassword(email, password);
   const user = pb.authStore.model;
   ```
   
   AFTER:
   ```typescript
   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
   if (error) throw error;
   const user = data.user;
   const session = data.session;
   ```

2. Sign up flow:
   BEFORE:
   ```typescript
   const user = await pb.collection('users').create({
     email,
     password,
     passwordConfirm: password,
     name
   });
   ```
   
   AFTER:
   ```typescript
   const { data, error } = await supabase.auth.signUp({
     email,
     password,
     options: {
       data: { name }
     }
   });
   ```

3. Get current user:
   BEFORE:
   ```typescript
   const user = pb.authStore.model;
   const isValid = pb.authStore.isValid;
   ```
   
   AFTER:
   ```typescript
   const { data: { user } } = await supabase.auth.getUser();
   const { data: { session } } = await supabase.auth.getSession();
   ```

4. Logout:
   BEFORE:
   ```typescript
   pb.authStore.clear();
   ```
   
   AFTER:
   ```typescript
   await supabase.auth.signOut();
   ```

5. Session persistence:
   - Supabase handles cookies automatically via @supabase/ssr
   - No manual session management needed
   - Sessions refresh automatically

6. Middleware (if exists):
   - Check session validity
   - Redirect unauthenticated users
   - Refresh session if needed

Generate complete auth system with Supabase.
```

---

## 🎯 PROMPT 6 : TYPES & INTERFACES

### Context

```
Files: types/*.ts, lib/*/types.ts
TypeScript interfaces that may reference PocketBase formats
```

### Prompt Copilot

```
Update TypeScript types and interfaces for Supabase:

Transformations:
1. Field names (camelCase → snake_case):
   ```typescript
   // BEFORE
   interface Evidence {
     id: string;
     userId: string;
     competencyId: string;
     evidenceType: 'P1' | 'P2' | 'P3' | 'P4';
     score: number;
     createdAt: string;
     updatedAt: string;
   }
   
   // AFTER
   interface Evidence {
     id: string;
     user_id: string;
     competency_id: string;
     evidence_type: 'P1' | 'P2' | 'P3' | 'P4';
     score: number;
     created_at: string;
     updated_at: string;
   }
   ```

2. Database response types:
   ```typescript
   // Add Supabase response wrapper
   type SupabaseResponse<T> = {
     data: T | null;
     error: PostgrestError | null;
   };
   ```

3. Relation types:
   - PocketBase uses expand
   - Supabase uses joins/selects
   - Update accordingly

4. Generate Supabase types from database:
   ```bash
   npx supabase gen types typescript --project-id [project-id] > types/supabase.ts
   ```

5. Create transformation utilities:
   ```typescript
   // Helper to transform PB format → SB format
   function transformToSupabase(pbData: PocketBaseEvidence): SupabaseEvidence {
     return {
       id: pbData.id,
       user_id: pbData.user,
       competency_id: pbData.competencyId,
       evidence_type: pbData.type,
       // ...
     };
   }
   ```

Generate updated type definitions.
```

---

## 🎯 PROMPT 7 : MIGRATION SCRIPTS

### Context

```
Files: scripts/export-pocketbase.js, scripts/import-supabase.js
Node.js scripts for data migration
One-time execution
```

### Prompt Copilot

```
Create data migration scripts PocketBase → Supabase:

SCRIPT 1: Export from PocketBase
```javascript
// scripts/export-pocketbase.js
const PocketBase = require('pocketbase/cjs');
const fs = require('fs').promises;

async function exportPocketBase() {
  const pb = new PocketBase('https://pocketbase-songs.ceredis.net');
  
  console.log('Exporting PocketBase data...');
  
  // Export collections
  const collections = ['users', 'evidences', 'activities'];
  
  for (const collection of collections) {
    console.log(`Exporting ${collection}...`);
    const records = await pb.collection(collection).getFullList({
      sort: '-created'
    });
    
    await fs.writeFile(
      `exports/${collection}.json`,
      JSON.stringify(records, null, 2)
    );
    
    console.log(`✓ Exported ${records.length} ${collection}`);
  }
  
  console.log('Export complete!');
}

exportPocketBase();
```

SCRIPT 2: Transform data format
```javascript
// scripts/transform-data.js
const fs = require('fs').promises;

async function transformData() {
  console.log('Transforming data format...');
  
  // Transform evidences
  const evidences = JSON.parse(await fs.readFile('exports/evidences.json'));
  const transformed = evidences.map(e => ({
    id: e.id,
    user_id: e.user,                    // relation → UUID
    competency_id: e.competencyId,      // camelCase → snake_case
    evidence_type: e.type,
    score: e.score,
    activity_type: e.activityType,
    activity_id: e.activityId,
    seance_id: e.seanceId,
    chanson_id: e.chansonId,
    response: e.response,
    metadata: e.metadata,
    created_at: e.created,              // PB timestamp → ISO8601
    updated_at: e.updated
  }));
  
  await fs.writeFile(
    'transformed/evidences.json',
    JSON.stringify(transformed, null, 2)
  );
  
  console.log(`✓ Transformed ${transformed.length} evidences`);
}

transformData();
```

SCRIPT 3: Import to Supabase
```javascript
// scripts/import-supabase.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;

async function importToSupabase() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  console.log('Importing to Supabase...');
  
  // Import evidences
  const evidences = JSON.parse(await fs.readFile('transformed/evidences.json'));
  
  // Batch import (1000 at a time)
  const batchSize = 1000;
  for (let i = 0; i < evidences.length; i += batchSize) {
    const batch = evidences.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('evidences')
      .insert(batch);
    
    if (error) {
      console.error(`Error at batch ${i}:`, error);
      throw error;
    }
    
    console.log(`Imported ${Math.min(i + batchSize, evidences.length)}/${evidences.length}`);
  }
  
  console.log('✓ Import complete!');
}

importToSupabase();
```

Generate complete migration scripts with error handling and validation.
```

---

## 🎯 PROMPT 8 : TESTS

### Context

```
Files: **/*.test.ts, **/*.spec.ts
Unit and integration tests
Must work with Supabase
```

### Prompt Copilot

```
Update tests from PocketBase to Supabase:

Requirements:
1. Mock Supabase client:
   ```typescript
   jest.mock('@/lib/supabase/client', () => ({
     createClient: jest.fn(() => ({
       from: jest.fn(() => ({
         select: jest.fn().mockReturnThis(),
         insert: jest.fn().mockReturnThis(),
         eq: jest.fn().mockReturnThis(),
         single: jest.fn().mockResolvedValue({
           data: mockData,
           error: null
         })
       }))
     }))
   }));
   ```

2. Update test data:
   - Transform field names to snake_case
   - Match Supabase response format

3. Update assertions:
   - Check { data, error } structure
   - Verify snake_case fields

4. Integration tests:
   - Use test database
   - Clean up after tests
   - Use transactions for isolation

5. E2E tests:
   - No changes needed if using high-level interactions
   - Update if accessing data directly

Generate updated test suites.
```

---

## 📚 RESSOURCES POUR COPILOT

### Documentation à fournir

```
1. Supabase Docs: https://supabase.com/docs
2. Supabase JS Client: https://supabase.com/docs/reference/javascript
3. Row Level Security: https://supabase.com/docs/guides/auth/row-level-security
4. Next.js with Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
```

### Exemples de référence

```typescript
// Point Copilot vers ces exemples officiels
// https://github.com/supabase/supabase/tree/master/examples/auth/nextjs
```

---

## ✅ CHECKLIST POUR CHAQUE FICHIER MIGRÉ

Demander à Copilot de vérifier :

```
- [ ] Imports Supabase corrects
- [ ] Field names en snake_case
- [ ] Error handling présent
- [ ] Types TypeScript stricts
- [ ] Tests mis à jour
- [ ] Pas de référence PocketBase restante
- [ ] Compile sans erreurs
- [ ] Fonctionne en dev
```

---

## 🚀 WORKFLOW AVEC COPILOT

### 1. Ouvrir fichier à migrer

### 2. Sélectionner code PocketBase

### 3. Cmd/Ctrl + I (Copilot inline chat)

### 4. Coller prompt approprié ci-dessus

### 5. Copilot génère le code migré

### 6. Reviewer et ajuster si nécessaire

### 7. Tester

### 8. Commit

---

**Date** : 1er février 2026  
**Version** : 1.0  
**Compatible avec** : GitHub Copilot avec GPT-5.2 Codex, Claude Opus 4.5, Gemini 3 PRO
