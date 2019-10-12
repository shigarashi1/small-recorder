import { combineReducers } from 'redux';
import { dialogReducers } from './dialogs';
import { keyboardReducers } from './number-keyboard';
import { loadingReducers } from './loading';

export { infoDialogActions, okCancelDialogActions, yesNoDialogActions } from './dialogs';
export { loadingActions } from './loading';
export { keyboardActions } from './number-keyboard';

export const utilityReducers = combineReducers({
  dialog: dialogReducers,
  keyboard: keyboardReducers,
  loading: loadingReducers,
});
