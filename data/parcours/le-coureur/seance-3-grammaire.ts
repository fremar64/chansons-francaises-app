/**
 * LE COUREUR - SÉANCE 3 (FORMAT CEREDIS)
 * Grammaire : Temps du récit (imparfait/passé composé)
 * 
 * Focus : Imparfait (durée, AVANT) vs Passé composé (rupture, APRÈS) + Voix passive
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'lecoureur-s3-e1',
  numero: 1,
  titre: 'Introduction - Les temps du récit',
  type: 'introduction',
  consigne: 'Découvrez comment Goldman utilise les temps pour structurer son récit',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 3 : IMPARFAIT vs PASSÉ COMPOSÉ**
    
    "Le coureur" est un **récit au passé** qui utilise deux temps principaux :
    
    **L'IMPARFAIT** = AVANT (durée, habitude, état)
    
    - "Je **courais** sur la plage"
    - "Pieds nus comme **couraient** mes ancêtres"
    - "Il **était** déjà tard"
    - "Y **avait** l'homme bizarre"
    
    → L'imparfait décrit ce qui **durait**, ce qui était **habituel**, l'**état des choses** AVANT
    
    **LE PASSÉ COMPOSÉ** = APRÈS (rupture, événement ponctuel)
    
    - "J'**ai pris** le grand avion blanc"
    - "On m'**a touché**, **mesuré**"
    - "On m'**a mis** un numéro"
    - "J'**ai appris** à perdre"
    
    → Le passé composé décrit les **événements** qui ont **changé** la situation
    
    **L'OPPOSITION STRUCTURE TOUT LE RÉCIT** :
    
    | Imparfait | Passé composé |
    |-----------|---------------|
    | Durée | Événement |
    | Habitude | Rupture |
    | AVANT | APRÈS |
    | Continuité | Changement |
    | Authenticité | Transformation |
    
    **OBJECTIFS** :
    1. Distinguer les deux temps et leurs valeurs
    2. Comprendre comment ils structurent le récit
    3. Analyser la voix passive ("On m'a...")`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'lecoureur-s3-e2',
  numero: 2,
  titre: 'Analyse prosodique - Temporalité narrative',
  type: 'introduction',
  consigne: 'Analysez comment les temps créent le sens',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**TEMPORALITÉ NARRATIVE DANS "LE COUREUR"**
    
    **1. L'IMPARFAIT : LE TEMPS DE L'AUTHENTICITÉ PERDUE**
    
    Observons les verbes à l'imparfait dans la chanson :
    
    | Phrase | Valeur |
    |--------|--------|
    | "Je **courais** sur la plage" | Habitude passée |
    | "**couraient** mes ancêtres" | Durée, tradition |
    | "Il **était** déjà tard" | État, description |
    | "les parents m'**attendaient**" | Action en cours |
    | "Je la **caressais** naguère" | Habitude tendre |
    
    → L'imparfait crée un **effet de nostalgie** : ce temps révolu, perdu
    
    ---
    
    **2. LE PASSÉ COMPOSÉ : LE TEMPS DE LA RUPTURE**
    
    | Phrase | Valeur |
    |--------|--------|
    | "J'**ai bien vu**" | Événement ponctuel |
    | "Je **suis rentré**" | Action terminée |
    | "J'**ai pris** l'avion" | Rupture brutale |
    | "On m'**a touché**, **mesuré**" | Actions subies |
    | "On m'**a mis** un numéro" | Transformation |
    | "J'**ai appris** à perdre" | Résultat acquis |
    | "le hasard **a croisé** ma vie" | Événement décisif |
    
    → Le passé composé marque les **événements qui ont changé la vie**
    
    ---
    
    **3. LA VOIX PASSIVE : LA PERTE D'AGENTIVITÉ**
    
    Structure : **"On m'a..."** (sujet indéfini "on" + COD "m'")
    
    - "On m'**a touché**"
    - "On m'**a mesuré**"
    - "On m'**a mis** un numéro"
    
    **EFFET** : Le narrateur n'est plus **sujet** de l'action, il devient **objet**.
    Il **subit** les actions des autres.
    C'est la **déshumanisation grammaticale**.
    
    ---
    
    **4. STRUCTURE CIRCULAIRE**
    
    - **Début** : "Je courais" (imparfait)
    - **Fin** : "Moi je courais" (retour à l'imparfait)
    
    Cette **répétition de l'imparfait** à la fin crée un effet de **nostalgie** :
    Le narrateur revient en pensée à ce qu'il a perdu.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.2', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran3: EcranCeredis = {
  id: 'lecoureur-s3-e3',
  numero: 3,
  titre: 'QCM - Identification des temps',
  type: 'quiz_qcm',
  consigne: 'Identifiez les temps et leurs valeurs',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Dans "Je courais sur la plage", quel est le temps et sa valeur ?',
        options: [
          'Passé composé - événement ponctuel',
          'Imparfait - habitude passée, durée',
          'Présent - action actuelle',
          'Plus-que-parfait - action antérieure'
        ],
        reponseCorrecte: 1,
        explication: 'L\'imparfait "courais" exprime une habitude passée, une action qui durait dans le temps AVANT.'
      },
      {
        id: 'q2',
        question: 'Dans "J\'ai pris le grand avion blanc", quel est le temps et sa valeur ?',
        options: [
          'Imparfait - habitude',
          'Passé composé - événement ponctuel, rupture',
          'Futur - projet',
          'Conditionnel - hypothèse'
        ],
        reponseCorrecte: 1,
        explication: 'Le passé composé "ai pris" marque un événement précis qui a changé la vie : le départ en avion.'
      },
      {
        id: 'q3',
        question: 'Pourquoi Goldman utilise l\'imparfait pour "Je la caressais naguère" ?',
        options: [
          'Parce que c\'est plus joli',
          'Pour exprimer une habitude perdue, un état révolu, la nostalgie',
          'C\'est une erreur grammaticale',
          'Pour parler du futur'
        ],
        reponseCorrecte: 1,
        explication: 'L\'imparfait + "naguère" crée un effet de nostalgie : cette relation tendre avec la terre est perdue.'
      },
      {
        id: 'q4',
        question: 'Quelle valeur a le passé composé dans "Le hasard a croisé ma vie" ?',
        options: [
          'Habitude passée',
          'Action en cours',
          'Événement décisif qui a tout changé',
          'Futur proche'
        ],
        reponseCorrecte: 2,
        explication: 'Le passé composé marque ici l\'événement décisif, le moment où tout a basculé.'
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
  id: 'lecoureur-s3-e4',
  numero: 4,
  titre: 'Conjugaison - Imparfait et passé composé',
  type: 'texte_a_trous',
  consigne: 'Conjuguez les verbes au temps approprié',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**CONJUGAISON : IMPARFAIT vs PASSÉ COMPOSÉ**
      
      **IMPARFAIT (habitude, durée, état) :**
      
      Avant, je {{courais}} sur la plage tous les jours. (courir)
      Les vagues {{venaient}} jusqu'à mes pieds. (venir)
      Il {{faisait}} chaud et le vent {{soufflait}}. (faire, souffler)
      Mes ancêtres aussi {{couraient}} pieds nus. (courir)
      
      **PASSÉ COMPOSÉ (événement, rupture) :**
      
      Un jour, j'{{ai vu}} un homme avec un chronomètre. (voir)
      Le soir, je {{suis rentré}} chez moi. (rentrer)
      Mes parents {{ont signé}} un contrat. (signer)
      J'{{ai pris}} l'avion pour l'Occident. (prendre)
      On m'{{a mesuré}} comme un cheval. (mesurer)
      
      **ANALYSE :**
      
      L'imparfait décrit ce qui {{durait}} (durée, habitude).
      Le passé composé décrit ce qui {{a changé}} (événement, rupture).`,
      motsCaches: [
        'courais', 'venaient', 'faisait', 'soufflait', 'couraient',
        'ai vu', 'suis rentré', 'ont signé', 'ai pris', 'a mesuré',
        'durait', 'a changé'
      ],
      indicesOptionnels: [
        'courir, imparfait, 1e sg.',
        'venir, imparfait, 3e pl.',
        'faire, imparfait, 3e sg.',
        'souffler, imparfait, 3e sg.',
        'courir, imparfait, 3e pl.',
        'voir, passé composé, 1e sg.',
        'rentrer, passé composé, 1e sg.',
        'signer, passé composé, 3e pl.',
        'prendre, passé composé, 1e sg.',
        'mesurer, passé composé, 3e sg.',
        'durer, imparfait, 3e sg.',
        'changer, passé composé, 3e sg.'
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
  id: 'lecoureur-s3-e5',
  numero: 5,
  titre: 'Analyse - La voix passive et la déshumanisation',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez le rôle de la voix passive',
  dureeEstimee: 10,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman utilise "On m\'a touché, mesuré" au lieu de "Quelqu\'un m\'a touché" ?',
        options: [
          'Pour être plus court',
          'Le "on" indéfini renforce l\'anonymat de ceux qui déshumanisent, et la passivité du coureur',
          'C\'est une erreur',
          'Pour être plus poli'
        ],
        reponseCorrecte: 1,
        explication: 'Le "on" anonyme montre que le coureur est objet d\'un système, pas victime d\'une personne identifiable.',
        promptJustification: 'Expliquez comment la structure "On m\'a..." exprime la déshumanisation. Comparez avec "Le médecin m\'a..." (80 mots min)',
        justificationMinLength: 80
      },
      {
        id: 'q2',
        question: 'Quel effet produit l\'accumulation "On m\'a touché, mesuré... On m\'a mis un numéro" ?',
        options: [
          'De l\'ennui',
          'Une impression de processus mécanique, industriel, où le coureur est objet passif',
          'De l\'admiration',
          'De la joie'
        ],
        reponseCorrecte: 1,
        explication: 'L\'accumulation de verbes passifs crée un effet d\'enchaînement mécanique : le coureur subit un processus.',
        promptJustification: 'Analysez comment cette accumulation de passifs exprime la perte de contrôle du coureur sur sa propre vie (70 mots min)',
        justificationMinLength: 70
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 12
  })
};

const ecran6: EcranCeredis = {
  id: 'lecoureur-s3-e6',
  numero: 6,
  titre: 'Exercice - Transformer un récit',
  type: 'texte_libre',
  consigne: 'Transformez ce récit au présent en récit au passé',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**EXERCICE : TRANSFORMER AU PASSÉ**
      
      Voici un texte au présent. Réécrivez-le au passé en utilisant :
      - L'IMPARFAIT pour les descriptions et habitudes (AVANT)
      - Le PASSÉ COMPOSÉ pour les événements (rupture)
      
      **TEXTE AU PRÉSENT :**
      
      "Je vis dans un petit village. Chaque matin, je me promène dans la forêt.
      Les oiseaux chantent et le soleil brille.
      Un jour, des hommes arrivent avec des machines.
      Ils coupent les arbres et construisent des immeubles.
      Je déménage en ville.
      Maintenant, je marche sur le béton."
      
      **VOTRE TEXTE AU PASSÉ (150-180 mots) :**
      
      Commencez par "Je vivais..." et utilisez :
      - Imparfait : vivais, me promenais, chantaient, brillait...
      - Passé composé : sont arrivés, ont coupé, ai déménagé...`,
      nombreMotsMin: 150,
      nombreMotsMax: 180,
      aideRedaction: [
        'AVANT (imparfait) : "Je vivais...", "Chaque matin, je me promenais..."',
        'Descriptions (imparfait) : "Les oiseaux chantaient...", "Le soleil brillait..."',
        'ÉVÉNEMENT (passé composé) : "Un jour, des hommes sont arrivés..."',
        'Actions (passé composé) : "Ils ont coupé...", "J\'ai déménagé..."'
      ],
      criteres: [
        { label: 'Imparfait correct', description: 'Utilisé pour descriptions et habitudes', points: 5 },
        { label: 'Passé composé correct', description: 'Utilisé pour événements et ruptures', points: 5 },
        { label: 'Cohérence temporelle', description: 'Opposition AVANT/APRÈS claire', points: 3 },
        { label: 'Qualité de l\'expression', description: 'Clarté, fluidité', points: 2 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.1', '5.3'],
    evidenceType: 'P3',
    niveau: 'B1',
    scoreMax: 15
  })
};

const ecran7: EcranCeredis = {
  id: 'lecoureur-s3-e7',
  numero: 7,
  titre: 'Production - Mon récit de transformation',
  type: 'texte_libre',
  consigne: 'Écrivez votre propre récit de transformation au passé',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl2',
      consigne: `**PRODUCTION : MON RÉCIT DE TRANSFORMATION**
      
      Comme le coureur, racontez une transformation importante de votre vie.
      
      **STRUCTURE OBLIGATOIRE :**
      
      1. **AVANT (imparfait)** : Décrivez comment était votre vie avant
         - Habitudes : "Chaque jour, je..."
         - Descriptions : "C'était...", "Il y avait..."
         - État : "J'étais...", "Je vivais..."
      
      2. **ÉVÉNEMENT (passé composé)** : Racontez ce qui a tout changé
         - "Un jour, j'ai...", "Il s'est passé..."
         - "J'ai décidé...", "On m'a dit..."
      
      3. **APRÈS (passé composé + imparfait)** : Décrivez les conséquences
         - Actions : "J'ai commencé à..."
         - Nouveau contexte : "Ma vie était maintenant..."
      
      4. **BILAN** : Comme Goldman, montrez l'ambivalence
         - "Était-ce un mal, un bien ? C'est ainsi."
      
      **Longueur** : 250-300 mots`,
      nombreMotsMin: 250,
      nombreMotsMax: 300,
      aideRedaction: [
        'AVANT : imparfait (habitudes, descriptions)',
        'ÉVÉNEMENT : passé composé (rupture)',
        'APRÈS : passé composé (actions) + imparfait (nouveau contexte)',
        'BILAN : montrer gains ET pertes'
      ],
      criteres: [
        { label: 'Imparfait pour AVANT', description: 'Habitudes et descriptions au bon temps', points: 4 },
        { label: 'Passé composé pour rupture', description: 'Événements au bon temps', points: 4 },
        { label: 'Structure narrative claire', description: 'AVANT → événement → APRÈS → bilan', points: 4 },
        { label: 'Bilan ambivalent', description: 'Montre gains ET pertes', points: 4 },
        { label: 'Qualité d\'expression', description: 'Clarté, richesse', points: 4 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 20
  })
};

const ecran8: EcranCeredis = {
  id: 'lecoureur-s3-e8',
  numero: 8,
  titre: 'Bilan de la grammaire',
  type: 'bilan',
  consigne: 'Synthèse de la séance grammaire',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**GRAMMAIRE DU RÉCIT : CE QUE NOUS AVONS APPRIS**
    
    **IMPARFAIT vs PASSÉ COMPOSÉ**
    
    | IMPARFAIT | PASSÉ COMPOSÉ |
    |-----------|---------------|
    | "Je courais" | "J'ai pris l'avion" |
    | Durée, habitude | Événement ponctuel |
    | Description, état | Action terminée |
    | AVANT | APRÈS |
    | Continuité | Rupture |
    | Nostalgie | Changement |
    
    **LA VOIX PASSIVE : "ON M'A..."**
    
    - "On m'a touché"
    - "On m'a mesuré"
    - "On m'a mis un numéro"
    
    **EFFET** : Le coureur devient OBJET (passif) et non plus SUJET (actif).
    C'est la **déshumanisation grammaticale**.
    
    **STRUCTURE CIRCULAIRE**
    
    - Début : "Je courais" (imparfait)
    - Fin : "Moi je courais" (retour à l'imparfait)
    
    → Effet de **nostalgie** : retour mental au passé perdu
    
    **FORMATION RAPPEL**
    
    **Imparfait** : radical + -ais, -ais, -ait, -ions, -iez, -aient
    - courir → je cour**ais**
    
    **Passé composé** : avoir/être + participe passé
    - prendre → j'**ai pris**
    - arriver → je **suis arrivé**
    
    **MESSAGE PHILOSOPHIQUE**
    
    L'opposition des temps structure le message :
    - L'imparfait = l'authenticité perdue
    - Le passé composé = la transformation subie
    
    La grammaire elle-même raconte le déracinement.
    
    **Prochaine séance** : Débat - La mondialisation : émancipation ou aliénation ?`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance3: SeanceCeredis = {
  id: 'lecoureur-s3',
  chansonId: 'le-coureur',
  numero: 3,
  titre: 'Grammaire : Temps du récit (imparfait/passé composé)',
  description: `Analyse grammaticale de l'opposition imparfait/passé composé dans "Le coureur".
  L'imparfait exprime la durée et l'authenticité (AVANT), le passé composé la rupture (APRÈS).
  Étude de la voix passive comme expression de la déshumanisation.`,
  
  objectifs: [
    'Distinguer imparfait (durée) et passé composé (rupture)',
    'Comprendre la valeur narrative des temps',
    'Analyser la voix passive comme déshumanisation',
    'Conjuguer correctement aux deux temps',
    'Produire un récit structuré par l\'opposition des temps'
  ],
  
  dureeEstimee: 64,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D3', 'D5'],
    niveauCible: 'B1',
    scoreMaxTotal: 65,
    distributionEvidences: { P1: 3, P2: 2, P3: 2, P4: 1 },
    competencesUniques: ['3.1', '3.2', '5.1', '5.2', '5.3', '5.5', '5.6']
  }
};

export default seance3;
