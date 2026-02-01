# 🔍 ÉTAT DES LIEUX - Moteur CEREDIS

**Date**: 2026-01-12  
**Découverte**: Le moteur CEREDIS (Phase A) existe mais n'est PAS intégré dans Next.js

---

## 📊 COMPARAISON : CE QUI EXISTE vs CE QUI MANQUE

### ✅ MOTEUR STANDALONE (Existe)

**Localisation** : Archive `/mnt/user-data/outputs/ceredis-engine-v1.0.tar.gz`

```
ceredis-engine/                    ← Moteur JavaScript standalone
├── src/
│   ├── engine/                    ← 6 modules de calcul
│   │   ├── evidenceAggregator.js      ✅ Agrégation preuves
│   │   ├── competencyCalculator.js    ✅ Calcul par compétence
│   │   ├── domainCalculator.js        ✅ Calcul par domaine
│   │   ├── ceredisCalculator.js       ✅ Score 0-600
│   │   ├── cecrlDecider.js            ✅ Niveau CECRL
│   │   └── levelValidator.js          ✅ Validation B2/C1
│   ├── cass/
│   │   └── cassClient.js          ✅ Récupération preuves CaSS
│   ├── persistence/
│   │   └── postgresWriter.js      ✅ Sauvegarde PostgreSQL
│   └── audit/
│       └── traceBuilder.js        ✅ Audit trail
├── config/
│   └── ceredis.v1.json            ✅ Configuration complète
├── tests/
│   └── validation.test.js         ✅ 5 tests validation
└── package.json

**Fonctionnalités** :
✅ Calcul score CEREDIS (0-600)
✅ Attribution niveau CECRL (A2-C1)
✅ Règles strictes B2/C1 (P3, P4, D5)
✅ Audit trail complet
✅ PostgreSQL persistence
✅ CLI fonctionnel
✅ Tests unitaires

**Usage** :
$ node src/index.js --agent user123
Score: 412.5/600
Niveau: B2
```

### ❌ APP NEXT.JS (Manquant)

**Localisation** : `chansons-francaises-app/`

```
chansons-francaises-app/
├── services/
│   ├── integration-unified/       ✅ Existe (Phase D1)
│   │   └── integration.unified.ts     Track PB+CaSS+xAPI
│   │
│   └── ceredis-calculator/        ❌ N'EXISTE PAS
│       ├── engine/                    ← À créer
│       ├── config.ts
│       └── index.ts
│
├── app/
│   └── api/
│       └── ceredis/               ❌ N'EXISTE PAS
│           └── calculate/
│               └── route.ts           ← À créer
│
└── lib/
    └── ceredis/                   ❌ N'EXISTE PAS
        ├── client.ts                  ← À créer
        └── hooks.ts                   ← À créer

**Conséquence** :
❌ Pas de calcul score CEREDIS dans l'app
❌ Pas d'API pour calculer les scores
❌ Pas de hooks React pour accéder aux scores
❌ Dashboard vide (pas de scores à afficher)
❌ Moteur isolé, non utilisable par le frontend
```

---

## 🔄 FLUX ACTUEL vs FLUX CIBLE

### FLUX ACTUEL (Incomplet ❌)

```
Frontend (Next.js)
    ↓
PocketBase Evidences créées ✅
    ↓
CaSS Assertions créées ✅
    ↓
xAPI Statements envoyés ✅
    ↓
??? [RUPTURE] ???
    ↓
Moteur CEREDIS standalone (isolé)
    ↓
PostgreSQL
```

**Problème** : Le moteur est **déconnecté** de l'application !

### FLUX CIBLE (Complet ✅)

```
Frontend (Next.js)
    ↓
Activity Completion
    ↓
Service Unifié ✅
    ├─→ PocketBase Evidences
    ├─→ CaSS Assertions
    └─→ xAPI Statements
    ↓
[AUTOMATIQUE]
    ↓
Moteur CEREDIS (intégré) ✅
    ├─→ Calcul score 0-600
    ├─→ Niveau CECRL
    └─→ Validation règles
    ↓
PostgreSQL + Cache
    ↓
API /api/ceredis/calculate ✅
    ↓
Frontend Dashboard ✅
```

**Solution** : Intégrer le moteur dans Next.js !

---

## 🎯 CE QU'IL FAUT FAIRE

### Objectif

**Porter le moteur CEREDIS dans l'application Next.js**

### Actions

1. **Créer** `/services/ceredis-calculator/`
   - Porter les 6 modules en TypeScript
   - Adapter la config
   - Point d'entrée unifié

2. **Créer** `/app/api/ceredis/calculate/route.ts`
   - API REST pour calculer les scores
   - Connexion PocketBase
   - Sauvegarde PostgreSQL

3. **Créer** `/lib/ceredis/`
   - Client pour appeler l'API
   - Hook React `useCeredisScore()`
   - Helpers frontend

4. **Intégrer** dans le dashboard
   - Afficher score CEREDIS
   - Afficher niveau CECRL
   - Radar 5 domaines

---

## 📈 BÉNÉFICES

### Avant (Situation actuelle)

❌ Moteur isolé, inutilisable
❌ Pas de scores dans l'app
❌ Dashboard vide
❌ 2 applications séparées
❌ Maintenance compliquée

### Après (Avec intégration)

✅ Moteur intégré dans Next.js
✅ Scores accessibles via API
✅ Dashboard complet
✅ 1 seule application
✅ Maintenance simple
✅ Type-safe TypeScript
✅ Cache & optimisations
✅ Tests intégrés

---

## ⏱️ ESTIMATION

### Temps requis

| Phase | Tâche | Durée |
|-------|-------|-------|
| 1 | Porter moteur en TypeScript | 3-4h |
| 2 | Créer API Route | 1h |
| 3 | Client frontend | 1h |
| 4 | PostgreSQL persistence | 1h |
| 5 | Tests | 2h |
| **TOTAL** | | **8-9h** |

### Ordre recommandé

1. **Aujourd'hui** : Terminer Phase 2 composants (3 restants)
2. **Demain** : Intégrer moteur CEREDIS (Phase 1-3)
3. **Après-demain** : Finaliser persistence + tests (Phase 4-5)

---

## 🎓 RAPPEL : PHASE A

**Phase A (Moteur CEREDIS)** était marquée comme "✅ Complétée" dans nos notes.

**Mais** : "Complétée" signifiait :
- ✅ Moteur développé
- ✅ Tests validés
- ✅ Configuration définie
- ❌ **PAS intégré dans l'app**

**Donc** : Phase A est "complétée" en tant que **moteur standalone**, mais **pas intégrée** dans Next.js.

---

## 📋 CHECKLIST

### Ce qui fonctionne maintenant

- [x] Moteur CEREDIS standalone
- [x] Configuration complète
- [x] Tests validation
- [x] CLI fonctionnel
- [x] Service unifié (PB+CaSS+xAPI)
- [x] Types harmonisés
- [x] Hook useActivityTracking
- [x] 3/6 composants mis à jour

### Ce qui manque

- [ ] Moteur intégré dans Next.js
- [ ] API /api/ceredis/calculate
- [ ] Client frontend
- [ ] Hooks React
- [ ] Dashboard scores
- [ ] Calcul automatique
- [ ] Cache résultats

---

## 🚀 ACTION IMMÉDIATE

**Consulter** : `PLAN_INTEGRATION_MOTEUR_CEREDIS.md`

Ce document contient :
- ✅ Plan détaillé étape par étape
- ✅ Code complet à copier-coller
- ✅ Structure cible
- ✅ Types TypeScript
- ✅ API Routes
- ✅ Hooks React
- ✅ Tests

**Durée estimée** : 1 journée de travail

---

## 💡 CONCLUSION

Le moteur CEREDIS **existe et fonctionne**, mais il est **isolé** de l'application Next.js.

**Solution** : Le porter en TypeScript et l'intégrer dans l'app.

**Bénéfice** : Pipeline E2E complet de l'activité au score CEREDIS !

```
Activité → Tracking → Evidences → Moteur → Score → Dashboard
                         ✅         ❌       ❌      ❌
                      (existe)  (manque)(manque)(manque)
```

**Après intégration** :

```
Activité → Tracking → Evidences → Moteur → Score → Dashboard
                         ✅         ✅       ✅      ✅
```

---

**Date** : 2026-01-12  
**Urgence** : Haute (bloque dashboard et analytics)  
**Difficulté** : Moyenne (code existe, juste à porter)  
**Impact** : ⭐⭐⭐⭐⭐ (Pipeline complet !)
