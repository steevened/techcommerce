import { createContext } from 'react';

interface ContextProps {
  sidebarOpen: boolean;
  isUserLoggedIn: boolean;
  setSidebarOpen: (value: boolean) => void;
  setUserLoggedIn: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
