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

  // user
  get user() {
    return this.state.user.user ? this.state.user.user : null;
  }

  get userId() {
    return this.user && this.user.id ? this.user.id : '';
  }

  get username() {
    return this.user ? this.user.username : '';
  }

  // category
  get categories() {
    return this.state.category.categories;
  }

  // target
  get targets() {
    return this.state.target.targets;
  }

  // records
  get records() {
    return this.state.record.records;
  }

  get recordDateRange() {
    return this.state.record.date;
  }

  // utility
  get isLoading() {
    return this.state.utility.loading;
  }

  get hasOpenedSidebar() {
    return this.state.utility.sidebar;
  }

  // errors
  get systemErrors() {
    return this.state.error.systemErrors;
  }

  get businessErrors() {
    return this.state.error.budinessErrors;
  }
}
