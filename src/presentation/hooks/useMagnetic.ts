"use client";

import { type MotionValue, useReducedMotion, useSpring } from "framer-motion";
import { type RefObject, useEffect, useRef } from "react";

import { SPRING_MAGNETIC } from "@/shared/constants/motion.constants";

interface UseMagneticOptions {
  /** Distância (px) além da borda do elemento em que o "ímã" começa a agir. */
  radius?: number;
  /** Fração da distância cursor→centro que o elemento percorre (0–1). */
  strength?: number;
}

interface Magnetic<T extends HTMLElement> {
  /** Coloque no wrapper ESTÁTICO (não no elemento que se move), para medir sem feedback. */
  ref: RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Botão magnético com física de mola: quando o cursor chega perto, o elemento
 * é puxado na direção dele; ao sair do raio, volta com "bounce".
 * Desativado em telas touch e com `prefers-reduced-motion`.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>({
  radius = 120,
  strength = 0.35,
}: UseMagneticOptions = {}): Magnetic<T> {
  const ref = useRef<T>(null);
  const x = useSpring(0, SPRING_MAGNETIC);
  const y = useSpring(0, SPRING_MAGNETIC);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const activationZone = radius + Math.max(rect.width, rect.height) / 2;

      if (Math.hypot(dx, dy) < activationZone) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion, radius, strength, x, y]);

  return { ref, x, y };
}
