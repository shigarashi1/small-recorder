import { AppState } from '../..';
import { createSelector } from 'reselect';

import { TAuthState } from '../../commons/auth/state';

const authSelector = (state: AppState): TAuthState => state.common.auth;

const auth = {
  signedIn: createSelector(
    authSelector,
    state => state.loggedIn,
  ),
};

export const getCommon = {
  auth,
};
