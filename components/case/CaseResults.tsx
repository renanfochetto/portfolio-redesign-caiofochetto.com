"use client";

import type { CaseMetric } from "@/types/case";

interface CaseResultsProps {
  metrics: CaseMetric[];
  locale: "pt" | "en";
}

export function CaseResults({ metrics, locale }: CaseResultsProps) {
  const getLabel = (metric: CaseMetric): string => {
    return locale === "pt" ? metric.label_pt : metric.label_en;
  };

  const getDescription = (metric: CaseMetric): string => {
    return locale === "pt" ? metric.description_pt : metric.description_en;
  };

  return (
    <section className="border-t border-border bg-neutral-900/50 py-16 dark:bg-neutral-900 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          Resultados
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="rounded-lg border border-neutral-800 bg-neutral-950 p-8 transition-all hover:border-primary/50"
            >
              <p className="text-5xl font-bold text-primary md:text-6xl">
                {metric.value}
              </p>
              <p className="mt-4 text-lg font-semibold text-foreground">
                {getLabel(metric)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {getDescription(metric)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
