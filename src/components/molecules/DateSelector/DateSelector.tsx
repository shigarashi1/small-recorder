import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import styles from './DateSelector.module.scss';
import InputDate, { IProps as DateProps } from '../../atoms/InputDate/InputDate';

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
        <Button onClick={backDay}>
          <Icon>keyboard_arrow_left</Icon>
        </Button>
      </div>
      <div className={styles.inputDate}>
        <InputDate {...props} />
      </div>
      <div className={styles.arrowButton}>
        <Button onClick={nextDay}>
          <Icon>keyboard_arrow_right</Icon>
        </Button>
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
        <Button onClick={onMaltiButtonClick} variant="contained" color="primary">
          {maltiButtonLabel}
        </Button>
      </div>
    );
  }

  function nextDay() {
    const value = selectedDate ? selectedDate : new Date();
    onChangeDate(addDays(value, 1));
  }

  function backDay() {
    const value = selectedDate ? selectedDate : new Date();
    onChangeDate(addDays(value, -1));
  }
};

export default DateSelector;
