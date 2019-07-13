import React from 'react';

import styles from './NumberKeyboard.module.scss';
import Logger from '../../../helpers/logger';
import { ObjectIndexes } from '../../../types';

interface IProps {
  onPush?: (value: string) => void;
  isAbsolute?: boolean;
  // not
  value?: string;
  changedValue?: (value: string) => void;
}

const DISPLAY_KEYS_LIST = [['7', '8', '9', 'C'], ['4', '5', '6', 'BS'], ['3', '2', '1', 'R'], ['0', '.', '-']];

const NumberKeyboard: React.FC<IProps> = (props: IProps) => {
  const { value, changedValue, onPush, isAbsolute } = props;

  const onClickHandler = (key: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Logger.log('numberKeyBoard pushed', key);
    if (!onPush) {
      return;
    }

    onPush(key);

    // move to utility store
    if (!changedValue) {
      return;
    }

    switch (key) {
      case 'C':
        changedValue('');
        break;

      case 'BS':
        changedValue('');
        break;

      default:
        const returnValue = value ? value + key : key;
        changedValue(returnValue);
        break;
    }
  };

  return (
    <div id={styles.container} style={getStyles()}>
      <table className={styles.table}>
        <tbody>
          {/* Header */}
          <tr className={styles.row} key={99}>
            {renderKey('', 3, 0)}
            {renderKey('X', 1, 1)}
          </tr>
          {/* Input */}
          {DISPLAY_KEYS_LIST.map((displayKeys, rowIndex) => {
            return (
              <tr className={styles.row} key={rowIndex}>
                {displayKeys.map((key, colIndex) => {
                  if (key === '0') {
                    return renderKey(key, 2, colIndex);
                  }
                  return renderKey(key, 1, colIndex);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  function renderKey(key: string, colSpan: number, index: number) {
    const buttonClasses = key === '0' ? `${styles.button} ${styles.zero}` : styles.button;
    return (
      <td className={styles.data} colSpan={colSpan} key={index}>
        <button className={buttonClasses} onClick={onClickHandler(key)}>
          {key}
        </button>
      </td>
    );
  }

  function getStyles(x: number = 0, y: number = 0): ObjectIndexes {
    return {
      position: isAbsolute ? 'absolute' : 'static',
      top: x,
      left: y,
    };
  }
};

NumberKeyboard.defaultProps = {
  isAbsolute: true,
};

export default NumberKeyboard;
