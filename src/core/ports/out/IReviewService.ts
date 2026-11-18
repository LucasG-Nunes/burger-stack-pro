import type { Review } from "../../entities/Review";

export interface IReviewService {
  fetchFeatured(): Promise<Review[]>;
}
