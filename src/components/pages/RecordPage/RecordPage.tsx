import React, { useState, useEffect } from 'react';

import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DateSelector from '../../molecules/DateSelector/DateSelector';

import styles from './RecordPage.module.scss';

import { Nullable } from '../../../types';
import { TRecord } from '../../../types/firebase';
import { TPageProps } from '../../../containers/pages/RecordPage';

type TProps = TPageProps;

const initialFormState = {
  category: '',
  record: '',
};

const RecordPage: React.FC<TProps> = (props: TProps) => {
  const { changeDate, createRecord } = props;
  const [displayDate, setDisplayDate] = useState(new Date());
  const [formState, setFormState] = useState({ ...initialFormState });

  const setToday = () => {
    onChangeDate(null);
  };

  const onChangeDate = (date: Nullable<Date>) => {
    setDisplayDate(date || new Date());
  };

  useEffect(() => {
    changeDate({ date: displayDate });
  }, [changeDate, displayDate]);

  const onChangeValue = (key: keyof TRecord) => (e: React.ChangeEvent<any>) => {
    const value = e.target.value || '';
    setFormState({ ...formState, [key]: value });
  };

  const onCreateRecord = () => {
    createRecord({ ...formState });
  };

  return (
    <div id={styles.root}>
      <div className={styles.title}>
        <Typography variant="h4" color="inherit">
          RecordPage
        </Typography>
      </div>
      <div className={styles.contents}>
        <Grid container={true} spacing={2} alignContent="flex-start" justify="flex-start">
          <Grid item={true} xs={12} sm={6} md={4}>
            {/* date */}
            <Card className={styles.card} square={true}>
              <CardHeader className={styles.header} title="Record Date" />
              <CardContent className={styles.content}>
                <FormControl className={styles.formControl}>
                  <DateSelector
                    selectedDate={displayDate}
                    showToday={true}
                    onChangeDate={onChangeDate}
                    maltiButtonLabel="Today"
                    onMaltiButtonClick={setToday}
                    margin="none"
                  />
                </FormControl>
              </CardContent>
            </Card>
            <ExpansionPanel className={styles.panel} defaultExpanded={true} square={true}>
              <ExpansionPanelSummary
                expandIcon={<Icon>expand_more_icon</Icon>}
                aria-controls="input-record-header"
                id="input-record-header"
              >
                <Typography variant="h5">Input Record</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={styles.formGroup}>
                  {/* category */}
                  <FormControl className={styles.formControl}>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                      value={formState.category}
                      onChange={onChangeValue('category')}
                      inputProps={{
                        name: 'Category',
                        id: 'category',
                      }}
                    >
                      {props.categories.map((v, i) => (
                        <MenuItem key={i} value={String(v.id)}>
                          {v.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* record */}
                  <FormControl className={styles.formControl}>
                    <TextField
                      className={styles.text}
                      value={formState.record}
                      onChange={onChangeValue('record')}
                      label="Record"
                    />
                  </FormControl>
                  <div className={styles.btnWrapper}>
                    <Fab onClick={onCreateRecord} size="small" color="primary">
                      <Icon>post_add</Icon>
                    </Fab>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RecordPage;
