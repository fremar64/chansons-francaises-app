/**
 * C'EST TA CHANCE - SÉANCE 2 (FORMAT CEREDIS)
 * Vocabulaire : Souffrance, blessure, intelligence, lucidité
 * 
 * Focus : Champ lexical de la transformation
 * Mots-clés : chance, blessure, souffrance, intelligence (sens philosophique), lucidité, dissonance, dissidence
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ctachance-s2-e1',
  numero: 1,
  titre: 'Introduction - Le vocabulaire de la transformation',
  type: 'introduction',
  consigne: 'Découvrez les mots-clés de la transformation',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 2 : LE VOCABULAIRE DE LA TRANSFORMATION**
    
    Cette séance explore le **champ lexical** qui structure tout le message de Goldman :
    
    **LE PARADOXE CENTRAL** :
    Goldman transforme des mots **négatifs** en mots **positifs** :
    
    | Négatif apparent | → | Positif réel |
    |------------------|---|--------------|
    | Souffrance | → | Source de rêves |
    | Blessure | → | Source de force |
    | Pas de chance | → | Intelligence (lucidité) |
    | Dissonance | → | Force personnelle |
    | Dissidence | → | Autonomie |
    
    **OBJECTIFS DE CETTE SÉANCE** :
    
    1. Comprendre le sens philosophique de "l'intelligence" (≠ QI)
    2. Maîtriser le champ lexical souffrance/transformation
    3. Distinguer les mots de l'adversité et ceux de la conquête
    4. Analyser comment Goldman renverse les significations
    
    **CONCEPT CLÉ** :
    
    L'"intelligence" chez Goldman = la **lucidité** de René Char :
    "La lucidité est la blessure la plus rapprochée du soleil"
    
    C'est une **expérience spirituelle**, pas une capacité cognitive.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ctachance-s2-e2',
  numero: 2,
  titre: 'Écoute ciblée - Repérage du vocabulaire',
  type: 'ecoute_ciblee',
  consigne: 'Écoutez et repérez les mots de la transformation',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_ciblee',
    contenu: `Pendant l'écoute, repérez :
    
    **1. LES MOTS DU MANQUE** :
    - "sort" (destin subi)
    - "pas née jolie"
    - "pas de privilège hérité"
    - "pas les papiers"
    
    **2. LES MOTS DE LA TRANSFORMATION** :
    - "blessure"
    - "souffrance"
    - "intelligence"
    - "force"
    - "impertinence"
    - "puissance"
    
    **3. LES MOTS DE LA RÉBELLION** :
    - "dissonance" (ne pas être en harmonie)
    - "dissidence" (rupture avec les normes)
    
    Notez combien de fois chaque concept apparaît.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.2', '5.1'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ctachance-s2-e3',
  numero: 3,
  titre: 'QCM - Sens des mots clés',
  type: 'quiz_qcm',
  consigne: 'Vérifiez votre compréhension du vocabulaire',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie "l\'intelligence" dans le contexte de cette chanson ?',
        options: [
          'Le quotient intellectuel (QI)',
          'La lucidité spirituelle, l\'expérience de se connaître soi-même',
          'La ruse et la manipulation',
          'Les diplômes et les études'
        ],
        reponseCorrecte: 1,
        explication: 'L\'intelligence ici = la lucidité de René Char, une expérience spirituelle de découverte de soi, pas le QI.'
      },
      {
        id: 'q2',
        question: 'Que signifie "dissonance" ?',
        options: [
          'Un son musical désagréable',
          'Ne pas être en harmonie avec les normes sociales',
          'Une maladie',
          'Un type de musique'
        ],
        reponseCorrecte: 1,
        explication: 'La dissonance = ne pas être "en accord" avec la société. Goldman en fait une FORCE.'
      },
      {
        id: 'q3',
        question: 'Pourquoi Goldman dit "les autres assoupis d\'évidence" ?',
        options: [
          'Parce qu\'ils dorment beaucoup',
          'Parce que les privilégiés dorment dans leurs certitudes sans se remettre en question',
          'Parce qu\'ils sont malades',
          'Parce qu\'ils sont fatigués de travailler'
        ],
        reponseCorrecte: 1,
        explication: 'Les "assoupis d\'évidence" = ceux qui n\'ont jamais eu à se battre, endormis dans leurs privilèges.'
      },
      {
        id: 'q4',
        question: 'Quelle est la différence entre "jolie" et "belle" dans la chanson ?',
        options: [
          'Aucune, ce sont des synonymes',
          '"Jolie" = beauté physique de naissance / "Belle" = beauté intérieure à construire',
          '"Belle" est plus fort que "jolie"',
          '"Jolie" est péjoratif'
        ],
        reponseCorrecte: 1,
        explication: 'Distinction fondamentale : on NAÎT jolie (ou pas), on DEVIENT belle par transformation intérieure.'
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
  id: 'ctachance-s2-e4',
  numero: 4,
  titre: 'Analyse du champ lexical',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez les oppositions de vocabulaire',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Dans "Y a tant de rêves qui naissent d\'une vraie souffrance", quel procédé linguistique Goldman utilise-t-il ?',
        options: [
          'Une métaphore',
          'Un oxymore ou paradoxe (rêves ≠ souffrance habituellement)',
          'Une comparaison',
          'Une hyperbole'
        ],
        reponseCorrecte: 1,
        explication: 'Paradoxe : normalement souffrance → tristesse. Ici : souffrance → rêves et envies.',
        promptJustification: 'Expliquez comment la souffrance peut engendrer des rêves. Donnez un exemple personnel ou historique (70 mots min)',
        justificationMinLength: 70
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman utilise-t-il le mot "dissidence" plutôt que "rébellion" ?',
        options: [
          'C\'est le même sens',
          'Dissidence implique une rupture intellectuelle réfléchie, pas juste une révolte émotionnelle',
          'Pour la rime',
          'C\'est un mot plus moderne'
        ],
        reponseCorrecte: 1,
        explication: 'Dissidence = rupture consciente et lucide. Goldman refuse la "fausse insolence" (cf. "Compte pas sur moi").',
        promptJustification: 'Expliquez la différence entre "dissidence" (rupture réfléchie) et "rébellion" (révolte). Pourquoi Goldman préfère-t-il la première ? (70 mots min)',
        justificationMinLength: 70
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

const ecran5: EcranCeredis = {
  id: 'ctachance-s2-e5',
  numero: 5,
  titre: 'Texte à trous - Champ lexical',
  type: 'texte_a_trous',
  consigne: 'Complétez avec les mots du vocabulaire étudié',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**LE VOCABULAIRE DE LA TRANSFORMATION**
      
      Goldman distingue deux types de beauté :
      - La beauté {{physique}} (être née "{{jolie}}") = donnée ou non à la naissance
      - La beauté {{intérieure}} (devenir "{{belle}}") = à construire par soi-même
      
      Le paradoxe central : ce qui semble être une {{malédiction}} est en fait une {{chance}}.
      
      La {{souffrance}} devient source de {{rêves}} et d'{{envies}}.
      La {{blessure}} devient source de {{force}} et d'{{impertinence}}.
      
      Goldman oppose :
      - Les "{{assoupis}}" d'évidence (les privilégiés qui ne réfléchissent pas)
      - Les "{{dissidents}}" (ceux qui doivent prouver deux fois plus)
      
      L'"{{intelligence}}" au sens de Goldman = la {{lucidité}} philosophique,
      c'est-à-dire l'expérience {{spirituelle}} de se connaître soi-même.`,
      motsCaches: [
        'physique', 'jolie', 'intérieure', 'belle', 'malédiction', 'chance',
        'souffrance', 'rêves', 'envies', 'blessure', 'force', 'impertinence',
        'assoupis', 'dissidents', 'intelligence', 'lucidité', 'spirituelle'
      ],
      indicesOptionnels: [
        'Adjectif - du corps',
        'Adjectif - belle de naissance',
        'Adjectif - de l\'âme',
        'Adjectif - à devenir',
        'Nom - mauvais sort',
        'Nom - opportunité',
        'Nom - douleur',
        'Nom pl. - aspirations nocturnes',
        'Nom pl. - désirs',
        'Nom - plaie',
        'Nom - puissance',
        'Nom - audace',
        'Part. passé - endormis',
        'Nom pl. - rebelles lucides',
        'Nom - capacité de comprendre',
        'Nom - clarté d\'esprit',
        'Adjectif - de l\'esprit'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'ctachance-s2-e6',
  numero: 6,
  titre: 'Ordre des éléments - Progression du message',
  type: 'ordre_elements',
  consigne: 'Reconstituez la logique de transformation',
  dureeEstimee: 6,
  difficulte: 'moyen',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: 'Remettez ces étapes de la transformation dans l\'ordre logique du message de Goldman :',
      elements: [
        { id: 'oe1-1', texte: 'Ne pas être né avec les bons atouts (beauté, privilèges, papiers)', ordre: 0 },
        { id: 'oe1-2', texte: 'Ressentir la souffrance de ce manque', ordre: 1 },
        { id: 'oe1-3', texte: 'Développer la lucidité (intelligence) par cette souffrance', ordre: 2 },
        { id: 'oe1-4', texte: 'Transformer la blessure en source de force', ordre: 3 },
        { id: 'oe1-5', texte: 'Conquérir par soi-même ce que le sort n\'a pas donné', ordre: 4 },
        { id: 'oe1-6', texte: 'Devenir plus fort que les "assoupis d\'évidence"', ordre: 5 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.2'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran7: EcranCeredis = {
  id: 'ctachance-s2-e7',
  numero: 7,
  titre: 'Production - Mon dictionnaire de transformation',
  type: 'texte_libre',
  consigne: 'Créez votre propre vocabulaire de transformation',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**EXERCICE : MON DICTIONNAIRE DE TRANSFORMATION**
      
      À la manière de Goldman, créez votre propre "dictionnaire" de transformation.
      
      Choisissez 3 mots "négatifs" de votre vie et transformez-les en mots "positifs".
      
      **Format** :
      Pour chaque mot, écrivez :
      1. Le mot négatif de départ
      2. → Le mot positif de transformation
      3. Explication personnelle (pourquoi cette transformation est possible)
      
      **Exemple** :
      - "Timidité" → "Observation" : Ma timidité m'a appris à observer les autres, 
        à comprendre leurs motivations, à écouter plus que parler.
      
      Rédigez 3 transformations (150-200 mots total).`,
      nombreMotsMin: 150,
      nombreMotsMax: 200,
      aideRedaction: [
        'Mot négatif 1 → Mot positif 1 + explication personnelle',
        'Mot négatif 2 → Mot positif 2 + explication personnelle',
        'Mot négatif 3 → Mot positif 3 + explication personnelle'
      ],
      criteres: [
        { label: 'Authenticité', description: 'Mots vraiment personnels, pas génériques', points: 4 },
        { label: 'Compréhension du paradoxe', description: 'Vraie transformation, pas juste synonyme', points: 4 },
        { label: 'Qualité des explications', description: 'Explications développées et convaincantes', points: 4 },
        { label: 'Expression', description: 'Clarté et richesse du vocabulaire', points: 3 }
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

const ecran8: EcranCeredis = {
  id: 'ctachance-s2-e8',
  numero: 8,
  titre: 'Journal - Les mots qui m\'ont marqué',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez aux mots qui vous ont le plus touché',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Quel mot ou expression de la chanson vous a le plus marqué ? Pourquoi ?',
      contexte: 'Les mots ont un pouvoir. Certains nous touchent plus que d\'autres.',
      sousQuestions: [
        'Y a-t-il un mot que vous n\'aviez jamais entendu ou compris ainsi ? Lequel ?',
        'Y a-t-il une expression qui vous a fait réfléchir sur votre propre vie ?',
        'Comment allez-vous utiliser ce nouveau vocabulaire dans votre quotidien ?',
        'Quelle stratégie avez-vous utilisée pour comprendre les mots difficiles ?'
      ],
      nombreMotsMin: 80,
      exemplesReponses: [
        'Identifier le mot ou l\'expression qui a résonné',
        'Expliquer pourquoi ce mot vous touche personnellement',
        'Réfléchir à comment l\'utiliser'
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

const ecran9: EcranCeredis = {
  id: 'ctachance-s2-e9',
  numero: 9,
  titre: 'Bilan - Le pouvoir des mots',
  type: 'bilan',
  consigne: 'Synthèse du vocabulaire de la transformation',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**BILAN : LE VOCABULAIRE DE LA TRANSFORMATION**
    
    **MOTS-CLÉS MAÎTRISÉS** :
    
    | Concept | Sens dans la chanson |
    |---------|---------------------|
    | **Intelligence** | Lucidité spirituelle, connaissance de soi (≠ QI) |
    | **Blessure** | Source de force, pas faiblesse |
    | **Souffrance** | Moteur de rêves et d'envies |
    | **Dissonance** | Force de ne pas être en harmonie avec les normes |
    | **Dissidence** | Rupture consciente et lucide |
    | **Jolie/Belle** | Physique donnée vs intérieure construite |
    | **Assoupis** | Les privilégiés endormis dans leurs certitudes |
    
    **LE PARADOXE FONDAMENTAL** :
    
    Goldman renverse le sens habituel des mots :
    - Ce qui semble NÉGATIF → devient POSITIF
    - Ce qui semble une FAIBLESSE → devient une FORCE
    - Ce qui semble une MALÉDICTION → devient une CHANCE
    
    **CONNEXION PHILOSOPHIQUE** :
    
    René Char : "La lucidité est la blessure la plus rapprochée du soleil"
    = L'intelligence vraie vient de la douleur de se connaître soi-même
    
    Nietzsche : "Là où tu rencontres ta plus grande douleur, là tu trouves ton plus grand bonheur"
    = La souffrance est le chemin vers la force
    
    **PROCHAINE SÉANCE** :
    Grammaire - Le futur de la nécessité ("Il faudra que tu...") :
    Comment Goldman utilise la grammaire pour exprimer l'obligation existentielle.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance2: SeanceCeredis = {
  id: 'ctachance-s2',
  chansonId: 'cest-ta-chance',
  numero: 2,
  titre: 'Vocabulaire : Souffrance, blessure, intelligence, lucidité',
  description: `Exploration du champ lexical de la transformation : comment Goldman renverse 
  le sens des mots "négatifs" (souffrance, blessure, pas de chance) en mots "positifs" 
  (force, rêves, intelligence). Focus sur le sens philosophique de l'intelligence comme lucidité.`,
  
  objectifs: [
    'Comprendre le sens philosophique de "l\'intelligence" (lucidité ≠ QI)',
    'Maîtriser le champ lexical de la transformation (blessure→force, souffrance→rêves)',
    'Distinguer "jolie" (physique) vs "belle" (intérieure)',
    'Analyser les mots de la rébellion (dissonance, dissidence)',
    'Créer son propre vocabulaire de transformation'
  ],
  
  dureeEstimee: 70,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8, ecran9],
  
  competences: ['1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D5'],
    niveauCible: 'B1',
    scoreMaxTotal: 63,
    distributionEvidences: { P1: 3, P2: 3, P3: 1, P4: 2 },
    competencesUniques: ['1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance2;
