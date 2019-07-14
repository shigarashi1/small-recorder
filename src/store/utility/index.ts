import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { AppState } from '../index';
import { IKeyboardState, keyboardReducer } from './reducer';

export * from './action';

export interface IUtilityFeature {
  keyboard: IKeyboardState;
}

export const reducers = combineReducers({
  keyboard: keyboardReducer,
});

const featureSelector = (state: AppState): IUtilityFeature => state.utilityFeature;

const getkeyboardState = createSelector(
  featureSelector,
  state => state.keyboard,
);

export const getHasOpenKeyboard = createSelector(
  getkeyboardState,
  state => state.hasOpen,
);

export const getKeyboardCurrentValue = createSelector(
  getkeyboardState,
  state => state.currentValue,
);

export const getKeyboardFocusedOnValue = createSelector(
  getkeyboardState,
  state => state.focusedOnValue,
);
