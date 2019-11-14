import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../../store';
import { commonPageActions } from '../../../store-observable/pages/common-page';
import { getState } from '../../../store-observable/state-selector';

import InformationDialog from '../../../components/organisms/dialogs/InformationDialog/InformationDialog';

function mapStateToProps(state: AppState) {
  return {
    ...getState.utility.dialog.info(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TInfoDialogProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InformationDialog);
