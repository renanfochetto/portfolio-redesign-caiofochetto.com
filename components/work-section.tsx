"use client";

import { useI18n } from "@/lib/i18n";
import { CaseCard } from "./case-card";
import { AnimatedSection, AnimatedItem } from "./animated-section";
import { caseStudies } from "@/lib/cases";

const metricLabels: Record<string, Record<string, string>> = {
  pt: {
    revenueGrowth: "Crescimento de receita",
    reach: "Alcance",
    engagementRate: "Taxa de engajamento",
    creators: "Creators",
    views: "Visualizacoes",
    contentPieces: "Pecas de conteudo",
    bookingGrowth: "Crescimento de reservas",
  },
  en: {
    revenueGrowth: "Revenue growth",
    reach: "Reach",
    engagementRate: "Engagement rate",
    creators: "Creators",
    views: "Views",
    contentPieces: "Content pieces",
    bookingGrowth: "Booking growth",
  },
};

export function WorkSection() {
  const { locale, t } = useI18n();
  const labels = metricLabels[locale] || metricLabels.pt;
  const casesDict = t.cases as Record<string, { title: string; description: string }>;

  return (
    <section id="work" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.work.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.work.heading}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, idx) => {
            const caseT = casesDict[study.slug];
            return (
              <AnimatedItem key={study.slug} index={idx}>
                <CaseCard
                  href={`/${locale}/case/${study.slug}`}
                  brand={study.brand}
                  title={caseT?.title || study.brand}
                  description={caseT?.description || ""}
                  metrics={study.metrics.map((m) => ({
                    value: m.value,
                    label: labels[m.labelKey] || m.labelKey,
                  }))}
                  tags={study.tags}
                  viewCaseLabel={t.work.viewCase}
                />
              </AnimatedItem>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}
