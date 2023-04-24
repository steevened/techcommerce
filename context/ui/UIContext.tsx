import { createContext } from 'react';

interface ContextProps {
  sidebarOpen: boolean;
  isUserLoggedIn: boolean;
  productsOnCart: number;
  setSidebarOpen: (value: boolean) => void;
  setUserLoggedIn: (value: boolean) => void;
  setProductsOnCart: (value: number) => void;
}

export const UIContext = createContext({} as ContextProps);
