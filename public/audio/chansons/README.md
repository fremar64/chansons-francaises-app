# Dossier des fichiers audio

Ce dossier contient les fichiers MP3 des chansons françaises utilisées dans l'application.

## Structure recommandée

```
public/audio/chansons/
├── jean-jacques-goldman/
│   ├── cest-ta-chance.mp3
│   ├── le-coureur.mp3
│   ├── la-bas.mp3
│   └── ne-en-17-a-leidenstadt.mp3
├── francis-cabrel/
│   └── la-corrida.mp3
├── edith-piaf/
│   └── la-vie-en-rose.mp3
└── ...
```

## Accès aux fichiers

Dans Next.js, les fichiers du dossier `public/` sont accessibles directement à la racine :

```typescript
// Pour un fichier situé à public/audio/chansons/jean-jacques-goldman/le-coureur.mp3
const audioUrl = "/audio/chansons/jean-jacques-goldman/le-coureur.mp3";
```

## Format recommandé

- **Format** : MP3 (compatibilité maximale)
- **Bitrate** : 192 kbps (bon compromis qualité/taille)
- **Échantillonnage** : 44.1 kHz

## Convention de nommage

- Utiliser des minuscules
- Remplacer les espaces par des tirets
- Pas d'accents ni de caractères spéciaux
- Format : `nom-de-la-chanson.mp3`

## Note importante

Les fichiers audio ne sont PAS versionnés dans Git (trop volumineux).
Ajoutez-les manuellement après avoir cloné le projet.
