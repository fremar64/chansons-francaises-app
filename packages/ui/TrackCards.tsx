'use client';

import type { Track } from "@/packages/types/curriculum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TrackCardsProps = {
  tracks: Track[];
  selectedId?: Track["id"];
  onSelect: (track: Track) => void;
};

export function TrackCards({ tracks, selectedId, onSelect }: TrackCardsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => {
        const isActive = selectedId === track.id;
        return (
          <button
            key={track.id}
            type="button"
            onClick={() => onSelect(track)}
            disabled={!track.available}
            className={`text-left transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive ? "ring-2 ring-primary" : ""
            }`}
          >
            <Card className="h-full">
              <CardHeader className="space-y-2">
                <CardTitle className="text-base">{track.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{track.description}</p>
                {!track.available && (
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">
                    Bientôt disponible
                  </p>
                )}
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
