import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../../store';

import Logger from '../../helpers/generals/logger';
import { firestoreService } from '../../models/firestore';
import { TUser } from '../../types/firebase';

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
  uid: '',
  user: {
    id: null,
    uid: '',
    username: '',
  },
};

class Background extends Component<TProps, IState> {
  static getDerivedStateFromProps(nextProps: TProps, prevState: IState) {
    if (nextProps.uid !== prevState.uid) {
      Logger.log('update uid', nextProps.uid);
    }
    return null;
  }

  constructor(props: TProps) {
    super(props);
    this.state = { ...initialState, user: { ...initialState.user } };
  }

  componentDidMount() {
    Logger.log('Background didMound');
    firestoreService.user.subscribe(this.listenUser, '11111');
  }

  componentWillUnmount() {
    Logger.log('Background willUnmount');
    firestoreService.user.unsubscribe();
  }

  render() {
    return <React.Fragment />;
  }

  listenUser = (user: TUser) => {
    Logger.log('user snapshot', user);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
