/**
 * LE COUREUR - SÉANCE 2 (FORMAT CEREDIS)
 * Vocabulaire : Nature, modernité, déshumanisation
 * 
 * Focus : 4 champs lexicaux + métaphore caresser/écorcher
 * Mots-clés : alizés, ancêtres, chronomètre, électrodes, cheval, numéro, étranger
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'lecoureur-s2-e1',
  numero: 1,
  titre: 'Introduction - Les 4 champs lexicaux',
  type: 'introduction',
  consigne: 'Découvrez les univers de vocabulaire de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 2 : LE VOCABULAIRE DU DÉRACINEMENT**
    
    "Le coureur" oppose deux mondes à travers **4 champs lexicaux** :
    
    **1. NATURE / AUTHENTICITÉ** (AVANT)
    
    | Mot | Signification |
    |-----|---------------|
    | Plage | Lieu naturel, ouvert |
    | Alizés | Vents tropicaux réguliers |
    | Vagues | Nature en mouvement |
    | Pieds nus | Contact direct avec la terre |
    | Ancêtres | Continuité culturelle |
    | Caresser | Relation tendre |
    
    **2. MODERNITÉ / TECHNOLOGIE** (APRÈS)
    
    | Mot | Signification |
    |-----|---------------|
    | Chronomètre | Mesure du temps |
    | Avion | Transport moderne |
    | Automobiles | Technologie urbaine |
    | Tapis (de course) | Machine artificielle |
    | Électrodes | Technologie médicale |
    | Clous (pointes) | Artefact sportif |
    
    **3. DÉSHUMANISATION**
    
    | Mot | Signification |
    |-----|---------------|
    | Cheval | Comparaison animale |
    | Mesuré, touché | Corps-objet |
    | Bocal | Analyse biologique |
    | Numéro | Anonymisation |
    | En rond | Enfermement |
    
    **4. MONDIALISATION / ALIÉNATION**
    
    | Mot | Signification |
    |-----|---------------|
    | Dollars | Économie mondialisée |
    | Signature | Contrat, transaction |
    | Étranger | Perte d'appartenance |
    | Hasard | Contingence du destin |
    
    **OBJECTIF** : Maîtriser ces mots pour comprendre les oppositions du récit.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'lecoureur-s2-e2',
  numero: 2,
  titre: 'Analyse prosodique - La métaphore centrale',
  type: 'introduction',
  consigne: 'Analysez la métaphore caresser/écorcher',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**LA MÉTAPHORE CENTRALE : CARESSER vs ÉCORCHER**
    
    Cette opposition résume toute la transformation du coureur :
    
    ---
    
    **AVANT : "Je la caressais naguère"**
    
    - "La" = la terre
    - "Caresser" = toucher avec tendresse, douceur, amour
    - "Naguère" = autrefois (adverbe littéraire, registre soutenu)
    
    **→ Relation HARMONIEUSE avec la nature**
    
    Le coureur courait **pieds nus** sur la **plage**.
    Il était en **contact direct** avec la terre.
    C'était une relation de **respect, de tendresse**.
    
    ---
    
    **APRÈS : "Des clous aux deux pieds pour écorcher la terre"**
    
    - "Clous" = chaussures à pointes (artefact technologique)
    - "Écorcher" = blesser, arracher la peau, abîmer
    
    **→ Relation VIOLENTE avec la nature**
    
    Le coureur porte des **chaussures à pointes**.
    Ces pointes "écorchent" la terre.
    La technologie **interrompt** le contact naturel.
    
    ---
    
    **ANALYSE PHILOSOPHIQUE**
    
    Cette métaphore illustre la **transformation du rapport au monde** :
    
    | Aspect | CARESSER | ÉCORCHER |
    |--------|----------|----------|
    | Outil | Pieds nus | Clous (pointes) |
    | Relation | Tendresse | Violence |
    | Nature | Respectée | Blessée |
    | Technologie | Absente | Présente |
    | Authenticité | Préservée | Perdue |
    
    **MESSAGE** : La modernisation transforme notre rapport au monde.
    Ce qui était harmonie devient violence.
    
    ---
    
    **EXTENSION : "NAGUÈRE"**
    
    Cet adverbe littéraire marque la **distance temporelle**.
    Il appartient au **registre soutenu** (rare à l'oral).
    
    Son usage crée un effet de **nostalgie** :
    le passé semble lointain, presque irréel.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'lecoureur-s2-e3',
  numero: 3,
  titre: 'QCM - Champ lexical Nature/Authenticité',
  type: 'quiz_qcm',
  consigne: 'Testez votre compréhension du vocabulaire de la nature',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Que sont les "alizés" ?',
        options: [
          'Des oiseaux tropicaux',
          'Des vents réguliers soufflant dans les régions tropicales',
          'Des vagues particulières',
          'Des plantes de plage'
        ],
        reponseCorrecte: 1,
        explication: 'Les alizés sont des vents tropicaux réguliers. Ils situent l\'action dans une zone tropicale (Afrique, Caraïbes).'
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman mentionne "pieds nus comme couraient mes ancêtres" ?',
        options: [
          'Parce qu\'il n\'avait pas de chaussures (pauvreté)',
          'Pour montrer la continuité culturelle et le contact naturel avec la terre',
          'Parce que c\'est plus rapide',
          'Par habitude sportive'
        ],
        reponseCorrecte: 1,
        explication: 'Les "ancêtres" représentent la tradition, la continuité culturelle. "Pieds nus" = contact naturel avec la terre.'
      },
      {
        id: 'q3',
        question: 'Que symbolise "une course avec les vagues, juste un vieux compte à régler" ?',
        options: [
          'Une compétition officielle',
          'Une course intime, personnelle, en harmonie avec la nature',
          'Un conflit avec quelqu\'un',
          'Un entraînement intensif'
        ],
        reponseCorrecte: 1,
        explication: 'La course AVANT est intime ("vieux compte à régler" personnel), naturelle (avec les vagues), non compétitive.'
      },
      {
        id: 'q4',
        question: 'Que signifie "naguère" ?',
        options: [
          'Maintenant',
          'Demain',
          'Autrefois, jadis (registre soutenu)',
          'Jamais'
        ],
        reponseCorrecte: 2,
        explication: '"Naguère" est un adverbe littéraire signifiant "autrefois". Son usage crée une distance nostalgique.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'lecoureur-s2-e4',
  numero: 4,
  titre: 'QCM - Champs lexicaux Modernité et Déshumanisation',
  type: 'quiz_qcm',
  consigne: 'Testez votre compréhension du vocabulaire de la modernité',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Que symbolise "un type avec un chronomètre" ?',
        options: [
          'Un ami qui regarde l\'heure',
          'La modernité occidentale qui mesure, quantifie, évalue',
          'Un arbitre de football',
          'Un professeur'
        ],
        reponseCorrecte: 1,
        explication: 'Le chronomètre symbolise la modernité : tout est mesuré, chronométré, réduit à des chiffres.'
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman écrit "On m\'a touché, mesuré comme on fait d\'un cheval" ?',
        options: [
          'Pour montrer qu\'il aime les chevaux',
          'Pour montrer la déshumanisation : le corps devient objet d\'évaluation',
          'Pour parler d\'équitation',
          'Pour montrer sa force physique'
        ],
        reponseCorrecte: 1,
        explication: 'La comparaison avec le cheval montre la réification : le corps humain devient objet de mesure, comme un animal.'
      },
      {
        id: 'q3',
        question: 'Que représentent "bocal", "électrodes", "tapis (de course)" ?',
        options: [
          'Des objets de décoration',
          'L\'artificialité et la technologie médicale qui analyse le corps',
          'Des jouets',
          'Des outils de cuisine'
        ],
        reponseCorrecte: 1,
        explication: 'Ces mots décrivent les tests médicaux : le corps est analysé, mesuré, transformé en données.'
      },
      {
        id: 'q4',
        question: 'Que signifie "On m\'a mis un numéro sur le dos" ?',
        options: [
          'Il a gagné la loterie',
          'L\'anonymisation : l\'identité devient un chiffre, l\'individualité disparaît',
          'Il fait de la prison',
          'C\'est son maillot préféré'
        ],
        reponseCorrecte: 1,
        explication: 'Le "numéro sur le dos" remplace l\'identité (les "ancêtres") par l\'anonymat (un chiffre).'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran5: EcranCeredis = {
  id: 'lecoureur-s2-e5',
  numero: 5,
  titre: 'Analyse de la métaphore caresser/écorcher',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez en profondeur l\'opposition centrale',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman oppose-t-il "caresser" et "écorcher" la terre ?',
        options: [
          'Pour parler de jardinage',
          'Pour montrer comment la technologie (les pointes) transforme le rapport au monde',
          'Pour décrire une blessure physique',
          'Sans raison particulière'
        ],
        reponseCorrecte: 1,
        explication: 'Les pointes (clous) symbolisent la technologie qui interrompt le contact naturel avec la terre.',
        promptJustification: 'Expliquez comment un objet technologique peut transformer notre rapport au monde. Donnez un exemple personnel (80 mots min)',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Quel lien y a-t-il entre "pieds nus" et "clous aux pieds" ?',
        options: [
          'Aucun lien',
          'C\'est une opposition entre contact naturel (pieds nus) et artefact technologique (pointes)',
          'Les deux sont confortables',
          'C\'est une question de mode'
        ],
        reponseCorrecte: 1,
        explication: 'Pieds nus = contact direct, naturel. Clous = médiation technologique, violence.',
        promptJustification: 'Analysez ce que représente le passage de "pieds nus" à "clous aux pieds". Que perd-on ? Que gagne-t-on ? (80 mots min)',
        justificationMinLength: 80
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran6: EcranCeredis = {
  id: 'lecoureur-s2-e6',
  numero: 6,
  titre: 'Texte à trous - Les 4 champs lexicaux',
  type: 'texte_a_trous',
  consigne: 'Complétez avec le vocabulaire étudié',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**LES 4 CHAMPS LEXICAUX DU "COUREUR"**
      
      **1. NATURE / AUTHENTICITÉ**
      
      Le coureur vivait sur une {{plage}} tropicale, avec les {{alizés}} (vents).
      Il courait {{pieds nus}} comme ses {{ancêtres}}.
      Il {{caressait}} la terre avec tendresse.
      
      **2. MODERNITÉ / TECHNOLOGIE**
      
      Un recruteur est arrivé avec un {{chronomètre}}.
      Le coureur a pris l'{{avion}} pour l'Occident.
      Il a couru sur un {{tapis}} de course, couvert d'{{électrodes}}.
      Il porte maintenant des {{clous}} (pointes) aux pieds.
      
      **3. DÉSHUMANISATION**
      
      Il a été "mesuré comme on fait d'un {{cheval}}".
      Il a "pissé dans un {{bocal}}" (test médical).
      On lui a mis un {{numéro}} sur le dos.
      Il court "toujours en {{rond}}" (enfermé).
      
      **4. MONDIALISATION / ALIÉNATION**
      
      Les parents ont signé un contrat contre des {{dollars}}.
      Le {{hasard}} a croisé sa vie.
      Il est maintenant {{étranger}} partout.`,
      motsCaches: [
        'plage', 'alizés', 'pieds nus', 'ancêtres', 'caressait',
        'chronomètre', 'avion', 'tapis', 'électrodes', 'clous',
        'cheval', 'bocal', 'numéro', 'rond',
        'dollars', 'hasard', 'étranger'
      ],
      indicesOptionnels: [
        'Lieu naturel près de la mer',
        'Vents tropicaux',
        'Sans chaussures',
        'Prédécesseurs familiaux',
        'Touchait avec tendresse',
        'Instrument de mesure du temps',
        'Moyen de transport aérien',
        'Machine pour courir sur place',
        'Capteurs médicaux',
        'Pointes de chaussures',
        'Animal de course',
        'Récipient en verre',
        'Chiffre d\'identification',
        'Forme circulaire',
        'Monnaie américaine',
        'Concours de circonstances',
        'Qui n\'appartient pas'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 12
  })
};

const ecran7: EcranCeredis = {
  id: 'lecoureur-s2-e7',
  numero: 7,
  titre: 'Production - Description d\'un lieu transformé',
  type: 'texte_libre',
  consigne: 'Décrivez un lieu AVANT et APRÈS sa transformation',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Sujet : "Un lieu que je connais, AVANT et APRÈS"
      
      Comme Goldman décrit la plage AVANT et les villes APRÈS, décrivez un lieu 
      que vous connaissez et qui a changé (ou imaginez ce changement).
      
      Ce peut être :
      - Un quartier qui a été modernisé
      - Une forêt qui a été remplacée par des immeubles
      - Un village devenu ville
      - Une plage devenue station touristique
      
      Rédigez un texte de 200-250 mots qui :
      1. Décrit le lieu AVANT (utilisez le vocabulaire de la nature : plage, arbres, calme...)
      2. Décrit le lieu APRÈS (utilisez le vocabulaire de la modernité : béton, voitures, bruit...)
      3. Utilise l'opposition "caresser/écorcher" ou une métaphore similaire
      4. Donne votre sentiment : est-ce un progrès ou une perte ?`,
      nombreMotsMin: 200,
      nombreMotsMax: 250,
      aideRedaction: [
        'AVANT : vocabulaire nature (arbres, rivière, calme, oiseaux, vert...)',
        'APRÈS : vocabulaire modernité (béton, voitures, bruit, immeubles, gris...)',
        'Utilisez une métaphore comme "caresser/écorcher" (ex: "On a blessé la terre")',
        'Bilan nuancé : gains ET pertes'
      ],
      criteres: [
        { label: 'Vocabulaire nature (AVANT)', description: 'Utilise le champ lexical de la nature', points: 4 },
        { label: 'Vocabulaire modernité (APRÈS)', description: 'Utilise le champ lexical de la modernité', points: 4 },
        { label: 'Métaphore/Opposition', description: 'Crée une opposition poétique (type caresser/écorcher)', points: 4 },
        { label: 'Qualité de l\'expression', description: 'Clarté, richesse du vocabulaire', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.1'],
    evidenceType: 'P3',
    niveau: 'B1',
    scoreMax: 15
  })
};

const ecran8: EcranCeredis = {
  id: 'lecoureur-s2-e8',
  numero: 8,
  titre: 'Bilan du vocabulaire',
  type: 'bilan',
  consigne: 'Synthèse de la séance vocabulaire',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**VOCABULAIRE DU DÉRACINEMENT : CE QUE NOUS AVONS APPRIS**
    
    **4 CHAMPS LEXICAUX STRUCTURANTS** :
    
    **1. NATURE / AUTHENTICITÉ** (AVANT)
    - Plage, alizés, vagues, pieds nus, ancêtres, caresser
    → Harmonie, liberté, continuité culturelle
    
    **2. MODERNITÉ / TECHNOLOGIE** (APRÈS)
    - Chronomètre, avion, automobiles, tapis, électrodes, clous
    → Mesure, artifice, médiation technologique
    
    **3. DÉSHUMANISATION**
    - Cheval, mesuré, touché, bocal, numéro, en rond
    → Corps-objet, anonymisation, enfermement
    
    **4. MONDIALISATION / ALIÉNATION**
    - Dollars, signature, étranger, hasard
    → Transaction, perte d'appartenance, contingence
    
    **MÉTAPHORE CENTRALE** :
    
    | CARESSER | → | ÉCORCHER |
    |----------|---|----------|
    | Pieds nus | → | Clous aux pieds |
    | Tendresse | → | Violence |
    | Contact naturel | → | Médiation technologique |
    
    **MOT CLÉ : "NAGUÈRE"**
    
    Adverbe littéraire (= autrefois) qui crée une distance nostalgique.
    Le passé semble lointain, presque irréel.
    
    **MESSAGE PHILOSOPHIQUE** :
    
    Le vocabulaire montre la **transformation du rapport au monde** :
    - La nature devient objet d'exploitation
    - Le corps humain devient objet de mesure
    - L'identité culturelle devient numéro anonyme
    
    **Prochaine séance** : Grammaire - Imparfait vs passé composé, voix passive`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance2: SeanceCeredis = {
  id: 'lecoureur-s2',
  chansonId: 'le-coureur',
  numero: 2,
  titre: 'Vocabulaire : Nature, modernité, déshumanisation',
  description: `Exploration des 4 champs lexicaux qui structurent "Le coureur" :
  nature/authenticité, modernité/technologie, déshumanisation, mondialisation.
  Analyse de la métaphore centrale caresser/écorcher.`,
  
  objectifs: [
    'Maîtriser les 4 champs lexicaux du récit',
    'Comprendre la métaphore centrale caresser/écorcher',
    'Analyser le vocabulaire de la déshumanisation',
    'Distinguer vocabulaire de la nature et de la modernité',
    'Utiliser ce vocabulaire dans une production personnelle'
  ],
  
  dureeEstimee: 64,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.6'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D5'],
    niveauCible: 'B1',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 4, P2: 2, P3: 1, P4: 1 },
    competencesUniques: ['2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.6']
  }
};

export default seance2;
