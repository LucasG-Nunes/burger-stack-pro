import type { ReactNode } from "react";

import { cn } from "@/shared/helpers/cn";

interface PulsingCTAProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * CTA principal com glow de "brasa a pulsar" (utility `ember-pulse` em globals.css).
 * Animação 100% CSS: sem JavaScript, roda no compositor e funciona em Server Components.
 */
export function PulsingCTA({ href, children, className }: PulsingCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "ember-pulse inline-flex items-center justify-center gap-3 rounded-full",
        "bg-linear-to-r from-ember-400 via-ember-500 to-flame",
        "px-8 py-4 font-display text-xl tracking-wider text-coal-950 uppercase md:px-10 md:text-2xl",
        "transition-transform duration-300 hover:scale-105 active:scale-95",
        className,
      )}
    >
      {children}
    </a>
  );
}
