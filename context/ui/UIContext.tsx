import { createContext } from 'react';

interface ContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
