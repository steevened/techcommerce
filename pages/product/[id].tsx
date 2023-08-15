import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
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
import {
  AddProductToCart,
  ProductsResponse,
} from '@/lib/interfaces/products.interface';
import getProductById, {
  useAddProductToCart,
  useCartProducts,
  useProductById,
} from '@/lib/hooks/useProducts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CardProduct } from '@/components/ui/CardProduct';
import { toast } from 'sonner';
import { UIContext } from '@/context/ui/UIContext';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader';
import { useGetAllProducts } from '../../lib/hooks/useProducts';

interface Props {
  // product: ProductsResponse;
  // relatedProducts: ProductsResponse[];
}

const ProductPage: NextPageWithLayout<Props> = () => {
  //states
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [relatedProducts, setRelatedProducts] = useState<ProductsResponse[]>(
    []
  );

  //router
  const router = useRouter();
  const { id } = router.query;

  //context
  const { isUserLoggedIn } = useContext(UIContext);

  //query functions
  const { data: cartProducts } = useCartProducts();
  const { mutateAsync: addProductToCart } = useAddProductToCart();
  const { data: allProducts } = useGetAllProducts();
  const {
    data: product,
    error,
    isLoading,
    isError,
  } = useProductById(id as string);

  // ref
  const containerRef = useRef<HTMLDivElement>(null);

  //functions

  const handleSliderBack = () => {
    setImageIndex(imageIndex === 0 ? 2 : imageIndex - 1);
  };

  const handleSlider = () => {
    setImageIndex(imageIndex === 2 ? 0 : imageIndex + 1);
  };

  const handleAddProductToCart = async (product: AddProductToCart) => {
    if (!isUserLoggedIn) {
      return toast.error('Please login to add products to cart');
    }

    try {
      toast.promise(addProductToCart(product), {
        loading: 'Loading...',
        success: () => {
          return 'Product added to the cart';
        },
        error: (error) => {
          if (error.response?.data.error) {
            return `${error.response.data.error}`;
          } else {
            return `${error}`;
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //use effects

  useEffect(() => {
    if (product) {
      const container = containerRef.current!;
      const containerWidth = container?.offsetWidth;
      const newPosition = imageIndex * (containerWidth / 3);
      container.style.transform = `translateX(-${newPosition}px)`;
    }
  }, [imageIndex, product]);

  useEffect(() => {
    if (cartProducts) {
      const productInCart = cartProducts.find(
        (item) => item.product.id === product?.id
      );
      if (productInCart) {
        setIsAddedToCart(true);
      } else {
        setIsAddedToCart(false);
      }
    }
  }, [cartProducts, product?.id]);

  useEffect(() => {
    const related = allProducts?.filter(
      (p) => p?.categoryId === product?.categoryId
    );
    setRelatedProducts(related as ProductsResponse[]);
  }, [allProducts, product]);

  // conditions

  if (isLoading) return <Loader />;

  if (isError) return <div>{`${error}`}</div>;

  return (
    <div className="w-screen max-w-screen-xl px-5 mx-auto my-5 overflow-x-hidden">
      <Breadcrumbs>
        <Link href="/" className="opacity-60">
          <HomeIcon />
        </Link>
        <Link href={`/product/${product?.id}`} className="opacity-60">
          <span>{product?.title}</span>
        </Link>
      </Breadcrumbs>
      <div className="mt-5">
        <div className="flex flex-col w-full h-full gap-2 md:flex-row">
          <div className="relative flex-1 w-full h-full p-5 overflow-hidden ">
            <div
              ref={containerRef}
              className={`w-[300%] flex  duration-500 ease-in-out h-96 slider`}
            >
              {product?.images.map((image) => (
                <div
                  className="flex items-center justify-center flex-1 w-full"
                  key={image.id}
                >
                  <Image
                    src={image.url}
                    alt={product.title}
                    width={1000}
                    height={1000}
                    className="object-contain w-5/6 h-5/6"
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-1/2">
              <IconButton onClick={handleSliderBack}>
                <ArrowIcon />
              </IconButton>
            </div>
            <div className="absolute right-0 top-1/2">
              <IconButton onClick={handleSlider}>
                <ArrowIcon rotate />
              </IconButton>
            </div>
            <div className="w-1/2 mx-auto mb-4 ">
              <div className="relative flex w-full">
                {product?.images.map((image, i) => (
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
                      className="object-contain w-5/6 h-5/6"
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
          <div className="flex flex-col flex-1 px-4 py-2">
            <div className="grow">
              <div>
                <h2 className="text-2xl font-semibold text-center text-blue-gray-800">
                  {product?.title}
                </h2>
              </div>
              <div className="my-4 text-blue-gray-700">
                {product?.description}
              </div>
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="">
                <p className="text-xl font-semibold text-blue-gray-800">
                  Price
                </p>
                <p className="text-lg font-medium">${product?.price}</p>
              </div>
              <div className="space-y-1">
                <div className=" text-end">
                  <p className="text-xl font-semibold text-blue-gray-800">
                    Quantity
                  </p>
                </div>
                <div className="flex">
                  <IconButton
                    className="rounded-none"
                    disabled={quantity <= 1 || isAddedToCart}
                    onClick={() => {
                      if (quantity <= 1) return;
                      setQuantity(quantity - 1);
                    }}
                  >
                    <MinusIcon />
                  </IconButton>
                  <IconButton
                    disabled={isAddedToCart}
                    className="text-base rounded-none pointer-events-none"
                  >
                    {quantity}
                  </IconButton>
                  <IconButton
                    disabled={isAddedToCart}
                    className="rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <PlusIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div>
              <Button
                fullWidth
                disabled={isAddedToCart}
                onClick={() =>
                  handleAddProductToCart({
                    productId: product?.id!,
                    quantity,
                  })
                }
              >
                {isAddedToCart ? 'Added To Cart' : 'Add to cart'}
              </Button>
            </div>
          </div>
        </div>
        {/* similar items */}
        <div className="mt-10">
          <div>
            <h3 className="py-10 text-2xl font-bold text-center uppercase text-blue-gray-800 md:text-3xl">
              Discover similar items
            </h3>
            <div className="grid grid-cols-1 gap-10 mx-auto place-items-center lg:grid-cols-2">
              {relatedProducts
                ?.filter((related) => related.id !== product?.id)
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
        </div>
      </div>
    </div>
  );
};


ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
