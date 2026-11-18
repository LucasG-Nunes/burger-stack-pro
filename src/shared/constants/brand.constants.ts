/** Tudo que muda de cliente para cliente fica aqui. */
export const BRAND = {
  name: "Red Sox Burger & Fries",
  /** Versão curta para o header: primeira parte em creme, segunda em laranja. */
  shortName: ["Red Sox", "Burger"] as const,
  logo: "/images/redsox-logo.jpg",
  tagline: "Burger artesanal na chapa em Candeias.",
  address: "R. Alexandre Baracho, 185 · Candeias, Jaboatão dos Guararapes - PE",
  instagram: "@redsoxburger",
  instagramUrl: "https://www.instagram.com/redsoxburger/",
  /** Cardápio digital (MenuDino): pedido completo com taxa de entrega calculada. */
  menuUrl: "https://redsoxburger.menudino.com",
  deliveryTime: "20–60 min",
} as const;

export const WHATSAPP = {
  /** Formato internacional, só dígitos: DDI + DDD + número. (81) 98372-8325 */
  number: "5581983728325",
  display: "(81) 98372-8325",
} as const;

/**
 * Horário de funcionamento, no fuso de Recife (o visitante pode estar em outro).
 * Dias: 0 = domingo … 6 = sábado. Terça e quinta fechado.
 * `close` = "24:00" significa meia-noite (fim do dia).
 */
export const SCHEDULE = {
  timeZone: "America/Recife",
  openDays: [0, 1, 3, 5, 6] as readonly number[],
  open: { hour: 17, minute: 30 },
  close: { hour: 24, minute: 0 },
  /** Texto exibido no site. */
  daysLabel: "Seg, Qua, Sex, Sáb e Dom",
  hoursLabel: "17h30 à 00h",
} as const;

/** Bloco central da seção de avaliações. Fatos tirados do cardápio digital. */
export const CHEF = {
  name: "Red Sox Burger & Fries",
  role: "Burger artesanal em Candeias",
  quote: "Maionese angus defumada em todos os burgers. Pão, carne e queijo do jeito que tem que ser.",
  stats: [
    { value: "160g", label: "no Red Picanha" },
    { value: "1,5kg", label: "Red Monster" },
    { value: "20–60", label: "min de entrega" },
  ],
} as const;

/** Ponto no mapa (seção "Onde estamos"). */
export const LOCATION = {
  label: "Candeias · Jaboatão dos Guararapes",
  street: "R. Alexandre Baracho, 185 - Casa B",
  district: "Candeias, Jaboatão dos Guararapes - PE",
  zipCode: "54440-400",
  /** Busca usada no "Como chegar" (o Google acha o número exato). */
  mapsQuery: "R. Alexandre Baracho, 185, Candeias, Jaboatão dos Guararapes - PE, 54440-400",
  // O OpenStreetMap não tem o nº 185: o pin fica no trecho central da rua.
  lat: -8.202,
  lng: -34.9296,
  zoom: 16,
} as const;
