import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '../../atoms/Button/Button';
//
import styles from './SettingPage.module.scss';
//
import SettingTable from '../../organisms/SettingTable/SettingTable';
//
import { TPageProps } from '../../../containers/pages/SettingPage';
import Logger from '../../../helpers/generals/logger';
import { toPickKeysObject } from '../../../helpers/conv-object';
import { TTarget, TCategory } from '../../../types/firebase';

const LABELS = ['Record Category', 'Record Target'];

const getRows = (tabIndex: number, data: { categories: TCategory[]; targets: TTarget[] }): any[] => {
  const categories = data.categories.map((v, i) => ({
    _docId: v.id,
    id: i + 1,
    ...toPickKeysObject(v, ['name', 'hasDeleted']),
  }));
  const targets = data.targets.map((v, i) => ({
    _docId: v.id,
    id: i + 1,
    ...toPickKeysObject(v, ['category', 'count', 'term']),
  }));
  return tabIndex === 0 ? categories : targets;
};

type TProps = TPageProps;

const SettingPage: React.FC<TProps> = (props: TProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (tabIndex === newValue) {
      return;
    }
    setTabIndex(newValue);
  };

  const onCreate = () => {
    Logger().log('');
  };

  const rows = getRows(tabIndex, { categories: props.categories, targets: props.targets });
  return (
    <div id={styles.root}>
      <div className={styles.title}>
        <Typography variant="h4" color="inherit">
          SettingPage
        </Typography>
      </div>
      <div className={styles.tab}>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={onChangeTab}>
            {LABELS.map((v, i) => (
              <Tab key={i} label={v} />
            ))}
          </Tabs>
        </AppBar>
      </div>
      <div className={styles.contents}>
        <div className={styles.btnWrapper}>
          <Button label="create new" onClick={onCreate} color="primary" />
        </div>
        <div className={styles.table}>
          <SettingTable rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
