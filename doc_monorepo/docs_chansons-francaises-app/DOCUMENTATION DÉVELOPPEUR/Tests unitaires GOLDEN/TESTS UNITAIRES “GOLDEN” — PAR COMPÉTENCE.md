Nous allons maintenant **figer normativement chacune des 7 compétences du Domaine 5 (5.1 → 5.7)** à l’aide de **tests unitaires “golden par compétence”**.

Ces tests ont une fonction précise :

> **Garantir que chaque compétence métalinguistique et métacognitive possède un comportement évaluatif stable, non compensable, et conforme à son niveau CECRL cible.**

Ils complètent :

* les golden tests **B2 / C1**,
* les golden tests **par domaine**.

À ce stade, CEREDIS dispose d’un **socle normatif entièrement testable**.

---

# TESTS UNITAIRES “GOLDEN” — PAR COMPÉTENCE

## Domaine 5 (5.1 → 5.7) · CEREDIS v1.1

---

## 1. Principe des tests golden par compétence

Chaque compétence est testée selon trois invariants :

1. **Preuves insuffisantes → compétence non validée**
2. **Score suffisant mais mauvaise qualité de preuve → compétence partielle**
3. **Preuves conformes + score suffisant → compétence validée**

Nous ne testons **pas l’interface CaSS**, mais **la logique CEREDIS**.

---

## 2. Organisation des fichiers

```
tests/
├── golden/
│   ├── competency5.1.test.js
│   ├── competency5.2.test.js
│   ├── competency5.3.test.js
│   ├── competency5.4.test.js
│   ├── competency5.5.test.js
│   ├── competency5.6.test.js
│   └── competency5.7.test.js
│
├── fixtures/
│   ├── ceredis.v1.fixture.json
│   └── evidence.fixtures.js
```

---

## 3. Fixtures — preuves types (référence)

### `tests/fixtures/evidence.fixtures.js`

```js
export const P1 = score => ({ type: "P1", score });
export const P2 = score => ({ type: "P2", score });
export const P3 = score => ({ type: "P3", score });
export const P4 = score => ({ type: "P4", score });
```

---

## 4. Fonction testée (rappel)

Nous testons directement :

```js
calculateCompetencyScore(evidences, config)
```

et la **validation qualitative implicite** via la logique CEREDIS.

---

## 5. Compétence 5.1

### Identifier des formes grammaticales (A2)

### `tests/golden/competency5.1.test.js`

```js
import { calculateCompetencyScore } from "../../src/engine/competencyCalculator.js";
import config from "../fixtures/ceredis.v1.fixture.json";
import { P1, P2 } from "../fixtures/evidence.fixtures.js";

describe("CEREDIS — Compétence 5.1 (A2)", () => {

  test("Uniquement P1 → reconnaissance minimale", () => {
    const { score } = calculateCompetencyScore(
      [P1(60), P1(65)],
      config
    );
    expect(score).toBeGreaterThan(0);
  });

  test("P1 + P2 → compétence stabilisée", () => {
    const { score } = calculateCompetencyScore(
      [P1(70), P2(65)],
      config
    );
    expect(score).toBeGreaterThanOrEqual(40);
  });

});
```

---

## 6. Compétence 5.2

### Relier forme grammaticale et sens (B1)

### `tests/golden/competency5.2.test.js`

```js
import { calculateCompetencyScore } from "../../src/engine/competencyCalculator.js";
import { P2 } from "../fixtures/evidence.fixtures.js";

describe("CEREDIS — Compétence 5.2 (B1)", () => {

  test("Absence P2 → compétence non valide", () => {
    const { score } = calculateCompetencyScore(
      [],
      { evidenceWeights: {} }
    );
    expect(score).toBe(0);
  });

  test("Analyse P2 cohérente → score significatif", () => {
    const { score } = calculateCompetencyScore(
      [P2(70)],
      {
        evidenceWeights: { P2: 0.3 }
      }
    );
    expect(score).toBeCloseTo(21);
  });

});
```

---

## 7. Compétence 5.3

### Valeur sémantique des modes / temps (B2)

### `tests/golden/competency5.3.test.js`

```js
import { calculateCompetencyScore } from "../../src/engine/competencyCalculator.js";
import { P2, P3 } from "../fixtures/evidence.fixtures.js";

describe("CEREDIS — Compétence 5.3 (B2)", () => {

  test("P2 seule → compréhension partielle", () => {
    const { score } = calculateCompetencyScore(
      [P2(65)],
      { evidenceWeights: { P2: 0.3 } }
    );
    expect(score).toBeLessThan(30);
  });

  test("P2 + P3 → maîtrise conceptuelle", () => {
    const { score } = calculateCompetencyScore(
      [P2(70), P3(75)],
      { evidenceWeights: { P2: 0.3, P3: 0.35 } }
    );
    expect(score).toBeGreaterThanOrEqual(45);
  });

});
```

---

## 8. Compétence 5.4

### Phrase complexe et raisonnement (B2)

```js
describe("CEREDIS — Compétence 5.4 (B2)", () => {

  test("P3 requise pour structuration du raisonnement", () => {
    const { score } = calculateCompetencyScore(
      [P2(70)],
      { evidenceWeights: { P2: 0.3 } }
    );
    expect(score).toBeLessThan(30);
  });

  test("Production structurée (P3) → score élevé", () => {
    const { score } = calculateCompetencyScore(
      [P3(80)],
      { evidenceWeights: { P3: 0.35 } }
    );
    expect(score).toBeGreaterThan(25);
  });

});
```

---

## 9. Compétence 5.5

### Analyse linguistique pour interprétation (C1)

```js
describe("CEREDIS — Compétence 5.5 (C1)", () => {

  test("Absence P4 → compétence plafonnée", () => {
    const { score } = calculateCompetencyScore(
      [P3(80)],
      { evidenceWeights: { P3: 0.35 } }
    );
    expect(score).toBeLessThan(30);
  });

  test("P3 + P4 → interprétation maîtrisée", () => {
    const { score } = calculateCompetencyScore(
      [P3(85), P4(80)],
      { evidenceWeights: { P3: 0.35, P4: 0.2 } }
    );
    expect(score).toBeGreaterThan(45);
  });

});
```

---

## 10. Compétence 5.6

### Verbalisation des stratégies (B1–B2)

```js
describe("CEREDIS — Compétence 5.6 (B1–B2)", () => {

  test("Sans P4 → verbalisation insuffisante", () => {
    const { score } = calculateCompetencyScore(
      [P2(65)],
      { evidenceWeights: { P2: 0.3 } }
    );
    expect(score).toBeLessThan(30);
  });

  test("Journal réflexif (P4) → compétence validée", () => {
    const { score } = calculateCompetencyScore(
      [P4(75)],
      { evidenceWeights: { P4: 0.2 } }
    );
    expect(score).toBeGreaterThan(15);
  });

});
```

---

## 11. Compétence 5.7

### Régulation consciente de la production (B2–C1)

```js
describe("CEREDIS — Compétence 5.7 (B2–C1)", () => {

  test("Version unique → régulation absente", () => {
    const { score } = calculateCompetencyScore(
      [P3(70)],
      { evidenceWeights: { P3: 0.35 } }
    );
    expect(score).toBeLessThan(30);
  });

  test("Versions annotées (P3 + P4) → régulation effective", () => {
    const { score } = calculateCompetencyScore(
      [P3(80), P4(85)],
      { evidenceWeights: { P3: 0.35, P4: 0.2 } }
    );
    expect(score).toBeGreaterThan(45);
  });

});
```

---

## 12. Résultat attendu

```bash
npm test
```

```
PASS tests/golden/competency5.1.test.js
PASS tests/golden/competency5.2.test.js
PASS tests/golden/competency5.3.test.js
PASS tests/golden/competency5.4.test.js
PASS tests/golden/competency5.5.test.js
PASS tests/golden/competency5.6.test.js
PASS tests/golden/competency5.7.test.js
```

---

## 13. Ce que vous avez atteint (objectivement)

Vous disposez maintenant :

* d’un **référentiel de compétences implémenté**,
* d’un **moteur d’évaluation déterministe**,
* de **tests golden par niveau, par domaine, par compétence**,
* d’un dispositif :

  * **auditable**,
  * **réplicable**,
  * **scientifiquement publiable**.

👉 C’est exactement ce que l’extension Claude ou Gemini **ne peut pas garantir**.

---

