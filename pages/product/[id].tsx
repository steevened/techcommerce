import { ReactElement, useEffect, useRef, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { Breadcrumbs, Button, IconButton } from '@material-tailwind/react';
import Link from 'next/link';
import {
  ArrowIcon,
  HomeIcon,
  MinusIcon,
  PlusIcon,
} from '@/components/atoms/Svg';
import Image from 'next/image';
import { techApi } from '@/lib/api/techApi';
import { ProductsResponse } from '@/lib/interfaces/products.interface';
import getProductById from '@/lib/hooks/useProducts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CardProduct } from '@/components/ui/CardProduct';

interface Props {
  product: ProductsResponse;
  relatedProducts: ProductsResponse[];
}

const ProductPage: NextPageWithLayout<Props> = ({
  product,
  relatedProducts,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSliderBack = () => {
    setImageIndex(imageIndex === 0 ? 2 : imageIndex - 1);
  };

  const handleSlider = () => {
    setImageIndex(imageIndex === 2 ? 0 : imageIndex + 1);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const containerWidth = container.offsetWidth;
    const newPosition = imageIndex * (containerWidth / 3);
    container.style.transform = `translateX(-${newPosition}px)`;
  }, [imageIndex]);

  return (
    <div className="my-5 max-w-screen-xl mx-auto px-5">
      <Breadcrumbs>
        <Link href="/" className="opacity-60">
          <HomeIcon />
        </Link>
        <Link href={`/product/${product.id}`} className="opacity-60">
          <span>{product.title}</span>
        </Link>
      </Breadcrumbs>
      <div className="mt-5">
        <div className="w-full h-full flex flex-col gap-2 md:flex-row">
          <div className="w-full h-full flex-1 p-5 overflow-hidden  relative  ">
            <div
              ref={containerRef}
              className={`w-[300%] flex  duration-500 ease-in-out h-96 slider`}
            >
              {product.images.map((image) => (
                <div
                  className="flex-1 flex items-center justify-center  w-full"
                  key={image.id}
                >
                  <Image
                    src={image.url}
                    alt={product.title}
                    width={1000}
                    height={1000}
                    className="w-5/6 h-5/6 object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 left-0">
              <IconButton onClick={handleSliderBack}>
                <ArrowIcon />
              </IconButton>
            </div>
            <div className="absolute top-1/2 right-0">
              <IconButton onClick={handleSlider}>
                <ArrowIcon rotate />
              </IconButton>
            </div>
            <div className=" w-1/2 mx-auto mb-4">
              <div className="w-full flex relative">
                {product.images.map((image, i) => (
                  <div
                    role="button"
                    onClick={() => setImageIndex(i)}
                    className={`flex-1 flex items-center justify-center  w-full aspect-square duration-500 delay-100 ${
                      imageIndex === i ? 'scale-110' : 'scale-90 opacity-50'
                    }`}
                    key={image.id}
                  >
                    <Image
                      src={image.url}
                      alt={product.title}
                      width={1000}
                      height={1000}
                      className="w-5/6 h-5/6 object-contain"
                    />
                  </div>
                ))}

                <div
                  className={`absolute w-1/3  duration-500 h-full pointer-events-none  ease-in-out rounded-md shadow-app shadow-after scale-110 ${
                    imageIndex === 0
                      ? 'left-0'
                      : imageIndex === 1
                      ? 'left-1/3'
                      : 'left-2/3'
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col px-4  py-2">
            <div className="grow">
              <div>
                <h2 className="text-center font-semibold text-2xl text-blue-gray-800">
                  {product?.title}
                </h2>
              </div>
              <div className="my-4 text-blue-gray-700">
                {product?.description}
              </div>
            </div>
            <div className="flex justify-between items-center my-4">
              <div className="">
                <p className="text-xl text-blue-gray-800 font-semibold">
                  Price
                </p>
                <p className="text-lg font-medium">${product.price}</p>
              </div>
              <div className="space-y-1">
                <div className=" text-end">
                  <p className="text-xl text-blue-gray-800 font-semibold">
                    Quantity
                  </p>
                </div>
                <div className="flex">
                  <IconButton
                    className="rounded-none"
                    disabled={quantity <= 1}
                    onClick={() => {
                      if (quantity <= 1) return;
                      setQuantity(quantity - 1);
                    }}
                  >
                    <MinusIcon />
                  </IconButton>
                  <IconButton className="rounded-none pointer-events-none text-base">
                    {quantity}
                  </IconButton>
                  <IconButton
                    className="rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <PlusIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div>
              <Button fullWidth>Add to cart</Button>
            </div>
          </div>
        </div>
        {/* similar items */}
        <div className="mt-10">
          <div>
            <h3 className="text-2xl text-blue-gray-800 font-bold uppercase py-10 text-center md:text-3xl">
              Discover similar items
            </h3>
            <div className="grid w-max grid-cols-1 lg:grid-cols-2   mx-auto gap-10">
              {relatedProducts.map(({ id, title, images, price }) => (
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
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await techApi.get<ProductsResponse[]>('/products');

  return {
    paths: data.map(({ id }) => ({
      params: { id: String(id) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const product: ProductsResponse = await getProductById(id);
  const { data } = await techApi.get<ProductsResponse[]>('/products');

  const relatedProducts = data.filter(
    (p) => p.categoryId === product.categoryId
  );

  return {
    props: { product, relatedProducts },
  };
};

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
