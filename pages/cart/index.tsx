import { ReactElement, useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { CartResponse } from '@/lib/interfaces/products.interface';
import { getCartProducts } from '@/lib/hooks/useProducts';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { IconButton } from '@material-tailwind/react';
import { CloseIcon, MinusIcon, PlusIcon } from '@/components/atoms/Svg';
// import { UIContext } from '@/context/ui/UIContext';

const CartPage: NextPageWithLayout = () => {
  const [cart, setCart] = useState<CartResponse[]>([]);

  useEffect(() => {
    getCartProducts().then((res) => setCart(res.data));
  }, []);
  console.log(cart);
  // const { isUserLoggedIn } = useContext(UIContext);

  return (
    <div className="max-w-screen-2xl px-5 mx-auto my-5">
      <div className="flex flex-col lg:flex-row gap-2  ">
        <div className="lg:w-2/3  py-10 flex flex-col gap-5">
          {cart.map((product) => (
            <div
              className="shadow-app rounded-md relative shadow-after flex  p-2  gap-2"
              key={product.id}
            >
              <div className="w-16 aspect-square  grid place-content-center object-contain">
                <Image
                  src={product.product.images[0].url}
                  alt={product.product.description}
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h3 className=" font-semibold">{product.product.title}</h3>
                <p className="text-blue-gray-500">
                  ${Number(product.product.price) * product.quantity}
                </p>
              </div>
            </div>
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
