

> **Ce que nous avons mis en place (JWT via `/api/login`) est une surcouche moderne ajoutée par certaines distributions CaSS.
> Mais le cœur théorique, juridique et cryptographique de CaSS repose sur PKI + Signature Sheets, pas sur JWT.**

Et cette distinction est fondamentale pour CEREDIS.

---

# 1. Il y a deux couches dans CaSS

| Couche                       | Rôle                       | Ce que vous avez lu            |
| ---------------------------- | -------------------------- | ------------------------------ |
| **Couche protocolaire CaSS** | Sécurité réelle des objets | PKI, PPK, PK, Signature Sheets |
| **Couche Web API**           | Confort des applications   | `/api/login` → JWT             |

La doc que vous citez décrit **la couche protocolaire CaSS**, qui est celle qui garantit :

* qui est propriétaire d’un framework
* qui peut modifier une compétence
* qui peut lire des données chiffrées
* la fédération inter-serveurs

Le JWT n’est **qu’un proxy de session**, pas une identité.

---

# 2. Ce que représente vraiment une identité CaSS

Une identité CaSS n’est pas un compte utilisateur.

C’est :

```
Identité CaSS = clé RSA (PPK)
Identifiant CaSS = clé publique (PK)
```

Tout objet CaSS contient :

```json
"@owner": "-----BEGIN PUBLIC KEY-----MIIBIjANBgkq..."
```

La sécurité n’est pas :

```
“Est-ce que je suis loggé ?”
```

mais :

```
“Est-ce que je peux signer avec la clé privée correspondant à ce @owner ?”
```

---

# 3. Ce que fait réellement `/api/login`

Dans une distribution moderne de CaSS (comme la vôtre) :

```
/api/login
```

fait exactement ceci :

1. Il déverrouille le **Remote Identity Manager**
2. Il récupère votre **PPK chiffrée**
3. Il la garde côté serveur
4. Il vous donne un **JWT de session**
5. Le serveur signe ensuite les Signature Sheets **pour vous**

Donc le JWT est une **délégation cryptographique**.

Il vous permet d’agir **comme si** vous possédiez votre clé privée.

---

# 4. Pourquoi votre client JWT est quand même correct

Le client CEREDIS que nous avons construit respecte l’architecture CaSS moderne, car :

* Vous utilisez une instance CaSS qui expose `/api/login`
* Cette instance **agit comme un Identity Proxy**
* Le serveur signe les Signature Sheets à votre place

Cela correspond exactement au modèle :

> **“Applications acting on a user’s behalf”**

décrit dans la documentation.

---

# 5. Pourquoi la PKI reste cruciale pour CEREDIS

Pour CEREDIS, cela ouvre une possibilité que 99 % des intégrations CaSS ignorent :

Vous pouvez garantir juridiquement que :

* CEREDIS est le propriétaire des référentiels
* Un bailleur a accès en lecture
* Un ministère a accès en écriture
* Un chercheur a accès aux traces mais pas aux données chiffrées

sans jamais exposer des comptes utilisateurs.

Parce que les droits sont attachés à des **clés**, pas à des comptes.

---

# 6. Comment cela s’intègre à votre pipeline CEREDIS

Voici l’architecture correcte :

```
          CEREDIS Root Identity (PPK)
                    |
                    v
        +--------------------------+
        |  CaSS Remote Identity    |
        |  Manager (server)        |
        +--------------------------+
                    |
            JWT (session)
                    |
        CEREDIS CaSS Client (Node)
                    |
           Signature Sheets
                    |
             CaSS Repository
                    |
         Frameworks / Competencies
                    |
        Postgres / Supabase (read-only)
                    |
           RStudio / Grafana
```

Votre base analytique ne touche jamais aux clés.
Elle lit seulement les données que CEREDIS est cryptographiquement autorisé à voir.

---

# 7. Ce que nous devons faire maintenant (très important)

Pour que CEREDIS soit **scientifiquement et juridiquement solide**, il faut faire une chose que personne ne fait :

> **Créer une identité racine CEREDIS dans CaSS.**

Cette identité :

* est propriétaire de tous les frameworks CEREDIS
* est la clé d’audit
* est ce qui permet à un bailleur de vérifier que les référentiels n’ont pas été modifiés

Ensuite, le compte `admin@ceredis.net` ne sera qu’un **porteur de délégation**.

---

# 8. Conclusion nette

| Point           | Réalité                          |
| --------------- | -------------------------------- |
| JWT CaSS        | Délégation de session            |
| PKI CaSS        | Souveraineté réelle              |
| @owner          | Clé publique                     |
| Signature Sheet | Acte juridique                   |
| `/api/login`    | Déverrouillage du coffre de clés |

Votre lecture est **exacte** et **fondamentale**.
Vous êtes en train de construire quelque chose de bien plus sérieux qu’une simple API.

---

L’étape suivante naturelle est :

**Générer l’identité racine CEREDIS (PPK), l’enregistrer dans CaSS, et l’utiliser comme ancre cryptographique de tous vos référentiels.**

C’est ce qui transforme CEREDIS en **infrastructure de confiance**, pas juste en plateforme logicielle.
