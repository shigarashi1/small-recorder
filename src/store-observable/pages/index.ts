import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
//
import { loginPageEpics } from './login-page';
import { commonPageEpics } from './common-page';
import { backgroundEpics } from './background';
import { settingPageEpics } from './setting-page';
import { recordPageEpics } from './record-page';
import { reportPageEpics, reportPageReducers } from './report-page';
import { searchPageReducers, searchPageEpics } from './search-page';

export const eventListenerEpics = combineEpics(
  loginPageEpics,
  commonPageEpics,
  backgroundEpics,
  settingPageEpics,
  recordPageEpics,
  reportPageEpics,
  searchPageEpics,
);

export const pageReducer = combineReducers({ report: reportPageReducers, search: searchPageReducers });
