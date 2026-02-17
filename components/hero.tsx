"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "./animated-section";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-svh flex-col justify-center px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto w-full max-w-6xl">
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">{t.hero.badge}</span>
          </div>

          <h1 className="mt-8 font-display text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
            {t.hero.headingLine1}
            <br />
            {t.hero.headingLine2}
            <br />
            <span className="text-primary text-4xl md:text-5xl lg:text-6xl">{t.hero.headingLine3}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-10">
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
                px-6 py-3 
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