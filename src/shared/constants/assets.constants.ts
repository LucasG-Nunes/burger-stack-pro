import type { BurgerLayerId } from "@/core/entities/BurgerLayer";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  PONTO ÚNICO DE TROCA DOS PLACEHOLDERS                           ║
 * ║  1. Coloque os PNGs (fundo transparente) em /public/images       ║
 * ║  2. Troque `null` pelo caminho, ex: "/images/hero-burger.png"    ║
 * ║  Enquanto for `null`, o componente renderiza um placeholder.     ║
 * ║  (Imagens dos produtos ficam no campo `image` do menu.mock.ts.)  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
interface AssetMap {
  heroBurger: string | null;
  /** Vídeo de faíscas em loop, ex: "/videos/sparks.mp4" (mudo, ~5s, < 3MB). */
  heroVideo: string | null;
  heroVideoPoster: string | null;
  chefPortrait: string | null;
  layers: Record<BurgerLayerId, string | null>;
}

export const ASSETS: AssetMap = {
  heroBurger: null,
  heroVideo: null,
  heroVideoPoster: null,
  chefPortrait: null,
  layers: {
    "top-bun": null,
    lettuce: null,
    patty: null,
    cheese: null,
    "bottom-bun": null,
  },
};
