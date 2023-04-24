import { PurchasesResponse } from '@/lib/interfaces/products.interface';
import { getFormatDistanceFromNow } from '@/lib/utils/dateFunctions';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  purchase: PurchasesResponse;
}

const Purchase: FC<Props> = ({ purchase }) => {
  const date = new Date(purchase.createdAt).getTime();

  return (
    <div className="relative px-4 py-5 rounded-md shadow-app shadow-after">
      <Link href={`/product/${purchase.productId}`}>
        <h2 className="inline-block text-xl duration-200 font-semiboild hover:text-blue-500">
          {purchase.product.title}
        </h2>
      </Link>
      <div>
        <div className="mt-2">
          <p className="">
            ${purchase.product.price} * {purchase.quantity}{' '}
            <span className="font-semibold">TOTAL: </span>$
            {Number(purchase.product.price) * purchase.quantity}
          </p>
        </div>
        <p className="mt-2 text-blue-gray-400">
          {getFormatDistanceFromNow(new Date(purchase.createdAt).getTime())}
        </p>
      </div>
    </div>
  );
};

export default Purchase;
