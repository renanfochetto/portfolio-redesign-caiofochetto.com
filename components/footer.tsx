"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowUpRight, Linkedin, Mail, Youtube } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/caiofochetto", icon: Linkedin },
  { label: "Email", href: "mailto:caiofochetto@gmail.com", icon: Mail },
  { label: "YouTube", href: "https://youtube.com/@caiofochetto", icon: Youtube },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="border-t border-border px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <AnimatedItem index={0}>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t.footer.cta}
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {t.footer.ctaDescription}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://linkedin.com/in/caiofochetto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-primary/5 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:caiofochetto@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </AnimatedItem>

          <div className="flex gap-4">
            {socialLinks.slice(2).map((link, idx) => (
              <AnimatedItem key={link.label} index={idx + 2}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              </AnimatedItem>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Caio Fochetto. {t.footer.copyright}
            </p>
            <p className="text-xs text-muted-foreground">
              Desenvolvido por{" "}
              <a
                href="https://renanfochetto.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 transition-colors hover:text-primary"
              >
                Renan Fochetto
              </a>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
