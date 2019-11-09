import React from 'react';
import { addDays } from 'date-fns';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import styles from './DateSelector.module.scss';
import InputDate, { IProps as DateProps } from '../../atoms/InputDate/InputDate';

type TProps = DateProps & {
  showToday: boolean;
  maltiButtonLabel?: string;
  onMaltiButtonClick?: () => void;
};

const DateSelector: React.FC<TProps> = (props: TProps) => {
  const { selectedDate, onChangeDate, maltiButtonLabel, onMaltiButtonClick } = props;

  return (
    <div id={styles.container}>
      <div className={styles.arrowButton}>
        <IconButton onClick={backDay} size="small">
          <Icon>keyboard_arrow_left</Icon>
        </IconButton>
      </div>
      <div className={styles.inputDate}>
        <InputDate {...props} />
      </div>
      <div className={styles.arrowButton}>
        <IconButton onClick={nextDay} size="small">
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
      </div>
      {renderMaltiButton()}
    </div>
  );

  function renderMaltiButton() {
    return !maltiButtonLabel || !onMaltiButtonClick ? null : (
      <div className={styles.button}>
        <Button onClick={onMaltiButtonClick} variant="contained" color="primary" size="small">
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
