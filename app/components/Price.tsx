import { PRICE } from '@prisma/client';

export default function Price({ price }: { price: PRICE }) {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span className="font-medium">$$</span>{' '}
          <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span className="font-medium">$$$</span>{' '}
          <span className="text-gray-400">$</span>
        </>
      );
    } else {
      return (
        <>
          <span className="font-medium">$$$$</span>
        </>
      );
    }
  };

  return <p className="flex mr-3">{renderPrice()}</p>;
}
