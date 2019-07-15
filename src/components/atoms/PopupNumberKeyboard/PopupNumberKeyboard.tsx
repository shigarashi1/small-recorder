import React from 'react';

import styles from './PopupNumberKeyboard.module.scss';

import { ObjectIndexes } from '../../../types/index';
import { IKeyboardPosition, TKeyboardKey } from '../../../types/number-keyboard';
import NumberKeyboard from '../NumberKeyboard/NumberKeyboard';

export interface IProps {
  hasOpen?: boolean;
  isAbsolute?: boolean;
  position?: IKeyboardPosition;
  onPush: (value: TKeyboardKey) => void;
}

const PopupNumberKeyboard: React.FC<IProps> = (props: IProps) => {
  const { hasOpen, isAbsolute, position, onPush } = props;

  return (
    <div id={styles.container} style={getStyles()} draggable={true}>
      <NumberKeyboard onPush={onPush} />
    </div>
  );

  function getStyles(): ObjectIndexes {
    return {
      display: hasOpen ? 'block' : 'none',
      position: isAbsolute ? 'absolute' : 'static',
      top: position ? position.x : 170,
      left: position ? position.y : 30,
    };
  }
};

PopupNumberKeyboard.defaultProps = {
  hasOpen: false,
  isAbsolute: true,
};

export default PopupNumberKeyboard;
