/**
 * LÀ-BAS - SÉANCE 5
 * Débat philosophique : Le dilemme tragique
 */

import { 
  createCeredisMetadata,
  type SeanceCeredis,
  type EcranCeredis
} from '@/types/ceredis';

const ecran1: EcranCeredis = {
  id: 'labas-s5-e1',
  numero: 1,
  titre: 'Introduction - Le dilemme tragique',
  type: 'introduction',
  consigne: 'Découvrez pourquoi cette chanson pose un dilemme sans bonne réponse',
  dureeEstimee: 7,
  activite: {
    type: 'introduction',
    contenu: `## QU'EST-CE QU'UN DILEMME TRAGIQUE ?
    
    Un **dilemme tragique** (Sophocles, Sartre) est une situation où :
    - Il y a deux options
    - Les DEUX sont valides moralement
    - Les DEUX entraînent une perte irréparable
    - **Il n'y a PAS de "bonne" réponse**
    
    **Exemple classique** : _Antigone_ (Sophocles)
    - Enterrer son frère = honorer les lois divines MAIS désobéir aux lois humaines
    - Obéir au roi = respecter l'ordre social MAIS trahir la famille
    → Quel que soit son choix, Antigone perd quelque chose d'essentiel
    
    ## "LÀ-BAS" COMME DILEMME TRAGIQUE
    
    **LUI (voix masculine)** : "Envole-moi / Là-bas"
    - Aspire à la liberté métaphysique absolue
    - Refuse le déterminisme social ("Nos rêves sont étroits")
    - Cherche l'authenticité existentielle
    
    **ELLE (voix féminine)** : "N'y va pas"
    - Met en garde contre les périls réels (tempêtes, naufrages, diables)
    - Rappelle que l'amour ancre dans le monde
    - Souligne l'altérité radicale ("Tu m'échappes déjà")
    
    ## STRUCTURE DIALOGIQUE : UNE PSYCHOMACHIE
    
    **Psychomachie** (combat intérieur) : les deux voix représentent deux positions 
    philosophiques **également légitimes** qui s'affrontent.
    
    Ce n'est PAS "il a raison, elle a tort" ou vice-versa.
    **LES DEUX ONT RAISON.** C'est ça, un dilemme tragique.
    
    ## OBJECTIF DE CETTE SÉANCE
    
    - Analyser les arguments DES DEUX positions
    - Comprendre pourquoi chacune est valide
    - Défendre VOTRE position TOUT EN reconnaissant la légitimité de l'autre
    - Éviter le dogmatisme : une pensée mature reconnaît la complexité`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'C1',
    scoreMax: 0
  })
};

const ecran2: EcranCeredis = {
  id: 'labas-s5-e2',
  numero: 2,
  titre: 'Arguments POUR partir - La voix masculine',
  type: 'quiz_qcm',
  consigne: 'Identifiez les arguments philosophiques pour le départ',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: '"Nos rêves sont étroits, nos vies ressemblent / À nos parents, nos envies sages" - Quel argument philosophique ?',
        options: [
          'Critique de la famille',
          'Refus du DÉTERMINISME SOCIAL (Bourdieu) : on reproduit nos origines',
          'Éloge de la sagesse',
          'Nostalgie du passé'
        ],
        reponseCorrecte: 1,
        explication: 'Argument 1 : DÉTERMINISME SOCIAL. Sans rupture radicale ("là-bas"), on reproduit mécaniquement les schémas familiaux et sociaux.'
      },
      {
        id: 'q2',
        question: '"Et les autres imposent leur loi / On se plie et jamais on se bat" - Quelle analyse ?',
        options: [
          'Critique de la violence',
          'Dénonciation de l\'ALIÉNATION : vivre selon les normes des autres',
          'Éloge de la paix',
          'Critique du pouvoir'
        ],
        reponseCorrecte: 1,
        explication: 'Argument 2 : ALIÉNATION. Rester "ici" = vivre selon la loi des autres, perdre son authenticité.'
      },
      {
        id: 'q3',
        question: '"Envole-moi" - Quelle philosophie ?',
        options: [
          'Désir de voyager',
          'Aspiration à la LIBERTÉ MÉTAPHYSIQUE ABSOLUE (Sartre, Nietzsche)',
          'Rêve d\'évasion',
          'Fantaisie poétique'
        ],
        reponseCorrecte: 1,
        explication: 'Argument 3 : LIBERTÉ ABSOLUE. "Envole-moi" = convergence avec "Envole-moi" (1984), aspiration à transcender les limites.'
      },
      {
        id: 'q4',
        question: 'Quel philosophe défend cette position de liberté radicale ?',
        options: [
          'Aristote (prudence)',
          'Sartre ("L\'existence précède l\'essence" - liberté absolue)',
          'Pascal (foi)',
          'Épicure (plaisir)'
        ],
        reponseCorrecte: 1,
        explication: 'SARTRE : L\'homme est "condamné à être libre". La liberté authentique implique de rompre avec le donné.'
      },
      {
        id: 'q5',
        question: 'Synthèse : Quelle est la force de cette position ?',
        options: [
          'Elle est romantique',
          'Elle refuse l\'enfermement dans le déterminisme et cherche l\'authenticité',
          'Elle est égoïste',
          'Elle est irréaliste'
        ],
        reponseCorrecte: 1,
        explication: 'FORCE : Refuser de se résigner, chercher une vie authentique plutôt que reproduite. C\'est une position philosophiquement solide.'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 10
  })
};

const ecran3: EcranCeredis = {
  id: 'labas-s5-e3',
  numero: 3,
  titre: 'Arguments POUR rester - La voix féminine',
  type: 'quiz_qcm',
  consigne: 'Identifiez les arguments philosophiques pour rester',
  dureeEstimee: 12,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm',
    questions: [
      {
        id: 'q1',
        question: '"Là-bas, tempêtes et naufrages / Là-bas, feu et sable et diables" - Quel argument ?',
        options: [
          'Peur de l\'aventure',
          'Reconnaissance lucide des PÉRILS RÉELS de la transformation ontologique',
          'Pessimisme',
          'Manque de courage'
        ],
        reponseCorrecte: 1,
        explication: 'Argument 1 : PÉRILS RÉELS. Ce n\'est pas de la lâcheté, c\'est de la lucidité. La transformation est violente, périlleuse.'
      },
      {
        id: 'q2',
        question: '"J\'oublierai ta voix, ton visage / Tu m\'échappes déjà" - Quelle philosophie ?',
        options: [
          'Tristesse sentimentale',
          'ALTÉRITÉ RADICALE (Levinas) : l\'autre demeure un mystère inaccessible',
          'Jalousie',
          'Possessivité'
        ],
        reponseCorrecte: 1,
        explication: 'Argument 2 : ALTÉRITÉ RADICALE. Partir "là-bas" = accepter que l\'autre devienne totalement étranger, inatteignable.'
      },
      {
        id: 'q3',
        question: '"N\'y va pas" (répété 8 fois) - Quelle signification ?',
        options: [
          'Interdiction autoritaire',
          'URGENCE DÉSESPÉRÉE : appel à considérer la gravité de la perte',
          'Manipulation',
          'Égoïsme'
        ],
        reponseCorrecte: 1,
        explication: 'Argument 3 : URGENCE. La répétition 8× exprime l\'intensité de la perte pressentie, pas une volonté de dominer.'
      },
      {
        id: 'q4',
        question: 'Quel philosophe défend la responsabilité envers l\'autre ?',
        options: [
          'Nietzsche (liberté individuelle)',
          'Levinas (responsabilité pour l\'autre précède la liberté)',
          'Sartre (liberté absolue)',
          'Heidegger (authenticité)'
        ],
        reponseCorrecte: 1,
        explication: 'LEVINAS : La responsabilité pour l\'autre précède ma liberté. L\'éthique prime sur l\'ontologie.'
      },
      {
        id: 'q5',
        question: 'Synthèse : Quelle est la force de cette position ?',
        options: [
          'Elle est conservatrice',
          'Elle reconnaît que l\'amour profond et la responsabilité sont des valeurs légitimes',
          'Elle est lâche',
          'Elle manque d\'ambition'
        ],
        reponseCorrecte: 1,
        explication: 'FORCE : Reconnaître que l\'amour, la responsabilité, le lien sont AUSSI des valeurs philosophiquement solides (Levinas, éthique du care, Aristote).'
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.2', '5.2', '5.3'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 10
  })
};

const ecran4: EcranCeredis = {
  id: 'labas-s5-e4',
  numero: 4,
  titre: 'Analyse de la structure dialogique',
  type: 'quiz_qcm_justifie',
  consigne: 'Analysez la forme littéraire et philosophique du dialogue',
  dureeEstimee: 15,
  difficulte: 'difficile',
  activite: {
    type: 'quiz_qcm_justifie',
    questions: [
      {
        id: 'q1',
        question: 'Pourquoi Goldman utilise-t-il deux voix (masculine/féminine) ?',
        options: [
          'Pour un duo',
          'Pour représenter deux POSITIONS PHILOSOPHIQUES qui s\'affrontent',
          'Pour vendre plus de disques',
          'Par hasard'
        ],
        reponseCorrecte: 1,
        explication: 'La structure dialogique = psychomachie (combat intérieur). Les deux voix incarnent deux philosophies légitimes.',
        promptJustification: 'Expliquez comment cette structure dialogique (deux voix qui s\'affrontent) transforme la chanson en débat philosophique. Pourquoi est-ce plus profond qu\'une seule voix ? (100 mots min)',
        justificationMinLength: 100
      },
      {
        id: 'q2',
        question: 'Que signifie la répétition 8× de "N\'y va pas" ?',
        options: [
          'Lourdeur stylistique',
          'URGENCE DÉSESPÉRÉE : intensité de l\'appel face au tragique',
          'Manque d\'imagination',
          'Pour remplir la chanson'
        ],
        reponseCorrecte: 1,
        explication: '8× = insistance extrême, comme un cri désespéré. C\'est rhétoriquement puissant.',
        promptJustification: 'Analysez l\'effet rhétorique et émotionnel de cette répétition 8×. Pourquoi Goldman choisit-il cette insistance plutôt que des arguments variés ? (100 mots min)',
        justificationMinLength: 100
      }
    ]
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.3', '4.2', '5.2'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 12
  })
};

const ecran5: EcranCeredis = {
  id: 'labas-s5-e5',
  numero: 5,
  titre: 'Classement des arguments par force philosophique',
  type: 'ordre_elements',
  consigne: 'Ordonnez les arguments du plus au moins convaincant (votre avis)',
  dureeEstimee: 10,
  difficulte: 'difficile',
  activite: {
    type: 'ordre_elements',
    exercice: {
      id: 'oe1',
      consigne: `Classez ces arguments des DEUX positions du PLUS FORT au PLUS FAIBLE selon vous.
      
      Il n'y a pas de "bonne" réponse absolue : votre classement révèle votre philosophie personnelle.`,
      elements: [
        {
          id: 'arg1',
          texte: '[PARTIR] Refus du déterminisme social : ne pas reproduire mécaniquement sa famille',
          ordre: 1
        },
        {
          id: 'arg2',
          texte: '[PARTIR] Aspiration à la liberté métaphysique absolue (Sartre)',
          ordre: 2
        },
        {
          id: 'arg3',
          texte: '[PARTIR] Recherche de l\'authenticité existentielle',
          ordre: 3
        },
        {
          id: 'arg4',
          texte: '[RESTER] Périls réels de la transformation (tempêtes, naufrages, diables)',
          ordre: 4
        },
        {
          id: 'arg5',
          texte: '[RESTER] Altérité radicale : l\'autre devient inaccessible',
          ordre: 5
        },
        {
          id: 'arg6',
          texte: '[RESTER] Responsabilité pour l\'autre (Levinas)',
          ordre: 6
        },
        {
          id: 'arg7',
          texte: '[RESTER] L\'amour comme ancrage dans le monde',
          ordre: 7
        }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['5.4', '5.5'],
    evidenceType: 'P2',
    niveau: 'C1',
    scoreMax: 10
  })
};

const ecran6: EcranCeredis = {
  id: 'labas-s5-e6',
  numero: 6,
  titre: 'Dissertation : Votre position philosophique',
  type: 'texte_libre',
  consigne: 'Défendez votre position TOUT EN reconnaissant la légitimité de l\'autre',
  dureeEstimee: 25,
  difficulte: 'difficile',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl1',
      consigne: `**DISSERTATION PHILOSOPHIQUE CRITIQUE** (350-400 mots)

**SUJET** : Faut-il partir "là-bas" ou rester "ici" ? Défendez votre position.

**⚠️ EXIGENCE CRITIQUE** : Votre dissertation DOIT :
1. Défendre clairement UNE position (partir OU rester)
2. **MAIS** reconnaître explicitement la légitimité de la position opposée
3. Expliquer pourquoi, MALGRÉ cette légitimité, vous choisissez votre position

**Ce qui est évalué** :
- ❌ PAS le fait de choisir "partir" ou "rester" (les deux sont valides)
- ✅ La NUANCE : reconnaître que l'autre position a aussi des arguments solides
- ✅ L'HONNÊTETÉ : admettre les limites de votre propre position
- ✅ La MATURITÉ : éviter le dogmatisme ("j'ai raison, l'autre a tort")

**STRUCTURE SUGGÉRÉE** :

1. **Introduction** (50 mots)
   - Poser le dilemme tragique
   - Annoncer votre position

2. **Arguments pour l'autre position** (100 mots)
   - Présenter honnêtement les meilleurs arguments de la position opposée
   - Reconnaître leur légitimité philosophique
   - "Je comprends que..."

3. **Arguments pour votre position** (150 mots)
   - Défendre votre choix avec des arguments philosophiques
   - Références : Sartre, Nietzsche, Heidegger (liberté) OU Levinas, Aristote (responsabilité)
   - Convergences Goldman si pertinent

4. **Conclusion nuancée** (50 mots)
   - Réaffirmer votre position
   - MAIS admettre qu'il n'y a pas de "bonne" réponse absolue
   - "Je choisis X, tout en reconnaissant que Y est aussi valide"

**EXEMPLES DE NUANCE** :
- "Bien que je reconnaisse la force de l'argument de Levinas..."
- "Malgré les périls réels évoqués par la voix féminine..."
- "Je comprends l'aspiration à la liberté, mais..."
- "Il n'y a pas de solution parfaite, cependant..."`,
      nombreMotsMin: 350,
      nombreMotsMax: 400,
      aideRedaction: [
        'Intro : Dilemme + votre position',
        'Partie 1 : Arguments CONTRE votre position (honnêteté)',
        'Partie 2 : Arguments POUR votre position (conviction)',
        'Conclusion : Position nuancée (maturité)'
      ],
      criteres: [
        { label: 'Nuance et maturité', description: 'Reconnaît la légitimité de la position opposée', points: 6 },
        { label: 'Argumentation philosophique', description: 'Utilise concepts et auteurs pertinents', points: 5 },
        { label: 'Honnêteté intellectuelle', description: 'Admet les limites de sa propre position', points: 4 },
        { label: 'Clarté et structure', description: 'Progression logique et lisible', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['3.1', '3.2', '3.3', '5.5', '5.6'],
    evidenceType: 'P3',
    niveau: 'C1',
    scoreMax: 18
  })
};

const ecran7: EcranCeredis = {
  id: 'labas-s5-e7',
  numero: 7,
  titre: 'Débat interactif - Réaction aux arguments',
  type: 'texte_libre',
  consigne: 'Réagissez aux arguments d\'un·e camarade ayant la position opposée',
  dureeEstimee: 15,
  difficulte: 'moyen',
  activite: {
    type: 'texte_libre',
    exercice: {
      id: 'tl2',
      consigne: `**DÉBAT PHILOSOPHIQUE INTERACTIF**

Vous allez lire la dissertation d'un·e camarade qui a choisi la position OPPOSÉE à la vôtre.

**Votre tâche** (200-250 mots) :

1. **Résumez** sa position en 2-3 phrases
2. **Identifiez** son argument le plus fort
3. **Répondez** à cet argument (sans agressivité, avec respect)
4. **Nuancez** : y a-t-il un point où vous êtes d'accord ?

**RÈGLES DU DÉBAT PHILOSOPHIQUE** :
- ✅ Respecter l'autre (pas d'attaques personnelles)
- ✅ Attaquer les ARGUMENTS, pas la personne
- ✅ Reconnaître quand l'autre a un bon argument
- ✅ Chercher la vérité, pas "gagner"

**EXEMPLE DE RÉPONSE** :

"Mon camarade défend la position qu'il faut rester pour préserver l'amour et la responsabilité envers l'autre. Son argument le plus fort, selon moi, est la référence à Levinas : l'éthique précède la liberté, donc ma responsabilité pour l'autre est plus fondamentale que mon désir d'autonomie.

Cependant, je pense que cet argument présuppose que la responsabilité implique nécessairement la proximité géographique. Ne peut-on pas être responsable de l'autre MÊME en partant ? Sartre dirait que la vraie responsabilité vient de la liberté : je suis plus responsable quand je choisis authentiquement.

Je reconnais néanmoins que son argument sur l'altérité radicale ('Tu m'échappes déjà') est troublant. Peut-être que la vraie question n'est pas 'partir ou rester' mais 'comment aimer tout en respectant la liberté de l'autre' ?"`,
      nombreMotsMin: 200,
      nombreMotsMax: 250,
      aideRedaction: [
        'Résumer la position adverse équitablement',
        'Identifier son meilleur argument',
        'Répondre avec respect et logique',
        'Reconnaître les points d\'accord'
      ],
      criteres: [
        { label: 'Respect et équité', description: 'Présente honnêtement la position adverse', points: 3 },
        { label: 'Qualité de la réponse', description: 'Argumente logiquement', points: 4 },
        { label: 'Nuance', description: 'Reconnaît les points d\'accord', points: 3 }
      ]
    }
  },
  ceredis: createCeredisMetadata({
    competencies: ['4.1', '4.2', '5.4'],
    evidenceType: 'P2',
    niveau: 'B2',
    scoreMax: 10
  })
};

const ecran8: EcranCeredis = {
  id: 'labas-s5-e8',
  numero: 8,
  titre: 'Journal réflexif + Bilan du parcours',
  type: 'journal_reflexif',
  consigne: 'Réflexion finale sur "Là-bas" et le parcours complet',
  dureeEstimee: 15,
  difficulte: 'moyen',
  activite: {
    type: 'journal_reflexif',
    exercice: {
      id: 'jr1',
      questionPrincipale: 'Comment ce parcours complet (5 séances) a-t-il transformé votre compréhension de "Là-bas" et de Goldman ?',
      contexte: `Vous avez exploré "Là-bas" sous 5 angles : découverte, vocabulaire, grammaire, 
      langage symbolique, débat philosophique. Vous avez découvert que Goldman est un penseur 
      métaphysique qui dialogue avec Heidegger, Sartre, Levinas, Nietzsche.`,
      sousQuestions: [
        'Quelle a été la découverte la plus marquante du parcours ?',
        'Votre perception de Goldman a-t-elle changé ? Comment ?',
        'Le dilemme tragique vous semble-t-il résolu ou irrésoluble ?',
        'Cette chanson vous parle-t-elle différemment maintenant ?',
        'Que retenez-vous sur le plan méthodologique (analyse de texte, philosophie) ?'
      ],
      nombreMotsMin: 200,
      exemplesReponses: [
        'Comparer votre compréhension initiale et actuelle',
        'Identifier les concepts philosophiques qui résonnent le plus',
        'Réfléchir à vos propres dilemmes entre liberté et attachement',
        'Penser à la valeur de l\'analyse approfondie vs écoute superficielle'
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

export const seance5: SeanceCeredis = {
  id: 'labas-s5',
  chansonId: 'labas',
  numero: 5,
  titre: 'Débat philosophique : Le dilemme tragique',
  description: `Séance finale qui traite "Là-bas" comme un dilemme tragique au sens philosophique : 
  deux positions contradictoires (partir/rester) sont TOUTES DEUX valides. Analyse de la structure 
  dialogique (psychomachie), des arguments philosophiques de chaque position, et développement 
  d'une pensée nuancée qui reconnaît la légitimité de la position opposée. Exercice majeur de 
  dissertation critique exigeant maturité intellectuelle : défendre SA position tout en admettant 
  que l'autre est aussi légitime. Éviter le dogmatisme. Convergences avec éthique sartrienne 
  (liberté absolue) et lévinasienne (responsabilité pour l'autre).`,
  
  objectifs: [
    'Comprendre ce qu\'est un dilemme tragique (Sophocles, Sartre)',
    'Analyser la structure dialogique comme psychomachie',
    'Identifier les arguments philosophiques POUR partir (Sartre, Nietzsche, Heidegger)',
    'Identifier les arguments philosophiques POUR rester (Levinas, éthique du care, Aristote)',
    'Reconnaître la légitimité des DEUX positions',
    'Développer une pensée nuancée et mature',
    'Éviter le dogmatisme ("j\'ai raison, l\'autre a tort")',
    'Défendre sa position TOUT EN reconnaissant la validité de l\'autre',
    'Participer à un débat philosophique respectueux',
    'Synthétiser l\'ensemble du parcours "Là-bas"'
  ],
  
  dureeEstimee: 102,
  
  ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8],
  
  competences: ['2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '4.1', '4.2', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
  
  ceredisGlobal: {
    domainesPrincipaux: ['D5', 'D3', 'D4'],
    niveauCible: 'C1',
    scoreMaxTotal: 80,
    distributionEvidences: { P1: 1, P2: 5, P3: 1, P4: 1 },
    competencesUniques: ['2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '4.1', '4.2', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
  }
};

export default seance5;
