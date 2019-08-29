import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { targetReducer } from './target/reducer';
import { recordReducer } from './record/reducer';
import { categoryReducer } from './category/reducer';

export const firebaseReducers = combineReducers({
  category: categoryReducer,
  record: recordReducer,
  target: targetReducer,
  user: userReducer,
});
