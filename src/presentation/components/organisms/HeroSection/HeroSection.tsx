import { ASSETS } from "@/shared/constants/assets.constants";
import { BRAND } from "@/shared/constants/brand.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { BackgroundVideo } from "../../atoms/BackgroundVideo/BackgroundVideo";
import { EmberBackdrop } from "../../atoms/EmberBackdrop/EmberBackdrop";
import { PulsingCTA } from "../../atoms/PulsingCTA/PulsingCTA";
import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";

/**
 * BLOCO 1 — Hero.
 *
 * Camadas (de baixo para cima):
 *   z-0  vídeo de brasa (ou partículas, se não houver vídeo)
 *   z-[1] máscara `hero-vignette`: funde bordas com #0a0a0a e esconde as silhuetas
 *   z-10 conteúdo centralizado
 *
 * É um Server Component: só o <BackgroundVideo> hidrata no cliente.
 */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-coal-950 px-4 pt-20 pb-16"
    >
      {ASSETS.heroVideo ? (
        <BackgroundVideo
          src={ASSETS.heroVideo}
          poster={ASSETS.heroVideoPoster}
          className="z-0 scale-105"
        />
      ) : (
        <EmberBackdrop />
      )}

      {/* A máscara: centro transparente, bordas (topo/laterais) sólidas */}
      <div aria-hidden="true" className="hero-vignette pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Sombra difusa só atrás do texto: garante leitura sem apagar as chamas */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[-10%] inset-y-[-6%] -z-10 rounded-full bg-radial from-coal-950/70 via-coal-950/35 to-transparent blur-2xl"
        />
        <p className="animate-fade-up text-xs font-semibold tracking-[0.35em] text-ember-300 uppercase md:text-sm">
          Hamburgueria artesanal · Smash na brasa
        </p>

        <h1 className="mt-5 animate-fade-up font-display text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.88] tracking-wide text-cream-100 uppercase [text-shadow:0_6px_40px_rgba(0,0,0,0.7)] [animation-delay:120ms]">
          O burger que <span className="text-flame">estala</span>
          <br className="hidden sm:block" /> na chapa
        </h1>

        <p className="mt-6 max-w-xl animate-fade-up text-base text-cream-100/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.8)] [animation-delay:240ms] md:text-lg">
          Blend próprio, crosta caramelizada e queijo escorrendo. Do fogo direto para a sua
          porta em ~{BRAND.deliveryTime}.
        </p>

        <div className="mt-10 animate-fade-up [animation-delay:360ms]">
          <PulsingCTA href={buildWhatsAppUrl()}>
            <WhatsAppIcon className="size-6" />
            Pedir no WhatsApp
          </PulsingCTA>
        </div>

        <p className="mt-6 animate-fade-up text-sm text-ash-400 [animation-delay:480ms]">
          <span className="text-ember-400">★ {BRAND.rating}</span> · {BRAND.ratingCount} avaliações
          ·{" "}
          <a href="#cardapio" className="underline-offset-4 hover:text-cream-100 hover:underline">
            Ver cardápio
          </a>
        </p>
      </div>
    </section>
  );
}
