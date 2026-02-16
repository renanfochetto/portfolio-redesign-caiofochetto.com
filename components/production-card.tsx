"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
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

  return BarChart3;
};

interface ProductionCardProps {
  slug: string;
  brand: string;
  brandLogo?: string;
  title: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  tags: string[];
  locale: string;
}

export function ProductionCard({
  slug,
  brand,
  brandLogo,
  title,
  metrics,
  tags,
  locale
}: ProductionCardProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoFolder = theme === "dark" ? "white" : "black";
  const displayTags = tags.slice(0, 3);
  const displayMetrics = metrics.slice(0, 3);

  return (
    <Link
      href={`/${locale}/production/${slug}`}
      className="group relative block"
    >
      <div className="
        relative overflow-hidden 
        rounded-lg 
        border border-neutral-600 
        bg-card 
        p-6 
        transition-all duration-200
        hover:border-primary
        active:scale-[0.98]
      ">

        <div className="mb-6 flex items-start justify-between">
          {mounted && brandLogo && (
            <div className="flex h-16 w-16 items-center justify-start">
              <Image
                src={`/logos/${logoFolder}/${brandLogo}.svg`}
                alt={`${brand} logo`}
                width={64}
                height={64}
                className="h-full w-auto max-w-[100px] object-contain object-left"
                unoptimized
              />
            </div>
          )}

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

        <h3 className="mb-6 text-xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-2xl">
          {title}
        </h3>

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
                <p className="text-xs text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

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

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
          <span>{locale === "pt" ? "Ver case completo" : "View full case"}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

      </div>
    </Link>
  );
}
