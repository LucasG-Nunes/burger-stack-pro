/** Tudo que muda de cliente para cliente fica aqui. */
export const BRAND = {
  name: "Burger Stack",
  tagline: "Smash na brasa. Sem atalhos.",
  address: "Rua da Brasa, 230 · São Paulo, SP",
  instagram: "@burgerstack",
  instagramUrl: "https://instagram.com/burgerstack",
  rating: 4.9,
  ratingCount: "2.300+",
  deliveryTime: "35 min",
} as const;

export const WHATSAPP = {
  /** Formato internacional, só dígitos: DDI + DDD + número. */
  number: "5511999999999",
  defaultMessage: "Olá! Quero fazer um pedido 🍔🔥",
} as const;

export const SCHEDULE = {
  openingHour: 18,
  closingHour: 23,
} as const;

export const CHEF = {
  name: "Chef Marcos Brasa",
  role: "Mestre de chapa & fundador",
  quote: "Burger bom não tem segredo: tem fogo alto, carne fresca e paciência zero com atalho.",
  stats: [
    { value: "12 anos", label: "de chapa" },
    { value: "180g", label: "blend próprio" },
    { value: "0", label: "congelados" },
  ],
} as const;
