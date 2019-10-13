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
import { CategoryService } from '../../services/category';

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

const Background: React.FC<TProps> = ({ uid, onChangedUser, onChangedAuth, onChangedCategories, onThrowError }) => {
  useEffect(() => {
    Logger().log('auth subscription start');
    const subscription = AuthenticationService.onAuthStateChanged(onChangedAuth, onThrowError);
    return () => {
      Logger().log('auth subscription end');
      subscription();
    };
  }, [onChangedAuth, onThrowError]);

  useEffect(() => {
    Logger().log('user subscription start');
    const subscription = UserService.onChangedUser(uid, onChangedUser, onThrowError);
    return () => {
      Logger().log('user subscription end');
      subscription();
    };
  }, [uid, onChangedUser, onThrowError]);

  useEffect(() => {
    Logger().log('categories subscription start');
    const subscription = CategoryService.onChangedCategories(uid, onChangedCategories, onThrowError);
    return () => {
      Logger().log('categories subscription end');
      subscription();
    };
  }, [uid, onChangedCategories, onThrowError]);

  Logger().log('Background render');
  return <React.Fragment />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
