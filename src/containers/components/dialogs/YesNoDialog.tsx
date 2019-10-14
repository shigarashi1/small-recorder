import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../../store';
import { commonPageActions } from '../../../store-observable/events/common-page';
import { getState } from '../../../store-observable/state-selector';

import YesNoDialog from '../../../components/organisms/dialogs/YesNoDialog/YesNoDialog';

function mapStateToProps(state: AppState) {
  return {
    ...getState.utility.dialog.yesNo(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TYesNoDialogProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YesNoDialog);
