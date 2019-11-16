import React, { useEffect } from 'react';
import { keys } from 'ramda';

import styles from './SearchPage.module.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import DateSelector from '../../molecules/DateSelector/DateSelector';

import { TPageProps } from '../../../containers/pages/SearchPage';
import { TDateRange, Nullable, OrderBy } from '../../../types';
import Logger from '../../../helpers/generals/logger';
import { TSearchPage } from '../../../store-observable/pages/search-page/action-reducers';
import { matchCondition } from '../../../helpers/generals';

type TProps = TPageProps;

const SearchPage: React.FC<TProps> = (props: TProps) => {
  Logger.log('SearchPage', props);
  const { load, pageState } = props;

  useEffect(() => {
    load();
  }, [load]);

  if (!pageState) {
    return null;
  }

  const onChangeDate = (key: keyof TDateRange<Date>) => (date: Nullable<Date>) => {
    if (date) {
      props.setDate({ key, date });
    }
  };

  const onToday = (key: keyof TDateRange<Date>) => () => {
    props.setToday(key);
  };

  const onChangeState = (key: keyof Omit<TSearchPage, 'dateRange'>) => (e: React.ChangeEvent<any>) => {
    const checkedValue = matchCondition(
      [
        [!pageState.canShowDeletedCategory, key === 'canShowDeletedCategory'], //
        [!pageState.isDesc, key === 'isDesc'],
      ],
      undefined,
    );
    if (checkedValue !== undefined) {
      props.setState({ key, value: checkedValue });
      return;
    }
    const value = e.target.value || '';
    props.setState({ key, value });
  };

  const selectableCategories = pageState.canShowDeletedCategory
    ? [...props.categories]
    : props.categories.filter(v => !!v.hasDeleted);

  return (
    <div id={styles.root}>
      <div className={styles.title}>
        <Typography variant="h4" color="inherit">
          SearchPage
        </Typography>
      </div>
      <div className={styles.contents}>
        <Grid container={true} spacing={2} alignContent="flex-start" justify="flex-start">
          <Grid item={true} xs={12} sm={6} md={4}>
            <Card className={styles.card} square={true}>
              <CardHeader className={styles.header} title="Filter" />
              <CardContent className={styles.content}>
                <Typography variant="subtitle1">Date From</Typography>
                <div className={styles.dateSelector}>
                  <DateSelector
                    selectedDate={pageState.dateRange.from}
                    onChangeDate={onChangeDate('from')}
                    margin="none"
                  >
                    <Button onClick={onToday('from')} variant="contained" color="primary" size="small">
                      Today
                    </Button>
                  </DateSelector>
                </div>
                <Typography variant="subtitle1">Date To</Typography>
                <div className={styles.dateSelector}>
                  <DateSelector selectedDate={pageState.dateRange.to} onChangeDate={onChangeDate('to')} margin="none">
                    <Button onClick={onToday('to')} variant="contained" color="primary" size="small">
                      Today
                    </Button>
                  </DateSelector>
                </div>
                <Typography variant="subtitle1">Category</Typography>
                <div className={styles.category}>
                  <div className={styles.select}>
                    {/* category */}
                    <FormControl className={styles.formControl}>
                      <Select value={pageState.category} onChange={onChangeState('category')}>
                        <MenuItem value={''}>{''}</MenuItem>
                        {selectableCategories.map((v, i) => (
                          <MenuItem key={i} value={String(v.id)}>
                            {v.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.check}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!pageState.canShowDeletedCategory}
                          onChange={onChangeState('canShowDeletedCategory')}
                          value="canShowDeletedCategory"
                        />
                      }
                      label="not include deleted"
                    />
                  </div>
                </div>
                <Typography variant="subtitle1">Record</Typography>
                <div className={styles.record}>
                  <FormControl className={styles.formControl}>
                    <TextField
                      className={styles.text}
                      value={pageState.record}
                      onChange={onChangeState('record')}
                      fullWidth={true}
                      label="Record"
                    />
                  </FormControl>
                </div>
                <Typography variant="subtitle1">OrderBy</Typography>
                <div className={styles.orderBy}>
                  <div className={styles.select}>
                    <FormControl className={styles.formControl}>
                      <Select value={pageState.orderBy} onChange={onChangeState('orderBy')}>
                        {keys(OrderBy).map((v, i) => (
                          <MenuItem key={i} value={String(v)}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.check}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={pageState.isDesc} onChange={onChangeState('isDesc')} value="isDesc" />
                      }
                      label="Desc"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SearchPage;
