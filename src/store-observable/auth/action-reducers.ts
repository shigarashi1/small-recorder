import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TSignIn, TSignUp } from '../types';

// actions
const ac = actionCreatorFactory('[---auth Actions]');
const actions = {
  signIn: ac.async<TSignIn, {}, {}>('signIn'),
  signUp: ac.async<TSignUp, {}, {}>('signUp'),
  signOut: ac.async<{}, {}, {}>('signOut'),
};
export const authActions = actions;

// reducers
export type TAuthState = {
  isSignedIn: boolean;
};

const initialState: TAuthState = {
  isSignedIn: false,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.signIn.started, (state, payload) => ({ ...state }))
  .case(actions.signIn.done, (state, payload) => ({ ...state, isSignedIn: true }))
  .case(actions.signOut.started, (state, payload) => ({ ...state }));
export const authReducers = reducers;
