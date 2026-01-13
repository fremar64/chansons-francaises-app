/**
 * C'EST TA CHANCE - SÉANCE 3 (FORMAT CEREDIS)
 * Grammaire : Le futur de la nécessité
 * 
 * Focus : "Il faudra que tu..." (futur + subjonctif de l'obligation)
 * Valeur : nécessité existentielle, pas simple conseil
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ctachance-s3-e1',
  numero: 1,
  titre: 'Introduction - La grammaire de la nécessité',
  type: 'introduction',
  consigne: 'Découvrez comment Goldman utilise la grammaire pour exprimer l\'obligation',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 3 : LE FUTUR DE LA NÉCESSITÉ**
    
    Goldman n'utilise PAS l'impératif pour donner des ordres.
    Il utilise le **futur** pour exprimer la **nécessité existentielle**.
    
    **STRUCTURE DOMINANTE** :
    
    "Il faudra que tu..." + SUBJONCTIF
    
    Exemples :
    - "Il faudra que tu **sois** douce"
    - "Il faudra que tu **apprennes**"
    - "Pour que tu **sois** belle, il faudra que tu le **deviennes**"
    
    **POURQUOI LE FUTUR ?**
    
    Ce n'est PAS un conseil ("Tu devrais...")
    Ce n'est PAS un ordre ("Sois douce !")
    
    C'est une **NÉCESSITÉ** : il n'y a pas le choix.
    Le futur exprime l'inévitable, l'obligation existentielle.
    
    **OBJECTIFS** :
    
    1. Maîtriser "il faudra que" + subjonctif
    2. Comprendre la valeur du futur (nécessité, pas prédiction)
    3. Distinguer conseil, ordre et nécessité
    4. Utiliser cette structure pour exprimer des obligations`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ctachance-s3-e2',
  numero: 2,
  titre: 'Analyse prosodique - Le futur dans la chanson',
  type: 'introduction',
  consigne: 'Observez la structure grammaticale dans les paroles',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**ANALYSE GRAMMATICALE DES PAROLES**
    
    **1. LE FUTUR SIMPLE (assertion de vérité)**
    
    - "Tu **seras** jamais la reine du bal"
    - "Tu **seras** sûrement jamais notaire"
    - "Rien ne **sera** jamais facile"
    - "Chaque victoire ne **sera** que la tienne"
    - "Ta puissance **naîtra** là"
    
    → Le futur exprime ici des **certitudes**, pas des prédictions incertaines
    
    **2. IL FAUDRA QUE + SUBJONCTIF (obligation)**
    
    - "Il **faudra** que tu **sois** douce"
    - "Il **faudra** que tu **sois** solitaire"
    - "Pour que tu **sois** belle, il **faudra** que tu le **deviennes**"
    - "Il **faudra** que tu **apprennes** à perdre"
    
    → L'obligation est présentée comme INÉVITABLE
    
    **3. L'IMPÉRATIF IMPLICITE**
    
    - "Tout seul, **apprends** à fonctionner"
    - "**Faudra** remplacer tous les 'pas de chance' par de l'intelligence"
    
    → L'impératif est rare mais présent pour les actions immédiates
    
    **EFFET STYLISTIQUE** :
    
    L'accumulation des futurs crée une impression de **destin inévitable**,
    mais un destin que TU peux transformer par ton action.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.2', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'ctachance-s3-e3',
  numero: 3,
  titre: 'QCM - Valeur du futur',
  type: 'quiz_qcm',
  consigne: 'Testez votre compréhension des valeurs du futur',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Dans "Tu seras jamais la reine du bal", quelle est la valeur du futur ?',
        options: [
          'Une prédiction incertaine',
          'Une certitude, un constat de vérité générale',
          'Un souhait',
          'Une hypothèse'
        ],
        reponseCorrecte: 1,
        explication: 'Le futur exprime ici une certitude : c\'est un fait inévitable, pas une prédiction.'
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman utilise "Il faudra que tu sois" plutôt que "Sois" (impératif) ?',
        options: [
          'Pour être plus poli',
          'Pour exprimer une nécessité existentielle, pas un simple ordre',
          'Par erreur grammaticale',
          'Pour faire plus long'
        ],
        reponseCorrecte: 1,
        explication: '"Il faudra" exprime une obligation inévitable, une nécessité de vie, pas un ordre qu\'on pourrait refuser.'
      },
      {
        id: 'q3',
        question: 'Dans "Il faudra que tu apprennes à perdre", quel est le mode de "apprennes" ?',
        options: [
          'Indicatif présent',
          'Subjonctif présent',
          'Conditionnel',
          'Infinitif'
        ],
        reponseCorrecte: 1,
        explication: 'Après "il faut que", on utilise toujours le subjonctif : "que tu apprennes" (pas "que tu apprends").'
      },
      {
        id: 'q4',
        question: 'Quelle différence entre "Tu devrais apprendre" et "Il faudra que tu apprennes" ?',
        options: [
          'Aucune différence',
          '"Devrais" = conseil ; "Il faudra" = nécessité absolue',
          '"Il faudra" est plus poli',
          '"Devrais" est plus fort'
        ],
        reponseCorrecte: 1,
        explication: '"Tu devrais" = conseil qu\'on peut ignorer. "Il faudra" = nécessité existentielle, pas le choix.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran4: EcranCeredis = {
  id: 'ctachance-s3-e4',
  numero: 4,
  titre: 'Conjugaison - Subjonctif présent',
  type: 'texte_a_trous',
  consigne: 'Conjuguez les verbes au subjonctif présent',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**SUBJONCTIF APRÈS "IL FAUT QUE"**
      
      Il faudra que tu {{sois}} douce. (être)
      Il faudra que tu {{apprennes}} à perdre. (apprendre)
      Pour que tu {{sois}} belle, il faudra que tu le {{deviennes}}. (être, devenir)
      Il faudra que tu {{prennes}} toi-même ce que le sort ne t'a pas donné. (prendre)
      
      **AUTRES VERBES AU SUBJONCTIF** :
      
      Il faut que je {{fasse}} des efforts. (faire)
      Il faut que nous {{puissions}} avancer. (pouvoir)
      Il faut qu'elle {{aille}} de l'avant. (aller)
      Il faut que vous {{ayez}} confiance. (avoir)
      Il faut qu'ils {{sachent}} la vérité. (savoir)
      
      **RAPPEL** : Le subjonctif exprime une action qui n'est pas encore réalisée,
      mais qui {{doit}} être accomplie (nécessité).`,
      motsCaches: ['sois', 'apprennes', 'sois', 'deviennes', 'prennes', 'fasse', 'puissions', 'aille', 'ayez', 'sachent', 'doit'],
      indicesOptionnels: [
        'être, subj. 2e sg.',
        'apprendre, subj. 2e sg.',
        'être, subj. 2e sg.',
        'devenir, subj. 2e sg.',
        'prendre, subj. 2e sg.',
        'faire, subj. 1e sg.',
        'pouvoir, subj. 1e pl.',
        'aller, subj. 3e sg.',
        'avoir, subj. 2e pl.',
        'savoir, subj. 3e pl.',
        'devoir, ind. 3e sg.'
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

const ecran5: EcranCeredis = {
  id: 'ctachance-s3-e5',
  numero: 5,
  titre: 'Analyse comparative - Conseil vs Nécessité',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la différence entre conseil et nécessité',
  dureeEstimee: 10,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Classez ces phrases de la MOINS contraignante à la PLUS contraignante :',
        options: [
          'Tu pourrais essayer → Tu devrais essayer → Il faut que tu essaies → Tu essaieras',
          'Tu devrais essayer → Tu pourrais essayer → Tu essaieras → Il faut que tu essaies',
          'Il faut que tu essaies → Tu essaieras → Tu devrais essayer → Tu pourrais essayer',
          'Tu essaieras → Il faut que tu essaies → Tu devrais essayer → Tu pourrais essayer'
        ],
        reponseCorrecte: 0,
        explication: 'Progression : suggestion (pourrais) → conseil (devrais) → obligation (il faut) → certitude (futur).',
        promptJustification: 'Expliquez pourquoi Goldman choisit la forme la plus contraignante pour son message. Quel effet cela produit-il ? (60 mots min)',
        justificationMinLength: 60
      },
      {
        id: 'q2',
        question: 'Pourquoi Goldman dit-il "Tu seras jamais" (jamais) plutôt que "Tu ne seras peut-être pas" ?',
        options: [
          'Pour être cruel',
          'Pour poser un constat de vérité qui libère : accepter la réalité pour la dépasser',
          'Par pessimisme',
          'Pour décourager'
        ],
        reponseCorrecte: 1,
        explication: 'La vérité crue libère. Reconnaître qu\'on ne sera "jamais la reine du bal" permet de construire une AUTRE beauté.',
        promptJustification: 'Expliquez comment le fait d\'accepter une vérité difficile ("Tu seras jamais...") peut devenir libérateur. Donnez un exemple. (60 mots min)',
        justificationMinLength: 60
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.2', '5.3', '5.5'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran6: EcranCeredis = {
  id: 'ctachance-s3-e6',
  numero: 6,
  titre: 'Ordre des éléments - Construction de la nécessité',
  type: 'ordre_elements',
  consigne: 'Reconstituez les phrases avec la bonne structure',
  dureeEstimee: 6,
  difficulte: 'moyen',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: 'Remettez les éléments dans l\'ordre pour former des phrases correctes avec "il faudra que" :',
      elements: [
        { id: 'oe1-1', texte: 'Il faudra', ordre: 0 },
        { id: 'oe1-2', texte: 'que tu', ordre: 1 },
        { id: 'oe1-3', texte: 'apprennes', ordre: 2 },
        { id: 'oe1-4', texte: 'à perdre,', ordre: 3 },
        { id: 'oe1-5', texte: 'à encaisser', ordre: 4 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1'],
    evidenceType: 'P2',
    niveau: 'A2',
    scoreMax: 6
  })
};

const ecran7: EcranCeredis = {
  id: 'ctachance-s3-e7',
  numero: 7,
  titre: 'Production - Mes nécessités de vie',
  type: 'texte_libre',
  consigne: 'Écrivez vos propres nécessités existentielles',
  dureeEstimee: 12,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**EXERCICE : MES NÉCESSITÉS EXISTENTIELLES**
      
      À la manière de Goldman, écrivez un texte qui exprime vos propres nécessités de vie.
      
      **Utilisez les structures étudiées** :
      - "Il faudra que je..." (+ subjonctif)
      - "Je ne serai jamais..." (futur de certitude)
      - "Pour que je..., il faudra que je..." (but + nécessité)
      
      **Contenu** :
      1. Une vérité difficile à accepter sur vous-même ("Je ne serai jamais...")
      2. Comment vous allez transformer cette limite ("Il faudra que je...")
      3. Ce que vous allez devenir grâce à cette transformation
      
      **Exemple** :
      "Je ne serai jamais le plus brillant de la classe. Il faudra que j'apprenne 
      à compenser par le travail. Pour que je réussisse, il faudra que je sois 
      plus persévérant que les autres. Ma puissance naîtra là."
      
      Rédigez 120-180 mots.`,
      nombreMotsMin: 120,
      nombreMotsMax: 180,
      aideRedaction: [
        'Commencez par une vérité crue (Je ne serai jamais...)',
        'Enchaînez avec des nécessités (Il faudra que je...)',
        'Montrez la transformation possible',
        'Concluez sur votre force à venir'
      ],
      criteres: [
        { label: 'Utilisation correcte du futur', description: 'Futur simple bien conjugué', points: 3 },
        { label: 'Utilisation du subjonctif', description: '"Il faudra que" + subjonctif correct', points: 4 },
        { label: 'Cohérence du message', description: 'Logique limite → transformation → force', points: 4 },
        { label: 'Authenticité', description: 'Vraie réflexion personnelle', points: 4 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'B1',
    scoreMax: 15
  })
};

const ecran8: EcranCeredis = {
  id: 'ctachance-s3-e8',
  numero: 8,
  titre: 'Journal - La grammaire qui m\'a éclairé',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à ce que la grammaire révèle du message',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment la grammaire (futur, subjonctif) renforce-t-elle le message de Goldman ?',
      contexte: 'La grammaire n\'est pas qu\'une technique : elle porte un sens.',
      sousQuestions: [
        'Avez-vous perçu différemment la chanson après avoir analysé sa grammaire ?',
        'Préférez-vous qu\'on vous donne des ordres (impératif) ou qu\'on vous présente des nécessités (futur) ?',
        'Comment allez-vous utiliser "il faudra que" dans votre vie ?',
        'Quelle difficulté avez-vous rencontrée avec le subjonctif ?'
      ],
      nombreMotsMin: 80,
      exemplesReponses: [
        'Le futur donne plus de poids que l\'impératif',
        'La nécessité est plus respectueuse que l\'ordre',
        'J\'utiliserai cette structure pour...'
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.5', '5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 10
  })
};

const ecran9: EcranCeredis = {
  id: 'ctachance-s3-e9',
  numero: 9,
  titre: 'Bilan - La grammaire de la nécessité',
  type: 'bilan',
  consigne: 'Synthèse grammaticale',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**BILAN : LA GRAMMAIRE DE LA NÉCESSITÉ**
    
    **STRUCTURES MAÎTRISÉES** :
    
    | Structure | Valeur | Exemple |
    |-----------|--------|---------|
    | **Futur simple** | Certitude/constat | "Tu seras jamais la reine du bal" |
    | **Il faudra que + subj.** | Nécessité absolue | "Il faudra que tu sois douce" |
    | **Pour que + subj.** | But à atteindre | "Pour que tu sois belle" |
    | **Impératif** | Action immédiate | "Apprends à fonctionner" |
    
    **PROGRESSION DES MODALITÉS** :
    
    Suggestion → Conseil → Obligation → Nécessité → Certitude
    (Tu pourrais) → (Tu devrais) → (Tu dois) → (Il faut que tu) → (Tu seras)
    
    **EFFET STYLISTIQUE** :
    
    Goldman choisit les formes les plus FORTES :
    - Pas de "peut-être" → des certitudes
    - Pas de conseils → des nécessités
    - Pas de politesse → de la vérité crue
    
    Pourquoi ? Parce que la transformation n'est pas optionnelle.
    C'est une question de SURVIE existentielle.
    
    **LE SUBJONCTIF** :
    
    Après "il faut que" / "pour que" → toujours SUBJONCTIF
    = action non encore réalisée mais nécessaire
    
    **PROCHAINE SÉANCE** :
    Débat - Accepter ou refuser les injustices de la naissance ?
    Est-il juste de devoir "prouver deux fois plus" ?`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance3: SeanceCeredis = {
  id: 'ctachance-s3',
  chansonId: 'cest-ta-chance',
  numero: 3,
  titre: 'Grammaire : Le futur de la nécessité',
  description: `Analyse grammaticale de "Il faudra que tu..." : le futur et le subjonctif 
  pour exprimer la nécessité existentielle. Goldman n'utilise pas l'impératif mais le futur
  pour montrer que la transformation n'est pas un choix mais une nécessité de vie.`,
  
  objectifs: [
    'Maîtriser "il faudra que" + subjonctif',
    'Comprendre la valeur du futur (nécessité vs prédiction)',
    'Distinguer conseil, ordre et nécessité existentielle',
    'Conjuguer les verbes au subjonctif présent',
    'Produire un texte avec les structures de nécessité'
  ],
  
  dureeEstimee: 68,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8, ecran9],
  
  competences: ['3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D3', 'D5'],
    niveauCible: 'B1',
    scoreMaxTotal: 61,
    distributionEvidences: { P1: 3, P2: 3, P3: 1, P4: 2 },
    competencesUniques: ['3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6']
  }
};

export default seance3;
