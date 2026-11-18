import type { ReactNode } from "react";

import { cn } from "@/shared/helpers/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <p className="text-xs font-semibold tracking-[0.3em] text-ember-400 uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-5xl leading-[0.95] tracking-wide text-balance md:text-7xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-ash-400 md:text-lg">{description}</p>}
    </header>
  );
}
