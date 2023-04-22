import { Image as image } from '@/lib/interfaces/products.interface';
import { Button, IconButton } from '@material-tailwind/react';
import Image from 'next/image';
import { FC } from 'react';
import { CartIcon } from '../atoms/Svg';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { toast } from 'sonner';

interface Props {
  title: string;
  id: number;
  price: string;
  images: image[];
}

export const CardProduct: FC<Props> = ({ title, id, price, images }) => {
  const router = useRouter();

  return (
    <div
      role="button"
      onClick={() => router.push(`/product/${id}`)}
      className="relative flex flex-col w-full max-w-sm rounded-lg aspect-square shadow-app shadow-after bg-blue-gray-50/10 backdrop-blur-sm after:rounded-lg"
    >
      <div className="relative w-full p-4 aspect-square max-h-64 group">
        <Image
          src={images[0].url}
          width={1000}
          height={1000}
          alt="product image"
          className="absolute inset-0 object-contain w-5/6 duration-300 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-5/6 top-1/2 left-1/2 group-hover:opacity-0 "
        />
        <Image
          src={images[1].url}
          width={1000}
          height={1000}
          alt="product image"
          className="absolute inset-0 object-contain w-5/6 duration-300 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none h-5/6 top-1/2 left-1/2 group-hover:opacity-100"
        />
      </div>
      <div className="flex items-center gap-5 px-5 py-2 grow ">
        <div className="grow">
          <h2 className="text-lg font-semibold text-blue-gray-700">{title}</h2>
          <p className="text-blue-gray-600">${price}</p>
        </div>
        <div className="flex items-end ">
          <IconButton
            onClick={(e) => {
              toast.error('Please login to add products to cart');
              e.stopPropagation();
            }}
            className="p-3 rounded-full whitespace-nowrap aspect-square"
          >
            <CartIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
