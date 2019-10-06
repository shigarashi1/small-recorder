import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, delay } from 'rxjs/operators';
import { AppState } from '../../../store';

// actions
const ac = actionCreatorFactory('[listener-commonPage]');

// ===== common page =====
export const commonPageActions = {
  onSignOut: ac('onSignIn'),
  onPushKeyboard: ac('onPushKeyboard'),
};

// onSignOut
const onSignOut: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onSignOut),
    delay(300),
    mergeMap(action => []),
  );

// onToggleSidebar
// onShowInfoDialog
// onShowOkCancelDialog
// onShowYesNoDialog
// onCloseDialogs
// onShowKeyboard
// onCloseKeyboard
// onShowSnackbar

export const commonPageEpics = combineEpics(onSignOut);
