import { createSelector } from 'reselect';
import { appStateSelector } from './objects/app-state';
//
export { appStateSelector } from './objects/app-state';

export const getState = {
  // auth
  auth: {
    isSignedIn: createSelector(
      appStateSelector,
      selector => selector.isSignedIn,
    ),
    uid: createSelector(
      appStateSelector,
      selector => selector.uid,
    ),
  },
  // user
  user: {
    id: createSelector(
      appStateSelector,
      selector => selector.userId,
    ),
    username: createSelector(
      appStateSelector,
      selector => selector.username,
    ),
  },
  lookups: {
    categories: createSelector(
      appStateSelector,
      selector => selector.categories,
    ),
    targets: createSelector(
      appStateSelector,
      selector => selector.targets,
    ),
  },
  // record
  record: {
    records: createSelector(
      appStateSelector,
      selector => selector.records,
    ),
    dateRange: createSelector(
      appStateSelector,
      selector => selector.recordDateRange,
    ),
  },
  // router
  router: {
    currentPath: createSelector(
      appStateSelector,
      selector => selector.currentPath,
    ),
  },
  // utility
  utility: {
    isLoading: createSelector(
      appStateSelector,
      selector => selector.isLoading,
    ),
    hasOpenedSidebar: createSelector(
      appStateSelector,
      selector => selector.hasOpenedSidebar,
    ),
    dialog: {
      yesNo: createSelector(
        appStateSelector,
        selector => selector.selectionDialogData,
      ),
      info: createSelector(
        appStateSelector,
        selector => selector.infoDialog,
      ),
    },
  },
  // error
  error: {
    systemErrors: createSelector(
      appStateSelector,
      selector => selector.systemErrors,
    ),
    businessErrors: createSelector(
      appStateSelector,
      selector => selector.businessErrors,
    ),
  },
};
