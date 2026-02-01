# Architecture d'Intégration - CaSS & xAPI
## Complément technique au Cahier des Charges

> **Document complémentaire** : Ce document enrichit le cahier des charges initial avec les spécifications techniques d'intégration CaSS (Competency and Skills System) et LRS xAPI (Learning Record Store).

---

## 📊 Vue d'Ensemble de l'Écosystème

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                     UTILISATEURS FINAUX                          │
│              (Apprenants + Enseignants + Admins)                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│           PLATEFORME D'APPRENTISSAGE (Frontend)                 │
│              https://enaa-chansons.ceredis.net                  │
│                                                                 │
│  • React 18 + Next.js + TypeScript                              │
│  • Tailwind CSS + shadcn/ui                                     │
│  • Lecteur audio (Howler.js)                                    │
│  • Activités pédagogiques interactives                          │
│  • Services d'intégration (CaSS + xAPI)                         │
└────────┬────────────────┬─────────────────┬────────────────────┘
         │                │                 │
         │                │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │         │      │         │      │         │
┌───▼──────────────┐  │  ┌──────▼───────────┐  │
│   POCKETBASE     │◄─┼──┤   CaSS           │  │
│   (BDD)          │  │  │   (Compétences)  │  │
│                  │  │  │                  │  │
│  pocketbase-     │  │  │  cass.ceredis    │  │
│  songs.ceredis   │  │  │  .net            │  │
│  .net            │  │  │                  │  │
│                  │  │  │  • Référentiel   │  │
│  • Chansons      │  │  │    CEREDIS       │  │
│  • Séances       │  │  │  • Assertions    │  │
│  • Utilisateurs  │  │  │  • Alignements   │  │
│  • Progressions  │  │  │    CECRL         │  │
│  • Réponses      │  │  └──────┬───────────┘  │
│  • Évaluations   │  │         │              │
└──────────┬───────┘  │         │              │
           │          │    ┌────▼──────────────▼───────────┐
           │          │    │                               │
           └──────────┼───►│   LRS RALPH                   │
                      │    │   (Learning Record Store)     │
                      │    │                               │
                      └───►│   lrs.ceredis.net             │
                           │                               │
                           │  • xAPI statements            │
                           │  • Traces d'apprentissage     │
                           │  • Activités + Compétences    │
                           └─────┬─────────────┬───────────┘
                                 │             │
                    ┌────────────▼──┐    ┌─────▼────────────┐
                    │               │    │                  │
                    │   GRAFANA     │    │    SUPERSET      │
                    │  (Analytics)  │    │    (Reports)     │
                    │               │    │                  │
                    │  analytics    │    │  reports         │
                    │  .ceredis.net │    │  .ceredis.net    │
                    │               │    │                  │
                    │  • Dashboards │    │  • BI Reports    │
                    │  • Real-time  │    │  • Data viz      │
                    │  • Monitoring │    │  • Export        │
                    └───────────────┘    └──────────────────┘
```

---

## 🔄 Flux de Données Détaillés

### 1. Flux d'Apprentissage (Learning Flow)

```
APPRENANT                      PLATEFORME              POCKETBASE              CaSS                LRS
    │                              │                       │                    │                  │
    ├──── Démarre séance ─────────►│                       │                    │                  │
    │                              ├── GET /seances/{id}──►│                    │                  │
    │                              │◄──── Données ─────────┤                    │                  │
    │                              │                       │                    │                  │
    │                              ├────────────────── POST xAPI (attempted) ───────────────────►│
    │                              │                       │                    │                  │
    ├──── Répond QCM ─────────────►│                       │                    │                  │
    │                              ├── POST /reponses ─────►│                    │                  │
    │                              ├── GET competencies ───┼────────────────►│  │                  │
    │                              │◄──── Mapping ─────────┼────────────────┤  │                  │
    │                              │                       │                    │                  │
    │                              │ (Score >= 60% ?) ─────────────────────────────►│              │
    │                              │                       │                    │                  │
    │                              ├── POST /assertions ───┼────────────────►│  │                  │
    │                              │◄──── Assertion ───────┼────────────────┤  │                  │
    │                              │                       │                    │                  │
    │                              ├────────────────── POST xAPI (completed) ─────────────────────►│
    │                              ├────────────────── POST xAPI (mastered) ──────────────────────►│
    │                              │                       │                    │                  │
    │◄─── Feedback + Progress ─────┤                       │                    │                  │
```

### 2. Flux d'Évaluation (Assessment Flow)

```
ENSEIGNANT                   PLATEFORME              POCKETBASE              CaSS                LRS
    │                              │                       │                    │                  │
    ├──── Évalue production ───────►│                       │                    │                  │
    │                              ├── GET /reponses ──────►│                    │                  │
    │                              │◄──── Réponse ──────────┤                    │                  │
    │                              │                       │                    │                  │
    ├──── Attribue score ──────────►│                       │                    │                  │
    │                              ├── POST /evaluations ──►│                    │                  │
    │                              │                       │                    │                  │
    │                              ├── POST /assertions ───┼────────────────►│  │                  │
    │                              │◄──── Compétence ───────┼────────────────┤  │                  │
    │                              │                       │                    │                  │
    │                              ├────────────────── POST xAPI (scored) ────────────────────────►│
    │                              ├────────────────── POST xAPI (mastered) ──────────────────────►│
    │                              │                       │                    │                  │
    │◄─── Confirmation ─────────────┤                       │                    │                  │
```

---

## 🎯 Référentiel CEREDIS dans CaSS

### Structure du Framework

**Nom** : `CEREDIS - Français par la chanson (CECRL enrichi)`

**ID CaSS** : À configurer dans `.env` via `VITE_CASS_FRAMEWORK_ID`

### Les 5 Domaines de Compétences

| ID | Domaine | Description | Nb compétences |
|----|---------|-------------|----------------|
| 1 | **Compréhension de l'oral** | Comprendre et interpréter des chansons | 3 |
| 2 | **Compréhension de l'écrit** | Analyser et comprendre les textes chantés | 3 |
| 3 | **Production écrite** | Produire des textes argumentés et créatifs | 3 |
| 4 | **Interaction** | Débattre et comparer des interprétations | 3 |
| 5 | **Métalinguistique** ⭐ | Analyser consciemment les mécanismes linguistiques | 7 |

### Domaine 5 : Innovation CEREDIS

Le **Domaine 5** est l'innovation majeure du référentiel CEREDIS. Il enrichit l'approche actionnelle du CECRL par une dimension métacognitive explicite.

#### Les 7 Compétences Métalinguistiques

| Code | Compétence | CECRL | Description |
|------|-----------|-------|-------------|
| **5.1** | Identifier des formes grammaticales | A2 | Repérer des formes grammaticales simples |
| **5.2** | Relier forme et sens | B1 | Expliquer comment une forme contribue au sens |
| **5.3** | Analyser valeur sémantique | B2 | Expliquer la valeur d'un mode ou temps |
| **5.4** | Analyser phrase complexe | B2 | Montrer comment la syntaxe organise la pensée |
| **5.5** | Mobiliser l'analyse linguistique | C1 | Utiliser l'analyse pour interpréter |
| **5.6** | Verbaliser stratégies | B2 | Expliquer comment on comprend |
| **5.7** | Réguler production écrite | C1 | Ajuster son écriture consciemment |

---

## 🗺️ Mapping Activités → Compétences

### Matrice Opérationnelle

| Type d'activité | Compétences | Niveau min | Confidence |
|-----------------|-------------|------------|------------|
| `qcm` | 5.1, 5.2 | A2-B1 | 0.7 |
| `texte_trous` | 5.1, 5.3 | A2-B2 | 0.75 |
| `texte_libre` | 5.5, 5.6, 5.7 | B2-C1 | 0.85 |
| `production_ecrite` | 5.5, 5.7 | B2-C1 | 0.9 |
| `journal_reflexif` | 5.6 | B2 | 0.8 |

### Exemple : "Né en 17 à Leidenstadt"

| Séance | Activité | Compétences | Justification |
|--------|----------|-------------|---------------|
| 1 | Découverte + QCM | 5.1, 5.2 | Repérage conditionnel + lien avec hypothèse |
| 2 | Vocabulaire | 5.2 | Relation forme/sens (lexique moral) |
| 3 | Conditionnel passé | 5.3, 5.4 | Analyse valeur + phrase conditionnelle |
| 4 | Débat | 5.5, 5.6 | Mobilisation + verbalisation |
| 5 | Dissertation | 5.5, 5.7 | Mobilisation + régulation |

---

## 💻 Services d'Intégration

### Fichiers Créés

```
src/services/integration/
├── types.ts                    # Types TypeScript
├── cass.service.ts             # Service CaSS
├── xapi.service.ts             # Service xAPI
├── integration.service.ts      # Orchestration
├── index.ts                    # Exports
└── README.md                   # Documentation

scripts/
└── test-integration.ts         # Script de test
```

### Usage Principal

```typescript
import { integrationService } from '@/services/integration';

// Complétion d'activité
const result = await integrationService.trackActivityCompletion({
  userId: 'user123',
  userName: 'Jean Dupont',
  activityId: 'qcm-1',
  activityName: 'QCM conditionnel',
  activityType: 'qcm',
  chansonId: 'ne-en-17',
  seanceId: 'seance-3',
  niveau: 'B2',
  score: 18,
  maxScore: 20,
  duration: 120
});

// Résultat contient :
// - xapiStatements: [...]
// - cassAssertions: [...]
// - errors: [...]
```

### Configuration

Fichier `.env` :

```bash
# CaSS
VITE_CASS_API_URL=https://cass.ceredis.net/api
VITE_CASS_API_KEY=your_api_key
VITE_CASS_FRAMEWORK_ID=your_framework_id

# LRS Ralph
VITE_LRS_URL=https://lrs.ceredis.net/xAPI
VITE_LRS_USERNAME=your_username
VITE_LRS_PASSWORD=your_password
```

---

## 📊 Analytics & Dashboards

### Grafana (Temps Réel)

**URL** : `https://analytics.ceredis.net`

#### Dashboards

1. **Dashboard Enseignant**
   - Activité en temps réel
   - Taux de complétion
   - Heatmap des difficultés

2. **Dashboard Apprenant**
   - Progression personnelle
   - Compétences maîtrisées
   - Suggestions

3. **Dashboard Admin**
   - Utilisation globale
   - Performance système
   - Qualité pédagogique

### Superset (BI)

**URL** : `https://reports.ceredis.net`

#### Rapports

1. **Rapport de Progression**
   - Évolution des compétences
   - Comparaison de cohortes

2. **Rapport Pédagogique**
   - Efficacité des séances
   - Recommandations

3. **Rapport d'Utilisation**
   - Chansons populaires
   - Taux d'abandon

---

## 🧪 Tests

### Script de Test

```bash
npm run test:integration
```

Vérifie :
- ✅ Connexion CaSS
- ✅ Connexion LRS
- ✅ Mapping activités → compétences
- ✅ Configuration

---

## 📈 Métriques

### Techniques

| Métrique | Cible |
|----------|-------|
| Uptime CaSS | > 99% |
| Uptime LRS | > 99.5% |
| Latence API | < 200ms |
| Taux d'erreur | < 0.1% |

### Pédagogiques

| Métrique | Cible |
|----------|-------|
| Assertions / jour | > 50 |
| Compétences maîtrisées / apprenant | 3-5/mois |
| Taux de complétion | > 80% |

---

## 🚀 Plan de Déploiement

### Phase 3 : Intégration CaSS & xAPI

**Semaine 13** : Services ✅
- [x] Service CaSS
- [x] Service xAPI
- [x] Orchestration
- [x] Tests

**Semaine 14** : Intégration ⏳
- [ ] Modifier composants
- [ ] Tests end-to-end
- [ ] Documentation

### Phase 4 : Analytics (S15-S16)

- [ ] Grafana dashboards
- [ ] Superset rapports
- [ ] Formation enseignants

---

## 📋 Checklist

### Configuration
- [x] Framework CEREDIS dans CaSS
- [ ] Obtenir clé API CaSS
- [ ] Obtenir credentials LRS
- [ ] Configurer `.env`
- [ ] Tester connexions

### Intégration
- [ ] Importer services
- [ ] Appeler `trackActivityStart`
- [ ] Appeler `trackActivityCompletion`
- [ ] Gérer erreurs

### Validation
- [ ] Tester 1 activité complète
- [ ] Vérifier assertion CaSS
- [ ] Vérifier statement xAPI
- [ ] Vérifier dashboards

---

## 🔗 Ressources

### Documentation
- [CaSS Editor](https://cassproject.github.io/cass-editor/)
- [xAPI Spec 1.0.3](https://github.com/adlnet/xAPI-Spec)
- [LRS Ralph](https://openfun.gitbooks.io/ralph/)

### Référentiels CEREDIS
- `RÉFÉRENTIEL_CEREDIS___VERSION_CANONIQUE_CaSS.md`
- `CADRAGE_CONCEPTUEL_DE_RÉFÉRENCE.md`
- `__MATRICE_OPÉRATIONNELLE.md`
- `__MAPPING_OPÉRATIONNEL_FINAL.md`

### Code
- Services : `src/services/integration/`
- Tests : `scripts/test-integration.ts`
- Doc : `src/services/integration/README.md`

---

**Version** : 2.0  
**Date** : Janvier 2026  
**Statut** : 🟢 Architecture validée - Services implémentés
