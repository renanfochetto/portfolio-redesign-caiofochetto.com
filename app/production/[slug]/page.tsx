import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { YouTubeEmbed } from "@/components/youtube-embed";
import {
  getProductionCaseBySlug,
  getProductionCaseNavigation,
  getAllProductionCaseSlugs,
} from "@/lib/production-cases";

const SITE_URL = "https://www.caiofochetto.com";

interface ProductionCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = getAllProductionCaseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: ProductionCasePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const productionCase = getProductionCaseBySlug(resolvedParams.slug);

  if (!productionCase) {
    return {
      title: "Case Not Found",
    };
  }

  return {
    title: productionCase.seo.metaTitle,
    description: productionCase.seo.metaDescription,
    openGraph: {
      title: productionCase.seo.metaTitle,
      description: productionCase.seo.metaDescription,
      images: [productionCase.seo.ogImage],
      type: "website",
      locale: "pt_BR",
      siteName: "Caio Fochetto Portfolio",
      url: `${SITE_URL}/production/${resolvedParams.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: productionCase.seo.metaTitle,
      description: productionCase.seo.metaDescription,
      images: [productionCase.seo.ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/production/${resolvedParams.slug}`,
    },
  };
}

export default async function ProductionCasePage({
  params,
}: ProductionCasePageProps) {
  const resolvedParams = await params;
  const productionCase = getProductionCaseBySlug(resolvedParams.slug);

  if (!productionCase) {
    notFound();
  }

  const { title, brand, year, type, role, what, myRole, tags, media } =
    productionCase;

  // Navigation
  const navigation = getProductionCaseNavigation(resolvedParams.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Back Button - IDÊNTICO ao Performance */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Link>
        </div>
      </div>

      {/* Hero Video/Image - IDÊNTICO */}
      <section className="bg-muted/30 px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {media.hero.type === "video" && media.hero.url ? (
            <YouTubeEmbed
              videoId={media.hero.url}
              title={title}
              placeholder={media.hero.placeholder}
            />
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={media.hero.url}
                alt={media.hero.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Overview - PADRÃO VISUAL IDÊNTICO ao Performance */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Brand Name - LIME uppercase pequeno */}
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
            {brand}
          </p>

          {/* Title - Font Display Grande */}
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Meta Grid - 3 colunas: Função | Período | Company */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Função
              </p>
              <p className="font-semibold text-foreground">{role}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Período
              </p>
              <p className="font-semibold text-foreground">{year}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {type}
              </p>
              <p className="font-semibold text-foreground">{brand}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is it? - Seção com título LIME uppercase */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
            O QUE É?
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {what}
          </p>
        </div>
      </section>

      {/* My Role - Seção com título LIME uppercase */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
            MEU PAPEL
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {myRole}
          </p>
        </div>
      </section>

      {/* Competências - Pills IDÊNTICO ao Performance */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
            COMPETÊNCIAS
          </h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation - IDÊNTICO ao Performance */}
      <section className="border-t border-border px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Previous */}
            {navigation.prev && (
              <Link
                href={`/production/${navigation.prev.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:bg-card/80 active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Anterior</span>
                </div>
                <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                  {navigation.prev.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {navigation.prev.brand}
                </p>
              </Link>
            )}

            {/* Next */}
            {navigation.next && (
              <Link
                href={`/production/${navigation.next.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:bg-card/80 active:scale-[0.98] md:text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  <span>Próximo</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                  {navigation.next.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {navigation.next.brand}
                </p>
              </Link>
            )}
          </div>

          {/* Back to Work - IDÊNTICO */}
          <div className="text-center">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:text-primary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver Todos os Cases
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}