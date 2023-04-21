import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';
import Cookies from 'js-cookie';

export interface UIState {
  sidebarOpen: boolean;
  isUserLoggedIn: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
  isUserLoggedIn: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setSidebarOpen = (value: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: value });
  };

  const setUserLoggedIn = (value: boolean) => {
    dispatch({ type: 'SET_USER_LOGGED_IN', payload: value });
  };

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: state.sidebarOpen,
        isUserLoggedIn: state.isUserLoggedIn,
        setUserLoggedIn,
        setSidebarOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
