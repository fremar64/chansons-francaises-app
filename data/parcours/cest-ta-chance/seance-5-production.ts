/**
 * C'EST TA CHANCE - SÉANCE 5 (FORMAT CEREDIS)
 * Production finale : Lettre à soi-même / Manifeste personnel
 * 
 * Mobilisation de tout le parcours
 * Production longue : "Ma chance" - transformer ses propres "pas de chance"
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'ctachance-s5-e1',
  numero: 1,
  titre: 'Introduction - Production finale',
  type: 'introduction',
  consigne: 'Découvrez le projet créatif final',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 5 : PRODUCTION FINALE**
    
    **"MA CHANCE" - LETTRE À SOI-MÊME OU MANIFESTE PERSONNEL**
    
    Vous avez traversé tout le parcours :
    
    ✅ **Séance 1** : Découvert à qui Goldman s'adresse et le paradoxe central
    ✅ **Séance 2** : Maîtrisé le vocabulaire de la transformation
    ✅ **Séance 3** : Compris la grammaire de la nécessité
    ✅ **Séance 4** : Débattu sur les injustices et la responsabilité
    
    **MAINTENANT** : C'est votre tour de CRÉER.
    
    **CHOIX DU FORMAT** :
    
    **Option A** : LETTRE À SOI-MÊME
    → Écrivez une lettre que vous vous adressez à vous-même
    → Comme Goldman parle au "tu", parlez à votre "je" futur
    
    **Option B** : MANIFESTE PERSONNEL
    → Écrivez un texte qui proclame vos valeurs
    → Vos "pas de chance" transformés en forces
    → Votre vision de la transformation
    
    **OBJECTIF** :
    Produire un texte AUTHENTIQUE, pas un exercice scolaire.
    Un texte qui pourrait vraiment vous aider dans les moments difficiles.
    
    **DURÉE** : Cette séance est plus longue (~70 min) car c'est une création majeure.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'ctachance-s5-e2',
  numero: 2,
  titre: 'Préparation - Bilan du parcours',
  type: 'quiz_qcm',
  consigne: 'Révisez les éléments clés du parcours',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quel est le paradoxe central de "C\'est ta chance" ?',
        options: [
          'La vie est injuste',
          'Ne pas avoir eu de chance à la naissance = justement ta chance',
          'Il faut travailler dur',
          'La beauté est superficielle'
        ],
        reponseCorrecte: 1,
        explication: 'Le manque initial devient moteur de transformation : la blessure devient source de force.'
      },
      {
        id: 'q2',
        question: 'Quelle structure grammaticale exprime la nécessité existentielle ?',
        options: [
          'Tu pourrais...',
          'Tu devrais...',
          'Il faudra que tu...',
          'Tu peux...'
        ],
        reponseCorrecte: 2,
        explication: '"Il faudra que tu" + subjonctif exprime une nécessité inévitable, pas un simple conseil.'
      },
      {
        id: 'q3',
        question: 'Que signifie "l\'intelligence" au sens philosophique de Goldman ?',
        options: [
          'Le quotient intellectuel',
          'La lucidité spirituelle, l\'expérience de se connaître soi-même',
          'La ruse',
          'Les diplômes'
        ],
        reponseCorrecte: 1,
        explication: 'Intelligence = lucidité (René Char) = expérience spirituelle de construction de soi.'
      },
      {
        id: 'q4',
        question: 'Quelle est la différence entre "jolie" et "belle" ?',
        options: [
          'Synonymes',
          '"Jolie" = beauté physique donnée / "Belle" = beauté intérieure construite',
          '"Belle" est plus fort',
          '"Jolie" est péjoratif'
        ],
        reponseCorrecte: 1,
        explication: 'On NAÎT jolie (ou pas), on DEVIENT belle par transformation intérieure.'
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

const ecran3: EcranCeredis = {
  id: 'ctachance-s5-e3',
  numero: 3,
  titre: 'Brainstorming - Mes "pas de chance"',
  type: 'texte_libre',
  consigne: 'Listez vos propres "pas de chance" pour les transformer',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**BRAINSTORMING : MES "PAS DE CHANCE"**
      
      Avant d'écrire votre lettre/manifeste, identifiez vos propres "pas de chance".
      
      **Catégories possibles** :
      
      1. **PHYSIQUE** : Apparence, santé, corps...
         Goldman : "pas née jolie", "une drôle de peau"
      
      2. **SOCIAL** : Famille, milieu, origines...
         Goldman : "pas de privilège hérité", "les fées ont loupé ton berceau"
      
      3. **ÉDUCATIF** : Accès aux études, diplômes...
         Goldman : "tu seras jamais notaire"
      
      4. **PERSONNEL** : Caractère, timidité, peurs...
      
      **EXERCICE** (100-150 mots) :
      
      Listez 3-5 "pas de chance" de VOTRE vie, en étant honnête avec vous-même.
      Pour chacun, notez une première idée de transformation possible.
      
      Exemple :
      - "Ma timidité" → "Capacité d'observation"
      - "Pas né dans une famille aisée" → "Débrouillardise, autonomie"`,
      nombreMotsMin: 100,
      nombreMotsMax: 150,
      aideRedaction: [
        'Soyez honnête, personne d\'autre ne lira',
        'Pensez aux catégories : physique, social, éducatif, personnel',
        'Pour chaque "pas de chance", cherchez une transformation possible'
      ],
      criteres: [
        { label: 'Authenticité', description: 'Vrais "pas de chance" personnels', points: 5 },
        { label: 'Diversité', description: 'Plusieurs catégories explorées', points: 3 },
        { label: 'Pistes de transformation', description: 'Premières idées pour chaque', points: 4 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.5'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 12
  })
};

const ecran4: EcranCeredis = {
  id: 'ctachance-s5-e4',
  numero: 4,
  titre: 'Modèle - Structure de la lettre',
  type: 'introduction',
  consigne: 'Découvrez la structure recommandée',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE DE VOTRE LETTRE / MANIFESTE**
    
    **OPTION A : LETTRE À SOI-MÊME** (300-400 mots)
    
    1. **En-tête** : "Cher(e) [ton prénom du futur]," ou "À toi qui doutes..."
    
    2. **Reconnaissance** : Je sais ce que tu n'as pas reçu...
       - Nommer tes "pas de chance" honnêtement
    
    3. **Transformation** : Mais ces manques sont devenus...
       - Comment chaque blessure est devenue force
    
    4. **Nécessités** : Il faudra que tu...
       - Ce qui reste à faire (utiliser le futur + subjonctif)
    
    5. **Clôture** : Avec toute ma confiance...
    
    ---
    
    **OPTION B : MANIFESTE PERSONNEL** (300-400 mots)
    
    1. **Déclaration d'ouverture** : "Je ne suis pas né(e) avec..."
    
    2. **Liste des "pas de chance"** : Tout ce que je n'ai pas reçu...
    
    3. **Retournement** : "C'EST MA CHANCE" - pourquoi ces manques sont des forces
    
    4. **Engagements** : "Il faudra que je..." - ce que je m'engage à faire
    
    5. **Proclamation finale** : Ma puissance naîtra là.
    
    ---
    
    **ÉLÉMENTS OBLIGATOIRES** :
    
    ✅ Au moins 3 "pas de chance" transformés en forces
    ✅ Utilisation du vocabulaire étudié (blessure, lucidité, dissonance...)
    ✅ Utilisation de "Il faudra que je..." + subjonctif
    ✅ Conclusion positive mais réaliste`
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran5: EcranCeredis = {
  id: 'ctachance-s5-e5',
  numero: 5,
  titre: 'Production principale - Ma chance',
  type: 'texte_libre',
  consigne: 'Rédigez votre lettre ou manifeste',
  dureeEstimee: 25,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl2',
      consigne: `**PRODUCTION FINALE : "MA CHANCE"**
      
      **Choisissez votre format** :
      - LETTRE À SOI-MÊME
      - MANIFESTE PERSONNEL
      
      **Rédigez 300-400 mots**
      
      **CRITÈRES D'ÉVALUATION** :
      
      1. **AUTHENTICITÉ** (30%) : Vrais "pas de chance" personnels, pas des clichés
      
      2. **TRANSFORMATION** (25%) : Chaque manque devient force (paradoxe de Goldman)
      
      3. **LANGUE** (25%) :
         - Vocabulaire étudié (blessure, lucidité, intelligence, dissonance...)
         - Structure "Il faudra que je..." + subjonctif
         - Qualité de l'expression
      
      4. **IMPACT** (20%) : Un texte qui pourrait vraiment vous aider
      
      **CONSEIL** :
      Prenez votre temps. Ce n'est pas un exercice scolaire.
      C'est VOTRE texte. Écrivez quelque chose de VRAI.
      
      Si vous le souhaitez, vous pourrez le garder et le relire dans les moments difficiles.`,
      nombreMotsMin: 300,
      nombreMotsMax: 400,
      aideRedaction: [
        'Commencez par nommer vos "pas de chance" sans honte',
        'Utilisez le paradoxe : ces manques sont ma chance',
        'Employez "Il faudra que je..." pour les engagements',
        'Concluez sur "Ma puissance naîtra là" ou équivalent'
      ],
      criteres: [
        { label: 'Authenticité', description: 'Vrais "pas de chance" personnels, honnêteté', points: 8 },
        { label: 'Transformation', description: 'Chaque manque transformé en force (paradoxe)', points: 7 },
        { label: 'Vocabulaire étudié', description: 'Blessure, lucidité, intelligence, dissonance...', points: 4 },
        { label: 'Grammaire de la nécessité', description: '"Il faudra que" + subjonctif correct', points: 4 },
        { label: 'Impact émotionnel', description: 'Texte qui pourrait vraiment aider', points: 5 },
        { label: 'Structure et cohérence', description: 'Organisation claire, progression logique', points: 4 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '5.3', '5.5'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 32
  })
};

const ecran6: EcranCeredis = {
  id: 'ctachance-s5-e6',
  numero: 6,
  titre: 'Révision guidée',
  type: 'quiz_qcm_justifie',
  consigne: 'Révisez et améliorez votre production',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Relisez votre texte. Avez-vous utilisé au moins 3 mots du vocabulaire étudié ?',
        options: [
          'Oui, j\'ai utilisé : blessure, lucidité, intelligence, dissonance, etc.',
          'Non, je dois en ajouter',
          'Je ne sais pas lesquels utiliser',
          'Ce n\'était pas demandé'
        ],
        reponseCorrecte: 0,
        explication: 'Le vocabulaire étudié doit être réinvesti pour montrer votre maîtrise.',
        promptJustification: 'Listez les mots du vocabulaire de la transformation que vous avez utilisés dans votre texte. Si vous en avez moins de 3, ajoutez-en maintenant.',
        justificationMinLength: 30
      },
      {
        id: 'q2',
        question: 'Avez-vous utilisé la structure "Il faudra que je..." avec le subjonctif ?',
        options: [
          'Oui, au moins une fois correctement',
          'Non, je dois l\'ajouter',
          'Je ne suis pas sûr(e) de la conjugaison',
          'J\'ai utilisé "Il faut que" au présent'
        ],
        reponseCorrecte: 0,
        explication: 'La structure "Il faudra que" + subjonctif est essentielle pour exprimer la nécessité.',
        promptJustification: 'Recopiez la phrase de votre texte où vous utilisez "Il faudra que je...". Vérifiez que le verbe est au subjonctif.',
        justificationMinLength: 20
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.1', '5.3', '5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 8
  })
};

const ecran7: EcranCeredis = {
  id: 'ctachance-s5-e7',
  numero: 7,
  titre: 'Journal final - Mon parcours',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à tout ce que ce parcours vous a apporté',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Qu\'est-ce que ce parcours "C\'est ta chance" vous a apporté ? Comment avez-vous changé ?',
      contexte: 'C\'est le moment de faire le bilan de tout le parcours.',
      sousQuestions: [
        'Quel a été le moment le plus marquant de ce parcours ? (Une séance, une phrase, une réflexion)',
        'Avez-vous découvert quelque chose sur vous-même ?',
        'Comment percevez-vous vos "pas de chance" maintenant, par rapport au début ?',
        'Allez-vous garder votre lettre/manifeste ? Pourquoi ?',
        'Qu\'est-ce qui a été le plus difficile dans ce parcours ?'
      ],
      nombreMotsMin: 120,
      exemplesReponses: [
        'Ce qui m\'a le plus marqué, c\'est...',
        'J\'ai découvert que mes "pas de chance" peuvent devenir...',
        'Je vais garder mon texte parce que...',
        'La difficulté principale a été...'
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
  id: 'ctachance-s5-e8',
  numero: 8,
  titre: 'Bilan final - Votre transformation',
  type: 'bilan',
  consigne: 'Synthèse et clôture du parcours',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**BILAN FINAL : VOTRE TRANSFORMATION**
    
    **CE QUE VOUS AVEZ ACCOMPLI** :
    
    ✅ **Séance 1** : Compris le message radical de Goldman aux défavorisés
    ✅ **Séance 2** : Maîtrisé le vocabulaire de la transformation
    ✅ **Séance 3** : Appris à exprimer la nécessité existentielle
    ✅ **Séance 4** : Développé une argumentation nuancée
    ✅ **Séance 5** : Créé VOTRE texte de transformation
    
    **LE MESSAGE CENTRAL** :
    
    "C'est ta chance" n'est PAS :
    ❌ Un message naïf "tout est possible"
    ❌ Une acceptation des injustices
    ❌ Un refus de changer le système
    
    "C'est ta chance" EST :
    ✅ Un appel à transformer la blessure en force
    ✅ Une reconnaissance lucide des injustices
    ✅ Une invitation à la lucidité et à l'action
    
    **LA PHILOSOPHIE** :
    
    - Nietzsche : "Là où est ta plus grande douleur, là est ton plus grand bonheur"
    - René Char : "La lucidité est la blessure la plus rapprochée du soleil"
    - Goldman : "La blessure où tu viendras puiser la force et l'impertinence"
    
    **VOTRE TEXTE** :
    
    Vous avez créé quelque chose de PERSONNEL.
    Gardez-le. Relisez-le quand vous douterez.
    
    **CONNEXIONS** :
    
    - "Là-bas" : même refus du déterminisme
    - "Né en 17" : même questionnement sur le hasard de la naissance
    - "Envole-moi" : même appel à l'émancipation
    
    ---
    
    **"C'EST TA CHANCE"**
    
    Le cadeau de ta naissance,
    C'est ce qui te manque.
    Ta puissance naîtra là.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance5: SeanceCeredis = {
  id: 'ctachance-s5',
  chansonId: 'cest-ta-chance',
  numero: 5,
  titre: 'Production : Lettre à soi-même / Manifeste personnel',
  description: `Production finale créative : rédiger une lettre à soi-même ou un manifeste personnel
  qui transforme ses propres "pas de chance" en forces. Mobilisation de tout le parcours :
  vocabulaire de la transformation, grammaire de la nécessité, pensée critique.`,
  
  objectifs: [
    'Identifier ses propres "pas de chance" authentiquement',
    'Transformer chaque manque en force potentielle',
    'Mobiliser le vocabulaire et la grammaire étudiés',
    'Produire un texte personnel et impactant (300-400 mots)',
    'Faire le bilan de son parcours d\'apprentissage'
  ],
  
  dureeEstimee: 78,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['2.2', '3.1', '3.2', '5.1', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 70,
    distributionEvidences: { P1: 3, P2: 1, P3: 1, P4: 3 },
    competencesUniques: ['2.2', '3.1', '3.2', '5.1', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance5;
