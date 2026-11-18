import type { BurgerLayerId } from "@/core/entities/BurgerLayer";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  PONTO ÚNICO DE TROCA DOS ASSETS                                 ║
 * ║  Imagens em /public/images, vídeos em /public/videos.            ║
 * ║  Enquanto um caminho for `null`, o componente usa um fallback.   ║
 * ║  (Imagens dos produtos ficam no campo `image` do menu.mock.ts.)  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
interface AssetMap {
  /** Burger girando no centro do Hero (loop curto, mudo, fundo escuro). */
  heroBurgerVideo: string | null;
  /** 1º quadro do burger: aparece na hora, antes do vídeo carregar. */
  heroBurgerPoster: string | null;
  /** Vídeo de brasa em tela cheia atrás do Hero (mudo, loop). */
  heroVideo: string | null;
  heroVideoPoster: string | null;
  chefPortrait: string | null;
  /** Ação na chapa da seção "Feito por quem vive o fogo" (mudo, loop). */
  chefGrillVideo: string | null;
  /**
   * Camadas do burger. IMPORTANTE: todas exportadas no MESMO canvas
   * (mesmas dimensões, fundo transparente), cada ingrediente já na sua
   * posição final — assim, com y = 0, elas se sobrepõem perfeitamente.
   */
  layers: Record<BurgerLayerId, string | null>;
}

export const ASSETS: AssetMap = {
  heroBurgerVideo: "/videos/hero-burger.mp4",
  heroBurgerPoster: "/images/hero-burger-poster.jpg",
  heroVideo: "/videos/brasa-hero.mp4",
  heroVideoPoster: "/images/brasa-hero-poster.jpg",
  chefPortrait: null,
  chefGrillVideo: "/videos/chef-grill.mp4",
  // Canvas atual: 432×578 (ver BURGER_CANVAS em BurgerAssembly.tsx).
  layers: {
    "bun-top": "/images/01-bun-top.svg",
    salad: "/images/02-salad.svg",
    tomato: "/images/03-tomato.svg",
    "cheese-meat": "/images/04-chesee-meat.svg",
    "bun-bottom": "/images/05-bottom.svg",
  },
};
