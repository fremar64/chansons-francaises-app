/**
 * C'EST TA CHANCE - SÉANCE 4 (FORMAT CEREDIS)
 * Débat : Accepter ou refuser les injustices de la naissance ?
 * 
 * Focus : "Tout ce que le sort ne t'a pas donné / Tu le prendras toi-même"
 * Question éthique : Est-il juste de devoir "prouver deux fois plus" ?
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ctachance-s4-e1',
  numero: 1,
  titre: 'Introduction - La question éthique centrale',
  type: 'introduction',
  consigne: 'Découvrez la question morale au cœur de la chanson',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 4 : DÉBAT PHILOSOPHIQUE**
    
    **LA QUESTION CENTRALE** :
    
    Goldman écrit : "Toujours prouver deux fois plus que les autres assoupis d'évidence"
    
    Cette phrase pose UNE QUESTION ÉTHIQUE FONDAMENTALE :
    
    **Est-il JUSTE de devoir prouver deux fois plus quand on n'a rien reçu ?**
    
    **DEUX POSITIONS OPPOSÉES** :
    
    **POSITION A** : C'est INJUSTE mais c'est la réalité
    → On doit se battre deux fois plus pour compenser les inégalités de naissance
    → Ce n'est pas juste, mais c'est ainsi
    → Le message de Goldman est RÉALISTE
    
    **POSITION B** : C'est INJUSTE et il faut changer le système
    → Pourquoi accepter de prouver deux fois plus ?
    → C'est au système de changer, pas aux victimes de compenser
    → Le message de Goldman est CONSERVATEUR ?
    
    **ATTENTION** :
    Ce n'est PAS un débat avec une "bonne réponse".
    C'est un débat où la QUALITÉ de l'argumentation compte.
    
    **OBJECTIFS** :
    1. Comprendre les deux positions
    2. Développer des arguments nuancés
    3. Écouter et répondre aux contre-arguments
    4. Formuler sa propre position`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.5'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ctachance-s4-e2',
  numero: 2,
  titre: 'Écoute ciblée - Les injustices énoncées',
  type: 'ecoute_ciblee',
  consigne: 'Identifiez les injustices que Goldman mentionne',
  dureeEstimee: 6,
  audioDebut: 0,
  audioFin: 240,
  activite: {
    type: 'ecoute_ciblee',
    contenu: `Pendant l'écoute, LISTEZ les injustices mentionnées :
    
    **INJUSTICES PHYSIQUES** :
    - Pas née jolie
    - "Une drôle de peau"
    
    **INJUSTICES SOCIALES** :
    - "Pas très catholique" (religion minoritaire)
    - "Pas de privilège hérité"
    - "Les fées ont loupé ton berceau"
    - "Pas les papiers pour être fonctionnaire"
    - "Tu seras jamais notaire"
    
    **QUESTION À SE POSER** :
    Ces injustices sont-elles :
    - Naturelles (on ne peut rien y faire) ?
    - Sociales (construites par la société) ?
    - Les deux ?
    
    Notez vos réflexions pendant l'écoute.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['1.2', '2.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ctachance-s4-e3',
  numero: 3,
  titre: 'QCM - Comprendre les deux positions',
  type: 'quiz_qcm',
  consigne: 'Vérifiez votre compréhension des positions en débat',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie "prouver deux fois plus que les autres" ?',
        options: [
          'Faire deux fois plus d\'études',
          'Devoir démontrer sa valeur davantage car on part avec un handicap social',
          'Travailler la nuit',
          'Être deux fois plus intelligent'
        ],
        reponseCorrecte: 1,
        explication: 'Les défavorisés doivent prouver plus car ils ne bénéficient pas du "bénéfice du doute" accordé aux privilégiés.'
      },
      {
        id: 'q2',
        question: 'Que signifie "les autres assoupis d\'évidence" ?',
        options: [
          'Ceux qui dorment beaucoup',
          'Les privilégiés qui n\'ont jamais eu à prouver leur valeur, endormis dans leurs certitudes',
          'Les paresseux',
          'Les ignorants'
        ],
        reponseCorrecte: 1,
        explication: 'Les privilégiés sont "assoupis" car ils n\'ont pas eu à lutter. Leur position semble "évidente", naturelle.'
      },
      {
        id: 'q3',
        question: 'Goldman dit "Tout seul, apprends à fonctionner". Que critique-t-il implicitement ?',
        options: [
          'La paresse des pauvres',
          'Le fait que le système n\'aide pas ceux qui n\'ont pas "les papiers"',
          'L\'individualisme',
          'Le travail en équipe'
        ],
        reponseCorrecte: 1,
        explication: 'Goldman reconnaît que le système exclut ("pas les papiers pour être fonctionnaire") et qu\'il faut donc "fonctionner" seul.'
      },
      {
        id: 'q4',
        question: 'Le message de Goldman est-il :',
        options: [
          'Purement optimiste : tout est possible',
          'Réaliste : il reconnaît les injustices mais appelle à les surmonter',
          'Pessimiste : rien n\'est possible',
          'Révolutionnaire : il faut renverser le système'
        ],
        reponseCorrecte: 1,
        explication: 'Goldman est réaliste : il ne nie pas les injustices, mais refuse la victimisation. Il appelle à la transformation PERSONNELLE.'
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
  id: 'ctachance-s4-e4',
  numero: 4,
  titre: 'Analyse - Arguments pour et contre',
  type: 'quiz_qcm_justifie',
  consigne: 'Développez les arguments des deux positions',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Quel est l\'argument FORT de la position A (Goldman a raison, il faut se battre) ?',
        options: [
          'C\'est la loi de la nature',
          'Attendre que le système change peut prendre des générations ; agir MAINTENANT permet de transformer sa vie MAINTENANT',
          'Les riches méritent leurs privilèges',
          'Se plaindre ne sert à rien'
        ],
        reponseCorrecte: 1,
        explication: 'L\'argument pragmatique : le changement individuel est possible immédiatement, le changement systémique prend des décennies.',
        promptJustification: 'Développez cet argument : pourquoi est-il parfois plus efficace d\'agir individuellement que d\'attendre le changement collectif ? (70 mots min)',
        justificationMinLength: 70
      },
      {
        id: 'q2',
        question: 'Quel est l\'argument FORT de la position B (le système doit changer) ?',
        options: [
          'Tout le monde devrait être riche',
          'Faire porter la responsabilité aux victimes (devoir prouver plus) est injuste et perpétue le système',
          'Il faut tout détruire',
          'Les privilégiés sont tous méchants'
        ],
        reponseCorrecte: 1,
        explication: 'L\'argument systémique : pourquoi les victimes devraient-elles compenser les injustices du système ?',
        promptJustification: 'Développez cet argument : en quoi demander aux victimes de "prouver deux fois plus" peut-il être vu comme une acceptation de l\'injustice ? (70 mots min)',
        justificationMinLength: 70
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
  id: 'ctachance-s4-e5',
  numero: 5,
  titre: 'Texte à trous - Vocabulaire du débat',
  type: 'texte_a_trous',
  consigne: 'Maîtrisez le vocabulaire de l\'argumentation',
  dureeEstimee: 7,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**VOCABULAIRE DU DÉBAT**
      
      **POSITION A** (agir individuellement) :
      
      "{{Certes}}, les injustices existent, {{mais}} il faut agir maintenant."
      "{{Plutôt}} que de se plaindre, il vaut mieux {{transformer}} sa blessure en force."
      "La {{responsabilité}} individuelle permet de ne pas rester {{victime}}."
      
      **POSITION B** (changer le système) :
      
      "{{Bien que}} l'action individuelle soit possible, elle ne {{résout}} pas l'injustice structurelle."
      "C'est au {{système}} de changer, pas aux {{victimes}} de compenser."
      "Demander de 'prouver deux fois plus' {{perpétue}} les {{inégalités}}."
      
      **NUANCER** :
      
      "D'{{un côté}}... de l'{{autre}}..."
      "{{Toutefois}}, il faut reconnaître que..."
      "La {{question}} est de savoir {{si}}..."`,
      motsCaches: [
        'Certes', 'mais', 'Plutôt', 'transformer', 'responsabilité', 'victime',
        'Bien que', 'résout', 'système', 'victimes', 'perpétue', 'inégalités',
        'un côté', 'autre', 'Toutefois', 'question', 'si'
      ],
      indicesOptionnels: [
        'Concessif - on admet',
        'Opposition',
        'Préférence',
        'Changer en mieux',
        'Ce dont on est responsable',
        'Personne qui subit',
        'Concessif + subj.',
        'Trouve la solution',
        'Organisation sociale',
        'Personnes qui subissent',
        'Continue, maintient',
        'Différences injustes',
        'Premier aspect',
        'Deuxième aspect',
        'Nuance, restriction',
        'Problème posé',
        'Conjonction hypothèse'
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
  id: 'ctachance-s4-e6',
  numero: 6,
  titre: 'Production - Mon argumentation',
  type: 'texte_libre',
  consigne: 'Développez votre position personnelle argumentée',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**EXERCICE : MON ARGUMENTATION**
      
      **Question** : Est-il juste de devoir "prouver deux fois plus" 
      quand on n'a pas eu de chance à la naissance ?
      
      **Rédigez une argumentation nuancée (200-280 mots)** :
      
      1. **Introduction** : Reformulez la question et annoncez votre position
      
      2. **Argument 1** : Présentez le meilleur argument de la position OPPOSÉE à la vôtre
         (Montrez que vous comprenez l'autre point de vue)
      
      3. **Réfutation** : Expliquez pourquoi cet argument ne vous convainc pas totalement
      
      4. **Argument 2** : Développez votre meilleur argument personnel
      
      5. **Conclusion** : Nuancez votre position (la réalité est complexe)
      
      **CRITÈRES** :
      - Utiliser le vocabulaire du débat (certes, mais, toutefois, bien que...)
      - Montrer que vous comprenez les deux positions
      - Éviter les extrêmes (tout noir ou tout blanc)
      - Conclure sur une nuance personnelle`,
      nombreMotsMin: 200,
      nombreMotsMax: 280,
      aideRedaction: [
        'Introduction : "La question de savoir si... est complexe."',
        'Concession : "Certes, on peut penser que..."',
        'Opposition : "Mais/Toutefois, je pense que..."',
        'Nuance finale : "Cependant, il faut reconnaître que..."'
      ],
      criteres: [
        { label: 'Compréhension des positions', description: 'Présente honnêtement les deux points de vue', points: 4 },
        { label: 'Qualité argumentative', description: 'Arguments développés et illustrés', points: 5 },
        { label: 'Vocabulaire du débat', description: 'Connecteurs logiques, nuances', points: 3 },
        { label: 'Nuance finale', description: 'Évite le manichéisme, conclusion ouverte', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.5'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'ctachance-s4-e7',
  numero: 7,
  titre: 'Journal - Ce débat m\'a fait réfléchir',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à l\'impact du débat sur votre pensée',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Ce débat a-t-il changé ou nuancé votre point de vue ? Comment ?',
      contexte: 'Un bon débat ne cherche pas à "gagner" mais à mieux comprendre la complexité.',
      sousQuestions: [
        'Aviez-vous une opinion tranchée avant ce débat ? Laquelle ?',
        'Quel argument de la position opposée vous a le plus fait réfléchir ?',
        'Votre position a-t-elle évolué ? Comment ?',
        'Pensez-vous que Goldman aurait pu être plus nuancé ? Sur quoi ?'
      ],
      nombreMotsMin: 100,
      exemplesReponses: [
        'Avant, je pensais que... maintenant je comprends aussi que...',
        'L\'argument qui m\'a surpris est...',
        'Ma position a évolué vers plus de...'
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
  id: 'ctachance-s4-e8',
  numero: 8,
  titre: 'Bilan - La pensée critique',
  type: 'bilan',
  consigne: 'Synthèse du débat',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**BILAN : LA PENSÉE CRITIQUE**
    
    **CE QUE NOUS AVONS DÉBATTU** :
    
    Est-il juste de devoir "prouver deux fois plus" ?
    
    **POSITION A** : Oui, c'est la seule solution immédiate
    - Avantage : permet d'agir MAINTENANT
    - Limite : ne résout pas l'injustice structurelle
    
    **POSITION B** : Non, c'est au système de changer
    - Avantage : vise la justice à long terme
    - Limite : peut prendre des générations
    
    **LA NUANCE DE GOLDMAN** :
    
    Goldman n'est PAS un conservateur qui dit "accepte ton sort".
    Il dit : "Le système est injuste. MAIS. En attendant qu'il change,
    TU peux transformer ta blessure en force."
    
    C'est un message de SURVIE, pas de résignation.
    
    **CE QUE NOUS AVONS APPRIS** :
    
    1. **Argumenter** : Présenter des raisons, pas des opinions
    2. **Concéder** : Reconnaître la validité de l'autre point de vue
    3. **Réfuter** : Expliquer pourquoi un argument ne suffit pas
    4. **Nuancer** : Éviter le tout noir ou tout blanc
    
    **VOCABULAIRE DU DÉBAT** :
    Certes, mais, toutefois, bien que, d'un côté... de l'autre, 
    cependant, néanmoins, il n'en reste pas moins que...
    
    **PROCHAINE SÉANCE** :
    Production finale - "Ma chance" : Lettre à soi-même ou manifeste personnel`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance4: SeanceCeredis = {
  id: 'ctachance-s4',
  chansonId: 'cest-ta-chance',
  numero: 4,
  titre: 'Débat : Accepter ou refuser les injustices de la naissance ?',
  description: `Débat philosophique sur la question éthique centrale : est-il juste de devoir 
  "prouver deux fois plus que les autres assoupis d'évidence" ? Exploration des deux positions
  (agir individuellement vs changer le système) et développement de l'argumentation nuancée.`,
  
  objectifs: [
    'Comprendre la question éthique "prouver deux fois plus"',
    'Développer des arguments pour les deux positions',
    'Maîtriser le vocabulaire du débat (certes, mais, toutefois...)',
    'Produire une argumentation nuancée',
    'Réfléchir à l\'impact du débat sur sa propre pensée'
  ],
  
  dureeEstimee: 66,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['1.2', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D2', 'D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 55,
    distributionEvidences: { P1: 3, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['1.2', '2.2', '2.3', '3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance4;
