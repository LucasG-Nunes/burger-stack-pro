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

interface LayerConfig {
  /** Deslocamento inicial no eixo Y (px). Todas terminam em 0. */
  startY: number;
  /**
   * Placeholder enquanto o PNG não existe: posição/tamanho relativos ao canvas
   * compartilhado, imitando onde o ingrediente estará no PNG final.
   */
  placeholder: { style: CSSProperties; className: string };
}

const LAYER_CONFIG: Record<BurgerLayerId, LayerConfig> = {
  "bun-top": {
    startY: -400,
    placeholder: {
      style: { top: "14%", height: "25%", width: "72%" },
      className:
        "rounded-t-[999px] rounded-b-2xl bg-linear-to-b from-amber-400 via-amber-600 to-amber-800 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.35)]",
    },
  },
  salad: {
    startY: -200,
    placeholder: {
      style: { top: "38%", height: "6%", width: "86%" },
      className: "rounded-[50%] bg-linear-to-b from-lime-400 to-green-700",
    },
  },
  tomato: {
    startY: -100,
    placeholder: {
      style: { top: "43%", height: "6%", width: "78%" },
      className: "rounded-full bg-linear-to-b from-red-500 to-red-800",
    },
  },
  cheese: {
    startY: 50,
    placeholder: {
      style: { top: "48%", height: "5%", width: "90%" },
      className:
        "bg-linear-to-b from-amber-200 to-amber-400 [clip-path:polygon(0_0,100%_0,96%_100%,70%_70%,52%_100%,30%_70%,6%_100%)]",
    },
  },
  meat: {
    startY: 100,
    placeholder: {
      style: { top: "52%", height: "13%", width: "84%" },
      className:
        "rounded-3xl bg-linear-to-b from-[#6b3419] via-[#3d1a0b] to-[#251006] shadow-[0_0_30px_rgba(229,52,31,0.35)]",
    },
  },
  "bun-bottom": {
    startY: 200,
    placeholder: {
      style: { top: "64%", height: "15%", width: "72%" },
      className:
        "rounded-t-xl rounded-b-[48px] bg-linear-to-b from-amber-500 to-amber-800 shadow-[inset_0_10px_16px_rgba(0,0,0,0.3)]",
    },
  },
};

/**
 * Trecho do scroll em que a montagem acontece. Termina antes de 1 para o burger
 * ficar montado (e o título visível) durante o último trecho da seção.
 */
const ASSEMBLY_RANGE: [number, number] = [0, 0.75];
/** O título acompanha o final da montagem. */
const TITLE_RANGE: [number, number] = [0.5, 0.75];

/* ─────────────────────────────── Componente ─────────────────────────────── */

interface BurgerAssemblyProps {
  /** Camadas na ordem de cima para baixo (01 → 06). */
  layers: BurgerLayer[];
}

/**
 * BLOCO 2 — Showstopper: montagem do burger no scroll.
 *
 * wrapper (300vh) → sticky (h-screen) → canvas relativo → 6 camadas absolutas.
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
      className={cn("relative", prefersReducedMotion ? "h-screen" : "h-[300vh]")}
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
          className="relative z-10 aspect-square w-[min(82vw,58vh,560px)]"
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
  const { startY, placeholder } = LAYER_CONFIG[layer.id];
  const src = ASSETS.layers[layer.id];
  const y = useTransform(progress, ASSEMBLY_RANGE, [isStatic ? 0 : startY, 0]);

  return (
    <motion.div style={{ y, zIndex }} className="absolute inset-0 will-change-transform">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 560px, 82vw"
          className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
        />
      ) : (
        <div
          aria-hidden="true"
          title={layer.name}
          style={placeholder.style}
          className={cn("absolute left-1/2 -translate-x-1/2", placeholder.className)}
        />
      )}
    </motion.div>
  );
}
