"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/helpers/cn";

/**
 * Quando o vídeo começa a baixar:
 * - `eager`      já no HTML do servidor (protagonista acima da dobra);
 * - `after-load` depois do `load` da página (fundo decorativo: não atrasa o LCP);
 * - `in-view`    quando a seção chega perto da tela (abaixo da dobra).
 */
export type VideoLoadStrategy = "eager" | "after-load" | "in-view";

interface LoopVideoProps {
  src: string;
  poster?: string | null;
  strategy?: VideoLoadStrategy;
  /** Classes do <video>. Posicionamento/tamanho ficam por conta de quem usa. */
  className?: string;
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function readUserConstraints() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slowOrSaving =
    Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
  return { reducedMotion, slowOrSaving };
}

/**
 * Vídeo mudo em loop, pensado para não gerar jank:
 * - toca só enquanto está visível (IntersectionObserver), pausa fora da tela;
 * - com reduced-motion ou economia de dados, mostra o 1º quadro parado
 *   (e o fundo decorativo `after-load` nem é baixado);
 * - entra com fade de opacidade quando o 1º quadro está pronto (sem "flash" preto);
 * - só `opacity`/`transform` animam — nada de layout ou repaint por quadro.
 */
export function LoopVideo({ src, poster, strategy = "in-view", className }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(
    strategy === "eager" ? src : undefined,
  );
  const [isReady, setIsReady] = useState(false);
  const [canPlay, setCanPlay] = useState(true);

  // 1) Decide se/quando atribuir o `src`.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const { reducedMotion, slowOrSaving } = readUserConstraints();
    setCanPlay(!reducedMotion && !slowOrSaving);
    // `eager` vem no HTML do servidor: o 1º quadro pode ficar pronto antes da
    // hidratação, e aí o React perde o `loadeddata`.
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setIsReady(true);

    if (strategy === "eager") return;
    if (strategy === "after-load") {
      if (reducedMotion || slowOrSaving) return; // puramente decorativo: não baixa
      const start = () => setActiveSrc(src);
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
      return () => window.removeEventListener("load", start);
    }

    // in-view: começa a baixar ~meia tela antes de aparecer.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActiveSrc(src);
        observer.disconnect();
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src, strategy]);

  // 2) Play/pause conforme visibilidade.
  useEffect(() => {
    const video = videoRef.current;
    if (!activeSrc || !video) return;
    if (!canPlay) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // play() pode ser rejeitado (ex: modo economia de bateria no iOS) — ignoramos.
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [activeSrc, canPlay]);

  return (
    <video
      ref={videoRef}
      src={activeSrc}
      poster={poster ?? undefined}
      autoPlay={canPlay}
      loop
      muted
      playsInline
      preload={strategy === "eager" ? "auto" : canPlay ? "auto" : "metadata"}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onLoadedData={() => setIsReady(true)}
      className={cn(
        "pointer-events-none object-cover transition-opacity duration-700",
        isReady ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
