import { combineReducers } from 'redux';

import { infoDialogReducers } from './info';
import { okCancelDialogReducers } from './ok-cancel';
import { yesNoDialogReducers } from './yes-no';

export { infoDialogActions } from './info';
export { okCancelDialogActions } from './ok-cancel';
export { yesNoDialogActions } from './yes-no';
export const dialogReducers = combineReducers({
  info: infoDialogReducers,
  okCancel: okCancelDialogReducers,
  yesNo: yesNoDialogReducers,
});
