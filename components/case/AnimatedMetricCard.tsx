"use client";

import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/animated-counter";
import { fadeInUpVariants } from "@/lib/animations";

interface AnimatedMetricCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  description: string;
  index: number;
}

export function AnimatedMetricCard({
  icon,
  value,
  label,
  description,
  index,
}: AnimatedMetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      className="rounded-lg border transition-all hover:border-primary/50"
      style={{ 
        backgroundColor: `hsl(var(--card))`,
        borderColor: `hsl(var(--border))`
      }}
    >
      <div className="flex items-start gap-3 p-8">
        <div className="h-6 w-6 text-primary flex-shrink-0 mt-1">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-5xl font-bold text-primary md:text-6xl">
            <AnimatedCounter
              value={parseFloat(value.match(/\d+/)?.[0] || "0")}
              suffix={value.match(/[K|M|%|+]/)?.[0] || ""}
              duration={1.8}
            />
          </div>
          <p className="mt-4 text-lg font-semibold text-foreground">
            {label}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
