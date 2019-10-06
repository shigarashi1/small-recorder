import { AppState } from '../../../store';
import Logger from '../../../helpers/generals/logger';

export const appStateSelector = (state: AppState) => new AppStateSelector(state);

class AppStateSelector {
  private state: AppState;

  constructor(state: AppState) {
    this.state = state;
  }

  get currentPath() {
    Logger.log('currentPath', this.state.router.location.pathname);
    return this.state.router.location.pathname;
  }

  get isSignedIn() {
    return this.state.auth.isSignedIn;
  }

  get infoDialog() {
    return this.state.utility.dialog.info;
  }

  get okCancelDialog() {
    return this.state.utility.dialog.okCancel;
  }

  get yesNoDialog() {
    return this.state.utility.dialog.yesNo;
  }
}
