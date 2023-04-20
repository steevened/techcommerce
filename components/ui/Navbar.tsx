import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-tailwind/react';
import Link from 'next/link';
import { ProfileMenu } from '../atoms/ProfileMenu';
import { CartIcon, PurchaseIcon } from '../atoms/Svg';

export const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center ">
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
    </ul>
  );

  return (
    <>
      <Navbar className="sticky inset-0 z-50 max-w-full px-4 py-2 rounded-none h-max md:px-8 md:py-4">
        <div className="flex items-center justify-between text-light-blue-500">
          <Link href="/" className="mr-4 text-xl font-semibold">
            TechCommerce
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden mr-4 md:block">{navList}</div>

            <span className="hidden md:inline-block">
              <ProfileMenu />
            </span>
            <IconButton
              variant="text"
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}

          <ProfileMenu />
        </MobileNav>
      </Navbar>
    </>
  );
};
