import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { getCaseBySlug, getAllCaseSlugs, caseStudies } from "@/lib/cases"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseBySlug(slug)
  if (!study) return { title: "Case Study Not Found" }
  return {
    title: `${study.brand} - ${study.title} | Caio Fochetto`,
    description: study.heroDescription,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseBySlug(slug)

  if (!study) notFound()

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug)
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length]

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </Link>
          <a
            href="mailto:caiofochetto@gmail.com"
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get in Touch
          </a>
        </nav>
      </header>

      <main className="px-6 pt-24 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <section className="pb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                {study.brand}
              </span>
              <span className="text-sm text-muted-foreground">
                {study.timeline}
              </span>
            </div>
            <h1 className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {study.heroDescription}
            </p>

            {/* Meta */}
            <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Role
                </p>
                <p className="mt-1 text-sm text-foreground">{study.role}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Timeline
                </p>
                <p className="mt-1 text-sm text-foreground">{study.timeline}</p>
              </div>
            </div>
          </section>

          {/* Metrics Grid */}
          <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border bg-card p-5"
              >
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </section>

          {/* Challenge */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
              The Challenge
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {study.challenge}
            </p>
          </section>

          {/* Solution */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
              The Solution
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {study.solution}
            </p>
          </section>

          {/* Results */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
              The Results
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {study.results}
            </p>
          </section>

          {/* Key Insights */}
          <section className="mb-16 rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-primary">
              Key Insights
            </h2>
            <ul className="flex flex-col gap-4">
              {study.keyInsights.map((insight, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 font-mono text-sm text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {insight}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Tags */}
          <section className="mb-16">
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Next Case */}
          {nextCase && (
            <section className="border-t border-border pt-12">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Next Case Study
              </p>
              <Link
                href={`/case/${nextCase.slug}`}
                className="group mt-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-primary">
                    {nextCase.brand}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                    {nextCase.title}
                  </h3>
                </div>
                <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </Link>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {"Let's work together"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Interested in similar results for your brand?
            </p>
            <a
              href="mailto:caiofochetto@gmail.com"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </section>
        </div>
      </main>
    </div>
  )
}
