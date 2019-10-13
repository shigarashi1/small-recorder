import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
import { AppState } from '../../../store';
import { TKeyboardKey } from '../../../types/components/number-keyboard';
import { authActions } from '../../auth';
import { sidebarActions } from '../../utilities';

// actions
const ac = actionCreatorFactory('[listen-commonPage]');

// ===== common page =====
export const commonPageActions = {
  onSignOut: ac<void>('onSignOut'),
  onPushKeyboard: ac<TKeyboardKey>('onPushKeyboard'),
  onTogleSidebar: ac<boolean>('onTogleSidebar'),
};

// onSignOut
const onSignOut: Epic<AnyAction, Action<Parameters<typeof authActions.signOut.started>[0]>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(commonPageActions.onSignOut),
    map(action => authActions.signOut.started({})),
  );

const onTogleSidebar: Epic<AnyAction, Action<boolean>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onTogleSidebar),
    map(({ payload }) => sidebarActions.togle(payload)),
  );

//
// onShowInfoDialog
// onShowOkCancelDialog
// onShowYesNoDialog
// onCloseDialogs
// onShowKeyboard
// onCloseKeyboard
// onShowSnackbar

export const commonPageEpics = combineEpics(onSignOut, onTogleSidebar);
