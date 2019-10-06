import { createSelector } from 'reselect';
import { appStateSelector } from './objects/app-state';

export const getState = {
  auth: {
    isSignedIn: createSelector(
      appStateSelector,
      selector => selector.isSignedIn,
    ),
  },
  router: {
    currentPath: createSelector(
      appStateSelector,
      selector => selector.currentPath,
    ),
  },
};
