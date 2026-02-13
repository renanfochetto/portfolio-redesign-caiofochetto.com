export interface CaseStudy {
  slug: string;
  brand: string;
  tags: string[];
  metrics: { value: string; labelKey: string }[];
  timeline: string;
  role: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "samsung-gaming",
    brand: "Samsung",
    tags: ["Creator Economy", "Gaming", "Performance Marketing", "Brand Strategy"],
    metrics: [
      { value: "+634%", labelKey: "revenueGrowth" },
      { value: "25M+", labelKey: "reach" },
      { value: "8.2%", labelKey: "engagementRate" },
    ],
    timeline: "2022 - 2023",
    role: "Strategy Director",
  },
  {
    slug: "heineken-creators",
    brand: "Heineken",
    tags: ["Influencer Marketing", "Brand Content", "Social Strategy", "Events"],
    metrics: [
      { value: "75M+", labelKey: "reach" },
      { value: "7.5%", labelKey: "engagementRate" },
      { value: "150+", labelKey: "creators" },
    ],
    timeline: "2021 - 2023",
    role: "Creator Lead",
  },
  {
    slug: "redbull-content",
    brand: "Red Bull",
    tags: ["Content Strategy", "Creator Economy", "Digital Marketing", "Video"],
    metrics: [
      { value: "50M+", labelKey: "views" },
      { value: "12%", labelKey: "engagementRate" },
      { value: "200+", labelKey: "contentPieces" },
    ],
    timeline: "2020 - 2022",
    role: "Content Director",
  },
  {
    slug: "airbnb-experiences",
    brand: "Airbnb",
    tags: ["Brand Strategy", "Creator Partnerships", "Performance", "LATAM"],
    metrics: [
      { value: "35M+", labelKey: "reach" },
      { value: "6.8%", labelKey: "engagementRate" },
      { value: "+420%", labelKey: "bookingGrowth" },
    ],
    timeline: "2023 - 2024",
    role: "Marketing Lead",
  },
  {
    slug: "netflix-creators",
    brand: "Netflix",
    tags: ["Influencer Marketing", "Content Creation", "Brand Partnerships", "LATAM"],
    metrics: [
      { value: "45M+", labelKey: "reach" },
      { value: "9.2%", labelKey: "engagementRate" },
      { value: "500+", labelKey: "creators" },
    ],
    timeline: "2022 - 2024",
    role: "Creator Operations Manager",
  },
  {
    slug: "spotify-campaigns",
    brand: "Spotify",
    tags: ["Creator Economy", "Music Marketing", "Digital Strategy", "Analytics"],
    metrics: [
      { value: "80M+", labelKey: "reach" },
      { value: "11.5%", labelKey: "engagementRate" },
      { value: "1000+", labelKey: "contentPieces" },
    ],
    timeline: "2021 - 2023",
    role: "Director of Creator Partnerships",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
