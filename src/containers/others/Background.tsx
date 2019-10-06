import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../../store';

import Logger from '../../helpers/generals/logger';
import { TUser } from '../../types/firebase';
import { getCollection, QuerySnapshot, TFirebaseUser } from '../../lib/firebase';
import { Nullable } from '../../types';
import { AuthenticationService } from '../../services/auth';

function mapStateToProps(state: AppState) {
  return {
    uid: '',
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
  uid: '11111',
  user: {
    id: null,
    uid: '11111',
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
  private userSubscription: () => void;

  constructor(props: TProps) {
    super(props);
    this.state = { ...initialState, user: { ...initialState.user } };
    this.userSubscription = () => Logger.log('not set');
  }

  componentDidMount() {
    Logger.log('Background didMound');
    const getUid = (user: TFirebaseUser | null) => {
      const firebaseUser = user ? user.uid : '';
      // TODO: stateが変わった時に実行する
      this.userSubscription = getCollection('users')
        .where('uid', '==', firebaseUser)
        // .orderBy('updatedAt', 'desc') // indexを貼る必要がある
        .limit(3)
        .onSnapshot(next => this.listenUser(next), error => Logger.error('listen user error', error));
    };

    this.userSubscription = AuthenticationService.getSubscriptionAuthStateChanged(getUid, err => {
      Logger.error('listen user error', err);
    });

    this.intervalTimer = setInterval(() => {
      Logger.log('user', this.user);
    }, 5000);
  }

  componentWillUnmount() {
    Logger.log('Background willUnmount');
    this.userSubscription();
    clearInterval(this.intervalTimer);
  }

  render() {
    return <React.Fragment />;
  }

  listenUser = (query: QuerySnapshot) => {
    this.users = query.docs.map(v => ({ id: v.id, ...(v.data() as TUser) }));
    Logger.log('onChanged Users', this.users);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
