import { UIState } from './UIProvider';

type UiActionType = {
  type: 'SET_SIDEBAR_OPEN';
  payload: boolean;
};

export const uiReducer = (state: UIState, action: UiActionType) => {
  switch (action.type) {
    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    default:
      return state;
  }
};
