import { combineEpics } from 'redux-observable';
import { loginPageEpics } from './login-page';
import { commonPageEpics } from './common-page';
import { backgroundEpics } from './background';
import { settingPageEpics } from './setting-page';
import { recordPageEpics } from './record-page';
import { reportPageEpics, reportPageReducers } from './report-page';
import { combineReducers } from 'redux';

export const eventListenerEpics = combineEpics(
  loginPageEpics,
  commonPageEpics,
  backgroundEpics,
  settingPageEpics,
  recordPageEpics,
  reportPageEpics,
);

export const pageReducer = combineReducers({ report: reportPageReducers });
