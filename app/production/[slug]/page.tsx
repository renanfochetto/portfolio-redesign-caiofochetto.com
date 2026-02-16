import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Tag, Play, Briefcase } from "lucide-react";
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

  // Navigation - ISOLATED (only production cases)
  const navigation = getProductionCaseNavigation(resolvedParams.slug);

  // Section labels
  const sectionLabels = {
    what: "What is it?",
    myRole: "My Role",
    capabilities: "Capabilities",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Back Button */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Work</span>
          </Link>
        </div>
      </div>

      {/* Hero Video/Image */}
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

      {/* Overview */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Title + Meta */}
          <div className="mb-12">
            <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="text-lg font-semibold text-foreground">
                {brand}
              </span>
              <span>•</span>
              <span>{type}</span>
              <span>•</span>
              <span>{year}</span>
            </div>

            {/* Role destacado */}
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <p className="text-base font-semibold text-primary md:text-lg">
                {role}
              </p>
            </div>
          </div>

          {/* What is it? */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                {sectionLabels.what}
              </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {what}
            </p>
          </div>

          {/* My Role */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                {sectionLabels.myRole}
              </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {myRole}
            </p>
          </div>
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
          <div className="flex flex-wrap gap-2">
            {tags.map((capability, index) => (
              <span
                key={index}
                className="rounded-full border border-neutral-600 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation - ISOLATED (only production cases) */}
      <section className="border-t border-border px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Previous Production Case */}
            {navigation.prev && (
              <Link
                href={`/production/${navigation.prev.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous Production</span>
                </div>
                <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                  {navigation.prev.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {navigation.prev.brand}
                </p>
              </Link>
            )}

            {/* Next Production Case */}
            {navigation.next && (
              <Link
                href={`/production/${navigation.next.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98] md:text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground md:justify-end">
                  <span>Next Production</span>
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

          {/* Back to Work */}
          <div className="text-center">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-600 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Cases
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
