"use client";

import {
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type MouseEvent, useCallback } from "react";

import { SPRING_SOFT } from "@/shared/constants/motion.constants";

interface UseMouseParallaxOptions {
  /** Deslocamento máximo em px. */
  strength?: number;
  /** Inclinação máxima em graus (efeito 3D). */
  tilt?: number;
}

export interface MouseParallax {
  /** Estilo pronto para um `motion.*`: move NA DIREÇÃO OPOSTA ao cursor. */
  style: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
  };
  /** Posição normalizada e suavizada do cursor (-0.5 → 0.5), para camadas extras. */
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  handlers: {
    onMouseMove: (event: MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  };
}

/**
 * Mouse-tracking parallax. Espalhe `handlers` no container que captura o mouse
 * e aplique `style` no elemento que deve "fugir" do cursor.
 */
export function useMouseParallax({
  strength = 32,
  tilt = 8,
}: UseMouseParallaxOptions = {}): MouseParallax {
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, SPRING_SOFT);
  const pointerY = useSpring(rawY, SPRING_SOFT);

  const x = useTransform(pointerX, (v) => -v * strength);
  const y = useTransform(pointerY, (v) => -v * strength);
  const rotateX = useTransform(pointerY, (v) => v * tilt);
  const rotateY = useTransform(pointerX, (v) => -v * tilt);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [prefersReducedMotion, rawX, rawY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    style: { x, y, rotateX, rotateY },
    pointer: { x: pointerX, y: pointerY },
    handlers: { onMouseMove, onMouseLeave },
  };
}
