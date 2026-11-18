"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/helpers/cn";

interface BackgroundVideoProps {
  src: string;
  poster?: string | null;
  className?: string;
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Pula o vídeo onde ele mais atrapalha do que ajuda. */
function shouldSkipVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
}

/**
 * Vídeo decorativo de fundo, otimizado para não competir com o conteúdo:
 * - o `src` só é atribuído DEPOIS do `load` da página (não atrasa o LCP);
 * - não carrega com reduced-motion, economia de dados ou 2G;
 * - pausa fora da tela (IntersectionObserver) para poupar CPU/bateria;
 * - entra com fade quando começa a tocar (sem "flash" preto).
 */
export function BackgroundVideo({ src, poster, className }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    const start = () => setActiveSrc(src);
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!activeSrc || !video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // play() pode ser rejeitado (ex: modo economia de bateria no iOS) — ignoramos.
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [activeSrc]);

  return (
    <video
      ref={videoRef}
      src={activeSrc}
      poster={poster ?? undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setIsPlaying(true)}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
        isPlaying ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
