/**
 * C'EST TA CHANCE - SÉANCE 1
 * Découverte : Les injustices de la vie et la transformation nécessaire
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ctachance-s1-e1',
  numero: 1,
  titre: 'Introduction - À qui s\'adresse cette chanson ?',
  type: 'introduction',
  consigne: 'Découvrez à qui Goldman s\'adresse et pourquoi',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `"C'est ta chance" n'est pas une chanson motivationnelle générique.
    C'est un **message radical adressé à ceux que la vie a défavorisés**.
    
    **À QUI Goldman s'adresse-t-il ?**
    
    Cette chanson utilise le **"tu"** pour s'adresser spécifiquement à :
    
    1. **Aux filles qui ne sont pas nées jolies** :
       "Tu seras jamais la reine du bal vers qui se tournent les yeux éblouis"
       "Pour que tu sois belle, il faudra que tu le deviennes / Puisque tu n'es pas née jolie"
       → Invitation à remplacer la beauté physique par la beauté intérieure
    
    2. **Aux personnes nées dans un milieu défavorisé** :
       "Toi, t'es pas très catholique / Et t'as une drôle de peau"
       "Chez toi, les fées soi-disant magiques ont loupé ton berceau"
       "Tu seras sûrement jamais notaire / Pas de privilège hérité"
       → Ceux à qui la naissance n'a rien donné
    
    3. **Aux "moins que rien" de la société** :
       Ceux qui sont tout en bas de l'échelle sociale, qui vivent avec des complexes d'infériorité,
       qui se sentent tout petits devant les mieux nantis.
    
    **Le thème central** :
    **Les injustices de la vie et la nécessité de conquérir par soi-même ce que la vie ne nous a pas donné**
    
    "Il te faudra gagner pouce à pouce / Les oublis de la vie"
    "Tout ce que le sort ne t'a pas donné / Tu le prendras toi-même"
    
    **Le pouvoir transformateur de Goldman** :
    Beaucoup d'entre nous se sont reconnus dans cette chanson. Elle touche et mobilise
    ceux qui subissent leur sort, les appelle à se rebeller contre les injustices de la vie.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '2.2'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran1bis: EcranCeredis = {
  id: 'ctachance-s1-e1bis',
  numero: 2,
  titre: 'Analyse prosodique et stylistique',
  type: 'introduction',
  consigne: 'Découvrez la forme poétique de la chanson',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE DE LA CHANSON "C'EST TA CHANCE"**
    
    **ORGANISATION** :
    - 3 couplets (strophes narratives)
    - 2 refrains distincts (Refrain 1 et Refrain 2)
    - Structure : Couplet 1 → Refrain 1 → Couplet 2 → Refrain 1 → Couplet 3 → Refrain 2 (répété 2 fois)
    
    **VERSIFICATION** :
    - Vers de longueur variable (6-12 syllabes)
    - Pas de métrique stricte → proche du langage parlé, naturel
    - Nombreux **enjambements** : "Il te faudra gagner pouce à pouce / Les oublis de la vie"
    
    **RIMES** :
    - Rimes riches : douce/pouce, aussi/vie, bal/éblouis, jolie/prix
    - Schéma AABB (rimes plates)
    - Parfois rimes approximatives ("essence"/"impertinence")
    
    **EFFETS STYLISTIQUES** :
    
    1. **Anaphore** : Répétition de "C'est ta chance" (8 fois)
       → Insistance, martèlement du message
    
    2. **Parallélisme** : "Il faudra que tu..." (structure répétée)
       → Rythme incantatoire, impression de rituel initiatique
    
    3. **Oxymore** : "C'est ta chance / Le cadeau de ta naissance"
       → Paradoxe : ne PAS avoir eu de chance = justement ta chance
    
    4. **Métaphore centrale** : "La blessure où tu viendras puiser la force"
       → La souffrance comme source de puissance
    
    5. **Antithèses structurantes** :
       - "jolie" (beauté physique) vs "belle" (beauté intérieure)
       - "pas de chance" vs "intelligence"
       - "pas née jolie" vs "tu le deviennes"
    
    6. **Chiasme implicite** :
       "Y a tant d'envies, tant de rêves qui naissent d'une vraie souffrance"
       → Souffrance → Rêves / Rêves ← Souffrance
    
    **TON** :
    - **Impératif implicite** : conseil pressant, presque ordre
    - **Futur de la nécessité** : "il faudra" (pas de choix)
    - **Adresse directe au "tu"** : interpellation personnelle, intime
    
    **EFFET GLOBAL** :
    La structure renforce le message : la répétition obsédante de "C'est ta chance"
    transforme progressivement ce qui semblait être une malédiction en bénédiction.
    Le martèlement crée une conviction : OUI, c'est vraiment ta chance.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ctachance-s1-e2',
  numero: 3,
  titre: 'Première écoute - Identification',
  type: 'ecoute_decouverte',
  consigne: 'Écoutez et identifiez à qui s\'adresse cette chanson',
  dureeEstimee: 5,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_decouverte',
    contenu: `Concentrez-vous sur :
    - Le "tu" utilisé : à qui parle Goldman ?
    - Les exemples donnés : "pas née jolie", "pas de privilège hérité"
    - Le refrain répété : "C'est ta chance" - paradoxe ?`
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.1', '1.2', '2.1'],
    evidenceType: 'P1',
    niveau: 'A2',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ctachance-s1-e3',
  numero: 4,
  titre: 'Compréhension globale',
  type: 'quiz_qcm',
  consigne: 'Vérifiez votre compréhension du message',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'À qui Goldman s\'adresse-t-il principalement dans cette chanson ?',
        options: [
          'Aux privilégiés qui ont tout reçu',
          'Aux défavorisés qui n\'ont rien reçu à la naissance',
          'À tout le monde indifféremment',
          'Aux enfants seulement'
        ],
        reponseCorrecte: 1,
        explication: 'Goldman parle à ceux qui ne sont "pas nés avec la bonne peau", sans privilèges hérités.'
      },
      {
        id: 'q2',
        question: 'Quelle différence Goldman fait-il entre "jolie" et "belle" ?',
        options: [
          'Aucune différence',
          '"Jolie" = beauté physique donnée, "Belle" = beauté intérieure à construire',
          '"Belle" est plus fort que "jolie"',
          'C\'est juste une variation stylistique'
        ],
        reponseCorrecte: 1,
        explication: '"Jolie" on naît (ou pas), "Belle" on le devient par transformation intérieure.'
      },
      {
        id: 'q3',
        question: 'Que signifie "Tout ce que le sort ne t\'a pas donné / Tu le prendras toi-même" ?',
        options: [
          'Il faut voler ce qu\'on n\'a pas',
          'Il faut conquérir par ses propres efforts ce que la vie n\'a pas donné',
          'Il faut se plaindre de son sort',
          'Il faut demander aux autres'
        ],
        reponseCorrecte: 1,
        explication: 'C\'est un appel à l\'action : ne pas subir, mais prendre en main sa transformation.'
      },
      {
        id: 'q4',
        question: 'Pourquoi Goldman dit "C\'est ta chance" alors que la personne n\'a PAS eu de chance ?',
        options: [
          'C\'est de l\'ironie cruelle',
          'C\'est une erreur',
          'C\'est un paradoxe : le manque devient moteur de transformation',
          'Pour consoler'
        ],
        reponseCorrecte: 2,
        explication: 'Paradoxe nietzschéen : la souffrance initiale devient source de force et de lucidité.'
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
  id: 'ctachance-s1-e4',
  numero: 5,
  titre: 'Analyse philosophique approfondie',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez le message philosophique profond',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie vraiment "La blessure où tu viendras puiser la force" ?',
        options: [
          'Les blessures physiques rendent fort',
          'La souffrance initiale devient source de puissance transformative (vision nietzschéenne)',
          'Il faut oublier ses blessures',
          'C\'est une métaphore sportive'
        ],
        reponseCorrecte: 1,
        explication: 'Vision nietzschéenne : là où tu rencontres ta plus grande douleur, tu trouves ton plus grand bonheur.',
        promptJustification: 'Expliquez comment une blessure (ne pas être née jolie, ne pas avoir de privilèges) peut devenir une force selon Goldman. Donnez un exemple concret (80 mots min)',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman parle-t-il de "solitude" ("Il faudra que tu sois douce / Et solitaire aussi") ?',
        options: [
          'Parce qu\'on sera seul et malheureux',
          'C\'est une solitude métaphysique : se retirer en soi pour développer sa lucidité',
          'Parce qu\'il faut éviter les gens',
          'C\'est un conseil de timidité'
        ],
        reponseCorrecte: 1,
        explication: 'La solitude ici = expérience spirituelle, pas isolement social. C\'est la lucidité de René Char.',
        promptJustification: 'Analysez la différence entre "être seul" (isolement) et "être solitaire" (expérience métaphysique de construction de soi). Pourquoi cette solitude est-elle nécessaire ? (80 mots min)',
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
  id: 'ctachance-s1-e5',
  numero: 6,
  titre: 'Le vocabulaire de la transformation',
  type: 'texte_a_trous',
  consigne: 'Identifiez les mots-clés de la transformation',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `LE VOCABULAIRE DE LA TRANSFORMATION
      
      **Du manque à la force** :
      
      "Tout ce que le {{sort}} ne t'a pas {{donné}}
      Tu le {{prendras}} toi-même"
      
      **De la souffrance au rêve** :
      
      "Y a tant d'envies, tant de {{rêves}} qui naissent d'une vraie {{souffrance}}
      Qui te {{lance}} et te soutient"
      
      **De la blessure à la puissance** :
      
      "La {{blessure}} où tu viendras {{puiser}} la force et l'{{impertinence}}
      Qui t'{{avance}} un peu plus loin"
      
      **Message** : La transformation ne supprime pas la souffrance, elle la {{transforme}} en {{force}}.
      C'est une vision {{nietzschéenne}} : "Ce qui ne me tue pas me rend plus {{fort}}".`,
      motsCaches: ['sort', 'donné', 'prendras', 'rêves', 'souffrance', 'lance', 'blessure', 'puiser', 'impertinence', 'avance', 'transforme', 'force', 'nietzschéenne', 'fort'],
      indicesOptionnels: [
        'Nom - destin',
        'Participe passé (donner)',
        'Futur simple (prendre)',
        'Nom pluriel - aspirations',
        'Nom - douleur',
        'Présent (lancer)',
        'Nom - plaie intérieure',
        'Infinitif - extraire',
        'Nom - audace',
        'Présent (avancer)',
        'Présent (transformer)',
        'Nom - puissance',
        'Adjectif - philosophie de Nietzsche',
        'Adjectif - robuste'
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
  id: 'ctachance-s1-e6',
  numero: 7,
  titre: 'Production - Mon "pas de chance"',
  type: 'texte_libre',
  consigne: 'Rédigez votre propre transformation',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `Sujet : "Mon 'pas de chance' peut devenir ma chance"
      
      Goldman dit : "Faudra remplacer tous les 'pas de chance' par de l'intelligence"
      
      Rédigez un texte de 180-220 mots qui :
      1. Identifie UN "pas de chance" dans votre vie (quelque chose que vous n'avez pas reçu)
      2. Explique comment cela vous a fait souffrir ou vous a limité
      3. Imagine comment ce manque pourrait devenir une force
      4. Conclut sur la possibilité de transformation
      
      Inspirez-vous du paradoxe de Goldman : là où est votre blessure, là est votre force potentielle.`,
      nombreMotsMin: 180,
      nombreMotsMax: 220,
      aideRedaction: [
        'Introduction : Quel est mon "pas de chance" ? (physique, social, familial...)',
        'Développement 1 : Comment cela m\'a affecté négativement',
        'Développement 2 : Comment je pourrais transformer ce manque en force',
        'Conclusion : Accepter le paradoxe - ma blessure = ma chance'
      ],
      criteres: [
        { label: 'Honnêteté personnelle', description: 'Identification sincère d\'un vrai "pas de chance"', points: 4 },
        { label: 'Compréhension du paradoxe', description: 'Saisit comment le manque devient force', points: 4 },
        { label: 'Profondeur réflexive', description: 'Va au-delà de l\'anecdote, touche l\'essentiel', points: 4 },
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
  id: 'ctachance-s1-e7',
  numero: 8,
  titre: 'Journal - Me suis-je reconnu(e) ?',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à votre résonance avec la chanson',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Vous êtes-vous reconnu(e) dans cette chanson ? Pourquoi cette chanson touche-t-elle autant de gens ?',
      contexte: 'Goldman a dit que beaucoup de gens se sont reconnus dans "C\'est ta chance". C\'est son pouvoir transformateur.',
      sousQuestions: [
        'Quelle partie de la chanson vous a le plus touché(e) ? Pourquoi ?',
        'Vous sentez-vous concerné(e) par ce message ? Dans quelle mesure ?',
        'Pensez-vous que cette chanson peut vraiment aider quelqu\'un à se transformer ?',
        'Quel est le pouvoir d\'une chanson comme celle-ci ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Identifier honnêtement si vous vous reconnaissez (ou pas)',
        'Réfléchir aux "pas de chance" que vous avez eus',
        'Penser au pouvoir des mots pour mobiliser, donner de l\'espoir',
        'Ne pas minimiser : cette chanson a changé des vies'
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
  id: 'ctachance-s1-e8',
  numero: 9,
  titre: 'Bilan de la découverte',
  type: 'bilan',
  consigne: 'Synthèse de la séance de découverte',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**MESSAGE CENTRAL DÉCOUVERT** :
    
    "C'est ta chance" s'adresse aux défavorisés de la vie :
    - Celles qui ne sont pas nées jolies → devenir belle (intérieurement)
    - Ceux qui n'ont pas de privilèges hérités → conquérir par soi-même
    - Tous les "moins que rien" → transformer leur blessure en force
    
    **PARADOXE CENTRAL** :
    Ne PAS avoir eu de chance à la naissance = justement TA CHANCE
    
    Pourquoi ? Parce que :
    - La souffrance crée des rêves et des envies puissantes
    - La blessure devient source de force et d'impertinence
    - L'absence de privilèges oblige à développer l'intelligence (lucidité)
    
    **PHILOSOPHIE** :
    
    1. **Vision nietzschéenne** : "Là où est ta plus grande douleur, là est ton plus grand bonheur"
    
    2. **Lucidité de René Char** : "La lucidité est la blessure la plus rapprochée du soleil"
       → L'intelligence ici = expérience spirituelle de construction de soi
    
    3. **Solitude métaphysique** : Se retirer en soi pour développer sa force intérieure
    
    4. **Transformation active** : "Tout ce que le sort ne t'a pas donné / Tu le prendras toi-même"
    
    **CONNEXIONS** :
    - "Là-bas" : même refus du déterminisme social
    - "Envole-moi" : "À coups de livres je franchirai tous ces murs"
    - "Il suffira d'un signe" : "Déchirées nos guenilles de vauriens"
    
    **POUVOIR DE LA CHANSON** :
    Beaucoup se sont reconnus et ont été mobilisés par cet appel à ne pas subir son sort.
    
    **Prochaine séance** : Vocabulaire - Souffrance, blessure, intelligence, lucidité`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance1: SeanceCeredis = {
  id: 'ctachance-s1',
  chansonId: 'cest-ta-chance',
  numero: 1,
  titre: 'Découverte : Les injustices de la vie et la transformation nécessaire',
  description: `Découverte philosophique de "C'est ta chance" comme appel radical aux défavorisés.
  Cette séance révèle à qui Goldman s'adresse (filles pas jolies, défavorisés sociaux, "moins que rien")
  et explore le paradoxe central : ne pas avoir eu de chance = justement ta chance.`,
  
  objectifs: [
    'Comprendre à qui Goldman s\'adresse (défavorisés, pas nés avec les bons atouts)',
    'Saisir le paradoxe : "pas de chance" → "ta chance"',
    'Analyser la forme prosodique (versification, rimes, anaphore, oxymore)',
    'Identifier le vocabulaire de la transformation (blessure→force, souffrance→rêves)',
    'Réfléchir personnellement sur ses propres "pas de chance"'
  ],
  
  dureeEstimee: 62,
  
  ecrans: [ecran1, ecran1bis, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'B1',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 3, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance1;
