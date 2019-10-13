import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
//
import styles from './SettingPage.module.scss';
//
import CategoryDialog from '../../organisms/dialogs/CategoryDialog/CategoryDialog';
import SettingTable from '../../organisms/SettingTable/SettingTable';
//
import { TPageProps } from '../../../containers/pages/SettingPage';
import { toPickKeysObject } from '../../../helpers/conv-object';
import { TTarget, TCategory } from '../../../types/firebase';
import { Nullable, TMode, Mode } from '../../../types';

enum ETabIndex {
  category,
  target,
}

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
  // Category
  const [hasOpenedCategory, setHasOpenedCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Nullable<TCategory>>(null);
  // Target
  const [hasOpenedTarget, setHasOpenedTarget] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Nullable<TTarget>>(null);

  const onCloseCategoryDialog = () => {
    setHasOpenedCategory(false);
  };

  const onCloseTargetDialog = () => {
    setHasOpenedTarget(false);
  };

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (tabIndex === newValue) {
      return;
    } else {
      setTabIndex(newValue);
    }
  };

  const onShowCreateMode = () => {
    if (tabIndex === ETabIndex.category) {
      setSelectedCategory(null);
      setHasOpenedCategory(true);
    } else {
      setSelectedTarget(null);
      setHasOpenedTarget(true);
    }
  };

  const onShowEditMode = (mode: TMode, id?: string) => {
    if (mode === Mode.edit) {
      if (tabIndex === 0) {
        const category = props.categories.find(v => v.id === id) || null;
        setSelectedCategory(category);
        setHasOpenedCategory(true);
      } else {
        const target = props.targets.find(v => v.id === id) || null;
        setSelectedTarget(target);
        setHasOpenedTarget(true);
      }
    }
  };

  const onActionCategory = (v: TCategory) => {
    if (v.id !== '') {
      props.updateCategory({ id: String(v.id), name: v.name });
    } else {
      props.createCategory({ name: v.name });
    }
  };

  const rows = getRows(tabIndex, { categories: props.categories, targets: props.targets });
  return (
    <React.Fragment>
      <div id={styles.root}>
        <div className={styles.title}>
          <Typography variant="h4" color="inherit">
            Setting Page
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
            <Button onClick={onShowCreateMode} color="primary" variant="contained">
              create
            </Button>
          </div>
          <div className={styles.table}>
            <SettingTable rows={rows} onAction={onShowEditMode} />
          </div>
        </div>
      </div>
      <CategoryDialog
        hasOpen={hasOpenedCategory}
        onClose={onCloseCategoryDialog}
        onAction={onActionCategory}
        category={selectedCategory}
      />
    </React.Fragment>
  );
};

export default SettingPage;
