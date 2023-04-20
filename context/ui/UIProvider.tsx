import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
  sidebarOpen: boolean;
  loginDialogOpen: boolean;
  signupDialogOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
  loginDialogOpen: false,
  signupDialogOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setSidebarOpen = (value: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: value });
  };

  const setLoginDialogOpen = (value: boolean) => {
    dispatch({ type: 'SET_LOGIN_DIALOG_OPEN', payload: value });
  };

  const setSignupDialogOpen = (value: boolean) => {
    dispatch({ type: 'SET_SIGNUP_DIALOG_OPEN', payload: value });
  };

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: state.sidebarOpen,
        loginDialogOpen: state.loginDialogOpen,
        signupDialogOpen: state.signupDialogOpen,
        setSidebarOpen,
        setLoginDialogOpen,
        setSignupDialogOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
