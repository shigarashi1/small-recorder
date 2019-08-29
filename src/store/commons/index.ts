import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { errorReducer } from './error/reducer';

export const commonReducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
