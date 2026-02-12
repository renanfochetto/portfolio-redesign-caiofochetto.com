import Link from "next/link";
import { ArrowUpRight, Users, Radio, Heart, MessageCircle, TrendingUp, Eye, Star, Play, Zap } from "lucide-react";

const metricIconMap: Record<string, any> = {
  reach: Users,
  revenueGrowth: TrendingUp,
  bookingGrowth: TrendingUp,
  engagementRate: Heart,
  creators: Star,
  views: Play,
  contentPieces: Eye,
  impressions: Eye,
};

function getMetricIcon(labelKey: string) {
  return metricIconMap[labelKey] || Eye;
}

interface CaseCardProps {
  href: string;
  brand: string;
  title: string;
  description: string;
  metrics: { value: string; label: string; labelKey?: string }[];
  tags: string[];
  viewCaseLabel: string;
}

export function CaseCard({
  href,
  brand,
  title,
  description,
  metrics,
  tags,
  viewCaseLabel,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80 md:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {brand}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
            {title}
          </h3>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/75">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-6">
        {metrics.map((m) => {
          const IconComponent = getMetricIcon(m.labelKey || "");
          return (
            <div key={m.label} className="flex items-start gap-2">
              <IconComponent className="mt-0.5 h-4 w-4 text-primary/50" />
              <div>
                <p className="text-lg font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-primary">
        {viewCaseLabel} &rarr;
      </p>
    </Link>
  );
}
