import { combineEpics } from 'redux-observable';
import { loginPageEpics } from './login-page';
import { commonPageEpics } from './common-page';
import { backgroundEpics } from './background';
import { settingPageEpics } from './setting-page';
import { recordPageEpics } from './record-page';

// ===== record page =====
// onCreateRecord
// onEditRecord
// onDeleteRecord
// onChangeFilter

// ===== setting page =====
// onEditUser
// onDeleteUser

// ===== reports page =====
// onChangeFilter

// ===== query page =====
// onChangeFilter

export const eventListenerEpics = combineEpics(
  loginPageEpics,
  commonPageEpics,
  backgroundEpics,
  settingPageEpics,
  recordPageEpics,
);
