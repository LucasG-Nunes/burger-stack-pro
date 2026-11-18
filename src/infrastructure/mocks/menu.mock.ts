import type { BurgerLayer } from "@/core/entities/BurgerLayer";
import type { Product } from "@/core/entities/Product";

/**
 * Dados de exemplo. Para ligar os PNGs finais, basta preencher `image`
 * com o caminho em /public (ex: "/images/products/brasa-smash.png").
 */
export const TOP_SELLERS_MOCK: Product[] = [
  {
    id: "brasa-smash",
    name: "Brasa Smash",
    description:
      "Dois smash de 90g com crosta caramelizada, cheddar inglês derretido, cebola na manteiga e molho da casa.",
    priceInCents: 3890,
    badge: "Mais pedido",
    image: null,
  },
  {
    id: "bacon-inferno",
    name: "Bacon Inferno",
    description:
      "Blend de 180g na chapa, bacon crocante, jalapeño tostado, pepper jack e maionese defumada.",
    priceInCents: 4490,
    badge: "Picante",
    image: null,
  },
  {
    id: "truffle-royale",
    name: "Truffle Royale",
    description:
      "Blend de costela 200g, queijo brie, cogumelos salteados, rúcula e aioli de trufas no brioche.",
    priceInCents: 4990,
    badge: "Edição do Chef",
    image: null,
  },
];

/** Ordem de cima para baixo, como o burger é montado na tela. */
export const SIGNATURE_BURGER_LAYERS_MOCK: BurgerLayer[] = [
  { id: "bun-top", name: "Pão brioche", detail: "Selado na manteiga" },
  { id: "salad", name: "Alface americana", detail: "Crocante e gelada" },
  { id: "tomato", name: "Tomate", detail: "Fatiado na hora" },
  { id: "cheese", name: "Cheddar inglês", detail: "Derretido no abafador" },
  { id: "meat", name: "Blend 180g", detail: "Smash na chapa a 250°C" },
  { id: "bun-bottom", name: "Pão base", detail: "Tostado para não encharcar" },
];
