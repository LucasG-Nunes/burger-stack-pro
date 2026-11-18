import type { BurgerLayer } from "../../entities/BurgerLayer";
import type { IGetSignatureBurgerUseCase } from "../../ports/in/IGetSignatureBurgerUseCase";
import type { IMenuService } from "../../ports/out/IMenuService";

export class GetSignatureBurgerUseCase implements IGetSignatureBurgerUseCase {
  constructor(private readonly menuService: IMenuService) {}

  async execute(): Promise<BurgerLayer[]> {
    return this.menuService.fetchSignatureBurgerLayers();
  }
}
