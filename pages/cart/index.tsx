import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { useCartProducts } from '@/lib/hooks/useProducts';
import ProductOnCart from '@/components/ui/ProductOnCart';
import { Button } from '@material-tailwind/react';
import { LoadIcon, LoaderIcon } from '@/components/atoms/Svg';
import Loader from '@/components/ui/Loader';

const CartPage: NextPageWithLayout = () => {
  const { data, isLoading, error, isError } = useCartProducts();
  const [total, setTotal] = useState<number>(0);

  // console.log(data);
  useEffect(() => {
    if (data) {
      let total = 0;

      data.forEach((product) => {
        total += Number(product.product.price) * product.quantity;
      });

      setTotal(total);
    }
  }, [data]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError) return <div>{`${error}`}</div>;

  return (
    <div className="max-w-screen-2xl px-5 mx-auto my-5">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-2  py-5">
        <div className="lg:w-2/3  flex flex-col gap-5">
          {data?.map((product) => (
            <ProductOnCart
              id={product.id}
              product={product.product}
              quantity={product.quantity}
              key={product.id}
            />
          ))}
        </div>
        <div className="lg:w-1/3  shadow-app rounded-md relative shadow-after py-5 h-min px-4">
          <h2 className="text-xl font-semibold text-center pb-4">
            Order Summary
          </h2>
          <div className="shadow-app-top text-blue-gray-400">
            <div className="flex justify-between items-center py-2">
              <p className="">Subtotal</p>
              <p className="">${total}</p>
            </div>
            <div>
              <div className="flex justify-between items-center py-2">
                <p className="">Shipping</p>
                <p className="">Free</p>
              </div>
            </div>
          </div>
          <div className="shadow-app-top text-blue-gray-400">
            <div className="flex justify-between items-center py-2">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">${total}</p>
            </div>
          </div>
          <div className="mt-2">
            <Button fullWidth>CHECKOUT</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CartPage;
