import thunk from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { combineReducers, compose, applyMiddleware, StoreCreator, createStore, AnyAction } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

//
import { sampleReducers, sampleEpics } from './_sample';
import history from '../helpers/history';
import { utilityReducers } from './utilities';

// actions
const ac = actionCreatorFactory('[---- root]');
const actions = {
  allClear: ac<void>('allClear'),
};

// reducer
const reducers = combineReducers({
  router: connectRouter(history),
  utility: utilityReducers,
  // sample
  sample: sampleReducers,
});

export type AppState = ReturnType<typeof reducers>;

const rootReducer = (state: any, action: any) => {
  if (action.type === actions.allClear.type) {
    return undefined;
  }
  return reducers;
};

// epic
const rootEpic = combineEpics(sampleEpics);
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();

// enhance
const enhancers = compose(
  applyMiddleware(thunk, epicMiddleware, routerMiddleware(history)),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
);

export const configureStore = (initialState: any) => {
  epicMiddleware.run(rootEpic);
  return createStore(rootReducer, initialState, enhancers);
};
