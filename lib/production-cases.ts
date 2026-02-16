import { ProductionCase } from "@/types/production";
import productionCasesData from "@/data/production-cases.json";

const productionCases: ProductionCase[] = productionCasesData;

/**
 * Get all production cases
 */
export function getAllProductionCases(): ProductionCase[] {
  return productionCases;
}

/**
 * Get production case by slug
 */
export function getProductionCaseBySlug(slug: string): ProductionCase | undefined {
  return productionCases.find((c) => c.slug === slug);
}

/**
 * Get all production case slugs for static generation
 */
export function getAllProductionCaseSlugs(): string[] {
  return productionCases.map((c) => c.slug);
}

/**
 * Get production case navigation (prev/next) - ISOLATED TO PRODUCTION CASES ONLY
 */
export function getProductionCaseNavigation(currentSlug: string): {
  prev: ProductionCase | null;
  next: ProductionCase | null;
} {
  const currentIndex = productionCases.findIndex((c) => c.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev =
    currentIndex > 0 ? productionCases[currentIndex - 1] : productionCases[productionCases.length - 1];

  const next =
    currentIndex < productionCases.length - 1 ? productionCases[currentIndex + 1] : productionCases[0];

  return { prev, next };
}

/**
 * Filter production cases by tag
 */
export function getProductionCasesByTag(tag: string): ProductionCase[] {
  return productionCases.filter((c) => c.tags.includes(tag));
}

/**
 * Get all unique tags from production cases
 */
export function getAllProductionCaseTags(): string[] {
  const tagsSet = new Set<string>();
  productionCases.forEach((c) => {
    c.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}
