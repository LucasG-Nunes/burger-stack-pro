"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import type { BurgerLayer, BurgerLayerId } from "@/core/entities/BurgerLayer";
import { ASSETS } from "@/shared/constants/assets.constants";
import { cn } from "@/shared/helpers/cn";

import { ImagePlaceholder } from "../../atoms/ImagePlaceholder/ImagePlaceholder";

/**
 * Visual de cada camada enquanto não há PNG. `height` (px) define o empilhamento
 * final — ao trocar pelos PNGs, ajuste as alturas para as camadas se encaixarem.
 */
const LAYER_VISUALS: Record<BurgerLayerId, { height: number; className: string }> = {
  "top-bun": {
    height: 112,
    className:
      "w-[80%] rounded-t-[999px] rounded-b-2xl bg-linear-to-b from-amber-400 via-amber-600 to-amber-800 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.35)]",
  },
  lettuce: {
    height: 26,
    className: "w-[92%] rounded-[50%] bg-linear-to-b from-lime-400 to-green-700",
  },
  patty: {
    height: 64,
    className:
      "w-[88%] rounded-3xl bg-linear-to-b from-[#6b3419] via-[#3d1a0b] to-[#251006] shadow-[0_0_30px_rgba(229,52,31,0.35)]",
  },
  cheese: {
    height: 22,
    className: "w-[94%] rounded-md bg-linear-to-b from-amber-200 to-amber-400 [clip-path:polygon(0_0,100%_0,96%_100%,70%_70%,52%_100%,30%_70%,6%_100%)]",
  },
  "bottom-bun": {
    height: 70,
    className:
      "w-[80%] rounded-t-xl rounded-b-[48px] bg-linear-to-b from-amber-500 to-amber-800 shadow-[inset_0_10px_16px_rgba(0,0,0,0.3)]",
  },
};

/** Distância extra (px) entre as camadas quando estão "explodidas". */
const SPREAD_GAP = 80;
/** Fração do scroll da seção em que a montagem acontece. */
const ASSEMBLY_RANGE: [number, number] = [0.08, 0.72];

interface BurgerAssemblyProps {
  layers: BurgerLayer[];
}

/**
 * BLOCO 2 — Showstopper: montagem do burger no scroll.
 * A seção é alta (320vh) e o palco é `sticky`; o progresso do scroll dentro
 * dela move cada camada da posição "explodida" até a posição empilhada.
 */
export function BurgerAssembly({ layers }: BurgerAssemblyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Suaviza o scroll (roda do mouse dá "degraus").
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // Posições finais (empilhadas) relativas ao centro do palco.
  const heights = layers.map((layer) => LAYER_VISUALS[layer.id].height);
  const totalHeight = heights.reduce((sum, h) => sum + h, 0);
  const middleIndex = (layers.length - 1) / 2;
  let cursor = -totalHeight / 2;
  const positions = heights.map((height, index) => {
    const stackY = cursor + height / 2;
    cursor += height;
    return { stackY, spreadY: stackY + (index - middleIndex) * SPREAD_GAP };
  });

  const introOpacity = useTransform(progress, [0, 0.45, 0.6], [1, 1, 0]);
  const outroOpacity = useTransform(progress, [0.68, 0.82], [0, 1]);
  const outroY = useTransform(progress, [0.68, 0.82], [30, 0]);
  const plateGlow = useTransform(progress, [0.5, 0.8], [0.15, 1]);

  return (
    <section
      id="montagem"
      ref={sectionRef}
      aria-label="Montagem do burger"
      className={cn("relative", prefersReducedMotion ? "h-svh" : "h-[320vh]")}
    >
      <div className="section-container sticky top-0 flex h-svh flex-col items-center justify-center gap-4 overflow-hidden lg:flex-row lg:justify-between lg:gap-12">
        {/* Textos: antes e depois da montagem (empilhados e com crossfade) */}
        <div className="relative z-20 h-28 w-full shrink-0 text-center lg:h-52 lg:w-[38%] lg:text-left">
          <motion.div style={{ opacity: introOpacity }} className="absolute inset-x-0 top-0 px-4 lg:px-0">
            <p className="text-xs font-semibold tracking-[0.3em] text-ember-400 uppercase">
              Role para montar
            </p>
            <h2 className="mt-2 font-display text-5xl tracking-wide md:text-7xl">
              Cada camada <span className="text-fire">importa.</span>
            </h2>
          </motion.div>
          <motion.div
            style={{ opacity: outroOpacity, y: outroY }}
            className="absolute inset-x-0 top-0 px-4 lg:px-0"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-ember-400 uppercase">
              Montado na hora
            </p>
            <h2 className="mt-2 font-display text-5xl tracking-wide md:text-7xl">
              Do fogo direto <span className="text-fire">pra você.</span>
            </h2>
          </motion.div>
        </div>

        {/* Palco */}
        <div className="relative h-[60vh] w-[300px] shrink-0 scale-[0.72] sm:scale-90 md:h-[70vh] md:w-[400px] md:scale-100 lg:mr-60">
          <motion.div
            aria-hidden="true"
            style={{ opacity: plateGlow }}
            className="absolute top-1/2 left-1/2 h-40 w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/30 blur-3xl"
          />

          {layers.map((layer, index) => (
            <AssemblyLayer
              key={layer.id}
              layer={layer}
              index={index}
              progress={progress}
              stackY={positions[index].stackY}
              spreadY={prefersReducedMotion ? positions[index].stackY : positions[index].spreadY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface AssemblyLayerProps {
  layer: BurgerLayer;
  index: number;
  progress: MotionValue<number>;
  stackY: number;
  spreadY: number;
}

/** Componente próprio por camada: hooks não podem ser chamados dentro de `.map`. */
function AssemblyLayer({ layer, index, progress, stackY, spreadY }: AssemblyLayerProps) {
  const visual = LAYER_VISUALS[layer.id];
  const assetSrc = ASSETS.layers[layer.id];
  const tiltDirection = index % 2 === 0 ? 1 : -1;

  const y = useTransform(progress, ASSEMBLY_RANGE, [spreadY, stackY]);
  const rotate = useTransform(progress, ASSEMBLY_RANGE, [6 * tiltDirection, 0]);
  const x = useTransform(progress, ASSEMBLY_RANGE, [18 * tiltDirection, 0]);
  const labelOpacity = useTransform(progress, [0, 0.45, 0.6], [1, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        height: visual.height,
        top: `calc(50% - ${visual.height / 2}px)`,
        zIndex: 10 - index,
      }}
      className="absolute inset-x-0 flex items-center justify-center"
    >
      {assetSrc ? (
        <ImagePlaceholder src={assetSrc} alt={layer.name} className="size-full" sizes="400px" />
      ) : (
        <div aria-hidden="true" className={cn("h-full", visual.className)} />
      )}

      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute left-full ml-2 hidden w-56 items-center gap-3 md:flex"
      >
        <span className="h-px w-10 bg-ember-500/60" />
        <span>
          <span className="block font-display text-xl tracking-wide text-cream-100">
            {String(index + 1).padStart(2, "0")} · {layer.name}
          </span>
          <span className="block text-xs text-ash-400">{layer.detail}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
