import fullStar from '../../public/icons/full-star.png';
import halfStar from '../../public/icons/half-star.png';
import emptyStar from '../../public/icons/empty-star.png';
import Image from 'next/image';
import { Review } from '@prisma/client';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';

export default function Stars({ rating }: { rating: number }) {
  const reviewRating = rating;
  const renderStars = () => {
    const star = [];
    for (let i = 0; i < 5; i++) {
      const difference = reviewRating - i;

      if (difference >= 1) {
        // Full star
        star.push(fullStar);
      } else if (difference > 0) {
        // Half star
        star.push(halfStar);
      } else {
        // Empty star
        star.push(emptyStar);
      }
    }
    return star.map((star, index) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" key={index} />;
    });
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
