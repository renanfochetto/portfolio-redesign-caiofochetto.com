"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const logos = [
  { name: "ae", alt: "A+E Networks" },
  { name: "ambev", alt: "Ambev" },
  { name: "betfair", alt: "Betfair" },
  { name: "budweiser", alt: "Budweiser" },
  { name: "formulae", alt: "Formula E" },
  { name: "history", alt: "History Channel" },
  { name: "jellysmack", alt: "Jellysmack" },
  { name: "lifetime", alt: "Lifetime" },
  { name: "octagon", alt: "Octagon" },
];

export function LogoCarousel() {
  const { theme, systemTheme } = useTheme();
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

  // Determinar tema atual
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Folder: white para dark mode, black para light mode
  const logoFolder = isDark ? "white" : "black";

  // Duplicar logos para loop seamless
  const duplicatedLogos = [...logos, ...logos];

  // Não renderizar até montar (evita mismatch)
  if (!mounted) {
    return (
      <div className="mt-10 border-t border-border pt-6">
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by Global Brands
        </p>
        <div className="relative h-16 overflow-hidden">
          {/* Placeholder vazio */}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-border pt-6">
      <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by Global Brands
      </p>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-12 md:gap-16"
          animate={
            prefersReducedMotion
              ? {}
              : {
                x: [0, -2400],
              }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
          }
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="group flex h-16 w-32 flex-shrink-0 cursor-pointer items-center justify-center transition-opacity duration-300"
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
                src={`/logos/${logoFolder}/${logo.name}_${logoFolder}.svg`}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-full w-full object-contain object-center"
                unoptimized={true}
                priority={idx < 9} // Priorizar primeira volta
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