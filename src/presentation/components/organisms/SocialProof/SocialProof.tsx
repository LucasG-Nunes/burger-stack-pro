"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

import type { Review } from "@/core/entities/Review";
import { ASSETS } from "@/shared/constants/assets.constants";
import { CHEF } from "@/shared/constants/brand.constants";
import { EASE_EMBER } from "@/shared/constants/motion.constants";

import { ImagePlaceholder } from "../../atoms/ImagePlaceholder/ImagePlaceholder";
import { ReviewCard } from "../../molecules/ReviewCard/ReviewCard";
import { SectionHeading } from "../../molecules/SectionHeading/SectionHeading";

/**
 * Posições dos cards ao redor do chef (só em telas grandes — no mobile viram grade).
 * Passadas como CSS vars e consumidas por `lg:top-(--top)` etc.
 */
const ORBIT_POSITIONS = [
  { "--top": "2%", "--left": "0%" },
  { "--top": "6%", "--right": "0%" },
  { "--top": "40%", "--left": "-3%" },
  { "--top": "44%", "--right": "-3%" },
  { "--bottom": "2%", "--left": "6%" },
  { "--bottom": "0%", "--right": "6%" },
] satisfies Record<string, string>[];

interface SocialProofProps {
  reviews: Review[];
}

/** BLOCO 4 — Prova social: chef no centro, avaliações flutuando ao redor. */
export function SocialProof({ reviews }: SocialProofProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="avaliacoes" className="relative overflow-hidden py-24 md:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Quem manda na chapa"
          title={
            <>
              Feito por quem <span className="text-fire">vive o fogo.</span>
            </>
          }
        />

        <div className="relative mt-16 lg:min-h-[760px]">
          {/* Elemento central: chef */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE_EMBER }}
            className="relative z-10 mx-auto flex max-w-sm flex-col items-center text-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-brasa-500/25 blur-2xl" />
              <ImagePlaceholder
                src={ASSETS.chefPortrait}
                alt={CHEF.name}
                label="PNG · Chef"
                tone="brasa"
                sizes="288px"
                className="relative size-56 rounded-full ring-2 ring-ember-500/50 ring-offset-8 ring-offset-coal-950 md:size-72"
              />
            </div>
            <h3 className="mt-8 font-display text-4xl tracking-wide">{CHEF.name}</h3>
            <p className="text-sm text-ember-400">{CHEF.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-ash-400 italic">“{CHEF.quote}”</p>
            <dl className="mt-6 grid w-full grid-cols-3 gap-2 border-t border-white/10 pt-6">
              {CHEF.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl text-fire">{stat.value}</dd>
                  <dd className="text-xs text-ash-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Avaliações orbitando */}
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
            {reviews.map((review, index) => (
              <motion.li
                key={review.id}
                style={ORBIT_POSITIONS[index % ORBIT_POSITIONS.length] as CSSProperties}
                className="lg:absolute lg:top-(--top) lg:right-(--right) lg:bottom-(--bottom) lg:left-(--left)"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: EASE_EMBER }}
              >
                {/* Camada separada para a flutuação infinita não brigar com a entrada. */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
                  transition={{
                    duration: 4 + (index % 3) * 0.8,
                    delay: index * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
