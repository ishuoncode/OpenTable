import Image from 'next/image';
import Link from 'next/link';
import { RestaurantCardType } from '../page';
import Price from './Price';
import Stars from './Stars';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';

interface Props {
  restaurant: RestaurantCardType;
}
export default function RestaurantCard({ restaurant }: Props) {
  const rating = calculateReviewRatingAverage(restaurant.reviews);
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <Image
          src={restaurant.main_image}
          className="w-full h-36"
          alt=""
          width={500}
          height={500}
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars rating={rating} />
            <p className="ml-2">
              {restaurant.reviews.length} review
              {restaurant.reviews.length <= 1 ? '' : 's'}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
