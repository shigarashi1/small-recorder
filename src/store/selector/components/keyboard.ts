import { AppState } from '../..';
import { TKeyboardState } from '../../utilities/keyboard/state';
import { createSelector } from 'reselect';

const keyboardSelector = (state: AppState): TKeyboardState => state.utils.keyboard;

export const getKeyboard = {
  hasOpen: createSelector(
    keyboardSelector,
    state => state.hasOpen,
  ),
  currentValue: createSelector(
    keyboardSelector,
    state => state.currentValue,
  ),
  focusedOnValue: createSelector(
    keyboardSelector,
    state => state.focusedOnValue,
  ),
};
