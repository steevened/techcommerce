import { FC, PropsWithChildren } from 'react';
import { NavbarComponent } from './Navbar';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavbarComponent />
      <main>{children}</main>
    </>
  );
};
