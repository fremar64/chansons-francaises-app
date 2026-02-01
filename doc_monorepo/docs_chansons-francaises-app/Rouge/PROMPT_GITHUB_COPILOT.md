Voici un **prompt prêt à l’emploi pour GitHub Copilot**, rédigé comme un **prompt d’ingénierie logicielle pédagogique**, afin qu’il génère **un parcours complet (séances + écrans)** pour l’étude de la chanson **« Rouge »** dans votre application.

Le prompt est volontairement **structuré, contraignant et explicite**, afin d’obtenir un résultat exploitable immédiatement, conforme :

* au **CECRL**,
* à l’**approche par compétences**,
* à l’architecture **CEREDIS / CaSS**,
* et aux attentes de **bailleurs institutionnels**.

Vous pouvez le copier-coller tel quel dans Copilot Chat ou en commentaire racine d’un fichier.

---

# PROMPT GITHUB COPILOT

*(à coller intégralement)*

```text
You are working on an educational web application for learning French through the analysis of songs.

Context:
- Project name: CEREDIS – Français par la chanson
- Pedagogical approach: CECRL-aligned, competency-based, action-oriented
- Technical stack: structured JSON / TypeScript-compatible data files
- Target directory:
  /home/ceredis/chansons-francaises-app/data/parcours/rouge/

Your task:
Create a COMPLETE learning pathway (parcours pédagogique) for the song "Rouge" (Fredericks Goldman Jones, 1993).

The pathway must be structured into:
1) Pedagogical sessions (séances)
2) Screens (écrans) inside each session

The pathway must cover progressive CECRL levels:
- A2
- B1
- B2
- C1

General constraints:
- Do NOT generate UI components
- Do NOT generate backend logic
- ONLY generate structured pedagogical data (JSON or TS objects)
- The result must be directly usable by a front-end application
- Language of labels and instructions: French
- Comments in code: English (if needed)

Pedagogical requirements:
- Each session must target ONE CECRL level
- Each session must declare:
  - level (A2 / B1 / B2 / C1)
  - pedagogical objectives
  - targeted competencies
  - link to CECRL skills (comprehension, production, interaction, mediation)
- Each screen must declare:
  - type (listening, reading, comprehension, interpretation, debate, reflection)
  - instruction shown to learner
  - expected learner action
  - evidence type (for CaSS): choice, text, argument, reflection
  - evaluation mode (auto / guided / qualitative)

Conceptual focus of the song "Rouge":
- Collective ideals (justice, equality, peace)
- Utopia vs historical reality
- Symbolism of the color red
- Memory, transmission of values
- Distinction between ideals and their political implementations
- Critical thinking (non-dogmatic, non-propagandistic)

CECRL progression guidance:
- A2: global understanding, explicit values, simple opinion
- B1: explanation of symbols, guided justification
- B2: ideological and symbolic analysis, argumentation
- C1: historical, philosophical and critical interpretation, reflexivity

Expected output:
- Create a folder structure under:
  /home/ceredis/chansons-francaises-app/data/parcours/rouge/
- At minimum, generate:
  - index.ts (or index.json) describing the full parcours
  - one file per session (e.g. session-a2.ts, session-b1.ts, etc.)
- Each session file must export a structured object describing:
  - metadata
  - ordered list of screens
- Use clear, explicit field names
- Keep the structure consistent across sessions

Important:
This content will be audited by educational institutions and international partners.
Avoid political propaganda.
Always frame "Rouge" as a reflective, historical and symbolic work.

Generate the full content now.
```

---

## Pourquoi ce prompt est efficace

* Il **borne strictement** Copilot (ce qu’il doit / ne doit pas faire)
* Il encode votre **doctrine pédagogique** sans jargon inutile
* Il est **compatible CaSS** (evidence, competencies, levels)
* Il est **auditable institutionnellement**
* Il est **industrializable** (vous pourrez le réutiliser pour d’autres chansons)

---

