import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';

// actions
const ac = actionCreatorFactory('[---utilities/sidebar]');
const actions = {
  togle: ac<boolean>('togle'),
};
export const sidebarActions = actions;

const initialState: boolean = false;
const reducers = reducerWithInitialState(initialState).case(actions.togle, (state, payload) => payload);
export const sidebarReducers = reducers;
