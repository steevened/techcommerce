import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';
import Cookies from 'js-cookie';
import { useCartProducts } from '@/lib/hooks/useProducts';

export interface UIState {
  sidebarOpen: boolean;
  isUserLoggedIn: boolean;
  productsOnCart: number;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
  isUserLoggedIn: false,
  productsOnCart: 0,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const { data: productsOnCartLength } = useCartProducts();

  const setSidebarOpen = (value: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: value });
  };

  const setUserLoggedIn = (value: boolean) => {
    dispatch({ type: 'SET_USER_LOGGED_IN', payload: value });
  };

  const setProductsOnCart = (value: number) => {
    dispatch({ type: 'SET_PRODUCTS_ON_CART', payload: value });
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (productsOnCartLength) {
      setProductsOnCart(productsOnCartLength.length);
    }
  }, [productsOnCartLength]);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: state.sidebarOpen,
        isUserLoggedIn: state.isUserLoggedIn,
        productsOnCart: state.productsOnCart,
        setUserLoggedIn,
        setSidebarOpen,
        setProductsOnCart,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
