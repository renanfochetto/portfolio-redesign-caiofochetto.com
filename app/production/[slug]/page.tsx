import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductionCaseBySlug,
  getProductionCaseNavigation,
  getAllProductionCaseSlugs,
} from "@/lib/production-cases";
import { ProductionCaseContent } from "./page-content";

const SITE_URL = "https://www.caiofochetto.com";

const companyLogos: Record<string, string> = {
  "Octagon": "octagon.avif",
  "A+E Networks": "aenetworks.avif",
  "Jellysmack": "jellysmack.avif",
  "Playground": "playground.avif",
  "Portal R7": "portalr7.avif",
  "Rede Boa Nova": "redeboanova.avif",
  "TV Cultura": "tvcultura.avif",
  "TV Mundo Maior": "tvmundomaior.avif",
};

const brandLogos: Record<string, string> = {
  "Netflix": "netflix",
  "Budweiser": "budweiser",
  "HISTORY": "history",
  "Natura": "natura",
  "A&E": "ae",
  "Bradesco": "bradesco",
};

interface ProductionCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductionCaseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

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

  const navigation = getProductionCaseNavigation(resolvedParams.slug);

  return (
    <ProductionCaseContent
      productionCase={productionCase}
      companyLogos={companyLogos}
      brandLogos={brandLogos}
      navigation={navigation}
    />
  );
}
