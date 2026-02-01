# Cahier des Charges - Application Multi-Chansons d'Apprentissage du Français

## 📋 Vue d'Ensemble du Projet

### 1.1 Vision du Projet
Créer une plateforme d'apprentissage interactive du français langue étrangère (FLE) s'appuyant sur un répertoire évolutif de chansons françaises. L'application offre une approche pédagogique intégrée combinant découverte musicale, analyse textuelle, et apprentissage systématique de la langue française.

### 1.2 Objectifs Stratégiques
- **Motivation**: Exploiter l'attractivité de la chanson française pour engager les apprenants
- **Apprentissage intégré**: Combiner tous les aspects de l'apprentissage linguistique dans une expérience cohérente
- **Évolutivité**: Permettre l'enrichissement continu du catalogue de chansons
- **Personnalisation**: Adapter le parcours selon le profil et les progrès de chaque apprenant
- **Traçabilité**: Suivre finement les compétences développées via Learning Analytics

---

## 👥 Public Cible et Contexte d'Usage

### 2.1 Apprenants Cibles
- **Niveau**: A2 à C1 du CECRL
- **Âge**: Adolescents (15+) et adultes
- **Contexte**: Enseignement formel (écoles, universités, instituts de langues)
- **Prérequis**: Compréhension basique du français écrit et oral

### 2.2 Utilisateurs Enseignants
- Professeurs de FLE
- Formateurs en langues
- Capacité à enrichir le catalogue de chansons
- Accès aux analytics et progression des apprenants

### 2.3 Modalités d'Usage
- **Accès**: Via plateforme Moodle (LTI) ou accès direct web
- **Durée**: Sessions de 30-60 minutes
- **Fréquence**: 2-3 sessions par semaine recommandées
- **Dispositifs**: Desktop prioritaire, tablette supportée

---

## 🎯 Fonctionnalités Principales

### 3.1 Gestion du Catalogue de Chansons

#### 3.1.1 Bibliothèque de Chansons
```typescript
interface Chanson {
  id: string;
  titre: string;
  artiste: string;
  album?: string;
  annee: number;
  genre: string[];
  
  // Médias
  fichierAudio: string;
  pochette?: string;
  videoClip?: string;
  
  // Métadonnées pédagogiques
  niveauCECRL: 'A2' | 'B1' | 'B2' | 'C1';
  typeTexte: 'narratif' | 'descriptif' | 'argumentatif' | 'poétique';
  thematiques: string[];
  duree: number; // en secondes
  
  // Contenu linguistique
  paroles: LigneChanson[];
  analyse: AnalyseChanson;
  
  // Parcours pédagogique
  seances: Seance[];
  competencesCibles: string[];
  
  // Statut
  statut: 'brouillon' | 'publié' | 'archivé';
  dateCreation: Date;
  auteur: string; // enseignant créateur
}

interface LigneChanson {
  id: string;
  numero: number;
  texte: string;
  timestamp: number;
  annotations?: Annotation[];
}
```

#### 3.1.2 Fonctionnalités de Navigation
- **Catalogue principal**: Vue grille avec filtres multiples
  - Par artiste
  - Par niveau CECRL
  - Par type de texte
  - Par thématique
  - Par compétences travaillées
  
- **Recherche avancée**: Full-text sur titres, artistes, paroles
- **Suggestions personnalisées**: Basées sur niveau et intérêts
- **Parcours recommandés**: Séquences de chansons complémentaires

#### 3.1.3 Interface d'Administration (Enseignants)
- **Création de chanson**: Formulaire guidé
- **Import audio**: Avec détection automatique des métadonnées
- **Synchronisation paroles**: Outil de timestamping
- **Création de séances**: Builder de parcours pédagogiques
- **Validation**: Workflow de révision avant publication

### 3.2 Système de Séances Pédagogiques

#### 3.2.1 Structure d'une Séance
```typescript
interface Seance {
  id: string;
  chansonId: string;
  numero: number;
  titre: string;
  objectifs: ObjectifPedagogique[];
  dureeEstimee: number; // minutes
  
  ecrans: Ecran[];
  
  prerequis?: string[]; // IDs de séances
  suivantes?: string[]; // IDs de séances suggérées
}

interface Ecran {
  id: string;
  type: TypeEcran;
  titre: string;
  consigne: string;
  
  contenu: any; // Spécifique au type
  competences: string[];
  
  // Adaptation
  niveauDifficulte: 'facile' | 'moyen' | 'difficile';
  variantes?: EcranVariante[];
}

type TypeEcran = 
  | 'ecoute_decouverte'
  | 'comprehension_globale'
  | 'analyse_lexicale'
  | 'etude_grammaticale'
  | 'production_ecrite'
  | 'production_orale'
  | 'activite_ludique'
  | 'evaluation';
```

#### 3.2.2 Types d'Activités Pédagogiques

**A. Découverte et Compréhension**
- Première écoute libre avec questions ouvertes
- Écoute fragmentée avec exercices de compréhension
- Reconstruction de l'ordre des strophes
- QCM de compréhension globale
- Nuage de mots collaboratif (impressions)

**B. Analyse Textuelle**
- Identification du type de texte
- Repérage de la structure narrative/argumentative
- Analyse des personnages (textes narratifs/descriptifs)
- Étude des champs lexicaux
- Analyse des figures de style

**C. Grammaire et Conjugaison**
- Repérage et classification des temps verbaux
- Exercices de conjugaison contextualisés
- Étude des modes (indicatif, conditionnel, subjonctif)
- Analyse de la phrase complexe
- Exercices de transformation

**D. Vocabulaire et Orthographe**
- Définitions contextuelles
- Synonymes et antonymes
- Familles de mots
- Dictées ciblées sur passages
- Exercices d'orthographe grammaticale

**E. Production**
- Écriture créative (suite de l'histoire, variante)
- Commentaire composé guidé
- Enregistrement oral (lecture expressive)
- Débat interprétatif (forum)

**F. Activités Ludiques**
- Karaoké avec reconnaissance vocale
- Jeux de mots (anagrammes, mots croisés)
- Quiz chronométrés
- Défis collaboratifs

### 3.3 Système d'Adaptation Pédagogique

#### 3.3.1 Profil Apprenant
```typescript
interface ProfilApprenant {
  userId: string;
  
  // Niveau linguistique
  niveauCECRL: string;
  competences: Record<string, NiveauCompetence>;
  
  // Préférences
  genresMusicaux: string[];
  thematiquesInterets: string[];
  
  // Style d'apprentissage
  styleApprentissage: {
    visuel: number;    // 0-100
    auditif: number;
    kinesthesique: number;
  };
  
  // Historique
  chansonsEtudiees: string[];
  seancesCompletes: string[];
  tempsMoyenSeance: number;
  
  // Performances
  tauxReussite: number;
  pointsForts: string[];
  pointsAmeliorer: string[];
}
```

#### 3.3.2 Moteur d'Adaptation
- **Sélection de contenu**: Recommandation de chansons adaptées
- **Difficulté dynamique**: Ajustement des exercices selon performances
- **Parcours personnalisé**: Séquencement optimal des séances
- **Feedback adaptatif**: Messages personnalisés selon profil
- **Aide contextuelle**: Niveau d'aide selon besoin détecté

### 3.4 Fonctionnalités Collaboratives

#### 3.4.1 Forum de Discussion
- **Organisation**: Un forum par chanson
- **Fonctionnalités**:
  - Création de topics thématiques
  - Réponses et discussions
  - Votes sur meilleures interprétations
  - Modération par enseignants
  
#### 3.4.2 Activités Collaboratives
- **Nuage de mots collectif**: Agrégation en temps réel
- **Annotations partagées**: Commentaires sur passages
- **Productions collectives**: Wiki d'analyse de chanson
- **Classements**: Leaderboards motivationnels

### 3.5 Système d'Évaluation

#### 3.5.1 Évaluation Formative
- Feedback immédiat sur exercices
- Correction automatique (QCM, exercices fermés)
- Suggestions d'amélioration
- Progression visualisée

#### 3.5.2 Évaluation Sommative
- Test de fin de chanson
- Commentaire composé noté
- Production orale évaluée
- Badges et certificats

---

## 🏗️ Architecture Technique

### 4.1 Stack Technologique

#### 4.1.1 Frontend
```
Next.js 14+ (App Router)
├── TypeScript 5+
├── Tailwind CSS 3+
├── shadcn/ui (composants)
├── Radix UI (primitives accessibles)
├── React Query (gestion état serveur)
├── Zustand (état client léger)
├── Web Speech API (reconnaissance vocale)
├── Howler.js (audio avancé)
└── xAPI (tracking d'événements)
```

**Déploiement**: Vercel avec CI/CD automatique

#### 4.1.2 Backend
```
PocketBase
├── SQLite (base de données)
├── API REST auto-générée
├── Authentification intégrée
├── File storage
├── Real-time subscriptions
└── Hooks personnalisables
```

**Déploiement**: Coolify (auto-hébergé)

#### 4.1.3 Analytics et Compétences
```
Learning Analytics Stack
├── LRS Ralph (stockage xAPI)
├── Superset (dashboards)
├── Grafana (monitoring temps réel)
└── CaSS (référentiel compétences)
```

#### 4.1.4 Intégration LMS
```
LTI 1.3 (Learning Tools Interoperability)
└── Moodle integration
```

### 4.2 Architecture Système

```
┌─────────────────────────────────────────────┐
│           Frontend Next.js (Vercel)         │
│  ┌────────┐  ┌────────┐  ┌──────────────┐  │
│  │ Pages  │  │Components│ │ Web Speech  │  │
│  └────────┘  └────────┘  └──────────────┘  │
│  ┌────────────────────────────────────────┐ │
│  │      State Management (Zustand)        │ │
│  └────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
┌───────▼──────┐   ┌─────────▼────────┐
│  PocketBase  │   │   xAPI Events    │
│  (Coolify)   │   │                  │
│              │   │  ┌────────────┐  │
│ ┌──────────┐ │   │  │ LRS Ralph │  │
│ │ Users    │ │   │  └─────┬──────┘  │
│ │ Chansons │ │   │        │         │
│ │ Seances  │ │   │  ┌─────▼──────┐  │
│ │ Progress │ │   │  │  Superset  │  │
│ └──────────┘ │   │  │  Grafana   │  │
└──────────────┘   │  └────────────┘  │
                   │                  │
┌──────────────┐   │  ┌────────────┐  │
│    CaSS      │◄──┘  │  Moodle    │  │
│ Compétences  │      │ (via LTI)  │  │
└──────────────┘      └────────────┘  │
                      └────────────────┘
```

### 4.3 Modèle de Données PocketBase

#### 4.3.1 Collections Principales

```javascript
// Collection: chansons
{
  id: string (auto),
  titre: string (required),
  artiste: string (required),
  album: string,
  annee: number,
  genre: string[] (select multiple),
  
  // Médias (files)
  audio: file (required, .mp3/.m4a),
  pochette: file (.jpg/.png),
  video: url,
  
  // Métadonnées
  niveau_cecrl: string (select: A2/B1/B2/C1),
  type_texte: string (select),
  thematiques: string[] (relation),
  duree: number,
  
  // Contenu
  paroles: json (LigneChanson[]),
  analyse: json,
  
  // Relations
  seances: relation (seances, multiple),
  competences: relation (competences, multiple),
  
  // Meta
  statut: string (select: brouillon/publié/archivé),
  auteur: relation (users),
  created: datetime (auto),
  updated: datetime (auto)
}

// Collection: seances
{
  id: string (auto),
  chanson: relation (chansons, required),
  numero: number (required),
  titre: string (required),
  
  objectifs: json (ObjectifPedagogique[]),
  duree_estimee: number,
  
  ecrans: json (Ecran[]),
  
  prerequis: relation (seances, multiple),
  suivantes: relation (seances, multiple),
  
  competences: relation (competences, multiple)
}

// Collection: users
{
  id: string (auto),
  email: string (required, unique),
  nom: string,
  prenom: string,
  role: string (select: apprenant/enseignant/admin),
  
  // Profil apprenant
  niveau_cecrl: string,
  profil: json (ProfilApprenant),
  
  // LTI
  lti_user_id: string (indexed),
  lti_context_id: string,
  
  // Moodle sync
  moodle_user_id: number,
  
  created: datetime (auto),
  updated: datetime (auto)
}

// Collection: progression_utilisateur
{
  id: string (auto),
  user: relation (users, required),
  chanson: relation (chansons, required),
  seance: relation (seances, required),
  
  statut: string (select: non_commencé/en_cours/terminé),
  progression: number (0-100),
  
  temps_passe: number (seconds),
  date_debut: datetime,
  date_fin: datetime,
  
  resultats: json (scores par écran),
  
  created: datetime (auto),
  updated: datetime (auto)
}

// Collection: reponses_activites
{
  id: string (auto),
  user: relation (users, required),
  seance: relation (seances, required),
  ecran_id: string (required),
  
  type_activite: string,
  reponse: json,
  score: number,
  feedback: string,
  
  temps_reponse: number (seconds),
  tentatives: number,
  
  created: datetime (auto)
}

// Collection: competences
{
  id: string (auto),
  code: string (unique, ex: "GRAM_PASSE_COMPOSE"),
  nom: string (required),
  description: text,
  
  categorie: string (select: grammaire/vocabulaire/oral/écrit),
  niveau_cecrl: string,
  
  // CaSS integration
  cass_uri: string,
  
  parent: relation (competences), // hiérarchie
  enfants: relation (competences, multiple)
}

// Collection: evaluation_competences
{
  id: string (auto),
  user: relation (users, required),
  competence: relation (competences, required),
  
  niveau_actuel: number (0-100),
  niveau_precedent: number,
  
  evidences: json (liste d'activités réalisées),
  
  derniere_evaluation: datetime,
  
  created: datetime (auto),
  updated: datetime (auto)
}

// Collection: annotations
{
  id: string (auto),
  user: relation (users, required),
  chanson: relation (chansons, required),
  ligne_id: string (required),
  
  type: string (select: note/question/explication),
  contenu: text,
  partage: bool (default: false),
  
  created: datetime (auto),
  updated: datetime (auto)
}

// Collection: forum_topics
{
  id: string (auto),
  chanson: relation (chansons, required),
  auteur: relation (users, required),
  
  titre: string (required),
  contenu: text (required),
  
  epingle: bool (default: false),
  resolu: bool (default: false),
  
  vues: number (default: 0),
  
  created: datetime (auto),
  updated: datetime (auto)
}

// Collection: forum_posts
{
  id: string (auto),
  topic: relation (forum_topics, required),
  auteur: relation (users, required),
  
  contenu: text (required),
  
  parent: relation (forum_posts), // pour les réponses
  
  votes: number (default: 0),
  
  created: datetime (auto),
  updated: datetime (auto)
}
```

#### 4.3.2 Relations et Indexes

**Indexes recommandés**:
- `users.lti_user_id` (unique)
- `progression_utilisateur (user, chanson, seance)` (composite)
- `reponses_activites (user, seance)` (composite)
- `evaluation_competences (user, competence)` (unique composite)

**Hooks PocketBase**:
- `onRecordAfterCreateRequest` sur `reponses_activites` → trigger xAPI event
- `onRecordAfterUpdateRequest` sur `progression_utilisateur` → mise à jour compétences
- `onRecordAfterCreateRequest` sur `users` → création profil initial

---

## 📱 Parcours Utilisateur

### 5.1 Parcours Apprenant

#### 5.1.1 Première Connexion
1. **Authentification** (via LTI depuis Moodle ou directe)
2. **Onboarding**:
   - Test de niveau (optionnel)
   - Sélection des intérêts musicaux
   - Questionnaire style d'apprentissage
   - Tutoriel interactif
3. **Tableau de bord personnalisé**

#### 5.1.2 Sélection de Chanson
```
Catalogue
├── Vue grille avec filtres
├── Suggestions personnalisées (4-6 chansons)
├── Parcours recommandés
│   └── Ex: "Chansons narratives niveau B1"
└── Recherche avancée

Fiche Chanson
├── Aperçu audio (30 sec)
├── Métadonnées (artiste, année, genre)
├── Niveau et type de texte
├── Compétences travaillées (badges)
├── Nombre de séances
├── Temps estimé total
├── Avis et notes (optionnel)
└── Bouton "Commencer"
```

#### 5.1.3 Déroulement d'une Séance

**Navigation séquentielle avec déblocage progressif**:

```
Séance X - [Titre]
│
├── Écran 0: Introduction
│   ├── Objectifs de la séance
│   ├── Compétences travaillées
│   └── Durée estimée
│
├── Écran 1: [Type d'activité]
│   ├── Consigne claire
│   ├── Activité interactive
│   ├── Feedback immédiat
│   ├── Aide contextuelle (?)
│   └── Progression (X/N)
│
├── Écran 2: [Type d'activité]
│   └── ... (idem)
│
├── ...
│
└── Écran N: Bilan de séance
    ├── Récapitulatif des points clés
    ├── Score global
    ├── Compétences développées
    ├── Prochaine séance suggérée
    └── Retour au catalogue
```

**Fonctionnalités transversales**:
- **Barre de progression** toujours visible
- **Menu latéral**: 
  - Pause/Reprendre
  - Paroles complètes
  - Notes personnelles
  - Aide
  - Quitter (sauvegarde auto)
- **Lecteur audio** persistant (bas de page)

#### 5.1.4 Tableau de Bord Apprenant
```
Mon Espace
├── Progression globale
│   ├── Niveau CECRL actuel
│   ├── Chansons étudiées (X/total)
│   ├── Temps d'apprentissage
│   └── Badges obtenus
│
├── Mes Chansons
│   ├── En cours (3)
│   ├── Terminées (7)
│   └── Sauvegardées (5)
│
├── Mes Compétences
│   ├── Radar chart des compétences
│   ├── Points forts
│   └── Points à améliorer
│
├── Mes Productions
│   ├── Textes écrits
│   ├── Enregistrements audio
│   └── Annotations
│
└── Mes Interactions
    ├── Posts forum (12)
    ├── Annotations partagées (8)
    └── Activités collaboratives
```

### 5.2 Parcours Enseignant

#### 5.2.1 Tableau de Bord Enseignant
```
Espace Enseignant
├── Mes Cours
│   ├── Liste des classes/groupes Moodle
│   └── Progression des apprenants
│
├── Catalogue de Chansons
│   ├── Chansons publiques (consulter)
│   ├── Mes chansons (éditer)
│   └── Créer nouvelle chanson
│
├── Analytics
│   ├── Vue d'ensemble (tous apprenants)
│   ├── Par apprenant
│   ├── Par chanson
│   └── Par compétence
│
├── Modération
│   ├── Forum (signalements)
│   ├── Annotations partagées
│   └── Productions à évaluer
│
└── Ressources
    ├── Guide pédagogique
    ├── Tutoriels vidéo
    └── Communauté enseignants
```

#### 5.2.2 Création de Chanson - Workflow

**Étape 1: Informations de base**
- Titre, artiste, album, année
- Upload fichier audio (validation format/qualité)
- Upload pochette (optionnel)
- Lien vidéo YouTube (optionnel)

**Étape 2: Métadonnées pédagogiques**
- Niveau CECRL (requis)
- Type de texte (requis)
- Genre musical (tags multiples)
- Thématiques (suggestions auto)
- Durée (auto-détectée)

**Étape 3: Saisie et synchronisation des paroles**
```
Interface de synchronisation
├── Lecteur audio avec waveform
├── Éditeur de paroles (Markdown)
├── Découpage en lignes/strophes
├── Outil de timestamping
│   ├── Clic sur ligne + Play → marque timestamp
│   ├── Raccourcis clavier
│   └── Ajustement fin (±0.1s)
├── Prévisualisation synchronisée
└── Validation (au moins 80% des lignes timestampées)
```

**Étape 4: Annotations linguistiques (assistées IA)**
```
Analyse automatique suggérée
├── Détection des temps verbaux
├── Identification des structures grammaticales
├── Extraction vocabulaire-clé
├── Suggestions de champs lexicaux
└── → Enseignant valide/corrige
```

**Étape 5: Création des séances**
```
Builder de séances (drag & drop)
├── Bibliothèque de templates d'écrans
│   ├── Découverte (6 types)
│   ├── Compréhension (8 types)
│   ├── Analyse (10 types)
│   ├── Production (6 types)
│   └── Évaluation (4 types)
│
├── Personnalisation par écran
│   ├── Modification de la consigne
│   ├── Ajustement du contenu
│   ├── Sélection des extraits audio
│   ├── Choix des compétences ciblées
│   └── Paramétrage de la difficulté
│
└── Prévisualisation en temps réel
```

**Étape 6: Révision et publication**
- Vérification checklist qualité
- Test de la chanson complète
- Publication (brouillon → publié)
- Partage avec communauté (optionnel)

---

## 🎓 Système Pédagogique Détaillé

### 6.1 Référentiel de Compétences

#### 6.1.1 Architecture Hiérarchique CaSS

```
Compétences FLE
│
├── ORAL
│   ├── Compréhension orale (CO)
│   │   ├── CO_GLOBALE (comprendre l'essentiel)
│   │   ├── CO_DETAILLEE (comprendre les détails)
│   │   └── CO_IMPLICITE (comprendre l'implicite)
│   │
│   └── Production orale (PO)
│       ├── PO_LECTURE (lire à voix haute)
│       ├── PO_RECITATION (réciter)
│       └── PO_INTERPRETATION (interpréter)
│
├── ÉCRIT
│   ├── Compréhension écrite (CE)
│   │   ├── CE_LITTERALE (comprendre le sens littéral)
│   │   ├── CE_INFERENTIELLE (faire des inférences)
│   │   └── CE_CRITIQUE (analyser et critiquer)
│   │
│   └── Production écrite (PE)
│       ├── PE_CREATIVE (écriture créative)
│       ├── PE_ANALYTIQUE (commentaire, analyse)
│       └── PE_ARGUMENTATIVE (argumentation)
│
├── GRAMMAIRE
│   ├── Conjugaison (CONJ)
│   │   ├── CONJ_PRESENT
│   │   ├── CONJ_PASSE_COMPOSE
│   │   ├── CONJ_IMPARFAIT
│   │   ├── CONJ_PLUS_QUE_PARFAIT
│   │   ├── CONJ_CONDITIONNEL
│   │   └── CONJ_SUBJONCTIF
│   │
│   ├── Syntaxe (SYNT)
│   │   ├── SYNT_PHRASE_SIMPLE
│   │   ├── SYNT_PHRASE_COMPLEXE
│   │   ├── SYNT_SUBORDINATION
│   │   └── SYNT_COORDINATION
│   │
│   └── Morphologie (MORPH)
│       ├── MORPH_ACCORDS
│       └── MORPH_DERIVATION
│
├── VOCABULAIRE (VOC)
│   ├── VOC_THEMATIQUE (vocabulaire par thème)
│   ├── VOC_STYLISTIQUE (registres de langue)
│   ├── VOC_FIGURES (figures de style)
│   └── VOC_CONTEXTUEL (sens en contexte)
│
└── ORTHOGRAPHE (ORTH)
    ├── ORTH_GRAMMATICALE (accords, etc.)
    ├── ORTH_LEXICALE (mots invariables, etc.)
    └── ORTH_PONCTUATION
```

#### 6.1.2 Mapping Activités → Compétences

```typescript
// Exemple pour une activité de compréhension
{
  ecranId: "seance1_ecran3",
  typeActivite: "qcm_comprehension",
  competencesPrincipales: [
    { code: "CO_GLOBALE", poids: 0.7 },
    { code: "CE_LITTERALE", poids: 0.3 }
  ],
  competencesSecondaires: [
    { code: "VOC_CONTEXTUEL", poids: 0.2 }
  ],
  // Critères de réussite
  seuilValidation: 0.7, // 70% de bonnes réponses
  impactNiveau: {
    excellent: +5,  // ≥90%
    bon: +3,        // 70-89%
    moyen: +1,      // 50-69%
    faible: -1      // <50%
  }
}
```

### 6.2 Modèle d'Adaptation

#### 6.2.1 Diagnostic Initial
```typescript
interface DiagnosticInitial {
  // Test de niveau global
  testNiveau: {
    comprehensionOrale: Score;
    comprehensionEcrite: Score;
    grammaire: Score;
    vocabulaire: Score;
    → niveauCECRL: 'A2' | 'B1' | 'B2' | 'C1';
  };
  
  // Questionnaire style d'apprentissage (VARK)
  styleApprentissage: {
    visuel: number;      // préférence images, graphiques
    auditif: number;     // préférence écoute, discussion
    lecture: number;     // préférence lecture, textes
    kinesthesique: number; // préférence activités pratiques
  };
  
  // Préférences musicales
  genresMusicaux: string[];
  artistesPreferences: string[];
  thematiquesCentre: string[];
}
```

#### 6.2.2 Moteur de Recommandation

**Algorithme de sélection de chansons**:
```python
def recommander_chansons(user_profile, n=6):
    chansons_candidates = filtrer_par_niveau(user_profile.niveau)
    
    scores = []
    for chanson in chansons_candidates:
        score = (
            0.3 * similarite_genre(chanson, user_profile.genres) +
            0.3 * pertinence_competences(chanson, user_profile.lacunes) +
            0.2 * nouveaute(chanson, user_profile.historique) +
            0.1 * popularite(chanson) +
            0.1 * diversite(chanson, scores_precedents)
        )
        scores.append((chanson, score))
    
    return trier_et_limiter(scores, n)
```

**Ajustement dynamique de difficulté**:
```typescript
function ajusterDifficulte(
  ecran: Ecran,
  userPerformance: Performance
): Ecran {
  const tauxReussite = userPerformance.tauxReussite;
  const tempsReponse = userPerformance.tempsReponse;
  
  if (tauxReussite > 0.85 && tempsReponse < tempsMoyen) {
    // Trop facile → augmenter difficulté
    return ecran.variantes.find(v => v.difficulte === 'difficile') || ecran;
  }
  
  if (tauxReussite < 0.5 || tempsReponse > tempsMoyen * 1.5) {
    // Trop difficile → diminuer difficulté
    return ecran.variantes.find(v => v.difficulte === 'facile') || ecran;
  }
  
  return ecran; // difficulté adaptée
}
```

### 6.3 Système de Feedback

#### 6.3.1 Feedback Immédiat (par activité)
```typescript
interface FeedbackActivite {
  // Résultat
  correct: boolean;
  score: number;
  
  // Explication
  explication: string; // pourquoi correct/incorrect
  indiceSupplementaire?: string;
  
  // Remediation
  ressourcesComplementaires?: Ressource[];
  exercicesSimilaires?: string[]; // IDs
  
  // Encouragement adapté au profil
  message: string; // personnalisé selon historique
  
  // Compétences impactées
  competencesValidees: string[];
  competencesATravailler: string[];
}
```

**Exemples de messages personnalisés**:
```typescript
const messagesEncouragement = {
  premiereReussite: "Excellent début ! 🎉",
  progressionReguliere: "Tu progresses bien, continue ! 💪",
  apresEchec: "Ne te décourage pas, tu vas y arriver ! 🌟",
  seriReussites: "Impressionnant ! Tu maîtrises cette compétence ! 🏆",
  perfectScore: "Sans faute ! Bravo champion ! 🥇"
};

function selectionnerMessage(
  user: ProfilApprenant,
  resultat: ResultatActivite
): string {
  const contexte = analyserContexte(user, resultat);
  // Logique de sélection selon profil et contexte
  return message;
}
```

#### 6.3.2 Bilan de Séance
```typescript
interface BilanSeance {
  // Résumé quantitatif
  scoreGlobal: number;
  tempsPasse: number;
  nbActivitesReussies: number;
  nbActivitesTotales: number;
  
  // Compétences
  competencesDeveloppees: {
    code: string;
    nom: string;
    niveauAvant: number;
    niveauApres: number;
    progression: number; // delta
  }[];
  
  // Points clés
  pointsForts: string[];
  pointsAmeliorer: string[];
  
  // Recommandations
  prochaineSuggere: {
    seance?: string;
    chanson?: string;
    raison: string;
  };
  
  // Ressources complémentaires
  fiches: Ressource[];
  exercices: Ressource[];
}
```

---

## 📊 Learning Analytics et xAPI

### 7.1 Événements xAPI Suivis

#### 7.1.1 Taxonomie des Verbes
```json
{
  "decouverte": [
    "accessed",      // a accédé à une chanson
    "listened",      // a écouté (tout ou partie)
    "viewed"         // a consulté les paroles
  ],
  
  "interaction": [
    "attempted",     // a tenté une activité
    "completed",     // a terminé une activité/séance
    "answered",      // a répondu à une question
    "interacted"     // a interagi (annotation, forum...)
  ],
  
  "evaluation": [
    "passed",        // a réussi (score ≥ seuil)
    "failed",        // a échoué
    "scored"         // a obtenu un score
  ],
  
  "production": [
    "wrote",         // a écrit un texte
    "recorded",      // a enregistré un audio
    "shared",        // a partagé une production
    "commented"      // a commenté
  ],
  
  "progression": [
    "progressed",    // a progressé dans une compétence
    "achieved",      // a atteint un objectif
    "mastered"       // a maîtrisé une compétence
  ]
}
```

#### 7.1.2 Exemples de Statements

**Écoute d'une chanson**:
```json
{
  "actor": {
    "mbox": "mailto:jean.dupont@example.com",
    "name": "Jean Dupont"
  },
  "verb": {
    "id": "http://activitystrea.ms/schema/1.0/listen",
    "display": { "fr-FR": "a écouté" }
  },
  "object": {
    "id": "https://app.fle-chansons.fr/chansons/le-coureur",
    "definition": {
      "type": "http://adlnet.gov/expapi/activities/media",
      "name": { "fr-FR": "Le coureur - Jean-Jacques Goldman" },
      "extensions": {
        "https://app.fle-chansons.fr/ext/artiste": "Jean-Jacques Goldman",
        "https://app.fle-chansons.fr/ext/duree": 245
      }
    }
  },
  "result": {
    "completion": true,
    "duration": "PT4M5S",
    "extensions": {
      "https://app.fle-chansons.fr/ext/ecoutes-anterieures": 2,
      "https://app.fle-chansons.fr/ext/pauses": 1
    }
  },
  "context": {
    "contextActivities": {
      "parent": [{
        "id": "https://app.fle-chansons.fr/seances/le-coureur/seance-1",
        "definition": {
          "type": "http://adlnet.gov/expapi/activities/lesson"
        }
      }]
    },
    "extensions": {
      "https://app.fle-chansons.fr/ext/niveau-cecrl": "B1",
      "https://app.fle-chansons.fr/ext/session-id": "sess_abc123"
    }
  },
  "timestamp": "2025-01-15T14:32:18Z"
}
```

**Réponse à un quiz**:
```json
{
  "actor": {
    "mbox": "mailto:jean.dupont@example.com",
    "name": "Jean Dupont"
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/answered",
    "display": { "fr-FR": "a répondu" }
  },
  "object": {
    "id": "https://app.fle-chansons.fr/activities/comprehension-qcm-123",
    "definition": {
      "type": "http://adlnet.gov/expapi/activities/cmi.interaction",
      "interactionType": "choice",
      "name": { "fr-FR": "Compréhension globale - Le coureur" },
      "description": { "fr-FR": "Dans la chanson, le narrateur..." },
      "choices": [
        { "id": "A", "description": { "fr-FR": "court sur une plage" } },
        { "id": "B", "description": { "fr-FR": "participe à une compétition" } },
        { "id": "C", "description": { "fr-FR": "entraîne d'autres coureurs" } }
      ],
      "correctResponsesPattern": ["A"]
    }
  },
  "result": {
    "score": { "scaled": 1.0, "raw": 1, "min": 0, "max": 1 },
    "success": true,
    "response": "A",
    "duration": "PT12S"
  },
  "context": {
    "contextActivities": {
      "parent": [{
        "id": "https://app.fle-chansons.fr/seances/le-coureur/seance-1/ecran-3"
      }],
      "grouping": [{
        "id": "https://app.fle-chansons.fr/competences/CO_GLOBALE"
      }]
    }
  },
  "timestamp": "2025-01-15T14:35:42Z"
}
```

**Progression dans une compétence**:
```json
{
  "actor": {
    "mbox": "mailto:jean.dupont@example.com",
    "name": "Jean Dupont"
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/progressed",
    "display": { "fr-FR": "a progressé" }
  },
  "object": {
    "id": "https://app.fle-chansons.fr/competences/CONJ_PASSE_COMPOSE",
    "definition": {
      "type": "http://adlnet.gov/expapi/activities/objective",
      "name": { "fr-FR": "Conjugaison - Passé Composé" }
    }
  },
  "result": {
    "score": {
      "scaled": 0.72,
      "raw": 72,
      "min": 0,
      "max": 100
    },
    "extensions": {
      "https://app.fle-chansons.fr/ext/niveau-precedent": 65,
      "https://app.fle-chansons.fr/ext/progression": 7,
      "https://app.fle-chansons.fr/ext/nb-evidences": 8
    }
  },
  "context": {
    "contextActivities": {
      "category": [{
        "id": "https://app.fle-chansons.fr/categories/competences"
      }]
    }
  },
  "timestamp": "2025-01-15T15:10:00Z"
}
```

### 7.2 Dashboards Superset

#### 7.2.1 Dashboard Enseignant - Vue d'Ensemble
```
┌─────────────────────────────────────────────────────────┐
│  📊 Vue d'Ensemble - Mes Apprenants                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Période: [Derniers 30 jours ▼]    Groupe: [Tous ▼]    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Actifs     │  │   Chansons   │  │ Temps moyen  │  │
│  │     42       │  │   étudiées   │  │   45 min     │  │
│  │   /50 (84%)  │  │      8       │  │  par séance  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Progression Moyenne par Compétence                │ │
│  │                                                     │ │
│  │    Compréhension orale    ████████░░ 82%          │ │
│  │    Compréhension écrite   ███████░░░ 75%          │ │
│  │    Grammaire              ██████░░░░ 68%          │ │
│  │    Vocabulaire            ████████░░ 80%          │ │
│  │    Production écrite      █████░░░░░ 55%          │ │
│  │    Production orale       ████░░░░░░ 48%          │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Top 5 Chansons les Plus Étudiées                  │ │
│  │  1. Le coureur (32 étudiants)                      │ │
│  │  2. Né en 17 à Leidenstadt (28)                    │ │
│  │  3. Comme toi (25)                                  │ │
│  │  4. La corrida (22)                                 │ │
│  │  5. Rouge (19)                                      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Apprenants Nécessitant une Attention              │ │
│  │  • Marie L. - Aucune activité depuis 14j           │ │
│  │  • Paul D. - Difficulté en grammaire (score <50%)  │ │
│  │  • Sophie M. - Temps excessif par activité         │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 7.2.2 Dashboard Enseignant - Apprenant Individuel
```
┌─────────────────────────────────────────────────────────┐
│  👤 Profil Apprenant - Jean Dupont                      │
├─────────────────────────────────────────────────────────┤
│  Niveau: B1  │  Inscrit depuis: 3 mois  │  Actif: ✅   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Radar des Compétences                             │ │
│  │                 CO (85)                             │ │
│  │                  /\                                 │ │
│  │                 /  \                                │ │
│  │          PO(52)/    \CE(78)                         │ │
│  │               /      \                              │ │
│  │              /   👤   \                             │ │
│  │             /          \                            │ │
│  │      ORTH(70)──────────GRAM(65)                    │ │
│  │             \          /                            │ │
│  │              \        /                             │ │
│  │               \      /                              │ │
│  │            PE(58)\  /VOC(82)                        │ │
│  │                   \/                                │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Historique d'Activité (30 derniers jours)         │ │
│  │  [Graphique ligne: sessions par jour]              │ │
│  │  Pics: Lun/Mer/Ven (pattern régulier)              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Chansons Étudiées (7)                             │ │
│  │  ✓ Le coureur - 4 séances - Score moyen: 78%       │ │
│  │  ⏳ Né en 17... - 2/4 séances - Score moyen: 72%   │ │
│  │  ✓ Comme toi - 4 séances - Score moyen: 85%        │ │
│  │  ...                                                │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Recommandations Pédagogiques                      │ │
│  │  • Renforcer: Production orale (52%)               │ │
│  │    → Suggérer activités karaoké                    │ │
│  │  • Consolider: Grammaire (65%)                     │ │
│  │    → Focus sur conjugaison subjonctif              │ │
│  │  • Maintenir: Vocabulaire (82%) - Excellent !      │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 7.2.3 Dashboard Apprenant
```
┌─────────────────────────────────────────────────────────┐
│  📈 Ma Progression                                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🎯 Niveau actuel: B1  │  🏆 Badges: 12/25              │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Progression vers B2                               │ │
│  │  ████████████████░░░░░░░░░░ 65%                    │ │
│  │  Plus que 35% pour débloquer le niveau B2 !        │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Mes Statistiques                                   │ │
│  │  ⏱️  Temps total: 18h 32min                         │ │
│  │  🎵 Chansons terminées: 7                           │ │
│  │  📝 Activités réussies: 142/178 (80%)               │ │
│  │  🔥 Série actuelle: 5 jours                         │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Mes Points Forts 💪                                │ │
│  │  • Vocabulaire (85%) - Excellent !                  │ │
│  │  • Compréhension orale (82%) - Très bien !          │ │
│  │  • Compréhension écrite (78%) - Bien !              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  À Travailler 📚                                    │ │
│  │  • Production orale (52%)                           │ │
│  │    → Essaie les exercices de karaoké !             │ │
│  │  • Production écrite (58%)                          │ │
│  │    → Continue les activités d'écriture créative    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Badges Récents 🏅                                  │ │
│  │  🎶 Mélomane (5 chansons terminées)                │ │
│  │  📖 Lecteur assidu (100 paroles lues)              │ │
│  │  ✍️  Écrivain en herbe (10 textes écrits)          │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Monitoring Grafana (Temps Réel)

#### 7.3.1 Dashboard Système
- Nombre d'utilisateurs connectés
- Requêtes API par minute
- Temps de réponse moyen
- Taux d'erreur
- Utilisation CPU/mémoire (PocketBase)
- Stockage audio/médias

#### 7.3.2 Dashboard Pédagogique
- Activités en cours (temps réel)
- Taux d'abandon par écran
- Temps moyen par type d'activité
- Taux de réussite global
- Alertes (apprenants en difficulté)

---

## 🔌 Intégrations

### 8.1 Intégration LTI 1.3 avec Moodle

#### 8.1.1 Configuration LTI

**Côté Moodle** (administrateur):
```php
// Configuration de l'outil externe
Tool Name: Application Chansons FLE
Tool URL: https://app.fle-chansons.fr/lti/launch
Public Key: [RSA public key]
Login Initiation URL: https://app.fle-chansons.fr/lti/login
Redirection URI(s): https://app.fle-chansons.fr/lti/callback

Services:
☑ IMS LTI Assignment and Grade Services
☑ IMS LTI Names and Role Provisioning Services
```

**Côté Application** (configuration):
```typescript
// config/lti.ts
export const ltiConfig = {
  platformUrl: process.env.MOODLE_URL,
  clientId: process.env.LTI_CLIENT_ID,
  authenticationEndpoint: `${process.env.MOODLE_URL}/mod/lti/auth.php`,
  accessTokenEndpoint: `${process.env.MOODLE_URL}/mod/lti/token.php`,
  keysetEndpoint: `${process.env.MOODLE_URL}/mod/lti/certs.php`,
  
  // Clés RSA
  privateKey: process.env.LTI_PRIVATE_KEY,
  publicKey: process.env.LTI_PUBLIC_KEY,
  
  // Services activés
  services: {
    namesAndRoles: true,
    assignments: true,
    grades: true
  }
};
```

#### 8.1.2 Flux LTI Launch

```typescript
// app/api/lti/launch/route.ts
import { NextRequest } from 'next/server';
import { validateLtiLaunch, createUserSession } from '@/lib/lti';

export async function POST(request: NextRequest) {
  try {
    // 1. Valider le JWT du launch
    const launchData = await validateLtiLaunch(request);
    
    // 2. Extraire les données utilisateur
    const {
      sub: ltiUserId,
      name,
      email,
      roles,
      context: {
        id: contextId,
        label: courseLabel
      }
    } = launchData;
    
    // 3. Créer/récupérer utilisateur dans PocketBase
    const user = await findOrCreateUser({
      ltiUserId,
      email,
      name,
      role: roles.includes('Instructor') ? 'enseignant' : 'apprenant',
      moodleContextId: contextId
    });
    
    // 4. Créer session utilisateur
    const session = await createUserSession(user);
    
    // 5. Rediriger vers l'application
    return Response.redirect(
      `${process.env.APP_URL}?session=${session.token}`
    );
    
  } catch (error) {
    console.error('LTI Launch Error:', error);
    return new Response('Launch failed', { status: 400 });
  }
}
```

#### 8.1.3 Synchronisation des Notes

```typescript
// lib/lti/grades.ts
import { Grade, LineItem } from '@/types/lti';

export async function publishGrade(
  userId: string,
  chansonId: string,
  score: number
): Promise<void> {
  // 1. Récupérer les infos LTI de l'utilisateur
  const userLti = await getUserLtiContext(userId);
  if (!userLti) return; // Pas de contexte LTI
  
  // 2. Obtenir ou créer le Line Item Moodle
  const lineItem = await getOrCreateLineItem({
    contextId: userLti.contextId,
    resourceId: `chanson-${chansonId}`,
    label: `Chanson: ${await getChansonTitle(chansonId)}`,
    scoreMaximum: 100
  });
  
  // 3. Publier le score
  await sendGrade({
    lineItemUrl: lineItem.id,
    userId: userLti.ltiUserId,
    scoreGiven: score,
    scoreMaximum: 100,
    activityProgress: 'Completed',
    gradingProgress: 'FullyGraded',
    timestamp: new Date().toISOString()
  });
  
  console.log(`Grade published to Moodle: ${score}/100 for user ${userId}`);
}

// Appelé automatiquement après complétion d'une chanson
export async function onChansonCompleted(
  userId: string,
  chansonId: string,
  results: SeanceResults[]
) {
  const scoreGlobal = calculateGlobalScore(results);
  await publishGrade(userId, chansonId, scoreGlobal);
}
```

### 8.2 Intégration CaSS

#### 8.2.1 Synchronisation du Référentiel

```typescript
// lib/cass/sync.ts
import { CassClient } from '@/lib/cass/client';

export async function syncCompetencesToCass() {
  const cassClient = new CassClient(process.env.CASS_URL);
  
  // 1. Récupérer les compétences locales (PocketBase)
  const competencesLocales = await pb.collection('competences').getFullList();
  
  for (const comp of competencesLocales) {
    // 2. Créer/mettre à jour dans CaSS
    const cassCompetency = {
      "@context": "http://schema.cassproject.org/0.3/",
      "@type": "Competency",
      "ceasn:competencyLabel": comp.nom,
      "ceasn:competencyText": comp.description,
      "schema:inLanguage": "fr",
      
      // Hiérarchie
      "ceasn:isChildOf": comp.parent ? 
        [{ "@id": comp.parent.cass_uri }] : undefined,
      
      // Métadonnées
      "schema:educationalLevel": comp.niveau_cecrl,
      "schema:keywords": [comp.categorie]
    };
    
    const savedComp = await cassClient.createCompetency(cassCompetency);
    
    // 3. Sauvegarder l'URI CaSS
    await pb.collection('competences').update(comp.id, {
      cass_uri: savedComp['@id']
    });
  }
  
  console.log(`${competencesLocales.length} compétences synchronisées avec CaSS`);
}
```

#### 8.2.2 Assertions de Compétences

```typescript
// lib/cass/assertions.ts
export async function createCompetencyAssertion(
  userId: string,
  competenceCode: string,
  level: number,
  evidence: Evidence[]
): Promise<void> {
  const cassClient = new CassClient(process.env.CASS_URL);
  
  // 1. Récupérer la compétence
  const competence = await pb.collection('competences')
    .getFirstListItem(`code="${competenceCode}"`);
  
  // 2. Créer l'assertion CaSS
  const assertion = {
    "@context": "http://schema.cassproject.org/0.3/",
    "@type": "Assertion",
    
    "schema:agent": {
      "@type": "Person",
      "@id": `mailto:${await getUserEmail(userId)}`
    },
    
    "ceasn:competency": {
      "@id": competence.cass_uri
    },
    
    "schema:dateCreated": new Date().toISOString(),
    
    "ceasn:level": level / 100, // normaliser 0-1
    
    "ceasn:evidence": evidence.map(e => ({
      "@type": "CreativeWork",
      "schema:name": e.nom,
      "schema:url": e.url,
      "schema:dateCreated": e.date
    }))
  };
  
  await cassClient.createAssertion(assertion);
  
  console.log(`Assertion créée pour ${competenceCode} - Niveau ${level}`);
}

// Appelé lors de la mise à jour d'une compétence
export async function onCompetenceEvaluated(
  userId: string,
  evaluation: EvaluationCompetence
) {
  // Collecter les preuves (activités réalisées)
  const evidences = await collectEvidences(userId, evaluation.competence);
  
  // Créer l'assertion CaSS
  await createCompetencyAssertion(
    userId,
    evaluation.competence.code,
    evaluation.niveau_actuel,
    evidences
  );
}
```

### 8.3 Web Speech API

#### 8.3.1 Reconnaissance Vocale (Karaoké)

```typescript
// components/activities/Karaoke.tsx
import { useEffect, useRef, useState } from 'react';

export function KaraokeActivity({ paroles }: { paroles: LigneChanson[] }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Initialiser Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = 
        window.SpeechRecognition || window.webkitSpeechRecognition;
      
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'fr-FR';
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          // Comparer avec la ligne attendue
          const expected = paroles[currentLine].texte;
          const similarity = calculateSimilarity(transcriptResult, expected);
          
          // Feedback visuel
          highlightLine(currentLine, similarity > 0.7);
          
          // Passer à la ligne suivante
          if (similarity > 0.5) {
            setCurrentLine(prev => prev + 1);
          }
        }
        
        setTranscript(transcriptResult);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      recognitionRef.current?.stop();
    };
  }, [paroles, currentLine]);
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };
  
  return (
    <div className="karaoke-container">
      <div className="lyrics">
        {paroles.map((ligne, index) => (
          <p
            key={ligne.id}
            className={cn(
              'text-2xl transition-all',
              index === currentLine && 'text-primary font-bold scale-110',
              index < currentLine && 'text-muted-foreground opacity-50'
            )}
          >
            {ligne.texte}
          </p>
        ))}
      </div>
      
      <div className="controls">
        <Button
          size="lg"
          onClick={toggleListening}
          variant={isListening ? 'destructive' : 'default'}
        >
          {isListening ? (
            <>
              <MicOff className="mr-2" />
              Arrêter
            </>
          ) : (
            <>
              <Mic className="mr-2" />
              Commencer
            </>
          )}
        </Button>
        
        <p className="mt-4 text-sm text-muted-foreground">
          {transcript || 'Cliquez sur "Commencer" et chantez !'}
        </p>
      </div>
    </div>
  );
}

function calculateSimilarity(text1: string, text2: string): number {
  // Algorithme de Levenshtein distance normalisée
  // ... implémentation
  return similarity;
}
```

#### 8.3.2 Synthèse Vocale (Lecture des Paroles)

```typescript
// components/features/TextToSpeech.tsx
export function TextToSpeech({ text }: { text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1.0);
  
  const speak = () => {
    if ('speechSynthesis' in window) {
      // Arrêter si déjà en cours
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = rate;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      // Sélectionner une voix française
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={isSpeaking ? stop : speak}
      >
        {isSpeaking ? (
          <><Square className="mr-2 h-4 w-4" /> Arrêter</>
        ) : (
          <><Volume2 className="mr-2 h-4 w-4" /> Écouter</>
        )}
      </Button>
      
      <div className="flex items-center gap-2">
        <label className="text-sm">Vitesse:</label>
        <Slider
          value={[rate]}
          onValueChange={([value]) => setRate(value)}
          min={0.5}
          max={2}
          step={0.1}
          className="w-24"
        />
        <span className="text-sm text-muted-foreground">{rate}x</span>
      </div>
    </div>
  );
}
```

---

## 🚀 Plan de Développement

### 9.1 Méthodologie Agile

**Organisation**:
- **Sprints de 2 semaines**
- **Rétrospective** en fin de sprint
- **Démos** hebdomadaires
- **Daily standups** (15 min)

### 9.2 Roadmap Détaillée (20 semaines)

#### **Phase 1: Infrastructure & Fondations (Semaines 1-4)**

**Sprint 1 (S1-S2): Setup & Core UI**
- [ ] Setup Next.js 14 + TypeScript + Tailwind
- [ ] Configuration PocketBase + Coolify
- [ ] Authentification basique
- [ ] Composants UI shadcn/ui
- [ ] Layout principal responsive
- [ ] Système de navigation
- [ ] Tests setup (Jest + Playwright)

**Sprint 2 (S3-S4): Gestion Chansons & Médias**
- [ ] Modèle de données PocketBase
- [ ] CRUD chansons (admin)
- [ ] Upload et stockage audio
- [ ] Lecteur audio synchronisé (Howler.js)
- [ ] Affichage paroles synchronisées
- [ ] Tests composants médias

**Livrable Phase 1**: 
- Application navigable
- Admin peut créer une chanson simple
- Lecteur audio fonctionnel

---

#### **Phase 2: Système d'Apprentissage (Semaines 5-10)**

**Sprint 3 (S5-S6): Séances & Activités - Partie 1**
- [ ] Modèle séances et écrans
- [ ] Builder de séances (enseignant)
- [ ] Composant Quiz (QCM, vrai/faux)
- [ ] Composant Texte à trous
- [ ] Composant Ordre (drag & drop)
- [ ] Feedback immédiat

**Sprint 4 (S7-S8): Séances & Activités - Partie 2**
- [ ] Composant Production écrite
- [ ] Composant Production orale (enregistrement)
- [ ] Composant Analyse textuelle
- [ ] Composant Exercices grammaticaux
- [ ] Système de scoring
- [ ] Tests e2e parcours apprenant

**Sprint 5 (S9-S10): Progression & Adaptation**
- [ ] ProgressContext étendu
- [ ] Sauvegarde progression PocketBase
- [ ] Profil apprenant
- [ ] Diagnostic initial
- [ ] Moteur de recommandation simple
- [ ] Tableau de bord apprenant

**Livrable Phase 2**:
- Application avec 2-3 chansons complètes
- Parcours apprenant fonctionnel
- Progression sauvegardée

---

#### **Phase 3: Contenu Pédagogique (Semaines 11-14)**

**Sprint 6 (S11-S12): Création de Contenu**
- [ ] Outil de synchronisation paroles
- [ ] Templates d'écrans pré-configurés
- [ ] Création de 5 chansons complètes:
  - Le coureur (narratif)
  - Né en 17 à Leidenstadt (historique)
  - Comme toi (engagement)
  - La corrida (métaphorique)
  - Rouge (amour)
- [ ] Validation pédagogique

**Sprint 7 (S13-S14): Référentiel Compétences**
- [ ] Modèle compétences hiérarchique
- [ ] Intégration CaSS
- [ ] Mapping activités → compétences
- [ ] Évaluation automatique compétences
- [ ] Dashboard compétences enseignant
- [ ] Tests intégration CaSS

**Livrable Phase 3**:
- Catalogue de 5 chansons riches
- Référentiel de compétences opérationnel

---

#### **Phase 4: Analytics & Collaboration (Semaines 15-17)**

**Sprint 8 (S15-S16): Learning Analytics**
- [ ] Intégration LRS Ralph
- [ ] Implémentation xAPI statements
- [ ] Tracking événements clés
- [ ] Configuration Superset
- [ ] Dashboards enseignants
- [ ] Dashboards apprenants
- [ ] Configuration Grafana (monitoring)

**Sprint 9 (S17): Fonctionnalités Collaboratives**
- [ ] Forum par chanson
- [ ] Système de posts/réponses
- [ ] Nuage de mots collaboratif (temps réel)
- [ ] Annotations partagées
- [ ] Modération basique
- [ ] Tests fonctionnalités temps réel

**Livrable Phase 4**:
- Analytics complet et fonctionnel
- Espace collaboratif actif

---

#### **Phase 5: Intégrations & Voix (Semaines 18-19)**

**Sprint 10 (S18): Intégration LTI**
- [ ] Implémentation LTI 1.3
- [ ] Configuration Moodle
- [ ] Launch flow complet
- [ ] Synchronisation utilisateurs
- [ ] Publication des notes (Grade sync)
- [ ] Tests LTI end-to-end

**Sprint 11 (S19): Web Speech API**
- [ ] Karaoké avec reconnaissance vocale
- [ ] Synthèse vocale (lecture paroles)
- [ ] Évaluation prononciation basique
- [ ] Feedback vocal
- [ ] Tests cross-browser

**Livrable Phase 5**:
- Intégration Moodle complète
- Fonctionnalités vocales opérationnelles

---

#### **Phase 6: Finalisation & Déploiement (Semaine 20)**

**Sprint 12 (S20): Polissage & Go-Live**
- [ ] Tests de charge (K6 ou Artillery)
- [ ] Optimisation performances
  - Lazy loading
  - Compression audio
  - CDN pour médias
- [ ] Accessibilité WCAG 2.1 AA
- [ ] Documentation utilisateur
- [ ] Documentation technique
- [ ] Tutoriels vidéo
- [ ] Déploiement production
- [ ] Formation enseignants pilotes
- [ ] Monitoring post-lancement

**Livrable Final**:
- 🎉 **Application complète en production**
- Documentation exhaustive
- Plan de maintenance

---

### 9.3 Ressources et Équipe

**Équipe Recommandée**:
- **1 Lead Developer** (vous) - Full stack Next.js/PocketBase
- **1 Frontend Developer** - React/TypeScript (part-time)
- **1 UX/UI Designer** - Interfaces et parcours utilisateur (part-time)
- **1 Expert Pédagogique FLE** - Validation contenu et scénarios
- **1 QA Tester** - Tests fonctionnels et accessibilité (part-time phases 5-6)

**Budget Infrastructure** (mensuel):
- Vercel Pro: ~20€/mois
- Coolify (auto-hébergé): Serveur VPS 15€/mois
- Stockage médias (S3 compatible): ~10€/mois
- Monitoring (Grafana Cloud): Gratuit (tier free)
- **Total**: ~45€/mois

---

## 📐 Spécifications Techniques Complémentaires

### 10.1 Performance

**Objectifs**:
- **Time to Interactive (TTI)**: < 3s
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

**Stratégies**:
- Code splitting automatique (Next.js App Router)
- Lazy loading des chansons (liste virtualisée)
- Audio streaming (pas de chargement complet)
- Images optimisées (next/image)
- Caching agressif (SWR/React Query)

### 10.2 Accessibilité

**Conformité**: WCAG 2.1 niveau AA

**Fonctionnalités**:
- Navigation au clavier complète
- ARIA labels exhaustifs
- Contraste suffisant (ratio 4.5:1 minimum)
- Textes alternatifs pour images
- Transcriptions audio (optionnel)
- Support lecteurs d'écran
- Mode haut contraste

### 10.3 Sécurité

**Mesures**:
- HTTPS obligatoire
- Validation JWT (LTI + sessions)
- Protection CSRF
- Sanitization inputs (xss)
- Rate limiting API
- Content Security Policy (CSP)
- CORS configuré
- Secrets en variables d'environnement

### 10.4 Internationalisation (i18n)

**Langues supportées** (Phase 2):
- Français (par défaut)
- Anglais (interface, pas contenu)

**Implémentation**:
- next-intl ou react-i18next
- Traductions interface UI
- Contenu pédagogique: français uniquement

---

## 📝 Critères de Succès

### 11.1 Critères Techniques

- [ ] Application déployée et accessible 24/7
- [ ] Uptime > 99%
- [ ] Temps de chargement < 3s
- [ ] Score Lighthouse > 90 (Performance, Accessibility, SEO)
- [ ] Zéro erreurs critiques en production
- [ ] Couverture de tests > 70%

### 11.2 Critères Pédagogiques

- [ ] Au moins 10 chansons disponibles au lancement
- [ ] Chaque chanson avec 3-5 séances complètes
- [ ] Référentiel de 50+ compétences mappées
- [ ] Parcours complet testé par 10+ apprenants bêta
- [ ] Feedback positif (> 4/5) des testeurs

### 11.3 Critères Fonctionnels

- [ ] Intégration LTI Moodle fonctionnelle
- [ ] Synchronisation notes automatique
- [ ] Analytics temps réel opérationnel
- [ ] Adaptation personnalisée activée
- [ ] Forum et collaboration actifs

---

## 🎯 Prochaines Étapes (Phase 2 - Post-Lancement)

### Fonctionnalités Futures
1. **IA Générative**:
   - Génération automatique d'exercices à partir de nouvelles chansons
   - Chatbot tuteur personnalisé
   - Suggestions de contenu pédagogique

2. **Gamification Avancée**:
   - Système de niveaux et XP
   - Défis hebdomadaires
   - Classements et compétitions amicales
   - Récompenses et achievements

3. **Contenu Enrichi**:
   - Vidéos explicatives (grammaire, culture)
   - Interviews d'artistes
   - Contexte historique/culturel des chansons
   - Playlists thématiques

4. **Fonctionnalités Sociales**:
   - Groupes d'étude
   - Mentorat peer-to-peer
   - Partage de productions
   - Événements en ligne (karaoké collectif)

5. **Extensions**:
   - Application mobile native (React Native)
   - Extension pour d'autres LMS (Canvas, Blackboard)
   - API publique pour intégrations tierces
   - Plugin WordPress

---

**Version**: 1.0  
**Date**: Janvier 2025  
**Auteur**: Équipe FLE Chansons  
**Statut**: 📋 Cahier des charges validé - Ready for development

..................................................................................

ceredis@vmi2704752:~$ docker ps | grep pocketbase
82e4fce5f662   ghcr.io/muchobien/pocketbase:latest                    "/usr/local/bin/entr…"   17 minutes ago   Up 16 minutes (healthy)                                                                                                                                                                        pocketbase-aosgw004kwgswc8co4go4gg4
09b73758f977   ghcr.io/muchobien/pocketbase:latest                    "/usr/local/bin/entr…"   13 hours ago     Up 13 hours (healthy)     0.0.0.0:8090->8090/tcp, [::]:8090->8090/tcp                                                                                                                          y808k4kwc04040w80o08kcs8-064955989081
ceredis@vmi2704752:~$ docker exec -it pocketbase-aosgw004kwgswc8co4go4gg4 /pb/pocketbase superuser create admin@ceredis.net j5ezjkj3kzD1nTHHyVsiBA8C
OCI runtime exec failed: exec failed: unable to start container process: exec: "/pb/pocketbase": stat /pb/pocketbase: no such file or directory
ceredis@vmi2704752:~$ docker exec -it pocketbase-aosgw004kwgswc8co4go4gg4 pocketbase superuser create admin@ceredis.net j5ezjkj3kzD1nTHHyVsiBA8C
Successfully created new superuser "admin@ceredis.net"!
ceredis@vmi2704752:~$