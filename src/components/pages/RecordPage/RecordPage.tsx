import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
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
import { by } from '../../../helpers/generals';
import { TInputFormKey, TEditFormKey } from '../../../store-observable/pages/record-page/actions-reducer';

type TProps = TPageProps;

const CATEGORY_NEW = '999';

const RecordPage: React.FC<TProps> = (props: TProps) => {
  const { pageState, load } = props;

  useEffect(() => {
    load();
  }, [load]);

  if (!pageState) {
    return null;
  }

  const selectableCategories = props.categories.filter(v => !v.hasDeleted);
  const showableCategories = props.categories.filter(v =>
    props.records.map(vv => String(vv.category)).includes(v.id || ''),
  );

  const onCloseYesNoDialog = () => {
    props.onCloseYesNoDialog();
  };

  const onChangeDate = (date: Nullable<Date>) => {
    props.changeDate({ date: date || new Date() });
  };

  const onSetToday = () => {
    onChangeDate(null);
  };

  const onChangeInputForm = (key: TInputFormKey) => (e: React.ChangeEvent<any>) => {
    const value = e.target.value || '';
    if (key === 'categoryId' && value === CATEGORY_NEW) {
      props.showCategoryDialog();
      return;
    }
    props.setInputFormState({ key, value });
  };

  const onChangeEditForm = (key: TEditFormKey) => (e: React.ChangeEvent<any>) => {
    const value = e.target.value || '';
    props.setEditFormState({ key, value });
  };

  const onCreateRecord = () => {
    props.createRecord();
  };

  const onSelectModifyRecord = (recordId: string) => () => {
    props.selectModifyRecord(recordId);
  };

  const onBlurModifyRecord = () => {
    props.updateRecord();
  };

  const onFocusRecord = (categoryId: string) => () => {
    props.selectCategoryRecord(categoryId);
  };

  const onBlurRecord = () => {
    props.createRecord();
  };

  const onConfirmDelete = (records: TRecord[]) => (id: string) => () => {
    const { record } = records.find(by('id')(id)) || { record: '' };
    const data = {
      hasOpen: true,
      title: '確認',
      context: `"${record}" を削除しますか`,
      onYes: () => {
        props.deleteRecord({ id });
      },
      onNo: onCloseYesNoDialog,
      onClose: onCloseYesNoDialog,
    };
    props.onShowYesNoDialog(data);
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
                  <DateSelector selectedDate={pageState.displayedDate} onChangeDate={onChangeDate} margin="none">
                    <Button
                      className={styles.today}
                      onClick={onSetToday}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Today
                    </Button>
                  </DateSelector>
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
                      value={pageState.inputForm.categoryId}
                      onChange={onChangeInputForm('categoryId')}
                      inputProps={{
                        name: 'Category',
                        id: 'category',
                      }}
                    >
                      {selectableCategories.map((v, i) => (
                        <MenuItem key={i} value={v.id}>
                          {v.name}
                        </MenuItem>
                      ))}
                      <MenuItem value={CATEGORY_NEW}>
                        <Icon fontSize="small">add</Icon>
                        Create New Category
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {/* record */}
                  <FormControl className={styles.formControl}>
                    <TextField
                      className={styles.text}
                      value={pageState.inputForm.recordText}
                      onChange={onChangeInputForm('recordText')}
                      label="Record"
                    />
                  </FormControl>
                  <div className={styles.btnWrapper}>
                    <Button
                      onClick={onCreateRecord}
                      variant="contained"
                      color="primary"
                      disabled={!pageState.inputForm.recordText || !pageState.inputForm.recordText}
                    >
                      <Icon>save</Icon>
                      Save
                    </Button>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          {showableCategories.map((category, i) => (
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
                  <div className={styles.detail}>
                    <List component="div" className={styles.list}>
                      {props.records.filter(by('category')(category.id)).map((v, index) => (
                        <React.Fragment key={index}>
                          <ListItem className={styles.listItem}>
                            {v.id !== pageState.editForm.recordId || !pageState.isEditForm ? (
                              <React.Fragment>
                                <ListItemText
                                  className={styles.record}
                                  onClick={onSelectModifyRecord(v.id)}
                                  primary={`${index + 1}. ${v.record}`}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    onClick={onConfirmDelete(props.records)(v.id)}
                                    edge="end"
                                    aria-label="comments"
                                  >
                                    <Icon color="secondary">delete</Icon>
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </React.Fragment>
                            ) : (
                              <TextField
                                className={styles.record}
                                value={pageState.editForm.recordText}
                                onChange={onChangeEditForm('recordText')}
                                autoFocus={true}
                                onBlur={onBlurModifyRecord}
                                variant="outlined"
                                label="Edit Record"
                              />
                            )}
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                      <ListItem className={styles.listItem}>
                        <TextField
                          className={styles.text}
                          fullWidth={true}
                          value={
                            category.id === pageState.editForm.categoryId &&
                            !!pageState.isEditForm &&
                            !pageState.editForm.recordId
                              ? pageState.editForm.recordText
                              : ''
                          }
                          onChange={onChangeEditForm('recordText')}
                          onFocus={onFocusRecord(category.id)}
                          onBlur={onBlurRecord}
                          label="New Record"
                        />
                      </ListItem>
                    </List>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default RecordPage;
