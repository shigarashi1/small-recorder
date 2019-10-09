import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TSignIn, TSignUp } from '../types';
import { Nullable } from '../../types';
import { TFirebaseUser } from '../../lib/firebase';

// actions
const ac = actionCreatorFactory('[auth]');
const actions = {
  signIn: ac.async<TSignIn, { user: Nullable<TFirebaseUser> }, {}>('signIn'),
  signUp: ac.async<TSignUp, {}, {}>('signUp'),
  signOut: ac.async<{}, {}, {}>('signOut'),
};
export const authActions = actions;

// reducers
export type TAuthState = {
  isSignedIn: boolean;
  user: Nullable<TFirebaseUser>;
};

const initialState: TAuthState = {
  isSignedIn: false,
  user: null,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.signIn.started, (state, payload) => ({ ...state }))
  .case(actions.signIn.done, (state, payload) => ({ ...state, isSignedIn: true, user: payload.result.user }))
  .case(actions.signOut.started, (state, payload) => ({ ...state }));
export const authReducers = reducers;