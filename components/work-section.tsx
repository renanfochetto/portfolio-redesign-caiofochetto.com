"use client";

import { useI18n } from "@/lib/i18n";
import { CaseCard } from "./case-card";
import { AnimatedSection, AnimatedItem } from "./animated-section";
import { caseStudies } from "@/lib/cases";

// Mapeamento de brand → logo filename
const brandLogoMap: Record<string, string> = {
  "Betfair": "betfair",
  "Budweiser": "budweiser",
  "Formula E": "formulae",
  "HISTORY": "ae",
  "A&E": "ae",
  "Lifetime": "lifetime",
  "Octagon": "octagon",
  "Ambev": "ambev",
  "Jellysmack": "jellysmack",
};

// Helper para extrair thumbnail da playlist do YouTube
function getYouTubeThumbnail(playlistUrl: string): string {
  try {
    const url = new URL(playlistUrl);
    const listId = url.searchParams.get('list');

    if (listId) {
      // Tenta usar thumbnail do YouTube (pode não funcionar sempre)
      return `https://img.youtube.com/vi_webp/${listId}/mqdefault.webp`;
    }
  } catch (e) {
    // Ignora erro e usa placeholder
  }

  // Fallback para placeholder
  return 'https://via.placeholder.com/1280x720/1a1a1a/ffffff?text=Video+Preview';
}

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
            const brandArray = Array.isArray(study.brand) ? study.brand : [study.brand];
            const brandDisplay = brandArray.join(', ');

            // Pegar logo do primeiro brand (se houver múltiplos)
            const brandLogo = brandLogoMap[brandArray[0]] || undefined;

            // Extrair métricas com labels traduzidos
            const metrics = study.metrics.map(m => ({
              value: m.value,
              label: locale === 'pt' ? m.label_pt : m.label_en,
            }));

            // Tags já vêm prontas
            const tags = study.tags;

            // Thumbnail do YouTube
            const thumbnail = getYouTubeThumbnail(study.playlist_url);

            return (
              <AnimatedItem key={study.slug} index={idx}>
                <CaseCard
                  slug={study.slug}
                  brand={brandDisplay}
                  brandLogo={brandLogo}
                  title={title}
                  metrics={metrics}
                  tags={tags}
                  locale={locale}
                  playlistUrl={study.playlist_url}
                  thumbnail={thumbnail}
                />
              </AnimatedItem>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}