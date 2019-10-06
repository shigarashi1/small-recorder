import thunk from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { combineReducers, compose, applyMiddleware, StoreCreator, createStore, AnyAction } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

//
import history from '../helpers/history';
import { sampleReducers, sampleEpics } from './_sample-src';
import { utilityReducers } from './utilities';
import { eventListenerEpics } from './events';
import { authReducers, authEpics } from './auth';
import { AppState } from '../store';

// actions
const ac = actionCreatorFactory('[---- root]');
const actions = {
  clearAllState: ac<void>('clearAllState'),
};

// reducer
export const reducers = combineReducers({
  router: connectRouter(history),
  utility: utilityReducers,
  auth: authReducers,
  // sample is not used
  sample: sampleReducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === actions.clearAllState.type) {
    return undefined;
  }
  return reducers;
};

// epic
const rootEpic = combineEpics(sampleEpics, eventListenerEpics, authEpics);
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();

// enhance
const enhancers = compose(
  applyMiddleware(thunk, epicMiddleware, routerMiddleware(history)),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
);

export const configureStore = (initialState: any) => {
  const store = createStore(rootReducer, initialState, enhancers);
  epicMiddleware.run(rootEpic);
  return store;
};
