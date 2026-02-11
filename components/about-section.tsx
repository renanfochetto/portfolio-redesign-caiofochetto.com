"use client";

import { useI18n } from "@/lib/i18n";
import { Sparkles, Globe } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.about.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.about.heading}
        </h2>

        <div className="mt-10 max-w-3xl">
          <div className="space-y-4">
            <AnimatedItem index={0}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.about.p1}
              </p>
            </AnimatedItem>
            <AnimatedItem index={1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.about.p2}
              </p>
            </AnimatedItem>
            <AnimatedItem index={2}>
              <p className="flex items-start gap-2 text-base leading-relaxed text-muted-foreground">
                <Globe className="mt-1 h-4 w-4 flex-shrink-0 text-primary/60" />
                {t.about.p3}
              </p>
            </AnimatedItem>
          </div>

          <AnimatedItem index={3} className="mt-8">
            <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t.about.coreExpertise}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.about.expertise.map((skill: string, idx: number) => (
                <AnimatedItem
                  key={skill}
                  index={idx}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {skill}
                </AnimatedItem>
              ))}
            </div>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </section>
  );
}
