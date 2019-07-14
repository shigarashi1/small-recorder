import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppState } from '../index';
import { TKeyboardKey } from '../../types/number-keyboard';
import { changeValue } from '../../helpers/number-keyboard';

export enum ActionType {
  CHANGE_HAS_OPEN_KEYBOARD_SUCCESS = '[keyboard] CHANGE_HAS_OPEN_KEYBOARD_SUCCESS',
  CHANGE_KEYBOARD_VALUE_SUCCESS = '[keyboard] CHANGE_KEYBOARD_VALUE_SUCCESS',
  RESET_KEYBOARD_VALUE_SUCCESS = '[keyboard] RESET_KEYBOARD_VALUE_SUCCESS',
}

// ===================================
//
// ===================================
export type ChangeHasOpenKeyboardSuccess = {
  type: typeof ActionType.CHANGE_HAS_OPEN_KEYBOARD_SUCCESS;
  payload: boolean;
};
export type ChangeKeyboardValueSuccess = {
  type: typeof ActionType.CHANGE_KEYBOARD_VALUE_SUCCESS;
  payload: string;
};
export type ResetKeyboardValueSuccess = {
  type: typeof ActionType.RESET_KEYBOARD_VALUE_SUCCESS;
  payload: string;
};

// ===================================
//
// ===================================
export function changeHasOpenKeyboardSuccess(payload: boolean): ChangeHasOpenKeyboardSuccess {
  return {
    type: ActionType.CHANGE_HAS_OPEN_KEYBOARD_SUCCESS,
    payload,
  };
}

export function changeKeyboardValueSuccess(payload: string): ChangeKeyboardValueSuccess {
  return {
    type: ActionType.CHANGE_KEYBOARD_VALUE_SUCCESS,
    payload,
  };
}

export function resetKeyboardValueSuccess(payload: string): ResetKeyboardValueSuccess {
  return {
    type: ActionType.RESET_KEYBOARD_VALUE_SUCCESS,
    payload,
  };
}

// ===================================
//
// ===================================
export function changeHasOpenKeyboard(hasOpen: boolean): ThunkAction<void, AppState, null, Action> {
  return (dispatch: Dispatch) => {
    dispatch(changeHasOpenKeyboardSuccess(hasOpen));
  };
}

export function pushKeyKeyboard(key: TKeyboardKey): ThunkAction<void, AppState, null, Action> {
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    const currentState = getCurrentState();
    const { currentValue, focusedOnValue } = currentState.utilityFeature.keyboard;
    if (key === 'X') {
      dispatch(changeHasOpenKeyboardSuccess(false));
      return;
    }

    if (key === 'R') {
      // FIXME:
      dispatch(resetKeyboardValueSuccess(focusedOnValue));
      return;
    }

    const changedValue = changeValue(currentValue, key, focusedOnValue);
    dispatch(changeKeyboardValueSuccess(changedValue));
  };
}

export type UtilitysActions = ChangeHasOpenKeyboardSuccess | ChangeKeyboardValueSuccess | ResetKeyboardValueSuccess;
