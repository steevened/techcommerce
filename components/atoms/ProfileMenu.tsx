import React, { useContext, useState } from 'react';
import { ChevronDownIcon, PowerIcon, ShopIcon, UserIcon } from './Svg';
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { UIContext } from '@/context/ui/UIContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const closeMenu = () => setIsMenuOpen(false);
  const { setUserLoggedIn } = useContext(UIContext);
  const router = useRouter();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png"
          />
          <ChevronDownIcon isMenuOpen={isMenuOpen} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {/* <MenuItem className="flex items-center gap-2 rounded">
          <UserIcon />
          <Typography as="span" variant="small" className="font-normal">
            Account
          </Typography>
        </MenuItem> */}
        <MenuItem
          role="button"
          onClick={() => {
            Cookies.remove('token');
            setUserLoggedIn(false);
            router.push('/auth/login');
          }}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 text-red-500"
        >
          <PowerIcon />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            // color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
