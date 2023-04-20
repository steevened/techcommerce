import { FC, PropsWithChildren } from 'react';
import { NavbarComponent } from './Navbar';
import { LoginDialog } from './LoginDialog';
import { SignUpDialog } from './SignUpDialog';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative bg-white text-blue-gray-700">
      <NavbarComponent />
      <LoginDialog />
      <SignUpDialog />
      <main>{children}</main>
    </div>
  );
};
