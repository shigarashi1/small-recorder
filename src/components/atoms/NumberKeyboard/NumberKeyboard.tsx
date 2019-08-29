import React from 'react';

import styles from './NumberKeyboard.module.scss';
import Logger from '../../../helpers/generals/logger';
import { DISPLAY_KEYS_LIST } from '../../../lookups/number-keyboard';
import { TKeyboardKey, IDraggableAction } from '../../../types/components/number-keyboard';

export interface IProps {
  onPush: (value: TKeyboardKey) => void;
  action?: IDraggableAction;
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
            {renderDraggableKey(0)}
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
    return (
      <td className={styles.data} colSpan={colSpan} key={index}>
        <button className={buttonClasses} onClick={onClickHandler(key)}>
          {key}
        </button>
      </td>
    );
  }

  function renderDraggableKey(index: number) {
    const { action } = props;
    if (!action) {
      return (
        <td className={styles.data} colSpan={3} key={index}>
          <p className={styles.button}>{'　'}</p>
        </td>
      );
    }

    const onMouseUp = () => {
      action.changeCanDrag(false);
    };

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { pageY, pageX } = event;
      action.onMoveEnd(pageY, pageX);
    };

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      const { pageY, pageX } = event;
      action.onMove(pageY, pageX);
    };

    const onTouchStart = () => {
      action.changeCanDrag(true);
    };

    const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      const { pageY, pageX } = event.changedTouches[0];
      action.onMove(pageY, pageX);
    };

    const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
      const { pageY, pageX } = event.changedTouches[0];
      action.onMoveEnd(pageY, pageX);
    };

    return (
      <td className={styles.data} colSpan={3} key={index}>
        <p
          className={styles.button}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {'　'}
        </p>
      </td>
    );
  }
};

export default NumberKeyboard;
