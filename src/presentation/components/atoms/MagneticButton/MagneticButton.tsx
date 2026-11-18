"use client";

import { motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";

import { useMagnetic } from "@/presentation/hooks/useMagnetic";
import { cn } from "@/shared/helpers/cn";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Raio (px) de atração além da borda do botão. */
  radius?: number;
  strength?: number;
}

/**
 * Botão magnético: o wrapper é estático (é ele que medimos), o link se move com
 * mola e o conteúdo se move um pouco mais — dá a sensação de profundidade.
 */
export function MagneticButton({
  href,
  children,
  className,
  radius = 140,
  strength = 0.4,
}: MagneticButtonProps) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>({ radius, strength });
  const innerX = useTransform(x, (v) => v * 0.35);
  const innerY = useTransform(y, (v) => v * 0.35);

  return (
    <div ref={ref} className="inline-block">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x, y }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full",
          "bg-linear-to-br from-ember-400 via-ember-500 to-brasa-600 px-10 py-5",
          "font-display text-2xl tracking-wider text-coal-950 uppercase shadow-ember",
          "transition-shadow duration-300 hover:shadow-[0_0_80px_-6px_rgba(255,106,0,0.9)]",
          className,
        )}
      >
        <motion.span style={{ x: innerX, y: innerY }} className="flex items-center gap-3">
          {children}
        </motion.span>
      </motion.a>
    </div>
  );
}
