import { UIState } from './UIProvider';

type UiActionType =
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_USER_LOGGED_IN'; payload: boolean }
  | { type: 'SET_PRODUCTS_ON_CART'; payload: number };
export const uiReducer = (state: UIState, action: UiActionType) => {
  switch (action.type) {
    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case 'SET_USER_LOGGED_IN':
      return {
        ...state,
        isUserLoggedIn: action.payload,
      };
    case 'SET_PRODUCTS_ON_CART':
      return {
        ...state,
        productsOnCart: action.payload,
      };
    default:
      return state;
  }
};
