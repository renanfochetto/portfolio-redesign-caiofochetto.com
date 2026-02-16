"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
