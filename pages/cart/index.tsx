import { ReactElement, useContext } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { UIContext } from '@/context/ui/UIContext';

const CartPage: NextPageWithLayout = () => {
  const { isUserLoggedIn } = useContext(UIContext);
  console.log(isUserLoggedIn);

  return (
    <div className="max-w-screen-2xl px-5 mx-auto my-5">
      <div className="flex flex-col md:flex-row  ">
        <div className="md:w-2/3 border border-green-500 py-10"></div>
        <div className="md:w-1/3 border border-blue-500 py-10"></div>
      </div>
    </div>
  );
};

CartPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CartPage;
