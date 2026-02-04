'use client';

import type { Level } from "@/packages/types/curriculum";

type LevelSelectorProps = {
  levels: Level[];
  selectedId?: Level["id"];
  onSelect: (level: Level) => void;
};

export function LevelSelector({ levels, selectedId, onSelect }: LevelSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {levels.map((level) => (
        <button
          key={level.id}
          type="button"
          onClick={() => onSelect(level)}
          className={`rounded-lg border px-4 py-3 text-left transition-colors ${
            selectedId === level.id ? "border-primary bg-primary/5" : "hover:border-primary/40"
          }`}
        >
          <div className="font-medium">{level.label}</div>
          <div className="text-xs text-muted-foreground">Niveau CEREDIS</div>
        </button>
      ))}
    </div>
  );
}
