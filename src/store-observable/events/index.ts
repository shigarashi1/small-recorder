import { combineEpics } from 'redux-observable';
import { loginPageEpics } from './login-page';
import { commonPageEpics } from './common-page';

// ===== background =====
// onChangeUser
// onChangeRecords
// onChangeCategories
// onChangeTargets

// ===== record page =====
// onCreateRecord
// onEditRecord
// onDeleteRecord
// onChangeFilter

// ===== setting page =====
// onCreateCategory
// onEditCategory
// onDeleteCategory
// onCreateTarget
// onEditTarget
// onDeleteTarget
// onEditUser
// onDeleteUser

// ===== reports page =====
// onChangeFilter

// ===== query page =====
// onChangeFilter

export const eventListenerEpics = combineEpics(loginPageEpics, commonPageEpics);
