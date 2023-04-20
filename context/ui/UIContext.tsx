import { createContext } from 'react';

interface ContextProps {
  sidebarOpen: boolean;
  loginDialogOpen: boolean;
  signupDialogOpen: boolean;
  setLoginDialogOpen: (value: boolean) => void;
  setSignupDialogOpen: (value: boolean) => void;
  setSidebarOpen: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
