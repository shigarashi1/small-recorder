import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TCategory } from '../../types/firebase';
import { NestedPartial } from '../../types';

// action param type
export type TCreateCategory = Pick<TCategory, 'name'>;
export type TUpdateCategory = { id: string; data: NestedPartial<TCreateCategory> };
export type TReadCategories = { userId?: string };
export type TDeleteCategory = { id: string };

// actions
const ac = actionCreatorFactory('[category]');
const actions = {
  setData: ac<TCategory[]>('setData'),
  create: ac.async<TCreateCategory, {}, {}>('create'),
  update: ac.async<TUpdateCategory, {}, {}>('update'),
  read: ac.async<TReadCategories, {}, {}>('read'),
  delete: ac.async<TDeleteCategory, {}, {}>('delete'),
};
export const categoryActions = actions;

// reducers
interface ICategoryState {
  categories: TCategory[];
}

const initialState: ICategoryState = {
  categories: [],
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.setData, (state, payload) => ({ ...state, categories: payload }))
  .case(actions.create.started, (state, payload) => ({ ...state }))
  .case(actions.create.done, (state, payload) => ({ ...state, sample: payload }));
export const categoryReducers = reducers;
