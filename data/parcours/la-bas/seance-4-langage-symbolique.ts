/**
 * LÀ-BAS - SÉANCE 4
 * Langage symbolique : L'expérience métaphysique limite
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'labas-s4-e1',
  numero: 1,
  titre: 'Introduction - Le langage symbolique de l\'expérience limite',
  type: 'introduction',
  consigne: 'Découvrez comment Goldman utilise le langage symbolique des grandes œuvres',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `Cette séance révèle pourquoi "Là-bas" appartient à la **grande littérature philosophique**.
    
    ## LE LANGAGE SYMBOLIQUE
    
    Les grandes œuvres (Bible, Platon, Rimbaud, Dostoïevski) n'utilisent pas un langage littéral 
    mais **symbolique** pour exprimer des expériences métaphysiques limites.
    
    Goldman fait exactement la même chose. Ses mots ne sont pas décoratifs : 
    ils forment un **champ sémantique métaphysique cohérent**.
    
    ## L'OPPOSITION ICI/LÀ-BAS : DEUX MODALITÉS D'ÊTRE-AU-MONDE
    
    **ICI** = Familiarité quotidienne (_Zuhandenheit_ - Heidegger)
    - On se sent "chez soi" dans le monde
    - Les choses sont évidentes, non questionnées
    - Sécurité ontologique
    
    **LÀ-BAS** = Étrangeté originelle (_Unheimlichkeit_ - Heidegger)
    - Découverte que le monde n'est pas "chez soi"
    - Les choses deviennent énigmatiques
    - Angoisse ontologique
    
    **Ce ne sont PAS des lieux géographiques**, mais **deux modalités contradictoires** 
    du rapport humain au monde et à l'être.
    
    ## LE PASSAGE PÉRILLEUX
    
    Passer de ICI à LÀ-BAS n'est pas un simple voyage. C'est une **transformation métaphysique** 
    décrite par 5 mots qui forment un ensemble cohérent : tempêtes, naufrages, feu, diables, mirages.
    
    **Cette séance explore ce vocabulaire de l'expérience limite.**`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'C1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'labas-s4-e2',
  numero: 2,
  titre: 'ICI/LÀ-BAS : Ambivalence ontologique',
  type: 'introduction',
  consigne: 'Comprenez l\'opposition comme deux rapports au monde',
  dureeEstimee: 7,
  activite: {
    type: 'introduction',
    contenu: `## DEUX MODALITÉS DE L'ÊTRE-AU-MONDE
    
    ### 1. ICI - La familiarité quotidienne
    
    **Caractéristiques** :
    - Le monde est **évident**, non questionné
    - On se sent **"chez soi"** dans son environnement
    - Sécurité affective et ontologique
    - "Nos rêves sont étroits" : horizon limité mais rassurant
    
    **Citations** :
    "Nos rêves sont étroits / [...] Et les autres imposent leur loi"
    → Enfermement MAIS confort du familier
    
    ### 2. LÀ-BAS - L'étrangeté originelle
    
    **Caractéristiques** :
    - Conscience approfondie qui **met en question** l'évidence du monde
    - Découverte de **l'étrangeté originelle** de l'être-là
    - Dépaysement **ontologique**, pas géographique
    - "Neuf et sauvage" : redécouverte du monde comme énigme
    
    **Citations** :
    "Là-bas, neuf et sauvage / Libre continent sans grillage"
    → Liberté MAIS perte de la familiarité
    
    ## L'AMBIVALENCE ONTOLOGIQUE
    
    L'existence humaine oscille entre ces deux modalités **contradictoires** :
    - ICI = sécurité + aliénation
    - LÀ-BAS = liberté + angoisse
    
    **Il n'y a pas de solution simple.** C'est un **dilemme tragique**.
    
    ## HEIDEGGER : _ÊTRE ET TEMPS_
    
    - **_Zuhandenheit_** (être-à-portée-de-la-main) : les choses familières
    - **_Unheimlichkeit_** (inquiétante étrangeté) : le monde devient énigme
    
    Goldman exprime poétiquement ce que Heidegger développe philosophiquement.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '2.3', '5.2', '5.3'],
    evidenceType: 'P1',
    niveau: 'C1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'labas-s4-e3',
  numero: 3,
  titre: 'Les 5 mots métaphysiques : Un champ sémantique cohérent',
  type: 'quiz_qcm',
  consigne: 'Identifiez la cohérence du vocabulaire symbolique',
  dureeEstimee: 10,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Les 5 mots (tempêtes, naufrages, feu, diables, mirages) forment un ensemble cohérent. Que décrivent-ils ?',
        options: [
          'Un voyage maritime dangereux',
          'Le passage périlleux de la familiarité à l\'étrangeté ontologique',
          'Les dangers de l\'émigration',
          'Une métaphore météorologique'
        ],
        reponseCorrecte: 1,
        explication: 'Ces 5 mots décrivent collectivement l\'expérience violente, périlleuse, vertigineuse du passage vers "là-bas".'
      },
      {
        id: 'q2',
        question: 'Pourquoi "tempêtes" plutôt que "difficultés" ?',
        options: [
          'Pour faire plus dramatique',
          'Pour évoquer le chaos ontologique quand les certitudes s\'effondrent',
          'Parce que c\'est maritime',
          'Pour la rime'
        ],
        reponseCorrecte: 1,
        explication: '"Tempêtes" = bouleversement radical, chaos quand le monde familier devient énigme (Job 38, Heidegger).'
      },
      {
        id: 'q3',
        question: 'Quelle est la fonction du mot "naufrages" ?',
        options: [
          'Évoquer un accident de bateau',
          'Symboliser la dissolution de l\'identité familière',
          'Créer une ambiance maritime',
          'Avertir des dangers physiques'
        ],
        reponseCorrecte: 1,
        explication: '"Naufrages" = perte des repères identitaires, comme chez Rimbaud ("Je est un autre").'
      },
      {
        id: 'q4',
        question: 'Pourquoi "feu" et non "lumière" ?',
        options: [
          'C\'est plus poétique',
          'Le feu exprime l\'AMBIVALENCE : destruction ET purification',
          'Pour évoquer l\'enfer',
          'Pour parler du soleil tropical'
        ],
        reponseCorrecte: 1,
        explication: '"Feu" = symbole biblique et philosophique de transformation incandescente (Exode, Héraclite).'
      },
      {
        id: 'q5',
        question: 'Comment ces 5 mots sont-ils liés ?',
        options: [
          'Ils évoquent tous la mer',
          'Ils décrivent collectivement l\'intensité EXTRÊME du passage ontologique',
          'Ils n\'ont pas de lien particulier',
          'Ils sont purement décoratifs'
        ],
        reponseCorrecte: 1,
        explication: 'Ensemble, ils forment le vocabulaire de l\'EXPÉRIENCE MÉTAPHYSIQUE LIMITE : violence, péril, vertige, tentation, inversion.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.1', '5.2'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 10
  })
};

const ecran4: EcranCeredis = {
  id: 'labas-s4-e4',
  numero: 4,
  titre: 'Analyse approfondie : Tempêtes, naufrages, feu',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la profondeur symbolique de chaque mot',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Que signifie "tempêtes" dans le contexte de la transformation ontologique ?',
        options: [
          'Mauvais temps',
          'Le chaos ontologique quand les certitudes familières s\'effondrent',
          'Les obstacles sociaux',
          'Les émotions fortes'
        ],
        reponseCorrecte: 1,
        explication: '"Tempêtes" évoque le moment où le monde cesse d\'être évident et devient énigme (Job 38, Heidegger\'s Angst).',
        promptJustification: 'Expliquez pourquoi "tempêtes" est le mot juste pour décrire le moment où notre familiarité avec le monde se brise. Référez-vous à l\'expérience de Job ou à l\'angoisse heideggérienne. (100 mots min)',
        justificationMinLength: 100
      },
      {
        id: 'q2',
        question: 'Pourquoi "naufrages" symbolise-t-il la dissolution de l\'identité ?',
        options: [
          'Parce qu\'on peut se noyer',
          'Parce que l\'identité familière se dissout quand on quitte le monde familier',
          'Parce que c\'est dangereux',
          'Pour évoquer un accident'
        ],
        reponseCorrecte: 1,
        explication: '"Naufrages" = perte des repères identitaires. Quand le monde change, qui sommes-nous ? (Rimbaud, Nietzsche 1889).',
        promptJustification: 'Analysez comment "naufrages" exprime la perte de soi quand on quitte la familiarité. Pourquoi ne peut-on pas rester "le même" en allant "là-bas" ? (100 mots min)',
        justificationMinLength: 100
      },
      {
        id: 'q3',
        question: 'Quelle est l\'ambivalence du "feu" ?',
        options: [
          'Il brûle et éclaire',
          'Il détruit ET purifie - transformation incandescente',
          'Il est chaud et rouge',
          'Il fait peur et fascine'
        ],
        reponseCorrecte: 1,
        explication: 'Le feu (Exode, Héraclite) = transformation par destruction créatrice. L\'ancien doit brûler pour que le nouveau émerge.',
        promptJustification: 'Expliquez l\'ambivalence du feu : pourquoi la transformation authentique nécessite-t-elle une destruction ? Référez-vous au buisson ardent (Exode) ou à Héraclite. (100 mots min)',
        justificationMinLength: 100
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 15
  })
};

const ecran5: EcranCeredis = {
  id: 'labas-s4-e5',
  numero: 5,
  titre: 'Diables et mirages : Tentation et inversion radicale',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez les deux mots les plus complexes',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Que symbolisent les "diables" ?',
        options: [
          'Des créatures maléfiques',
          'Les forces psychiques destructrices qui surgissent dans la solitude',
          'Les dangers extérieurs',
          'Les personnes méchantes'
        ],
        reponseCorrecte: 1,
        explication: '"Diables" = forces intérieures autodestructrices (Dostoïevski, Jung). La solitude révèle nos démons psychiques.',
        promptJustification: 'Expliquez pourquoi la solitude ontologique ("là-bas") fait surgir nos "diables" intérieurs. Référez-vous à Dostoïevski ou Jung. (100 mots min)',
        justificationMinLength: 100
      },
      {
        id: 'q2',
        question: 'CRITIQUE : Quelle est la signification EXACTE de "mirages" dans cette chanson ?',
        options: [
          '"Là-bas" est une illusion, un mirage',
          'INVERSION RADICALE : "Là-bas", c\'est découvrir que TOUT devient incertain',
          'Les faux espoirs',
          'Les hallucinations du désert'
        ],
        reponseCorrecte: 1,
        explication: 'CRUCIAL : Ce n\'est PAS "là-bas est mirage". C\'est "là-bas, tout devient mirage" - déréalisation radicale (Descartes, Camus, Sartre).',
        promptJustification: 'EXPLICATION CRITIQUE : Expliquez pourquoi "mirages" ne signifie PAS que "là-bas est illusion", mais que "là-bas, on découvre que RIEN n\'est certain". Référez-vous au doute cartésien ou à l\'absurde camusien. (120 mots min)',
        justificationMinLength: 120
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '5.2', '5.3'],
    evidenceType: 'P3',
    niveau: 'C1',
    scoreMax: 15
  })
};

const ecran6: EcranCeredis = {
  id: 'labas-s4-e6',
  numero: 6,
  titre: 'Extraction du vocabulaire métaphysique',
  type: 'texte_a_trous',
  consigne: 'Identifiez le vocabulaire de l\'expérience limite dans les paroles',
  dureeEstimee: 10,
  difficulte: 'difficile',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**VOCABULAIRE DE L'EXPÉRIENCE MÉTAPHYSIQUE LIMITE**

Là-bas, {{tempêtes}} et {{naufrages}}
Là-bas, {{feu}} et {{sable}} et {{diables}}
Là-bas, {{mirages}}

**ANALYSE** :

Ces 5 mots ne sont PAS une simple énumération de dangers.
Ils forment un {{champ}} {{sémantique}} {{cohérent}}.

Ils décrivent l'expérience {{violente}} (tempêtes), 
{{périlleuse}} (naufrages), d'une {{intensité}} {{incandescente}} (feu),
exposée aux tentations {{autodestructrices}} (diables),
et qui révèle la {{déréalisation}} radicale du monde (mirages).

**CONSÉQUENCE MORALE** :

"Là-bas, faut du {{cœur}}, faut du {{courage}}"

→ Ce passage ontologique nécessite une {{force}} {{morale}} {{exceptionnelle}}.`,
      motsCaches: [
        'tempêtes', 'naufrages', 'feu', 'sable', 'diables', 'mirages',
        'champ', 'sémantique', 'cohérent',
        'violente', 'périlleuse', 'intensité', 'incandescente',
        'autodestructrices', 'déréalisation',
        'cœur', 'courage', 'force', 'morale', 'exceptionnelle'
      ],
      indicesOptionnels: [
        'Nom - chaos ontologique',
        'Nom - dissolution identité',
        'Nom - transformation ambivalente',
        'Nom - désert',
        'Nom - forces psychiques',
        'Nom - inversion radicale',
        'Nom - ensemble de mots',
        'Adjectif - relatif au sens',
        'Adjectif - logique',
        'Adjectif - brutale',
        'Adjectif - dangereuse',
        'Nom - force extrême',
        'Adjectif - brûlante',
        'Adjectif - qui se détruit',
        'Nom - perte du réel',
        'Nom - courage affectif',
        'Nom - bravoure',
        'Nom - puissance',
        'Adjectif - éthique',
        'Adjectif - rare'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 10
  })
};

const ecran7: EcranCeredis = {
  id: 'labas-s4-e7',
  numero: 7,
  titre: 'Dissertation : Liberté, solitude, altérité',
  type: 'texte_libre',
  consigne: 'Rédigez une analyse philosophique approfondie',
  dureeEstimee: 20,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**SUJET DE DISSERTATION PHILOSOPHIQUE** (300-350 mots)

"Là-bas, loin de nos vies, de nos villages
J'oublierai ta voix, ton visage
Et j'ai beau te serrer dans mes bras
Tu m'échappes déjà, là-bas"

**QUESTION** : Comment ce couplet exprime-t-il la contradiction ontologique 
entre liberté absolue et amour profond ?

**AXES D'ANALYSE** :

1. **La solitude ontologique comme condition de la liberté**
   - Pourquoi la liberté métaphysique absolue implique-t-elle de perdre la familiarité ?
   - "J'oublierai ta voix, ton visage" : le prix de la transformation

2. **L'altérité radicale de l'être aimé**
   - "Tu m'échappes déjà" : l'autre demeure un mystère
   - Convergence avec "Appartenir" : "Je ne t'appartiens pas / Je n'appartiens qu'à moi"

3. **La contradiction insoluble**
   - L'amour suppose la présence ET l'altérité
   - Convergence avec "Qu'elle soit elle" : "Qu'elle soit seule pour qu'elle aime mieux"
   - Faut-il la solitude pour aimer authentiquement ?

4. **Votre position philosophique**
   - Cette contradiction peut-elle être dépassée ?
   - Ou est-ce un dilemme tragique sans solution ?

**EXIGENCES** :
- Références à Goldman ("Appartenir", "Qu'elle soit elle")
- Concepts : solitude ontologique, altérité radicale, liberté métaphysique
- Argumentation rigoureuse`,
      nombreMotsMin: 300,
      nombreMotsMax: 350,
      aideRedaction: [
        'Introduction : Poser la contradiction liberté/amour',
        'Partie 1 : Solitude comme condition de liberté (Heidegger, Sartre)',
        'Partie 2 : Altérité radicale de l\'autre (Levinas, Goldman)',
        'Partie 3 : Faut-il être seul pour aimer mieux ?',
        'Conclusion : Dilemme tragique ou synthèse possible ?'
      ],
      criteres: [
        { label: 'Profondeur philosophique', description: 'Maîtrise des concepts métaphysiques', points: 6 },
        { label: 'Convergence Goldman', description: 'Utilisation pertinente de "Appartenir" et "Qu\'elle soit elle"', points: 4 },
        { label: 'Argumentation', description: 'Rigueur logique et progression', points: 3 },
        { label: 'Originalité', description: 'Position personnelle réfléchie', points: 2 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '3.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'C1',
    scoreMax: 15
  })
};

const ecran8: EcranCeredis = {
  id: 'labas-s4-e8',
  numero: 8,
  titre: 'Journal réflexif + Bilan',
  type: 'journal_reflexif',
  consigne: 'Synthèse et réflexion personnelle',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment cette analyse du langage symbolique change-t-elle votre compréhension de "Là-bas" et de Goldman ?',
      contexte: `Vous venez de découvrir que Goldman utilise le même langage symbolique 
      que les grandes œuvres philosophiques et spirituelles.`,
      sousQuestions: [
        'Avant cette séance, perceviez-vous cette profondeur métaphysique ?',
        'Quel est le mot qui vous a le plus marqué parmi les 5 ? Pourquoi ?',
        'Comment comprenez-vous maintenant l\'opposition ICI/LÀ-BAS ?',
        'La contradiction liberté/amour vous semble-t-elle insurmontable ?'
      ],
      nombreMotsMin: 150,
      exemplesReponses: [
        'Être honnête sur votre perception initiale de la chanson',
        'Identifier les mots qui résonnent avec votre expérience personnelle',
        'Réfléchir aux moments où vous avez ressenti cette "étrangeté du monde"',
        'Penser à vos propres contradictions entre attachement et liberté'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6', '5.7'],
    evidenceType: 'P4',
    niveau: 'C1',
    scoreMax: 10
  })
};

export const seance4: SeanceCeredis = {
  id: 'labas-s4',
  chansonId: 'labas',
  numero: 4,
  titre: 'Langage symbolique : L\'expérience métaphysique limite',
  description: `Exploration du langage symbolique de "Là-bas". Cette séance révèle comment Goldman 
  utilise le même vocabulaire métaphysique que les grandes œuvres (Bible, philosophie, poésie) 
  pour exprimer l'expérience limite du passage de la familiarité à l'étrangeté ontologique. 
  Analyse approfondie des 5 mots critiques (tempêtes, naufrages, feu, diables, mirages) et de 
  l'opposition ICI/LÀ-BAS comme ambivalence ontologique. Convergences avec "Appartenir" et 
  "Qu'elle soit elle" sur la solitude, l'altérité radicale et la liberté métaphysique.`,
  
  objectifs: [
    'Comprendre le langage symbolique comme expression de l\'expérience limite',
    'Maîtriser l\'opposition ICI/LÀ-BAS comme ambivalence ontologique (Heidegger)',
    'Analyser les 5 mots métaphysiques comme champ sémantique cohérent',
    'Saisir l\'ambivalence du feu (destruction/purification)',
    'Comprendre l\'INVERSION RADICALE des "mirages" (déréalisation du réel)',
    'Analyser la contradiction liberté/amour (solitude ontologique, altérité radicale)',
    'Établir les convergences avec "Appartenir" et "Qu\'elle soit elle"',
    'Reconnaître Goldman comme penseur métaphysique de haut niveau'
  ],
  
  dureeEstimee: 95,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D5', 'D2', 'D3'],
    niveauCible: 'C1',
    scoreMaxTotal: 75,
    distributionEvidences: { P1: 2, P2: 3, P3: 2, P4: 1 },
    competencesUniques: ['2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance4;
