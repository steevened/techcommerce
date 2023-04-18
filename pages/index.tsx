import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '@/components/ui/Layout';
import { Sidebar } from '@/components/ui/Sidebar';
import { techApi } from '@/lib/api/techApi';
import { CardProduct } from '@/components/ui/CardProduct';
import { ProductsResponse } from '@/lib/interfaces/products.interface';

const fetchProducts = async (): Promise<ProductsResponse> => {
  const { data } = await techApi.get('/products');
  return data;
};

const HomePage: NextPageWithLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <main className="">
      <Sidebar />
      <div className="pt-5 ml-72">
        {products.map((product) => (
          <CardProduct key={product.id} title={product.title} />
        ))}
      </div>
    </main>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
