import type { Review } from "../../entities/Review";

export interface IGetFeaturedReviewsUseCase {
  execute(limit?: number): Promise<Review[]>;
}
