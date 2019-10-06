import { combineReducers } from 'redux';
import { dialogReducers } from './dialogs';
import { keyboardReducers } from './number-keyboard';

export const utilityReducers = combineReducers({
  dialog: dialogReducers,
  keyboard: keyboardReducers,
});
