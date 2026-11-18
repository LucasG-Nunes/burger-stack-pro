import type { BurgerLayer } from "@/core/entities/BurgerLayer";
import type { Product } from "@/core/entities/Product";

/**
 * Vitrine: 3 burgers reais do cardápio digital (redsoxburger.menudino.com).
 * Preços "PROMO" de lá: confira antes de publicar, porque mudam com as promoções.
 */
export const TOP_SELLERS_MOCK: Product[] = [
  {
    id: "red-picanha",
    name: "Red Picanha",
    description:
      "2 discos de 80g (160g de carne), cebola caramelizada, american cheese, maionese angus defumada e farofa de bacon.",
    priceInCents: 2290,
    badge: "Carro-chefe",
    image: "/images/redsox-picanha.jpeg",
  },
  {
    id: "red-sertao",
    name: "Red Sertão",
    description:
      "Disco de 160g, cebola caramelizada, queijo coalho, maionese angus defumada, farofa de bacon, mel e orégano.",
    priceInCents: 2290,
    badge: "Regional",
    image: "/images/redsox-sertao.jpeg",
  },
  {
    id: "big-bacon",
    name: "Big Bacon",
    description:
      "Disco de 170g, bacon crocante, american cheese e maionese angus defumada. O queridinho defumado!",
    priceInCents: 2390,
    badge: "Defumado",
    image: "/images/redsox-cheddar.jpeg",
  },
];

/** Ordem de cima para baixo, como o burger é montado na tela. */
export const SIGNATURE_BURGER_LAYERS_MOCK: BurgerLayer[] = [
  { id: "bun-top", name: "Pão tradicional", detail: "Selado na chapa" },
  { id: "salad", name: "Alface", detail: "Crocante" },
  { id: "tomato", name: "Tomate", detail: "Fatiado na hora" },
  { id: "cheese-meat", name: "Carne com american cheese", detail: "Na chapa" },
  { id: "bun-bottom", name: "Pão base", detail: "Com maionese angus defumada" },
];
