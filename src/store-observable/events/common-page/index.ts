import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../../store';
import { TKeyboardKey } from '../../../types/components/number-keyboard';
import { authActions } from '../../auth';
import { TFirebaseUser } from '../../../lib/firebase';
import { TAuthSetData } from '../../auth/action-reducers';
import { sidebarActions } from '../../utilities';

// actions
const ac = actionCreatorFactory('[listen-commonPage]');

// ===== common page =====
export const commonPageActions = {
  onSignOut: ac('onSignOut'),
  onPushKeyboard: ac<TKeyboardKey>('onPushKeyboard'),
  onTogleSidebar: ac<boolean>('onTogleSidebar'),
  onAutoSignIn: ac<TFirebaseUser>('onAutoSignIn'),
};

// onSignOut
const onSignOut: Epic<AnyAction, Action<void> | Action<Parameters<typeof authActions.signOut.started>[0]>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(commonPageActions.onSignOut),
    mergeMap(action => [authActions.signOut.started({})]),
  );

const onAutoSignIn: Epic<AnyAction, Action<TAuthSetData>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onAutoSignIn),
    map(({ payload }) => authActions.setData({ isSignedIn: true, user: payload })),
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

export const commonPageEpics = combineEpics(onSignOut, onAutoSignIn, onTogleSidebar);
