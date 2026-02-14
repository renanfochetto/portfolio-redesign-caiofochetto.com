"use client";

import { useI18n } from "@/lib/i18n";
import { CaseCard } from "./case-card";
import { AnimatedSection, AnimatedItem } from "./animated-section";
import { caseStudies } from "@/lib/cases";

export function WorkSection() {
  const { locale, t } = useI18n();

  return (
    <section id="work" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.work.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.work.heading}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {caseStudies.map((study, idx) => {
            // Extrair título baseado no locale
            const title = locale === 'pt' ? study.title_pt : study.title_en;

            // Extrair brand (pode ser string ou array)
            const brand = Array.isArray(study.brand)
              ? study.brand.join(', ')
              : study.brand;

            // Extrair primeiras 3 métricas com labels traduzidos
            const metrics = study.metrics.slice(0, 3).map(m => ({
              value: m.value,
              label: locale === 'pt' ? m.label_pt : m.label_en,
              labelKey: '' // Mantém compatibilidade com CaseCard se necessário
            }));

            return (
              <AnimatedItem key={study.slug} index={idx}>
                <CaseCard
                  href={`/${locale}/case/${study.slug}`}
                  brand={brand}
                  title={title}
                  description="" // Pode remover ou adicionar se quiser
                  metrics={metrics}
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