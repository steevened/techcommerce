import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { useUserPurchases } from '@/lib/hooks/useProducts';
import Loader from '@/components/ui/Loader';
import { getFormatDistanceFromNow } from '@/lib/utils/dateFunctions';
import Purchase from '@/components/ui/Purchase';

const PurchasesPage: NextPageWithLayout = () => {
  const { data, error, isError, isLoading } = useUserPurchases();
  console.log(data);

  if (isLoading) return <Loader />;
  if (isError) return <p>{`${error}`}</p>;

  return (
    <div className="max-w-screen-2xl px-5 mx-auto my-5">
      <h1 className="text-2xl font-semibold">Your Purchases</h1>

      <div className="space-y-5 mt-5">
        {data?.map((purchase) => (
          <Purchase purchase={purchase} key={purchase.id} />
        ))}
      </div>
    </div>
  );
};

PurchasesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default PurchasesPage;
