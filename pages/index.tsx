import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '@/components/ui/Layout';
import { Sidebar } from '@/components/ui/Sidebar';
import { techApi } from '@/lib/api/techApi';
import { CardProduct } from '@/components/ui/CardProduct';
import { ProductsResponse } from '@/lib/interfaces/products.interface';
import { GetStaticProps } from 'next';

interface Props {
  products: ProductsResponse[];
}

const HomePage: NextPageWithLayout<Props> = ({ products }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="overflow-auto">
      <Sidebar />
      <div className="py-5 md:ml-72">
        <div className="grid  grid-cols-1 xl:grid-cols-2  mx-auto gap-10 px-5 place-items-center max-w-4xl">
          {products.map(({ id, title, images, price }) => (
            <CardProduct
              key={id}
              title={title}
              id={id}
              images={images}
              price={price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data: products } = await techApi.get<ProductsResponse[]>('/products');
  return {
    props: { products },
  };
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
