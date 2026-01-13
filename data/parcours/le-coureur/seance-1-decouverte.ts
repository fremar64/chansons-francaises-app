/**
 * LE COUREUR - SÉANCE 1
 * Découverte : Le récit de déracinement
 * 
 * Focus : 7 étapes chronologiques, oppositions AVANT/APRÈS
 * Thème : La mondialisation comme émancipation ET aliénation
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'lecoureur-s1-e1',
  numero: 1,
  titre: 'Introduction - Le récit d\'un déracinement',
  type: 'introduction',
  consigne: 'Découvrez l\'histoire vraie racontée par Goldman',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**"LE COUREUR" : UN RÉCIT DE DÉRACINEMENT**
    
    Cette chanson raconte l'histoire d'un jeune athlète africain repéré sur une plage tropicale
    par un recruteur occidental. C'est un **récit autobiographique fictif** en 7 étapes.
    
    **LE NARRATEUR** :
    Un coureur africain qui raconte sa vie à la première personne ("je").
    
    **LES 7 ÉTAPES CHRONOLOGIQUES** :
    
    1. **Vie d'origine** : Plage, alizés, course libre pieds nus, comme les ancêtres
    2. **Découverte** : Un recruteur ("un type avec un chronomètre")
    3. **Transaction** : "Des dollars et leur signature" (marchandisation du talent)
    4. **Transplantation** : Avion, froid des villes, rupture avec l'ancienne vie
    5. **Déshumanisation** : "Mesuré comme on fait d'un cheval", tests médicaux
    6. **Transformation** : Numéro sur le dos, compétition, violence ("écorcher la terre")
    7. **Bilan ambivalent** : "Étranger partout", "Était-ce un mal, un bien / C'est ainsi"
    
    **THÈME CENTRAL** :
    
    **La mondialisation est-elle émancipation ou aliénation ?**
    
    Goldman ne tranche PAS. Il montre l'**ambivalence** :
    - **GAINS** : Argent, reconnaissance, podiums
    - **PERTES** : Identité, harmonie avec la nature, appartenance
    
    **DIMENSION POST-COLONIALE** :
    Cette chanson évoque le recrutement d'athlètes africains par l'Occident,
    une forme moderne d'exploitation qui rappelle les déséquilibres Nord-Sud.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '2.2'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran1bis: EcranCeredis = {
  id: 'lecoureur-s1-e1bis',
  numero: 2,
  titre: 'Analyse prosodique et stylistique',
  type: 'introduction',
  consigne: 'Découvrez la structure narrative et temporelle de la chanson',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE NARRATIVE DE "LE COUREUR"**
    
    **ORGANISATION : STRUCTURE CIRCULAIRE**
    
    - **Ouverture** : "Je courais sur la plage..." (imparfait = AVANT)
    - **Corps du récit** : 5 couplets chronologiques (passé composé = événements)
    - **Clôture** : "Moi je courais sur ma plage..." (retour au refrain + bilan)
    
    Cette structure crée un effet de **nostalgie** : le narrateur se souvient de ce qu'il a perdu.
    
    ---
    
    **TEMPORALITÉ : IMPARFAIT VS PASSÉ COMPOSÉ**
    
    | Temps | Usage | Effet |
    |-------|-------|-------|
    | **Imparfait** | "Je courais", "couraient mes ancêtres" | Durée, habitude, AVANT |
    | **Passé composé** | "J'ai pris l'avion", "On m'a touché" | Rupture, événement, APRÈS |
    
    L'opposition entre ces deux temps structure toute la chanson :
    - **Imparfait** = Authenticité perdue
    - **Passé composé** = Transformation subie
    
    ---
    
    **MÉTAPHORE CENTRALE : CARESSER vs ÉCORCHER**
    
    - **AVANT** : "Je la **caressais** naguère" (la terre)
      → Relation **tendre, respectueuse, amoureuse** avec la nature
    
    - **APRÈS** : "Des **clous** aux deux pieds pour **écorcher** la terre"
      → Relation **violente, destructrice, instrumentale**
    
    Les "clous" = chaussures à pointes (artefact technologique)
    → La technologie transforme le rapport au monde
    
    ---
    
    **VERSIFICATION** :
    
    - Vers libres, longueur variable
    - Rimes approximatives : "alizés/régler", "lundi/infini"
    - Ton narratif, presque parlé
    
    **REGISTRE** :
    
    - "Naguère" = adverbe littéraire (registre soutenu)
    - "J'suis" = élision orale (registre familier)
    → Mélange des registres = authenticité du récit oral`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'lecoureur-s1-e2',
  numero: 3,
  titre: 'Première écoute - Découverte de l\'histoire',
  type: 'ecoute_decouverte',
  consigne: 'Écoutez et identifiez les grandes étapes du récit',
  dureeEstimee: 5,
  audioDebut: 0,
  audioFin: 220,
  activite: {
    type: 'ecoute_decouverte',
    contenu: `Pendant cette première écoute, concentrez-vous sur :
    
    **1. LES LIEUX** :
    - D'où vient le narrateur ? (indices climatiques)
    - Où arrive-t-il ?
    
    **2. LES PERSONNAGES** :
    - Le narrateur (qui est-il ?)
    - Le recruteur ("un type avec un chronomètre")
    - Les parents ("ma mère une larme")
    
    **3. LA TRANSFORMATION** :
    - Comment était sa vie AVANT ?
    - Comment est sa vie APRÈS ?
    
    **4. LE BILAN FINAL** :
    - Est-il heureux ? Malheureux ? Les deux ?
    - Quelle phrase résume son sentiment ?
    
    Notez vos premières impressions.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.1', '1.2', '2.1'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'lecoureur-s1-e3',
  numero: 4,
  titre: 'Compréhension globale - Les 7 étapes',
  type: 'quiz_qcm',
  consigne: 'Vérifiez votre compréhension du récit',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'D\'où vient le narrateur ?',
        options: [
          'D\'une grande ville européenne',
          'D\'un pays tropical (plage, alizés)',
          'D\'une montagne enneigée',
          'D\'un désert aride'
        ],
        reponseCorrecte: 1,
        explication: 'Les "alizés" (vents tropicaux), la "plage", les "vagues" indiquent un pays tropical, probablement africain.'
      },
      {
        id: 'q2',
        question: 'Qui est "l\'homme bizarre à la table" ?',
        options: [
          'Un ami de la famille',
          'Un recruteur sportif occidental venu acheter le talent du jeune coureur',
          'Un médecin',
          'Un professeur'
        ],
        reponseCorrecte: 1,
        explication: 'C\'est le recruteur repéré plus tôt ("un type avec un chronomètre") qui vient négocier avec les parents.'
      },
      {
        id: 'q3',
        question: 'Que signifie "Des dollars et leur signature" ?',
        options: [
          'Les parents ont gagné à la loterie',
          'Les parents ont vendu leur maison',
          'Les parents ont signé un contrat en échange d\'argent pour laisser partir leur fils',
          'Le fils a volé de l\'argent'
        ],
        reponseCorrecte: 2,
        explication: 'C\'est une transaction : les parents signent un contrat (avec "une larme") en échange de dollars.'
      },
      {
        id: 'q4',
        question: 'Que signifie "On m\'a touché, mesuré comme on fait d\'un cheval" ?',
        options: [
          'Il a été bien traité',
          'Il a été traité comme un objet, déshumanisé par les tests médicaux',
          'Il aime les chevaux',
          'Il a appris l\'équitation'
        ],
        reponseCorrecte: 1,
        explication: 'La comparaison avec le cheval montre la déshumanisation : le corps devient objet de mesure.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '2.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'lecoureur-s1-e4',
  numero: 5,
  titre: 'Analyse de l\'ambivalence',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez le bilan nuancé du narrateur',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie "J\'suis étranger partout aujourd\'hui" ?',
        options: [
          'Il voyage beaucoup',
          'Il a une double aliénation : ni chez lui dans son pays d\'origine, ni vraiment accepté en Occident',
          'Il a perdu ses papiers',
          'Il ne parle pas la langue'
        ],
        reponseCorrecte: 1,
        explication: 'Double aliénation : il a quitté son pays (plus vraiment chez lui là-bas) mais n\'est pas intégré ici non plus.',
        promptJustification: 'Expliquez comment quelqu\'un peut être "étranger partout". Donnez un exemple concret de cette double aliénation (80 mots min)',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Que signifie "Était-ce un mal, un bien / C\'est ainsi" ?',
        options: [
          'Il est sûr que c\'était bien',
          'Il est sûr que c\'était mal',
          'Il refuse de juger : c\'est à la fois un gain et une perte, et il accepte cette ambivalence',
          'Il ne se souvient plus'
        ],
        reponseCorrecte: 2,
        explication: 'Goldman refuse le jugement simpliste. La mondialisation est SIMULTANÉMENT émancipation ET aliénation.',
        promptJustification: 'Expliquez pourquoi Goldman refuse de trancher entre "mal" et "bien". Quels sont les GAINS et les PERTES du coureur ? (80 mots min)',
        justificationMinLength: 80
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.2', '5.5'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'lecoureur-s1-e5',
  numero: 6,
  titre: 'Tableau des oppositions AVANT/APRÈS',
  type: 'ordre_elements',
  consigne: 'Classez les éléments selon qu\'ils appartiennent à l\'AVANT ou l\'APRÈS',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: `Classez ces éléments en deux catégories : 
      **AVANT** (vie d'origine - ordre 1) ou **APRÈS** (vie en Occident - ordre 2).
      L'AVANT représente l'authenticité, l'harmonie avec la nature, la liberté.
      L'APRÈS représente l'aliénation, la technologie, la déshumanisation.`,
      elements: [
        { id: 'e1', texte: 'Plage, alizés', ordre: 1 },
        { id: 'e2', texte: 'Froid des villes', ordre: 2 },
        { id: 'e3', texte: 'Pieds nus', ordre: 1 },
        { id: 'e4', texte: 'Clous aux pieds (pointes)', ordre: 2 },
        { id: 'e5', texte: 'Course avec les vagues', ordre: 1 },
        { id: 'e6', texte: 'Courir toujours en rond', ordre: 2 },
        { id: 'e7', texte: 'Caresser la terre', ordre: 1 },
        { id: 'e8', texte: 'Écorcher la terre', ordre: 2 },
        { id: 'e9', texte: 'Mes ancêtres (identité)', ordre: 1 },
        { id: 'e10', texte: 'Un numéro sur le dos (anonymat)', ordre: 2 },
        { id: 'e11', texte: 'Solitude avec la nature', ordre: 1 },
        { id: 'e12', texte: 'Foule, cris, drapeaux', ordre: 2 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.2'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'lecoureur-s1-e6',
  numero: 7,
  titre: 'Production - Mon récit de transformation',
  type: 'texte_libre',
  consigne: 'Racontez une transformation personnelle',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Sujet : "Une fois, j'ai vécu une transformation"
      
      Comme le coureur, racontez un moment de votre vie où vous avez vécu un **changement important**.
      
      Ce peut être :
      - Un déménagement (changer de pays, de ville)
      - Un changement d'école
      - Une nouvelle situation familiale
      - Une transformation personnelle (physique, psychologique)
      
      Rédigez un texte de 180-220 mots qui :
      1. Décrit votre vie AVANT (utilisez l'imparfait)
      2. Raconte l'événement qui a tout changé (utilisez le passé composé)
      3. Décrit votre vie APRÈS
      4. Donne votre bilan : était-ce un bien, un mal, ou les deux ?
      
      Inspirez-vous de la structure du "Coureur" : AVANT → événement → APRÈS → bilan.`,
      nombreMotsMin: 180,
      nombreMotsMax: 220,
      aideRedaction: [
        'AVANT : Utilisez l\'imparfait ("Je vivais...", "J\'avais...", "C\'était...")',
        'ÉVÉNEMENT : Utilisez le passé composé ("Un jour, j\'ai...", "Il s\'est passé...")',
        'APRÈS : Décrivez le changement',
        'BILAN : Comme Goldman, essayez de montrer l\'ambivalence (gains ET pertes)'
      ],
      criteres: [
        { label: 'Utilisation correcte imparfait/passé composé', description: 'AVANT en imparfait, événement en passé composé', points: 4 },
        { label: 'Structure narrative claire', description: 'AVANT → événement → APRÈS → bilan', points: 4 },
        { label: 'Bilan nuancé (ambivalence)', description: 'Montre à la fois les gains et les pertes', points: 4 },
        { label: 'Qualité de l\'expression', description: 'Clarté, vocabulaire approprié', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.5'],
    evidenceType: 'P3',
    niveau: 'B1',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'lecoureur-s1-e7',
  numero: 8,
  titre: 'Journal - Mondialisation et identité',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à la question de l\'identité dans la mondialisation',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Le coureur a-t-il gagné ou perdu dans cette transformation ? Et vous, que pensez-vous de la mondialisation ?',
      contexte: 'Goldman montre l\'ambivalence : le coureur a gagné (argent, reconnaissance) mais aussi perdu (identité, harmonie).',
      sousQuestions: [
        'Connaissez-vous des personnes qui ont vécu un déracinement similaire ?',
        'Pensez-vous que la mondialisation est plutôt positive ou négative pour les individus ?',
        'Peut-on "réussir" tout en perdant son identité ? Est-ce vraiment réussir ?',
        'Que pensez-vous de la phrase "C\'est ainsi" ? Est-ce de la sagesse ou de la résignation ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Réfléchir honnêtement aux gains et aux pertes',
        'Penser à des exemples concrets (sportifs, artistes, immigrés)',
        'Ne pas donner de réponse simpliste ("c\'est bien" ou "c\'est mal")',
        'Essayer de comprendre pourquoi Goldman refuse de juger'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6', '5.7'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 10
  })
};

const ecran8: EcranCeredis = {
  id: 'lecoureur-s1-e8',
  numero: 9,
  titre: 'Bilan de la découverte',
  type: 'bilan',
  consigne: 'Synthèse de la séance de découverte',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**RÉCIT DU DÉRACINEMENT : CE QUE NOUS AVONS DÉCOUVERT**
    
    **LES 7 ÉTAPES CHRONOLOGIQUES** :
    
    1. **Vie d'origine** : Plage tropicale, course libre, harmonie avec la nature
    2. **Découverte** : Recruteur occidental avec chronomètre
    3. **Transaction** : "Dollars et signature" (marchandisation)
    4. **Transplantation** : Avion, froid des villes, rupture
    5. **Déshumanisation** : "Mesuré comme un cheval", tests médicaux
    6. **Transformation** : Numéro, compétition, "écorcher la terre"
    7. **Bilan** : "Étranger partout", ambivalence ("mal, bien / C'est ainsi")
    
    **MÉTAPHORE CENTRALE** :
    - AVANT : "Je la **caressais**" (la terre) = harmonie
    - APRÈS : "**Écorcher** la terre" = violence
    
    **TEMPORALITÉ NARRATIVE** :
    - **Imparfait** : durée, habitude (AVANT)
    - **Passé composé** : rupture, événement (APRÈS)
    
    **THÈME PHILOSOPHIQUE** :
    
    "La mondialisation est-elle émancipation ou aliénation ?"
    
    Goldman refuse de trancher. Le coureur a :
    - **GAGNÉ** : argent, reconnaissance, podiums
    - **PERDU** : identité, appartenance, harmonie avec la nature
    
    **CONNEXION AVEC "NÉ EN 17"** :
    - "Né en 17" : "Être né quelque part, c'est toujours un hasard"
    - "Le coureur" : "Le hasard a croisé ma vie"
    → Thème goldmanien : la **contingence** du destin
    
    **DIMENSION POST-COLONIALE** :
    Le recrutement d'athlètes africains par l'Occident illustre les déséquilibres économiques Nord-Sud.
    
    **Prochaine séance** : Vocabulaire - Nature, modernité, déshumanisation`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance1: SeanceCeredis = {
  id: 'lecoureur-s1',
  chansonId: 'le-coureur',
  numero: 1,
  titre: 'Découverte : Le récit de déracinement',
  description: `Découverte narrative du "Coureur" comme récit de déracinement en 7 étapes.
  Cette séance explore l'histoire d'un jeune athlète africain recruté par l'Occident,
  et la question centrale : la mondialisation est-elle émancipation ou aliénation ?`,
  
  objectifs: [
    'Comprendre la structure narrative en 7 étapes chronologiques',
    'Identifier les oppositions AVANT/APRÈS (nature vs modernité)',
    'Analyser la métaphore centrale : caresser vs écorcher la terre',
    'Comprendre l\'ambivalence du bilan ("mal, bien / C\'est ainsi")',
    'Réfléchir à la dimension post-coloniale de la mondialisation'
  ],
  
  dureeEstimee: 69,
  
  ecrans: [ecran1, ecran1bis, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'B1',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 4, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.5', '5.6', '5.7']
  }
};

export default seance1;
