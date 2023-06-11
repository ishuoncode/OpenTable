import Stars from '@/app/components/Stars';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';
import { Review } from '@prisma/client';

export default function Rating({ reviews }: { reviews: Review[] }) {
  const rating = calculateReviewRatingAverage(reviews);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars rating={rating} />
        <p className="text-reg ml-3">
          {calculateReviewRatingAverage(reviews)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length <= 1 ? '' : 's'}
        </p>
      </div>
    </div>
  );
}
