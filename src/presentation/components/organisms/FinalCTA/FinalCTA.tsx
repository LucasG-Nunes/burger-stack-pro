"use client";

import { motion } from "framer-motion";

import { type ClosingCountdown, useClosingCountdown } from "@/presentation/hooks/useClosingCountdown";
import { BRAND, SCHEDULE, WHATSAPP } from "@/shared/constants/brand.constants";
import { EASE_EMBER } from "@/shared/constants/motion.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { MagneticButton } from "../../atoms/MagneticButton/MagneticButton";
import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";
import { type CountdownUnit, FlipCountdown } from "../../molecules/FlipCountdown/FlipCountdown";

/** Na última hora antes de fechar, o contador fica laranja e brilhando. */
const URGENT_THRESHOLD_HOURS = 1;

/** Converte o countdown nas placas do relógio (com "dias" quando falta mais de 24h). */
function toUnits(countdown: ClosingCountdown): CountdownUnit[] {
  if (!countdown.ready) {
    return [
      { label: "Horas", value: null },
      { label: "Minutos", value: null },
      { label: "Segundos", value: null },
    ];
  }
  const days = Math.floor(countdown.hours / 24);
  const time: CountdownUnit[] = [
    { label: "Horas", value: countdown.hours % 24 },
    { label: "Minutos", value: countdown.minutes },
    { label: "Segundos", value: countdown.seconds },
  ];
  return days > 0 ? [{ label: "Dias", value: days }, ...time] : time;
}

/** BLOCO 5 — Urgência (contador grande) + botão magnético + rodapé. */
export function FinalCTA() {
  const countdown = useClosingCountdown();
  const isClosed = countdown.ready && !countdown.isOpen;
  const isUrgent = countdown.ready && countdown.isOpen && countdown.hours < URGENT_THRESHOLD_HOURS;

  return (
    <footer className="relative isolate overflow-hidden pt-24 md:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[90%] bg-radial-[ellipse_at_bottom] from-brasa-600/40 via-ember-600/10 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_EMBER }}
        className="section-container flex flex-col items-center text-center"
      >
        <StatusPill countdown={countdown} />

        <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[0.9] tracking-wide md:text-7xl">
          {countdown.ready && !countdown.isOpen ? (
            <>
              A chapa acende <span className="text-fire">{countdown.opensDayLabel}.</span>
            </>
          ) : (
            <>
              A chapa apaga <span className="text-fire">em…</span>
            </>
          )}
        </h2>

        {/* O protagonista da seção: o tempo correndo */}
        <div className="relative mt-10 md:mt-14">
          <div
            aria-hidden="true"
            className={
              isUrgent
                ? "absolute -inset-10 -z-10 rounded-full bg-flame/25 blur-3xl"
                : "absolute -inset-10 -z-10 rounded-full bg-brasa-500/15 blur-3xl"
            }
          />
          <FlipCountdown units={toUnits(countdown)} urgent={isUrgent} />
        </div>

        <p className="mt-10 max-w-xl text-ash-400 md:text-lg">
          {SCHEDULE.daysLabel}, das {SCHEDULE.hoursLabel}.{" "}
          {isClosed
            ? "Já deixa seu pedido engatilhado no WhatsApp ou no cardápio digital."
            : isUrgent
              ? "Última hora de chapa acesa. Corre que ainda dá!"
              : "Garanta o seu enquanto o fogo está alto: pedido em 2 minutos pelo WhatsApp."}
        </p>

        <div className="mt-12 mb-24 flex flex-col items-center gap-6 md:mb-32">
          <MagneticButton href={buildWhatsAppUrl()}>
            <WhatsAppIcon className="size-7" />
            Pedir no WhatsApp
          </MagneticButton>
          <a
            href={BRAND.menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ember-400 underline-offset-4 hover:text-cream-100 hover:underline"
          >
            ou peça pelo cardápio digital ↗
          </a>
        </div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-4 py-8 text-sm text-ash-500 md:flex-row">
          <span className="font-display text-xl tracking-wider text-cream-100">{BRAND.name}</span>
          <span>{BRAND.address}</span>
          <span>
            {SCHEDULE.daysLabel} · {SCHEDULE.hoursLabel} · {WHATSAPP.display} ·{" "}
            <a href={BRAND.instagramUrl} className="text-ember-400 hover:underline">
              {BRAND.instagram}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function StatusPill({ countdown }: { countdown: ClosingCountdown }) {
  // Reserva o espaço antes da hidratação para não "pular" o layout.
  if (!countdown.ready) return <div className="h-9" />;

  if (!countdown.isOpen) {
    return (
      <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-coal-900 px-4 text-sm text-ash-400">
        <span className="size-2 rounded-full bg-ash-500" />
        Chapa apagada · acende {countdown.opensDayLabel} às {countdown.opensTimeLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex h-9 items-center gap-2 rounded-full border border-ember-500/40 bg-ember-500/10 px-4 text-sm text-ember-300">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-ember-500" />
      </span>
      Chapa acesa · aberto até 00h
    </span>
  );
}
