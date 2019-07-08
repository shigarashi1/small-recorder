import { createStore, combineReducers, applyMiddleware, compose, StoreCreator } from 'redux';
import thunk from 'redux-thunk';

import * as fromUser from './users';

const reducers = {
  userFeature: fromUser.reducers,
};
const rootReducer = combineReducers(reducers);
export type AppState = ReturnType<typeof rootReducer>;

const enhancers = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
);

export function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancers);
}
