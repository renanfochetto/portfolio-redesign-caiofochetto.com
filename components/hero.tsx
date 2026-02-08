import { ArrowDown } from "lucide-react"

const brands = [
  "Budweiser",
  "Betfair",
  "Ambev",
  "A&E Networks",
  "HISTORY",
  "Formula E",
  "Jellysmack",
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-20 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Availability Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-sm text-muted-foreground">
            Open to new opportunities
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          I build strategies that connect{" "}
          <span className="text-primary">brand, culture & performance</span>{" "}
          through creators and data.
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          15+ years leading creator economy, influencer marketing, and digital
          strategy for global brands. Formerly at Octagon, Jellysmack, and A&E
          Networks.
        </p>

        {/* Key Stats Row */}
        <div className="mt-12 flex flex-wrap gap-8 border-t border-border pt-8 md:gap-12">
          <div>
            <p className="text-3xl font-bold text-primary md:text-4xl">+634%</p>
            <p className="mt-1 text-sm text-muted-foreground">Revenue Growth</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground md:text-4xl">75M+</p>
            <p className="mt-1 text-sm text-muted-foreground">Campaign Reach</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground md:text-4xl">7.5%</p>
            <p className="mt-1 text-sm text-muted-foreground">Engagement Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground md:text-4xl">15+</p>
            <p className="mt-1 text-sm text-muted-foreground">Years Experience</p>
          </div>
        </div>

        {/* Brand Marquee */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by leading brands
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-sm font-medium text-muted-foreground/70"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#work"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to work section"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
