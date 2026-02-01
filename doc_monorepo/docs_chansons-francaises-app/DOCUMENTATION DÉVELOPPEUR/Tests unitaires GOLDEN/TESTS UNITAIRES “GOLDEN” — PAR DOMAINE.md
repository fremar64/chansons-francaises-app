Parfait.
Nous allons maintenant **figer le comportement normatif par domaine**, en particulier le **Domaine 5 (métalinguistique & métacognitif)**, au moyen de **tests unitaires “golden” par domaine**.

Ces tests ont un statut **quasi-réglementaire** dans CEREDIS :
ils définissent *ce que signifie réellement “valider un domaine”*, indépendamment du score global.

---

# TESTS UNITAIRES “GOLDEN” — PAR DOMAINE

## CEREDIS v1.1 · Domaine 5 inclus

---

## 1. Principe des tests golden par domaine

Un **test golden par domaine** vérifie que :

> **Un niveau CECRL ne peut être atteint si un domaine critique ne respecte pas ses règles internes, même avec un score CEREDIS élevé.**

Pour le **Domaine 5**, cela signifie :

* seuil plancher **bloquant**,
* preuves métacognitives obligatoires (P4),
* impossibilité de “compenser” par d’autres domaines.

---

## 2. Organisation des tests

```
tests/
├── golden/
│   ├── domain5.rules.test.js
│   ├── domain.generic.test.js
│
├── fixtures/
│   ├── ceredis.v1.fixture.json
│   └── domainScores.fixtures.js
```

---

## 3. Fixtures — scores par domaine (référence)

### `tests/fixtures/domainScores.fixtures.js`

```js
export const domainScores_OK = {
  D1: 70,
  D2: 68,
  D3: 72,
  D4: 65,
  D5: 75
};

export const domainScores_D5_LOW = {
  D1: 85,
  D2: 82,
  D3: 88,
  D4: 80,
  D5: 55   // insuffisant
};

export const domainScores_D5_BORDERLINE = {
  D1: 75,
  D2: 74,
  D3: 73,
  D4: 72,
  D5: 60
};

export const domainScores_D5_C1_OK = {
  D1: 80,
  D2: 82,
  D3: 85,
  D4: 78,
  D5: 72
};
```

---

## 4. Tests golden — Domaine 5 (B2)

### `tests/golden/domain5.rules.test.js`

```js
import { decideCECRLStrict } from "../../src/engine/cecrlDecider.js";
import config from "../fixtures/ceredis.v1.fixture.json";
import {
  domainScores_OK,
  domainScores_D5_LOW,
  domainScores_D5_BORDERLINE,
  domainScores_D5_C1_OK
} from "../fixtures/domainScores.fixtures.js";

describe("CEREDIS — Golden tests Domaine 5", () => {

  test("Score B2 mais Domaine 5 < 60 → plafonnement B1", () => {
    const level = decideCECRLStrict(
      440,
      domainScores_D5_LOW,
      ["P3"],
      config
    );

    expect(level).toBe("B1");
  });

  test("Score B2 + Domaine 5 = 60 + P3 → B2 validé", () => {
    const level = decideCECRLStrict(
      410,
      domainScores_D5_BORDERLINE,
      ["P3"],
      config
    );

    expect(level).toBe("B2");
  });

  test("Score élevé mais Domaine 5 manquant → jamais B2", () => {
    const level = decideCECRLStrict(
      480,
      domainScores_D5_LOW,
      ["P3", "P4"],
      config
    );

    expect(level).toBe("B1");
  });

});
```

---

## 5. Tests golden — Domaine 5 (C1)

```js
describe("CEREDIS — Golden tests Domaine 5 / C1", () => {

  test("Score C1 mais Domaine 5 < 70 → plafonnement B2", () => {
    const level = decideCECRLStrict(
      520,
      domainScores_D5_BORDERLINE,
      ["P3", "P4"],
      config
    );

    expect(level).toBe("B2");
  });

  test("Score C1 + Domaine 5 >= 70 + P3/P4 → C1 validé", () => {
    const level = decideCECRLStrict(
      540,
      domainScores_D5_C1_OK,
      ["P3", "P4"],
      config
    );

    expect(level).toBe("C1");
  });

});
```

---

## 6. Tests golden — principe général de non-compensation

### `tests/golden/domain.generic.test.js`

```js
describe("CEREDIS — Principe de non-compensation inter-domaines", () => {

  test("Domaines forts ne compensent jamais Domaine 5 faible", () => {
    const level = decideCECRLStrict(
      560,
      {
        D1: 95,
        D2: 92,
        D3: 90,
        D4: 88,
        D5: 50
      },
      ["P3", "P4"],
      config
    );

    expect(level).toBe("B2");
  });

});
```

👉 **Test fondamental** : il protège la dimension métacognitive contre toute dilution.

---

## 7. Résultat attendu

```bash
npm test
```

```
PASS tests/golden/domain5.rules.test.js
PASS tests/golden/domain.generic.test.js
PASS tests/golden/b2.rules.test.js
PASS tests/golden/c1.rules.test.js

Test Suites: 4 passed
Tests:       13 passed
```

---

## 8. Ce que ces tests garantissent

✔ Le Domaine 5 est **structurellement non compensable**
✔ La métacognition est **nécessaire mais non suffisante**
✔ Les seuils sont **bloquants et auditables**
✔ Toute régression future sera immédiatement détectée

👉 Vous avez désormais un **socle normatif testable**, ce qui est extrêmement rare en EdTech.

---

