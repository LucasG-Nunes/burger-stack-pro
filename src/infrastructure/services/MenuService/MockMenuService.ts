import type { BurgerLayer } from "@/core/entities/BurgerLayer";
import type { Product } from "@/core/entities/Product";
import type { IMenuService } from "@/core/ports/out/IMenuService";

import { SIGNATURE_BURGER_LAYERS_MOCK, TOP_SELLERS_MOCK } from "../../mocks/menu.mock";

/**
 * Adapter em memória. Quando o sistema de pedidos existir, crie um
 * `HttpMenuService` que implemente `IMenuService` e troque em `instance.ts`.
 */
export class MockMenuService implements IMenuService {
  async fetchTopSellers(): Promise<Product[]> {
    return TOP_SELLERS_MOCK;
  }

  async fetchSignatureBurgerLayers(): Promise<BurgerLayer[]> {
    return SIGNATURE_BURGER_LAYERS_MOCK;
  }
}
