import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TCategory } from '../../../../types/firebase';

// actions
const ac = actionCreatorFactory('[---- Category Dialog]');
const actions = {
  show: ac<string | void>('show'),
  close: ac<void>('close'),
  setState: ac<{ key: keyof TCategoryDialog; value: string }>('setState'),
  create: ac<void>('create'),
  update: ac<void>('update'),
};
export const categoryDialogActions = actions;

// reducers
export type TCategoryDialog = Pick<TCategory, 'id' | 'name'> & {
  hasOpen: boolean;
};

const initialState: TCategoryDialog = {
  hasOpen: false,
  id: '',
  name: '',
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.show, (state, payload) => ({ ...state, id: payload || '', hasOpen: true }))
  .case(actions.close, (state, payload) => ({ ...initialState }))
  .case(actions.setState, (state, payload) => ({ ...state, [payload.key]: payload.value }));
export const categoryDialogReducers = reducers;
