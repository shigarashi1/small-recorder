import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Nullable } from '../../types';
import { TUser } from '../../types/firebase';

// actions
const ac = actionCreatorFactory('[users]');
const actions = {
  setData: ac<Nullable<TUser>>('setData'),
  read: ac.async<{ uid?: string }, { user: TUser }, {}>('read'),
  create: ac.async<Pick<TUser, 'uid' | 'username'>, {}, {}>('create'),
  delete: ac.async<{}, {}, {}>('delete'),
  update: ac.async<{}, {}, {}>('update'),
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
  .case(actions.setData, (state, payload) => ({ ...state, user: payload }))
  .case(actions.read.started, (state, payload) => ({ ...state }))
  .case(actions.read.done, (state, payload) => ({ ...state, user: payload.result.user }));
export const userReducers = reducers;
