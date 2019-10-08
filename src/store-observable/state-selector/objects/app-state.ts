import { AppState } from '../../../store';

export const appStateSelector = (state: AppState) => new AppStateSelector(state);

class AppStateSelector {
  private state: AppState;

  constructor(state: AppState) {
    this.state = state;
  }

  get currentPath() {
    return this.state.router.location.pathname;
  }

  get isSignedIn() {
    return this.state.auth.isSignedIn || false;
  }

  get uid() {
    return this.state.auth.user ? this.state.auth.user.uid : '';
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
