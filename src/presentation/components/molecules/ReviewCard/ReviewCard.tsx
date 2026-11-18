import type { Review } from "@/core/entities/Review";
import { cn } from "@/shared/helpers/cn";

import { StarRating } from "../../atoms/StarRating/StarRating";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <figure
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-coal-900/85 p-5 shadow-card backdrop-blur-md lg:w-64",
        className,
      )}
    >
      <StarRating rating={review.rating} />
      <blockquote className="mt-3 text-sm leading-relaxed text-cream-100/90">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center justify-between text-xs">
        <span className="font-semibold text-cream-100">{review.author}</span>
        <span className="text-ash-500">via {review.source}</span>
      </figcaption>
    </figure>
  );
}
