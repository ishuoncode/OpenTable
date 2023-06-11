import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]): number => {
    if (!reviews || !reviews.length) {
      return 0;
    }
  
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      const rating = reviews[i].rating;
      if (typeof rating !== "number") {
        throw new TypeError("Invalid rating value");
      }
      sum += rating;
    }
    const average = sum / reviews.length;
  
    return Number(average.toFixed(1));
  };