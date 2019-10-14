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
  budinessErrors: TBusinessError[];
};

const initialState: TErrorState = {
  systemErrors: [],
  budinessErrors: [],
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.setSystemError, (state, payload) => ({ ...state, systemErrors: [...state.systemErrors, payload] }))
  .case(actions.clearSystemError, (state, payload) => ({ ...state, systemErrors: [] }))
  .case(actions.setBusinessError, (state, payload) => {
    const newError: TBusinessError = {
      id: generateId(state.budinessErrors),
      error: payload,
    };
    return {
      ...state,
      budinessErrors: [...state.budinessErrors, newError],
    };
  })
  .case(actions.clearBusinessError, (state, payload) => ({
    ...state,
    budinessErrors: [...state.budinessErrors.filter(v => v.id !== payload)],
  }));
export const errorReducers = reducers;
