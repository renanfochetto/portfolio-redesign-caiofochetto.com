"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme-provider";
import type { ProductionCase } from "@/types/production";

interface ProductionCardProps {
  case: ProductionCase;
}

export function ProductionCard({ case: productionCase }: ProductionCardProps) {
  const { locale } = useI18n();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { slug, title, brand, year, type, role, tags } = productionCase;

  // ✅ DESCRIÇÃO: usar o campo 'description' se existir, senão fallback vazio
  const description = productionCase.description || "";

  // ✅ LOGO MAPPING - apenas as brands que REALMENTE têm logo
  const brandLogos: Record<string, string> = {
    "Netflix": "netflix",
    "Natura": "natura",
    "Havaianas": "havaianas",
    "Bohemia": "bohemia",
    "Nestlé": "nestle",
  };

  const logoFolder = theme === "dark" ? "white" : "black";
  const logoFile = brandLogos[brand]; // undefined se não existir

  // Primeiras 3 tags
  const displayTags = tags.slice(0, 3);

  return (
    <Link
      href={`/production/${slug}`}
      aria-label={`Ver detalhes de ${title} - ${role}`}
      className="group block rounded-lg border border-neutral-600 bg-card p-6 transition-all duration-200 hover:border-primary active:scale-[0.98]"
    >
      {/* Header: LOGO + Badge + Arrow */}
      <div className="mb-6 flex items-start justify-between">
        {/* Logo da Brand (APENAS se existir no mapping) */}
        <div className="flex h-16 w-32 items-center justify-start">
          {mounted && logoFile ? (
            <Image
              src={`/logos/${logoFolder}/${logoFile}.svg`}
              alt={`${brand} logo`}
              width={128}
              height={64}
              className="h-full w-auto max-w-full object-contain object-left"
              unoptimized
              onError={(e) => {
                // ✅ Fallback se imagem não carregar
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            // ✅ Fallback: mostrar nome da brand se não tiver logo
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              {brand}
            </span>
          )}
        </div>

        {/* Badge Vídeo + Arrow */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
            <Play className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {locale === "pt" ? "Vídeo" : "Video"}
            </span>
          </div>

          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </div>
      </div>

      {/* Título do Case */}
      <h3 className="mb-4 text-xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-2xl">
        {title}
      </h3>

      {/* ✅ DESCRIÇÃO BREVE (só mostra se existir) */}
      {description && (
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      )}

      {/* Role + Type */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            {role}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {type} • {year}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full border border-neutral-600 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ✅ LINK "Ver case completo" - IGUAL PERFORMANCE */}
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
        <span>
          {locale === "pt" ? "Ver case completo" : "View full case"}
        </span>
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}