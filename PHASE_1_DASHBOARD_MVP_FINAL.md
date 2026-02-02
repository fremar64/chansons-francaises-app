# 🎯 PHASE 1 - DASHBOARD MVP FINAL (30-40min)

**Date** : 2 février 2026, 11h15 (Brazzaville)  
**Durée estimée** : 30-40 minutes  
**Objectif** : Intégrer les meilleurs composants et finaliser le Dashboard MVP

---

## 📋 TÂCHES À ACCOMPLIR

1. ✅ Intégrer **DomainRadarChart** (remplacer RadarCompetences)
2. ✅ Intégrer **CeredisScoreCard** (si score disponible)
3. ✅ Intégrer **CompetencyGrid** (grille 19 compétences)
4. ✅ Mettre à jour **index.ts** (exports)
5. ✅ Tester et valider

---

## 🔧 TÂCHE 1 : Modifier app/dashboard/page.tsx

### Instructions pour Copilot

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Modifier le fichier app/dashboard/page.tsx pour intégrer les meilleurs composants.
 * 
 * ÉTAPE 1 : AJOUTER LES IMPORTS
 * 
 * Ajouter ces imports au début du fichier (après les imports existants) :
 */

import { CeredisScoreCard } from '@/components/dashboard/CeredisScoreCard';
import { DomainRadarChart } from '@/components/dashboard/DomainRadarChart';
import { CompetencyGrid } from '@/components/dashboard/CompetencyGrid';

/**
 * ÉTAPE 2 : REMPLACER RadarCompetences PAR DomainRadarChart
 * 
 * Chercher cette ligne (vers ligne 150-170) :
 */
<RadarCompetences domainesScores={stats.domainesScores} />

/**
 * La remplacer par :
 */
<DomainRadarChart domainScores={stats.domainesScores} />

/**
 * IMPORTANT : Notez que le prop s'appelle "domainScores" (sans "s" à domain)
 * 
 * 
 * ÉTAPE 3 : AJOUTER CeredisScoreCard dans la section "Vue d'ensemble"
 * 
 * Chercher la section avec les 3 premières cartes (Profil, Parcours, Statistiques)
 * C'est la grid avec "md:grid-cols-2 lg:grid-cols-3"
 * 
 * REMPLACER toute cette section par :
 */

{/* SECTION 1 : Vue d'ensemble */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  
  {/* Carte Score CEREDIS - SEULEMENT si score disponible et > 0 */}
  {stats.scoreCeredis !== null && stats.scoreCeredis > 0 && (
    <CeredisScoreCard 
      score={{
        userId: user.id,
        ceredisScore: stats.scoreCeredis,
        cecrlLevel: stats.niveauCecrl || 'A2',
        domainScores: stats.domainesScores,
        competencyScores: stats.competencyScores || {},
        validation: { 
          valid: true, 
          level: stats.niveauCecrl || 'A2', 
          errors: [], 
          warnings: [] 
        },
        computedAt: new Date().toISOString(),
        engineVersion: '1.0'
      }}
    />
  )}
  
  {/* Carte Profil - GARDER LE CODE EXISTANT */}
  <Card>
    <CardHeader>
      <CardTitle>
        <User className="h-5 w-5 inline mr-2" />
        Profil
      </CardTitle>
      <CardDescription>Vos informations</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      {/* GARDER tout le contenu existant de la carte Profil */}
    </CardContent>
  </Card>
  
  {/* Carte Parcours - GARDER LE CODE EXISTANT */}
  <Card>
    <CardHeader>
      <CardTitle>
        <BookOpen className="h-5 w-5 inline mr-2" />
        Parcours
      </CardTitle>
      <CardDescription>Vos chansons</CardDescription>
    </CardHeader>
    <CardContent>
      {/* GARDER tout le contenu existant de la carte Parcours */}
    </CardContent>
  </Card>
  
  {/* Carte Statistiques - GARDER LE CODE EXISTANT */}
  <Card>
    <CardHeader>
      <CardTitle>
        <BarChart3 className="h-5 w-5 inline mr-2" />
        Statistiques
      </CardTitle>
      <CardDescription>Vue rapide</CardDescription>
    </CardHeader>
    <CardContent>
      {/* GARDER tout le contenu existant de la carte Statistiques */}
    </CardContent>
  </Card>
  
</div>

/**
 * ÉTAPE 4 : AJOUTER CompetencyGrid après l'Historique des Activités
 * 
 * Chercher la section avec HistoriqueActivites
 * Après la fermeture du </div> qui contient DomainRadarChart et HistoriqueActivites
 * 
 * AJOUTER cette nouvelle section :
 */

{/* SECTION 4 : Détail des compétences - SEULEMENT si données disponibles */}
{stats.competencyScores && Object.keys(stats.competencyScores).length > 0 && (
  <CompetencyGrid competencyScores={stats.competencyScores} />
)}

/**
 * STRUCTURE FINALE ATTENDUE du dashboard (ordre des sections) :
 * 
 * <AuthenticatedLayout>
 *   <div className="space-y-8">
 *     
 *     {/* SECTION 1 : Vue d'ensemble (3 cartes en grid) */}
 *     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 *       {/* CeredisScoreCard (si score > 0) */}
 *       {/* Profil */}
 *       {/* Parcours */}
 *       {/* Statistiques */}
 *     </div>
 *     
 *     {/* SECTION 2 : Progression globale */}
 *     <ProgressionGlobale {...stats} />
 *     
 *     {/* SECTION 3 : Analyses détaillées (2 colonnes) */}
 *     <div className="grid gap-6 lg:grid-cols-2">
 *       <DomainRadarChart domainScores={stats.domainesScores} />
 *       <HistoriqueActivites activites={stats.dernieresActivites} />
 *     </div>
 *     
 *     {/* SECTION 4 : Détail compétences (si données) */}
 *     {stats.competencyScores && ... && (
 *       <CompetencyGrid competencyScores={stats.competencyScores} />
 *     )}
 *     
 *     {/* SECTION 5 : Admin (si rôle admin) */}
 *     {user?.role === 'admin' && (
 *       <Card>...</Card>
 *     )}
 *     
 *   </div>
 * </AuthenticatedLayout>
 * 
 * 
 * NOTES IMPORTANTES :
 * 
 * 1. NE PAS supprimer RadarCompetences du fichier components/dashboard/RadarCompetences.tsx
 *    On le garde pour compatibilité, on l'utilise juste plus dans le dashboard
 * 
 * 2. Affichage conditionnel :
 *    - CeredisScoreCard : seulement si score > 0
 *    - CompetencyGrid : seulement si competencyScores existe et non vide
 * 
 * 3. Le composant DomainRadarChart utilise Recharts
 *    Vérifier que recharts est installé : npm list recharts
 *    Si manquant : npm install recharts
 * 
 * 4. Tous les composants sont déjà créés et fonctionnels :
 *    - components/dashboard/CeredisScoreCard.tsx ✅
 *    - components/dashboard/DomainRadarChart.tsx ✅
 *    - components/dashboard/CompetencyGrid.tsx ✅
 * 
 * 5. Props des composants :
 *    - CeredisScoreCard : score (objet CeredisScore complet)
 *    - DomainRadarChart : domainScores (Record<string, number>)
 *    - CompetencyGrid : competencyScores (Record<string, CompetencyScore>)
 * 
 * 
 * RÉSULTAT ATTENDU :
 * 
 * - Dashboard avec 5 sections claires
 * - CeredisScoreCard visible (si l'utilisateur a un score)
 * - Radar 5 domaines professionnel (Recharts)
 * - Grille 19 compétences détaillée
 * - Pas d'erreurs TypeScript
 * - Pas d'erreurs console navigateur
 */
```

---

## 🔧 TÂCHE 2 : Mettre à jour components/dashboard/index.ts

### Instructions pour Copilot

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Mettre à jour le fichier components/dashboard/index.ts
 * pour exporter tous les composants utilisés dans le dashboard.
 * 
 * REMPLACER tout le contenu du fichier par :
 */

/**
 * Barrel export pour les composants du Dashboard
 */

// Composants principaux (utilisés dans le dashboard)
export { CeredisScoreCard } from './CeredisScoreCard';
export { DomainRadarChart } from './DomainRadarChart';
export { CompetencyGrid } from './CompetencyGrid';
export { ProgressionGlobale } from './ProgressionGlobale';
export { HistoriqueActivites } from './HistoriqueActivites';

// Ancien composant (gardé pour compatibilité, mais non utilisé)
export { RadarCompetences } from './RadarCompetences';

// Composants simples (gardés pour référence future)
export { DomainRadar } from './DomainRadar';
export { ScoreCard } from './ScoreCard';

/**
 * NOTES :
 * 
 * 1. On garde RadarCompetences dans l'export pour ne pas casser d'imports ailleurs
 * 2. DomainRadar et ScoreCard sont des composants simples qui peuvent servir ailleurs
 * 3. Les composants principaux sont en premier pour faciliter l'import
 * 
 * USAGE dans d'autres fichiers :
 * 
 * import { 
 *   CeredisScoreCard, 
 *   DomainRadarChart, 
 *   CompetencyGrid 
 * } from '@/components/dashboard';
 */
```

---

## ✅ TÂCHE 3 : Vérifications et Tests

### Checklist avant de tester

```bash
# 1. Vérifier que recharts est installé
cd ~/chansons-francaises-app
npm list recharts

# Si recharts n'est pas installé :
npm install recharts

# 2. Vérifier qu'il n'y a pas d'erreurs TypeScript
npm run type-check

# Si erreurs TypeScript :
# - Lire les messages d'erreur
# - Corriger les imports ou les props
# - Relancer npm run type-check
```

### Tests dans le navigateur

```bash
# 1. Démarrer le serveur (si pas déjà fait)
npm run dev

# 2. Ouvrir http://localhost:3000/dashboard

# 3. Vérifier visuellement :
```

**Checklist visuelle** :

- [ ] **Navigation** : Navbar en haut avec tous les liens
- [ ] **Section 1** : 3-4 cartes (Score CEREDIS si disponible, Profil, Parcours, Stats)
- [ ] **Section 2** : Progression globale (avec niveau CECRL A2)
- [ ] **Section 3** : 
  - [ ] Radar 5 domaines (avec Recharts, pas le simple SVG)
  - [ ] Historique activités (vide c'est normal)
- [ ] **Section 4** : Grille 19 compétences (si données disponibles)
- [ ] **Section 5** : Informations système (seulement si admin)

**Tests interactifs** :

- [ ] Cliquer sur "Accueil" → redirige vers /
- [ ] Cliquer sur "Parcours" → redirige vers /parcours
- [ ] Cliquer sur "Dashboard" → reste sur /dashboard
- [ ] Cliquer sur "Profil" → redirige vers /profile
- [ ] Responsive : réduire la fenêtre, vérifier que tout s'adapte

**Console navigateur (F12)** :

- [ ] Aucune erreur rouge
- [ ] Aucun warning critique
- [ ] Si warnings "recharts" → normal, ignorer

---

## 🎨 RÉSULTAT ATTENDU

### Avant (capture d'écran actuelle)
```
┌─────────────────────────────────────┐
│ Navbar                              │
├─────────────────────────────────────┤
│ [Profil] [Parcours] [Stats]         │
├─────────────────────────────────────┤
│ Progression Globale                 │
├─────────────────────────────────────┤
│ [RadarSimple] | [Historique]        │  ← Ancien radar SVG
└─────────────────────────────────────┘
```

### Après (attendu)
```
┌─────────────────────────────────────┐
│ Navbar                              │
├─────────────────────────────────────┤
│ [Score CEREDIS]                     │  ← NOUVEAU (si score > 0)
│ [Profil] [Parcours] [Stats]         │
├─────────────────────────────────────┤
│ Progression Globale                 │
├─────────────────────────────────────┤
│ [DomainRadarChart] | [Historique]   │  ← Recharts professionnel
├─────────────────────────────────────┤
│ CompetencyGrid (19 compétences)     │  ← NOUVEAU (si données)
└─────────────────────────────────────┘
```

---

## 🚨 TROUBLESHOOTING

### Erreur : "recharts not found"

**Solution** :
```bash
npm install recharts
npm run dev
```

### Erreur TypeScript sur "domainScores"

**Cause** : Confusion entre `domainesScores` (hook) et `domainScores` (composant)

**Solution** :
```typescript
// Dans le dashboard
<DomainRadarChart domainScores={stats.domainesScores} />
//                 ^^^^^^^^^^^^ prop du composant
//                                     ^^^^^^^^^^^^^ variable du hook
```

### CeredisScoreCard ne s'affiche pas

**Cause** : score === 0 ou null

**Vérification** :
```typescript
// Dans la console navigateur (F12)
console.log('Score:', stats.scoreCeredis);
// Devrait afficher : Score: 0 (ou null)

// C'est NORMAL si aucune activité n'a été faite
// Le composant ne s'affiche que si score > 0
```

### CompetencyGrid ne s'affiche pas

**Cause** : pas de données de compétences

**Vérification** :
```typescript
// Dans la console navigateur (F12)
console.log('Competency scores:', stats.competencyScores);
// Devrait afficher : undefined ou {}

// C'est NORMAL si aucune activité n'a été faite
// Le composant ne s'affiche que si des données existent
```

### Le radar n'affiche rien

**Cause** : tous les domaines sont à 0%

**Solution** : C'est NORMAL ! Les scores sont à 0 car aucune activité n'a été faite.

Le radar s'affichera correctement avec un polygone visible quand l'utilisateur aura des scores.

---

## 📊 DONNÉES DE TEST (optionnel)

Si vous voulez tester l'affichage avec des données, vous pouvez temporairement modifier le hook `useDashboard.ts` :

```typescript
// TEMPORAIRE - pour tester l'affichage
const stats = {
  scoreCeredis: 412.5,  // au lieu de 0
  niveauCecrl: 'B2',    // au lieu de 'A2'
  domainesScores: {
    'D1': 70,  // au lieu de 0
    'D2': 68,
    'D3': 65,
    'D4': 62,
    'D5': 72
  },
  competencyScores: {
    '1.1': { score: 70, evidenceCount: 3, evidenceTypes: ['P1', 'P2'] },
    '1.2': { score: 75, evidenceCount: 2, evidenceTypes: ['P2'] },
    // ... etc pour tester CompetencyGrid
  },
  // ... reste identique
};
```

**⚠️ IMPORTANT** : Supprimer ces modifications après les tests !

---

## ✅ VALIDATION FINALE

Avant de commit, vérifier :

- [ ] `npm run type-check` → Aucune erreur
- [ ] `npm run build` → Build réussi
- [ ] Dashboard s'affiche correctement
- [ ] Navigation fonctionne
- [ ] Responsive OK
- [ ] Aucune erreur console

---

## 🎉 COMMIT

```bash
git add .
git commit -m "feat: Dashboard MVP finalisé avec meilleurs composants

- Intégration DomainRadarChart (Recharts professionnel)
- Intégration CeredisScoreCard (score + niveau CECRL)
- Intégration CompetencyGrid (grille 19 compétences)
- Remplacement RadarCompetences par DomainRadarChart
- Affichage conditionnel des composants selon données
- Tests validés (responsive, navigation, console)

Dashboard MVP complet ✅"

git push
```

---

## 📅 PROCHAINE ÉTAPE

**Pause déjeuner** : 12h30 - 13h00

**Après déjeuner** : Phase 2 - Moteur CEREDIS (13h00 - 14h30)
- Audit du moteur existant
- API Route `/api/ceredis/calculate`
- Connexion Dashboard → Moteur
- Tests avec vrais scores

---

**Document créé** : 2 février 2026, 11h15 (Brazzaville)  
**Durée estimée** : 30-40 minutes  
**Heure de fin prévue** : ~12h00  
**Pause déjeuner** : 12h30 ✅
