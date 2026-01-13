/**
 * LE COUREUR - SÉANCE 4 (FORMAT CEREDIS)
 * Débat : Mondialisation - Émancipation ou aliénation ?
 * 
 * Focus : Le coureur a-t-il gagné ou perdu ?
 * Dimension post-coloniale : recrutement athlètes africains
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'lecoureur-s4-e1',
  numero: 1,
  titre: 'Introduction - La question centrale du débat',
  type: 'introduction',
  consigne: 'Découvrez la question philosophique au cœur de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 4 : DÉBAT PHILOSOPHIQUE**
    
    **LA QUESTION CENTRALE** :
    
    "Était-ce un mal, un bien / C'est ainsi"
    
    **LE COUREUR A-T-IL GAGNÉ OU PERDU ?**
    
    Cette chanson pose UNE QUESTION FONDAMENTALE sur la mondialisation :
    
    **La mondialisation est-elle ÉMANCIPATION ou ALIÉNATION ?**
    
    **TROIS POSITIONS POSSIBLES** :
    
    **THÈSE** : Le coureur a GAGNÉ
    - Sorti de la pauvreté
    - Reconnaissance internationale
    - Argent ("dollars", "podiums")
    - Performance optimisée
    
    **ANTITHÈSE** : Le coureur a PERDU
    - Identité culturelle ("mes ancêtres")
    - Harmonie avec la nature ("caresser" → "écorcher")
    - Appartenance ("étranger partout")
    - Liberté (course libre → "toujours en rond")
    
    **SYNTHÈSE** : Il a gagné ET perdu (ambivalence goldmanienne)
    
    **DIMENSION POST-COLONIALE** :
    
    Cette chanson évoque le **recrutement d'athlètes africains** par l'Occident.
    C'est une forme moderne d'exploitation qui rappelle les déséquilibres Nord-Sud.
    Les "dollars" achètent le talent, la "signature" rappelle les contrats coloniaux.
    
    **OBJECTIF** : Argumenter une position nuancée sur cette question complexe.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.5'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'lecoureur-s4-e2',
  numero: 2,
  titre: 'Document 1 - Les gains du coureur',
  type: 'introduction',
  consigne: 'Lisez les arguments en faveur de la mondialisation',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**DOCUMENT 1 : THÈSE - LE COUREUR A GAGNÉ**
    
    **ARGUMENTS EN FAVEUR DE LA MONDIALISATION :**
    
    **1. SORTIE DE LA PAUVRETÉ**
    
    "Des dollars et leur signature"
    
    Le recruteur apporte de l'argent à une famille qui en manquait.
    L'opportunité sportive offre une **ascension sociale** impossible autrement.
    
    **2. RECONNAISSANCE INTERNATIONALE**
    
    "Les podiums et les coups de coude / Les passions, le monde et l'argent"
    
    Le coureur devient un athlète reconnu mondialement.
    Il accède à un **statut social** élevé.
    
    **3. OPTIMISATION DES CAPACITÉS**
    
    "J'ai appris à perdre, à gagner sur les autres et le temps"
    
    L'entraînement professionnel optimise son talent.
    Il devient **meilleur** qu'il n'aurait été resté sur sa plage.
    
    **4. ACCÈS À LA MODERNITÉ**
    
    Les électrodes, le tapis de course, les techniques d'entraînement
    représentent un **progrès technique** qui améliore les performances.
    
    **CONCLUSION THÈSE** :
    
    Sans le recruteur, le coureur serait resté anonyme sur sa plage.
    Grâce à lui, il a accès à l'argent, à la gloire, à la modernité.
    **La mondialisation l'a émancipé de sa condition.**`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '2.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'lecoureur-s4-e3',
  numero: 3,
  titre: 'Document 2 - Les pertes du coureur',
  type: 'introduction',
  consigne: 'Lisez les arguments contre la mondialisation',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**DOCUMENT 2 : ANTITHÈSE - LE COUREUR A PERDU**
    
    **ARGUMENTS CONTRE LA MONDIALISATION :**
    
    **1. PERTE D'IDENTITÉ CULTURELLE**
    
    "Pieds nus comme couraient mes ancêtres" → "Un numéro sur le dos"
    
    La continuité culturelle (ancêtres) est remplacée par l'**anonymat** (numéro).
    L'identité devient **interchangeable**.
    
    **2. PERTE DE L'HARMONIE AVEC LA NATURE**
    
    "Je la caressais naguère" → "Des clous aux pieds pour écorcher la terre"
    
    La relation **tendre** avec la nature devient **violente**.
    La technologie (clous/pointes) **interrompt** le contact naturel.
    
    **3. DOUBLE ALIÉNATION**
    
    "J'suis étranger partout aujourd'hui"
    
    Il n'appartient plus à son pays d'origine (il l'a quitté).
    Il n'appartient pas vraiment à l'Occident (il reste "étranger").
    → **Déracinement total** : ni ici, ni là-bas.
    
    **4. PERTE DE LIBERTÉ**
    
    "Course avec les vagues" → "On courait toujours en rond"
    
    La course **libre** (avec la nature) devient course **enfermée** (en rond).
    L'espace **infini** (plage, mer) devient espace **clos** (stade).
    
    **5. DÉSHUMANISATION**
    
    "Mesuré comme on fait d'un cheval"
    
    Le corps humain devient **objet** de mesure, de performance.
    L'humanité est réduite à des **chiffres**.
    
    **CONCLUSION ANTITHÈSE** :
    
    Le coureur a perdu son identité, son harmonie, son appartenance, sa liberté.
    **La mondialisation l'a aliéné.**`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '2.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran4: EcranCeredis = {
  id: 'lecoureur-s4-e4',
  numero: 4,
  titre: 'Document 3 - Dimension post-coloniale',
  type: 'introduction',
  consigne: 'Analysez la dimension politique de la chanson',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**DOCUMENT 3 : DIMENSION POST-COLONIALE**
    
    **LE CONTEXTE HISTORIQUE**
    
    "Le coureur" évoque le **recrutement d'athlètes africains** par l'Occident.
    Ce phénomène s'inscrit dans la continuité des **rapports Nord-Sud**.
    
    **LES INDICES DANS LA CHANSON**
    
    1. **Lieu d'origine tropical** : "plage", "alizés" → Afrique, Caraïbes
    
    2. **Recruteur occidental** : "Un type avec un chronomètre", "lunettes"
       → Le regard **évaluateur** de l'Occident sur le "talent brut"
    
    3. **Transaction économique** : "Des dollars et leur signature"
       → L'argent occidental **achète** le talent du Sud
    
    4. **Flux migratoire** : Voyage du Sud vers le Nord (avion)
       → Les corps talentueux **migrent** vers l'Occident
    
    5. **Exploitation du corps** : "Mesuré comme un cheval"
       → Le corps africain comme **ressource** à exploiter
    
    **PARALLÈLE AVEC LE COLONIALISME**
    
    | Colonialisme | Mondialisation sportive |
    |--------------|------------------------|
    | Extraction des ressources | Extraction des talents |
    | Contrats léonins | "Signature" contre "dollars" |
    | Déracinement | "Étranger partout" |
    | Déshumanisation | "Mesuré comme un cheval" |
    
    **NUANCE IMPORTANTE**
    
    Goldman ne fait PAS un discours militant.
    Il **montre** l'ambivalence sans **juger**.
    Le coureur lui-même ne sait pas si c'était "un mal, un bien".
    
    **QUESTION** : Cette analyse change-t-elle votre regard sur la chanson ?`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.5'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};

const ecran5: EcranCeredis = {
  id: 'lecoureur-s4-e5',
  numero: 5,
  titre: 'Analyse prosodique - Structure circulaire',
  type: 'introduction',
  consigne: 'Analysez comment la structure renforce le message',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**ANALYSE : LA STRUCTURE CIRCULAIRE**
    
    **DÉBUT DE LA CHANSON** :
    
    "Je courais sur la plage abritée des alizés"
    
    **FIN DE LA CHANSON** :
    
    "Moi je courais sur ma plage abritée des alizés"
    
    **DIFFÉRENCE SUBTILE** :
    - Début : "la plage" (article défini)
    - Fin : "**ma** plage" (possessif)
    
    → Le possessif "ma" exprime la **nostalgie** : cette plage est à lui, elle lui manque.
    
    **EFFET DE LA CIRCULARITÉ** :
    
    La chanson **revient** au point de départ, mais **tout a changé**.
    Le coureur se **souvient** de ce qu'il a perdu.
    
    C'est comme un rêve éveillé : il revit mentalement son passé.
    
    **LE BILAN FINAL** :
    
    "Puis le hasard a croisé ma vie"
    → Le **hasard** (contingence) a tout changé
    
    "J'suis étranger partout aujourd'hui"
    → Bilan : **double aliénation**
    
    "Était-ce un mal, un bien / C'est ainsi"
    → Goldman **suspend le jugement**
    
    **MESSAGE** :
    
    La structure circulaire renforce l'**ambivalence** :
    - On revient au début mais on est transformé
    - Le passé est présent dans la mémoire
    - Le jugement reste **ouvert**`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran6: EcranCeredis = {
  id: 'lecoureur-s4-e6',
  numero: 6,
  titre: 'QCM - Comprendre les positions',
  type: 'quiz_qcm',
  consigne: 'Vérifiez votre compréhension des trois positions',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quel est l\'argument principal de la THÈSE (le coureur a gagné) ?',
        options: [
          'Il a perdu son identité',
          'Il a accédé à l\'argent, à la gloire et à une ascension sociale',
          'Il est étranger partout',
          'Il a été déshumanisé'
        ],
        reponseCorrecte: 1,
        explication: 'La thèse met en avant les gains : sortie de la pauvreté, reconnaissance, optimisation des capacités.'
      },
      {
        id: 'q2',
        question: 'Quel est l\'argument principal de l\'ANTITHÈSE (le coureur a perdu) ?',
        options: [
          'Il a gagné de l\'argent',
          'Il est devenu célèbre',
          'Il a perdu son identité, son harmonie avec la nature et son appartenance',
          'Il a amélioré ses performances'
        ],
        reponseCorrecte: 2,
        explication: 'L\'antithèse met en avant les pertes : identité, harmonie, liberté, humanité.'
      },
      {
        id: 'q3',
        question: 'Que signifie "Était-ce un mal, un bien / C\'est ainsi" ?',
        options: [
          'C\'était définitivement bien',
          'C\'était définitivement mal',
          'Goldman refuse de trancher : c\'est à la fois un gain et une perte',
          'Il ne sait plus ce qui s\'est passé'
        ],
        reponseCorrecte: 2,
        explication: 'Goldman suspend le jugement moral. La mondialisation est SIMULTANÉMENT émancipation ET aliénation.'
      },
      {
        id: 'q4',
        question: 'Que représente la dimension "post-coloniale" de la chanson ?',
        options: [
          'Une histoire de vacances',
          'Le recrutement d\'athlètes africains comme continuation des rapports Nord-Sud inégaux',
          'Une compétition sportive',
          'Un voyage touristique'
        ],
        reponseCorrecte: 1,
        explication: 'La chanson évoque les flux de talents du Sud vers le Nord, avec des échos des rapports coloniaux.'
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

const ecran7: EcranCeredis = {
  id: 'lecoureur-s4-e7',
  numero: 7,
  titre: 'Débat argumenté',
  type: 'quiz_qcm_justifie',
  consigne: 'Développez votre argumentation',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Le coureur a-t-il eu raison de partir avec le recruteur ?',
        options: [
          'Oui, c\'était sa seule chance de réussir',
          'Non, il aurait dû rester sur sa plage',
          'On ne peut pas juger : chaque choix a ses gains et ses pertes',
          'La question n\'a pas de sens'
        ],
        reponseCorrecte: 2,
        explication: 'La position de Goldman est l\'ambivalence : chaque choix comporte des gains ET des pertes.',
        promptJustification: 'Développez votre position : le coureur a-t-il fait le bon choix ? Argumentez avec des éléments de la chanson (100 mots min)',
        justificationMinLength: 100
      },
      {
        id: 'q2',
        question: 'La mondialisation est-elle globalement positive pour les individus ?',
        options: [
          'Toujours positive (progrès)',
          'Toujours négative (aliénation)',
          'Cela dépend : elle crée des opportunités mais aussi des pertes',
          'Elle n\'a aucun effet'
        ],
        reponseCorrecte: 2,
        explication: 'Goldman montre la complexité : la mondialisation n\'est ni tout blanc ni tout noir.',
        promptJustification: 'Donnez votre avis sur la mondialisation en utilisant l\'exemple du coureur ET un exemple personnel ou actuel (100 mots min)',
        justificationMinLength: 100
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '3.2', '5.5'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 14
  })
};

const ecran8: EcranCeredis = {
  id: 'lecoureur-s4-e8',
  numero: 8,
  titre: 'Production - Dissertation courte',
  type: 'texte_libre',
  consigne: 'Rédigez une dissertation sur le thème de la mondialisation',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**SUJET DE DISSERTATION**
      
      "La mondialisation : émancipation ou aliénation ?"
      
      En vous appuyant sur "Le coureur" de Goldman, rédigez une dissertation de 350-400 mots.
      
      **STRUCTURE OBLIGATOIRE** :
      
      1. **INTRODUCTION** (50-60 mots)
         - Présentation du sujet
         - Annonce du plan (thèse, antithèse, synthèse)
      
      2. **THÈSE** (100-120 mots) : La mondialisation comme émancipation
         - Arguments : sortie de pauvreté, reconnaissance, progrès
         - Exemples de la chanson
      
      3. **ANTITHÈSE** (100-120 mots) : La mondialisation comme aliénation
         - Arguments : perte d'identité, déshumanisation, déracinement
         - Exemples de la chanson
      
      4. **SYNTHÈSE** (80-100 mots) : L'ambivalence
         - La position de Goldman : "Était-ce un mal, un bien / C'est ainsi"
         - Votre position personnelle argumentée
      
      **CRITÈRES** :
      - Utiliser des exemples précis de la chanson
      - Montrer la dimension post-coloniale
      - Aboutir à une position nuancée`,
      nombreMotsMin: 350,
      nombreMotsMax: 400,
      aideRedaction: [
        'INTRO : "La chanson \'Le coureur\' de Goldman pose la question..."',
        'THÈSE : "D\'un côté, le coureur a gagné..." (citer la chanson)',
        'ANTITHÈSE : "D\'un autre côté, il a perdu..." (citer la chanson)',
        'SYNTHÈSE : "Goldman refuse de trancher..." (votre avis)'
      ],
      criteres: [
        { label: 'Structure dissertation', description: 'Intro, thèse, antithèse, synthèse', points: 5 },
        { label: 'Argumentation thèse', description: 'Arguments clairs avec exemples chanson', points: 5 },
        { label: 'Argumentation antithèse', description: 'Arguments clairs avec exemples chanson', points: 5 },
        { label: 'Synthèse nuancée', description: 'Position personnelle argumentée', points: 5 },
        { label: 'Qualité expression', description: 'Clarté, connecteurs, vocabulaire', points: 5 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.2', '3.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 25
  })
};

const ecran9: EcranCeredis = {
  id: 'lecoureur-s4-e9',
  numero: 9,
  titre: 'Bilan du débat',
  type: 'bilan',
  consigne: 'Synthèse de la séance débat',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**DÉBAT : CE QUE NOUS AVONS APPRIS**
    
    **LA QUESTION CENTRALE** :
    
    "La mondialisation est-elle émancipation ou aliénation ?"
    
    **TROIS POSITIONS** :
    
    **THÈSE : Le coureur a GAGNÉ**
    - Sortie de la pauvreté (dollars)
    - Reconnaissance internationale (podiums)
    - Optimisation des capacités (entraînement)
    
    **ANTITHÈSE : Le coureur a PERDU**
    - Identité culturelle (ancêtres → numéro)
    - Harmonie nature (caresser → écorcher)
    - Appartenance (étranger partout)
    - Liberté (course libre → en rond)
    
    **SYNTHÈSE : AMBIVALENCE**
    - Goldman refuse de juger
    - "Était-ce un mal, un bien / C'est ainsi"
    - La mondialisation est SIMULTANÉMENT gains ET pertes
    
    **DIMENSION POST-COLONIALE**
    
    | Élément chanson | Signification |
    |-----------------|---------------|
    | "Alizés", plage | Origine tropicale (Sud) |
    | "Chronomètre", lunettes | Regard occidental |
    | "Dollars", signature | Transaction économique |
    | "Mesuré comme cheval" | Corps comme ressource |
    
    → Le recrutement d'athlètes africains comme forme moderne d'exploitation
    
    **CONNEXION AVEC "NÉ EN 17"**
    
    - "Né en 17" : "On ne peut pas savoir" (ignorance épistémique)
    - "Le coureur" : "On sait, mais c'est complexe" (ambivalence morale)
    
    → Goldman refuse les jugements simplistes dans les deux cas
    
    **Prochaine séance** : Production finale - Récit de transformation ambivalente`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance4: SeanceCeredis = {
  id: 'lecoureur-s4',
  chansonId: 'le-coureur',
  numero: 4,
  titre: 'Débat : Mondialisation - Émancipation ou aliénation ?',
  description: `Débat philosophique sur la question centrale de "Le coureur" :
  le coureur a-t-il gagné ou perdu ? Exploration de la dimension post-coloniale
  et de l'ambivalence goldmanienne face au progrès.`,
  
  objectifs: [
    'Comprendre les trois positions (thèse, antithèse, synthèse)',
    'Analyser la dimension post-coloniale de la chanson',
    'Développer une argumentation nuancée',
    'Comprendre l\'ambivalence morale de Goldman',
    'Produire une dissertation argumentée'
  ],
  
  dureeEstimee: 68,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8, ecran9],
  
  competences: ['2.1', '2.2', '2.3', '3.2', '3.3', '5.2', '5.5', '5.6'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 47,
    distributionEvidences: { P1: 6, P2: 1, P3: 1, P4: 1 },
    competencesUniques: ['2.1', '2.2', '2.3', '3.2', '3.3', '5.2', '5.5', '5.6']
  }
};

export default seance4;
