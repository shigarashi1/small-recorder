import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

// actions
const ac = actionCreatorFactory('[---samples]');
const actions = {
  signIn: ac('signIn'),
  signOut: ac('signOut'),
};
export const authActions = actions;

// reducers
type TState = {
  isLoggedIn: boolean;
};

const initialState: TState = {
  isLoggedIn: true,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.signIn, (state, payload) => ({ ...state }))
  .case(actions.signOut, (state, payload) => ({ ...state }));
export const authReducers = reducers;
