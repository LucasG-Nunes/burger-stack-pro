"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { BRAND } from "@/shared/constants/brand.constants";
import { buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { WhatsAppIcon } from "../../atoms/WhatsAppIcon/WhatsAppIcon";

const NAV_LINKS = [
  { href: "#montagem", label: "O burger" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#localizacao", label: "Onde estamos" },
];

export function Header() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 120], ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]);
  const borderColor = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);

  return (
    <motion.header
      style={{ backgroundColor, borderColor }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="section-container flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="font-display text-2xl tracking-wider md:text-3xl">
          {BRAND.name.split(" ")[0]} <span className="text-fire">{BRAND.name.split(" ")[1]}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ash-400 transition hover:text-cream-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ember-500 px-4 py-2 text-sm font-bold text-coal-950 transition hover:bg-ember-400"
        >
          <WhatsAppIcon className="size-4" />
          Pedir
        </a>
      </div>
    </motion.header>
  );
}
