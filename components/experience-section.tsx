const experiences = [
  {
    period: "2023 - 2026",
    role: "Director, Creator & Influence",
    company: "Octagon (IPG)",
    description:
      "Led creator economy strategy for major brands including Betfair, Ambev, and Budweiser. Managed multi-million dollar influencer campaigns with data-driven optimization.",
    brands: ["Betfair", "Ambev", "Budweiser"],
  },
  {
    period: "2021 - 2023",
    role: "LATAM Operations Lead",
    company: "Jellysmack",
    description:
      "Spearheaded Latin American expansion for the world's largest creator company. Built operational frameworks for creator partnerships and content monetization.",
    brands: ["Creator Partnerships", "LATAM Expansion"],
  },
  {
    period: "2020 - 2021",
    role: "Content & Product Manager",
    company: "Playground",
    description:
      "Managed content strategy and product development, bridging creative vision with technical execution for digital-first entertainment.",
    brands: ["Content Strategy", "Product Development"],
  },
  {
    period: "2012 - 2019",
    role: "Digital Platforms Manager",
    company: "A+E Networks",
    description:
      "Led digital transformation across HISTORY, A&E, Lifetime, and Formula E channels. Achieved +634% revenue growth and +231% watch time through strategic social distribution.",
    brands: ["HISTORY", "A&E", "Lifetime", "Formula E"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Career Path
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Experience
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {experiences.map((exp) => (
            <div
              key={exp.period}
              className="group grid gap-4 border-t border-border py-8 transition-colors hover:bg-secondary/30 md:grid-cols-[200px_1fr] md:gap-8 md:px-4"
            >
              <div className="flex-shrink-0">
                <p className="font-mono text-sm text-muted-foreground">
                  {exp.period}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-primary">
                  {exp.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.brands.map((brand) => (
                    <span
                      key={brand}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  )
}
