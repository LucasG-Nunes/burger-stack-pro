"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/shared/helpers/cn";

interface PulsingCTAProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/* Cada keyframe precisa ter o MESMO número de sombras para o Framer interpolar. */
const PULSE_SHADOWS = [
  "0 0 0 0px rgba(255,106,0,0.55), 0 0 24px 0px rgba(255,106,0,0.35)",
  "0 0 0 16px rgba(255,106,0,0), 0 0 56px 8px rgba(229,52,31,0.55)",
  "0 0 0 0px rgba(255,106,0,0), 0 0 24px 0px rgba(255,106,0,0.35)",
];

/** CTA principal com glow pulsante (anel que expande + halo de brasa). */
export function PulsingCTA({ href, children, className }: PulsingCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative inline-flex items-center justify-center gap-3 rounded-full",
        "bg-linear-to-r from-ember-400 via-ember-500 to-brasa-500",
        "px-8 py-4 font-display text-xl tracking-wider text-coal-950 uppercase",
        className,
      )}
      animate={prefersReducedMotion ? undefined : { boxShadow: PULSE_SHADOWS }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}
