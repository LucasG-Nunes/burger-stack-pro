"use client";

import { motion, useReducedMotion } from "framer-motion";

interface EmberBackdropProps {
  /** Vídeo de faíscas. Enquanto `null`, usamos partículas animadas no lugar. */
  videoSrc?: string | null;
  posterSrc?: string | null;
}

/* Posições determinísticas (sem Math.random) → mesmo HTML no servidor e no cliente. */
const SPARKS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.41) % 5,
  duration: 5 + (i % 5),
  drift: ((i % 7) - 3) * 14,
}));

export function EmberBackdrop({ videoSrc, posterSrc }: EmberBackdropProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {videoSrc ? (
        <video
          className="absolute inset-0 size-full object-cover opacity-60 mix-blend-screen"
          src={videoSrc}
          poster={posterSrc ?? undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        !prefersReducedMotion &&
        SPARKS.map((spark, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full bg-ember-300 shadow-[0_0_8px_2px_rgba(255,138,31,0.8)]"
            style={{ left: `${spark.left}%`, width: spark.size, height: spark.size }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{ y: "-95vh", x: spark.drift, opacity: [0, 1, 0.8, 0] }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))
      )}

      {/* Brilho da chapa vindo de baixo + vinheta. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-radial-[ellipse_at_bottom] from-brasa-600/35 via-ember-600/10 to-transparent" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-coal-950" />
    </div>
  );
}
