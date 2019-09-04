import { sidebarActions } from '../utilities/sidebar/actions';
// import { keyboardActions } from '../utilities/keyboard/actions';
import { TKeyboardKey } from '../../types/components/number-keyboard';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { Action, Dispatch } from 'redux';
import Logger from '../../helpers/generals/logger';

export type TPushKey = {
  key: TKeyboardKey;
};

function pushKey(payload: TPushKey): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] pushKey');
  return async (dispatch: Dispatch) => {
    try {
      Logger.log('[Store] pushKey');
    } catch (error) {
      console.error(error);
    }
  };
}

export const utilActions = {
  sidebar: sidebarActions,
  keyboard: { pushKey },
};
