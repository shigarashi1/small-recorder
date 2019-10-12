import { Dispatch } from 'redux';
import { connect } from 'react-redux';
//
import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';
import LoadingSpiner from '../../components/atoms/LoadingSpiner/LoadingSpiner';

function mapStateToProps(state: AppState) {
  return {
    isLoading: getState.utility.isLoading(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}
export type TRouterGuardProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingSpiner);
