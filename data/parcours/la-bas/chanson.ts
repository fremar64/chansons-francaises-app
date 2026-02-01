/**
 * Données de la chanson "Là-bas" - Jean-Jacques Goldman (1987)
 * 
 * Niveau: B2-C1
 * Thème: Déterminisme social, liberté conquise, émigration existentielle
 * Type de texte: Dialogue dramatique (psychomachie)
 * 
 * PÉDAGOGIE: INITIATION AU LANGAGE SYMBOLIQUE MÉTAPHYSIQUE
 * 
 * Cette chanson appartient au registre des grandes œuvres de l'esprit (Bible, philosophie,
 * poésie, théâtre de Shakespeare, L'Étranger de Camus). Elle initie les lycéens au 
 * LANGAGE SYMBOLIQUE utilisé par les penseurs métaphysiciens pour exprimer les expériences
 * existentielles limites qui échappent au langage ordinaire.
 * 
 * Jean-Jacques Goldman n'est pas un simple auteur de variété mais un ARTISTE SPIRITUEL
 * qui pense en profondeur la condition humaine.
 * 
 * Compétences principales:
 * - Apprentissage du LANGAGE SYMBOLIQUE métaphysique
 * - Futur simple de la volonté et de la projection existentielle
 * - Impératif négatif (n'y va pas) comme voix légitime d'avertissement
 * - Vocabulaire du déterminisme et de la liberté authentique
 * - Argumentation dialoguée (psychomachie)
 * 
 * STRUCTURE PHILOSOPHIQUE:
 * Cette chanson est un DIALOGUE entre deux amants qui incarne un combat intérieur
 * (psychomachie) entre deux forces existentielles :
 * 
 * - LUI (Jean-Jacques Goldman) : L'arrachement métaphysique, le refus du déterminisme social,
 *   la quête de liberté authentique. "Là-bas" n'est pas géographique mais ontologique.
 * 
 * - ELLE (Sirima) : L'ancrage dans le familier, la sécurité affective, la peur de l'expérience
 *   métaphysique limite. "N'y va pas" = avertissement sur les dangers réels de cette quête.
 * 
 * THÈSE CENTRALE: "Là-bas" n'est pas un lieu mais une transformation intérieure,
 * un décentrement ontologique qui permet d'échapper aux déterminismes de la naissance.
 * MAIS ce voyage comporte des dangers réels exprimés dans le langage symbolique de
 * l'expérience limite : tempêtes, naufrages, feu, diables, mirages.
 */

import type { Chanson } from '@/services/pocketbase';

// Type pour les paroles synchronisées avec identification du locuteur
interface LigneSynchronisee {
  temps: number;
  texte: string;
  locuteur?: 'LUI' | 'ELLE' | 'ENSEMBLE';
}

/**
 * PAROLES COMPLÈTES ET AUTHENTIQUES
 * 
 * La chanson est structurée comme un dialogue argumenté :
 * - LUI expose ses raisons de partir (déterminisme social, quête de dignité)
 * - ELLE oppose des contre-arguments (danger existentiel, amour, sécurité)
 * - DIALOGUE FINAL : Confrontation tragique des deux positions inconciliables
 */
export const parolesSync: LigneSynchronisee[] = [
  // Introduction instrumentale
  { temps: 0, texte: "" },
  
  // PREMIER ARGUMENT - LUI (Couplet 1)
  { temps: 12.0, texte: "Là-bas", locuteur: 'LUI' },
  { temps: 14.5, texte: "Tout est neuf et tout est sauvage", locuteur: 'LUI' },
  { temps: 18.0, texte: "Libre continent sans grillage", locuteur: 'LUI' },
  { temps: 21.5, texte: "Ici, nos rêves sont étroits", locuteur: 'LUI' },
  { temps: 25.0, texte: "C'est pour ça que j'irai là-bas", locuteur: 'LUI' },
  
  // DEUXIÈME ARGUMENT - LUI (Couplet 2)
  { temps: 29.0, texte: "Là-bas", locuteur: 'LUI' },
  { temps: 31.5, texte: "Faut du cœur et faut du courage", locuteur: 'LUI' },
  { temps: 35.0, texte: "Mais tout est possible à mon âge", locuteur: 'LUI' },
  { temps: 38.5, texte: "Si tu as la force et la foi", locuteur: 'LUI' },
  { temps: 42.0, texte: "L'or est à portée de tes doigts", locuteur: 'LUI' },
  { temps: 45.5, texte: "C'est pour ça que j'irai là-bas", locuteur: 'LUI' },
  
  // PREMIÈRE OBJECTION - ELLE (Le champ sémantique de l'expérience limite)
  { temps: 49.5, texte: "N'y va pas", locuteur: 'ELLE' },
  { temps: 52.0, texte: "Y'a des tempêtes et des naufrages", locuteur: 'ELLE' },
  { temps: 55.5, texte: "Le feu, les diables et les mirages", locuteur: 'ELLE' },
  { temps: 59.0, texte: "Je te sais si fragile parfois", locuteur: 'ELLE' },
  { temps: 62.5, texte: "Reste au creux de moi", locuteur: 'ELLE' },
  
  // ARGUMENT AFFECTIF - ELLE
  { temps: 66.0, texte: "On a tant d'amour à faire", locuteur: 'ELLE' },
  { temps: 69.5, texte: "Tant de bonheur à venir", locuteur: 'ELLE' },
  { temps: 73.0, texte: "Je te veux mari et père", locuteur: 'ELLE' },
  { temps: 76.5, texte: "Et toi, tu rêves de partir", locuteur: 'ELLE' },
  
  // TROISIÈME ARGUMENT - LUI (Le déterminisme social)
  { temps: 80.5, texte: "Ici, tout est joué d'avance", locuteur: 'LUI' },
  { temps: 84.0, texte: "Et l'on n'y peut rien changer", locuteur: 'LUI' },
  { temps: 87.5, texte: "Tout dépend de ta naissance", locuteur: 'LUI' },
  { temps: 91.0, texte: "Et moi je ne suis pas bien né", locuteur: 'LUI' },
  
  // DEUXIÈME OBJECTION - ELLE
  { temps: 95.0, texte: "Là-bas", locuteur: 'ELLE' },
  { temps: 97.5, texte: "Loin de nos vies, de nos villages", locuteur: 'ELLE' },
  { temps: 101.0, texte: "J'oublierai ta voix, ton visage", locuteur: 'ELLE' },
  { temps: 104.5, texte: "J'ai beau te serrer dans mes bras", locuteur: 'ELLE' },
  { temps: 108.0, texte: "Tu m'échappes déjà, là-bas", locuteur: 'ELLE' },
  
  // DIALOGUE ALTERNÉ (Confrontation finale)
  { temps: 112.0, texte: "J'aurai ma chance, j'aurai mes droits", locuteur: 'LUI' },
  { temps: 115.5, texte: "N'y va pas", locuteur: 'ELLE' },
  { temps: 117.0, texte: "Et la fierté qu'ici je n'ai pas", locuteur: 'LUI' },
  { temps: 120.5, texte: "Là-bas", locuteur: 'LUI' },
  { temps: 122.0, texte: "Tout ce que tu mérites est à toi", locuteur: 'LUI' },
  { temps: 125.5, texte: "N'y va pas", locuteur: 'ELLE' },
  { temps: 127.0, texte: "Ici, les autres imposent leur loi", locuteur: 'LUI' },
  { temps: 130.5, texte: "Là-bas", locuteur: 'LUI' },
  
  // CLIMAX TRAGIQUE
  { temps: 132.0, texte: "Je te perdrai peut-être là-bas", locuteur: 'LUI' },
  { temps: 135.5, texte: "N'y va pas", locuteur: 'ELLE' },
  { temps: 137.0, texte: "Mais je me perds si je reste là", locuteur: 'LUI' },
  { temps: 140.5, texte: "Là-bas", locuteur: 'LUI' },
  { temps: 142.0, texte: "La vie ne m'a pas laissé le choix", locuteur: 'LUI' },
  { temps: 145.5, texte: "N'y va pas", locuteur: 'ELLE' },
  { temps: 147.0, texte: "Toi et moi, ce sera là-bas ou pas", locuteur: 'LUI' },
  
  // CODA (Répétition obsessionnelle)
  { temps: 150.5, texte: "Là-bas", locuteur: 'ENSEMBLE' },
  { temps: 152.5, texte: "Tout est neuf et tout est sauvage", locuteur: 'ENSEMBLE' },
  
  // Fin
  { temps: 157.0, texte: "" },
];

/**
 * VOCABULAIRE CLÉ - INITIATION AU LANGAGE SYMBOLIQUE MÉTAPHYSIQUE
 * 
 * Ce vocabulaire initie les lycéens au LANGAGE SYMBOLIQUE utilisé dans les grandes
 * œuvres philosophiques, poétiques et religieuses pour exprimer les expériences limites
 * de la conscience humaine.
 */
export const vocabulaireCle = [
  {
    mot: "là-bas",
    categorie: "adverbe",
    definition: "SYMBOLE : Espace de transformation existentielle, décentrement ontologique, non géographique",
    exemple: "'Là-bas' représente la possibilité d'échapper au déterminisme social par une transformation intérieure",
    niveau: "B2",
    notes: "LANGAGE SYMBOLIQUE : Répété 15 fois dans la chanson. N'est jamais défini géographiquement. Fonctionne comme pure projection ontologique. Comparable au 'royaume' dans le langage biblique, au monde des Idées chez Platon, ou à l'Übermensch nietzschéen.",
    contextePedagogique: "Initiation à la pensée symbolique : un lieu peut représenter un état de conscience."
  },
  {
    mot: "neuf",
    categorie: "adjectif",
    definition: "SYMBOLE : Ce qui n'a pas été interprété par l'habitude, état de conscience dé-familiarisé",
    exemple: "Un monde neuf est un monde qui ne va plus de soi, où l'on voit les choses comme pour la première fois",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE : Renvoie à l'expérience de dé-familiarisation (Heidegger : Unheimlichkeit). Le monde familier perd son évidence. Comparable à l'étonnement philosophique des Grecs (thaumazein), au regard innocent de l'enfant.",
    contexteBiblique: "Apocalypse 21:5 : 'Voici, je fais toutes choses nouvelles'",
    contextePedagogique: "Initiation à la phénoménologie : voir au-delà des apparences habituelles."
  },
  {
    mot: "sauvage",
    categorie: "adjectif",
    definition: "SYMBOLE : Non domestiqué par les normes sociales, pré-culturel, antérieur aux conventions",
    exemple: "Un espace sauvage est un espace non encore structuré par les conventions humaines",
    niveau: "B2",
    notes: "LANGAGE SYMBOLIQUE : Dimension rousseauiste de l'état de nature comme possibilité d'authenticité. Le 'sauvage' représente ce qui échappe au contrôle social, ce qui est brut, originel.",
    contexteLitteraire: "Rousseau : le 'bon sauvage'. Thoreau : Walden, retour à la nature",
    contextePedagogique: "Nature vs culture : ce qui existe avant les règles sociales."
  },
  {
    mot: "grillage",
    categorie: "nom masculin",
    definition: "SYMBOLE : Structures mentales et sociales qui emprisonnent, cadres symboliques limitants",
    exemple: "Les grillages sont d'abord intérieurs : nos propres limitations mentales, nos peurs, nos conformismes",
    niveau: "B2",
    notes: "LANGAGE SYMBOLIQUE : Ne désigne PAS des frontières physiques. Renvoie aux cadres symboliques qui structurent notre pensée (Bourdieu : habitus, reproduction sociale). Comparable à la caverne platonicienne (les chaînes), à la 'cage de fer' de Max Weber.",
    contexteLitteraire: "Platon : la Caverne et ses chaînes. Rousseau : 'L'homme est né libre, et partout il est dans les fers'",
    contextePhilosophique: "Bourdieu : l'habitus comme intériorisation des contraintes sociales",
    contextePedagogique: "Métaphore de l'enfermement mental, pas seulement physique."
  },
  {
    mot: "courage",
    categorie: "nom masculin",
    definition: "SYMBOLE : Force spirituelle nécessaire pour affronter l'angoisse de la liberté et du changement radical",
    exemple: "Le courage métaphysique : accepter la perte des repères, supporter l'inconnu",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE : Pas le courage romantique de l'aventure physique, mais le courage ontologique - la force d'âme nécessaire pour sortir du confort du familier. Comparable au courage du prisonnier platonicien qui sort de la Caverne malgré la douleur.",
    contexteBiblique: "Josué 1:9 : 'Fortifie-toi et prends courage'",
    contextePhilosophique: "Platon : sortir de la Caverne nécessite du courage. Le stoïcisme : force d'âme",
    contextePedagogique: "Courage moral/spirituel vs courage physique."
  },
  {
    mot: "foi",
    categorie: "nom féminin",
    definition: "SYMBOLE : Confiance en sa capacité à se transformer malgré l'absence de garanties",
    exemple: "Avoir foi en soi-même pour dépasser les déterminismes",
    niveau: "B2",
    notes: "LANGAGE SYMBOLIQUE : Foi existentielle, pas religieuse. Croire en sa puissance d'agir (conatus spinoziste). Foi = confiance sans preuve, sans garantie de succès.",
    contextePhilosophique: "Spinoza : le conatus, effort pour persévérer dans son être",
    contextePedagogique: "Foi comme confiance radicale en soi, pas seulement foi religieuse."
  },
  {
    mot: "tempêtes",
    categorie: "nom féminin pluriel",
    definition: "SYMBOLE : Bouleversements ontologiques violents qui détruisent tous les repères familiers",
    exemple: "Les tempêtes métaphysiques : quand tout ce qui semblait stable s'effondre et qu'on ne sait plus où l'on est",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE : Les tempêtes ne sont PAS des événements météorologiques mais l'expérience intérieure du CHAOS quand les certitudes s'effondrent. Comme Job dans la Bible face au silence incompréhensible de Dieu (Job 38), ou Nietzsche face à l'effondrement de toutes les valeurs. Premier terme du champ sémantique de l'expérience métaphysique limite.",
    contexteBiblique: "Job 38:1 : 'L'Éternel répondit à Job du sein de la tempête'. La tempête = moment où Dieu parle mais où tout devient mystère.",
    contextePhilosophique: "Heidegger : l'angoisse (Angst) comme tempête qui arrache l'être humain à la tranquillité quotidienne",
    contextePedagogique: "INITIATION : La météo comme symbole d'états intérieurs - langage des grandes œuvres."
  },
  {
    mot: "naufrages",
    categorie: "nom masculin pluriel",
    definition: "SYMBOLE : Destruction totale de l'identité, dissolution de l'être, perte de tout ancrage existentiel",
    exemple: "Le naufrage existentiel : ne plus savoir qui on est, sombrer dans le néant de soi-même",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE : Le naufrage n'est PAS l'échec social ou professionnel, mais la DISSOLUTION DE L'IDENTITÉ. Quand le voyage métaphysique 'là-bas' détruit celui qui l'entreprend. Rimbaud : 'Je est un autre' - perte de l'identité stable. Nietzsche : sa propre dissolution mentale à Turin (1889). Le risque du voyage 'là-bas' est de ne plus pouvoir revenir à soi-même.",
    contexteLitteraire: "Rimbaud, Le Bateau ivre (1871) : le bateau libéré dérive et perd son identité. Baudelaire, Le Voyage",
    contextePhilosophique: "Nietzsche : risque du nihilisme absolu quand on détruit les anciennes valeurs sans pouvoir en créer de nouvelles",
    noteHistorique: "Nietzsche s'effondre mentalement à Turin en 1889, après avoir écrit ses œuvres les plus radicales. Son 'naufrage' peut être lu comme le prix payé pour avoir été 'là-bas'.",
    contextePedagogique: "Naufrage = perte d'identité, pas seulement échec."
  },
  {
    mot: "feu",
    categorie: "nom masculin",
    definition: "SYMBOLE : Énergie AMBIVALENTE, à la fois destructrice ET purificatrice, de la transformation radicale",
    exemple: "Le feu de la métamorphose : il peut purifier l'âme OU la consumer entièrement",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE : Le feu possède une DOUBLE NATURE dans toutes les traditions spirituelles - il détruit ET purifie. Bible : buisson ardent devant Moïse (Exode 3), langues de feu de la Pentecôte. Alchimie : l'œuvre au noir. Ici, le feu représente l'INTENSITÉ INSOUTENABLE de la transformation : vous pouvez en sortir purifié OU détruit. Goldman AVERTIT : cette transformation peut vous brûler vif.",
    contexteBiblique: "Exode 3:2 : Moïse devant le buisson ardent - expérience terrifiante de la présence divine. Hébreux 12:29 : 'Notre Dieu est un feu dévorant'",
    contextePhilosophique: "Héraclite : 'Ce monde [...] était toujours et est et sera, feu toujours vivant.' Le feu = principe de transformation permanente",
    contextePedagogique: "AMBIVALENCE du symbole : le feu purifie ET détruit. Initiation à la pensée dialectique."
  },
  {
    mot: "diables",
    categorie: "nom masculin pluriel",
    definition: "SYMBOLE : Puissances destructrices INTÉRIEURES qui peuvent prendre possession de vous dans l'expérience limite",
    exemple: "Les diables : forces obscures de la psyché qui émergent quand les structures protectrices s'effondrent",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE : Les 'diables' ne sont PAS des entités surnaturelles extérieures mais les FORCES DESTRUCTRICES qui habitent la psyché humaine. Quand on quitte les structures rassurantes (famille, société, rôles), ces forces peuvent prendre le contrôle. Dostoïevski : 'Si Dieu n'existe pas, tout est permis'. Nietzsche : possession par la folie à Turin. Jung : rencontre avec l'ombre (das Schatten). Goldman AVERTIT : en quittant 'ici', vous risquez de perdre la raison.",
    contexteLitteraire: "Dostoïevski, Les Possédés (1872) : la dissolution morale quand les valeurs s'effondrent. Baudelaire, Les Fleurs du Mal : exploration des forces obscures",
    contextePhilosophique: "Nietzsche : la descente dans la folie comme risque réel du penseur radical. Jung : l'intégration de l'ombre nécessaire mais dangereuse",
    noteHistorique: "Nietzsche, Artaud : génies détruits par leurs démons intérieurs. Le risque est RÉEL.",
    contextePedagogique: "Diables = forces psychiques destructrices, pas entités extérieures."
  },
  {
    mot: "mirages",
    categorie: "nom masculin pluriel",
    definition: "SYMBOLE : Expérience métaphysique RADICALE où toutes les évidences de la vie quotidienne deviennent inconsistantes, irréelles",
    exemple: "Les mirages : moment terrifiant où l'on ne sait plus ce qui est réel, où TOUT ce qui semblait solide devient pure apparence",
    niveau: "C1",
    notes: "LANGAGE SYMBOLIQUE CRUCIAL : Le 'mirage' n'est PAS une simple 'illusion extérieure' ou 'fausse promesse'. C'est l'expérience métaphysique LIMITE où l'on arrive au point où PLUS RIEN NE VA DE SOI : Qui suis-je ? Pourquoi suis-je là ? Quel est le sens de tout cela ? Les certitudes de la vie quotidienne apparaissent soudain comme des 'mirages' sans fondement. Descartes : 'Et si TOUT était illusion ?' Camus : l'absurde. Sartre : la contingence. ATTENTION PÉDAGOGIQUE : Ce n'est PAS 'le là-bas est un mirage' (= illusion) mais 'là-bas, on découvre que TOUT était mirage' (= les évidences s'effondrent). INVERSION RADICALE.",
    contexteLitteraire: "Camus, L'Étranger (1942) : 'J'ai compris que j'avais détruit l'équilibre du jour'. Sartre, La Nausée (1938) : Roquentin face à l'existence brute qui perd tout sens",
    contextePhilosophique: "Descartes, Méditations métaphysiques (1641) : 'Et si tout ce que je crois réel n'était qu'un rêve ?' Heidegger : la déréalisation du monde familier",
    notePedagogiqueCRUCIALE: "ATTENTION : Il faut bien comprendre que 'mirages' ne signifie PAS 'le là-bas est une illusion' MAIS 'là-bas, tout devient incertain, même ce qui semblait le plus évident'. C'est l'expérience où l'on ne sait plus ce qui est réel.",
    chaineSemantique: "Ce mot doit TOUJOURS être compris en lien avec 'tempêtes/naufrages/feu/diables' = champ sémantique complet de l'EXPÉRIENCE MÉTAPHYSIQUE LIMITE",
    contextePedagogique: "INITIATION MAJEURE au langage symbolique des mystiques, philosophes, poètes."
  },
  {
    mot: "naissance",
    categorie: "nom féminin",
    definition: "Origine sociale déterminant les possibilités de vie",
    exemple: "Tout dépend de ta naissance = déterminisme social",
    niveau: "B1",
    notes: "Thème bourdieusien : reproduction sociale, capital culturel hérité. 'Je ne suis pas bien né' = absence des ressources sociales/culturelles nécessaires."
  },
  {
    mot: "fierté",
    categorie: "nom féminin",
    definition: "Dignité, estime de soi, reconnaissance sociale",
    exemple: "La fierté qu'ici je n'ai pas : absence de reconnaissance sociale",
    niveau: "B1",
    notes: "Proche d'Hegel : lutte pour la reconnaissance. Sans fierté, pas de pleine humanité."
  },
  {
    mot: "chance",
    categorie: "nom féminin",
    definition: "Possibilité d'agir, marge de manœuvre, opportunité structurelle",
    exemple: "J'aurai ma chance = j'aurai enfin les moyens d'agir",
    niveau: "A2",
    notes: "Pas la chance au sens du hasard, mais l'opportunité structurelle d'exercer sa liberté."
  },
  {
    mot: "se perdre",
    categorie: "verbe pronominal",
    definition: "Perdre son authenticité, se dissoudre dans le On heideggérien",
    exemple: "Je me perds si je reste là = perdre son être propre en acceptant le déterminisme",
    niveau: "B2",
    notes: "Concept heideggérien : la déchéance (Verfallen) dans le quotidien inauthentique. Rester = accepter de n'être personne."
  },
  {
    mot: "joué d'avance",
    categorie: "expression",
    definition: "Déterminé à l'avance, sans possibilité de choix réel",
    exemple: "Ici, tout est joué d'avance : fatalisme social total",
    niveau: "B2",
    notes: "Critique du déterminisme absolu. Goldman refuse ce fatalisme et affirme la possibilité de se transformer."
  }
];

/**
 * POINTS DE GRAMMAIRE PHILOSOPHIQUEMENT SIGNIFIANTS
 */
export const pointsGrammaire = [
  {
    point: "Futur simple de la volonté et de la projection existentielle",
    explication: "Le futur simple exprime ici non pas une prédiction mais une DÉCISION, une projection volontaire dans un avenir à construire. C'est le futur de l'engagement existentiel.",
    exemples: [
      "C'est pour ça que j'irai là-bas (décision ferme, engagement)",
      "J'aurai ma chance, j'aurai mes droits (projection volontaire)",
      "Je te perdrai peut-être là-bas (acceptation lucide du risque)",
      "Je me perds si je reste là (constat d'une nécessité existentielle)"
    ],
    usage: "Le futur simple transforme le possible en projet. Il s'oppose au conditionnel du rêve passif. Ici, le futur = acte de volonté.",
    niveau: "B2",
    contextePhilosophique: "Sartre : 'L'existence précède l'essence'. Le futur n'est pas donné mais à faire. Le projet définit l'être."
  },
  {
    point: "Impératif négatif : N'y va pas",
    explication: "L'impératif négatif exprime une injonction, un interdit. Répété 8 fois dans la chanson, il structure le dialogue comme un conflit entre liberté et attachement.",
    exemples: [
      "N'y va pas (répété 8 fois - injonction qui retient)",
      "Reste au creux de moi (impératif positif : alternative à partir)"
    ],
    usage: "L'impératif négatif crée une tension dramatique. Il incarne la voix qui empêche le départ, qui met en garde contre les dangers.",
    niveau: "B1",
    contextePhilosophique: "Cette voix peut être lue comme le On heideggérien : rester dans le confort du familier. Mais aussi comme une voix légitime d'avertissement sur les dangers réels."
  },
  {
    point: "Opposition ici / là-bas (deixis spatiale philosophique)",
    explication: "L'opposition ici/là-bas structure toute la chanson. 'Ici' = monde donné, familier, déterminé. 'Là-bas' = monde à faire, étranger, ouvert.",
    exemples: [
      "Ici, nos rêves sont étroits ≠ Là-bas, tout est possible",
      "Ici, tout est joué d'avance ≠ Là-bas, tu auras tes droits",
      "Je me perds si je reste là ≠ Je te perdrai peut-être là-bas"
    ],
    usage: "Cette opposition n'est PAS géographique mais ontologique. Ici/là-bas = authenticité/inauthenticité, déterminisme/liberté.",
    niveau: "C1",
    contextePhilosophique: "Heidegger : être-au-monde authentique vs quotidienneté. Platon : monde sensible vs monde des Idées."
  },
  {
    point: "Conditionnel du dilemme tragique",
    explication: "Le conditionnel apparaît à la fin pour exprimer le caractère inconciliable des deux positions.",
    exemples: [
      "Toi et moi, ce sera là-bas ou pas (alternative exclusive)",
      "Je te perdrai peut-être là-bas (incertitude assumée)"
    ],
    usage: "Le conditionnel souligne que le choix est impossible : on ne peut pas tout avoir. Pas de compromis possible.",
    niveau: "B2",
    contextePhilosophique: "Tragédie classique : conflit entre deux valeurs également légitimes (amour vs liberté). Le héros tragique doit choisir et en payer le prix."
  },
  {
    point: "Infinitif substantivé et nominalisation",
    explication: "Goldman utilise l'infinitif comme nom pour exprimer des concepts abstraits, des actions généralisées.",
    exemples: [
      "Partir (l'action de partir en général, le concept même de départ)",
      "Rester (l'action de rester comme choix existentiel)",
      "Rêver de partir (le désir comme objet)"
    ],
    usage: "L'infinitif permet de parler de l'action en général, hors de tout contexte particulier. Dimension philosophique : généralisation.",
    niveau: "B2"
  }
];

/**
 * CONTEXTE CULTUREL ET PHILOSOPHIQUE COMPLET
 */
export const contexteCulturel = `
# Contexte culturel et philosophique

## L'artiste et l'œuvre

**Jean-Jacques Goldman** (né en 1951) est l'un des auteurs-compositeurs-interprètes majeurs de la chanson française. "Là-bas" (1987, album *Entre gris clair et gris foncé*), interprétée en duo avec **Sirima**, est l'une de ses œuvres les plus profondes philosophiquement.

Cette chanson n'est pas une simple évocation de l'émigration géographique, mais une **réflexion métaphysique sur la liberté, le déterminisme social et le prix de l'authenticité**.

Goldman n'est pas un simple auteur de variété mais un **ARTISTE SPIRITUEL** qui pense en profondeur la condition humaine.

---

## Structure dialogique : Une psychomachie moderne

### Le dialogue comme combat intérieur

La chanson est structurée comme un **dialogue argumenté** entre deux voix :

- **LUI (Jean-Jacques Goldman)** : La voix de l'arrachement, du refus du déterminisme
- **ELLE (Sirima)** : La voix de l'ancrage, de la sécurité affective, de l'avertissement

**MAIS** : Ce dialogue n'est pas seulement interpersonnel (entre deux personnes), il est aussi **intrasubjectif** (combat intérieur d'une conscience).

Les deux voix incarnent deux forces présentes en chaque être humain :
- Le désir de sécurité (rester dans le familier)
- Le désir de liberté (s'arracher aux déterminismes)

C'est ce qu'on appelle une **psychomachie** : un combat de l'âme contre elle-même.

---

## Thématiques philosophiques

### 1. Le déterminisme social et la reproduction des inégalités (Bourdieu)

**Citation centrale** :
> "Ici, tout est joué d'avance  
> Et l'on n'y peut rien changer  
> Tout dépend de ta naissance  
> Et moi je ne suis pas bien né"

Goldman pose ici le problème du **déterminisme social** :
- Nos origines sociales déterminent-elles entièrement notre vie ?
- Peut-on échapper à la "reproduction sociale" (Pierre Bourdieu) ?
- La méritocratie est-elle une illusion ?

**Référence philosophique** : **Pierre Bourdieu**, *La Reproduction* (1970)
- L'école ne corrige pas les inégalités, elle les reproduit
- Le capital culturel hérité détermine les trajectoires
- Les "héritiers" ont un avantage structurel

Goldman **refuse** ce fatalisme : "là-bas" représente la possibilité de s'arracher à ce déterminisme.

---

### 2. "Là-bas" comme décentrement ontologique (Heidegger)

**Thèse centrale** : "Là-bas" n'est PAS un lieu géographique.

Aucune indication géographique dans toute la chanson :
- Pas de nom de pays
- Pas de description concrète
- Seulement des qualifications phénoménologiques : "neuf", "sauvage", "sans grillage"

**"Là-bas" = expérience de dé-familiarisation du monde**

**Référence philosophique** : **Martin Heidegger**, *Être et Temps* (1927)
- Le monde quotidien est "familier" : les choses vont de soi
- L'angoisse (*Angst*) brise cette familiarité
- L'étrangeté (*Unheimlichkeit*) : le monde ne va plus de soi
- L'existence authentique passe par cette dé-familiarisation

"Là-bas" = moment où le monde cesse d'être évident et devient **problématique**.

---

### 3. Le courage métaphysique : La sortie de la Caverne (Platon)

**Citation** :
> "Faut du cœur et faut du courage  
> Si tu as la force et la foi"

Le "courage" ici n'est pas le courage physique de l'aventurier, mais le **courage ontologique** : accepter la perte des repères, supporter l'angoisse de la liberté.

**Référence philosophique** : **Platon**, *La République* (Livre VII, allégorie de la Caverne)
- Les prisonniers vivent dans l'illusion (ombres projetées)
- Sortir de la Caverne = accéder à la vérité
- **MAIS** : sortir fait mal (aveuglement, désorientation)
- Le prisonnier libéré veut d'abord retourner dans la Caverne
- Il faut du COURAGE pour rester dehors

"Là-bas" = sortie de la Caverne du déterminisme social.

---

### 4. Le risque de l'expérience métaphysique limite : Le langage symbolique

**Citation centrale** :
> "N'y va pas  
> Y'a des tempêtes et des naufrages  
> Le feu, les diables et les mirages"

#### 4.1. UN CHAMP SÉMANTIQUE COHÉRENT

Ces cinq mots forment un **champ sémantique unifié** qui décrit, dans le **langage symbolique** des grandes œuvres spirituelles, les dangers de l'expérience métaphysique limite.

Goldman n'idéalise JAMAIS le départ. Il y a un danger RÉEL et TERRIBLE :

1. **Tempêtes** : Bouleversements ontologiques violents
2. **Naufrages** : Destruction totale de l'identité
3. **Feu** : Intensité transformatrice qui peut consumer
4. **Diables** : Forces psychiques destructrices intérieures
5. **Mirages** : Perte du sens du réel, déréalisation radicale

Ce ne sont PAS des métaphores décoratives. C'est le LANGAGE PRÉCIS de l'expérience existentielle limite.

#### 4.2. INITIATION AU LANGAGE SYMBOLIQUE MÉTAPHYSIQUE

**Pourquoi Goldman utilise-t-il ce langage ?**

Parce qu'il parle d'une **expérience qui échappe au langage ordinaire**.

Quand on vit une expérience métaphysique radicale (perte de tous ses repères, remise en question totale de son existence), le langage conceptuel abstrait est INSUFFISANT.

Il faut recourir aux **SYMBOLES** :
- La **tempête** (chaos intérieur)
- Le **naufrage** (dissolution de soi)
- Le **feu** (transformation brûlante)
- Les **diables** (forces obscures)
- Les **mirages** (perte du réel)

Ce langage est utilisé par :
- **La Bible** (Job dans la tempête, buisson ardent, démons)
- **Les philosophes** (Heidegger : angoisse, Nietzsche : abîme)
- **Les poètes** (Rimbaud : Bateau ivre, Baudelaire : gouffre)
- **Les mystiques** (Nuit obscure de l'âme, Jean de la Croix)

Goldman appartient à cette lignée d'artistes spirituels qui pensent en profondeur.

#### 4.3. L'EXEMPLE DE NIETZSCHE : Le naufrage réel

**Friedrich Nietzsche** (1844-1900) illustre parfaitement ce danger.

**Son parcours** :
- Philosophe génial, pense la "mort de Dieu"
- Pousse sa pensée jusqu'aux limites extrêmes
- Janvier 1889 à Turin : **effondrement mental total**
- Reste 11 ans dans la folie avant de mourir

**La leçon** : Nietzsche est allé "là-bas" (au bout de la pensée radicale) et a "fait naufrage" (perdu la raison).

Goldman CONNAÎT ce risque. Quand Sirima dit "Y'a des tempêtes et des naufrages / Le feu, les diables et les mirages", elle parle du destin de Nietzsche.

Le voyage métaphysique peut DÉTRUIRE celui qui l'entreprend.

#### 4.4. LES "MIRAGES" : Inversion radicale du réel

**ATTENTION PÉDAGOGIQUE CRUCIALE** :

Beaucoup interprètent mal le mot "mirages" en pensant : "le là-bas est une illusion".

**CE N'EST PAS CELA**.

Les "mirages" désignent l'expérience métaphysique où :
- **Ce qui semblait réel devient irréel**
- **Les évidences quotidiennes perdent toute solidité**
- **On ne sait plus ce qui est vrai**

Camus, *L'Étranger* :
> "J'ai compris que j'avais détruit l'équilibre du jour"

Sartre, *La Nausée* :
> Roquentin découvre que tout est contingent, que rien n'est nécessaire

Descartes, *Méditations* :
> "Et si tout ce que je crois était faux ?"

Les "mirages" = moment où **tout devient mystère insondable**, où plus rien ne va de soi, où les certitudes de la vie ordinaire apparaissent comme de pures conventions arbitraires.

**Le paradoxe** : Pour accéder à la liberté authentique "là-bas", il faut accepter que tout devienne incertain, même son propre Moi.

#### 4.5. RÉFÉRENCE PHILOSOPHIQUE : Nietzsche et l'abîme

**Friedrich Nietzsche**, *Par-delà bien et mal* (1886), § 146 :

> "Celui qui combat les monstres doit prendre garde à ne pas devenir monstre lui-même.  
> Et si tu regardes longtemps dans l'abîme, l'abîme finit par regarder en toi."

**Interprétation** :
- Le "là-bas" = l'abîme
- Regarder l'abîme = remettre en question toutes les évidences
- Risque : **être regardé par l'abîme** = être envahi par le néant, perdre la raison

Goldman reprend EXACTEMENT cette idée nietzschéenne.

#### 4.6. POURQUOI ELLE DIT "N'Y VA PAS"

La voix féminine (Sirima) n'est PAS simplement "possessive" ou "jalouse".

Elle exprime une **peur légitime et profonde** :
- Peur qu'il perde la raison (diables)
- Peur qu'il se dissolve (naufrages)
- Peur qu'il soit brûlé (feu)
- Peur qu'il ne sache plus ce qui est réel (mirages)
- Peur qu'il soit détruit par la transformation (tempêtes)

**Elle a raison d'avoir peur.**

Le drame est que LUI ne peut PAS rester ("Je me perds si je reste là").

C'est un **dilemme tragique** sans solution :
- Rester = se perdre dans le déterminisme social
- Partir = risquer de se perdre dans la folie

**"Toi et moi, ce sera là-bas ou pas"** = Il n'y a pas de compromis possible.

---

### 5. Le dilemme tragique : amour vs liberté

**Citation finale** :
> "Je te perdrai peut-être là-bas  
> Mais je me perds si je reste là  
> La vie ne m'a pas laissé le choix  
> Toi et moi, ce sera là-bas ou pas"

**Structure tragique** :
- Deux valeurs également légitimes s'opposent
- Amour (rester) vs Liberté (partir)
- Aucun compromis possible
- Le choix est **déchirant**

Référence : **Tragédie grecque** (Sophocle, *Antigone*)
- Conflit entre deux lois également sacrées
- Pas de "bonne" solution
- Le héros tragique doit choisir et en payer le prix

"Je me perds si je reste là" : rester = se perdre soi-même en acceptant le déterminisme.

---

### 6. L'étonnement métaphysique : "Pourquoi y a-t-il quelque chose plutôt que rien ?"

**Citation** :
> "Tout est neuf et tout est sauvage"

Cette phrase évoque **l'étonnement philosophique** : le moment où le monde cesse d'être évident.

**Référence** : **Gottfried Wilhelm Leibniz**, *Principes de la nature et de la grâce* (1714)
- Question métaphysique fondamentale : "Pourquoi y a-t-il quelque chose plutôt que rien ?"
- Le monde pourrait ne pas être
- Son existence n'est pas nécessaire mais contingente

"Neuf et sauvage" = moment où l'existence elle-même devient une énigme.

---

## Convergences avec d'autres chansons de Goldman

Goldman développe dans plusieurs chansons une **philosophie implicite de la liberté conquise** :

### "C'est ta chance" (1994)
> "Faudra remplacer tous les pas de chance par de l'intelligence  
> Ta puissance naîtra là"

→ La liberté n'est pas donnée, elle se construit par l'effort intellectuel.

### "Envole-moi" (1984)
> "À coups de livres  
> Je franchirai tous ces murs"

→ La culture comme moyen d'émancipation.

### "Il suffira d'un signe" (avec Céline Dion, 1997)
> "Déchirées nos guenilles de vauriens"

→ Refus de l'identité assignée, transformation de soi.

**Cohérence philosophique** : Chez Goldman, la liberté est toujours :
- **Conquise** (jamais donnée)
- **Intérieure** (transformation de soi)
- **Coûteuse** (renoncements nécessaires)
- **Incertaine** (pas de garantie)

---

## Dimension poétique et musicale

### La répétition obsessionnelle

"Là-bas" est répété **15 fois** dans la chanson.
"N'y va pas" est répété **8 fois**.

Cette répétition crée :
- Un effet hypnotique
- Une incantation
- La représentation du conflit intérieur (ressassement)

### Le dialogue musical

Les deux voix (Goldman / Sirima) ne chantent JAMAIS ensemble sauf à la toute fin.
→ Représentation musicale de l'incommunicabilité

La mélodie est simple, presque minimaliste.
→ Toute l'attention est sur le TEXTE et son sens philosophique.

---

## Valeur pédagogique : Initiation au langage symbolique

Cette chanson est une **INITIATION AU LANGAGE SYMBOLIQUE** des grandes œuvres :

1. **Apprendre** que les mots ont plusieurs niveaux de sens
2. **Comprendre** que la météo (tempête) peut symboliser des états intérieurs
3. **Saisir** que les "diables" ne sont pas des entités extérieures mais des forces psychiques
4. **Découvrir** que le "feu" peut être ambivalent (destruction/purification)
5. **Réaliser** que les "mirages" désignent la perte du sens du réel

**Cette pédagogie est essentielle** pour comprendre :
- La Bible (langage symbolique constant)
- La philosophie (Heidegger, Nietzsche)
- La poésie (Rimbaud, Baudelaire)
- Le théâtre (Shakespeare : la folie d'Hamlet)
- Les romans (Camus : *L'Étranger*)

---

## Approche CECRL

- **B1** : Comprendre le thème général (départ, conflit)
- **B2** : Interpréter le sens symbolique (là-bas ≠ lieu géographique)
- **C1** : Analyser comme allégorie philosophique de la liberté et initiation au langage symbolique métaphysique

---

## Conclusion : Une œuvre philosophique de haut niveau

"Là-bas" n'est pas une simple chanson de variété.
C'est une **œuvre philosophique** qui interroge :
- La liberté et ses conditions
- Le déterminisme et ses limites
- L'authenticité et son prix
- Le courage de se transformer
- Les dangers réels de la quête métaphysique

Goldman se révèle ici non comme un simple auteur de chansons, mais comme un **penseur de la condition humaine** et un **artiste spirituel de haut niveau**.

Cette chanson mérite d'être étudiée au même titre qu'un texte philosophique ou une grande œuvre poétique.
Elle offre aux lycéens une porte d'entrée vers les grandes questions existentielles ET une initiation au langage symbolique des grandes œuvres de l'esprit.
`;

/**
 * DONNÉES POUR POCKETBASE
 * Objet complet pour insertion dans la base de données
 */
export const chansonData: Omit<Chanson, 'id' | 'created' | 'updated'> = {
  titre: "Là-bas",
  artiste: "Jean-Jacques Goldman (duo avec Sirima)",
  album: "Entre gris clair et gris foncé",
  annee: 1987,
  duree: 280, // 4:40 en secondes
  genre: ["pop", "chanson française", "chanson engagée", "chanson philosophique"],
  niveau: "B2",
  type_texte: "argumentatif",
  themes: [
    "déterminisme social",
    "liberté conquise",
    "émigration existentielle",
    "courage métaphysique",
    "dilemme tragique (amour vs liberté)",
    "transformation intérieure",
    "authenticité",
    "reproduction sociale",
    "expérience métaphysique limite",
    "langage symbolique"
  ],
  paroles: parolesSync
    .filter(l => l.texte !== "")
    .map(l => l.texte)
    .join('\n'),
  paroles_synchronisees: parolesSync.map((l, i) => ({ 
    id: `lb-ligne-${i + 1}`, 
    numero: i + 1, 
    texte: l.texte, 
    timestamp: l.temps,
    locuteur: l.locuteur 
  })),
  audio_url: "/audio/chansons/jean-jacques-goldman/la-bas.mp3",
  cover_url: "/images/chansons/jean-jacques-goldman/entre-gris-clair-et-gris-fonce.jpg",
  video_url: undefined,
  vocabulaire_cle: Object.fromEntries(
    vocabulaireCle.map(v => [
      v.mot, 
      `${v.definition}. Exemple: "${v.exemple}". ${v.notes ? 'Notes: ' + v.notes : ''}`
    ])
  ),
  points_grammaire: pointsGrammaire.map(p => 
    `${p.point}: ${p.explication}. ${p.contextePhilosophique ? 'Contexte philosophique: ' + p.contextePhilosophique : ''}`
  ),
  contexte_culturel: contexteCulturel,
  actif: true,
};

export default chansonData;