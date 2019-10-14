import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
//
import { IError } from '../../types/error';
import { generateId } from '../../helpers/generals';

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
  clearBusinessError: ac<number>('clearBusinessError'),
  handle: ac<THandleError>('handle'),
};
export const errorActions = actions;

export type TBusinessError = {
  id: number;
  error: IError;
};

// reducers
type TErrorState = {
  systemErrors: IError[];
  businessErrors: TBusinessError[];
};

const initialState: TErrorState = {
  systemErrors: [],
  businessErrors: [],
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.setSystemError, (state, payload) => ({ ...state, systemErrors: [...state.systemErrors, payload] }))
  .case(actions.clearSystemError, (state, payload) => ({ ...state, systemErrors: [] }))
  .case(actions.setBusinessError, (state, payload) => {
    const newError: TBusinessError = {
      id: generateId(state.businessErrors),
      error: payload,
    };
    return {
      ...state,
      businessErrors: [...state.businessErrors, newError],
    };
  })
  .case(actions.clearBusinessError, (state, payload) => ({
    ...state,
    businessErrors: [...state.businessErrors.filter(v => v.id !== payload)],
  }));
export const errorReducers = reducers;
