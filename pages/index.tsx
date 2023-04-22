import { ReactElement, useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '@/components/ui/Layout';
import { Sidebar } from '@/components/ui/Sidebar';
import { techApi } from '@/lib/api/techApi';
import { CardProduct } from '@/components/ui/CardProduct';
import {
  Category,
  ProductsResponse,
} from '@/lib/interfaces/products.interface';
import { GetStaticProps } from 'next';
import { FilterIcon } from '@/components/atoms/Svg';
import { Button } from '@material-tailwind/react';
import { UIContext } from '@/context/ui/UIContext';

interface Props {
  products: ProductsResponse[];
  categories: Category[];
}

const HomePage: NextPageWithLayout<Props> = ({ products, categories }) => {
  const { setSidebarOpen } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [filterByCategories, setFilterByCategories] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  return (
    <main className="">
      <Sidebar
        inputValue={inputValue}
        setInputValue={setInputValue}
        categories={categories}
        filterByCategories={filterByCategories}
        setFilterByCategories={setFilterByCategories}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="py-5 md:ml-72">
        <div className="flex justify-center py-5 mx-auto md:hidden">
          <Button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 "
            size="sm"
            variant="text"
          >
            <FilterIcon />
            Filter
          </Button>
        </div>
        <div className="grid max-w-4xl grid-cols-1 gap-10 px-5 mx-auto xl:grid-cols-2 place-items-center">
          {products
            .filter((product) =>
              product.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            .filter((product) =>
              filterByCategories.length === 0
                ? true
                : filterByCategories.includes(product.category.id)
            )
            .filter((product) => Number(product.price) >= minPrice)
            .filter((product) =>
              maxPrice === 0 ? true : Number(product.price) <= maxPrice
            )
            .map(({ id, title, images, price }) => (
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
  const { data: categories } = await techApi.get<Category[]>('/categories');
  return {
    props: { products, categories },
  };
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
