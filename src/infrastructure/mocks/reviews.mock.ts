import type { Review } from "@/core/entities/Review";

/**
 * Avaliações reais do Google (texto enviado pela loja).
 * Para adicionar mais, copie do Google com o nome do autor e a nota.
 * Use só avaliações reais: depoimento inventado é propaganda enganosa.
 */
export const REVIEWS_MOCK: Review[] = [
  {
    id: "google-1",
    author: "Cliente no Google",
    rating: 5,
    quote: "Muito bom!!! Atendimento ótimo!",
    source: "Google",
  },
  {
    id: "google-2",
    author: "Cliente no Google",
    rating: 5,
    quote: "Comida excelente.",
    source: "Google",
  },
];
