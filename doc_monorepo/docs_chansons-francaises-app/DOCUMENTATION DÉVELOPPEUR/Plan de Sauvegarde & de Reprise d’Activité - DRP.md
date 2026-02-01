Voici un **Plan de Sauvegarde & de Reprise d’Activité (DRP)** **complet, opérationnel et auditable** pour CEREDIS, aligné avec votre architecture (VPS, Docker, PocketBase, CaSS, PostgreSQL, Ralph, Analytics, RStudio, IA).
Le document est structuré comme une **procédure standard** utilisable en production et présentable aux bailleurs.

---

# CEREDIS — DRP

## Plan de Sauvegarde & Reprise d’Activité

**Version : 1.0 | Portée : Phase pilote → Production**

---

## 1. Objectifs et périmètre

### 1.1. Objectifs

* Garantir la **continuité pédagogique**.
* Préserver l’**intégrité des données évaluatives** (preuves, scores).
* Assurer une **reprise rapide** après incident majeur.
* Fournir une **traçabilité** conforme aux exigences institutionnelles.

### 1.2. Périmètre couvert

* Données applicatives (PocketBase)
* Données évaluatives (CaSS)
* Données analytiques et calculs (PostgreSQL CEREDIS)
* Traces d’apprentissage (Ralph)
* Tableaux de bord (Grafana / Superset)
* Environnement statistique (RStudio Server)
* Configuration Docker / Traefik

---

## 2. Hypothèses et niveaux de service

### 2.1. Hypothèses

* Déploiement sur **VPS unique** (phase pilote).
* Sauvegardes **chiffrées**.
* Stockage **hors VPS** (S3 compatible ou serveur distant).

### 2.2. Objectifs RPO / RTO

| Composant          | RPO (perte max) | RTO (reprise) |
| ------------------ | --------------- | ------------- |
| PostgreSQL CEREDIS | 24 h            | 4 h           |
| CaSS               | 24 h            | 4 h           |
| PocketBase         | 24 h            | 4 h           |
| Ralph (LRS)        | 48 h            | 8 h           |
| Grafana / Superset | 48 h            | 8 h           |
| RStudio            | 72 h            | 24 h          |
| Frontend / Backend | 0 h (rebuild)   | 1 h           |

---

## 3. Stratégie de sauvegarde (Backup)

### 3.1. Principe général

* **Sauvegarde quotidienne automatique**
* **Rétention glissante**
* **Stockage hors site**
* **Tests de restauration périodiques**

---

### 3.2. Données critiques et méthodes

#### 3.2.1. PostgreSQL (CEREDIS SQL)

**Criticité : ÉLEVÉE**

* Méthode : `pg_dump`
* Fréquence : quotidienne (02:00)
* Rétention : 30 jours

```bash
docker exec ceredis_postgres \
  pg_dump -U ceredis ceredis \
  | gzip > /backups/ceredis_pg_$(date +%F).sql.gz
```

---

#### 3.2.2. CaSS (données compétences & preuves)

**Criticité : ÉLEVÉE**

* Méthode : sauvegarde volume Docker
* Fréquence : quotidienne
* Rétention : 30 jours

```bash
docker run --rm \
  -v cass_data:/data \
  -v /backups:/backup \
  alpine tar czf /backup/cass_$(date +%F).tar.gz /data
```

---

#### 3.2.3. PocketBase (données applicatives)

**Criticité : MOYENNE**

```bash
docker run --rm \
  -v pocketbase_data:/data \
  -v /backups:/backup \
  alpine tar czf /backup/pocketbase_$(date +%F).tar.gz /data
```

---

#### 3.2.4. Ralph (LRS)

**Criticité : MOYENNE**

```bash
docker run --rm \
  -v ralph_data:/data \
  -v /backups:/backup \
  alpine tar czf /backup/ralph_$(date +%F).tar.gz /data
```

---

#### 3.2.5. Grafana / Superset

**Criticité : FAIBLE à MOYENNE**

* Sauvegarde des volumes + exports dashboards
* Fréquence : hebdomadaire

---

#### 3.2.6. RStudio Server

**Criticité : FAIBLE**

* Sauvegarde des répertoires utilisateurs
* Fréquence : hebdomadaire

---

### 3.3. Configuration et secrets

* Sauvegarder **hors dépôt Git** :

  * `.env`
  * fichiers Traefik (ACME)
  * `docker-compose.yml`

---

## 4. Stockage hors site

### 4.1. Recommandations

* Object Storage S3 compatible (Backblaze, Wasabi, MinIO)
* Ou serveur distant sécurisé (rsync + SSH)

### 4.2. Exemple `rclone`

```bash
rclone sync /backups remote:ceredis-backups --progress
```

---

## 5. Plan de reprise d’activité (Disaster Recovery)

### 5.1. Scénario 1 — Panne logicielle / corruption partielle

**Actions**

1. Identifier le service affecté.
2. Arrêter le conteneur concerné.
3. Restaurer **uniquement** le composant impacté.
4. Relancer et vérifier les calculs CEREDIS.

---

### 5.2. Scénario 2 — Perte totale du VPS

**Actions chronologiques**

1. Provisionner un **nouveau VPS** (Ubuntu 24.04).
2. Réinstaller Docker & Docker Compose.
3. Restaurer :

   * `docker-compose.yml`
   * `.env`
4. Récupérer les sauvegardes hors site.
5. Restaurer les volumes :

   * PostgreSQL
   * CaSS
   * PocketBase
6. Redémarrer l’ensemble :

   ```bash
   docker compose up -d
   ```
7. Vérifier :

   * accès Frontend / API,
   * intégrité des scores CEREDIS,
   * cohérence CECRL.

---

### 5.3. Restauration PostgreSQL (exemple)

```bash
gunzip -c ceredis_pg_YYYY-MM-DD.sql.gz \
| docker exec -i ceredis_postgres psql -U ceredis ceredis
```

---

## 6. Vérifications post-reprise (obligatoires)

* Accès HTTPS fonctionnel
* Intégrité des preuves
* Recalcul d’un profil CEREDIS test :

  ```sql
  SELECT recalc_full_ceredis('AGENT_TEST');
  ```
* Vérification des tableaux de bord
* Journalisation de l’incident

---

## 7. Tests et audits DRP

### 7.1. Tests planifiés

* **Test de restauration partielle** : trimestriel
* **Test de restauration complète** : annuel

### 7.2. Documentation

Chaque test doit produire :

* date,
* scénario,
* durée réelle de reprise,
* anomalies constatées,
* actions correctives.

---

## 8. Rôles et responsabilités

| Rôle                          | Responsabilité                    |
| ----------------------------- | --------------------------------- |
| Admin système                 | Exécution backups & restores      |
| Responsable technique CEREDIS | Validation post-reprise           |
| Responsable scientifique      | Vérification intégrité évaluative |
| Direction projet              | Communication partenaires         |

---

## 9. Points de conformité institutionnelle

* Traçabilité des données évaluatives
* Séparation données pédagogiques / analytiques
* Protection contre perte ou altération
* Reproductibilité scientifique

---

## 10. Résumé exécutif (bailleurs)

* Sauvegardes quotidiennes chiffrées
* Stockage hors site
* Reprise complète < 24 h
* Tests réguliers
* Architecture DRP alignée avec standards internationaux

---

