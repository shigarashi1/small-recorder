import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';

// actions
const ac = actionCreatorFactory('[----utilities/loading]');
const actions = {
  start: ac<void>('start'),
  end: ac<void>('end'),
  togle: ac<boolean>('togle'),
};
export const loadingActions = actions;

const initialState: boolean = false;
const reducers = reducerWithInitialState(initialState)
  .case(actions.start, (state, payload) => true)
  .case(actions.end, (state, payload) => false)
  .case(actions.togle, (state, payload) => payload);
export const loadingReducers = reducers;
