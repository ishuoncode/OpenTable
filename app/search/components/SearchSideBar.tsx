import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisines?: string; price?: PRICE };
}) {
  const prices = [
    {
      Price: '',
      label: 'All',
      className: '',
    },
    {
      price: PRICE.CHEAP,
      label: 'CHEAP',
      className: '',
    },
    {
      price: PRICE.REGULAR,
      label: 'REGULAR',
      className: '',
    },
    {
      price: PRICE.EXPENSIVE,
      label: 'EXPENSIVE',
      className: '',
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            className="font-light text-reg capitalize "
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            className="font-light text-reg capitalize"
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2 ">Price</h1>
        <div className="flex flex-col text-reg font-light  capitalize">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={className}
              key={Math.random().toString()}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
