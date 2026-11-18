import type { Review } from "@/core/entities/Review";
import type { IReviewService } from "@/core/ports/out/IReviewService";

import { REVIEWS_MOCK } from "../../mocks/reviews.mock";

export class MockReviewService implements IReviewService {
  async fetchFeatured(): Promise<Review[]> {
    return REVIEWS_MOCK;
  }
}
