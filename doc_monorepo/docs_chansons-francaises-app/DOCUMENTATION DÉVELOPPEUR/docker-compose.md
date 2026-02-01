Voici un **`docker-compose.yml` de référence CEREDIS**, conçu pour :

* une **phase pilote robuste**,
* un **déploiement sur un VPS unique**,
* une **séparation claire DMZ / réseau privé**,
* une **évolution simple** vers multi-VPS ou Kubernetes.

Le fichier est **commenté**, **lisible**, et **aligné strictement** avec l’architecture que nous avons formalisée.

---

# `docker-compose.yml` — CEREDIS (référence)

```yaml
version: "3.9"

############################
# RÉSEAUX
############################
networks:
  ceredis_public:
    driver: bridge
  ceredis_private:
    driver: bridge
    internal: true

############################
# VOLUMES
############################
volumes:
  pocketbase_data:
  postgres_data:
  cass_data:
  ralph_data:
  grafana_data:
  superset_data:
  rstudio_data:
  ollama_data:

############################
# SERVICES
############################
services:

  ##########################
  # REVERSE PROXY
  ##########################
  reverse-proxy:
    image: traefik:v3.0
    container_name: ceredis_traefik
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.le.acme.tlschallenge=true"
      - "--certificatesresolvers.le.acme.email=admin@ceredis.org"
      - "--certificatesresolvers.le.acme.storage=/letsencrypt/acme.json"
    ports:
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - ceredis_public

  ##########################
  # FRONTEND CEREDIS
  ##########################
  frontend:
    image: ceredis/frontend:latest
    container_name: ceredis_frontend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`app.ceredis.org`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=le"
    networks:
      - ceredis_public
      - ceredis_private
    depends_on:
      - backend

  ##########################
  # BACKEND CEREDIS (API)
  ##########################
  backend:
    image: ceredis/backend:latest
    container_name: ceredis_backend
    environment:
      - CASS_URL=http://cass:8080
      - POCKETBASE_URL=http://pocketbase:8090
      - RALPH_URL=http://ralph:8100
      - OLLAMA_URL=http://ollama:11434
      - DATABASE_URL=postgres://ceredis:ceredis@postgres:5432/ceredis
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.backend.rule=Host(`api.ceredis.org`)"
      - "traefik.http.routers.backend.entrypoints=websecure"
      - "traefik.http.routers.backend.tls.certresolver=le"
    networks:
      - ceredis_public
      - ceredis_private
    depends_on:
      - postgres
      - cass
      - pocketbase

  ##########################
  # POCKETBASE
  ##########################
  pocketbase:
    image: ghcr.io/pocketbase/pocketbase:latest
    container_name: ceredis_pocketbase
    volumes:
      - pocketbase_data:/pb_data
    networks:
      - ceredis_private

  ##########################
  # POSTGRESQL (CEREDIS SQL)
  ##########################
  postgres:
    image: postgres:16
    container_name: ceredis_postgres
    environment:
      POSTGRES_DB: ceredis
      POSTGRES_USER: ceredis
      POSTGRES_PASSWORD: ceredis
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - ceredis_private

  ##########################
  # CaSS
  ##########################
  cass:
    image: cassproject/cass:latest
    container_name: ceredis_cass
    volumes:
      - cass_data:/opt/cass/data
    networks:
      - ceredis_private

  ##########################
  # RALPH (LRS)
  ##########################
  ralph:
    image: yetanalytics/ralph:latest
    container_name: ceredis_ralph
    volumes:
      - ralph_data:/data
    networks:
      - ceredis_private

  ##########################
  # GRAFANA
  ##########################
  grafana:
    image: grafana/grafana:latest
    container_name: ceredis_grafana
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - ceredis_private
    depends_on:
      - postgres

  ##########################
  # SUPERSET
  ##########################
  superset:
    image: apache/superset:latest
    container_name: ceredis_superset
    environment:
      - SUPERSET_SECRET_KEY=ceredis-secret
    volumes:
      - superset_data:/app/superset_home
    networks:
      - ceredis_private
    depends_on:
      - postgres

  ##########################
  # RSTUDIO SERVER
  ##########################
  rstudio:
    image: rocker/rstudio:latest
    container_name: ceredis_rstudio
    volumes:
      - rstudio_data:/home/rstudio
    networks:
      - ceredis_private

  ##########################
  # IA ADAPTATIVE (OLLAMA)
  ##########################
  ollama:
    image: ollama/ollama:latest
    container_name: ceredis_ollama
    volumes:
      - ollama_data:/root/.ollama
    networks:
      - ceredis_private
```

---

## 1. Points clés à comprendre immédiatement

### Réseaux

* **`ceredis_public`** : uniquement Frontend + Backend via Traefik
* **`ceredis_private`** : *tous les services sensibles*

### Sécurité

* aucune base de données exposée
* accès outils internes uniquement via :

  * SSH tunnel,
  * VPN,
  * ou port-forward Docker

---

## 2. Ce que ce `docker-compose` implémente

* séparation **fonctionnelle et sécuritaire**,
* alignement strict avec :

  * CaSS (évaluation),
  * CEREDIS SQL (calculs),
  * Learning Analytics,
  * RStudio (recherche),
  * IA adaptative (Ollama),
* prêt pour **audit institutionnel**.

---

## 3. Ce qui doit être adapté chez vous

* images `ceredis/frontend` et `ceredis/backend`
* noms de domaine (`app.ceredis.org`, `api.ceredis.org`)
* variables d’environnement (secrets !)
* configuration Traefik (email, DNS)

---

## 4. Bonnes pratiques recommandées

* stocker les secrets dans `.env`
* sauvegardes quotidiennes PostgreSQL
* logs centralisés (option phase 2)
* monitoring ressources (Grafana)

---

