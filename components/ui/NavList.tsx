import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { CartIcon, PurchaseIcon } from '../atoms/Svg';
import { FC, useContext } from 'react';
import { ProfileMenu } from '../atoms/ProfileMenu';
import { UIContext } from '@/context/ui/UIContext';
import { useRouter } from 'next/router';

interface Props {
  openNav: boolean;
}

export const NavList: FC<Props> = ({ openNav }) => {
  const router = useRouter();
  const { isUserLoggedIn } = useContext(UIContext);

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
          <li>
            <Link href="/cart">
              <Button
                fullWidth={openNav}
                variant="text"
                color="blue"
                className="flex items-center gap-1"
              >
                <CartIcon />
                Cart
              </Button>
            </Link>
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
