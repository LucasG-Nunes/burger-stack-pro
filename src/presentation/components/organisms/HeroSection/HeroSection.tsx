import { ASSETS } from "@/shared/constants/assets.constants";
import { BRAND } from "@/shared/constants/brand.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { EmberBackdrop } from "../../atoms/EmberBackdrop/EmberBackdrop";
import { FloatingLayer } from "../../atoms/FloatingLayer/FloatingLayer";
import { LoopVideo } from "../../atoms/LoopVideo/LoopVideo";
import { PulsingCTA } from "../../atoms/PulsingCTA/PulsingCTA";
import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";

/**
 * Máscara do burger central: elipse opaca no miolo que some antes da borda.
 * O fundo escuro do vídeo se dissolve no vídeo de brasa, sem recorte visível.
 */
const BURGER_MASK = "radial-gradient(ellipse closest-side, #000 70%, transparent 100%)";

/**
 * BLOCO 1 — Hero.
 *
 * Camadas (de baixo para cima):
 *   z-0   vídeo de brasa em tela cheia (ou partículas, se não houver vídeo)
 *   z-[1] máscara `hero-vignette`: funde bordas com #0a0a0a e esconde as silhuetas
 *   z-10  conteúdo centralizado, com o burger girando no meio
 *
 * Server Component: só os vídeos e a flutuação hidratam no cliente.
 */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-coal-950 px-4 pt-20 pb-12"
    >
      {ASSETS.heroVideo ? (
        <LoopVideo
          src={ASSETS.heroVideo}
          poster={ASSETS.heroVideoPoster}
          strategy="after-load"
          className="absolute inset-0 z-0 h-full w-full scale-105"
        />
      ) : (
        <EmberBackdrop />
      )}

      <div aria-hidden="true" className="hero-vignette pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="animate-fade-up text-xs font-semibold tracking-[0.35em] text-ember-300 uppercase md:text-sm">
          Hamburgueria artesanal · Smash na brasa
        </p>

        <h1 className="mt-4 animate-fade-up font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] tracking-wide text-balance text-cream-100 uppercase [text-shadow:0_6px_40px_rgba(0,0,0,0.7)] [animation-delay:120ms]">
          O burger que <span className="text-flame">estala</span> na chapa
        </h1>

        {ASSETS.heroBurgerVideo && (
          <div className="relative mt-2 animate-fade-up [animation-delay:240ms]">
            {/* Brilho estático de brasa sob o burger (não anima: zero custo por quadro) */}
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full bg-flame/25 blur-3xl"
            />
            <FloatingLayer>
              <div
                role="img"
                aria-label="Hambúrguer artesanal girando, com queijo derretido"
                style={{ maskImage: BURGER_MASK, WebkitMaskImage: BURGER_MASK }}
                // Oval 3:4 em vez de círculo: o burger é mais alto que largo e,
                // num quadrado, o pão de cima e o de baixo sumiam na máscara.
                className="relative aspect-[3/4] h-[clamp(300px,min(46vh,120vw),600px)] overflow-hidden bg-coal-950"
              >
                <LoopVideo
                  src={ASSETS.heroBurgerVideo}
                  strategy="eager"
                  // Vídeo vertical (720×1280) com o burger abaixo do centro: enquadra nele.
                  className="h-full w-full object-[50%_90%]"
                />
              </div>
            </FloatingLayer>
          </div>
        )}

        <p className="mt-2 max-w-xl animate-fade-up text-base text-cream-100/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.9)] [animation-delay:360ms] md:text-lg">
          Blend próprio, crosta caramelizada e queijo escorrendo. Do fogo direto para a sua
          porta em ~{BRAND.deliveryTime}.
        </p>

        <div className="mt-7 animate-fade-up [animation-delay:480ms]">
          <PulsingCTA href={buildWhatsAppUrl()}>
            <WhatsAppIcon className="size-6" />
            Pedir no WhatsApp
          </PulsingCTA>
        </div>

        <p className="mt-5 animate-fade-up text-sm text-ash-400 [animation-delay:600ms]">
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
