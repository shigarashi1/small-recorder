import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { AppState } from '../index';
import { IKeyboardState, keyboardReducer, ISidebarState, SidebarReducer } from './reducer';

export * from './action';

export interface IUtilityFeature {
  keyboard: IKeyboardState;
  sidebar: ISidebarState;
}

export const reducers = combineReducers({
  keyboard: keyboardReducer,
  sidebar: SidebarReducer,
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

//
const getSidebarState = createSelector(
  featureSelector,
  state => state.sidebar,
);

export const getHasOpenSidebar = createSelector(
  getSidebarState,
  state => state.hasOpen,
);
