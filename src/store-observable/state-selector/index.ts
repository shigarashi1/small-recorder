import { createSelector } from 'reselect';
import { appStateSelector } from './objects/app-state';

export const getState = {
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
  router: {
    currentPath: createSelector(
      appStateSelector,
      selector => selector.currentPath,
    ),
  },
  utility: {
    isLoading: createSelector(
      appStateSelector,
      selector => selector.isLoading,
    ),
  },
};
