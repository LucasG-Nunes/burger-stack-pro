import type { BurgerLayer } from "../../entities/BurgerLayer";
import type { Product } from "../../entities/Product";

/**
 * Contrato de saída do cardápio. Hoje é atendido por um mock; amanhã por uma
 * API de pedidos — os use cases e a UI não mudam.
 */
export interface IMenuService {
  fetchTopSellers(): Promise<Product[]>;
  fetchSignatureBurgerLayers(): Promise<BurgerLayer[]>;
}
