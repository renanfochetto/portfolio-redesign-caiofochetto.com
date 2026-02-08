import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/caiofochetto" },
  { label: "Email", href: "mailto:caiofochetto@gmail.com" },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* CTA */}
        <div className="mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {"Let's Connect"}
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold text-foreground md:text-5xl">
            Ready to build your next great brand story?
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:caiofochetto@gmail.com"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/caiofochetto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Caio Fochetto
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Creator Economy & Performance Marketing Leader
            </p>
          </div>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
