import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../../store';
import { getState } from '../../../store-observable/state-selector';
import { categoryDialogActions } from '../../../store-observable/utilities/dialogs';

import CategoryDialog from '../../../components/organisms/dialogs/CategoryDialog/CategoryDialog';

function mapStateToProps(state: AppState) {
  return {
    ...getState.utility.dialog.category(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(categoryDialogActions, dispatch),
  };
}

export type TCategoryDialogProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryDialog);
