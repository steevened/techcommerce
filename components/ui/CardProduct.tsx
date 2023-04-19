import { Image as image } from '@/lib/interfaces/products.interface';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { FC } from 'react';
import { CartIcon } from '../atoms/Svg';

interface Props {
  title: string;
  id: number;
  price: string;
  images: image[];
}

export const CardProduct: FC<Props> = ({ title, id, price, images }) => {
  return (
    <div
      role="button"
      className=" w-full max-w-sm aspect-square rounded-lg  flex flex-col shadow-app relative after:absolute after:inset-0 after:shadow-xl after:shadow-black/10 after:pointer-events-none bg-blue-gray-50/50 backdrop-blur-sm"
    >
      <div className="w-full aspect-square  max-h-64  p-4   relative group">
        <Image
          src={images[0].url}
          width={1000}
          height={1000}
          alt="product image"
          className="object-contain w-5/6 h-5/6 absolute inset-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:opacity-0 duration-300 pointer-events-none "
        />
        <Image
          src={images[1].url}
          width={1000}
          height={1000}
          alt="product image"
          className="object-contain w-5/6 h-5/6 absolute inset-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-0 group-hover:opacity-100 duration-300 pointer-events-none"
        />
      </div>
      <div className="flex py-2 px-5 items-center gap-5  grow ">
        <div className="grow">
          <h2 className="text-lg font-semibold text-blue-gray-700">{title}</h2>
          <p className="text-blue-gray-600">${price}</p>
        </div>
        <div className=" items-end flex">
          <Button className="whitespace-nowrap rounded-full aspect-square p-3">
            <CartIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
