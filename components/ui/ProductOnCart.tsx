import { IconButton } from '@material-tailwind/react';
import { FC, useState } from 'react';
import { CloseIcon, MinusIcon, PlusIcon } from '../atoms/Svg';
import { Product } from '@/lib/interfaces/products.interface';
import Image from 'next/image';
import {
  useAddProductToCart,
  useDeleteProductToCart,
  useUpdateProductQuantity,
} from '@/lib/hooks/useProducts';
import { toast } from 'sonner';
import Link from 'next/link';

interface Props {
  id: number;
  product: Product;
  quantity: number;
}

const ProductOnCart: FC<Props> = ({ id, product, quantity }) => {
  const { mutateAsync } = useDeleteProductToCart();
  const { mutateAsync: addProductToCart } = useAddProductToCart();
  const { mutate, isLoading } = useUpdateProductQuantity();

  const handleDeleteProduct = () => {
    try {
      toast.promise(mutateAsync(id), {
        loading: 'Loading...',
        success: 'Product deleted',
        error: 'Something wrong, please try again',
        action: {
          label: 'Undo',
          onClick: () => {
            addProductToCart({
              productId: product.id,
              quantity: quantity,
            });
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = (type: 'add' | 'remove') => {
    mutate({
      id,
      quantity: type === 'add' ? quantity + 1 : quantity - 1,
    });
  };

  return (
    <div
      className="shadow-app rounded-md relative shadow-after flex  p-2  gap-2"
      key={id}
    >
      <div className="w-16 h-16  aspect-square  ">
        <Image
          src={product.images[0].url}
          alt={product.description}
          width={100}
          height={100}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="">
        <Link href={`/product/${product.id}`}>
          <h3 className="md:text-xl font-semibold hover:text-blue-300 duration-200">
            {product.title}
          </h3>
        </Link>

        <p className="text-blue-gray-500 md:text-lg">
          ${Number(product.price) * quantity}
        </p>
      </div>
      <div className="flex flex-col justify-between  grow">
        <div className="text-end">
          <IconButton
            onClick={handleDeleteProduct}
            size="sm"
            className="w-6 h-6 rounded-md "
            color="red"
            variant="text"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="flex justify-end">
          <IconButton
            disabled={quantity <= 1 || isLoading}
            onClick={() => handleQuantity('remove')}
            size="sm"
            className="w-6 h-6 rounded-md "
            color="blue"
            variant="text"
          >
            <MinusIcon />
          </IconButton>
          <span className="mx-2">{quantity}</span>
          <IconButton
            disabled={isLoading}
            onClick={() => handleQuantity('add')}
            size="sm"
            className="w-6 h-6 rounded-md "
            color="blue"
            variant="text"
          >
            <PlusIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default ProductOnCart;
