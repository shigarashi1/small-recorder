import { AppState } from '../../../store';
import { path } from '../../../helpers/generals';
import { populate } from '../../../helpers/firebase';
import { INITIAL_CATEGORY, INITIAL_USER, INITIAL_DATE_RANGE } from '../../../lookups/initial-object';

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
    return path(this.state.user, 'user');
  }

  get userId() {
    return (this.user && path(this.user, 'id')) || '';
  }

  get username() {
    return (this.user && path(this.user, 'username')) || '';
  }

  // category
  get categoryState() {
    return path(this.state, 'category');
  }

  get categories() {
    return this.categoryState ? path(this.categoryState, 'categories') || [] : [];
  }

  get populatedCategories() {
    return this.categories.map(populate('user', [this.user || INITIAL_USER], INITIAL_USER));
  }

  // target
  get targetState() {
    return path(this.state, 'target');
  }

  get targets() {
    return this.targetState ? path(this.targetState, 'targets') || [] : [];
  }

  get populatedTargets() {
    return this.targets
      .map(populate('category', this.categories, INITIAL_CATEGORY))
      .map(populate('user', [this.user || INITIAL_USER], INITIAL_USER));
  }

  // records
  get recordState() {
    return path(this.state, 'record');
  }

  get records() {
    return this.recordState ? path(this.recordState, 'records') || [] : [];
  }

  get recordDateRange() {
    return this.recordState
      ? path(this.recordState, 'dateRange') || { ...INITIAL_DATE_RANGE }
      : { ...INITIAL_DATE_RANGE };
  }

  get populatedRecords() {
    return this.records
      .map(populate('category', this.categories, INITIAL_CATEGORY))
      .map(populate('user', [this.user || INITIAL_USER], INITIAL_USER));
  }

  // utility
  get isLoading() {
    return this.state.utility.loading;
  }

  get hasOpenedSidebar() {
    return this.state.utility.sidebar;
  }

  get selectionDialogData() {
    return this.state.utility.dialog.yesNo;
  }

  // errors
  get systemErrors() {
    return this.state.error.systemErrors;
  }

  get businessErrors() {
    return this.state.error.businessErrors;
  }

  // reportPage
  get reportPageState() {
    return path(this.state.page, 'report');
  }
}
