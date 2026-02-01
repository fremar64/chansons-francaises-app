# 🔧 CORRECTION API RULES - Collection Evidences

**Problème** : Badge rouge sur l'onglet API Rules  
**Cause** : Syntaxe incorrecte pour la relation `user`  
**Solution** : Corriger la syntaxe des règles

---

## ✅ RÈGLES CORRECTES À APPLIQUER

### Dans l'onglet "API Rules" de la collection "evidences"

**List rule** (Lister/Voir les evidences) :
```javascript
@request.auth.id != "" && user = @request.auth.id
```

**View rule** (Voir une evidence) :
```javascript
@request.auth.id != "" && user = @request.auth.id
```

**Create rule** (Créer une evidence) :
```javascript
@request.auth.id != "" && @request.data.user = @request.auth.id
```

**Update rule** (Modifier une evidence) :
```javascript
@request.auth.id != "" && user = @request.auth.id
```

**Delete rule** (Supprimer une evidence) :
```javascript
@request.auth.id != "" && user = @request.auth.id
```

---

## 🎯 ALTERNATIVE SIMPLIFIÉE

Si les règles ci-dessus ne fonctionnent pas, essayer cette syntaxe plus permissive :

**Toutes les règles** :
```javascript
@request.auth.id != ""
```

Cette règle permet à **tout utilisateur authentifié** de :
- Voir ses propres evidences
- Créer ses propres evidences
- Modifier/supprimer ses propres evidences

---

## 📝 MARCHE À SUIVRE

### Étape 1 : Ouvrir l'onglet API Rules
1. Dans la fenêtre "Edit collection" (déjà ouverte)
2. Cliquer sur l'onglet **"API Rules"** (à côté de "Fields")
3. Vous verrez 5 champs : List, View, Create, Update, Delete

### Étape 2 : Appliquer les règles

**Pour chaque champ, copier-coller la règle correspondante :**

#### List rule :
```
@request.auth.id != "" && user = @request.auth.id
```

#### View rule :
```
@request.auth.id != "" && user = @request.auth.id
```

#### Create rule :
```
@request.auth.id != "" && @request.data.user = @request.auth.id
```

#### Update rule :
```
@request.auth.id != "" && user = @request.auth.id
```

#### Delete rule :
```
@request.auth.id != "" && user = @request.auth.id
```

### Étape 3 : Sauvegarder
1. Cliquer sur **"Save changes"** en bas à droite
2. Vérifier que le badge rouge a disparu
3. Si le badge rouge persiste, essayer la version simplifiée

---

## 🔍 VÉRIFICATION

Une fois sauvegardé, vérifier :
- ✅ Badge rouge disparu sur l'onglet "API Rules"
- ✅ Aucune erreur affichée
- ✅ Collection "evidences" visible dans la liste

---

## 🧪 TESTER LA COLLECTION

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
    "parcours": "Né en 17 à Leidenstadt"
  }'
```

**Résultat attendu** :
- Code 200 OK
- Evidence créée avec ID
- Visible dans PocketBase Admin

---

## ⚠️ SI LE PROBLÈME PERSISTE

### Option 1 : Syntaxe alternative avec ID explicite

```javascript
// Pour List/View/Update/Delete :
@request.auth.id != "" && user.id = @request.auth.id

// Pour Create :
@request.auth.id != "" && @request.data.user.id = @request.auth.id
```

### Option 2 : Permissions admin temporaires

Pour débloquer rapidement :
1. Mettre toutes les règles à vide temporairement
2. Sauvegarder
3. Tester la création d'evidence
4. Remettre les règles ensuite

### Option 3 : Via PocketBase Admin UI

Aller dans : **Settings → Collections → evidences → API Rules**

---

## ✅ RÉSULTAT FINAL ATTENDU

Après correction :
- ✅ Collection "evidences" créée
- ✅ 8 champs configurés correctement
- ✅ API Rules sans erreur (badge rouge disparu)
- ✅ Prêt pour l'intégration avec l'app Next.js
- ✅ Dashboard peut maintenant charger les evidences

---

**Appliquez ces corrections et le système sera 100% opérationnel !** 🚀
