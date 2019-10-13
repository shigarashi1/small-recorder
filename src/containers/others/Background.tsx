import React, { useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';
import { backgroundActions } from '../../store-observable/events/background';
//
import { UserService } from '../../services/user';
import { AuthenticationService } from '../../services/auth';
//
import Logger from '../../helpers/generals/logger';

function mapStateToProps(state: AppState) {
  return {
    uid: getState.auth.uid(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(backgroundActions, dispatch),
  };
}

type TProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Background: React.FC<TProps> = ({ uid, onChangedUser, onChangedAuth, onThrowError }) => {
  useEffect(() => {
    Logger().log('user subscription didMound');
    const subscription = UserService.onChangedUser(uid, onChangedUser, onThrowError);
    return () => {
      Logger().log('user subscription willUnmount');
      subscription();
    };
  }, [uid, onChangedUser, onThrowError]);

  useEffect(() => {
    Logger().log('auth subscription didMound');
    const subscription = AuthenticationService.onAuthStateChanged(onChangedAuth, onThrowError);
    return () => {
      Logger().log('auth subscription willUnmount');
      subscription();
    };
  }, [onChangedAuth, onThrowError]);

  Logger().log('Background render');
  return <React.Fragment />;

  // private authSubscription: () => void; // ログインしてないことはないからな。。。
  // private userSubscription: () => void;
  // private categorySubscription: () => void;
  // private targetSubscription: () => void;
  // private recordSubscription: () => void;
  // constructor(props: TProps) {
  //   super(props);
  //   Logger().log('Background constructor');
  //   // this.authSubscription = emptyFunc;
  //   this.userSubscription = emptyFunc;
  //   this.categorySubscription = emptyFunc;
  //   this.targetSubscription = emptyFunc;
  //   this.recordSubscription = emptyFunc;
  // }

  // componentDidMount() {
  //   Logger().log('Background didMound');
  //   const { onChangedUser, onThrowError, uid } = this.props;
  //   // this.authSubscription = AuthenticationService.onAuthStateChanged(onChangedAuth, onThrowError);
  //   this.userSubscription =
  // }

  // componentWillUnmount() {
  //   Logger().log('Background willUnmount');
  //   // this.authSubscription();
  //   this.userSubscription();
  //   this.categorySubscription();
  //   this.targetSubscription();
  //   this.recordSubscription();
  // }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
