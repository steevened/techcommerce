import { UIState } from './UIProvider';

type UiActionType =
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_LOGIN_DIALOG_OPEN'; payload: boolean }
  | { type: 'SET_SIGNUP_DIALOG_OPEN'; payload: boolean };

export const uiReducer = (state: UIState, action: UiActionType) => {
  switch (action.type) {
    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case 'SET_LOGIN_DIALOG_OPEN':
      return {
        ...state,
        loginDialogOpen: action.payload,
      };
    case 'SET_SIGNUP_DIALOG_OPEN':
      return {
        ...state,
        signupDialogOpen: action.payload,
      };
    default:
      return state;
  }
};
