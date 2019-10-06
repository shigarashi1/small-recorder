import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap } from 'rxjs/operators';
import { AppState } from '../../../store';
import { TKeyboardKey } from '../../../types/components/number-keyboard';

// actions
const ac = actionCreatorFactory('[listener-commonPage]');

// ===== common page =====
export const commonPageActions = {
  onSignOut: ac('onSignOut'),
  onPushKeyboard: ac<TKeyboardKey>('onPushKeyboard'),
  onToggleSidebar: ac('onToggleSidebar'),
};

// onSignOut
const onSignOut: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onSignOut),
    mergeMap(action => []),
  );

//
// onShowInfoDialog
// onShowOkCancelDialog
// onShowYesNoDialog
// onCloseDialogs
// onShowKeyboard
// onCloseKeyboard
// onShowSnackbar

export const commonPageEpics = combineEpics(onSignOut);
