import React from 'react';
import { addDays } from 'date-fns';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styles from './DateSelector.module.scss';
import InputDate, { IProps as DateProps } from '../../atoms/InputDate/InputDate';

type TProps = DateProps;

const DateSelector: React.FC<TProps> = props => {
  const { selectedDate, onChangeDate, children } = props;

  return (
    <div id={styles.container}>
      <div className={styles.input}>
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
      </div>
      {children ? <div className={styles.side}>{children}</div> : null}
    </div>
  );

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
