import Link from "next/link";
import { ArrowUpRight, Users, Radio, Heart, MessageCircle, TrendingUp, Eye, Star, Play, Zap, BarChart3, Megaphone, Target, Sparkles } from "lucide-react";

const metricIconMap: Record<string, any> = {
  reach: Users,
  revenueGrowth: TrendingUp,
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
};

const caseIconMap: Record<string, any> = {
  Users: Users,
  TrendingUp: TrendingUp,
  Zap: Zap,
  Play: Play,
  Star: Star,
  MessageCircle: MessageCircle,
  Eye: Eye,
  BarChart3: BarChart3,
  Megaphone: Megaphone,
  Target: Target,
};

function getMetricIcon(labelKey: string) {
  return metricIconMap[labelKey] || Eye;
}

function getCaseIcon(icon?: string) {
  return icon && caseIconMap[icon] ? caseIconMap[icon] : Eye;
}

interface CaseCardProps {
  href: string;
  brand: string;
  title: string;
  description: string;
  metrics: { value: string; label: string; labelKey?: string }[];
  tags: string[];
  viewCaseLabel: string;
  caseIcon?: string;
}

export function CaseCard({
  href,
  brand,
  title,
  description,
  metrics,
  tags,
  viewCaseLabel,
  caseIcon,
}: CaseCardProps) {
  const CardIconComponent = getCaseIcon(caseIcon);

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80 md:p-8"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <CardIconComponent className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {brand}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
              {title}
            </h3>
          </div>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary flex-shrink-0" />
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
