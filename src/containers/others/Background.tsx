import React, { useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';
import { backgroundActions } from '../../store-observable/pages/background';
//
import { AuthenticationService, UserService, TargetService, CategoryService, RecordService } from '../../services';

function mapStateToProps(state: AppState) {
  return {
    uid: getState.auth.uid(state),
    userId: getState.user.id(state),
    dateRange: getState.record.dateRange(state),
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
  dateRange,
  onChangedUser,
  onChangedAuth,
  onChangedCategories,
  onChangedTargets,
  onChangedRecords,
  onThrowError,
}) => {
  // auth
  useEffect(() => {
    const subscription = AuthenticationService.onAuthStateChanged(onChangedAuth, onThrowError);
    return () => {
      subscription();
    };
  }, [onChangedAuth, onThrowError]);

  // user
  useEffect(() => {
    const subscription = UserService.onChangedUser({ uid }, onChangedUser, onThrowError);
    return () => {
      subscription();
    };
  }, [uid, onChangedUser, onThrowError]);

  // category
  useEffect(() => {
    const subscription = CategoryService.onChangedCategories({ user: userId }, onChangedCategories, onThrowError);
    return () => {
      subscription();
    };
  }, [userId, onThrowError, onChangedCategories]);

  // target
  useEffect(() => {
    const subscription = TargetService.onChangedTargets({ user: userId }, onChangedTargets, onThrowError);
    return () => {
      subscription();
    };
  }, [userId, onThrowError, onChangedTargets]);

  // records
  useEffect(() => {
    const subscription = RecordService.onChangedRecords({ ...dateRange, user: userId }, onChangedRecords, onThrowError);
    return () => {
      subscription();
    };
  }, [userId, dateRange, onChangedRecords, onThrowError]);

  return null;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Background);
