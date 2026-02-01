# 📚 Index de la Documentation

## Vue d'Ensemble

Cette documentation complète décrit l'architecture, l'implémentation et l'utilisation du projet **"Chansons Françaises Learner"**, une plateforme d'apprentissage du français langue étrangère (FLE) basée sur les chansons françaises.

---

## 📋 Documents Principaux

### 1. **SYNTHESE_PROJET_COMPLET.md** 🌟

**Résumé** : Vue d'ensemble complète du projet, état d'avancement, architecture technique et prochaines étapes.

**Contient** :
- État d'avancement des phases 1, 2 et 2.5
- Architecture globale de l'écosystème
- Référentiel CEREDIS (5 domaines, 19 compétences)
- Flux opérationnels complets
- Métriques de succès
- Plan de développement mis à jour

**À lire pour** : Comprendre l'état actuel du projet et la vision globale

---

### 2. **ARCHITECTURE_INTEGRATION_CASS_XAPI.md** 🏗️

**Résumé** : Spécifications techniques détaillées de l'intégration CaSS (Competency and Skills System) et xAPI (Learning Record Store).

**Contient** :
- Architecture de l'écosystème (6 systèmes interconnectés)
- Flux de données détaillés (apprentissage, évaluation, analytics)
- Référentiel CEREDIS dans CaSS
- Mapping activités → compétences
- Services d'intégration créés
- Configuration Grafana et Superset
- Tests et validation

**À lire pour** : Comprendre l'architecture technique et l'intégration des systèmes

---

### 3. **GUIDE_DEMARRAGE_RAPIDE.md** 🚀

**Résumé** : Guide pratique pour démarrer l'intégration CaSS & xAPI dans le frontend.

**Contient** :
- Configuration en 15 minutes
- Test de connexion
- Premier composant React (exemple QCM)
- Dashboard apprenant
- Dépannage
- Checklist finale

**À lire pour** : Commencer rapidement l'implémentation dans le frontend

---

## 📁 Documents de Référence (Uploads)

### 4. **RÉFÉRENTIEL_CEREDIS___VERSION_CANONIQUE_CaSS.md**

**Résumé** : Référentiel complet des compétences CEREDIS aligné sur le CECRL.

**Contient** :
- Définition des 5 domaines de compétences
- Domaine 5 (Métalinguistique & Métacognitif) : 7 compétences détaillées
- Description officielle de chaque compétence
- Critères de maîtrise
- Évidences acceptées
- Contextes typiques d'application

---

### 5. **CADRAGE_CONCEPTUEL_DE_RÉFÉRENCE.md**

**Résumé** : Fondements théoriques et positionnement scientifique du projet CEREDIS.

**Contient** :
- Position vis-à-vis du CECRL
- Modèle théorique tripolaire (oral, écrit, métacognition)
- Thèse centrale de la métacognition linguistique
- Exemple canonique : "Né en 17 à Leidenstadt"
- Justification du Domaine 5
- Articulation actionnelle + métacognitive

---

### 6. **__MATRICE_OPÉRATIONNELLE.md**

**Résumé** : Matrice de correspondance entre chansons, notions linguistiques et compétences CEREDIS.

**Contient** :
- Mapping détaillé pour 11 chansons Goldman
- Notions linguistiques clés par chanson
- Compétences Domaine 5 mobilisées
- Niveaux CECRL associés
- Règles d'usage pour Claude AI (implémentation)

---

### 7. **__MAPPING_OPÉRATIONNEL_FINAL.md**

**Résumé** : Règles opérationnelles de mapping entre activités pédagogiques, preuves CaSS et évaluations.

**Contient** :
- Principe directeur (preuve explicite obligatoire)
- Typologie des 4 familles d'activités CEREDIS
- Mapping détaillé par type d'activité (A1, A2, A3, A4)
- Règles globales d'évaluation
- Règles de cohérence et de progressivité CECRL
- Instructions d'implémentation pour CaSS

---

## 💻 Documentation Technique

### 8. **src/services/integration/README.md**

**Résumé** : Documentation complète des services d'intégration CaSS et xAPI.

**Contient** :
- Architecture des services
- Usage de `IntegrationService` (recommandé)
- Usage de `CassService` et `XApiService` (direct)
- Mapping activités → compétences
- Compétences du Domaine 5
- Exemples de code
- Debug et gestion des erreurs
- Règles de validation

---

## 🗂️ Structure de la Documentation

```
docs/
├── SYNTHESE_PROJET_COMPLET.md          # ⭐ Vue d'ensemble
├── ARCHITECTURE_INTEGRATION_CASS_XAPI.md # 🏗️ Architecture technique
├── GUIDE_DEMARRAGE_RAPIDE.md           # 🚀 Guide pratique
└── README.md                           # 📚 Ce fichier

uploads/ (Documents de référence)
├── RÉFÉRENTIEL_CEREDIS___VERSION_CANONIQUE_CaSS.md
├── CADRAGE_CONCEPTUEL_DE_RÉFÉRENCE.md
├── __MATRICE_OPÉRATIONNELLE.md
└── __MAPPING_OPÉRATIONNEL_FINAL.md

src/services/integration/
└── README.md                           # Documentation des services
```

---

## 🎯 Parcours de Lecture Recommandé

### Pour les Développeurs

1. **Débutant** (Comprendre le projet) :
   - `SYNTHESE_PROJET_COMPLET.md`
   - `GUIDE_DEMARRAGE_RAPIDE.md`

2. **Intermédiaire** (Implémenter) :
   - `src/services/integration/README.md`
   - `ARCHITECTURE_INTEGRATION_CASS_XAPI.md`

3. **Avancé** (Architecture complète) :
   - `__MAPPING_OPÉRATIONNEL_FINAL.md`
   - `__MATRICE_OPÉRATIONNELLE.md`

### Pour les Chercheurs / Pédagogues

1. **Fondements Théoriques** :
   - `CADRAGE_CONCEPTUEL_DE_RÉFÉRENCE.md`
   - `RÉFÉRENTIEL_CEREDIS___VERSION_CANONIQUE_CaSS.md`

2. **Application Pratique** :
   - `__MATRICE_OPÉRATIONNELLE.md`
   - `__MAPPING_OPÉRATIONNEL_FINAL.md`

3. **Implémentation Technique** :
   - `ARCHITECTURE_INTEGRATION_CASS_XAPI.md`

---

## 🔑 Concepts Clés

### Référentiel CEREDIS

Le référentiel CEREDIS enrichit le CECRL avec un **Domaine 5 (Métalinguistique & Métacognitif)** comprenant 7 compétences spécifiques qui permettent aux apprenants de développer une conscience linguistique explicite.

### Architecture d'Intégration

L'architecture connecte **6 systèmes** :
1. Frontend (React)
2. PocketBase (BDD)
3. CaSS (Compétences)
4. LRS Ralph (xAPI)
5. Grafana (Analytics)
6. Superset (BI)

### Mapping Automatique

Chaque activité pédagogique est **automatiquement mappée** à des compétences CEREDIS, créant des assertions dans CaSS et des statements xAPI dans le LRS.

---

## 📊 Statistiques du Projet

| Catégorie | Nombre |
|-----------|--------|
| **Contenu Pédagogique** | |
| Parcours complets | 3 |
| Séances totales | 15 |
| Écrans pédagogiques | 102 |
| Points d'activités | 1,605 |
| **Référentiel** | |
| Domaines de compétences | 5 |
| Compétences totales | 19 |
| Compétences métalinguistiques | 7 |
| **Technique** | |
| Services PocketBase | 7 |
| Services d'intégration | 4 |
| Lignes de code (Phase 2 + 2.5) | ~12,200 |
| Documents de documentation | 8 |

---

## 🔗 Liens Utiles

### Instances Déployées

- **PocketBase** : https://pocketbase-songs.ceredis.net
- **CaSS** : https://cass.ceredis.net
- **LRS Ralph** : https://lrs.ceredis.net
- **Grafana** : https://analytics.ceredis.net (à configurer)
- **Superset** : https://reports.ceredis.net (à configurer)

### Documentation Externe

- [CaSS Editor](https://cassproject.github.io/cass-editor/)
- [xAPI Specification](https://github.com/adlnet/xAPI-Spec)
- [LRS Ralph](https://openfun.gitbooks.io/ralph/)
- [CECRL](https://www.coe.int/fr/web/common-european-framework-reference-languages)

---

## ✏️ Contribuer à la Documentation

Pour améliorer cette documentation :

1. Identifier les sections à clarifier
2. Proposer des ajouts ou corrections
3. Ajouter des exemples concrets
4. Enrichir les schémas et diagrammes

---

## 📞 Support

Pour toute question sur la documentation :

- **Technique** : Consulter `src/services/integration/README.md`
- **Conceptuel** : Consulter `CADRAGE_CONCEPTUEL_DE_RÉFÉRENCE.md`
- **Pratique** : Consulter `GUIDE_DEMARRAGE_RAPIDE.md`

---

**Dernière mise à jour** : 7 janvier 2026  
**Version** : 3.0  
**Statut** : 🟢 Documentation complète et à jour
