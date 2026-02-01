Parcours pédagogique — Rouge (Fredericks Goldman Jones)
=================================================

Usage
-----

- Ce dossier contient les sessions CECRL pour la chanson « Rouge ».
- Point d'entrée exporté: `index.ts` qui fournit l'objet `parcoursRouge`.

Audio
-----

- Le fichier audio MP3 est référencé dans `index.ts` via la propriété `audio.mp3`.
- Chemin public accessible depuis l'application : `/audio/chansons/jean-jacques-goldman/rouge.mp3`.

Conformité pédagogique
----------------------

- Chaque session cible un niveau CECRL unique (A2, B1, B2, C1).
- Preuves CaSS indiquées dans chaque écran: `choice`, `text`, `argument`, `reflection`.
- Le contenu présente la chanson comme objet d'analyse critique et historique — pas de propagande.

Intégration front-end
---------------------

- Importer `parcoursRouge` depuis `data/parcours/rouge/index.ts`.
- Utiliser `parcoursRouge.audio.mp3` pour définir la source audio du lecteur.

Notes pour l'audit
------------------

- Rédaction et instructions en français.
- Traces et preuves structurées pour l'export CaSS/xAPI.
