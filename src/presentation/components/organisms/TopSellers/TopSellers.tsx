"use client";

import { motion, type Variants } from "framer-motion";

import type { Product } from "@/core/entities/Product";
import { EASE_EMBER } from "@/shared/constants/motion.constants";

import { ProductCard } from "../../molecules/ProductCard/ProductCard";
import { SectionHeading } from "../../molecules/SectionHeading/SectionHeading";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EMBER } },
};

interface TopSellersProps {
  products: Product[];
}

/** BLOCO 3 — Cardápio / Top Sellers com Staggered Fade-Up (0.2s entre cards). */
export function TopSellers({ products }: TopSellersProps) {
  return (
    <section id="cardapio" className="relative py-24 md:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="Os mais pedidos"
          title={
            <>
              Escolha o seu <span className="text-fire">favorito.</span>
            </>
          }
          description="Os carros-chefes da casa, todos com maionese angus defumada. O cardápio completo, com combos e smash, está no cardápio digital."
        />

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {products.map((product) => (
            <motion.li key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
