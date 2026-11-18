import type { BurgerLayer } from "../../entities/BurgerLayer";

export interface IGetSignatureBurgerUseCase {
  execute(): Promise<BurgerLayer[]>;
}
