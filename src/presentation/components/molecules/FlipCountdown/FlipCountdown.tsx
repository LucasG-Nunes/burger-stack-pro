"use client";

import { type CSSProperties, Fragment } from "react";

import { cn } from "@/shared/helpers/cn";

export interface CountdownUnit {
  label: string;
  /** `null` enquanto não há hora do cliente (SSR): mostra "--" sem pular layout. */
  value: number | null;
}

interface FlipCountdownProps {
  units: CountdownUnit[];
  /** Modo urgente: placas em laranja com brilho (ex: última hora antes de fechar). */
  urgent?: boolean;
  className?: string;
}

/**
 * Contador grande estilo "placa virando" (flip clock).
 * Cada dígito é uma placa própria e só ela gira quando muda (keyframe `flip-in` em
 * globals.css: `rotateX` + `opacity`, só GPU). Com reduced-motion, troca sem animar.
 */
export function FlipCountdown({ units, urgent = false, className }: FlipCountdownProps) {
  return (
    <div
      role="timer"
      aria-live="off"
      // `--d` = largura de cada placa; tudo escala a partir dela. Com 4 unidades (dias), placas menores.
      style={{ "--d": units.length > 3 ? "clamp(1.75rem, 6.2vw, 5rem)" : "clamp(2.4rem, 8.5vw, 6rem)" } as CSSProperties}
      className={cn("flex items-start justify-center gap-1.5 sm:gap-4 md:gap-6", className)}
    >
      {units.map((unit, index) => (
        <Fragment key={unit.label}>
          {index > 0 && (
            <span
              aria-hidden="true"
              className={cn(
                "font-display text-[calc(var(--d)*1.1)] leading-[1.4] text-ash-500",
                urgent && "animate-pulse text-flame",
              )}
            >
              :
            </span>
          )}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1 sm:gap-1.5 md:gap-2">
              {formatDigits(unit.value).map((digit, i) => (
                <FlipDigit key={i} digit={digit} urgent={urgent} />
              ))}
            </div>
            <span
              className={cn(
                "text-[0.6rem] font-semibold tracking-[0.12em] uppercase sm:text-xs sm:tracking-[0.3em]",
                urgent ? "text-ember-300" : "text-ash-400",
              )}
            >
              {unit.label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function formatDigits(value: number | null): string[] {
  if (value === null) return ["-", "-"];
  return String(Math.max(0, value)).padStart(2, "0").split("");
}

function FlipDigit({ digit, urgent }: { digit: string; urgent: boolean }) {
  return (
    <div
      className={cn(
        "relative grid h-[calc(var(--d)*1.5)] w-(--d) place-items-center overflow-hidden rounded-lg md:rounded-xl",
        "border bg-linear-to-b from-coal-700 via-coal-800 to-coal-900 [perspective:400px]",
        "shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]",
        urgent
          ? "border-flame/70 shadow-[0_0_28px_-4px_rgba(255,69,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "border-white/10",
      )}
    >
      {/* `key={digit}` remonta o span quando o dígito muda, e a animação CSS roda de novo.
          Sem placa "saindo" pendurada no DOM (nada acumula em aba em segundo plano). */}
      <span
        key={digit}
        className={cn(
          "animate-flip-in font-display text-[calc(var(--d)*1.25)] leading-none tabular-nums motion-reduce:animate-none",
          urgent ? "text-flame" : "text-cream-100",
        )}
      >
        {digit}
      </span>

      {/* Dobradiça da placa: linha no meio + metade de baixo um tom mais escura */}
      <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-black/15" />
    </div>
  );
}
