# Journal de Développement - Chansons Françaises Next.js

## 2026-01-14 - Intégration lecteur audio dans activités de séance

### Fonctionnalité ajoutée ✅

**Activités d'écoute (`ecoute_decouverte` / `ecoute_ciblee`) fonctionnelles dans la page de séance**

### Modifications
- Ajout des types `ecoute_decouverte` et `ecoute_ciblee` dans le type `Activite`
- Import du composant `EcouteChanson` depuis `@/components/activities`
- Ajout des cas d'écoute dans le switch `renderActivity()` avec mapping des données
- Ajout d'une activité d'écoute de démonstration au début des activités mock

### Fichier modifié
- `app/chanson/[chansonId]/seance/[seanceId]/page.tsx`

### Fonctionnement
- Les activités d'écoute sont affichées avec le composant `EcouteChanson`
- L'audio se charge depuis `/audio/chansons/{artiste}/{chanson}.mp3`
- Objectifs et éléments de focus sont affichés à l'utilisateur
- La progression d'écoute est suivie avant de permettre la validation

---

## 2026-01-14 - Correction erreur d'hydratation SSR

### Problème résolu
Erreur "Hydration failed because the server rendered HTML didn't match the client"

### Cause
Les hooks `useDashboard.ts` et `useTeacherDashboard.ts` utilisaient `Math.random()` et `Date.now()` pour générer des données mock, produisant des valeurs différentes entre le serveur (SSR) et le client.

### Solution
1. Création d'un générateur pseudo-aléatoire déterministe `seededRandom(seed)`
2. Remplacement de tous les `Math.random()` par `seededRandom(index)` avec un seed basé sur l'index
3. Remplacement de tous les `Date.now()` par des dates fixes (`'2026-01-13T00:00:00.000Z'`)

### Fichiers modifiés
- `hooks/useDashboard.ts` - MOCK_HISTORIQUE avec dates fixes, createMockCompetenceDetails déterministe
- `hooks/useTeacherDashboard.ts` - generateMockHistorique, generateMockEleves, generateMockProfilDomaines, generateMockCompetencesCritiques, generateMockPreuves, calculateMockStatistiques

---

## 2026-01-14 - Parcours "Le coureur" complet

### Parcours créé ✅

**"Le coureur" de Jean-Jacques Goldman** - Parcours complet CEREDIS :
- **5 séances, 43 écrans** (~339 minutes, ~303 points max)
- Thème : La mondialisation est-elle émancipation ou aliénation ?

| Séance | Titre | Écrans | Focus |
|--------|-------|--------|-------|
| 1 | Découverte | 9 | 7 étapes chronologiques du déracinement, oppositions AVANT/APRÈS |
| 2 | Vocabulaire | 8 | 4 champs lexicaux (nature, modernité, déshumanisation, mondialisation) |
| 3 | Grammaire | 8 | Imparfait vs passé composé, voix passive |
| 4 | Débat | 9 | Mondialisation : thèse/antithèse/synthèse, dimension post-coloniale |
| 5 | Production | 9 | Récit de transformation ambivalente (450-500 mots) |

### Fichiers créés
- `data/parcours/le-coureur/Texte.txt` - Paroles complètes
- `data/parcours/le-coureur/chanson.ts` - Métadonnées, vocabulaire clé, 7 étapes
- `data/parcours/le-coureur/seance-1-decouverte.ts`
- `data/parcours/le-coureur/seance-2-vocabulaire.ts`
- `data/parcours/le-coureur/seance-3-grammaire.ts`
- `data/parcours/le-coureur/seance-4-debat.ts`
- `data/parcours/le-coureur/seance-5-production.ts`
- `data/parcours/le-coureur/index.ts`

### Métaphore centrale
- **AVANT** : "Je la caressais naguère" (harmonie avec la terre)
- **APRÈS** : "Des clous aux pieds pour écorcher la terre" (violence, aliénation)

### Structure narrative (7 étapes)
1. Vie d'origine (plage, alizés, ancêtres)
2. Découverte (recruteur, chronomètre)
3. Transaction (dollars, signature)
4. Transplantation (avion, froid des villes)
5. Déshumanisation (mesuré comme un cheval)
6. Transformation (numéro, compétition)
7. Bilan ambivalent (étranger partout, "C'est ainsi")

---

## 2026-01-13 - Parcours "C'est ta chance" complet + Corrections TypeScript majeures

### Parcours créé ✅

**"C'est ta chance" de Jean-Jacques Goldman** - Parcours complet CEREDIS :
- **5 séances, 41 écrans** (~344 minutes, ~304 points max)
- Thème : Les injustices de la vie et la transformation de la souffrance en force

| Séance | Titre | Écrans | Focus |
|--------|-------|--------|-------|
| 1 | Découverte | 9 | À qui s'adresse Goldman ? Le paradoxe "pas de chance" → "ta chance" |
| 2 | Vocabulaire | 9 | Transformation : blessure→force, souffrance→rêves, intelligence philosophique |
| 3 | Grammaire | 9 | "Il faudra que tu..." + subjonctif (futur de la nécessité) |
| 4 | Débat | 8 | "Prouver deux fois plus" - accepter ou refuser les injustices ? |
| 5 | Production | 8 | Lettre à soi-même / Manifeste personnel (300-400 mots) |

### Fichiers créés
- `data/parcours/cest-ta-chance/seance-2-vocabulaire-migre.ts`
- `data/parcours/cest-ta-chance/seance-3-grammaire-migre.ts`
- `data/parcours/cest-ta-chance/seance-4-debat-migre.ts`
- `data/parcours/cest-ta-chance/seance-5-production-migre.ts`
- `data/parcours/cest-ta-chance/index.ts`

### Corrections TypeScript majeures

**Types étendus** :
- `TypeEcran` : ajout de `ecoute_ciblee`
- `ActiviteData` : ajout de `ecoute_ciblee` dans l'union type
- `JournalReflexifData` : ajout de `contexte`, `nombreMotsMin`, `exemplesReponses`
- `LevelBadge` : support de tous les niveaux CECRL (A1-C2)
- `type_texte` : ajout de `narratif_argumentatif`

**Composants UI corrigés** :
- `calendar.tsx` : Migration vers nouvelle API react-day-picker (Chevron)
- `chart.tsx` : Correction des types payload, formatter, et value
- `resizable.tsx` : Migration vers nouvelle API react-resizable-panels (Group, Panel, Separator)
- `RadarCompetences.tsx` : Type assertion pour textAnchor
- `TexteATrous.tsx` : Nullish coalescing pour estCorrect

**Données parcours corrigées** :
- `cest-ta-chance/chanson.ts` : Type local LigneSynchronisee, conversion vocabulaire_cle
- `la-bas/chanson.ts` : Mêmes corrections
- Tous les fichiers `ordre_elements` : Format `{id, texte, ordre}` obligatoire

**Fichiers obsolètes supprimés** :
- `la-bas/seance-1-decouverte.ts`, `seance-1.ts`, `seance-3-grammaire.ts`, etc.
- `ne-en-17/seance-1-decouverte.ts`, `seance-2-vocabulaire.ts`, etc.
- `cest-ta-chance/seance-2-vocabulaire.ts`, etc. (anciens formats)

### Build réussi ✅

```
✓ Compiled successfully in 16.0s
✓ Finished TypeScript in 25.3s
✓ Generating static pages (8/8)
```

---

## 2025-01-XX - Migration vers Next.js complétée

### Pages créées et testées ✅

| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ 200 | Page d'accueil avec catalogue de chansons |
| `/login` | ✅ 200 | Page de connexion PocketBase |
| `/register` | ✅ 200 | Page d'inscription multi-étapes |
| `/dashboard` | ✅ 200 | Tableau de bord apprenant |
| `/enseignant` | ✅ 200 | Dashboard enseignant avec suivi élèves |
| `/chanson/[chansonId]` | ✅ 200 | Détail chanson avec lecteur audio |
| `/chanson/[chansonId]/seance/[seanceId]` | ✅ 200 | Lecteur de séance pédagogique |

### Composants créés

- `components/layout/Footer.tsx` - Pied de page avec navigation et copyright

### Configuration Tailwind v4

- PostCSS configuré avec `@tailwindcss/postcss`
- globals.css utilise `@import "tailwindcss"` + `@config`

### Notes techniques

- Next.js 16.1.1 avec Turbopack
- Serveur de dev sur port 3000
- CaSS/xAPI services désactivés (credentials manquants - comportement attendu)
- Routes dynamiques cohérentes avec `chansonId` et `seanceId`

### Prochaines étapes

- [ ] Tests E2E avec Playwright
- [ ] Configuration PocketBase production
- [ ] Déploiement Vercel
