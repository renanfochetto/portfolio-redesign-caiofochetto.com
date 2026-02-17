# PROMPT PARA V0: Navigation Helpers - Production Cases

## CONTEXTO
Criar funções helper para navegação ISOLADA entre production cases. A navegação NUNCA deve misturar performance e production cases.

## CRITICAL RULE
```
Performance ↔ Performance ONLY
Production ↔ Production ONLY
```

---

## HELPER FUNCTIONS
```typescript
// lib/production-cases.ts
import productionCasesData from "@/data/production-cases.json";
import type { ProductionCase } from "@/types";

/**
 * Get all production cases
 */
export function getAllProductionCases(): ProductionCase[] {
  return productionCasesData.cases as ProductionCase[];
}

/**
 * Get single production case by slug
 */
export function getProductionCaseBySlug(
  slug: string
): ProductionCase | undefined {
  const cases = getAllProductionCases();
  return cases.find((c) => c.slug === slug);
}

/**
 * Get navigation for production case
 * CRITICAL: Returns ONLY production cases (isolated)
 */
export function getProductionCaseNavigation(currentSlug: string): {
  prev: { slug: string; title: string; brand: string } | null;
  next: { slug: string; title: string; brand: string } | null;
} {
  const cases = getAllProductionCases();
  const currentIndex = cases.findIndex((c) => c.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev =
    currentIndex > 0
      ? {
          slug: cases[currentIndex - 1].slug,
          title: cases[currentIndex - 1].title,
          brand: cases[currentIndex - 1].brand,
        }
      : null;

  const next =
    currentIndex < cases.length - 1
      ? {
          slug: cases[currentIndex + 1].slug,
          title: cases[currentIndex + 1].title,
          brand: cases[currentIndex + 1].brand,
        }
      : null;

  return { prev, next };
}

/**
 * Generate static params for Next.js
 */
export function generateProductionCaseParams() {
  const cases = getAllProductionCases();
  return cases.map((c) => ({ slug: c.slug }));
}
```

---

## USAGE IN PAGES

### Production Case Page:
```tsx
import { 
  getProductionCaseBySlug,
  getProductionCaseNavigation 
} from "@/lib/production-cases";

export default function ProductionCasePage({ params }) {
  const productionCase = getProductionCaseBySlug(params.slug);
  const navigation = getProductionCaseNavigation(params.slug);
  
  // navigation.prev → só production
  // navigation.next → só production
}
```

### Performance Case Page (não muda):
```tsx
import { 
  getCaseBySlug,
  getCaseNavigation 
} from "@/lib/cases";

export default function CasePage({ params }) {
  const caseData = getCaseBySlug(params.slug);
  const navigation = getCaseNavigation(params.slug);
  
  // navigation.prev → só performance
  // navigation.next → só performance
}
```

---

## STATIC PARAMS GENERATION

### For Production Cases:
```tsx
// app/production/[slug]/page.tsx
import { generateProductionCaseParams } from "@/lib/production-cases";

export function generateStaticParams() {
  return generateProductionCaseParams();
}
```

### For Performance Cases (já existe):
```tsx
// app/case/[slug]/page.tsx
import { generateCaseParams } from "@/lib/cases";

export function generateStaticParams() {
  return generateCaseParams();
}
```

---

## SEPARATION GUARANTEE

### File Structure:
```
/lib
  ├─ cases.ts           → Performance helpers
  └─ production-cases.ts → Production helpers (NOVO)

/data
  ├─ cases.json         → 6 performance cases
  └─ production-cases.json → 6 production cases (NOVO)

/app
  ├─ case/[slug]        → Performance pages
  └─ production/[slug]  → Production pages (NOVO)
```

### Navigation Flow:
```
PERFORMANCE:
Betfair → Formula E → Budweiser → HISTORY → A&E → Lifetime
  ↑                                                      ↓
  └──────────────────────────────────────────────────────┘
  (loops dentro de performance cases)

PRODUCTION:
Netflix → Natura → Havaianas → Jazz → Bohemia → Nestlé
  ↑                                                    ↓
  └────────────────────────────────────────────────────┘
  (loops dentro de production cases)

❌ NUNCA: Betfair → Netflix
```

---

## TYPE DEFINITIONS
```typescript
// types/index.ts

// Performance Case (já existe)
export interface Case {
  id: string;
  slug: string;
  title: string;
  // ... resto dos campos
}

// Production Case (NOVO)
export interface ProductionCase {
  id: string;
  slug: string;
  title: string;
  brand: string;
  year: string;
  type: string;
  role: string;
  what: string;
  myRole: string;
  tags: string[];
  media: {
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
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
}

// Navigation types
export interface CaseNavigation {
  prev: {
    slug: string;
    title: string;
    brand: string;
  } | null;
  next: {
    slug: string;
    title: string;
    brand: string;
  } | null;
}
```

---

## ERROR HANDLING
```typescript
export function getProductionCaseBySlug(slug: string): ProductionCase | undefined {
  const cases = getAllProductionCases();
  const foundCase = cases.find((c) => c.slug === slug);
  
  if (!foundCase) {
    console.warn(`Production case not found: ${slug}`);
    return undefined;
  }
  
  return foundCase;
}
```

---

## TAREFA PARA V0:

1. Criar `/lib/production-cases.ts` com todas as funções
2. Adicionar `ProductionCase` interface em `/types/index.ts`
3. Garantir separação total (performance ≠ production)
4. Implementar error handling
5. Adicionar static params generation
6. Testar navegação ISOLADA

**CRÍTICO:**
- NUNCA misturar performance e production
- Navigation loops dentro do próprio tipo
- Arquivos/pastas/rotas separados
- Types separados

Gere o código completo com todos os helpers e types.