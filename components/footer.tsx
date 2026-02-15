"use client";

import { useI18n } from "@/lib/i18n";
import { Linkedin, Mail } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

interface FooterProps {
  hideContact?: boolean;
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

                {/* BOTÕES COM RELEVO */}
                <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">

                  {/* LinkedIn - Azul com relevo */}
                  <a
                    href="https://linkedin.com/in/caiofochetto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center gap-2 
                      rounded-full px-6 py-3 text-sm font-semibold
                      bg-gradient-to-b from-[#0A66C2] to-[#084d92]
                      text-white
                      shadow-[0_4px_0_0_rgba(0,0,0,0.3)]
                      hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3)]
                      hover:-translate-y-0.5
                      active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)]
                      active:translate-y-1
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2
                    "
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>

                  {/* Email - Verde com relevo */}
                  <a
                    href="mailto:caiofochetto@gmail.com"
                    className="
                      inline-flex items-center justify-center gap-2 
                      rounded-lg px-6 py-3 text-sm font-semibold
                      bg-gradient-to-b from-emerald-500 to-emerald-600
                      text-white
                      shadow-[0_4px_0_0_rgba(0,0,0,0.25)]
                      hover:shadow-[0_6px_0_0_rgba(0,0,0,0.25)]
                      hover:-translate-y-0.5
                      active:shadow-[0_2px_0_0_rgba(0,0,0,0.25)]
                      active:translate-y-1
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                    "
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
          <p className="text-xs">&copy; {new Date().getFullYear()} Caio Fochetto.</p>
          <p className="text-xs">
            Desenvolvido por{" "}
            <a
              href="https://renanfochetto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/70 transition-colors hover:text-primary"
            >
              Renan Fochetto
            </a>
          </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}