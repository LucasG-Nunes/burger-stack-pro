/** Tudo que muda de cliente para cliente fica aqui. */
export const BRAND = {
  name: "Burger Stack",
  tagline: "Smash na brasa. Sem atalhos.",
  address: "Av. Bernardo Vieira de Melo, 3000 · Candeias, Jaboatão dos Guararapes - PE",
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

/** Ponto no mapa (seção "Onde estamos"). Troque pelas coordenadas reais da loja. */
export const LOCATION = {
  label: "Candeias · Jaboatão dos Guararapes",
  street: "Av. Bernardo Vieira de Melo, 3000",
  district: "Candeias, Jaboatão dos Guararapes - PE",
  zipCode: "54450-000",
  lat: -8.2125,
  lng: -34.9228,
  zoom: 16,
} as const;
