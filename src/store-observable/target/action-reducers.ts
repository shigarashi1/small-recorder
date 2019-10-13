import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TTarget } from '../../types/firebase';
import { NestedPartial } from '../../types';

// type
export type TCreateTarget = Omit<TTarget, 'id' | 'user'>;
export type TUpdateTarget = {
  id: string;
  data: NestedPartial<TCreateTarget>;
};
export type TDeleteTarget = {
  id: string;
};

// actions
const ac = actionCreatorFactory('[target]');
const actions = {
  setData: ac<TTarget[]>('setData'),
  create: ac.async<TCreateTarget, {}, {}>('create'),
  update: ac.async<TUpdateTarget, {}, {}>('update'),
  delete: ac.async<TDeleteTarget, {}, {}>('delete'),
};
export const targetActions = actions;

// reducers
interface ITargetState {
  targets: TTarget[];
}

const initialState: ITargetState = {
  targets: [],
};

const reducers = reducerWithInitialState(initialState).case(actions.setData, (state, payload) => ({
  ...state,
  categories: payload,
}));

export const targetReducers = reducers;
