import React from 'react';

import styles from './DraggableNumberKeyboard.module.scss';
import NumberKeyboard, { IProps as NumberKeyboardProps } from '../NumberKeyboard/NumberKeyboard';
import { Nullable } from '../../../types';
import { IPosition, IDraggableAction } from '../../../types/components/number-keyboard';
import { getTopPosition, getLeftPosition } from '../../../helpers/number-keyboard';

interface IProps {
  hasOpen: boolean;
}

interface IState {
  canDrag: boolean;
  position: IPosition;
}

const initialState: IState = {
  canDrag: false,
  position: {
    x: 0,
    y: 0,
    top: 200,
    left: 100,
  },
};

type TProps = IProps & NumberKeyboardProps;

class DraggableNumberKeyboard extends React.Component<TProps, IState> {
  private _node: Nullable<HTMLDivElement>;
  private _action: IDraggableAction;

  constructor(props: TProps) {
    super(props);
    this.state = initialState;
    this._node = null;
    this._action = this.getDraggableAction();
  }

  render() {
    const { hasOpen } = this.props;
    const className = hasOpen ? styles.display : styles.displayNone;
    const { top, left } = this.state.position;
    return (
      <div
        id={styles.container}
        ref={node => {
          this._node = node;
        }}
        style={{
          top,
          left,
        }}
        className={className}
      >
        <NumberKeyboard {...this.props} action={this._action} />
      </div>
    );
  }

  getDraggableAction(): IDraggableAction {
    return {
      changeCanDrag: this.onMoveStart,
      onMoveEnd: this.onMoveEnd,
      onMove: this.onMove,
    };
  }

  onMoveStart = (canDrag: boolean) => {
    this.setState({ canDrag });
  };

  onMove = (pageY: number, pageX: number) => {
    const { canDrag } = this.state;
    if (!canDrag) {
      return;
    }
    const { position } = this.state;
    const { y, x } = position;
    this.setState({
      position: {
        ...position,
        top: getTopPosition(pageY, y),
        left: getLeftPosition(pageX, x),
      },
    });
  };

  onMoveEnd = (pageY: number, pageX: number) => {
    if (!this._node) {
      return;
    }
    const { offsetLeft, offsetTop } = this._node;
    this.setState({
      canDrag: true,
      position: {
        ...this.state.position,
        x: pageX - offsetLeft,
        y: pageY - offsetTop,
      },
    });
  };
}

export default DraggableNumberKeyboard;
