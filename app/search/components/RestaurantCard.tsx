import Price from '@/app/components/Price';
import Stars from '@/app/components/Stars';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';
import { Cuisine, PRICE, Location, Review } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface Restaurant {
  id: number;
  location: Location;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  reviews: Review[];
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const rating = calculateReviewRatingAverage(restaurant.reviews);

  const renderRatingText = () => {
    if (rating > 4) return 'Awesome';
    else if (rating <= 4 && rating > 3) return 'Good';
    else if (rating <= 3 && rating > 0) return 'Average';
    else '';
  };
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="border-b flex pb-5">
        <Image
          src={restaurant.main_image}
          alt=""
          className="w-44 h-36 rounded"
          width={500}
          height={500}
        />
        <div className="pl-5">
          <h2 className="text-3xl">{restaurant.name}</h2>
          <div className="flex items-start">
            <div className="flex mb-2">{<Stars rating={rating} />} </div>
            <p className="ml-2 text-sm">{renderRatingText()}</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <Price price={restaurant.price} />
              <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
              <p className="mr-4 capitalize">{restaurant.location.name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
