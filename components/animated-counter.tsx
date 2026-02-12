"use client";

import { useCounter, prefersReducedMotion } from "@/lib/animations";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasStarted(true);
    }
  }, [isInView]);

  const displayValue = useCounter(hasStarted ? value : 0, duration);
  const shouldReduce = prefersReducedMotion();

  return (
    <div ref={ref}>
      {prefix}
      {shouldReduce ? value : displayValue}
      {suffix}
    </div>
  );
}
