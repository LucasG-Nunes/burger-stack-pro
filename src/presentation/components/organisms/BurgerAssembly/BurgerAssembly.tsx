"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { type CSSProperties, useRef } from "react";

import type { BurgerLayer, BurgerLayerId } from "@/core/entities/BurgerLayer";
import { ASSETS } from "@/shared/constants/assets.constants";
import { cn } from "@/shared/helpers/cn";

/* ─────────────────────────────── Configuração ─────────────────────────────── */

/**
 * Dimensões do canvas comum das artes (viewBox dos SVGs em /public/images).
 * Se reexportar as camadas em outro tamanho, atualize aqui.
 */
const BURGER_CANVAS = { width: 432, height: 578 } as const;

/** Caixa (em px do canvas) onde o ingrediente aparece dentro da arte. */
interface CanvasBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LayerConfig {
  /** Deslocamento inicial no eixo Y (px). Todas terminam em 0. */
  startY: number;
  /** Posição do ingrediente no canvas — usada pelo placeholder quando não há arte. */
  box: CanvasBox;
  placeholderClassName: string;
}

const LAYER_CONFIG: Record<BurgerLayerId, LayerConfig> = {
  "bun-top": {
    startY: -150,
    box: { x: 111, y: 70, w: 211, h: 95 },
    placeholderClassName:
      "rounded-t-[999px] rounded-b-2xl bg-linear-to-b from-amber-400 via-amber-600 to-amber-800",
  },
  salad: {
    startY: -80,
    box: { x: 92, y: 154, w: 245, h: 93 },
    placeholderClassName: "rounded-[50%] bg-linear-to-b from-lime-400 to-green-700",
  },
  tomato: {
    startY: -40,
    box: { x: 121, y: 236, w: 202, h: 64 },
    placeholderClassName: "rounded-full bg-linear-to-b from-red-500 to-red-800",
  },
  "cheese-meat": {
    startY: 45,
    box: { x: 107, y: 289, w: 222, h: 132 },
    placeholderClassName:
      "rounded-3xl bg-linear-to-b from-amber-300 via-[#3d1a0b] to-[#251006]",
  },
  "bun-bottom": {
    startY: 90,
    box: { x: 100, y: 413, w: 237, h: 86 },
    placeholderClassName:
      "rounded-t-xl rounded-b-[48px] bg-linear-to-b from-amber-500 to-amber-800",
  },
};

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

function boxToStyle({ x, y, w, h }: CanvasBox): CSSProperties {
  return {
    left: pct(x, BURGER_CANVAS.width),
    top: pct(y, BURGER_CANVAS.height),
    width: pct(w, BURGER_CANVAS.width),
    height: pct(h, BURGER_CANVAS.height),
  };
}

/**
 * Trecho do scroll em que a montagem acontece. Termina antes de 1 para o burger
 * ficar montado (e o título visível) durante o último trecho da seção.
 */
const ASSEMBLY_RANGE: [number, number] = [0, 0.7];
/** O título acompanha o final da montagem. */
const TITLE_RANGE: [number, number] = [0.45, 0.7];

/* ─────────────────────────────── Componente ─────────────────────────────── */

interface BurgerAssemblyProps {
  /** Camadas na ordem de cima para baixo (01 → 05). */
  layers: BurgerLayer[];
}

/**
 * BLOCO 2 — Showstopper: montagem do burger no scroll.
 *
 * wrapper (150vh) → sticky (h-screen) → canvas relativo → camadas absolutas.
 * Cada camada sai de `startY` e chega a 0; como os PNGs compartilham o mesmo
 * canvas, em 0 elas se sobrepõem formando o burger completo.
 */
export function BurgerAssembly({ layers }: BurgerAssemblyProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Uma única mola compartilhada suaviza os "degraus" da roda do mouse.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const titleOpacity = useTransform(progress, TITLE_RANGE, [0, 1]);
  const titleScale = useTransform(progress, TITLE_RANGE, [0.85, 1]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  const titleStyle = prefersReducedMotion
    ? undefined
    : { opacity: titleOpacity, scale: titleScale };

  return (
    <section
      id="montagem"
      ref={wrapperRef}
      aria-label="Montagem do hambúrguer"
      // 150vh = só 50vh de rolagem para montar (camadas também saem mais perto).
      className={cn("relative", prefersReducedMotion ? "h-screen" : "h-[150vh]")}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-coal-950">
        {/* Título POR TRÁS do burger (z-0): linhas no topo e na base do palco */}
        <motion.h2
          style={titleStyle}
          className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-between pt-[14vh] pb-[10vh] text-center font-display leading-[0.85] tracking-wide uppercase select-none md:pt-[12vh] md:pb-[7vh]"
        >
          <span className="text-[clamp(3.5rem,13vw,12rem)] text-cream-100">Cada camada</span>
          <span className="text-[clamp(3.5rem,13vw,12rem)] text-flame drop-shadow-[0_0_40px_rgba(255,69,0,0.45)]">
            importa.
          </span>
        </motion.h2>

        {/* Brilho da chapa sob o burger */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 z-[1] h-1/3 w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/20 blur-3xl"
        />

        {/* Canvas compartilhado: todas as camadas ocupam exatamente esta caixa */}
        <div
          role="img"
          aria-label="Hambúrguer artesanal sendo montado camada por camada"
          style={{ aspectRatio: `${BURGER_CANVAS.width} / ${BURGER_CANVAS.height}` }}
          // O burger ocupa ~55% da largura da arte, por isso o canvas é generoso.
          className="relative z-10 w-[min(94vw,calc(78vh*0.7474),600px)]"
        >
          {layers.map((layer, index) => (
            <AssemblyLayer
              key={layer.id}
              layer={layer}
              progress={progress}
              zIndex={layers.length - index}
              isStatic={prefersReducedMotion}
            />
          ))}
        </div>

        {!prefersReducedMotion && (
          <motion.p
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 z-20 text-xs font-semibold tracking-[0.3em] text-ash-400 uppercase"
          >
            Role para montar ↓
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Camada ─────────────────────────────── */

interface AssemblyLayerProps {
  layer: BurgerLayer;
  progress: MotionValue<number>;
  zIndex: number;
  /** `true` com prefers-reduced-motion: renderiza já montado. */
  isStatic: boolean;
}

/** Componente próprio por camada: hooks não podem ser chamados dentro de `.map`. */
function AssemblyLayer({ layer, progress, zIndex, isStatic }: AssemblyLayerProps) {
  const { startY, box, placeholderClassName } = LAYER_CONFIG[layer.id];
  const src = ASSETS.layers[layer.id];
  const y = useTransform(progress, ASSEMBLY_RANGE, [isStatic ? 0 : startY, 0]);

  return (
    <motion.div style={{ y, zIndex }} className="absolute inset-0 will-change-transform">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          // O otimizador do Next não processa SVG; PNG/WebP continuam otimizados.
          unoptimized={src.endsWith(".svg")}
          sizes="(min-width: 768px) 600px, 94vw"
          className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]"
        />
      ) : (
        <div
          aria-hidden="true"
          title={layer.name}
          style={boxToStyle(box)}
          className={cn("absolute", placeholderClassName)}
        />
      )}
    </motion.div>
  );
}
