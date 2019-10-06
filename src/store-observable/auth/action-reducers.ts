import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

// actions
const ac = actionCreatorFactory('[---auth Actions]');
const actions = {
  signIn: ac.async<{}, {}, {}>('signIn'),
  signUp: ac.async<{}, {}, {}>('signUp'),
  signOut: ac.async<{}, {}, {}>('signOut'),
};
export const authActions = actions;

// reducers
export type TAuthState = {
  isSignedIn: boolean;
};

const initialState: TAuthState = {
  isSignedIn: true,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.signIn.started, (state, payload) => ({ ...state }))
  .case(actions.signOut.started, (state, payload) => ({ ...state }));
export const authReducers = reducers;
