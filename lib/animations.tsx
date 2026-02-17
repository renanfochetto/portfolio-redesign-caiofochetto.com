"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function useCounter(
  value: number,
  duration: number = 2,
  decimals: number = 0
) {
  const count = useMotionValue(0);

  const formatted = useTransform(count, (latest) => {
    if (decimals > 0) {
      return parseFloat(latest.toFixed(decimals));
    }
    return Math.round(latest);
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const shouldReduce = prefersReducedMotion();

    if (shouldReduce) {
      setDisplayValue(value);
      return;
    }

    const animation = animate(count, value, {
      duration: duration,
      ease: "easeOut",
    });

    const unsubscribe = formatted.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value, duration, decimals, count, formatted]);

  return displayValue;
}

// ✅ VALORES EXAGERADOS PARA TESTE
export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 100  // ✅ EXAGERADO: era 20, agora 100px
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,  // ✅ EXAGERADO: era 0.6s, agora 1.2s (bem lento)
      delay: custom * 0.3,  // ✅ EXAGERADO: era 0.1s, agora 0.3s entre cada
      ease: "easeOut",
    },
  }),
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,  // ✅ EXAGERADO: era 0.1s, agora 0.3s
    },
  },
};