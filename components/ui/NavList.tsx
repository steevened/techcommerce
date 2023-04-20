import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { CartIcon, PurchaseIcon } from '../atoms/Svg';
import { FC, useContext } from 'react';
import { ProfileMenu } from '../atoms/ProfileMenu';
import { UIContext } from '@/context/ui/UIContext';

interface Props {
  openNav: boolean;
  isUserLogedIn: boolean;
}

export const NavList: FC<Props> = ({ openNav, isUserLogedIn }) => {
  const { setLoginDialogOpen, setSignupDialogOpen } = useContext(UIContext);

  return (
    <ul
      className={`flex flex-col gap-2 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center ${
        openNav ? '' : ''
      }`}
    >
      {isUserLogedIn ? (
        <>
          <li>
            <Button
              fullWidth={openNav}
              variant="text"
              color="blue"
              className="flex items-center gap-1"
            >
              <Link href="/" className="flex items-center gap-1">
                <PurchaseIcon />
                Purchases
              </Link>
            </Button>
          </li>
          <li>
            <Button
              fullWidth={openNav}
              variant="text"
              color="blue"
              className="flex items-center gap-1"
            >
              <CartIcon />
              Cart
            </Button>
          </li>
          <span>
            <ProfileMenu />
          </span>
        </>
      ) : (
        <>
          <li>
            <Button
              onClick={() => setLoginDialogOpen(true)}
              fullWidth={openNav}
              variant="gradient"
              color="light-blue"
            >
              log in
            </Button>
          </li>
          <li>
            <Button
              onClick={() => setSignupDialogOpen(true)}
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
