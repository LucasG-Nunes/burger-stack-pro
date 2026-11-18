/** Ids na ordem de montagem, de cima para baixo (espelham as artes 01–05). */
export type BurgerLayerId = "bun-top" | "salad" | "tomato" | "cheese-meat" | "bun-bottom";

/** Uma camada do burger-assinatura, usada na seção de montagem no scroll. */
export interface BurgerLayer {
  id: BurgerLayerId;
  name: string;
  detail: string;
}
