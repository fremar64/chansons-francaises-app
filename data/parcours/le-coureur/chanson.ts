/**
 * Données de la chanson "Le coureur" - Jean-Jacques Goldman (1985)
 * 
 * Niveau: B1-B2
 * Thème: Déracinement, mondialisation, perte d'identité
 * Type de texte: Récit autobiographique / narratif
 * 
 * Compétences principales:
 * - L'imparfait vs passé composé
 * - Vocabulaire de la nature, modernité, déshumanisation
 * - Voix passive et réification
 * - Expression de l'ambivalence morale
 */

import type { Chanson } from '@/services/pocketbase';

// Type local pour les paroles synchronisées
interface LigneSynchronisee {
  temps: number;
  texte: string;
}

// Paroles synchronisées avec timestamps (en secondes)
export const parolesSync: LigneSynchronisee[] = [
  // Introduction instrumentale
  { temps: 0, texte: "" },
  
  // Couplet 1 - Vie d'origine
  { temps: 15.0, texte: "Je courais sur la plage abritée des alizés" },
  { temps: 20.5, texte: "Une course avec les vagues, juste un vieux compte à régler" },
  { temps: 26.0, texte: "Pieds nus comme couraient mes ancêtres" },
  { temps: 30.5, texte: "Oh j'ai bien vu derrière ses lunettes" },
  { temps: 35.0, texte: "Un type avec un chronomètre" },
  
  // Couplet 2 - Transaction
  { temps: 42.0, texte: "Je suis rentré au soir quand les vagues ont renoncé" },
  { temps: 47.5, texte: "Il était déjà tard mais les parents m'attendaient" },
  { temps: 53.0, texte: "Y avait l'homme bizarre à la table" },
  { temps: 57.5, texte: "Ma mère une larme, un murmure" },
  { temps: 61.0, texte: "Des dollars et leur signature" },
  
  // Couplet 3 - Transplantation
  { temps: 68.0, texte: "J'ai pris le grand avion blanc du lundi" },
  { temps: 73.5, texte: "Qu'on regardait se perdre à l'infini" },
  { temps: 79.0, texte: "J'suis arrivé dans le froid des villes" },
  { temps: 83.5, texte: "Chez les touristes et les automobiles" },
  { temps: 88.0, texte: "Loin de mon ancienne vie" },
  
  // Couplet 4 - Déshumanisation
  { temps: 95.0, texte: "On m'a touché, mesuré comme on fait d'un cheval" },
  { temps: 100.5, texte: "J'ai couru sur un tapis, pissé dans un bocal" },
  { temps: 106.0, texte: "Soufflé dans un masque de toutes mes forces, accéléré" },
  { temps: 112.5, texte: "Plein d'électrodes" },
  { temps: 116.0, texte: "Pour aller jusqu'où j'avais trop mal" },
  
  // Couplet 5 - Transformation
  { temps: 123.0, texte: "On m'a mis un numéro sur le dos" },
  { temps: 128.5, texte: "Y avait des gens qui criaient, des drapeaux" },
  { temps: 134.0, texte: "On courait toujours en rond" },
  { temps: 138.5, texte: "Des clous aux deux pieds pour écorcher la terre" },
  { temps: 143.0, texte: "Je la caressais naguère" },
  
  // Couplet 6 - Apprentissage
  { temps: 150.0, texte: "J'ai appris à perdre, à gagner sur les autres et le temps" },
  { temps: 155.5, texte: "À coups de revolver, de course en entraînement" },
  { temps: 161.0, texte: "Les caresses étranges de la foule" },
  { temps: 165.5, texte: "Les podiums et les coups de coude" },
  { temps: 170.0, texte: "Les passions, le monde et l'argent" },
  
  // Refrain final - Bilan
  { temps: 178.0, texte: "Moi je courais sur ma plage abritée des alizés" },
  { temps: 183.5, texte: "Une course avec les vagues, juste un vieux compte à régler" },
  { temps: 189.0, texte: "Puis le hasard a croisé ma vie" },
  { temps: 193.5, texte: "J'suis étranger partout aujourd'hui" },
  { temps: 198.0, texte: "Était-ce un mal, un bien" },
  { temps: 202.0, texte: "C'est ainsi" },
  
  // Fin
  { temps: 210.0, texte: "" },
];

// Vocabulaire clé avec définitions et exemples
export const vocabulaireCle = [
  {
    mot: "alizés",
    categorie: "nom",
    definition: "Vents réguliers soufflant des régions tropicales vers l'équateur",
    exemple: "Je courais sur la plage abritée des alizés",
    niveau: "B1",
    notes: "Évoque le climat tropical, l'Afrique ou les Caraïbes"
  },
  {
    mot: "chronomètre",
    categorie: "nom",
    definition: "Instrument de mesure du temps très précis, utilisé en sport",
    exemple: "Un type avec un chronomètre",
    niveau: "A2",
    notes: "Symbole de la modernité qui mesure, quantifie"
  },
  {
    mot: "ancêtres",
    categorie: "nom",
    definition: "Personnes dont on descend, prédécesseurs familiaux ou culturels",
    exemple: "Pieds nus comme couraient mes ancêtres",
    niveau: "A2",
    notes: "Représente la continuité culturelle, l'identité traditionnelle"
  },
  {
    mot: "caresser",
    categorie: "verbe",
    definition: "Toucher doucement avec tendresse",
    exemple: "Je la caressais naguère (la terre)",
    niveau: "A2",
    notes: "Métaphore centrale : rapport harmonieux à la nature"
  },
  {
    mot: "écorcher",
    categorie: "verbe",
    definition: "Blesser en arrachant la peau, abîmer superficiellement",
    exemple: "Des clous aux pieds pour écorcher la terre",
    niveau: "B1",
    notes: "Métaphore centrale : rapport violent à la nature"
  },
  {
    mot: "naguère",
    categorie: "adverbe",
    definition: "Autrefois, il y a peu de temps (registre soutenu)",
    exemple: "Je la caressais naguère",
    niveau: "B2",
    notes: "Adverbe littéraire qui marque la distance temporelle"
  },
  {
    mot: "électrodes",
    categorie: "nom",
    definition: "Conducteurs électriques utilisés pour mesurer l'activité physiologique",
    exemple: "Plein d'électrodes",
    niveau: "B1",
    notes: "Symbole de la déshumanisation médicale/scientifique"
  },
  {
    mot: "bocal",
    categorie: "nom",
    definition: "Récipient en verre à large ouverture",
    exemple: "Pissé dans un bocal",
    niveau: "A2",
    notes: "Évoque les tests médicaux, la réduction du corps à un objet d'analyse"
  },
  {
    mot: "étranger",
    categorie: "nom/adjectif",
    definition: "Qui appartient à un autre pays, qui n'est pas chez soi",
    exemple: "J'suis étranger partout aujourd'hui",
    niveau: "A2",
    notes: "Concept clé : double aliénation, ni ici ni là-bas"
  },
  {
    mot: "hasard",
    categorie: "nom",
    definition: "Concours de circonstances imprévisibles",
    exemple: "Le hasard a croisé ma vie",
    niveau: "A2",
    notes: "Thème goldmanien récurrent : la contingence du destin"
  }
];

// Données de la chanson pour PocketBase (compatible avec le type Chanson)
export const chansonData: Omit<Chanson, 'id' | 'created' | 'updated'> = {
  titre: 'Le coureur',
  artiste: 'Jean-Jacques Goldman',
  album: 'Non homologué',
  annee: 1985,
  duree: 270, // 4:30 en secondes
  genre: ['variété française', 'chanson à texte', 'chanson sociale'],
  niveau: 'B2',
  type_texte: 'narratif',
  themes: ['déracinement', 'mondialisation', 'identité', 'post-colonialisme', 'ambivalence'],
  paroles: parolesSync.map(l => l.texte).filter(Boolean).join('\n'),
  paroles_synchronisees: parolesSync.map((l, i) => ({ 
    id: `lcr-ligne-${i + 1}`, 
    numero: i + 1, 
    texte: l.texte, 
    timestamp: l.temps 
  })),
  audio_url: "/Répertoire des chansons/Jean-Jacques Goldman - Le coureur.mp3",
  cover_url: undefined,
  video_url: undefined,
  vocabulaire_cle: Object.fromEntries(
    vocabulaireCle.map(v => [v.mot, `${v.definition}. Ex: "${v.exemple}"`])
  ),
  points_grammaire: [
    "Imparfait : description du passé habituel (vie d'origine)",
    "Passé composé : événements ponctuels (découverte, rupture)",
    "Voix passive : déshumanisation (être mesuré comme un objet)",
    "Négation : structures négatives pour nuancer"
  ],
  contexte_culturel: `Récit d'un jeune coureur africain recruté par l'Occident. 
7 étapes chronologiques : vie d'origine, découverte, transaction, transplantation, 
déshumanisation, transformation, bilan ambivalent. 
Question centrale : la mondialisation est-elle émancipation ou aliénation ?
Contexte post-colonial : recrutement des talents du Sud par le Nord.
Métaphore centrale : caresser vs écorcher la terre.`,
  actif: true,
};

// 7 étapes chronologiques du récit
export const etapesRecit = [
  {
    numero: 1,
    titre: "Vie d'origine",
    description: "Plage tropicale, alizés, course libre pieds nus",
    versets: ["Je courais sur la plage abritée des alizés", "Pieds nus comme couraient mes ancêtres"],
    themes: ["Nature", "Authenticité", "Continuité culturelle"]
  },
  {
    numero: 2,
    titre: "Découverte",
    description: "Le recruteur occidental avec son chronomètre",
    versets: ["Oh j'ai bien vu derrière ses lunettes", "Un type avec un chronomètre"],
    themes: ["Modernité", "Mesure", "Regard étranger"]
  },
  {
    numero: 3,
    titre: "Transaction",
    description: "Négociation avec les parents, argent contre signature",
    versets: ["Ma mère une larme, un murmure", "Des dollars et leur signature"],
    themes: ["Marchandisation", "Déchirement familial", "Post-colonialisme"]
  },
  {
    numero: 4,
    titre: "Transplantation",
    description: "Voyage en avion, arrivée dans le froid occidental",
    versets: ["J'ai pris le grand avion blanc du lundi", "J'suis arrivé dans le froid des villes"],
    themes: ["Déracinement", "Choc culturel", "Rupture"]
  },
  {
    numero: 5,
    titre: "Déshumanisation",
    description: "Tests médicaux, corps traité comme objet",
    versets: ["On m'a touché, mesuré comme on fait d'un cheval", "Plein d'électrodes"],
    themes: ["Réification", "Corps-machine", "Science"]
  },
  {
    numero: 6,
    titre: "Transformation",
    description: "Numéro sur le dos, compétition, violence",
    versets: ["On m'a mis un numéro sur le dos", "Des clous aux pieds pour écorcher la terre"],
    themes: ["Anonymisation", "Violence", "Aliénation"]
  },
  {
    numero: 7,
    titre: "Bilan ambivalent",
    description: "Ni chez lui ni ailleurs, question sans réponse",
    versets: ["J'suis étranger partout aujourd'hui", "Était-ce un mal, un bien / C'est ainsi"],
    themes: ["Double aliénation", "Ambivalence", "Contingence"]
  }
];

// Oppositions structurantes
export const oppositions = [
  { avant: "Plage, alizés, nature", apres: "Villes froides, béton", theme: "Lieu" },
  { avant: "Caresser la terre (tendresse)", apres: "Écorcher la terre (violence)", theme: "Rapport à la terre" },
  { avant: "Pieds nus (contact naturel)", apres: "Clous (artefact technologique)", theme: "Pieds" },
  { avant: "Vagues (nature)", apres: "Autres coureurs (humains)", theme: "Adversaire" },
  { avant: "Vieux compte à régler (intime)", apres: "Perdre, gagner (externe)", theme: "Motivation" },
  { avant: "Mes ancêtres (continuité)", apres: "Un numéro (anonymat)", theme: "Identité" },
  { avant: "Liberté (plage infinie)", apres: "Enclos (toujours en rond)", theme: "Espace" },
  { avant: "Gratuité", apres: "Dollars, argent", theme: "Économie" },
  { avant: "Solitude contemplative", apres: "Foule, cris, drapeaux", theme: "Public" },
  { avant: "Humain (ancêtres)", apres: "Animal (comme un cheval)", theme: "Corporalité" },
  { avant: "Durée (imparfait)", apres: "Ruptures (passé composé)", theme: "Temporalité" },
  { avant: "Chez soi", apres: "Étranger partout", theme: "Appartenance" }
];

export default {
  parolesSync,
  vocabulaireCle,
  chansonData,
  etapesRecit,
  oppositions
};
