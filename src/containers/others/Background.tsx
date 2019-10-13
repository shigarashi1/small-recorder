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
import { TargetService } from '../../services';

function mapStateToProps(state: AppState) {
  return {
    uid: getState.auth.uid(state),
    userId: getState.user.id(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(backgroundActions, dispatch),
  };
}

type TProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Background: React.FC<TProps> = ({
  uid,
  userId,
  onChangedUser,
  onChangedAuth,
  onChangedCategories,
  onChangedTargets,
  onThrowError,
}) => {
  // auth
  useEffect(() => {
    Logger().log('auth subscription start');
    const subscription = AuthenticationService.onAuthStateChanged(onChangedAuth, onThrowError);
    return () => {
      Logger().log('auth subscription end');
      subscription();
    };
  }, [onChangedAuth, onThrowError]);

  // user
  useEffect(() => {
    Logger().log('uid subscription start');
    const subscription = UserService.onChangedUser(uid, onChangedUser, onThrowError);
    return () => {
      Logger().log('uid subscription end');
      subscription();
    };
  }, [uid, onChangedUser, onThrowError]);

  // category, target
  useEffect(() => {
    Logger().log('userId subscription start');
    const categorySubscription = CategoryService.onChangedCategories(userId, onChangedCategories, onThrowError);
    const targetSubscription = TargetService.onChangedTargets(userId, onChangedTargets, onThrowError);
    return () => {
      Logger().log('userId subscription end');
      categorySubscription();
      targetSubscription();
    };
  }, [userId, onThrowError, onChangedCategories, onChangedTargets]);

  // records
  useEffect(() => {
    Logger().log('targets subscription start');
    return () => {
      Logger().log('targets subscription end');
    };
  }, [uid, onChangedTargets, onThrowError]);

  Logger().log('Background render');
  return <React.Fragment />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
