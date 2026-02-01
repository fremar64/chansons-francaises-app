
Voici un **guide de déploiement VPS pas à pas**, conçu pour **Ubuntu 24.04 LTS**, aligné **strictement** avec l’architecture CEREDIS et le `docker-compose.yml` fourni.
Le document est rédigé comme une **procédure opératoire standard (SOP)** : exécutable, vérifiable, audit-able.

---

# CEREDIS — Guide de déploiement VPS

## Ubuntu 24.04 LTS · Docker · Traefik · CaSS · Analytics · IA

---

## 0. Prérequis (avant de commencer)

### 0.1. VPS recommandé (phase pilote)

| Ressource | Minimum          | Recommandé       |
| --------- | ---------------- | ---------------- |
| CPU       | 4 vCPU           | 8 vCPU           |
| RAM       | 8 Go             | 16 Go            |
| Stockage  | 80 Go SSD        | 160 Go SSD       |
| OS        | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS |

### 0.2. Accès requis

* Accès **root** ou **sudo**
* Un nom de domaine :

  * `app.ceredis.org`
  * `api.ceredis.org`
* Ports ouverts côté fournisseur :

  * `22` (SSH)
  * `443` (HTTPS)

---

## 1. Connexion initiale et sécurisation de base

```bash
ssh root@IP_DU_VPS
```

### 1.1. Mise à jour du système

```bash
apt update && apt upgrade -y
reboot
```

Reconnectez-vous après le redémarrage.

---

### 1.2. Création d’un utilisateur non-root (recommandé)

```bash
adduser ceredis
usermod -aG sudo ceredis
su - ceredis
```

---

### 1.3. Pare-feu (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 443
sudo ufw enable
sudo ufw status
```

---

## 2. Installation de Docker et Docker Compose

### 2.1. Installation de Docker (officiel)

```bash
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu noble stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 2.2. Droits utilisateur Docker

```bash
sudo usermod -aG docker ceredis
newgrp docker
```

Vérification :

```bash
docker --version
docker compose version
```

---

## 3. Arborescence CEREDIS sur le VPS

```bash
mkdir -p ~/ceredis
cd ~/ceredis
```

Structure recommandée :

```
ceredis/
├── docker-compose.yml
├── .env
├── letsencrypt/
├── backups/
└── README.md
```

---

## 4. Configuration des variables d’environnement

### 4.1. Fichier `.env`

```bash
nano .env
```

Exemple **(à adapter impérativement)** :

```env
POSTGRES_DB=ceredis
POSTGRES_USER=ceredis
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD

SUPERSET_SECRET_KEY=CHANGE_ME_SUPERSET_KEY

TRAEFIK_ACME_EMAIL=admin@ceredis.org
```

⚠️ **Ne jamais versionner ce fichier.**

---

## 5. Déploiement des services CEREDIS

### 5.1. Copier le `docker-compose.yml`

Collez le fichier de référence fourni précédemment dans :

```bash
nano docker-compose.yml
```

---

### 5.2. Lancement initial

```bash
docker compose pull
docker compose up -d
```

Surveillez le démarrage :

```bash
docker compose ps
docker compose logs -f
```

---

## 6. Vérifications post-déploiement

### 6.1. Reverse proxy (Traefik)

```bash
docker logs ceredis_traefik
```

Vérifiez :

* obtention des certificats Let’s Encrypt,
* absence d’erreurs ACME.

---

### 6.2. Accès applicatif

* Frontend :
  👉 `https://app.ceredis.org`
* Backend API :
  👉 `https://api.ceredis.org/health` (endpoint à prévoir)

---

### 6.3. Vérification des services internes

```bash
docker compose exec postgres psql -U ceredis -d ceredis
```

```sql
\dt
```

---

## 7. Initialisation CEREDIS (étapes critiques)

### 7.1. Base PostgreSQL CEREDIS

1. Exécuter :

   * le **DDL SQL**,
   * les **vues de calcul**,
   * les **fonctions CEREDIS**.

👉 À faire **une seule fois**.

---

### 7.2. CaSS

* Importer :

  * le framework CEREDIS,
  * les domaines,
  * les compétences (dont Domaine 5).

---

### 7.3. Vérification pipeline de calcul

Insérez une preuve test :

```sql
INSERT INTO evidence (...)
```

Puis :

```sql
SELECT recalc_full_ceredis('AGENT_UUID');
```

Vérifiez :

```sql
SELECT * FROM ceredis_profile;
```

---

## 8. Accès aux outils internes (sécurisé)

### 8.1. Accès temporaire via tunnel SSH

```bash
ssh -L 8787:localhost:8787 ceredis@IP_DU_VPS
```

* RStudio : `http://localhost:8787`
* Grafana : port-forward équivalent

👉 **Aucun outil interne ne doit être exposé publiquement.**

---

## 9. Sauvegardes (fortement recommandé)

### 9.1. Backup PostgreSQL quotidien

```bash
docker exec ceredis_postgres \
  pg_dump -U ceredis ceredis \
  > backups/ceredis_$(date +%F).sql
```

Automatiser via `cron`.

---

## 10. Bonnes pratiques post-déploiement

* surveiller l’espace disque (`df -h`)
* surveiller la RAM (`htop`)
* mettre à jour mensuellement :

  ```bash
  docker compose pull && docker compose up -d
  ```
* documenter toute modification des règles CEREDIS

---

## 11. Checklist finale (pilotage)

✅ VPS sécurisé
✅ Docker opérationnel
✅ CEREDIS déployé
✅ CaSS fonctionnel
✅ Calculs CEREDIS vérifiés
✅ Analytics accessibles
✅ IA isolée
✅ Sauvegardes en place

---

## 12. Étapes suivantes possibles

Je peux maintenant :

1. fournir un **plan de sauvegarde & reprise (DRP)** détaillé,
2. rédiger une **politique de sécurité & RGPD CEREDIS**,
3. proposer un **scénario de montée en charge multi-VPS**,
4. préparer une **check-list d’audit technique bailleurs**.

Dites-moi ce que vous souhaitez engager ensuite.
