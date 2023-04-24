import { ReactElement, useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Layout } from '@/components/ui/Layout';
import {
  useAddProductToCart,
  useCartProducts,
  useCreatePurchase,
  useDeleteProductToCart,
} from '@/lib/hooks/useProducts';
import ProductOnCart from '@/components/ui/ProductOnCart';
import { Button } from '@material-tailwind/react';
import Loader from '@/components/ui/Loader';
import { toast } from 'sonner';
import ConfirmDeleteProductModal from '@/components/ui/ConfirmDeleteProductModal';
import { ProductToDelete } from '@/lib/interfaces/products.interface';
import { UIContext } from '@/context/ui/UIContext';

const CartPage: NextPageWithLayout = () => {
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] =
    useState<ProductToDelete | null>(null);
  const [total, setTotal] = useState<number>(0);
  const handleOpen = () => setIsDialogDeleteOpen((cur) => !cur);
  const { mutateAsync: createPurchase } = useCreatePurchase();
  const { mutateAsync: addProductToCart } = useAddProductToCart();
  const { mutateAsync } = useDeleteProductToCart();

  const { data, isLoading, error, isError } = useCartProducts();
  const { setProductsOnCart, productsOnCart } = useContext(UIContext);

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    try {
      toast.promise(mutateAsync(productToDelete.id), {
        loading: 'Loading...',
        success: () => {
          return 'Product deleted';
        },
        error: 'Something wrong, please try again',
        action: {
          label: 'Undo',
          onClick: () => {
            addProductToCart({
              productId: productToDelete.productId,
              quantity: productToDelete.quantity,
            });
          },
        },
      });
      // console.log(id, quant);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchaseProduct = () => {
    try {
      toast.promise(createPurchase, {
        loading: 'Loading...',
        success: 'Cart purchased',
        error: 'Something wrong, please try again',
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <div className="px-5 mx-auto my-5 max-w-screen-2xl">
        <h1 className="text-2xl font-semibold">
          {data?.length === 0 ? 'Your Cart is empty' : 'Your Cart'}
        </h1>
        <div className="flex flex-col gap-2 py-5 lg:flex-row">
          <div className="flex flex-col gap-5 lg:w-2/3">
            {data?.map((product) => (
              <ProductOnCart
                id={product.id}
                product={product.product}
                quantity={product.quantity}
                key={product.id}
                handleOpen={handleOpen}
                setProductToDelete={setProductToDelete}
              />
            ))}
          </div>
          <div className="relative px-4 py-5 rounded-md lg:w-1/3 shadow-app shadow-after h-min">
            <h2 className="pb-4 text-xl font-semibold text-center">
              Order Summary
            </h2>
            <div className="shadow-app-top text-blue-gray-400">
              <div className="flex items-center justify-between py-2">
                <p className="">Subtotal</p>
                <p className="">${total}</p>
              </div>
              <div>
                <div className="flex items-center justify-between py-2">
                  <p className="">Shipping</p>
                  <p className="">Free</p>
                </div>
              </div>
            </div>
            <div className="shadow-app-top text-blue-gray-400">
              <div className="flex items-center justify-between py-2">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">${total}</p>
              </div>
            </div>
            <div className="mt-2">
              <Button
                onClick={handlePurchaseProduct}
                disabled={data?.length === 0}
                fullWidth
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDeleteProductModal
        isDialogDeleteOpen={isDialogDeleteOpen}
        setIsDialogDeleteOpen={setIsDialogDeleteOpen}
        productToDelete={productToDelete}
        setProductToDelete={setProductToDelete}
        handleDeleteProduct={handleDeleteProduct}
      />
    </>
  );
};

CartPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CartPage;
