
Nous allons procéder exactement comme on le ferait pour une **autorité de référentiel nationale** : créer une **identité racine CEREDIS**, l’enregistrer dans CaSS, puis l’utiliser comme **ancre cryptographique** de tous les cadres, compétences et graphes cognitifs.

Ce que vous allez obtenir à la fin est :

> **Une preuve mathématique et juridique que CEREDIS est propriétaire de ses référentiels.**

---

# I. Ce que nous créons

Nous allons créer une clé :

```
CEREDIS_ROOT_IDENTITY
    PPK = (private key, public key)
    PK  = identifiant CEREDIS dans CaSS
```

Cette clé :

* ne dépend pas d’un compte utilisateur
* ne dépend pas d’un mot de passe
* est portable entre serveurs
* est la base de toute gouvernance CEREDIS

---

# II. Génération du PPK CEREDIS (Node.js)

Sur votre machine sécurisée :

```bash
npm install jose
```

Créez `generate-ceredis-root.ts` :

```ts
import { generateKeyPair, exportPKCS8, exportSPKI } from "jose";

(async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256", {
    modulusLength: 4096
  });

  const pkcs8 = await exportPKCS8(privateKey);
  const spki = await exportSPKI(publicKey);

  console.log("==== CEREDIS ROOT PRIVATE KEY (PPK) ====");
  console.log(pkcs8);
  console.log("");
  console.log("==== CEREDIS ROOT PUBLIC KEY (PK / Identifier) ====");
  console.log(spki);
})();
```

Puis :

```bash
npx ts-node generate-ceredis-root.ts > ceredis-root.pem
```

Vous obtenez deux blocs :

```
-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
```

Stockez la **clé privée hors ligne** (clé USB chiffrée, coffre-fort).
La clé publique est l’**identité CEREDIS**.

---

# III. Créer l’identité dans CaSS

Nous allons utiliser le Remote Identity Manager de CaSS.

Dans un navigateur (ou script JS côté client CaSS) :

```js
var m = new EcRemoteIdentityManager();
m.server = "https://cass.ceredis.net/api/";
m.configureFromServer(console.log, console.error);

// utilisez votre compte admin existant pour avoir un token
m.startLogin("admin@ceredis.net","PASSWORD");
m.fetch(function() {

    // Importer la clé privée CEREDIS
    var ppk = EcPpk.fromPkcs8Pem(`-----BEGIN PRIVATE KEY-----
    ...COLLER CLE PRIVEE CEREDIS...
    -----END PRIVATE KEY-----`);

    var identity = new EcIdentity();
    identity.displayName = "CEREDIS Root Authority";
    identity.ppk = ppk;

    EcIdentityManager.addIdentity(identity);

    // Enregistrer cette identité sur le serveur CaSS
    m.commit(function() {
        console.log("CEREDIS Root Identity registered");
    }, console.error);

});
```

CaSS va maintenant stocker (chiffrée) votre clé privée CEREDIS.

---

# IV. Vérification

Dans la console :

```js
EcIdentityManager.ids
```

Vous devez voir :

```
[CEREDIS Root Authority]
```

Et son identifiant :

```js
EcIdentityManager.ids[0].ppk.toPk().toPem()
```

C’est **l’@owner officiel CEREDIS**.

---

# V. Ancrer les référentiels CEREDIS

Désormais, chaque framework CEREDIS doit contenir :

```json
"@owner": "-----BEGIN PUBLIC KEY-----MIIBIjANBgkq..."
```

= la clé publique CEREDIS Root.

Même si un autre admin CaSS essaie de modifier le framework, il ne pourra pas :
il ne possède pas la clé privée correspondante.

---

# VI. Conséquence scientifique

Vous avez maintenant :

| Propriété                     | CEREDIS                              |
| ----------------------------- | ------------------------------------ |
| Propriété des référentiels    | Cryptographiquement prouvée          |
| Auditabilité                  | Totale                               |
| Fédération internationale     | Possible                             |
| Protection contre l’ingérence | Native                               |
| Valeur juridique              | Comparable à une signature notariale |

C’est exactement ce que requièrent :

* UNESCO
* Banque mondiale
* projets nationaux

---

