import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface CaseCardProps {
  slug: string
  index: string
  brand: string
  title: string
  description: string
  metrics: { value: string; label: string }[]
  tags: string[]
}

export function CaseCard({
  slug,
  index,
  brand,
  title,
  description,
  metrics,
  tags,
}: CaseCardProps) {
  return (
    <Link
      href={`/case/${slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-secondary md:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono text-muted-foreground">{index}</span>
          <p className="mt-1 text-sm font-medium uppercase tracking-wider text-primary">
            {brand}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {description}
      </p>

      {/* Metrics */}
      <div className="mt-6 flex flex-wrap gap-6">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-lg font-bold text-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
