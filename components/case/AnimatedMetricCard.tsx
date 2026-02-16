"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
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
          <p className="text-5xl font-bold text-primary md:text-6xl">
            {value}
          </p>
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
