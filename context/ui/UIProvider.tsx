import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
  sidebarOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setSidebarOpen = (value: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: value });
  };

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: state.sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
