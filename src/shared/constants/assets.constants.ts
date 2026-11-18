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
  /**
   * Camadas do burger. IMPORTANTE: os 6 PNGs devem ser exportados no MESMO
   * canvas (mesmas dimensões, fundo transparente), cada ingrediente já na sua
   * posição final — assim, com y = 0, eles se sobrepõem perfeitamente.
   */
  layers: Record<BurgerLayerId, string | null>;
}

export const ASSETS: AssetMap = {
  heroBurger: null,
  heroVideo: null,
  heroVideoPoster: null,
  chefPortrait: null,
  layers: {
    "bun-top": null, //    "/images/burger/01-bun-top.png"
    salad: null, //        "/images/burger/02-salad.png"
    tomato: null, //       "/images/burger/03-tomato.png"
    cheese: null, //       "/images/burger/04-cheese.png"
    meat: null, //         "/images/burger/05-meat.png"
    "bun-bottom": null, // "/images/burger/06-bun-bottom.png"
  },
};
