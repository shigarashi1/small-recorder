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
import { authReducers } from './auth';

// actions
const ac = actionCreatorFactory('[---- root]');
const actions = {
  clearAllState: ac<void>('clearAllState'),
};

// reducer
const reducers = combineReducers({
  router: connectRouter(history),
  utility: utilityReducers,
  auth: authReducers,
  // sample(not use)
  sample: sampleReducers,
});

export type AppState = ReturnType<typeof reducers>;

const rootReducer = (state: any, action: any) => {
  if (action.type === actions.clearAllState.type) {
    return undefined;
  }
  return reducers;
};

// epic
const rootEpic = combineEpics(sampleEpics, eventListenerEpics);
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
