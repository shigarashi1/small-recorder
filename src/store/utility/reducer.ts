import { UtilitysActions, ActionType } from './action';

export interface IKeyboardState {
  hasOpen: boolean;
  focusedOnValue: string;
  currentValue: string;
}

const initialKeyboardState: IKeyboardState = {
  hasOpen: false,
  focusedOnValue: '',
  currentValue: '',
};

export function keyboardReducer(state: IKeyboardState = initialKeyboardState, action: UtilitysActions): IKeyboardState {
  switch (action.type) {
    case ActionType.CHANGE_HAS_OPEN_KEYBOARD_SUCCESS:
      return {
        ...state,
        hasOpen: action.payload,
      };

    case ActionType.CHANGE_KEYBOARD_VALUE_SUCCESS:
      return {
        ...state,
        currentValue: action.payload,
      };

    case ActionType.RESET_KEYBOARD_VALUE_SUCCESS:
      return {
        ...state,
        currentValue: action.payload,
        focusedOnValue: action.payload,
      };
  }

  return state;
}

export interface ISidebarState {
  hasOpen: boolean;
}

const initialSidebarState = {
  hasOpen: false,
};

export function SidebarReducer(state: ISidebarState = initialSidebarState, action: UtilitysActions): ISidebarState {
  switch (action.type) {
    case ActionType.CHANGE_SIDEBAR_HAS_OPEN_SUCCESS:
      return {
        ...state,
        hasOpen: action.payload,
      };
  }

  return state;
}
