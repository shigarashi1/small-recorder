import React, { useEffect } from 'react';

import styles from './ReportPage.module.scss';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DateSelector from '../../molecules/DateSelector/DateSelector';

import { TPageProps } from '../../../containers/pages/ReportPage';

import { TDateRange, Nullable } from '../../../types';
import { getDocId } from '../../../helpers/firebase';
import { toDisplayDate } from '../../../helpers/generals';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

type TProps = TPageProps;

const ReportPage: React.FC<TProps> = props => {
  const { pageState, load, records } = props;

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

  const onSetThisDate = () => {
    props.setThisWeekOrMonth();
  };

  const onTogleTerm = () => {
    props.togleTerm();
  };

  const enableCategories = props.categories.filter(v => records.map(vv => getDocId(vv.category)).includes(v.id || ''));
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
            <Card className={styles.card} square={true}>
              <CardHeader className={styles.header} title="Record Date" />
              <CardContent className={styles.content}>
                <FormControl className={styles.formControl}>
                  <List component="div" className={styles.list}>
                    <ListItem className={styles.listItem}>
                      <DateSelector
                        selectedDate={pageState.dateRange.from}
                        showToday={true}
                        onChangeDate={onChangeDate('from')}
                        maltiButtonLabel={pageState.isMonth ? 'ThisMonth' : 'ThisWeek'}
                        onMaltiButtonClick={onSetThisDate}
                        margin="none"
                      />
                    </ListItem>
                    <ListItem className={styles.listItem}>
                      <DateSelector
                        selectedDate={pageState.dateRange.to}
                        showToday={true}
                        onChangeDate={onChangeDate('to')}
                        maltiButtonLabel={pageState.isMonth ? 'ThisMonth' : 'ThisWeek'}
                        onMaltiButtonClick={onSetThisDate}
                        margin="none"
                      />
                    </ListItem>
                    <ListItem className={styles.listItem}>
                      <FormControlLabel
                        control={
                          <Switch checked={pageState.isMonth} onChange={onTogleTerm} value="Month" color="primary" />
                        }
                        labelPlacement="start"
                        label="Month"
                      />
                    </ListItem>
                  </List>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          {enableCategories.map((category, i) => (
            <Grid key={i} item={true} xs={12} sm={6} md={4}>
              <ExpansionPanel defaultExpanded={true} square={true}>
                <ExpansionPanelSummary
                  expandIcon={<Icon>expand_more_icon</Icon>}
                  aria-controls={`expand-record${i}`}
                  id={`expand-record${i}`}
                >
                  <Typography variant="h5">{category.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List className={styles.list}>
                    {records
                      .filter(v => getDocId(v.category) === category.id)
                      .map((v, index) => (
                        <React.Fragment key={index}>
                          <ListItem className={styles.listItem}>
                            <ListItemText primary={`${toDisplayDate(v.date)} : ${v.record}`} />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    {/* <ListItem className={styles.listItem}>
                      <p>a</p>
                    </ListItem> */}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ReportPage;
