import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Nullable } from '../../types';
import { TFirebaseUser } from '../../lib/firebase';

export type TAuthSetData = {
  isSignedIn: boolean;
  user: Nullable<TFirebaseUser>;
};

export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = {
  username: string;
  email: string;
  password: string;
  confirmation: string;
};

// actions
const ac = actionCreatorFactory('[auth]');
const actions = {
  onChangedStart: ac<void>('onChangedStart'),
  onChangedEnd: ac<void>('onChangedEnd'),
  setData: ac<TAuthSetData>('setData'),
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
  .case(actions.setData, (state, payload) => ({ ...state, isSignedIn: payload.isSignedIn, user: payload.user }))
  .case(actions.signOut.started, (state, payload) => ({ ...state }))
  .case(actions.signOut.done, (state, payload) => ({ ...state, isSignedIn: false }));
export const authReducers = reducers;
