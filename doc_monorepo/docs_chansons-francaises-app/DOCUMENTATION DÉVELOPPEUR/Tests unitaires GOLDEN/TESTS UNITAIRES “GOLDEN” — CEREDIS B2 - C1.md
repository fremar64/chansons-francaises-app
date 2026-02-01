Voici les **tests unitaires “golden tests” B2 / C1** pour le moteur CEREDIS, conçus comme des **tests de référence normatifs** : ils ne testent pas “le code”, ils testent **la validité institutionnelle des décisions**.

Objectifs explicites :

* figer **le comportement attendu** du moteur,
* empêcher toute régression (future modification du code ou de la config),
* fournir une **preuve testable** pour audit scientifique / bailleurs.

---

# TESTS UNITAIRES “GOLDEN” — CEREDIS B2 / C1

## Node.js · Jest

---

## 1. Principe des “golden tests”

Un *golden test* vérifie que :

> **À données identiques, la décision CECRL est immuable.**

Ici, chaque test correspond à un **cas normatif documenté** :

* score suffisant MAIS condition qualitative manquante → **plafonnement**
* score + preuves + domaines conformes → **validation**

---

## 2. Pré-requis

### 2.1. Dépendances

```bash
npm install --save-dev jest
```

### 2.2. Configuration Jest (`package.json`)

```json
{
  "scripts": {
    "test": "jest"
  },
  "type": "module"
}
```

---

## 3. Organisation des tests

```
tests/
├── golden/
│   ├── b2.rules.test.js
│   └── c1.rules.test.js
└── fixtures/
    └── ceredis.v1.fixture.json
```

---

## 4. Fixture CEREDIS (référence figée)

### `tests/fixtures/ceredis.v1.fixture.json`

```json
{
  "version": "1.0",
  "cecrlThresholds": {
    "A2": [200, 299],
    "B1": [300, 399],
    "B2": [400, 499],
    "C1": [500, 599]
  },
  "levels": {
    "B2": {
      "minScore": 400,
      "requiredEvidenceTypes": ["P3"],
      "requiredDomains": {
        "D5": { "minScore": 60 }
      }
    },
    "C1": {
      "minScore": 500,
      "requiredEvidenceTypes": ["P3", "P4"],
      "requiredDomains": {
        "D5": { "minScore": 70 }
      }
    }
  }
}
```

👉 **Cette fixture ne doit jamais être modifiée sans décision scientifique.**

---

## 5. Tests golden — niveau B2

### `tests/golden/b2.rules.test.js`

```js
import { decideCECRLStrict } from "../../src/engine/cecrlDecider.js";
import config from "../fixtures/ceredis.v1.fixture.json";

describe("CEREDIS — Golden tests B2", () => {

  test("Score B2 mais absence de P3 → plafonné B1", () => {
    const level = decideCECRLStrict(
      430,
      { D5: 75 },
      ["P1", "P2"],
      config
    );

    expect(level).toBe("B1");
  });

  test("Score B2 + P3 + Domaine 5 >= 60 → B2 validé", () => {
    const level = decideCECRLStrict(
      420,
      { D5: 62 },
      ["P2", "P3"],
      config
    );

    expect(level).toBe("B2");
  });

  test("Score B2 + P3 mais Domaine 5 insuffisant → B1", () => {
    const level = decideCECRLStrict(
      450,
      { D5: 55 },
      ["P3"],
      config
    );

    expect(level).toBe("B1");
  });

});
```

---

## 6. Tests golden — niveau C1

### `tests/golden/c1.rules.test.js`

```js
import { decideCECRLStrict } from "../../src/engine/cecrlDecider.js";
import config from "../fixtures/ceredis.v1.fixture.json";

describe("CEREDIS — Golden tests C1", () => {

  test("Score C1 sans P4 → plafonné B2", () => {
    const level = decideCECRLStrict(
      520,
      { D5: 75 },
      ["P3"],
      config
    );

    expect(level).toBe("B2");
  });

  test("Score C1 + P3 + P4 mais Domaine 5 < 70 → B2", () => {
    const level = decideCECRLStrict(
      510,
      { D5: 65 },
      ["P3", "P4"],
      config
    );

    expect(level).toBe("B2");
  });

  test("Score C1 + P3 + P4 + Domaine 5 >= 70 → C1 validé", () => {
    const level = decideCECRLStrict(
      540,
      { D5: 72 },
      ["P3", "P4"],
      config
    );

    expect(level).toBe("C1");
  });

});
```

---

## 7. Test de non-régression critique

### Cas limite — score très élevé sans métacognition

```js
test("Score extrême sans P4 → jamais C1", () => {
  const level = decideCECRLStrict(
    590,
    { D5: 90 },
    ["P3"],
    config
  );

  expect(level).toBe("B2");
});
```

👉 **Ce test protège la philosophie CEREDIS.**

---

## 8. Exécution

```bash
npm test
```

Sortie attendue :

```
PASS  tests/golden/b2.rules.test.js
PASS  tests/golden/c1.rules.test.js

Test Suites: 2 passed
Tests:       7 passed
```

---

## 9. Valeur scientifique et institutionnelle

Ces tests :

* figent la **doctrine CEREDIS**,
* empêchent toute dérive opportuniste (“gonfler les niveaux”),
* constituent une **preuve formelle de conformité CECRL enrichie**,
* peuvent être cités dans :

  * un article scientifique,
  * un audit bailleurs,
  * une documentation réglementaire.

👉 Peu de projets éducatifs disposent de *golden tests normatifs*.

---

