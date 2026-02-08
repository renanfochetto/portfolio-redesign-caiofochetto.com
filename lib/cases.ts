export interface CaseStudy {
  slug: string
  brand: string
  title: string
  subtitle: string
  heroDescription: string
  challenge: string
  solution: string
  results: string
  metrics: { value: string; label: string }[]
  tags: string[]
  timeline: string
  role: string
  keyInsights: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "history-ae-digital-transformation",
    brand: "HISTORY, A&E, Lifetime",
    title: "Digital Transformation at Scale",
    subtitle: "Expanding digital audiences and monetization across a fragmented media landscape",
    heroDescription:
      "Led the digital transformation of three major entertainment brands, building a social-first distribution strategy that unlocked massive audience growth and revenue.",
    challenge:
      "A+E Networks needed to expand its digital audiences and build new revenue streams in an increasingly fragmented media landscape. Traditional broadcast-focused distribution was losing ground to digital platforms, and the company needed a strategy to compete for attention across social channels while maintaining brand integrity across HISTORY, A&E, and Lifetime.",
    solution:
      "I developed and executed a strategic social distribution model with content windowing, tailoring content formats and publishing cadence for each platform. This included building a dedicated digital team, implementing analytics-driven content optimization, creating platform-specific content strategies for Facebook, YouTube, Instagram, and Twitter, and establishing partnerships with digital-native creators to extend brand reach beyond traditional audiences.",
    results:
      "The strategy delivered transformative results that redefined the company's digital presence and revenue trajectory. Over 7 years, we built a scalable digital operation that became a key growth driver for the business, proving that legacy media companies can thrive in the digital ecosystem with the right strategy.",
    metrics: [
      { value: "+634%", label: "Revenue Growth" },
      { value: "+231%", label: "Watch Time Increase" },
      { value: "3", label: "Brands Transformed" },
      { value: "7", label: "Years of Leadership" },
    ],
    tags: ["Digital Strategy", "Content Distribution", "Monetization", "Social Media", "Analytics"],
    timeline: "2012 - 2019",
    role: "Digital Platforms Manager at A+E Networks",
    keyInsights: [
      "Content windowing across platforms maximized reach without cannibalizing traditional viewership",
      "Platform-specific content strategies outperformed one-size-fits-all approaches by 3x",
      "Data-driven optimization cycles enabled continuous improvement in engagement metrics",
      "Building dedicated digital teams was essential for sustainable transformation",
    ],
  },
  {
    slug: "formula-e-community",
    brand: "Formula E",
    title: "Community Building for a Global Championship",
    subtitle: "Creating local digital presence for a global motorsport championship",
    heroDescription:
      "Built the digital community strategy for Formula E in Brazil, creating an engaged local fanbase through real-time content and influencer partnerships.",
    challenge:
      "Formula E needed to establish a strong local digital presence in new markets while maintaining global brand consistency. As a relatively new motorsport championship, the challenge was building genuine community engagement in a market dominated by established racing traditions like Formula 1 and NASCAR. The audience didn't yet understand or care about electric racing.",
    solution:
      "I designed and executed a community-first digital strategy combining real-time event content, local influencer partnerships, and audience-driven programming. The approach focused on making Formula E culturally relevant by connecting it to sustainability narratives that resonated with Brazilian audiences, while using influencer activations during race weekends to drive conversation and community growth.",
    results:
      "The strategy produced engagement rates significantly above industry benchmarks, proving that community-first approaches outperform broadcast-style digital marketing. The organic community became a key asset for sponsor activations and drove sustainable audience growth beyond paid media.",
    metrics: [
      { value: "4.3-7%", label: "Engagement Rate" },
      { value: "+415%", label: "Interactions Growth" },
      { value: "Above", label: "Industry Benchmarks" },
    ],
    tags: ["Community Building", "Influencers", "Real-Time Content", "Sports Marketing"],
    timeline: "2017 - 2019",
    role: "Digital Platforms Manager at A+E Networks",
    keyInsights: [
      "Real-time content during events drove 5x higher engagement than pre-planned posts",
      "Local influencer partnerships provided authentic cultural context for a global brand",
      "Community-first approach generated organic advocacy that amplified paid efforts",
      "Sustainability narrative resonated strongly with younger Brazilian audiences",
    ],
  },
  {
    slug: "budweiser-fifa-influencer",
    brand: "Budweiser FIFA",
    title: "Influencer Marketing at Scale",
    subtitle: "Global sports activation with scale and authenticity through creators",
    heroDescription:
      "Orchestrated Budweiser's influencer marketing strategy during the FIFA World Cup, building a diversified creator ecosystem that delivered massive reach with authentic engagement.",
    challenge:
      "Budweiser needed to activate its FIFA World Cup sponsorship through influencer marketing at global scale while maintaining authenticity. The challenge was creating a creator strategy that could deliver massive reach numbers without sacrificing the genuine, organic feel that makes influencer content effective. Budget was significant but expectations were even higher.",
    solution:
      "I architected a diversified creator ecosystem combining macro influencers for reach with mid-tier creators for engagement depth. The strategy involved careful creator selection based on audience overlap analysis, culturally-relevant content briefs that gave creators freedom while maintaining brand alignment, real-time content optimization during matches, and a layered activation calendar that built momentum throughout the tournament.",
    results:
      "The campaign delivered exceptional scale while maintaining strong engagement metrics, proving that macro and mid-tier creator strategies can work in harmony. The results exceeded client expectations and established a repeatable playbook for large-scale sports influencer activations.",
    metrics: [
      { value: "75M+", label: "Reach" },
      { value: "126M+", label: "Impressions" },
      { value: "4.5%", label: "Peak Engagement" },
    ],
    tags: ["Influencer Marketing", "Sports", "Global Campaign", "Creator Ecosystem"],
    timeline: "2023 - 2024",
    role: "Director, Creator & Influence at Octagon",
    keyInsights: [
      "Diversified creator tiers (macro + mid-tier) delivered both scale and authenticity",
      "Creator freedom within clear brand guidelines produced the best-performing content",
      "Real-time optimization during live events significantly boosted campaign performance",
      "Audience overlap analysis in creator selection prevented reach duplication",
    ],
  },
  {
    slug: "betfair-always-on",
    brand: "Betfair",
    title: "Always-On Creator Strategy",
    subtitle: "Transforming sponsorship into cultural presence through creators and data",
    heroDescription:
      "Built Betfair's always-on creator strategy, transforming traditional sponsorship activations into continuous cultural presence through niche creator squads and data-driven optimization.",
    challenge:
      "Betfair had traditional sponsorship deals but wasn't converting them into meaningful cultural presence. The brand was seen as just another betting company logo on jerseys. The challenge was transforming passive sponsorship visibility into active cultural participation that would build genuine brand affinity and drive organic engagement in a highly competitive and regulated market.",
    solution:
      "I created an always-on creator strategy built around niche creator squads aligned with Betfair's sponsorship properties. The approach used Power BI dashboards for real-time performance optimization, enabling data-driven decisions on content formats, creator selection, and posting cadence. The strategy shifted from campaign-based activations to continuous content that kept Betfair culturally relevant between major sporting events.",
    results:
      "The always-on approach dramatically outperformed traditional campaign-based activations, achieving engagement rates well above industry benchmarks. The Power BI integration created a feedback loop that continuously improved performance over time.",
    metrics: [
      { value: "1M+", label: "Organic Reach" },
      { value: "86K+", label: "Interactions" },
      { value: "7.5%", label: "Engagement Rate" },
    ],
    tags: ["Creator Economy", "Data-Driven", "Always-On Strategy", "Sports Betting"],
    timeline: "2023 - 2026",
    role: "Director, Creator & Influence at Octagon",
    keyInsights: [
      "Always-on strategy outperformed campaign-based activations by 3x in engagement",
      "Niche creator squads delivered higher authenticity than single-creator partnerships",
      "Power BI optimization created a continuous improvement loop for content performance",
      "Cultural presence through creators built brand affinity beyond sponsorship visibility",
    ],
  },
]

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getAllCaseSlugs(): string[] {
  return caseStudies.map((c) => c.slug)
}
