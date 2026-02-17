"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "./animated-section";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6 py-20 lg:px-8 lg:py-24">
      <AnimatedSection className="mx-auto w-full max-w-6xl">
        <div className="mt-4 md:mt-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 md:px-4">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">{t.hero.badge}</span>
          </div>

          {/* Heading - tamanhos reduzidos no mobile */}
          <h1 className="mt-6 md:mt-8 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground text-balance">
            {t.hero.headingLine1}
            <br />
            {t.hero.headingLine2}
            <br />
            <span className="text-primary">{t.hero.headingLine3}</span>
          </h1>

          {/* Subtitle - tamanho reduzido no mobile */}
          <p className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
            {t.hero.subtitle}
          </p>

          {/* CTA - tamanho reduzido no mobile */}
          <div className="mt-6 md:mt-10">
            <a
              href="#work"
              className="
                inline-flex items-center gap-2 
                rounded-full 
                bg-primary/90 
                hover:bg-primary
                active:scale-95
                border
                border-foreground/95
                px-5 py-2.5 sm:px-6 sm:py-3
                text-sm font-medium 
                text-primary-foreground
                transition-all duration-200
              "
            >
              {t.hero.cta}
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}