import type { IMenuService } from "@/core/ports/out/IMenuService";
import type { IReviewService } from "@/core/ports/out/IReviewService";

import { MockMenuService } from "./services/MenuService/MockMenuService";
import { MockReviewService } from "./services/ReviewService/MockReviewService";

/** Composition root: o único lugar que sabe qual adapter está ativo. */
export const menuService: IMenuService = new MockMenuService();
export const reviewService: IReviewService = new MockReviewService();
