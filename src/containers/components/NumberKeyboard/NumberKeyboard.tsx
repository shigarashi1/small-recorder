import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../store';

import * as fromUtility from '../../../store/utility';

import { TKeyboardKey } from '../../../types/components/number-keyboard';
import DraggableNumberKeyboard from '../../../components/atoms/DraggableNumberKeyboard/DraggableNumberKeyboard';

interface IStateToProps {
  hasOpenKeyboard: boolean;
  currentValue: string;
}

interface IDispatchToProps {
  pushKeyboard: typeof fromUtility.pushKeyKeyboard;
}

type TProps = IStateToProps & IDispatchToProps;

const NumbarKeyboardContainer: React.FC<TProps> = (props: TProps) => {
  const { hasOpenKeyboard, currentValue } = props;

  const onPushKeyboard = (key: TKeyboardKey) => {
    props.pushKeyboard(key);
  };

  // FIXME: CurrentValue
  console.log(`input keyboard current value is ${currentValue}`);

  return <DraggableNumberKeyboard hasOpen={hasOpenKeyboard} onPush={onPushKeyboard} />;
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    hasOpenKeyboard: fromUtility.getHasOpenKeyboard(state),
    currentValue: fromUtility.getKeyboardCurrentValue(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    pushKeyboard: (key: TKeyboardKey) => dispatch<any>(fromUtility.pushKeyKeyboard(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NumbarKeyboardContainer);
