# 🚀 GUIDE DE DÉMARRAGE RAPIDE - Intégration CaSS & xAPI

## 🎯 Objectif

Ce guide vous permet de **démarrer rapidement l'intégration** des services CaSS et xAPI dans votre frontend React.

---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

- [x] Les 3 parcours importés dans PocketBase
- [x] Les services d'intégration créés (`src/services/integration/`)
- [x] Le référentiel CEREDIS dans CaSS
- [ ] **Clé API CaSS**
- [ ] **Credentials LRS Ralph**

---

## 📝 ÉTAPE 1 : Configuration (15 min)

### 1.1 Copier le fichier d'environnement

```bash
cd /home/ceredis/chansons-fran-aises-learner
cp .env.example .env
```

### 1.2 Obtenir les credentials

#### CaSS API Key

1. Se connecter à https://cass.ceredis.net
2. Aller dans **Settings** → **API Keys**
3. Cliquer sur **Generate New Key**
4. Copier la clé générée

#### Framework ID

1. Dans CaSS, aller dans **Frameworks**
2. Ouvrir **CEREDIS - Français par la chanson**
3. Copier l'ID du framework (dans l'URL ou les détails)

#### LRS Ralph

Les credentials vous ont été fournis lors de la création de l'instance LRS.

### 1.3 Remplir le fichier .env

```bash
# Éditer .env
nano .env
```

Remplir les valeurs :

```bash
# PocketBase (déjà configuré)
VITE_POCKETBASE_URL=https://pocketbase-songs.ceredis.net

# CaSS
VITE_CASS_API_URL=https://cass.ceredis.net/api
VITE_CASS_API_KEY=votre_cle_api_ici
VITE_CASS_FRAMEWORK_ID=votre_framework_id_ici

# LRS Ralph
VITE_LRS_URL=https://lrs.ceredis.net/xAPI
VITE_LRS_USERNAME=votre_username_ici
VITE_LRS_PASSWORD=votre_password_ici
```

### 1.4 Installer axios (si pas déjà fait)

```bash
npm install
```

---

## 🧪 ÉTAPE 2 : Tester la Connexion (5 min)

```bash
npm run test:integration
```

**Résultat attendu** :

```
╔════════════════════════════════════════════════════════════╗
║     TEST INTÉGRATION CaSS + xAPI - CEREDIS                ║
╚════════════════════════════════════════════════════════════╝

⚙️  Statut de l'intégration...
   CaSS:
      Configuré: ✅
      Activé: ✅
   xAPI:
      Configuré: ✅
      Activé: ✅

📚 Liste des compétences CEREDIS (Domaine 5)...
   A2 - 5.1: Identifier des formes grammaticales dans un texte
   B1 - 5.2: Relier une forme grammaticale à un effet de sens
   ...

📦 Test connexion CaSS...
   ✅ CaSS connecté
   ✅ 19 compétences trouvées dans le framework

📊 Test connexion xAPI (LRS Ralph)...
   ✅ LRS connecté

============================================================
📊 RÉSUMÉ
============================================================
✅ Tous les systèmes sont opérationnels !
```

Si tout est ✅, passez à l'étape suivante !

---

## 💻 ÉTAPE 3 : Premier Composant (30 min)

### 3.1 Exemple : Composant QCM

Créons un composant QCM qui track automatiquement.

```typescript
// src/components/activities/ActivityQCM.tsx

import { useState, useEffect } from 'react';
import { integrationService } from '@/services/integration';
import { pb } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ActivityQCMProps {
  activity: {
    id: string;
    enonce: string;
    options: string[];
    correct_answer: string;
    points: number;
    niveau: string;
  };
  userId: string;
  userName: string;
  chansonId: string;
  seanceId: string;
  onComplete: (result: any) => void;
}

export function ActivityQCM({
  activity,
  userId,
  userName,
  chansonId,
  seanceId,
  onComplete
}: ActivityQCMProps) {
  const [startTime] = useState<number>(Date.now());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Track start
  useEffect(() => {
    integrationService.trackActivityStart({
      userId,
      userName,
      activityId: activity.id,
      activityName: activity.enonce,
      activityType: 'qcm',
      chansonId,
      seanceId,
      niveau: activity.niveau as any
    });
  }, []);

  const handleSubmit = async () => {
    if (!selectedAnswer || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const isCorrect = selectedAnswer === activity.correct_answer;
      const score = isCorrect ? activity.points : 0;

      // 1. Sauvegarder dans PocketBase
      const reponse = await pb.collection('reponses').create({
        user: userId,
        activite: activity.id,
        seance: seanceId,
        reponse: selectedAnswer,
        score: score,
        duree: duration
      });

      // 2. Track avec CaSS + xAPI
      const integrationResult = await integrationService.trackActivityCompletion({
        userId,
        userName,
        activityId: activity.id,
        activityName: activity.enonce,
        activityType: 'qcm',
        chansonId,
        seanceId,
        niveau: activity.niveau as any,
        score,
        maxScore: activity.points,
        duration,
        response: selectedAnswer
      });

      console.log('✅ Intégration résultat:', integrationResult);

      setResult({
        isCorrect,
        score,
        cassAssertions: integrationResult.cassAssertions.length,
        xapiStatements: integrationResult.xapiStatements.length
      });

      onComplete({ isCorrect, score });

    } catch (error) {
      console.error('❌ Erreur soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="font-bold">
            {result.isCorrect ? '✅ Bonne réponse !' : '❌ Réponse incorrecte'}
          </h3>
          <p>Score: {result.score} / {activity.points}</p>
        </div>

        {result.cassAssertions > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm">
              🎓 {result.cassAssertions} compétence(s) validée(s) dans CaSS
            </p>
          </div>
        )}

        {result.xapiStatements > 0 && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm">
              📊 {result.xapiStatements} trace(s) xAPI enregistrée(s)
            </p>
          </div>
        )}

        <Button onClick={() => onComplete(result)}>
          Continuer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{activity.enonce}</h2>

      <RadioGroup value={selectedAnswer || ''} onValueChange={setSelectedAnswer}>
        {activity.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        onClick={handleSubmit}
        disabled={!selectedAnswer || isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Valider'}
      </Button>
    </div>
  );
}
```

### 3.2 Tester le composant

1. Importer le composant dans une page de séance
2. Compléter l'activité
3. Vérifier dans la console :
   - ✅ "Intégration résultat: { cassAssertions: 2, xapiStatements: 3, ... }"

4. Vérifier dans CaSS :
   - Aller sur https://cass.ceredis.net
   - Section "Assertions"
   - Chercher votre userId

5. Vérifier dans LRS (via Grafana quand configuré)

---

## 📊 ÉTAPE 4 : Dashboard Apprenant (Optionnel)

Créer une page qui affiche les compétences de l'apprenant.

```typescript
// src/pages/dashboard.tsx

import { useEffect, useState } from 'react';
import { integrationService } from '@/services/integration';
import { Card } from '@/components/ui/card';

export function DashboardPage({ userId }: { userId: string }) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [userId]);

  const loadDashboard = async () => {
    try {
      const data = await integrationService.getUserDashboard(userId);
      setDashboard(data);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!dashboard) return <div>Erreur chargement</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mon Tableau de Bord</h1>

      {/* Analytics xAPI */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">📊 Mon Activité</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Activités tentées</p>
            <p className="text-2xl font-bold">{dashboard.xapi.totalAttempts}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Activités complétées</p>
            <p className="text-2xl font-bold">{dashboard.xapi.totalCompleted}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Score moyen</p>
            <p className="text-2xl font-bold">
              {Math.round(dashboard.xapi.averageScore * 100)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Temps total</p>
            <p className="text-2xl font-bold">
              {Math.round(dashboard.xapi.totalDuration / 60)} min
            </p>
          </div>
        </div>
      </Card>

      {/* Compétences CaSS */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">🎓 Mes Compétences</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Compétences maîtrisées</span>
            <span className="font-bold text-green-600">
              {dashboard.cass.mastered}
            </span>
          </div>
          <div className="flex justify-between">
            <span>En cours d'acquisition</span>
            <span className="font-bold text-blue-600">
              {dashboard.cass.inProgress}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total compétences travaillées</span>
            <span className="font-bold">
              {dashboard.cass.totalCompetencies}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

---

## 🐛 DÉPANNAGE

### Problème : "CaSS désactivé (clé API manquante)"

**Solution** :
1. Vérifier `.env` contient `VITE_CASS_API_KEY`
2. Redémarrer le serveur dev : `npm run dev`

### Problème : "xAPI désactivé (credentials LRS manquants)"

**Solution** :
1. Vérifier `.env` contient `VITE_LRS_USERNAME` et `VITE_LRS_PASSWORD`
2. Redémarrer le serveur dev

### Problème : "Assertion non créée"

**Causes possibles** :
- Score < 60% (seuil minimum)
- Activité non mappée dans `MAPPING_ACTIVITES_COMPETENCES`
- Erreur API CaSS (voir console)

**Solution** :
- Vérifier le score de l'activité
- Consulter `src/services/integration/types.ts` pour voir les mappings

---

## ✅ CHECKLIST FINALE

- [ ] `.env` configuré avec toutes les clés
- [ ] `npm run test:integration` réussit
- [ ] Premier composant QCM fonctionne
- [ ] Assertion visible dans CaSS
- [ ] Statements visibles dans LRS (via API ou Grafana)
- [ ] Dashboard apprenant affiche les données

---

## 🎯 PROCHAINES ÉTAPES

Une fois ce guide complété :

1. **Généraliser** à tous les types d'activités :
   - Texte à trous
   - Production écrite
   - Journal réflexif

2. **Configurer Grafana** :
   - Dashboards temps réel
   - Alertes

3. **Configurer Superset** :
   - Rapports BI
   - Export données

4. **Tests end-to-end** :
   - Parcours complet apprenant
   - Validation enseignant

---

## 📚 RESSOURCES

- **Documentation complète** : `docs/ARCHITECTURE_INTEGRATION_CASS_XAPI.md`
- **Services README** : `src/services/integration/README.md`
- **Référentiel CEREDIS** : Documents de référence dans `uploads/`

---

**Bon développement ! 🚀**

Si vous rencontrez des difficultés, consultez les logs dans la console du navigateur et les fichiers de documentation.
