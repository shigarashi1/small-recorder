import React from 'react';

import styles from './DateSelector.module.scss';
import InputDate, { IProps as DateProps } from '../../atoms/InputDate/InputDate';
import Button from '../../atoms/Button/Button';
import { addDays } from 'date-fns';

interface IProps {
  showToday: boolean;
  maltiButtonLabel?: string;
  onMaltiButtonClick?: () => void;
}

type TProps = IProps & DateProps;

const DateSelector: React.FC<TProps> = (props: TProps) => {
  const { selectedDate, onChangeDate, maltiButtonLabel, onMaltiButtonClick } = props;

  return (
    <div id={styles.container}>
      <div className={styles.arrowButton}>
        <Button label={null} onClick={removeDay} iconType="left" icon="keyboard_arrow_left" />
      </div>
      <div className={styles.inputDate}>
        <InputDate {...props} />
      </div>
      <div className={styles.arrowButton}>
        <Button label={null} onClick={addDay} iconType="right" icon="keyboard_arrow_right" />
      </div>
      {renderMaltiButton()}
    </div>
  );

  function renderMaltiButton() {
    if (!maltiButtonLabel || !onMaltiButtonClick) {
      return null;
    }

    return (
      <div className={styles.button}>
        <Button label={maltiButtonLabel} onClick={onMaltiButtonClick} variant="contained" color="primary" />
      </div>
    );
  }

  function addDay() {
    const value = selectedDate ? selectedDate : new Date();
    onChangeDate(addDays(value, 1));
  }

  function removeDay() {
    const value = selectedDate ? selectedDate : new Date();
    onChangeDate(addDays(value, -1));
  }
};

export default DateSelector;
