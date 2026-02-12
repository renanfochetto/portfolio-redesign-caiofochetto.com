"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowDown, TrendingUp, Users, Target, Clock } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";
import { LogoCarousel } from "./logo-carousel";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 py-24 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-medium text-primary">{t.hero.badge}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">São Paulo · Disponível para trabalho remoto</p>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="text-balance">
            {t.hero.headingLine1}
            <br />
            {t.hero.headingLine2}
            <br />
            <span className="text-primary">{t.hero.headingLine3}</span>
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-8">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.hero.cta}
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <p className="text-3xl font-bold text-primary md:text-4xl">
              <AnimatedCounter value={634} prefix="+" suffix="%" />
            </p>
            <p className="text-sm text-foreground/70">{t.hero.revenueGrowth}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              <AnimatedCounter value={75} suffix="M+" />
            </p>
            <p className="text-sm text-foreground/70">{t.hero.campaignReach}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Target className="h-5 w-5 text-muted-foreground" />
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              <AnimatedCounter value={7} suffix=".5%" />
            </p>
            <p className="text-sm text-foreground/70">{t.hero.engagementRate}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              <AnimatedCounter value={15} suffix="+" />
            </p>
            <p className="text-sm text-foreground/70">{t.hero.yearsExperience}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <LogoCarousel />
        </div>
      </div>
    </section>
  );
}
