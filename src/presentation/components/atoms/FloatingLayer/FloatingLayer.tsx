"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/shared/helpers/cn";

interface FloatingLayerProps {
  children: ReactNode;
  /** Amplitude da flutuação em px (sobe e volta). */
  distance?: number;
  /** Duração de um ciclo completo, em segundos. */
  duration?: number;
  className?: string;
}

/**
 * Flutuação infinita no eixo Y. Anima só `transform` (GPU) e fica parado
 * com prefers-reduced-motion. Pode envolver conteúdo de Server Components.
 */
export function FloatingLayer({
  children,
  distance = 15,
  duration = 4,
  className,
}: FloatingLayerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { y: [0, -distance, 0] }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
