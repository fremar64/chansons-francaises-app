Voici un **guide de déploiement VPS pas à pas** pour **CEREDIS**, ciblé **Ubuntu Server 24.04 LTS**, cohérent avec :

* l’architecture C4,
* le `docker-compose.yml` de référence,
* les exigences de sécurité et d’audit institutionnel.

Ce guide est rédigé comme un **runbook DevOps** : il peut être suivi **sans improvisation**.

---

# CEREDIS — Guide de déploiement VPS

## Ubuntu 24.04 LTS · Docker · Traefik · CaSS · Analytics · IA

---

## 0. Prérequis

### Infrastructure minimale (phase pilote)

| Ressource | Recommandation                       |
| --------- | ------------------------------------ |
| VPS       | 1 instance                           |
| CPU       | 4 vCPU                               |
| RAM       | 8 Go (16 Go recommandé si IA active) |
| Stockage  | 100 Go SSD                           |
| OS        | Ubuntu Server 24.04 LTS              |
| Domaine   | `ceredis.org` + sous-domaines        |

Sous-domaines requis :

* `app.ceredis.org`
* `api.ceredis.org`

---

## 1. Préparation du VPS

### 1.1. Connexion initiale

```bash
ssh root@IP_DU_VPS
```

### 1.2. Mise à jour du système

```bash
apt update && apt upgrade -y
reboot
```

Reconnectez-vous après le redémarrage.

---

## 2. Sécurisation de base du serveur

### 2.1. Création d’un utilisateur non-root

```bash
adduser ceredis
usermod -aG sudo ceredis
```

Reconnectez-vous :

```bash
ssh ceredis@IP_DU_VPS
```

---

### 2.2. Pare-feu (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 443
sudo ufw enable
sudo ufw status
```

👉 **Aucun autre port ne doit être exposé**.

---

## 3. Installation de Docker & Docker Compose

### 3.1. Dépendances

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
```

### 3.2. Installation Docker officiel

```bash
curl -fsSL https://get.docker.com | sudo sh
```

### 3.3. Droits utilisateur

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

## 4. Arborescence projet CEREDIS

```bash
mkdir -p ~/ceredis
cd ~/ceredis
```

Structure recommandée :

```text
ceredis/
├── docker-compose.yml
├── .env
├── letsencrypt/
├── backups/
└── logs/
```

---

## 5. Configuration des variables d’environnement

### 5.1. Fichier `.env`

```bash
nano .env
```

Exemple **(à adapter, ne pas committer)** :

```env
POSTGRES_DB=ceredis
POSTGRES_USER=ceredis
POSTGRES_PASSWORD=CHANGE_ME_STRONG

SUPERSET_SECRET_KEY=CHANGE_ME_SECRET
TRAEFIK_ACME_EMAIL=admin@ceredis.org

CASS_URL=http://cass:8080
POCKETBASE_URL=http://pocketbase:8090
RALPH_URL=http://ralph:8100
OLLAMA_URL=http://ollama:11434
```

Permissions :

```bash
chmod 600 .env
```

---

## 6. Déploiement des services

### 6.1. Lancement initial

```bash
docker compose up -d
```

Suivi :

```bash
docker compose ps
docker compose logs -f
```

---

## 7. Vérifications critiques (checklist)

### 7.1. Reverse proxy & HTTPS

* Accéder à :
  👉 `https://app.ceredis.org`
  👉 `https://api.ceredis.org`

Certificat TLS valide (Let’s Encrypt).

---

### 7.2. Services internes (via SSH tunnel)

Exemple pour PostgreSQL :

```bash
ssh -L 5432:localhost:5432 ceredis@IP_DU_VPS
```

Puis :

```bash
psql -h localhost -U ceredis -d ceredis
```

---

### 7.3. CaSS

```bash
docker logs ceredis_cass
```

Vérifier :

* démarrage OK
* référentiel accessible via API interne

---

## 8. Initialisation CEREDIS (post-déploiement)

### 8.1. Base PostgreSQL

* Exécuter :

  * DDL CEREDIS,
  * vues,
  * fonctions de calcul.

```bash
psql -h localhost -U ceredis -d ceredis -f ceredis_schema.sql
```

---

### 8.2. CaSS

* importer le référentiel CEREDIS,
* vérifier les domaines & compétences,
* tester insertion d’une preuve.

---

## 9. Sauvegardes (obligatoire)

### 9.1. Script de sauvegarde PostgreSQL

```bash
nano ~/ceredis/backups/backup_pg.sh
```

```bash
#!/bin/bash
docker exec ceredis_postgres \
  pg_dump -U ceredis ceredis \
  > ~/ceredis/backups/ceredis_$(date +%F).sql
```

```bash
chmod +x ~/ceredis/backups/backup_pg.sh
```

### 9.2. Cron quotidien

```bash
crontab -e
```

```cron
0 2 * * * /home/ceredis/ceredis/backups/backup_pg.sh
```

---

## 10. Sécurité & bonnes pratiques

### À FAIRE

* backups quotidiens
* journalisation des recalculs CEREDIS
* accès outils internes via SSH tunnel
* anonymisation exports RStudio

### À NE PAS FAIRE

* exposer PostgreSQL
* exposer Grafana / Superset
* calculer des scores côté frontend
* laisser l’IA écrire en base évaluative

---

## 11. Validation finale (go / no-go)

| Vérification           | OK |
| ---------------------- | -- |
| HTTPS actif            | ⬜  |
| API fonctionnelle      | ⬜  |
| Insertion de preuves   | ⬜  |
| Recalcul CEREDIS       | ⬜  |
| CECRL dérivé           | ⬜  |
| Dashboards accessibles | ⬜  |
| Backups actifs         | ⬜  |

---

## 12. Évolution recommandée (phase 2)

* séparation multi-VPS
* monitoring ressources
* VPN WireGuard
* CI/CD GitHub Actions
* Kubernetes (si montée en charge)

---

## Conclusion

À l’issue de ce guide, vous disposez :

* d’un **environnement CEREDIS opérationnel**,
* sécurisé,
* scientifiquement conforme,
* prêt pour :

  * expérimentation pilote,
  * collecte de données,
  * audit bailleurs.

---

