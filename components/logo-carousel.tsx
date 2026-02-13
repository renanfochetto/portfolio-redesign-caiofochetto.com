"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  { src: "/logos/ae-networks.png", alt: "A+E Networks" },
  { src: "/logos/betfair.png", alt: "Betfair" },
  { src: "/logos/budweiser.png", alt: "Budweiser" },
  { src: "/logos/formula-e.png", alt: "Formula E" },
  { src: "/logos/history.png", alt: "History Channel" },
  { src: "/logos/jellysmack.png", alt: "Jellysmack" },
  { src: "/logos/octagon.png", alt: "Octagon" },
  { src: "/logos/ambev.png", alt: "Ambev" },
  { src: "/logos/lifetime.png", alt: "Lifetime" },
  { src: "/logos/cruzeiro.png", alt: "Cruzeiro" },
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
  const duplicatedLogos = [...logos, ...logos];

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
              key={idx}
              className="flex-shrink-0 flex items-center justify-center h-16 w-32 transition-all duration-300 group cursor-pointer"
              style={{
                filter: "brightness(0.7) contrast(1.1)",
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1) contrast(1)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(0.7) contrast(1.1)";
                e.currentTarget.style.opacity = "0.6";
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="object-contain object-center h-full w-full"
                unoptimized={true}
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
