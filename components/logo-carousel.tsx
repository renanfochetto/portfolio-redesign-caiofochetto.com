"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const brands = [
  "Budweiser",
  "Betfair",
  "A+E Networks",
  "HISTORY",
  "Formula E",
  "Jellysmack",
  "Octagon",
  "Ambev",
  "Lifetime",
  "A&E",
  "Vasco",
  "Cruzeiro",
];

export function LogoCarousel() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Duplicar array para loop seamless
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="mt-10 border-t border-border pt-6">
      <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by Global Brands
      </p>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8 md:gap-12"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, -1200],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }
          }
        >
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 transition-all duration-300"
              style={{
                filter: "grayscale(1)",
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(1)";
                e.currentTarget.style.opacity = "0.6";
              }}
            >
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                {brand}
              </span>
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
