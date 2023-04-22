import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { useCartProducts } from '@/lib/hooks/useProducts';
import ProductOnCart from '@/components/ui/ProductOnCart';

const CartPage: NextPageWithLayout = () => {
  const { data, isLoading, error, isError } = useCartProducts();

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{`${error}`}</div>;

  return (
    <div className="max-w-screen-2xl px-5 mx-auto my-5">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-2  ">
        <div className="lg:w-2/3  py-10 flex flex-col gap-5">
          {data?.map((product) => (
            <ProductOnCart
              id={product.id}
              product={product.product}
              quantity={product.quantity}
              key={product.id}
            />
          ))}
        </div>
        <div className="lg:w-1/3 border border-blue-500 py-10"></div>
      </div>
    </div>
  );
};

CartPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CartPage;
