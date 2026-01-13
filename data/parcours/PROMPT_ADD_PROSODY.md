# 🎯 PROMPT GITHUB COPILOT - AJOUT ÉCRAN PROSODIQUE

**Date** : 2026-01-13  
**Objectif** : Ajouter l'écran prosodique aux 10 séances déjà créées ("Né en 17" + "Là-bas")

---

## 📋 CONTEXTE

Les parcours "Né en 17 à Leidenstadt" et "Là-bas" ont été créés SANS écran prosodique.
Il faut maintenant ajouter cet écran à chaque séance (10 séances au total).

**Écrans à ajouter** : 10 (1 par séance)

---

## 📁 FICHIERS À MODIFIER

### Parcours "Né en 17 à Leidenstadt"

1. `data/parcours/ne-en-17/seance-1-exemple-migre.ts`
2. `data/parcours/ne-en-17/seance-2-vocabulaire-migre.ts`
3. `data/parcours/ne-en-17/seance-3-grammaire-migre.ts`
4. `data/parcours/ne-en-17/seance-4-debat-migre.ts`
5. `data/parcours/ne-en-17/seance-5-production-migre.ts`

### Parcours "Là-bas"

6. `data/parcours/la-bas/seance-1-liberte.ts`
7. `data/parcours/la-bas/seance-2-vocabulaire.ts`
8. `data/parcours/la-bas/seance-3-futur.ts`
9. `data/parcours/la-bas/seance-4-dilemme.ts`
10. `data/parcours/la-bas/seance-5-lettre.ts`

---

## 🎯 MODÈLE D'ÉCRAN PROSODIQUE

### Exemple de référence ("C'est ta chance")

```typescript
const ecran1bis: EcranCeredis = {
  id: 'ctachance-s1-e1bis',
  numero: 2, // TOUJOURS numéro 2 (après l'introduction)
  titre: 'Analyse prosodique et stylistique',
  type: 'introduction',
  consigne: 'Découvrez la forme poétique de la chanson',
  dureeEstimee: 6, // 5-7 minutes selon la complexité
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE DE LA CHANSON "[TITRE]"**
    
    **ORGANISATION** :
    - X couplets (strophes narratives)
    - X refrains
    - Structure : Couplet 1 → Refrain → Couplet 2 → ...
    
    **VERSIFICATION** :
    - Vers de longueur variable/fixe (X-Y syllabes)
    - Métrique stricte/libre
    - Enjambements : [exemples]
    
    **RIMES** :
    - Rimes [riches/pauvres/suffisantes]
    - Schéma [AABB/ABAB/ABBA/...]
    - Exemples : [liste]
    
    **EFFETS STYLISTIQUES** :
    
    1. **[Effet 1]** : [Description]
       → [Interprétation]
    
    2. **[Effet 2]** : [Description]
       → [Interprétation]
    
    [...]
    
    **TON** :
    - [Description du ton]
    - [Effet sur le message]
    
    [Conclusion sur la cohérence forme/fond]`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1', // Adapter selon la séance
    scoreMax: 0
  })
};
```

---

## 🎵 PAROLES DES CHANSONS

### "Né en 17 à Leidenstadt"

```
Être né quelque part
Être né quelque part, pour celui qui est né
C'est toujours un hasard
Nom'Nom pas de peine au cœur
Pour les gens d'ici ou d'ailleurs

Être né quelque part
Être né quelque part, c'est toujours un hasard
Et que le nord ou le sud
Que le soleil ou la pluie
C'est pas grand-chose après tout

Si j'étais né en 17 à Leidenstadt
Sur les ruines d'un champ de bataille
Aurais-je été meilleur ou pire que ces gens
Si le ciel était tombé sur ma famille
Que serais-je devenu ?
Aurais-je été résistant ou bien lâche ou collaborateur ?
Aurais-je été de ces pieds-noirs
Qui regar/Voient fixement un pays perdu ?
Difficile de répondre et je ne comprends
Ni les femmes battues ni ceux qui tendent la main
Et je ne sais pas pourquoi
Ils sont leurs dieux et leurs lois
Moi, je pense à moi, à ma peau

Être né quelque part
Être né quelque part
Pour celui qui est né
C'est toujours un hasard

[Répétition avec variations]
```

### "Là-bas"

```
Là-bas 
Tout est neuf et tout est sauvage 
Libre continent sans grillage 
Ici, nos rêves sont étroits 
C'est pour ça que j'irais là-bas

Là-bas 
Faut du cœur et faut du courage 
Mais tout est possible à mon âge 
Si tu as la force et la foi 
L'or est à portée de tes doigts 
C'est pour ça que j'irais là-bas

N'y va pas 
Y'a des tempêtes et des naufrages 
Le feu, les diables et les mirages 
Je te sais si fragile parfois 
Reste au creux de moi

[Dialogue alternant "Là-bas" / "N'y va pas"]

[Répétitions et variations]
```

---

## 📐 INSTRUCTIONS PRÉCISES PAR CHANSON

### "NÉ EN 17 À LEIDENSTADT"

**Caractéristiques prosodiques à analyser** :

#### Structure
- Couplets alternant narration et questionnement
- Refrain simple et répété : "Être né quelque part"
- Structure cyclique (retour au refrain)

#### Versification
- Vers libres, longueur variable (3-12 syllabes)
- Nombreux enjambements
- Rythme conversationnel, proche de la prose

#### Rimes
- Rimes souvent approximatives ou assonances
- Pas de schéma fixe
- Privilégie le sens sur la forme

#### Effets stylistiques majeurs

1. **Questions rhétoriques** :
   - "Aurais-je été meilleur ou pire ?"
   - "Que serais-je devenu ?"
   - "Aurais-je été résistant ou bien lâche ?"
   → Interpellation du lecteur, pas de réponse attendue

2. **Conditionnel passé** (effet grammatical) :
   - "Si j'étais né en 17 à Leidenstadt"
   - "Aurais-je été..."
   → Irréel du passé, impossible à savoir

3. **Énumérations** :
   - "Résistant ou bien lâche ou collaborateur"
   → Éventail des possibles

4. **Litote/minimalisation** :
   - "C'est pas grand-chose après tout"
   - "C'est toujours un hasard"
   → Minimiser l'importance apparente pour mieux souligner l'importance réelle

5. **Répétition du refrain** :
   - "Être né quelque part"
   → Martèlement de l'idée du hasard

#### Ton
- Interrogatif (questions sans réponse)
- Humble (reconnaissance de l'ignorance)
- Empathique (tentative de comprendre)

**Focus par séance** :

- **S1** : Questions rhétoriques + conditionnel passé (irréel)
- **S2** : Vocabulaire de la contingence, du hasard
- **S3** : Conditionnel passé (forme et sens)
- **S4** : Structure argumentative par questions
- **S5** : Synthèse forme/fond

---

### "LÀ-BAS"

**Caractéristiques prosodiques à analyser** :

#### Structure
- **Dialogue** : Deux voix alternent
- Voix 1 (masculine) : "Là-bas" / "J'irai là-bas"
- Voix 2 (féminine) : "N'y va pas"
- Structure dialectique (thèse/antithèse)

#### Versification
- Vers de 6-10 syllabes
- Rythme régulier, presque chanté
- Enjambements rares

#### Rimes
- Rimes riches : sauvage/grillage/courage/naufrage/mirages
- Schéma AABB (rimes plates)
- Musicalité forte

#### Effets stylistiques majeurs

1. **Opposition structurelle** :
   - "Là-bas" vs "N'y va pas"
   - Dialogue incarné, pas simple alternance
   → Conflit existentiel

2. **Parallélisme** :
   - "Là-bas / [description]"
   - "N'y va pas / [contre-argument]"
   → Structure miroir

3. **Anaphore** :
   - Répétition de "Là-bas"
   - Répétition de "N'y va pas"
   → Insistance des deux positions

4. **Antithèses** :
   - "Neuf et sauvage" vs "Étroit"
   - "Libre continent" vs "Grillage"
   - "J'irai" vs "N'y va pas"
   → Opposition binaire radicale

5. **Accumulation** :
   - "Tempêtes et naufrages / Le feu, les diables et les mirages"
   → Dramatisation des dangers

6. **Impératif** :
   - "N'y va pas" (répété)
   → Injonction directe

#### Ton
- Dialectique (débat entre deux voix)
- Tension dramatique (désaccord irrésolu)
- Lyrique (émotion forte des deux côtés)

**Focus par séance** :

- **S1** : Structure dialogique, opposition des voix
- **S2** : Antithèses lexicales (ici/là-bas, libre/grillage)
- **S3** : Futur ("j'irai") vs impératif ("n'y va pas")
- **S4** : Structure argumentative du dialogue
- **S5** : Synthèse forme/fond (comment la forme renforce le dilemme)

---

## 🛠️ PROCÉDURE D'AJOUT

### Pour chaque fichier :

#### Étape 1 : Ouvrir le fichier

Ouvrir le fichier `.ts` dans VS Code

#### Étape 2 : Identifier l'écran 1 (introduction)

Repérer :
```typescript
const ecran1: EcranCeredis = {
  id: '...',
  numero: 1,
  titre: 'Introduction...',
  ...
};
```

#### Étape 3 : Ajouter l'écran prosodique APRÈS ecran1

Insérer :

```typescript
const ecran1bis: EcranCeredis = {
  id: '[chanson]-s[X]-e1bis', // Adapter l'ID
  numero: 2,
  titre: 'Analyse prosodique et stylistique',
  type: 'introduction',
  consigne: 'Découvrez la forme poétique de la chanson',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE DE LA CHANSON "[TITRE]"**
    
    [Contenu selon le modèle ci-dessus]`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1', // Adapter
    scoreMax: 0
  })
};
```

#### Étape 4 : Renuméroter les écrans suivants

**IMPORTANT** : Tous les écrans suivants doivent être renumérotés +1

Avant :
```typescript
const ecran2: EcranCeredis = { numero: 2, ... }
const ecran3: EcranCeredis = { numero: 3, ... }
// etc.
```

Après :
```typescript
const ecran1bis: EcranCeredis = { numero: 2, ... } // NOUVEAU
const ecran2: EcranCeredis = { numero: 3, ... } // +1
const ecran3: EcranCeredis = { numero: 4, ... } // +1
// etc.
```

#### Étape 5 : Mettre à jour l'array des écrans

Avant :
```typescript
ecrans: [ecran1, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8]
```

Après :
```typescript
ecrans: [ecran1, ecran1bis, ecran2, ecran3, ecran4, ecran5, ecran6, ecran7, ecran8]
```

#### Étape 6 : Mettre à jour les métadonnées de séance

```typescript
dureeEstimee: XX, // Ajouter 6 minutes
```

Nombre d'écrans passe de 8 à 9.

#### Étape 7 : Compiler et tester

```bash
npm run build
```

---

## ✅ CHECKLIST PAR FICHIER

Pour chaque fichier modifié, vérifier :

- [ ] Écran prosodique ajouté en position 2 (ecran1bis)
- [ ] ID correct : `[chanson]-sX-e1bis`
- [ ] Tous les écrans suivants renumérotés (+1)
- [ ] Array `ecrans` mis à jour (inclut ecran1bis)
- [ ] Durée totale augmentée de 6 minutes
- [ ] Contenu prosodique adapté à la chanson
- [ ] Focus prosodique adapté au thème de la séance
- [ ] Compilation TypeScript sans erreur
- [ ] Nombre total d'écrans : 9 (au lieu de 8)

---

## 📊 EXEMPLE COMPLET : "Né en 17" - Séance 1

### Écran prosodique à ajouter

```typescript
const ecran1bis: EcranCeredis = {
  id: 'neen17-s1-e1bis',
  numero: 2,
  titre: 'Analyse prosodique et stylistique',
  type: 'introduction',
  consigne: 'Découvrez la forme poétique de "Né en 17 à Leidenstadt"',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE DE LA CHANSON "NÉ EN 17 À LEIDENSTADT"**
    
    **ORGANISATION** :
    - Alternance couplets narratifs et questionnements
    - Refrain simple et répété : "Être né quelque part"
    - Structure cyclique (retour au refrain comme à une évidence)
    
    **VERSIFICATION** :
    - Vers libres, longueur très variable (3-12 syllabes)
    - "Être né quelque part" (6 syllabes)
    - "Aurais-je été résistant ou bien lâche ou collaborateur ?" (16 syllabes)
    - Nombreux enjambements : "Si j'étais né en 17 à Leidenstadt / Sur les ruines..."
    - Rythme conversationnel, proche de la prose philosophique
    
    **RIMES** :
    - Rimes souvent approximatives ou assonances
    - "hasard" / "quelque part" (assonance en [ar])
    - Pas de schéma fixe
    - Le sens prime sur la forme (liberté prosodique au service du questionnement)
    
    **EFFETS STYLISTIQUES** :
    
    1. **Questions rhétoriques** :
       "Aurais-je été meilleur ou pire que ces gens ?"
       "Que serais-je devenu ?"
       "Aurais-je été résistant ou bien lâche ou collaborateur ?"
       → Interpellation du lecteur, reconnaissance de l'impossibilité de répondre
    
    2. **Conditionnel passé** (effet grammatical ET stylistique) :
       "Si j'étais né..." / "Aurais-je été..."
       → Irréel du passé, modalise l'impossibilité de savoir
    
    3. **Énumérations** :
       "Résistant ou bien lâche ou collaborateur"
       → Éventail complet des possibles sans hiérarchie morale initiale
    
    4. **Litote** :
       "C'est pas grand-chose après tout"
       → Minimise pour mieux souligner l'importance existentielle
    
    5. **Répétition du refrain** :
       "Être né quelque part" (répété 4 fois)
       → Martèlement de l'idée du hasard, de la contingence
    
    **TON** :
    - Interrogatif (questions sans réponse attendue)
    - Humble (reconnaissance de sa propre ignorance)
    - Empathique (tentative sincère de comprendre l'autre)
    - Philosophique (questionnement existentiel profond)
    
    **COHÉRENCE FORME/FOND** :
    La forme libre et conversationnelle renforce le message :
    Goldman ne cherche pas à "faire joli" mais à questionner honnêtement.
    L'absence de structure rigide reflète l'impossibilité de réponses simples.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B1',
    scoreMax: 0
  })
};
```

---

## 📊 EXEMPLE COMPLET : "Là-bas" - Séance 1

### Écran prosodique à ajouter

```typescript
const ecran1bis: EcranCeredis = {
  id: 'labas-s1-e1bis',
  numero: 2,
  titre: 'Analyse prosodique et stylistique',
  type: 'introduction',
  consigne: 'Découvrez la structure dialogique de "Là-bas"',
  dureeEstimee: 6,
  activite: {
    type: 'introduction',
    contenu: `**STRUCTURE DE LA CHANSON "LÀ-BAS"**
    
    **ORGANISATION** :
    - Structure **dialogique** : Deux voix qui s'opposent
    - Voix 1 (masculine, Goldman) : "Là-bas" / "J'irai là-bas"
    - Voix 2 (féminine, Sirima) : "N'y va pas"
    - Alternance thèse/antithèse sans synthèse
    - Structure dialectique incarnée dans deux voix
    
    **VERSIFICATION** :
    - Vers de 6-10 syllabes (relativement réguliers)
    - "Libre continent sans grillage" (8 syllabes)
    - "C'est pour ça que j'irais là-bas" (8 syllabes)
    - Rythme chanté, musical
    - Enjambements rares (chaque vers = une unité de sens)
    
    **RIMES** :
    - Rimes riches et musicalité forte
    - sauvage / grillage / courage / naufrage / mirages (toutes en [-aʒ])
    - Schéma AABB (rimes plates)
    - Effet hypnotique, presque incantatoire
    
    **EFFETS STYLISTIQUES** :
    
    1. **Opposition structurelle** :
       "Là-bas" vs "N'y va pas"
       → Conflit existentiel incarné dans deux voix réelles
    
    2. **Parallélisme** :
       Voix 1 : "Là-bas / [description positive]"
       Voix 2 : "N'y va pas / [contre-argument négatif]"
       → Structure miroir, chaque voix répond à l'autre
    
    3. **Anaphore** :
       Répétition obsédante de "Là-bas" (8 fois)
       Répétition suppliante de "N'y va pas" (10 fois)
       → Insistance des deux positions, aucune ne cède
    
    4. **Antithèses lexicales** :
       - "Neuf et sauvage" ↔ "Étroit"
       - "Libre continent" ↔ "Grillage"
       - "J'irai" ↔ "N'y va pas"
       - "Ici" ↔ "Là-bas"
       → Opposition binaire radicale (aucun compromis possible)
    
    5. **Accumulation dramatisante** :
       "Tempêtes et naufrages / Le feu, les diables et les mirages"
       → Amplification des dangers par accumulation
    
    6. **Impératif vs Futur** :
       "N'y va pas" (impératif négatif = interdiction)
       "J'irai là-bas" (futur = volonté affirmée)
       → Combat grammatical : hétéronomie vs autonomie
    
    **TON** :
    - Dialectique (débat entre deux légitimités)
    - Tension dramatique (désaccord irrésolu jusqu'au bout)
    - Lyrique (émotion forte, supplication vs détermination)
    - Tragique (impossibilité de résolution)
    
    **COHÉRENCE FORME/FOND** :
    La structure dialogique n'est pas un artifice :
    elle INCARNE le dilemme existentiel.
    Les deux voix sont également légitimes, également puissantes.
    L'absence de résolution formelle reflète l'impossibilité de résolution existentielle.`
  },
  ceredis: createCeredisMetadata({
    competencies: ['2.1', '5.1', '5.2'],
    evidenceType: 'P1',
    niveau: 'B2',
    scoreMax: 0
  })
};
```

---

## 🎯 ADAPTATION DU FOCUS PAR SÉANCE

### "Né en 17"

| Séance | Focus prosodique spécifique |
|--------|------------------------------|
| S1 | Questions rhétoriques + conditionnel passé |
| S2 | Vocabulaire contingence (hasard, être né, quelque part) |
| S3 | Conditionnel passé (forme ET valeur sémantique) |
| S4 | Structure argumentative par accumulation de questions |
| S5 | Synthèse forme/fond (liberté prosodique = questionnement) |

### "Là-bas"

| Séance | Focus prosodique spécifique |
|--------|------------------------------|
| S1 | Structure dialogique, deux voix opposées |
| S2 | Antithèses lexicales (ici/là-bas dans les rimes) |
| S3 | Opposition grammaticale (futur vs impératif) |
| S4 | Parallélisme thèse/antithèse |
| S5 | Synthèse forme/fond (dialogue = dilemme incarné) |

---

## 📝 PROMPT POUR COPILOT

Pour chaque fichier, écrire en commentaire en haut :

```typescript
/*
AJOUT ÉCRAN PROSODIQUE - [Chanson] - Séance [X]

Ajouter un écran prosodique (ecran1bis) en position 2.

Focus prosodique pour cette séance : [Focus spécifique selon tableau ci-dessus]

Structure :
- ID : [chanson]-s[X]-e1bis
- Numero : 2
- Titre : "Analyse prosodique et stylistique"
- Type : introduction
- Durée : 6 minutes
- Contenu : Analyse complète (structure, versification, rimes, effets stylistiques, ton)

IMPORTANT :
1. Adapter le contenu prosodique au focus de la séance
2. Renuméroter tous les écrans suivants (+1)
3. Ajouter ecran1bis dans l'array ecrans[]
4. Augmenter dureeEstimee de 6 minutes

Suivre le modèle de "C'est ta chance" Séance 1.
*/
```

---

## ⏱️ ESTIMATION TEMPS

- Lecture de ce prompt : 15 min
- Ajout par fichier (avec Copilot) : 15-20 min
- **Total pour 10 fichiers** : **3-4h**

---

## ✅ VALIDATION FINALE

Après avoir ajouté les 10 écrans prosodiques :

- [ ] 10 fichiers modifiés
- [ ] 10 écrans prosodiques ajoutés (tous en position 2)
- [ ] Tous les écrans renumérotés correctement
- [ ] Compilation TypeScript sans erreur
- [ ] Chaque écran prosodique adapté à sa séance
- [ ] Durées mises à jour (+60 minutes au total)
- [ ] Nombre total d'écrans : 88 (au lieu de 78)

---

**Date de création** : 2026-01-13  
**Auteur** : Claude  
**Usage** : GitHub Copilot pour ajout écrans prosodiques  
**Statut** : ✅ Prêt à utiliser
