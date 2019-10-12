import thunk from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { combineReducers, compose, applyMiddleware, StoreCreator, createStore, AnyAction } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

//
import history from '../helpers/history';
import { AppState } from '../store';
import { sampleReducers, sampleEpics } from './_sample-src';
import { utilityReducers } from './utilities';
import { eventListenerEpics } from './events';
import { authReducers, authEpics } from './auth';
import { userReducers, userEpics } from './user';
import { categoryReducers, categoryEpics } from './category';
import { errorReducers, errorEpics } from './error';

// actions
const ac = actionCreatorFactory('[root]');
const actions = {
  clearAllState: ac<void>('clearAllState'),
};

// reducer
export const reducers = combineReducers({
  router: connectRouter(history),
  utility: utilityReducers,
  auth: authReducers,
  user: userReducers,
  category: categoryReducers,
  error: errorReducers,
  // sample is not used
  sample: sampleReducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === actions.clearAllState.type) {
    state = undefined;
  }
  if (/_STARTED$/.test(action.type)) {
    state.utility.loading = true;
  }
  if (/_DONE$|_FAILED$/.test(action.type)) {
    state.utility.loading = false;
  }
  return reducers(state, action);
};

// epic
const rootEpic = combineEpics(sampleEpics, eventListenerEpics, authEpics, userEpics, categoryEpics, errorEpics);
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
