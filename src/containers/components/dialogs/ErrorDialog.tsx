import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../../store';
import { commonPageActions } from '../../../store-observable/pages/common-page';
import { getState } from '../../../store-observable/state-selector';

import ErrorDialog from '../../../components/organisms/dialogs/ErrorDialog/ErrorDialog';

function mapStateToProps(state: AppState) {
  return {
    errors: getState.error.systemErrors(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TErrorDialogProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorDialog);
