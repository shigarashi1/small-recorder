import { combineReducers } from 'redux';

import { infoDialogReducers } from './info';
import { okCancelDialogReducers } from './ok-cancel';
import { yesNoDialogReducers } from './yes-no';
import { categoryDialogReducers } from './category';

export { infoDialogActions } from './info';
export { okCancelDialogActions } from './ok-cancel';
export { yesNoDialogActions } from './yes-no';
export { categoryDialogActions } from './category';

export const dialogReducers = combineReducers({
  info: infoDialogReducers,
  okCancel: okCancelDialogReducers,
  yesNo: yesNoDialogReducers,
  category: categoryDialogReducers,
});
