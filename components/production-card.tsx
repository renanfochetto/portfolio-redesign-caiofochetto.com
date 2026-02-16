"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ProductionCase } from "@/types/production";

interface ProductionCardProps {
  case: ProductionCase;
}

export function ProductionCard({ case: productionCase }: ProductionCardProps) {
  const { locale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { slug, title, brand, year, type, role, tags, media } = productionCase;

  // Lógica de logo (mesma dos performance cases)
  const logoMapping: Record<string, { folder: string; file: string }> = {
    Netflix: { folder: "netflix", file: "netflix" },
    Natura: { folder: "natura", file: "natura" },
    "Havaianas + Netflix": { folder: "havaianas", file: "havaianas" },
    Playground: { folder: "playground", file: "playground" },
    Bohemia: { folder: "bohemia", file: "bohemia" },
    "Nestlé": { folder: "nestle", file: "nestle" },
  };

  const brandLogo = logoMapping[brand];
  const logoFolder = brandLogo?.folder || "default";
  const logoFile = brandLogo?.file || "logo";

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
        {/* Logo da empresa */}
        {mounted && brandLogo && (
          <div className="flex h-16 w-16 items-center justify-start">
            <Image
              src={`/logos/${logoFolder}/${logoFile}.svg`}
              alt={`${brand} logo`}
              width={64}
              height={64}
              className="h-full w-auto max-w-[100px] object-contain object-left"
              unoptimized
            />
          </div>
        )}

        {/* Badge Vídeo + Arrow */}
        <div className="flex items-center gap-2">
          {/* Video Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
            <Play className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {locale === "pt" ? "Vídeo" : "Video"}
            </span>
          </div>

          {/* Arrow */}
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </div>
      </div>

      {/* Título do Case */}
      <h3 className="mb-4 text-xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-2xl">
        {title}
      </h3>

      {/* Role + Type (diferente dos performance cards) */}
      <div className="mb-6 space-y-2">
        {/* Role com ícone */}
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            {role}
          </p>
        </div>

        {/* Type + Year */}
        <p className="text-sm text-muted-foreground">
          {type} • {year}
        </p>
      </div>

      {/* Tags sutis */}
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
    </Link>
  );
}
