import type { Product } from "../../entities/Product";
import type { IGetTopSellersUseCase } from "../../ports/in/IGetTopSellersUseCase";
import type { IMenuService } from "../../ports/out/IMenuService";

export class GetTopSellersUseCase implements IGetTopSellersUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async execute(limit = 3): Promise<Product[]> {
    const products = await this.menuService.fetchTopSellers();
    return products.slice(0, limit);
  }
}
