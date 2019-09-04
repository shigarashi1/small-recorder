import { combineReducers } from 'redux';
import { keyboardReducer } from './keyboard/reducer';
import { sidebarReducer } from './sidebar/reducer';

export const utilsFeatureReducers = combineReducers({
  keyboard: keyboardReducer,
  sidebar: sidebarReducer,
});
