import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Tag, Calendar, User, Briefcase } from "lucide-react";
import { Footer } from "@/components/footer";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { getProductionCaseBySlug, getAllProductionCaseSlugs, getProductionCaseNavigation } from "@/lib/production-cases";

export async function generateStaticParams() {
  return getAllProductionCaseSlugs().map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const productionCase = getProductionCaseBySlug(slug);

  if (!productionCase) {
    return {
      title: "Caso não encontrado",
      description: "Caso de produção não encontrado",
    };
  }

  return {
    title: productionCase.seo.metaTitle,
    description: productionCase.seo.metaDescription,
    openGraph: {
      images: [productionCase.seo.ogImage],
    },
  };
}

export default async function ProductionCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productionCase = getProductionCaseBySlug(slug);

  if (!productionCase) {
    notFound();
  }

  const { prev, next } = getProductionCaseNavigation(slug);
  const { title, brand, role, year, type, what, myRole, tags, media } = productionCase;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: title,
            description: what,
            uploadDate: year,
          }),
        }}
      />

      <main className="relative">
        {/* Hero Video Section */}
        <section className="relative bg-card/50 py-12 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Produção</span>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Video */}
              <div className="aspect-video overflow-hidden rounded-lg border border-border">
                {media.hero.type === "video" && media.hero.url && (
                  <YouTubeEmbed
                    videoId={media.hero.url}
                    title={title}
                    placeholder={media.hero.placeholder}
                  />
                )}
              </div>

              {/* Info */}
              <div>
                <h1 className="text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Empresa</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{brand}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Cargo</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-foreground">{role}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Tipo</p>
                    <p className="mt-1 text-foreground">{type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Ano</p>
                    <p className="mt-1 text-foreground">{year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Section */}
        <section className="border-t border-border px-6 py-12 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">O que é</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground">{what}</p>
          </div>
        </section>

        {/* My Role Section */}
        <section className="border-t border-border bg-card/50 px-6 py-12 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">Meu Role</h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground">{myRole}</p>
          </div>
        </section>

        {/* Tags */}
        {tags.length > 0 && (
          <section className="border-t border-border px-6 py-12">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-xs font-medium uppercase tracking-widest text-primary">Tags</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-600 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="border-t border-border px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {prev && (
                <Link
                  href={`/production/${prev.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border p-6 transition-all hover:border-primary hover:bg-card/50"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Anterior</p>
                    <p className="mt-1 font-semibold text-foreground">{prev.title}</p>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/production/${next.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border p-6 transition-all hover:border-primary hover:bg-card/50"
                >
                  <div className="text-left">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Próximo</p>
                    <p className="mt-1 font-semibold text-foreground">{next.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
