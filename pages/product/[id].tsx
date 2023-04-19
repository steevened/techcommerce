import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import { GetServerSideProps } from 'next';
import { useProductById } from '@/lib/hooks/useProducts';
import { useRouter } from 'next/router';
import { Breadcrumbs, Button, IconButton } from '@material-tailwind/react';
import Link from 'next/link';
import { ArrowIcon, HomeIcon, LoaderIcon } from '@/components/atoms/Svg';
import Image from 'next/image';

const ProductPage: NextPageWithLayout = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const { query } = useRouter();
  const { id } = query;

  const { data, isLoading, isError, error } = useProductById(id as string);

  if (isLoading) {
    return (
      <div className=" h-[calc(100vh-100px)] flex items-center justify-center bg-white">
        <LoaderIcon />
      </div>
    );
  }

  if (isError) {
    return <div>{`${error}`}</div>;
  }

  console.log(imageIndex);

  const handleSliderBack = () => {
    if (!data) return;

    setImageIndex(imageIndex === 0 ? data.images.length - 1 : imageIndex - 1);
  };

  const handleSlider = () => {
    if (!data) return;

    setImageIndex(imageIndex === data?.images.length - 1 ? 0 : imageIndex + 1);
  };

  return (
    <div className="my-5 max-w-screen-xl mx-auto px-5">
      <Breadcrumbs>
        <Link href="/" className="opacity-60">
          <HomeIcon />
        </Link>
        <Link href={`/product/${id}`} className="opacity-60">
          <span>{data?.title}</span>
        </Link>
      </Breadcrumbs>
      <div className="mt-5">
        <div className="w-full h-full flex flex-col gap-2 md:flex-row ">
          <div className="w-full h-full flex-1 p-5 overflow-hidden  relative  ">
            <div
              className={`w-[${
                data?.images && data?.images.length * 100
              }%] -translate-x-[${
                imageIndex === 0 ? '0' : imageIndex * 33
              }%]  flex  duration-500 h-96`}
            >
              {data?.images.map((image) => (
                <div
                  className="flex-1 flex items-center justify-center  w-full"
                  key={image.id}
                >
                  <Image
                    src={image.url}
                    alt={data.title}
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
          </div>
          <div className="flex-1 flex flex-col px-4  py-2">
            <div className=" grow">
              <h2 className="text-center font-semibold text-2xl text-blue-gray-800">
                {data?.title}
              </h2>
              <div className="my-4 text-blue-gray-700">{data?.description}</div>
            </div>
            <Button fullWidth>Add to cart</Button>
          </div>
          {/* <div
            className={`flex w-[${
              data?.images && data?.images.length * 100
            }%] h-96  p-5`}
            // className="w-[300vw] flex h-64"
          >
            {data?.images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt={data.title}
                width={1000}
                height={1000}
                className="object-contain"
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
