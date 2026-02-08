import { CaseCard } from "./case-card"

const cases = [
  {
    slug: "history-ae-digital-transformation",
    index: "01",
    brand: "HISTORY, A&E, Lifetime",
    title: "Digital Transformation at Scale",
    description:
      "Expanded digital audiences and monetized content across a fragmented media landscape through strategic social distribution with content windowing.",
    metrics: [
      { value: "+634%", label: "Revenue Growth" },
      { value: "+231%", label: "Watch Time" },
    ],
    tags: ["Digital Strategy", "Content Distribution", "Monetization"],
  },
  {
    slug: "formula-e-community",
    index: "02",
    brand: "Formula E",
    title: "Community Building for a Global Championship",
    description:
      "Built local digital presence for a global motorsport championship through community strategy, real-time content, and influencer partnerships.",
    metrics: [
      { value: "7%", label: "Engagement Rate" },
      { value: "+415%", label: "Interactions" },
    ],
    tags: ["Community", "Influencers", "Real-Time Content"],
  },
  {
    slug: "budweiser-fifa-influencer",
    index: "03",
    brand: "Budweiser FIFA",
    title: "Influencer Marketing at Scale",
    description:
      "Executed global sports activation with authenticity through a diversified creator ecosystem combining macro and mid-tier influencers.",
    metrics: [
      { value: "75M+", label: "Reach" },
      { value: "126M+", label: "Impressions" },
    ],
    tags: ["Influencer Marketing", "Sports", "Global Campaign"],
  },
  {
    slug: "betfair-always-on",
    index: "04",
    brand: "Betfair",
    title: "Always-On Creator Strategy",
    description:
      "Transformed sponsorship into cultural presence through niche creator squads and Power BI-driven optimization.",
    metrics: [
      { value: "1M+", label: "Organic Reach" },
      { value: "7.5%", label: "Engagement" },
    ],
    tags: ["Creator Economy", "Data-Driven", "Always-On"],
  },
]

export function WorkSection() {
  return (
    <section id="work" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Selected Work
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
              Featured Case Studies
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <CaseCard key={c.slug} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
