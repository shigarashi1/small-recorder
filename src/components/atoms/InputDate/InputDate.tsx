import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import styles from './InputDate.module.scss';
import { Nullable } from '../../../types';

interface IProps {
  selectedDate?: Date;
  onChangeDate: (date: Nullable<Date>) => Date;
}

const InputDate: React.FC<IProps> = (props: IProps) => {
  const { selectedDate, onChangeDate } = props;

  return (
    <div id={styles.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="mui-pickers-date"
          label="Date picker"
          value={selectedDate}
          onChange={onChangeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default InputDate;
