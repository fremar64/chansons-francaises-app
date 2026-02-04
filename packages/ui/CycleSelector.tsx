'use client';

import type { Cycle } from "@/packages/types/curriculum";

type CycleSelectorProps = {
  cycles: Cycle[];
  selectedId?: Cycle["id"];
  onSelect: (cycle: Cycle) => void;
};

export function CycleSelector({ cycles, selectedId, onSelect }: CycleSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cycles.map((cycle) => (
        <button
          key={cycle.id}
          type="button"
          onClick={() => onSelect(cycle)}
          className={`rounded-xl border px-6 py-4 text-left transition-colors ${
            selectedId === cycle.id ? "border-primary bg-primary/5" : "hover:border-primary/40"
          }`}
        >
          <div className="font-semibold">{cycle.label}</div>
          <div className="text-xs text-muted-foreground">Progression structurée</div>
        </button>
      ))}
    </div>
  );
}
