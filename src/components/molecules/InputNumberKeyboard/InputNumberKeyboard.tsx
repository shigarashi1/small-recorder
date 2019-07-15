import React from 'react';

import styles from './InputNumberKeyboard.module.scss';
import InputText, { IProps as ITextProps } from '../../atoms/InputText/InputText';
import NumberKeyboard, { IProps as IKeyboardProps } from '../../atoms/NumberKeyboard/NumberKeyboard';
import { TKeyboardKey } from '../../../types/number-keyboard';
import Logger from '../../../helpers/logger';

interface IProps {
  hasKeyboard?: boolean;
  isFocused: boolean;
}

type TProps = IProps & ITextProps & IKeyboardProps;

const InputNumberKeyboard: React.FC<TProps> = (props: TProps) => {
  const { isFocused, onChange, value, hasKeyboard } = props;
  const keyboardStyle = hasKeyboard && isFocused ? styles.displayBlock : styles.displayNone;

  return (
    <div id={styles.container}>
      <InputText {...props} />
      <div className={keyboardStyle}>
        <NumberKeyboard {...props} onPush={onPush} />
      </div>
    </div>
  );

  function onPush(key: TKeyboardKey): void {
    if (key === 'X') {
      Logger.log('pushed', key);
    }
    if (key === 'R') {
      Logger.log('pushed', key);
    }
  }
};

InputNumberKeyboard.defaultProps = {
  hasKeyboard: false,
};

export default InputNumberKeyboard;
