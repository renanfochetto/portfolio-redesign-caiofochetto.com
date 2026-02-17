"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tag, Play, Calendar } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { YouTubeEmbed } from "@/components/youtube-embed";
import type { ProductionCase } from "@/lib/production-cases";

interface ProductionCaseContentProps {
  productionCase: ProductionCase;
  companyLogos: Record<string, string>;
  brandLogos: Record<string, string>;
  navigation: {
    prev: ProductionCase | null;
    next: ProductionCase | null;
  };
}

export function ProductionCaseContent({
  productionCase,
  companyLogos,
  brandLogos,
  navigation,
}: ProductionCaseContentProps) {
  const { title, brand, year, type, role, what, myRole, tags, media } =
    productionCase;

  const brandLogo = brandLogos[brand];

  const sectionLabels = {
    what: "O QUE É?",
    myRole: "MEU PAPEL",
    capabilities: "COMPETÊNCIAS",
    back: "Voltar",
    previous: "Anterior",
    next: "Próximo",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-28 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            {brandLogo ? (
              <div className="flex h-16 w-32 items-center justify-start">
                <Image
                  src={`/logos/white/${brandLogo}.svg`}
                  alt={`${brand} logo`}
                  width={128}
                  height={64}
                  className="h-full w-auto max-w-full object-contain object-left"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-16 w-32" />
            )}

            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {sectionLabels.back}
            </Link>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-foreground md:text-5xl">
              {title}
            </h1>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-600 pt-6">
            <div className="flex items-center gap-4">
              {companyLogos[brand] && (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-600 bg-card overflow-hidden">
                  <Image
                    src={`/companies/${companyLogos[brand]}`}
                    alt={`${brand} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-foreground">{brand}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {media.hero.type === "video" && media.hero.url && (
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <Play className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                CONTEÚDO RELACIONADO
              </h2>
            </div>

            <YouTubeEmbed
              videoId={media.hero.url}
              title={title}
              placeholder={media.hero.placeholder}
            />
          </div>
        </section>
      )}

      {/* What is it? */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Play className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.what}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {what}
          </p>
        </div>
      </section>

      {/* My Role */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.myRole}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {myRole}
          </p>
        </div>
      </section>

      {/* Capabilities Tags */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.capabilities}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            {navigation.prev ? (
              <Link
                href={`/production/${navigation.prev.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {sectionLabels.previous}
              </Link>
            ) : (
              <div />
            )}

            {navigation.next ? (
              <Link
                href={`/production/${navigation.next.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {sectionLabels.next}
                <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
