export interface ProductionCaseMedia {
  thumbnail: string;
  hero: {
    type: "video" | "image";
    url: string;
    placeholder?: string;
    alt: string;
  };
  gallery?: Array<{
    type: "image" | "video";
    url: string;
    alt?: string;
    caption?: string;
  }>;
}

export interface ProductionCaseSEO {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface ProductionCase {
  // Identificação
  id: string;
  slug: string;

  // Informações básicas
  title: string;
  brand: string;
  year: string;
  type: string;

  // Conteúdo principal
  role: string;
  what: string;
  myRole: string;

  // Categorização
  tags: string[];

  // Media
  media: ProductionCaseMedia;

  // SEO
  seo: ProductionCaseSEO;
}
