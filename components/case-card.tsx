// components/case-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Users,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Play,
  BarChart3
} from "lucide-react";

// Mapeamento de ícones por tipo de métrica
const getMetricIcon = (label: string) => {
  const lowerLabel = label.toLowerCase();

  if (lowerLabel.includes("alcance") || lowerLabel.includes("reach")) {
    return Users;
  }
  if (lowerLabel.includes("impressões") || lowerLabel.includes("impressions")) {
    return Eye;
  }
  if (lowerLabel.includes("engajamento") || lowerLabel.includes("engagement")) {
    return Heart;
  }
  if (lowerLabel.includes("interações") || lowerLabel.includes("interactions")) {
    return MessageCircle;
  }
  if (lowerLabel.includes("crescimento") || lowerLabel.includes("growth")) {
    return TrendingUp;
  }
  if (lowerLabel.includes("receita") || lowerLabel.includes("revenue")) {
    return DollarSign;
  }
  if (lowerLabel.includes("cliques") || lowerLabel.includes("ctr")) {
    return MousePointerClick;
  }
  if (lowerLabel.includes("views") || lowerLabel.includes("visualizações")) {
    return Play;
  }

  // Default
  return BarChart3;
};

interface CaseCardProps {
  slug: string;
  brand: string;
  brandLogo?: string; // e.g. "betfair" (busca em /logos/white ou /black)
  title: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  tags: string[];
  locale: string;
}

export function CaseCard({
  slug,
  brand,
  brandLogo,
  title,
  metrics,
  tags,
  locale
}: CaseCardProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const logoFolder = isDark ? "white" : "black";

  // Limitar tags a 3
  const displayTags = tags.slice(0, 3);

  // Limitar métricas a 3 (as principais)
  const displayMetrics = metrics.slice(0, 3);

  return (
    <Link
      href={`/${locale}/case/${slug}`}
      className="group relative block"
    >
      <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:border-primary hover:bg-neutral-900/80">

        {/* Header: Logo + Brand + Arrow */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Logo da empresa (se disponível) */}
            {mounted && brandLogo && (
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src={`/logos/${logoFolder}/${brandLogo}.svg`}
                  alt={`${brand} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
            )}

            {/* Brand name */}
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {brand}
            </p>
          </div>

          {/* Arrow */}
          <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </div>

        {/* Título */}
        <h3 className="mb-6 text-xl font-bold leading-tight text-neutral-50 transition-colors group-hover:text-primary md:text-2xl">
          {title}
        </h3>

        {/* Métricas com ícones variados */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {displayMetrics.map((metric, index) => {
            const IconComponent = getMetricIcon(metric.label);

            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <p className="text-lg font-bold text-primary md:text-xl">
                    {metric.value}
                  </p>
                </div>
                <p className="text-xs text-neutral-400">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tags sutis */}
        <div className="flex flex-wrap gap-2">
          {displayTags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-400 transition-colors hover:border-primary hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA (sempre visível) */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
          <span>{locale === "pt" ? "Ver case completo" : "View full case"}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {/* Hover border glow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Link>
  );
}