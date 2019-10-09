import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Nullable } from '../../types';
import { TUser } from '../../types/firebase';

// actions
const ac = actionCreatorFactory('[users]');
const actions = {
  readUser: ac.async<{}, { user: TUser }, {}>('readUser'),
  createUser: ac.async<{}, {}, {}>('createUser'),
  deleteUser: ac.async<{}, {}, {}>('deleteUser'),
  updateUser: ac.async<{}, {}, {}>('updateUser'),
  loadCategory: ac<{ user: string }>('loadCategory [sample]'),
};
export const userActions = actions;

// reducers
type TUserState = {
  user: Nullable<TUser>;
};

const initialState: TUserState = {
  user: null,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.readUser.started, (state, payload) => ({ ...state }))
  .case(actions.readUser.done, (state, payload) => ({ ...state, user: payload.result.user }));
export const userReducers = reducers;
