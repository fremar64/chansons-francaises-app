# 🗄️ CRÉATION COLLECTION EVIDENCES - Guide Complet

**Date**: 26 janvier 2026  
**Objectif**: Créer la collection `evidences` dans PocketBase  
**Statut**: À faire

---

## 📊 ÉTAT ACTUEL

### ✅ Collections existantes
- **users** - Utilisateurs (déjà configurée)
- **progression** - Progressions des séances (déjà configurée)
  - Champs : id, user, seance_id, statut, ecran_actuel, score_total, score_max, temps_max, date_debut, date_fin, tentatives

### ❌ Collections manquantes
- **evidences** - Preuves d'apprentissage CEREDIS (À CRÉER)

---

## 🎯 OPTION 1 : Via Claude Extension Chrome (RECOMMANDÉ)

### Étape 1: Ouvrir PocketBase Admin

1. Aller sur : https://pocketbase-songs.ceredis.net/_/
2. Se connecter si nécessaire

### Étape 2: Activer Claude Extension

1. Cliquer sur l'icône Claude dans la barre d'outils Chrome
2. Ou appuyer sur `Alt+Espace` (Windows) / `Cmd+Espace` (Mac)

### Étape 3: Donner le prompt à Claude

Copier-coller ce prompt dans Claude :

```
Tu dois créer une collection PocketBase nommée "evidences" pour stocker les preuves d'apprentissage CEREDIS.

URL : https://pocketbase-songs.ceredis.net/_/

INSTRUCTIONS :

1. Va sur https://pocketbase-songs.ceredis.net/_/
2. Connecte-toi avec les identifiants admin si nécessaire
3. Clique sur le bouton "+ New collection" en bas à gauche
4. Nomme la collection "evidences" (minuscules, sans espace)
5. Type : Base collection
6. Clique sur "Create" ou "Créer"

7. Ajoute les champs suivants (clique sur "+ New field" pour chaque) :

CHAMP 1 : user
- Type : Relation
- Collection : users
- Type de relation : Single
- Required : ✓ (coché)
- Options : Cascade delete ✓

CHAMP 2 : competency_id
- Type : Text
- Required : ✓
- Min length : 1
- Max length : 10
- Pattern : ^[1-5]\.[1-7]$

CHAMP 3 : evidence_type
- Type : Select
- Required : ✓
- Options : P1, P2, P3, P4
- Max select : 1

CHAMP 4 : score
- Type : Number
- Required : ✓
- Min : 0
- Max : 100

CHAMP 5 : activity_type
- Type : Text
- Required : ✗ (non coché)
- Max length : 100

CHAMP 6 : seance_id
- Type : Text
- Required : ✗
- Max length : 50

CHAMP 7 : parcours
- Type : Text
- Required : ✗
- Max length : 100

CHAMP 8 : metadata
- Type : JSON
- Required : ✗

8. Configure les API Rules (permissions) :

Liste/View :
@request.auth.id != "" && user = @request.auth.id

Create :
@request.auth.id != "" && @request.data.user = @request.auth.id

Update :
@request.auth.id != "" && user = @request.auth.id

Delete :
@request.auth.id != "" && user = @request.auth.id

9. Sauvegarde la collection

10. Prends un screenshot pour confirmation
```

---

## 🎯 OPTION 2 : Manuellement via l'interface

### Étape 1: Créer la collection

1. Aller sur https://pocketbase-songs.ceredis.net/_/
2. Cliquer sur **"+ New collection"** (en bas à gauche)
3. Nom : `evidences`
4. Type : **Base collection**
5. Cliquer sur **Create**

### Étape 2: Ajouter les champs

Cliquer sur **"+ New field"** pour chaque champ :

#### 🔗 Champ 1: user (Relation)
```
Type : Relation
Collection : users
Relation type : Single
Required : ✓
Cascade delete : ✓
```

#### 📝 Champ 2: competency_id (Text)
```
Type : Text
Required : ✓
Min : 1
Max : 10
Pattern : ^[1-5]\.[1-7]$
```

#### 🏷️ Champ 3: evidence_type (Select)
```
Type : Select
Required : ✓
Values : P1, P2, P3, P4
Max select : 1
```

#### 🔢 Champ 4: score (Number)
```
Type : Number
Required : ✓
Min : 0
Max : 100
```

#### 📄 Champ 5: activity_type (Text)
```
Type : Text
Required : ✗
Max : 100
```

#### 🆔 Champ 6: seance_id (Text)
```
Type : Text
Required : ✗
Max : 50
```

#### 🎵 Champ 7: parcours (Text)
```
Type : Text
Required : ✗
Max : 100
```

#### 📦 Champ 8: metadata (JSON)
```
Type : JSON
Required : ✗
```

### Étape 3: Configurer les permissions

Aller dans l'onglet **"API Rules"** :

**List/View rule** :
```
@request.auth.id != "" && user = @request.auth.id
```

**Create rule** :
```
@request.auth.id != "" && @request.data.user = @request.auth.id
```

**Update rule** :
```
@request.auth.id != "" && user = @request.auth.id
```

**Delete rule** :
```
@request.auth.id != "" && user = @request.auth.id
```

### Étape 4: Sauvegarder

Cliquer sur **"Save changes"** en haut à droite

---

## 🎯 OPTION 3 : Via API REST (Pour développeurs)

### Prérequis
- Token admin PocketBase
- curl ou Postman

### Commande curl

```bash
curl -X POST https://pocketbase-songs.ceredis.net/api/collections \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_ADMIN" \
  -d '{
    "name": "evidences",
    "type": "base",
    "schema": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": 1,
          "maxSelect": 1
        }
      },
      {
        "name": "competency_id",
        "type": "text",
        "required": true,
        "options": {
          "min": 1,
          "max": 10,
          "pattern": "^[1-5]\\.[1-7]$"
        }
      },
      {
        "name": "evidence_type",
        "type": "select",
        "required": true,
        "options": {
          "maxSelect": 1,
          "values": ["P1", "P2", "P3", "P4"]
        }
      },
      {
        "name": "score",
        "type": "number",
        "required": true,
        "options": {
          "min": 0,
          "max": 100
        }
      },
      {
        "name": "activity_type",
        "type": "text",
        "required": false,
        "options": {
          "max": 100
        }
      },
      {
        "name": "seance_id",
        "type": "text",
        "required": false,
        "options": {
          "max": 50
        }
      },
      {
        "name": "parcours",
        "type": "text",
        "required": false,
        "options": {
          "max": 100
        }
      },
      {
        "name": "metadata",
        "type": "json",
        "required": false
      }
    ],
    "listRule": "@request.auth.id != \"\" && user = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && user = @request.auth.id",
    "createRule": "@request.auth.id != \"\" && @request.data.user = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && user = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && user = @request.auth.id"
  }'
```

---

## ✅ VÉRIFICATION

Après création, vérifier que :

1. ✅ Collection nommée "evidences" existe
2. ✅ 8 champs créés (user, competency_id, evidence_type, score, activity_type, seance_id, parcours, metadata)
3. ✅ Champ "user" est une relation vers "users"
4. ✅ Champ "evidence_type" a les 4 valeurs (P1, P2, P3, P4)
5. ✅ Permissions configurées (règles API)
6. ✅ Champs obligatoires marqués comme "required"

---

## 🧪 TEST

Créer une evidence de test via l'API :

```bash
curl -X POST https://pocketbase-songs.ceredis.net/api/collections/evidences/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_USER" \
  -d '{
    "user": "yr1x9y7vxnfhn61",
    "competency_id": "1.1",
    "evidence_type": "P2",
    "score": 85,
    "activity_type": "quiz",
    "parcours": "Né en 17 à Leidenstadt",
    "metadata": {
      "duration": 120,
      "attempts": 1
    }
  }'
```

**Résultat attendu** :
- ✅ Code 200 OK
- ✅ Evidence créée avec ID
- ✅ Visible dans PocketBase Admin
- ✅ Visible dans le dashboard de l'app

---

## 📊 SCHÉMA DE LA COLLECTION

```
evidences
├── id (auto)
├── created (auto)
├── updated (auto)
├── user → users (relation)
├── competency_id (text) - Ex: "1.1", "2.3", "5.7"
├── evidence_type (select) - P1, P2, P3, P4
├── score (number) - 0-100
├── activity_type (text) - Ex: "quiz", "texte_libre"
├── seance_id (text)
├── parcours (text) - Ex: "Né en 17 à Leidenstadt"
└── metadata (json) - Données additionnelles
```

---

## 🔗 INTÉGRATION AVEC LE DASHBOARD

Une fois la collection créée, le dashboard va :

1. ✅ Charger les evidences de l'utilisateur
2. ✅ Calculer les scores par domaine (D1-D5)
3. ✅ Afficher le graphique radar
4. ✅ Estimer le score CEREDIS
5. ✅ Déterminer le niveau CECRL approximatif

**Plus d'evidences = meilleure précision !**

---

## ❓ FAQ

**Q: Pourquoi "evidences" et pas "evidence" ?**  
R: Convention PocketBase : collections au pluriel (users, progressions, evidences)

**Q: Que signifie P1, P2, P3, P4 ?**  
R: Types de preuves CEREDIS :
- P1 : Reconnaissance
- P2 : Compréhension
- P3 : Application
- P4 : Création/Analyse

**Q: C'est quoi competency_id ?**  
R: ID des compétences CEREDIS (19 compétences) :
- 1.1, 1.2, 1.3 (Domaine 1)
- 2.1, 2.2, 2.3 (Domaine 2)
- 3.1, 3.2, 3.3 (Domaine 3)
- 4.1, 4.2, 4.3 (Domaine 4)
- 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7 (Domaine 5)

**Q: Dois-je créer des données manuellement ?**  
R: Non ! Les evidences seront créées automatiquement quand les utilisateurs complètent des activités (une fois le système de tracking activé)

---

## 🚀 APRÈS CRÉATION

1. ✅ Relancer l'app Next.js (si nécessaire)
2. ✅ Vider le cache navigateur (Ctrl+Shift+R)
3. ✅ Aller sur /dashboard
4. ✅ Le dashboard devrait maintenant s'afficher sans erreur !

Le graphique radar et les statistiques seront à 0 jusqu'à ce que vous créiez des evidences de test ou que les utilisateurs complètent des activités.

---

**Document créé le**: 26 janvier 2026  
**Dernière mise à jour**: 26 janvier 2026  
**Statut**: Prêt pour création
