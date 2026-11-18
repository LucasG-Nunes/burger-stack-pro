export type BurgerLayerId = "top-bun" | "lettuce" | "patty" | "cheese" | "bottom-bun";

/** Uma camada do burger-assinatura, usada na seção de montagem no scroll. */
export interface BurgerLayer {
  id: BurgerLayerId;
  name: string;
  detail: string;
}
