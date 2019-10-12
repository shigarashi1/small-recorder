import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
//
import { IError } from '../../types/error';

export type THandleError = {
  error: any;
  option?: any;
};

// actions
const ac = actionCreatorFactory('[error]');
const actions = {
  setSystemError: ac<IError>('setSystemError'),
  clearSystemError: ac<void>('clearSystemError'),
  setBusinessError: ac<IError>('setBusinessError'),
  clearBusinessError: ac<string>('clearBusinessError'),
  handle: ac<THandleError>('handle'),
};
export const errorActions = actions;

// reducers
type TErrorState = {
  systemErrors: IError[];
  budinessErrors: IError[];
};
const initialState: TErrorState = {
  systemErrors: [],
  budinessErrors: [],
};
const reducers = reducerWithInitialState(initialState)
  .case(actions.setSystemError, (state, payload) => ({ ...state, systemErrors: [...state.systemErrors, payload] }))
  .case(actions.clearSystemError, (state, payload) => ({ ...state, systemErrors: [] }))
  .case(actions.setBusinessError, (state, payload) => ({
    ...state,
    budinessErrors: [...state.budinessErrors, payload],
  }))
  .case(actions.clearBusinessError, (state, payload) => ({
    ...state,
    budinessErrors: [...state.budinessErrors.filter(v => v.code !== payload)],
  }));
export const errorReducers = reducers;
