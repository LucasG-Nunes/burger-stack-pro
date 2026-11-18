import type { Review } from "../../entities/Review";
import type { IGetFeaturedReviewsUseCase } from "../../ports/in/IGetFeaturedReviewsUseCase";
import type { IReviewService } from "../../ports/out/IReviewService";

export class GetFeaturedReviewsUseCase implements IGetFeaturedReviewsUseCase {
  constructor(private readonly reviewService: IReviewService) {}

  async execute(limit = 6): Promise<Review[]> {
    const reviews = await this.reviewService.fetchFeatured();
    return reviews.filter((review) => review.rating >= 4).slice(0, limit);
  }
}
