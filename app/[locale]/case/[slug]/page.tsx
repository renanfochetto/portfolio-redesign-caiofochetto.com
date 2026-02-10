import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle, Tag, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";
import { locales } from "@/lib/dictionaries";
import { caseStudies, getCaseBySlug, getAllSlugs } from "@/lib/cases";
import { Footer } from "@/components/footer";

const SITE_URL = "https://www.caiofochetto.com";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

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

  const dict = getDictionary(locale as Locale);
  const caseData = (dict.cases as Record<string, { title: string; description: string }>)[slug];
  const title = `${study.brand} - ${caseData?.title || slug}`;
  const description = caseData?.description || "";

  return {
    title,
    description: description.length > 155 ? `${description.slice(0, 152)}...` : description,
    alternates: { canonical: `/${locale}/case/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/case/${slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) notFound();

  const dict = getDictionary(locale as Locale);
  const labels = metricLabels[locale] || metricLabels.pt;
  const caseData = (dict.cases as Record<string, {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    insights: string[];
  }>)[slug];

  if (!caseData) notFound();

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length];
  const nextCaseData = (dict.cases as Record<string, { title: string }>)[nextCase.slug];

  const sectionLabels = locale === "pt"
    ? { challenge: "Desafio", solution: "Solucao", results: "Resultados", insights: "Aprendizados", role: "Funcao", timeline: "Periodo", back: "Voltar", nextCase: "Proximo case" }
    : { challenge: "Challenge", solution: "Solution", results: "Results", insights: "Key Insights", role: "Role", timeline: "Timeline", back: "Back", nextCase: "Next case" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.brand} - ${caseData.title}`,
    description: caseData.description,
    url: `${SITE_URL}/${locale}/case/${slug}`,
    author: { "@type": "Person", name: "Caio Fochetto", url: SITE_URL },
    dateCreated: study.timeline,
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
              {study.brand}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
              {caseData.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {caseData.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6">
            <div>
              <p className="text-xs text-muted-foreground">{sectionLabels.role}</p>
              <p className="text-sm font-medium text-foreground">{study.role}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{sectionLabels.timeline}</p>
              <p className="text-sm font-medium text-foreground">{study.timeline}</p>
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
              {caseData.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.solution}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {caseData.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
            {sectionLabels.results}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {study.metrics.map((m) => (
              <div key={m.labelKey} className="rounded-lg border border-border bg-card p-5">
                <TrendingUp className="mb-2 h-4 w-4 text-primary/60" />
                <p className="text-2xl font-bold text-primary md:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{labels[m.labelKey] || m.labelKey}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
            {sectionLabels.insights}
          </h2>
          <ul className="mt-6 space-y-4">
            {caseData.insights.map((insight: string, i: number) => (
              <li key={i} className="flex gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tags */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Capabilities
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                {tag}
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
            {nextCase.brand} &mdash; {nextCaseData?.title || nextCase.slug}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
