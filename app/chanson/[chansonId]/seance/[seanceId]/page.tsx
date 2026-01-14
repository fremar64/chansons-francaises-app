'use client';

/**
 * PAGE DE SÉANCE - Version avec tracking CEREDIS complet
 * 
 * Cette page utilise les vrais composants d'activités avec :
 * - Tracking xAPI automatique
 * - Assertions CaSS pour les compétences
 * - Règles Domaine 5 (métacognition)
 */

import { useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  Music2,
  BookOpen,
  Trophy,
  Clock,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Composants d'activités avec tracking CEREDIS
import { 
  QuizQCM, 
  QuizQCMJustifie,
  TexteATrous, 
  OrdreElements,
  EcranIntroduction, 
  TexteLibre, 
  JournalReflexif,
  EcouteChanson
} from '@/components/activities';

// Hooks et types
import { useSeance } from '@/hooks/useSeances';
import { useChansons } from '@/hooks/useChansons';
import type { Ecran, TypeEcran, QuestionQCM, ActiviteData, TexteATrousData, OrdreElementsData } from '@/types/seance';
import type { EcranCeredis, CeredisMetadata } from '@/types/ceredis';
import type { NiveauCECRL } from '@/services/integration-unified/types.unified';
import { cn } from '@/lib/utils';

// ============================================
// CONFIGURATION UTILISATEUR TEMPORAIRE
// ============================================
// TODO: Remplacer par un vrai système d'authentification
const TEMP_USER = {
  id: 'user-temp-123',
  name: 'Apprenant Test'
};

// ============================================
// HELPERS
// ============================================

/**
 * Extrait le contenu texte d'une activité de manière type-safe
 */
function getActiviteContenu(activite: ActiviteData): string {
  if ('contenu' in activite && typeof activite.contenu === 'string') {
    return activite.contenu;
  }
  return '';
}

/**
 * Crée les métadonnées d'activité pour le tracking
 */
function createActivityMetadata(
  ecran: Ecran | EcranCeredis,
  chansonId: string,
  seanceId: string
): {
  activityId: string;
  activityName: string;
  chansonId: string;
  seanceId: string;
  ceredis: CeredisMetadata;
  niveau: NiveauCECRL;
} {
  // Utiliser les métadonnées CEREDIS si disponibles
  const ceredisMetadata = 'ceredis' in ecran ? ecran.ceredis : null;
  
  return {
    activityId: ecran.id,
    activityName: ecran.titre,
    chansonId,
    seanceId,
    ceredis: ceredisMetadata || {
      competencies: [],
      evidenceType: 'P1' as const,
      domaine: 'D1' as const,
      niveau: 'A2' as const,
      scoreMax: 100
    },
    niveau: (ceredisMetadata?.niveau || 'A2') as NiveauCECRL
  };
}

// ============================================
// PAGE PRINCIPALE
// ============================================

export default function SeancePlayerPage() {
  const params = useParams<{ chansonId: string; seanceId: string }>();
  const router = useRouter();
  const chansonId = params?.chansonId || '';
  const seanceId = params?.seanceId || '';
  
  // Charger la séance et la chanson
  const { seance, seanceCeredis, hasSeances } = useSeance(chansonId, seanceId);
  const { chansons } = useChansons();
  const chanson = chansons.find(c => c.slug === chansonId || c.id === chansonId);
  
  // États de navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedEcrans, setCompletedEcrans] = useState<Set<string>>(new Set());
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Écrans de la séance (préférer les écrans CEREDIS si disponibles)
  const ecrans = seanceCeredis?.ecrans || seance?.ecrans || [];
  const currentEcran = ecrans[currentIndex];
  const progress = ecrans.length > 0 ? (completedEcrans.size / ecrans.length) * 100 : 0;
  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const avgScore = Object.keys(scores).length > 0 
    ? Math.round(totalScore / Object.keys(scores).length) 
    : 0;

  // Gérer la complétion d'un écran
  const handleEcranComplete = useCallback((score: number = 100) => {
    if (!currentEcran) return;
    
    setCompletedEcrans(prev => new Set([...prev, currentEcran.id]));
    setScores(prev => ({ ...prev, [currentEcran.id]: score }));
    
    // Passer à l'écran suivant après un délai
    setTimeout(() => {
      if (currentIndex < ecrans.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  }, [currentEcran, currentIndex, ecrans.length]);

  // Naviguer vers l'écran précédent
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Rendu de l'écran courant avec les vrais composants CEREDIS
  const renderEcran = () => {
    if (!currentEcran) return null;

    const type = currentEcran.type as TypeEcran;
    const metadata = createActivityMetadata(currentEcran, chansonId, seance?.id || seanceId);
    const userId = TEMP_USER.id;
    const userName = TEMP_USER.name;

    switch (type) {
      // Écrans d'introduction et bilan
      case 'introduction':
      case 'bilan':
        return (
          <EcranIntroduction 
            contenu={getActiviteContenu(currentEcran.activite)}
            type={type}
            metadata={metadata}
            userId={userId}
            userName={userName}
            onComplete={() => handleEcranComplete(100)}
            debug={process.env.NODE_ENV === 'development'}
          />
        );
      
      // Écrans d'écoute
      case 'ecoute_decouverte':
      case 'ecoute_ciblee':
      case 'ecoute_guidee':
        return (
          <EcouteChanson 
            data={{
              id: currentEcran.id,
              titre: chanson?.titre || 'Chanson',
              artiste: chanson?.artiste || 'Artiste',
              audioUrl: chanson?.audioUrl || '',
              type: type === 'ecoute_decouverte' ? 'ecoute_decouverte' : 'ecoute_ciblee',
              consigne: currentEcran.consigne,
              audioDebut: currentEcran.audioDebut,
              audioFin: currentEcran.audioFin,
            }}
            metadata={metadata}
            userId={userId}
            userName={userName}
            onComplete={() => handleEcranComplete(100)}
            debug={process.env.NODE_ENV === 'development'}
          />
        );
      
      // Quiz QCM standard
      case 'quiz_qcm': {
        const activite = currentEcran.activite;
        if ('questions' in activite && Array.isArray(activite.questions)) {
          return (
            <QuizQCM 
              questions={activite.questions as QuestionQCM[]}
              metadata={metadata}
              userId={userId}
              userName={userName}
              onComplete={handleEcranComplete}
              debug={process.env.NODE_ENV === 'development'}
            />
          );
        }
        return <FallbackEcran type={type} onComplete={() => handleEcranComplete(100)} />;
      }
      
      // Quiz QCM avec justification
      case 'quiz_qcm_justifie': {
        const activite = currentEcran.activite;
        if ('questions' in activite && Array.isArray(activite.questions)) {
          return (
            <QuizQCMJustifie 
              questions={activite.questions}
              metadata={metadata}
              userId={userId}
              userName={userName}
              onComplete={handleEcranComplete}
              debug={process.env.NODE_ENV === 'development'}
            />
          );
        }
        return <FallbackEcran type={type} onComplete={() => handleEcranComplete(100)} />;
      }
      
      // Texte à trous
      case 'texte_a_trous': {
        const activite = currentEcran.activite;
        if ('exercice' in activite && activite.type === 'texte_a_trous') {
          return (
            <TexteATrous 
              exercice={activite.exercice as TexteATrousData}
              metadata={metadata}
              userId={userId}
              userName={userName}
              onComplete={handleEcranComplete}
              debug={process.env.NODE_ENV === 'development'}
            />
          );
        }
        return <FallbackEcran type={type} onComplete={() => handleEcranComplete(100)} />;
      }
      
      // Ordre des éléments
      case 'ordre_elements': {
        const activite = currentEcran.activite;
        if ('exercice' in activite && activite.type === 'ordre_elements') {
          return (
            <OrdreElements 
              exercice={activite.exercice as OrdreElementsData}
              metadata={metadata}
              userId={userId}
              userName={userName}
              onComplete={handleEcranComplete}
              debug={process.env.NODE_ENV === 'development'}
            />
          );
        }
        return <FallbackEcran type={type} onComplete={() => handleEcranComplete(100)} />;
      }
      
      // Production écrite libre
      case 'texte_libre':
      case 'production_ecrite': {
        const activite = currentEcran.activite;
        const exerciceData = 'exercice' in activite ? activite.exercice : null;
        return (
          <TexteLibre 
            exercice={{
              id: currentEcran.id,
              consigne: currentEcran.consigne,
              contexte: getActiviteContenu(currentEcran.activite),
              nombreMotsMin: (exerciceData as any)?.nombreMotsMin || 50,
              nombreMotsMax: (exerciceData as any)?.nombreMotsMax || 300,
            }}
            metadata={metadata}
            userId={userId}
            userName={userName}
            onComplete={handleEcranComplete}
            debug={process.env.NODE_ENV === 'development'}
          />
        );
      }
      
      // Journal réflexif (métacognition - Domaine 5)
      case 'journal_reflexif': {
        const activite = currentEcran.activite;
        const exerciceData = 'exercice' in activite ? activite.exercice : null;
        return (
          <JournalReflexif 
            exercice={{
              id: currentEcran.id,
              questionPrincipale: currentEcran.consigne,
              contexte: getActiviteContenu(currentEcran.activite),
              nombreMotsMin: (exerciceData as any)?.nombreMotsMin || 30,
            }}
            metadata={metadata}
            userId={userId}
            userName={userName}
            onComplete={handleEcranComplete}
            debug={process.env.NODE_ENV === 'development'}
          />
        );
      }
      
      // Types non encore implémentés - afficher comme introduction
      case 'analyse_textuelle':
      case 'grammaire':
      case 'vocabulaire':
      case 'comprehension':
      case 'debat':
      case 'production_orale':
        return (
          <EcranIntroduction 
            contenu={`**${currentEcran.titre}**\n\n${currentEcran.consigne}\n\n${getActiviteContenu(currentEcran.activite)}`}
            type="introduction"
            metadata={metadata}
            userId={userId}
            userName={userName}
            onComplete={() => handleEcranComplete(100)}
            debug={process.env.NODE_ENV === 'development'}
          />
        );
      
      default:
        return <FallbackEcran type={type} onComplete={() => handleEcranComplete(100)} />;
    }
  };

  // Chargement
  if (!seance && hasSeances) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // Séance non trouvée
  if (!seance) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Séance non trouvée</h1>
          <p className="text-muted-foreground mb-6">
            La séance demandée n&apos;existe pas ou n&apos;est pas encore disponible.
          </p>
          <Link href={`/chanson/${chansonId}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la chanson
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Résultats finaux
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-2xl px-4 py-12">
          <Card className="overflow-hidden">
            <CardHeader className="gradient-accent text-white text-center py-8">
              <Trophy className="h-16 w-16 mx-auto mb-4" />
              <CardTitle className="text-2xl font-display">
                Séance terminée !
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-accent mb-2">{avgScore}%</p>
                <p className="text-muted-foreground">Score moyen</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{completedEcrans.size}</p>
                  <p className="text-sm text-muted-foreground">Écrans complétés</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{ecrans.length}</p>
                  <p className="text-sm text-muted-foreground">Total écrans</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push(`/chanson/${chansonId}`)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button 
                  className="flex-1 gradient-accent"
                  onClick={() => {
                    setCurrentIndex(0);
                    setCompletedEcrans(new Set());
                    setScores({});
                    setShowResults(false);
                  }}
                >
                  Recommencer
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Interface principale de la séance
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl px-4 py-8">
        {/* Navigation et progression */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/chanson/${chansonId}`}>
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {seance.dureeEstimee} min
              </span>
            </div>
          </div>

          {/* Titre de la séance */}
          <div className="mb-4">
            <h1 className="font-display text-xl font-bold text-foreground">
              {seance.titre}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {seance.description}
            </p>
          </div>

          {/* Barre de progression */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Écran {currentIndex + 1} / {ecrans.length}
              </span>
              <span className="font-medium text-accent">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Titre de l'écran courant */}
        {currentEcran && (
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="capitalize">
                {currentEcran.type.replace(/_/g, ' ')}
              </Badge>
              <h2 className="font-display text-lg font-semibold">
                {currentEcran.titre}
              </h2>
            </div>
            {currentEcran.consigne && currentEcran.type !== 'introduction' && (
              <p className="text-muted-foreground mt-2 text-sm">
                {currentEcran.consigne}
              </p>
            )}
          </div>
        )}

        {/* Contenu de l'écran */}
        <div className="mb-8">
          {renderEcran()}
        </div>

        {/* Navigation entre écrans */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          
          <div className="flex items-center gap-1">
            {ecrans.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex 
                    ? "bg-accent" 
                    : completedEcrans.has(ecrans[index]?.id || '')
                      ? "bg-green-500"
                      : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              if (currentIndex < ecrans.length - 1) {
                setCurrentIndex(prev => prev + 1);
              }
            }}
            disabled={currentIndex === ecrans.length - 1}
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ============================================
// COMPOSANT FALLBACK
// ============================================

function FallbackEcran({ 
  type, 
  onComplete 
}: { 
  type: string; 
  onComplete: () => void;
}) {
  return (
    <Card className="p-8 text-center">
      <div className="text-muted-foreground mb-4">
        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Type d&apos;écran non supporté : <strong>{type}</strong></p>
        <p className="text-sm mt-2">Ce type d&apos;activité sera bientôt disponible.</p>
      </div>
      <Button onClick={onComplete} className="mt-4">
        Continuer
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}
