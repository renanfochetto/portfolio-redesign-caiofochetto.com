const skills = [
  "Creator Economy",
  "Influencer Marketing",
  "Performance Marketing",
  "Brand Strategy",
  "Digital Transformation",
  "Content Strategy",
  "Community Building",
  "Data Analytics",
  "Campaign Management",
  "Team Leadership",
  "Stakeholder Management",
  "P&L Management",
]

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
          {/* Left column */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              About
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
              Translating culture into brand strategy
            </h2>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              I am a marketing leader with 15+ years of experience at the
              intersection of brand, culture, and performance. My career spans
              global media companies, creator-economy startups, and leading
              agencies, always with a focus on building strategies that create
              genuine cultural impact.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I specialize in connecting brands to audiences through creators and
              data-driven strategies. From leading digital transformation at A&E
              Networks to scaling influencer campaigns for Budweiser during the
              FIFA World Cup, my work has consistently delivered measurable results
              while building lasting brand equity.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Based in Brazil with global experience across LATAM, North America,
              and Europe. Fluent in Portuguese, English, and Spanish.
            </p>

            {/* Skills */}
            <div className="mt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
