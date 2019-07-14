import React from 'react';

import styles from './PopupNumberKeyboard.module.scss';

import { ObjectIndexes } from '../../../types/index';
import { IKeyboardPosition, TKeyboardKey } from '../../../types/number-keyboard';
import NumberKeyboard from '../../atoms/NumberKeyboard/NumberKeyboard';

interface IProps {
  isAbsolute: boolean;
  position: IKeyboardPosition;
  onPush: (value: TKeyboardKey) => void;
}

const PopupNumberKeyboard: React.FC<IProps> = (props: IProps) => {
  const { isAbsolute, position, onPush } = props;

  return (
    <div id={styles.container} style={getStyles(position.x, position.y)}>
      <NumberKeyboard onPush={onPush} />
    </div>
  );

  function getStyles(x: number = 0, y: number = 0): ObjectIndexes {
    return {
      position: isAbsolute ? 'absolute' : 'static',
      top: x,
      left: y,
    };
  }
};

PopupNumberKeyboard.defaultProps = {
  isAbsolute: true,
};

export default PopupNumberKeyboard;
