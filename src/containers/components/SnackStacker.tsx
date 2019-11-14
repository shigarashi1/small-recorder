import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import SnackStacker from '../../components/molecules/SnackStacker/SnackStacker';

import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { getState } from '../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    errors: getState.error.businessErrors(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TSnackStackerProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnackStacker);
