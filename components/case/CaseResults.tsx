"use client";

import type { CaseMetric } from "@/types/case";
import { Users, TrendingUp, Heart, MessageCircle, Play, Eye, Star, BarChart3, Target, Zap, Megaphone, Sparkles } from "lucide-react";
import { AnimatedMetricCard } from "./AnimatedMetricCard";

const metricIconMap: Record<string, any> = {
  reach: Users,
  revenueGrowth: BarChart3,
  bookingGrowth: TrendingUp,
  engagementRate: Heart,
  creators: Star,
  views: Play,
  contentPieces: Eye,
  impressions: Eye,
  interactions: MessageCircle,
  sentiment: Sparkles,
  ctR: Target,
  watchTime: Play,
  revenue: BarChart3,
  organic: TrendingUp,
  engagement: Heart,
  reach_organic: Users,
};

function getMetricIcon(labelKey?: string) {
  if (!labelKey) return Users;
  // Tentar match exato primeiro
  if (metricIconMap[labelKey]) return metricIconMap[labelKey];
  // Tentar match parcial (case-insensitive)
  const lowerKey = labelKey.toLowerCase();
  for (const [key, icon] of Object.entries(metricIconMap)) {
    if (lowerKey.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerKey)) {
      return icon;
    }
  }
  return Users;
}

interface CaseResultsProps {
  metrics: CaseMetric[];
  locale: "pt" | "en";
}

export function CaseResults({ metrics, locale }: CaseResultsProps) {
  const getLabel = (metric: CaseMetric): string => {
    return locale === "pt" ? metric.label_pt : metric.label_en;
  };

  const getDescription = (metric: CaseMetric): string => {
    return locale === "pt" ? metric.description_pt : metric.description_en;
  };

  return (
    <section className="border-t border-border py-16 md:py-24" style={{ backgroundColor: `hsl(var(--card) / 0.5)` }}>
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          Resultados
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {metrics.map((metric, index) => {
            const IconComponent = getMetricIcon(metric.label_pt || metric.label_en);
            return (
              <AnimatedMetricCard
                key={index}
                index={index}
                icon={<IconComponent className="h-6 w-6" />}
                value={metric.value}
                label={getLabel(metric)}
                description={getDescription(metric)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
