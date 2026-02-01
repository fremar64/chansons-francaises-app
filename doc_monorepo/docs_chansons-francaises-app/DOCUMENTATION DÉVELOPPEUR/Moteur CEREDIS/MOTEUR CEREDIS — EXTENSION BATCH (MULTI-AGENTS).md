Voici **l’extension du moteur CEREDIS v1 pour la gestion multi-agents (batch)**, conçue pour être :

* **robuste** (pas d’effet domino si un agent échoue),
* **scalable** (dizaines → milliers d’apprenants),
* **audit-friendly** (journal par agent),
* **automatisable** (cron, Coolify, CI).

Je vous donne **le design**, puis **le code prêt à intégrer**, sans remettre en cause ce qui existe déjà.

---

# MOTEUR CEREDIS — EXTENSION BATCH (MULTI-AGENTS)

---

## 1. Principe de fonctionnement (batch)

Le moteur peut désormais être exécuté selon trois modes :

```bash
node src/index.js --agent <AGENT_ID>
node src/index.js --all
node src/index.js --file agents.txt
```

| Mode      | Usage                               |
| --------- | ----------------------------------- |
| `--agent` | recalcul ciblé (debug, élève)       |
| `--all`   | recalcul global (batch nocturne)    |
| `--file`  | recalcul contrôlé (classe, cohorte) |

---

## 2. Hypothèses techniques

* La liste des agents peut provenir :

  * de **CaSS**,
  * ou de **PocketBase**,
  * ou d’un **fichier texte / CSV**.
* Le moteur :

  * **continue même si un agent échoue**,
  * journalise chaque résultat.

---

## 3. Ajout : récupération des agents

### `src/cass/cassClient.js` (extension)

```js
export async function getAllAgents() {
  const res = await fetch(`${process.env.CASS_URL}/api/agents`);
  if (!res.ok) {
    throw new Error(`CaSS API error ${res.status}`);
  }
  return await res.json(); // [{ id: "...", name: ... }]
}
```

---

## 4. Ajout : runner CEREDIS par agent

### `src/engine/ceredisRunner.js`

```js
import { getEvidenceForAgent } from "../cass/cassClient.js";
import { aggregateEvidence } from "./evidenceAggregator.js";
import { calculateCompetencyScore } from "./competencyCalculator.js";
import { calculateDomainScore } from "./domainCalculator.js";
import { calculateCeredisScore } from "./ceredisCalculator.js";
import { decideCECRL } from "./cecrlDecider.js";
import { writeResults } from "../persistence/postgresWriter.js";

export async function runCeredisForAgent(agentId, config) {
  const evidences = await getEvidenceForAgent(agentId);

  if (evidences.length === 0) {
    return { agentId, status: "SKIPPED", reason: "no evidence" };
  }

  const grouped = aggregateEvidence(evidences);

  const competencyScores = {};
  for (const [cid, evs] of Object.entries(grouped)) {
    competencyScores[cid] = calculateCompetencyScore(evs, config);
  }

  const domainScores = {};
  for (const [did, dconf] of Object.entries(config.domains)) {
    const score = calculateDomainScore(dconf, competencyScores);
    if (score !== null) domainScores[did] = score;
  }

  const ceredisScore = calculateCeredisScore(domainScores, config);
  const cecrl = decideCECRL(ceredisScore, config.cecrlThresholds);

  await writeResults(
    agentId,
    { score: ceredisScore, cecrl },
    { version: config.version }
  );

  return {
    agentId,
    status: "OK",
    ceredisScore,
    cecrl
  };
}
```

---

## 5. Nouveau point d’entrée CLI (batch-aware)

### `src/index.js` (remplacement contrôlé)

```js
import fs from "fs";
import { getAllAgents } from "./cass/cassClient.js";
import { runCeredisForAgent } from "./engine/ceredisRunner.js";

const config = JSON.parse(
  fs.readFileSync("./config/ceredis.v1.json", "utf8")
);

const args = process.argv.slice(2);

async function runBatch(agentIds) {
  const report = {
    startedAt: new Date().toISOString(),
    total: agentIds.length,
    ok: 0,
    skipped: 0,
    failed: 0,
    details: []
  };

  for (const agentId of agentIds) {
    try {
      const result = await runCeredisForAgent(agentId, config);
      report.details.push(result);

      if (result.status === "OK") report.ok++;
      else if (result.status === "SKIPPED") report.skipped++;
    } catch (err) {
      report.failed++;
      report.details.push({
        agentId,
        status: "ERROR",
        error: err.message
      });
    }
  }

  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(
    `./ceredis_batch_report_${Date.now()}.json`,
    JSON.stringify(report, null, 2)
  );

  console.log("Batch CEREDIS terminé :", report);
}

(async () => {
  if (args[0] === "--agent") {
    await runBatch([args[1]]);
  }

  else if (args[0] === "--all") {
    const agents = await getAllAgents();
    await runBatch(agents.map(a => a.id));
  }

  else if (args[0] === "--file") {
    const file = fs.readFileSync(args[1], "utf8");
    const agentIds = file.split(/\r?\n/).filter(Boolean);
    await runBatch(agentIds);
  }

  else {
    console.error(`
Usage:
  node src/index.js --agent <AGENT_ID>
  node src/index.js --all
  node src/index.js --file agents.txt
`);
    process.exit(1);
  }
})();
```

---

## 6. Journal de batch (audit institutionnel)

Chaque exécution produit un fichier :

```json
{
  "startedAt": "...",
  "total": 120,
  "ok": 98,
  "skipped": 15,
  "failed": 7,
  "details": [
    {
      "agentId": "a1",
      "status": "OK",
      "ceredisScore": 412,
      "cecrl": "B2"
    },
    {
      "agentId": "a2",
      "status": "SKIPPED",
      "reason": "no evidence"
    }
  ]
}
```

👉 **Parfait pour audit, recherche, bailleurs.**

---

## 7. Automatisation (exemples)

### Cron nocturne

```bash
0 2 * * * cd /opt/ceredis-engine && node src/index.js --all
```

### Coolify / CI

```bash
node src/index.js --file cohort_april.txt
```

---

## 8. Pourquoi cette extension est solide

* aucun agent ne bloque le batch,
* résultats reproductibles,
* traçabilité complète,
* séparation claire calcul / orchestration,
* montée en charge progressive possible.

---

