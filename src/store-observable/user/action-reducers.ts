import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Nullable } from '../../types';
import { TUser } from '../../types/firebase';

// actions
const ac = actionCreatorFactory('[users]');
const actions = {
  onChangedStart: ac<void>('onChangedStart'),
  onChangedEnd: ac<void>('onChangedEnd'),
  setData: ac<void>('setData'),
  read: ac.async<{}, { user: TUser }, {}>('read'),
  create: ac.async<{}, {}, {}>('create'),
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
  .case(actions.read.started, (state, payload) => ({ ...state }))
  .case(actions.read.done, (state, payload) => ({ ...state, user: payload.result.user }));
export const userReducers = reducers;
