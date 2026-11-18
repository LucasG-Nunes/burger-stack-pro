import type { Product } from "../../entities/Product";

export interface IGetTopSellersUseCase {
  execute(limit?: number): Promise<Product[]>;
}
