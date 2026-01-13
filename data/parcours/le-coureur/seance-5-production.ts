/**
 * LE COUREUR - SÉANCE 5 (FORMAT CEREDIS)
 * Production finale : Récit de transformation ambivalente
 * 
 * Focus : Raconter une transformation qui fut à la fois gain et perte
 * Contraintes : Imparfait/passé composé, ambivalence, bilan nuancé
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'lecoureur-s5-e1',
  numero: 1,
  titre: 'Introduction - Production finale',
  type: 'introduction',
  consigne: 'Découvrez le projet créatif final',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**SÉANCE 5 : PRODUCTION FINALE**
    
    **"MON RÉCIT DE TRANSFORMATION AMBIVALENTE"**
    
    Vous avez traversé tout le parcours :
    
    ✅ **Séance 1** : Découvert les 7 étapes du récit de déracinement
    ✅ **Séance 2** : Maîtrisé les 4 champs lexicaux (nature, modernité, déshumanisation, mondialisation)
    ✅ **Séance 3** : Compris les temps du récit (imparfait vs passé composé)
    ✅ **Séance 4** : Débattu sur la mondialisation (émancipation vs aliénation)
    
    **MAINTENANT** : C'est votre tour de CRÉER.
    
    **CHOIX DU FORMAT** :
    
    **Option A** : LETTRE DU COUREUR À SA FAMILLE
    → Écrivez la lettre que le coureur envoie à ses parents restés au pays
    
    **Option B** : DIALOGUE AVANT/APRÈS
    → Imaginez un dialogue entre le coureur et un ami resté au pays
    
    **Option C** : ESSAI SUR LA MONDIALISATION
    → Rédigez un essai argumenté sur les gains et pertes de la mondialisation
    
    **Option D** : RÉCIT PERSONNEL
    → Racontez votre propre transformation ambivalente
    
    **CONTRAINTES COMMUNES** :
    - 450-500 mots
    - Utiliser imparfait (AVANT) et passé composé (APRÈS)
    - Exprimer l'ambivalence (ni tout noir, ni tout blanc)
    - Bilan nuancé (pas de jugement simpliste)
    
    **DURÉE** : Cette séance est plus longue (~75 min) car c'est une création majeure.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'lecoureur-s5-e2',
  numero: 2,
  titre: 'Rappel - Structure narrative',
  type: 'quiz_qcm',
  consigne: 'Révisez les éléments clés du parcours',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: 'Quelles sont les 7 étapes du récit dans "Le coureur" ?',
        options: [
          'Naissance, enfance, adolescence, mariage, travail, retraite, mort',
          'Vie d\'origine, découverte, transaction, transplantation, déshumanisation, transformation, bilan',
          'Matin, midi, après-midi, soir, nuit',
          'Introduction, développement, conclusion'
        ],
        reponseCorrecte: 1,
        explication: 'Les 7 étapes structurent le récit de déracinement : de la plage tropicale à l\'ambivalence finale.'
      },
      {
        id: 'q2',
        question: 'Quelle est la métaphore centrale de la chanson ?',
        options: [
          'Le ciel et la terre',
          'Caresser vs écorcher la terre (harmonie vs violence)',
          'Le jour et la nuit',
          'Le chaud et le froid'
        ],
        reponseCorrecte: 1,
        explication: 'Cette métaphore résume la transformation : de la relation tendre avec la nature à la violence technologique.'
      },
      {
        id: 'q3',
        question: 'Quel temps pour l\'AVANT, quel temps pour l\'APRÈS ?',
        options: [
          'Futur pour AVANT, présent pour APRÈS',
          'Imparfait pour AVANT, passé composé pour APRÈS',
          'Présent pour AVANT, imparfait pour APRÈS',
          'Conditionnel pour les deux'
        ],
        reponseCorrecte: 1,
        explication: 'Imparfait = durée, habitude (AVANT). Passé composé = rupture, événement (APRÈS).'
      },
      {
        id: 'q4',
        question: 'Que signifie l\'ambivalence chez Goldman ?',
        options: [
          'Être indécis',
          'Ne pas comprendre',
          'Reconnaître qu\'une situation est à la fois positive ET négative',
          'Être triste'
        ],
        reponseCorrecte: 2,
        explication: 'Goldman montre que la mondialisation crée des GAINS et des PERTES simultanément.'
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
  id: 'lecoureur-s5-e3',
  numero: 3,
  titre: 'Rappel - Vocabulaire clé',
  type: 'texte_a_trous',
  consigne: 'Révisez le vocabulaire à utiliser dans votre production',
  dureeEstimee: 8,
  difficulte: 'moyen',
  activite: {
    type: 'texte_a_trous',
    exercice: {
      id: 'tat1',
      texteAvecTrous: `**VOCABULAIRE À RÉUTILISER**
      
      **AVANT (authenticité)** :
      - Je vivais sur une {{plage}} tropicale.
      - Les {{alizés}} soufflaient doucement.
      - Je courais {{pieds nus}} comme mes {{ancêtres}}.
      - Je {{caressais}} la terre avec tendresse.
      
      **ÉVÉNEMENT (rupture)** :
      - Un homme avec un {{chronomètre}} est arrivé.
      - Il a proposé des {{dollars}} à mes parents.
      - Ils ont signé et j'ai pris l'{{avion}}.
      
      **APRÈS (aliénation)** :
      - On m'a {{mesuré}} comme un {{cheval}}.
      - J'ai couru sur un {{tapis}}, couvert d'{{électrodes}}.
      - On m'a mis un {{numéro}} sur le dos.
      - Je courais toujours en {{rond}}.
      - J'{{écorchais}} maintenant la terre avec mes {{clous}}.
      
      **BILAN (ambivalence)** :
      - Je suis {{étranger}} partout.
      - Était-ce un {{mal}}, un {{bien}} ? C'est {{ainsi}}.`,
      motsCaches: [
        'plage', 'alizés', 'pieds nus', 'ancêtres', 'caressais',
        'chronomètre', 'dollars', 'avion',
        'mesuré', 'cheval', 'tapis', 'électrodes', 'numéro', 'rond', 'écorchais', 'clous',
        'étranger', 'mal', 'bien', 'ainsi'
      ],
      indicesOptionnels: [
        'Lieu près de la mer',
        'Vents tropicaux',
        'Sans chaussures',
        'Prédécesseurs',
        'Touchais tendrement',
        'Instrument de mesure du temps',
        'Monnaie américaine',
        'Transport aérien',
        'Évalué (comme objet)',
        'Animal de course',
        'Machine de course',
        'Capteurs médicaux',
        'Chiffre d\'identification',
        'Forme circulaire',
        'Blessais (la terre)',
        'Pointes de chaussures',
        'Qui n\'appartient pas',
        'Contraire de bien',
        'Contraire de mal',
        'C\'est comme ça'
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

const ecran4: EcranCeredis = {
  id: 'lecoureur-s5-e4',
  numero: 4,
  titre: 'Modèle - Structure de la production',
  type: 'introduction',
  consigne: 'Découvrez la structure recommandée pour chaque format',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURES POUR CHAQUE FORMAT**
    
    **OPTION A : LETTRE DU COUREUR À SA FAMILLE (450-500 mots)**
    
    Structure :
    1. **Salutation** : "Chers parents, Chère maman..."
    2. **AVANT** (imparfait) : "Vous vous souvenez quand je courais sur la plage..."
    3. **ÉVÉNEMENT** (passé composé) : "Puis un jour, cet homme est arrivé..."
    4. **MA VIE ICI** : Décrire la nouvelle vie (gains ET pertes)
    5. **BILAN** : "Est-ce que c'était un bon choix ? Je ne sais pas..."
    6. **Clôture** : "Vous me manquez. Votre fils qui pense à vous."
    
    ---
    
    **OPTION B : DIALOGUE AVANT/APRÈS (450-500 mots)**
    
    Structure :
    - Le coureur revient au pays et retrouve un ami d'enfance
    - L'ami pose des questions : "Alors, c'est comment là-bas ?"
    - Le coureur répond avec ambivalence : "C'est bien et pas bien..."
    - Alterner les répliques (au moins 10 échanges)
    - Utiliser imparfait (souvenirs) et passé composé (événements)
    
    ---
    
    **OPTION C : ESSAI SUR LA MONDIALISATION (450-500 mots)**
    
    Structure :
    1. **Introduction** : Présenter le sujet et la problématique
    2. **Partie 1** : Les gains de la mondialisation (exemples du coureur)
    3. **Partie 2** : Les pertes de la mondialisation (exemples du coureur)
    4. **Partie 3** : L'ambivalence et votre position personnelle
    5. **Conclusion** : Synthèse et ouverture
    
    ---
    
    **OPTION D : RÉCIT PERSONNEL (450-500 mots)**
    
    Structure :
    1. **AVANT** (imparfait) : Comment était votre vie avant le changement
    2. **ÉVÉNEMENT** (passé composé) : Ce qui a tout changé
    3. **APRÈS** : Les conséquences (gains ET pertes)
    4. **BILAN** : "Était-ce un mal, un bien ? C'est ainsi."
    
    **CONSEIL** : Inspirez-vous de la structure du "Coureur" !`
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran5: EcranCeredis = {
  id: 'lecoureur-s5-e5',
  numero: 5,
  titre: 'Analyse prosodique - Bilan de la chanson',
  type: 'introduction',
  consigne: 'Synthèse des éléments stylistiques à imiter',
  dureeEstimee: 5,
  activite: {
    type: 'introduction',
    contenu: `**ÉLÉMENTS STYLISTIQUES À IMITER**
    
    **1. LA STRUCTURE CIRCULAIRE**
    
    Goldman commence et finit avec le même vers :
    "Je courais sur la plage..."
    
    → **Conseil** : Commencez et terminez votre texte avec une phrase similaire.
    Cela crée un effet de **nostalgie** et de **boucle**.
    
    ---
    
    **2. L'OPPOSITION DES TEMPS**
    
    - Imparfait = AVANT (durée, habitude)
    - Passé composé = APRÈS (événement, rupture)
    
    → **Conseil** : Utilisez systématiquement cette opposition.
    
    ---
    
    **3. LES MÉTAPHORES**
    
    Goldman utilise "caresser/écorcher" pour exprimer la transformation.
    
    → **Conseil** : Créez votre propre métaphore :
    - "J'habitais un jardin / maintenant je vis dans un désert de béton"
    - "Je marchais doucement / maintenant je cours sans fin"
    
    ---
    
    **4. L'AMBIVALENCE DU BILAN**
    
    Goldman ne juge pas : "Était-ce un mal, un bien / C'est ainsi"
    
    → **Conseil** : Terminez par un bilan nuancé.
    Évitez "C'était bien" ou "C'était mal".
    Préférez "J'ai gagné... mais j'ai perdu..."
    
    ---
    
    **5. LA VOIX PASSIVE**
    
    "On m'a touché", "On m'a mesuré" → subit les actions
    
    → **Conseil** : Si vous décrivez une transformation subie,
    utilisez "On m'a dit...", "J'ai été forcé..."
    
    ---
    
    **RAPPEL FINAL** :
    
    Le plus important = **l'ambivalence**.
    Montrez que tout changement comporte des **gains ET des pertes**.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.2', '5.3'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};

const ecran6: EcranCeredis = {
  id: 'lecoureur-s5-e6',
  numero: 6,
  titre: 'Brainstorming - Choisir son sujet',
  type: 'texte_libre',
  consigne: 'Préparez votre production finale',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**BRAINSTORMING : PRÉPAREZ VOTRE PRODUCTION**
      
      1. **CHOISISSEZ votre format** (A, B, C ou D) et expliquez pourquoi.
      
      2. **Si vous choisissez le récit personnel (D)** :
         - Quelle transformation allez-vous raconter ?
         - Qu'avez-vous gagné ? Qu'avez-vous perdu ?
      
      3. **Si vous choisissez la lettre du coureur (A)** :
         - Quel ton allez-vous adopter ? (nostalgique ? fier ? triste ?)
         - Que va-t-il raconter à ses parents ?
      
      4. **Notez vos idées principales** (100-150 mots) :
         - AVANT : ...
         - ÉVÉNEMENT : ...
         - APRÈS (gains) : ...
         - APRÈS (pertes) : ...
         - BILAN : ...`,
      nombreMotsMin: 100,
      nombreMotsMax: 150,
      aideRedaction: [
        'Format choisi : A / B / C / D',
        'Raison du choix',
        'Idées pour AVANT (imparfait)',
        'Idées pour ÉVÉNEMENT (passé composé)',
        'Idées pour BILAN (ambivalence)'
      ],
      criteres: [
        { label: 'Choix justifié', description: 'Format choisi avec explication', points: 3 },
        { label: 'Idées AVANT', description: 'Éléments pour la partie imparfait', points: 3 },
        { label: 'Idées APRÈS', description: 'Éléments gains ET pertes', points: 4 },
        { label: 'Bilan prévu', description: 'Idée pour le bilan nuancé', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '5.5'],
    evidenceType: 'P2',
    niveau: 'B1',
    scoreMax: 13
  })
};

const ecran7: EcranCeredis = {
  id: 'lecoureur-s5-e7',
  numero: 7,
  titre: 'Production finale',
  type: 'texte_libre',
  consigne: 'Rédigez votre récit de transformation ambivalente',
  dureeEstimee: 25,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl2',
      consigne: `**PRODUCTION FINALE : RÉCIT DE TRANSFORMATION AMBIVALENTE**
      
      Rédigez votre texte de 450-500 mots selon le format choisi.
      
      **CONTRAINTES OBLIGATOIRES** :
      
      ✅ Utiliser l'**imparfait** pour décrire l'AVANT (habitudes, état)
      ✅ Utiliser le **passé composé** pour l'événement de rupture
      ✅ Montrer les **GAINS** de la transformation
      ✅ Montrer les **PERTES** de la transformation
      ✅ Terminer par un **bilan nuancé** (pas de jugement simpliste)
      
      **BONUS** :
      
      ⭐ Structure circulaire (commencer et finir pareillement)
      ⭐ Métaphore personnelle (comme caresser/écorcher)
      ⭐ Vocabulaire riche (réutiliser le vocabulaire étudié)
      
      **RAPPEL DES FORMATS** :
      
      - **A** : Lettre du coureur à sa famille
      - **B** : Dialogue coureur / ami resté au pays
      - **C** : Essai sur la mondialisation
      - **D** : Récit personnel de transformation
      
      **Bonne rédaction !**`,
      nombreMotsMin: 450,
      nombreMotsMax: 500,
      aideRedaction: [
        'INTRODUCTION : Situez le contexte (AVANT)',
        'DÉVELOPPEMENT 1 : L\'événement de rupture',
        'DÉVELOPPEMENT 2 : Les GAINS de la transformation',
        'DÉVELOPPEMENT 3 : Les PERTES de la transformation',
        'CONCLUSION : Bilan nuancé ("Était-ce un mal, un bien ? C\'est ainsi.")'
      ],
      criteres: [
        { label: 'Utilisation imparfait (AVANT)', description: 'Habitudes et descriptions au bon temps', points: 5 },
        { label: 'Utilisation passé composé (rupture)', description: 'Événements au bon temps', points: 5 },
        { label: 'Expression des GAINS', description: 'Aspects positifs de la transformation', points: 5 },
        { label: 'Expression des PERTES', description: 'Aspects négatifs de la transformation', points: 5 },
        { label: 'Bilan nuancé (ambivalence)', description: 'Pas de jugement simpliste', points: 5 },
        { label: 'Richesse vocabulaire', description: 'Réutilisation du vocabulaire étudié', points: 5 },
        { label: 'Qualité expression', description: 'Clarté, fluidité, style', points: 5 },
        { label: 'Structure cohérente', description: 'Organisation logique du texte', points: 5 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.2', '3.3', '5.5', '5.6', '5.7'],
    evidenceType: 'P3',
    niveau: 'B2',
    scoreMax: 40
  })
};

const ecran8: EcranCeredis = {
  id: 'lecoureur-s5-e8',
  numero: 8,
  titre: 'Journal réflexif - Bilan personnel',
  type: 'journal_reflexif',
  consigne: 'Réfléchissez à ce que ce parcours vous a apporté',
  dureeEstimee: 10,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Que retenez-vous de ce parcours sur "Le coureur" ? Comment cette chanson a-t-elle changé votre regard sur la mondialisation ?',
      contexte: 'Vous avez étudié le récit de déracinement, les champs lexicaux, les temps du récit et débattu sur la mondialisation.',
      sousQuestions: [
        'Quelle partie du parcours vous a le plus marqué(e) ? Pourquoi ?',
        'Avez-vous changé d\'avis sur la mondialisation après ce parcours ?',
        'La phrase "Était-ce un mal, un bien / C\'est ainsi" vous parle-t-elle personnellement ?',
        'Pensez-vous appliquer cette "ambivalence" à d\'autres situations de votre vie ?'
      ],
      nombreMotsMin: 120,
      exemplesReponses: [
        'Réfléchir honnêtement à ce que vous avez appris',
        'Identifier un moment clé du parcours',
        'Faire le lien avec votre vie personnelle',
        'Montrer comment votre regard a évolué'
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
  id: 'lecoureur-s5-e9',
  numero: 9,
  titre: 'Bilan final du parcours',
  type: 'bilan',
  consigne: 'Synthèse complète du parcours "Le coureur"',
  dureeEstimee: 5,
  activite: {
    type: 'bilan',
    contenu: `**PARCOURS "LE COUREUR" : BILAN FINAL**
    
    **CE QUE VOUS AVEZ APPRIS** :
    
    ✅ **SÉANCE 1 - DÉCOUVERTE**
    - Les 7 étapes du récit de déracinement
    - Les oppositions AVANT/APRÈS
    - La question centrale : émancipation ou aliénation ?
    
    ✅ **SÉANCE 2 - VOCABULAIRE**
    - 4 champs lexicaux : nature, modernité, déshumanisation, mondialisation
    - Métaphore centrale : caresser vs écorcher la terre
    - Vocabulaire de l'authenticité et de l'aliénation
    
    ✅ **SÉANCE 3 - GRAMMAIRE**
    - Imparfait = durée, habitude (AVANT)
    - Passé composé = événement, rupture (APRÈS)
    - Voix passive = déshumanisation ("On m'a...")
    
    ✅ **SÉANCE 4 - DÉBAT**
    - Thèse : gains de la mondialisation
    - Antithèse : pertes de la mondialisation
    - Synthèse : l'ambivalence goldmanienne
    - Dimension post-coloniale
    
    ✅ **SÉANCE 5 - PRODUCTION**
    - Récit de transformation ambivalente
    - Application de tous les acquis
    
    **MESSAGE PHILOSOPHIQUE CENTRAL** :
    
    "Était-ce un mal, un bien / C'est ainsi"
    
    Goldman nous enseigne l'**humilité morale** :
    - Les situations complexes ne sont ni tout blanc ni tout noir
    - Chaque transformation apporte des gains ET des pertes
    - Le jugement simpliste est toujours insuffisant
    
    **CONNEXIONS GOLDMANIENNES** :
    
    | Chanson | Thème commun |
    |---------|--------------|
    | "Né en 17" | Le hasard, la contingence |
    | "Là-bas" | La liberté intérieure |
    | "C'est ta chance" | La transformation du manque |
    | "Envole-moi" | L'émancipation par l'intelligence |
    
    **BRAVO ! Vous avez terminé le parcours "Le coureur" !**
    
    Vous maîtrisez maintenant :
    - Le vocabulaire du déracinement et de la mondialisation
    - Les temps du récit (imparfait/passé composé)
    - L'argumentation nuancée (ambivalence)
    - La production de récits de transformation`
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.6'],
    evidenceType: 'P4',
    niveau: 'B1',
    scoreMax: 0
  })
};

export const seance5: SeanceCeredis = {
  id: 'lecoureur-s5',
  chansonId: 'le-coureur',
  numero: 5,
  titre: 'Production finale : Récit de transformation ambivalente',
  description: `Production créative finale mobilisant tous les acquis du parcours.
  Choix entre lettre du coureur, dialogue, essai ou récit personnel.
  Contraintes : imparfait/passé composé, ambivalence, bilan nuancé.`,
  
  objectifs: [
    'Mobiliser tous les acquis du parcours (vocabulaire, grammaire, argumentation)',
    'Produire un texte long et structuré (450-500 mots)',
    'Exprimer l\'ambivalence d\'une transformation',
    'Utiliser correctement imparfait et passé composé',
    'Développer sa propre réflexion sur le changement'
  ],
  
  dureeEstimee: 74,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8, ecran9],
  
  competences: ['2.2', '3.1', '3.2', '3.3', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D3', 'D5'],
    niveauCible: 'B2',
    scoreMaxTotal: 81,
    distributionEvidences: { P1: 4, P2: 2, P3: 1, P4: 2 },
    competencesUniques: ['2.2', '3.1', '3.2', '3.3', '5.1', '5.2', '5.3', '5.5', '5.6', '5.7']
  }
};

export default seance5;
