'use client';

import type { Domain } from "@/packages/types/curriculum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DomainCardsProps = {
  domains: Domain[];
  selectedId?: Domain["id"];
  onSelect: (domain: Domain) => void;
};

export function DomainCards({ domains, selectedId, onSelect }: DomainCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {domains.map((domain) => {
        const isActive = selectedId === domain.id;
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => onSelect(domain)}
            className={`text-left transition-transform hover:-translate-y-1 ${
              isActive ? "ring-2 ring-primary" : ""
            }`}
          >
            <Card className="h-full">
              <CardHeader className="space-y-3">
                <CardTitle>{domain.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{domain.description}</p>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
