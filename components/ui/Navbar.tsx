import { useEffect, useState } from 'react';
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from '@material-tailwind/react';
import Link from 'next/link';
import { NavList } from './NavList';

export const NavbarComponent = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar className="sticky inset-0 z-50 max-w-full px-4 py-2 rounded-none h-max md:px-8 md:py-4">
        <div className="flex items-center justify-between text-light-blue-500">
          <Link href="/" className="mr-4 text-xl font-semibold">
            TechCommerce
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden mr-4 md:block">
              <NavList openNav={openNav} isUserLogedIn={isUserLogedIn} />
            </div>

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
        <MobileNav open={openNav} className="md:hidden">
          <NavList openNav={openNav} isUserLogedIn={isUserLogedIn} />
        </MobileNav>
      </Navbar>
    </>
  );
};
