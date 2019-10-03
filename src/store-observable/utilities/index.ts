import { combineReducers } from 'redux';
import { dialogReducers } from './dialogs';

export const utilityReducers = combineReducers({
  dialog: dialogReducers,
});
