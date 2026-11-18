import { ASSETS } from "@/shared/constants/assets.constants";
import { BRAND } from "@/shared/constants/brand.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { EmberBackdrop } from "../../atoms/EmberBackdrop/EmberBackdrop";
import { FloatingLayer } from "../../atoms/FloatingLayer/FloatingLayer";
import { LoopVideo } from "../../atoms/LoopVideo/LoopVideo";
import { PulsingCTA } from "../../atoms/PulsingCTA/PulsingCTA";
import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";

/**
 * Máscara do burger central, justa no contorno do burger: 100% opaca até onde o
 * pão termina (~78% do raio) e some logo depois. Assim o burger fica sempre na
 * frente do fogo e o fundo escuro do vídeo vira só um filete, não uma oval.
 * (Não usar mix-blend aqui: deixa o fogo "atravessar" o burger e pesa a cada frame.)
 */
const BURGER_MASK = "radial-gradient(ellipse closest-side, #000 80%, transparent 96%)";

/**
 * BLOCO 1 — Hero.
 *
 * Camadas (de baixo para cima):
 *   vídeo de brasa em tela cheia (ou partículas, se não houver vídeo)
 *   máscara `hero-vignette`: escurece só as bordas
 *   z-10: conteúdo centralizado, com o burger girando no meio (sempre na frente do fogo)
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

      <div aria-hidden="true" className="hero-vignette pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="animate-fade-up text-xs font-semibold tracking-[0.35em] text-ember-300 uppercase md:text-sm">
          {BRAND.name} · Candeias
        </p>

        <h1 className="mt-4 animate-fade-up font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] tracking-wide text-balance text-cream-100 uppercase [text-shadow:0_6px_40px_rgba(0,0,0,0.7)] [animation-delay:120ms]">
          O burger que <span className="text-flame">estala</span> na chapa
        </h1>

        {ASSETS.heroBurgerVideo && (
          <div className="relative mt-2 animate-fade-up [animation-delay:240ms]">
            <FloatingLayer>
              <div
                role="img"
                aria-label="Hambúrguer artesanal girando, com queijo derretido"
                style={{ maskImage: BURGER_MASK, WebkitMaskImage: BURGER_MASK }}
                // Oval 3:4 em vez de círculo: o burger é mais alto que largo e,
                // num quadrado, o pão de cima e o de baixo sumiam na máscara.
                className="relative aspect-[3/4] h-[clamp(300px,min(46vh,120vw),600px)] overflow-hidden"
              >
                <LoopVideo
                  src={ASSETS.heroBurgerVideo}
                  poster={ASSETS.heroBurgerPoster}
                  strategy="eager"
                  // Vídeo vertical (720×1280) com o burger abaixo do centro: enquadra nele.
                  className="h-full w-full object-[50%_90%]"
                />
              </div>
            </FloatingLayer>
          </div>
        )}

        <p className="mt-2 max-w-xl animate-fade-up text-base text-cream-100/85 [text-shadow:0_1px_3px_rgba(0,0,0,1),0_2px_18px_rgba(0,0,0,0.95)] [animation-delay:360ms] md:text-lg">
          Maionese angus defumada, cebola caramelizada e queijo escorrendo. Da chapa direto
          para a sua porta em {BRAND.deliveryTime}.
        </p>

        <div className="mt-7 animate-fade-up [animation-delay:480ms]">
          <PulsingCTA href={buildWhatsAppUrl()}>
            <WhatsAppIcon className="size-6" />
            Pedir no WhatsApp
          </PulsingCTA>
        </div>

        <p className="mt-5 animate-fade-up text-sm text-ash-400 [animation-delay:600ms]">
          ou{" "}
          <a
            href={BRAND.menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ember-400 underline-offset-4 hover:text-cream-100 hover:underline"
          >
            peça pelo cardápio digital ↗
          </a>
        </p>
      </div>
    </section>
  );
}
