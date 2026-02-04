import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLevelByIdGlobal, getTrackById } from "@/packages/curriculum";

const NAV_ITEMS = [
  "Accueil",
  "Découverte",
  "Leçon",
  "Quiz",
  "Exercices",
  "Résultats"
];

type PageProps = {
  params: {
    discipline: string;
    niveau: string;
    lessonId: string;
  };
};

export default function LangueLessonPage({ params }: PageProps) {
  const track = getTrackById(params.discipline);
  const level = getLevelByIdGlobal(params.niveau);
  const disciplineLabel = track?.label ?? "Discipline";
  const niveauLabel = level?.label ?? params.niveau.toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container px-4 py-6 space-y-4">
          <Link
            href={`/langue/${params.discipline}/${params.niveau}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux leçons
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
              {disciplineLabel} — {niveauLabel}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">
              Leçon {params.lessonId.replace("lecon-", "")}
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <span
                key={item}
                className="rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
      </header>

      <main className="container px-4 py-12">
        <div className="rounded-2xl border bg-muted/30 p-8 text-center space-y-3">
          <h2 className="text-xl font-semibold">Contenu de la leçon</h2>
          <p className="text-muted-foreground">
            Cette page servira à présenter la découverte, la leçon, le quiz et les exercices
            associés à ce niveau.
          </p>
        </div>
      </main>
    </div>
  );
}
