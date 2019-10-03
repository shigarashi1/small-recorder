import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
//
import { IError } from '../../types/error';

// actions
const ac = actionCreatorFactory('[error]');
const actions = {
  set: ac<IError>('set'),
  clear: ac<void>('clear'),
};
export const errorActions = actions;

// reducers
const initialState: IError[] = [];
const reducers = reducerWithInitialState(initialState)
  .case(actions.set, (state, payload) => ({ payload, ...state }))
  .case(actions.clear, (state, payload) => []);
export const errorReducers = reducers;
