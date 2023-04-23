import { PurchasesResponse } from '@/lib/interfaces/products.interface';
import { getFormatDistanceFromNow } from '@/lib/utils/dateFunctions';
import { FC } from 'react';

interface Props {
  purchase: PurchasesResponse;
}

const Purchase: FC<Props> = ({ purchase }) => {
  const date = new Date(purchase.createdAt).getTime();

  return (
    <div className="shadow-app relative shadow-after rounded-md px-4 py-5">
      <h2 className="font-semiboild text-xl">{purchase.product.title}</h2>
      <h3>
        {getFormatDistanceFromNow(new Date(purchase.createdAt).getTime())}
      </h3>
    </div>
  );
};

export default Purchase;
