"use client";

import { motion, useTransform } from "framer-motion";

import { useMouseParallax } from "@/presentation/hooks/useMouseParallax";
import { ASSETS } from "@/shared/constants/assets.constants";
import { BRAND } from "@/shared/constants/brand.constants";
import { EASE_EMBER } from "@/shared/constants/motion.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { EmberBackdrop } from "../../atoms/EmberBackdrop/EmberBackdrop";
import { ImagePlaceholder } from "../../atoms/ImagePlaceholder/ImagePlaceholder";
import { PulsingCTA } from "../../atoms/PulsingCTA/PulsingCTA";
import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";

/**
 * BLOCO 1 — Hero.
 * Fundo escuro (recebe o vídeo de faíscas), burger gigante no centro com
 * mouse-tracking parallax (foge do cursor) e CTA com glow pulsante.
 */
export function HeroSection() {
  const { style: burgerStyle, pointer, handlers } = useMouseParallax({ strength: 40, tilt: 10 });

  // Camadas de profundidade: o halo segue o cursor e a palavra de fundo foge pouco.
  const glowX = useTransform(pointer.x, (v) => v * 70);
  const glowY = useTransform(pointer.y, (v) => v * 70);
  const wordX = useTransform(pointer.x, (v) => -v * 14);

  return (
    <section
      id="inicio"
      {...handlers}
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden pt-24 pb-12"
    >
      <EmberBackdrop videoSrc={ASSETS.heroVideo} posterSrc={ASSETS.heroVideoPoster} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_EMBER }}
        className="section-container relative z-10 text-center"
      >
        <p className="text-xs font-semibold tracking-[0.35em] text-ember-400 uppercase md:text-sm">
          Hamburgueria artesanal · Smash na brasa
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-6xl leading-[0.9] tracking-wide md:text-8xl lg:text-9xl">
          O burger que <span className="text-fire">estala</span> na chapa.
        </h1>
      </motion.div>

      {/* Palco do burger */}
      <div className="relative my-4 aspect-square w-[min(78vw,44vh,560px)] [perspective:1200px] md:my-6">
        <motion.span
          aria-hidden="true"
          style={{ x: wordX }}
          className="text-outline pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[38vw] leading-none select-none md:text-[22rem]"
        >
          BRASA
        </motion.span>

        <motion.div
          aria-hidden="true"
          style={{ x: glowX, y: glowY }}
          className="absolute inset-[12%] -z-10 rounded-full bg-ember-500/35 blur-3xl"
        />

        <motion.div style={burgerStyle} className="size-full [transform-style:preserve-3d]">
          <motion.div
            className="size-full"
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_EMBER }}
          >
            <ImagePlaceholder
              src={ASSETS.heroBurger}
              alt="Hambúrguer artesanal com cheddar derretido"
              label="PNG · Burger Hero"
              priority
              sizes="(min-width: 768px) 560px, 78vw"
              className="size-full rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_EMBER }}
        className="relative z-10 flex flex-col items-center gap-5 px-4"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <PulsingCTA href={buildWhatsAppUrl()}>
            <WhatsAppIcon className="size-6" />
            Pedir no WhatsApp
          </PulsingCTA>
          <a
            href="#cardapio"
            className="px-4 py-3 text-sm font-semibold text-ash-400 underline-offset-8 transition hover:text-cream-100 hover:underline"
          >
            Ver cardápio
          </a>
        </div>
        <p className="text-sm text-ash-400">
          <span className="text-ember-400">★ {BRAND.rating}</span> · {BRAND.ratingCount} avaliações
          · Entrega em ~{BRAND.deliveryTime}
        </p>
      </motion.div>
    </section>
  );
}
