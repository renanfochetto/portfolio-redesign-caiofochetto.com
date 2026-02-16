"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const logos = [
  // Performance cases logos
  { name: "ae", alt: "A+E Networks" },
  { name: "ambev", alt: "Ambev" },
  { name: "betfair", alt: "Betfair" },
  { name: "budweiser", alt: "Budweiser" },
  { name: "formulae", alt: "Formula E" },
  { name: "history", alt: "History Channel" },
  { name: "jellysmack", alt: "Jellysmack" },
  { name: "lifetime", alt: "Lifetime" },
  { name: "octagon", alt: "Octagon" },
  // Production cases logos (NOVOS)
  { name: "netflix", alt: "Netflix" },
  { name: "natura", alt: "Natura" },
  { name: "havaianas", alt: "Havaianas" },
  { name: "playground", alt: "Playground" },
  { name: "bohemia", alt: "Bohemia" },
  { name: "nestle", alt: "Nestlé" },
];

export function LogoCarousel() {
  const { theme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Evitar flash SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicar logos para loop seamless
  const duplicatedLogos = [...logos, ...logos];

  // Determinar pasta baseado no tema: white para dark, black para light
  const logoFolder = theme === "dark" ? "white" : "black";

  // Não renderizar até montar (evita mismatch)
  if (!mounted) {
    return (
      <div className="mt-10 border-t border-neutral-600 pt-6">
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        </p>
        <div className="relative h-9 overflow-hidden">
          {/* Placeholder vazio */}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-neutral-600 pt-6">
      <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
      </p>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-14 md:gap-20"
          animate={
            prefersReducedMotion
              ? {}
              : {
                x: [0, -2400], // Ajustado para logos menores (15 logos * 2 * ~80px)
              }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                duration: 60, // Aumentado de 40 para 60 (mais logos = mais tempo)
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
          }
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="group flex flex-shrink-0 cursor-pointer items-center justify-center transition-opacity duration-300"
              style={{
                opacity: 0.7,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
            >
              <Image
                src={`/logos/${logoFolder}/${logo.name}.svg`}
                alt={logo.alt}
                width={60}
                height={36}
                className="object-contain object-center"
                unoptimized={true}
                priority={idx < 15}
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient fade effect nas extremidades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
}
