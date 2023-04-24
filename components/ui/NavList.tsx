import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { CartIcon, PurchaseIcon } from '../atoms/Svg';
import { FC, useContext } from 'react';
import { ProfileMenu } from '../atoms/ProfileMenu';
import { UIContext } from '@/context/ui/UIContext';
import { useRouter } from 'next/router';
import { useCartProducts } from '@/lib/hooks/useProducts';

interface Props {
  openNav: boolean;
}

export const NavList: FC<Props> = ({ openNav }) => {
  const router = useRouter();
  const { isUserLoggedIn } = useContext(UIContext);

  const { productsOnCart, setProductsOnCart } = useContext(UIContext);

  return (
    <ul
      className={`flex flex-col gap-2 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center ${
        openNav ? '' : ''
      }`}
    >
      {isUserLoggedIn ? (
        <>
          <li>
            <Link href="/purchases">
              <Button
                fullWidth={openNav}
                variant="text"
                color="blue"
                className="flex items-center gap-1"
              >
                <PurchaseIcon />
                Purchases
              </Button>
            </Link>
          </li>
          <li className="relative ">
            <Link href="/cart">
              <Button
                fullWidth={openNav}
                variant="text"
                color="blue"
                className="relative flex items-center gap-1 "
              >
                <CartIcon />
                Cart
              </Button>
            </Link>
            <span className="absolute grid px-[9px] text-lg text-white bg-blue-500 rounded-full place-content-center font-semibold -right-1 -bottom-2">
              {productsOnCart}
            </span>
          </li>
          <span>
            <ProfileMenu />
          </span>
        </>
      ) : (
        <>
          <li>
            <Button
              onClick={() => router.push('/auth/login')}
              fullWidth={openNav}
              variant="gradient"
              color="light-blue"
            >
              log in
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push('/auth/signup')}
              fullWidth={openNav}
              variant="outlined"
              className="focus:ring-0"
            >
              sign up
            </Button>
          </li>
        </>
      )}
    </ul>
  );
};
