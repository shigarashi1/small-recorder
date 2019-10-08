import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../../store';

import Logger from '../../helpers/generals/logger';
import { TUser } from '../../types/firebase';
import { TFirebaseUser } from '../../lib/firebase';
import { Nullable } from '../../types';
import { AuthenticationService } from '../../services/auth';
import { getState } from '../../store-observable/state-selector';
import { UserService } from '../../services/user';

function mapStateToProps(state: AppState) {
  return {
    uid: getState.auth.uid(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

type TProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface IState {
  uid: string;
  user: TUser;
}

const initialState: IState = {
  uid: '',
  user: {
    id: null,
    uid: '',
    username: '',
  },
};

class Background extends Component<TProps, IState> {
  private get user(): Nullable<TUser> {
    return this.users.find(v => v.uid === this.state.uid) || null;
  }

  static getDerivedStateFromProps(nextProps: TProps, prevState: IState) {
    Logger.log('getDerivedStateFromProps called');
    if (nextProps.uid !== prevState.uid) {
      Logger.log('update uid', nextProps.uid);
    }
    // TODO: lookups(category&target)
    // TODO: tasks
    return null;
  }
  private users: TUser[] = [];
  private intervalTimer: any;
  private authSubscription: () => void;
  private userSubscription: () => void;

  constructor(props: TProps) {
    super(props);
    this.state = { ...initialState, user: { ...initialState.user } };
    const emptyFunc = () => Logger.log('not set');
    this.authSubscription = emptyFunc;
    this.userSubscription = emptyFunc;
  }

  logError = (err: any) => {
    Logger.error('logError', err);
  };

  onChangedAuth = (user: Nullable<TFirebaseUser>) => {
    Logger.log('onChangeAuth', user);
  };

  onChangedUser = (user: Nullable<TUser>) => {
    Logger.log('onChangedUser', user);
  };

  componentDidMount() {
    Logger.log('Background didMound');
    this.authSubscription = AuthenticationService.onAuthStateChanged(this.onChangedAuth, this.logError);
    this.userSubscription = UserService.onChangedUser(this.props.uid, this.onChangedUser, this.logError);
    this.intervalTimer = setInterval(() => {
      Logger.log('user', this.user);
    }, 30000);
  }

  componentWillUnmount() {
    Logger.log('Background willUnmount');
    this.authSubscription();
    this.userSubscription();
    clearInterval(this.intervalTimer);
  }

  render() {
    return <React.Fragment />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
