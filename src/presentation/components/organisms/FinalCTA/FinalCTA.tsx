"use client";

import { motion } from "framer-motion";

import { useClosingCountdown } from "@/presentation/hooks/useClosingCountdown";
import { BRAND, SCHEDULE } from "@/shared/constants/brand.constants";
import { EASE_EMBER } from "@/shared/constants/motion.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { MagneticButton } from "../../atoms/MagneticButton/MagneticButton";
import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";

const pad = (n: number) => String(n).padStart(2, "0");

/** BLOCO 5 — Urgência + botão magnético + rodapé. */
export function FinalCTA() {
  const countdown = useClosingCountdown(SCHEDULE.openingHour, SCHEDULE.closingHour);

  return (
    <footer className="relative isolate overflow-hidden pt-24 md:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[90%] bg-radial-[ellipse_at_bottom] from-brasa-600/40 via-ember-600/10 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE_EMBER }}
        className="section-container flex flex-col items-center text-center"
      >
        <StatusPill countdown={countdown} />

        <h2 className="mt-6 max-w-3xl font-display text-6xl leading-[0.9] tracking-wide md:text-8xl">
          A chapa encerra às <span className="text-fire">{SCHEDULE.closingHour}h.</span>
        </h2>
        <p className="mt-5 max-w-xl text-ash-400 md:text-lg">
          Depois disso, só amanhã. Garanta o seu enquanto o fogo está alto — pedido em 2
          minutos pelo WhatsApp.
        </p>

        <div className="mt-14 mb-24 md:mb-32">
          <MagneticButton href={buildWhatsAppUrl()}>
            <WhatsAppIcon className="size-7" />
            Pedir no WhatsApp
          </MagneticButton>
        </div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-4 py-8 text-sm text-ash-500 md:flex-row">
          <span className="font-display text-xl tracking-wider text-cream-100">{BRAND.name}</span>
          <span>{BRAND.address}</span>
          <span>
            Ter–Dom · {SCHEDULE.openingHour}h às {SCHEDULE.closingHour}h ·{" "}
            <a href={BRAND.instagramUrl} className="text-ember-400 hover:underline">
              {BRAND.instagram}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function StatusPill({ countdown }: { countdown: ReturnType<typeof useClosingCountdown> }) {
  // Reserva o espaço antes da hidratação para não "pular" o layout.
  if (!countdown.ready) return <div className="h-9" />;

  if (!countdown.isOpen) {
    return (
      <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-coal-900 px-4 text-sm text-ash-400">
        <span className="size-2 rounded-full bg-ash-500" />
        Chapa apagada · acende às {SCHEDULE.openingHour}h
      </span>
    );
  }

  return (
    <span className="inline-flex h-9 items-center gap-2 rounded-full border border-ember-500/40 bg-ember-500/10 px-4 text-sm text-ember-300">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-ember-500" />
      </span>
      Chapa acesa · fecha em{" "}
      <span className="font-mono tabular-nums">
        {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
      </span>
    </span>
  );
}
