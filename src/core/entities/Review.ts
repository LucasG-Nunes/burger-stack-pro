export interface Review {
  id: string;
  author: string;
  /** Nota de 1 a 5. */
  rating: number;
  quote: string;
  /** Origem da avaliação (Google, iFood, Instagram...). */
  source: string;
}
