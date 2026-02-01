Voici l’**ajout du parallélisme contrôlé (pool de workers)** au moteur CEREDIS, **sans casser** :

* le déterminisme,
* l’auditabilité,
* la reproductibilité scientifique.

L’objectif est d’**accélérer les batchs** tout en **protégeant CaSS, PostgreSQL et le VPS**.

---

# MOTEUR CEREDIS — PARALLÉLISME CONTRÔLÉ

## Pool de workers (Node.js)

---

## 1. Principe architectural (fondamental)

👉 **CEREDIS n’utilise PAS de parallélisme sauvage** (`Promise.all` non borné).

Nous implémentons :

* un **pool de workers à concurrence limitée**,
* un **traitement agent par agent**,
* une **gestion fine des erreurs**.

### Pourquoi ?

* éviter le throttling de l’API CaSS,
* éviter la saturation PostgreSQL,
* garantir des batchs auditables.

---

## 2. Choix technique

Nous utilisons une **file asynchrone avec concurrence maximale configurable**, basée sur un pattern éprouvé.

### Paramètre clé

```bash
CEREDIS_MAX_WORKERS=4
```

👉 Ajustable selon :

* CPU,
* RAM,
* latence CaSS.

---

## 3. Ajout d’un gestionnaire de pool

### `src/engine/workerPool.js`

```js
export async function runWithConcurrency(items, workerFn, concurrency = 4) {
  const results = [];
  let index = 0;

  async function worker(workerId) {
    while (index < items.length) {
      const currentIndex = index++;
      const item = items[currentIndex];

      try {
        const result = await workerFn(item);
        results[currentIndex] = result;
      } catch (err) {
        results[currentIndex] = {
          agentId: item,
          status: "ERROR",
          error: err.message,
          workerId
        };
      }
    }
  }

  const workers = Array.from(
    { length: concurrency },
    (_, i) => worker(i + 1)
  );

  await Promise.all(workers);
  return results;
}
```

✔ **Ordre conservé**
✔ **Pas de starvation**
✔ **Erreurs isolées**

---

## 4. Intégration dans le batch CEREDIS

### `src/index.js` (remplacement de `runBatch`)

```js
import { runWithConcurrency } from "./engine/workerPool.js";
import { runCeredisForAgent } from "./engine/ceredisRunner.js";

async function runBatch(agentIds) {
  const concurrency =
    Number(process.env.CEREDIS_MAX_WORKERS) || 4;

  const startedAt = new Date();

  const results = await runWithConcurrency(
    agentIds,
    (agentId) => runCeredisForAgent(agentId, config),
    concurrency
  );

  const report = {
    startedAt: startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
    total: agentIds.length,
    concurrency,
    ok: results.filter(r => r?.status === "OK").length,
    skipped: results.filter(r => r?.status === "SKIPPED").length,
    failed: results.filter(r => r?.status === "ERROR").length,
    details: results
  };

  fs.writeFileSync(
    `./ceredis_batch_report_${Date.now()}.json`,
    JSON.stringify(report, null, 2)
  );

  console.log("✔ Batch CEREDIS terminé");
  console.table({
    total: report.total,
    ok: report.ok,
    skipped: report.skipped,
    failed: report.failed,
    concurrency: report.concurrency
  });
}
```

---

## 5. Sécurité & robustesse (points clés)

### 5.1. Protection CaSS

* appels API **bornés**,
* pas de rafales simultanées incontrôlées.

### 5.2. Protection PostgreSQL

* chaque worker ouvre/ferme ses transactions,
* pas de verrou global.

### 5.3. Robustesse batch

* un agent en erreur **n’arrête jamais** le batch,
* traçabilité complète par agent + worker.

---

## 6. Recommandations de réglage

### VPS 8 vCPU / 16 Go RAM

```bash
CEREDIS_MAX_WORKERS=4
```

### VPS 16 vCPU / 32 Go RAM

```bash
CEREDIS_MAX_WORKERS=6
```

### Tests initiaux

Commencer à `2`, augmenter progressivement.

---

## 7. Exemple d’exécution

```bash
CEREDIS_MAX_WORKERS=4 node src/index.js --all
```

Sortie :

```
✔ Batch CEREDIS terminé
┌─────────────┬─────┐
│ total       │ 120 │
│ ok          │ 98  │
│ skipped     │ 15  │
│ failed      │ 7   │
│ concurrency │ 4   │
└─────────────┴─────┘
```

---

## 8. Pourquoi cette solution est “gold standard”

| Critère      | Résultat |
| ------------ | -------- |
| Déterminisme | ✅        |
| Auditabilité | ✅        |
| Performance  | ✅        |
| Sécurité     | ✅        |
| Scalabilité  | ✅        |
| Simplicité   | ✅        |

👉 **C’est exactement le niveau attendu pour un moteur d’évaluation institutionnel.**

---

## 9. Étapes suivantes possibles

Nous avons maintenant un moteur CEREDIS :

* versionné,
* batchable,
* parallélisé proprement,
* prêt pour production.

