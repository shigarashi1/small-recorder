import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import styles from './InputDate.module.scss';
import { Nullable } from '../../../types';
import { PropTypes } from '@material-ui/core';

export interface IProps {
  selectedDate?: Date;
  onChangeDate: (date: Nullable<Date>) => void;
  label?: string;
  margin?: PropTypes.Margin;
  disabled?: boolean;
  disableFuture?: boolean;
  inputVariant?: 'standard' | 'outlined' | 'filled';
}

const InputDate: React.FC<IProps> = (props: IProps) => {
  const { selectedDate, onChangeDate, label, margin, disabled, inputVariant, disableFuture } = props;

  return (
    <div id={styles.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id="mui-pickers-date"
          format="yyyy/MM/dd"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          mask="____/__/__"
          value={selectedDate}
          onChange={onChangeDate}
          label={label}
          margin={margin}
          disabled={disabled}
          disableFuture={disableFuture}
          inputVariant={inputVariant}
          showTodayButton={true}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

InputDate.defaultProps = {
  margin: 'normal',
  disabled: false,
  disableFuture: true,
  inputVariant: 'standard',
};

export default InputDate;
