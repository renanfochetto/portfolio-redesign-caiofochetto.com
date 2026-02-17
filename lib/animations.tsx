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

// ✅ VALORES INTERMEDIÁRIOS (Visível mas elegante)
export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 40  // ✅ 40px = Visível sem ser exagerado
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,  // ✅ 0.8s = Perceptível mas não lento demais
      delay: custom * 0.15,  // ✅ 0.15s = Stagger perceptível
      ease: "easeOut",
    },
  }),
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // ✅ 0.15s = Cascata perceptível
    },
  },
};