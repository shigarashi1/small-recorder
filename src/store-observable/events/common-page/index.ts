import { actionCreatorFactory, Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
import { AppState } from '../../../store';
import { TKeyboardKey } from '../../../types/components/number-keyboard';
import { authActions } from '../../auth';
import { sidebarActions, yesNoDialogActions } from '../../utilities';
import { WrapAction } from '../../types';
import { errorActions } from '../../error';
import { TYesNoDialog } from '../../../types/components/dialog';

// actions
const ac = actionCreatorFactory('[commonPage]');

// ===== common page =====
export const commonPageActions = {
  onSignOut: ac<void>('onSignOut'),
  onPushKeyboard: ac<TKeyboardKey>('onPushKeyboard'),
  onTogleSidebar: ac<boolean>('onTogleSidebar'),
  onClearSnack: ac<number>('onClearSnack'),
  onClearError: ac<void>('onClearError'),
  onShowYesNoDialog: ac<TYesNoDialog>('onShowYesNoDialog'),
  onCloseYesNoDialog: ac<void>('onCloseYesNoDialog'),
};

// onSignOut
const onSignOut: Epic<AnyAction, WrapAction<typeof authActions.signOut.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onSignOut),
    map(action => authActions.signOut.started({})),
  );

const onTogleSidebar: Epic<AnyAction, Action<boolean>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onTogleSidebar),
    map(({ payload }) => sidebarActions.togle(payload)),
  );

const onClearSnack: Epic<AnyAction, Action<number>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onClearSnack),
    map(({ payload }) => errorActions.clearBusinessError(payload)),
  );

const onClearError: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onClearError),
    map(({ payload }) => errorActions.clearSystemError()),
  );

const onShowYesNoDialog: Epic<AnyAction, Action<TYesNoDialog>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onShowYesNoDialog),
    map(({ payload }) => yesNoDialogActions.show(payload)),
  );

const onCloseYesNoDialog: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(commonPageActions.onCloseYesNoDialog),
    map(({ payload }) => yesNoDialogActions.close()),
  );
//
// onShowInfoDialog
// onShowOkCancelDialog
// onCloseDialogs
// onShowKeyboard
// onCloseKeyboard
// onShowSnackbar

export const commonPageEpics = combineEpics(
  onSignOut,
  onTogleSidebar,
  onClearSnack,
  onClearError,
  onShowYesNoDialog,
  onCloseYesNoDialog,
);
