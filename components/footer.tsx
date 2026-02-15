"use client";

import { useI18n } from "@/lib/i18n";
import { Linkedin, Mail, Youtube } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

interface FooterProps {
  hideContact?: boolean; // Nova prop para esconder CTA
}

export function Footer({ hideContact = false }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer id="contact" className="border-t border-neutral-600 px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">

        {/* Mostrar CTA apenas se hideContact for false */}
        {!hideContact && (
          <>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <AnimatedItem index={0}>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  {t.footer.cta}
                </h2>
                <p className="mt-2 max-w-md text-base text-muted-foreground">
                  {t.footer.ctaDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="https://linkedin.com/in/caiofochetto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-500 px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:border-white hover:bg-[#0a66c2] hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:caiofochetto@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-500 px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:border-white hover:bg-[#10b981] hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </div>
              </AnimatedItem>
            </div>

            <div className="mt-12 border-t border-neutral-600 pt-8" />
          </>
        )}

        {/* Copyright sempre visível */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} Caio Fochetto.</p>
          <p>
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
      </AnimatedSection>
    </footer>
  );
}