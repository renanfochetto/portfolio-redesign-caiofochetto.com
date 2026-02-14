// app/[locale]/case/[slug]/page.tsx
// VERSÃO CORRIGIDA - USA /lib/cases.ts DIRETAMENTE

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle, Tag } from "lucide-react";
import { Header } from "@/components/header";
import { locales } from "@/lib/dictionaries";
import { caseStudies, getCaseBySlug, getAllSlugs } from "@/lib/cases";
import { Footer } from "@/components/footer";

const SITE_URL = "https://www.caiofochetto.com";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };

  // Usar dados de /lib/cases.ts diretamente
  const title = locale === 'pt' ? study.meta_title_pt : study.meta_title_en;
  const description = locale === 'pt' ? study.meta_description_pt : study.meta_description_en;

  return {
    title,
    description,
    alternates: { canonical: `/${locale}/case/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/case/${slug}`,
      type: "article",
      images: [study.og_image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [study.og_image],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const study = getCaseBySlug(slug);

  // Se não encontrar o case, retorna 404
  if (!study) notFound();

  // Extrair dados traduzidos de /lib/cases.ts
  const title = locale === 'pt' ? study.title_pt : study.title_en;
  const challenge = locale === 'pt' ? study.challenge_pt : study.challenge_en;
  const solution = locale === 'pt' ? study.solution_pt : study.solution_en;
  const learnings = locale === 'pt' ? study.key_learnings_pt : study.key_learnings_en;
  const capabilities = locale === 'pt' ? study.capabilities_pt : study.capabilities_en;

  // Extrair role traduzido
  const role = locale === 'pt' ? study.role_pt : study.role_en;

  // Extrair brand (pode ser array)
  const brandDisplay = Array.isArray(study.brand)
    ? study.brand.join(', ')
    : study.brand;

  // Labels traduzidos
  const sectionLabels = locale === "pt"
    ? {
      challenge: "Desafio",
      solution: "Solução",
      results: "Resultados",
      learnings: "Principais Aprendizados",
      capabilities: "Competências",
      role: "Função",
      period: "Período",
      back: "Voltar",
      nextCase: "Próximo case"
    }
    : {
      challenge: "Challenge",
      solution: "Solution",
      results: "Results",
      learnings: "Key Learnings",
      capabilities: "Capabilities",
      role: "Role",
      period: "Period",
      back: "Back",
      nextCase: "Next case"
    };

  // Navegação circular
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length];
  const nextCaseTitle = locale === 'pt' ? nextCase.title_pt : nextCase.title_en;
  const nextCaseBrand = Array.isArray(nextCase.brand)
    ? nextCase.brand.join(', ')
    : nextCase.brand;

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${brandDisplay} - ${title}`,
    description: challenge,
    url: `${SITE_URL}/${locale}/case/${slug}`,
    author: { "@type": "Person", name: "Caio Fochetto", url: SITE_URL },
    dateCreated: study.period,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="px-6 pt-28 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {sectionLabels.back}
          </Link>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {brandDisplay}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
              {title}
            </h1>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6">
            <div>
              <p className="text-xs text-muted-foreground">{sectionLabels.role}</p>
              <p className="text-sm font-medium text-foreground">{role}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{sectionLabels.period}</p>
              <p className="text-sm font-medium text-foreground">{study.period}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{study.company}</p>
              <p className="text-sm font-medium text-foreground">{study.year_display}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.challenge}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {challenge}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.solution}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {solution}
            </p>
          </div>
        </div>
      </section>

      {/* Results - SEMPRE FUNDO PRETO */}
      <section className="bg-neutral-950 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xs font-medium uppercase tracking-widest text-primary mb-6">
            {sectionLabels.results}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {study.metrics.map((metric, index) => {
              const label = locale === 'pt' ? metric.label_pt : metric.label_en;
              const description = locale === 'pt' ? metric.description_pt : metric.description_en;

              return (
                <div key={index} className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition-colors hover:border-primary">
                  <p className="text-4xl font-bold text-primary md:text-5xl">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold text-neutral-50">{label}</p>
                  <p className="mt-1 text-xs text-neutral-400">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
            {sectionLabels.learnings}
          </h2>
          <ul className="mt-6 space-y-4">
            {learnings.map((learning, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{learning}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities Tags */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {sectionLabels.capabilities}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((capability, index) => (
              <span key={index} className="rounded-full border-2 border-primary px-4 py-2 text-sm font-medium text-primary">
                {capability}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next Case */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl border-t border-border pt-12">
          <p className="text-xs text-muted-foreground">{sectionLabels.nextCase}</p>
          <Link
            href={`/${locale}/case/${nextCase.slug}`}
            className="group mt-2 inline-flex items-center gap-2 text-2xl font-bold text-foreground transition-colors hover:text-primary md:text-3xl"
          >
            {nextCaseBrand} &mdash; {nextCaseTitle}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}