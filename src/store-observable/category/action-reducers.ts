import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TCategory, OmitUser, TCreateCategory, TUpdateCategory, TReadCategory, NestIdData } from '../../types/firebase';

// actions
const ac = actionCreatorFactory('[category]');
const actions = {
  setData: ac<TCategory[]>('setData'),
  create: ac.async<OmitUser<TCreateCategory>, {}, {}>('create'),
  update: ac.async<NestIdData<TUpdateCategory>, {}, {}>('update'),
  read: ac.async<TReadCategory, {}, {}>('read'),
  delete: ac.async<{ id: string }, {}, {}>('delete'),
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
