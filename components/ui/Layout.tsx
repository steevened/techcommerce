import { FC, PropsWithChildren } from 'react';
import { NavbarComponent } from './Navbar';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative bg-white text-blue-gray-700">
      <NavbarComponent />
      <main>{children}</main>
    </div>
  );
};
