import React from 'react';

import styles from './NumberKeyboard.module.scss';
import Logger from '../../../helpers/logger';
import { DISPLAY_KEYS_LIST } from '../../../lookups/number-keyboard';
import { TKeyboardKey } from '../../../types/number-keyboard';

export interface IProps {
  onPush: (value: TKeyboardKey) => void;
}

const NumberKeyboard: React.FC<IProps> = (props: IProps) => {
  const { onPush } = props;

  const onClickHandler = (key: TKeyboardKey) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Logger.log('numberKeyBoard pushed', key);
    onPush(key);
  };

  return (
    <div id={styles.container}>
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
                  if (key === 0) {
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

  function renderKey(key: TKeyboardKey, colSpan: number, index: number) {
    const buttonClasses = key === 0 ? `${styles.button} ${styles.zero}` : styles.button;
    const buttonLabel = key === '' ? '　' : key;
    return (
      <td className={styles.data} colSpan={colSpan} key={index}>
        <button className={buttonClasses} onClick={onClickHandler(key)}>
          {buttonLabel}
        </button>
      </td>
    );
  }
};

export default NumberKeyboard;
