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
import { pickKeysObject } from '../../../helpers/conv-object';
import { TTarget, TCategory } from '../../../types/firebase';
import { Nullable, TMode, Mode } from '../../../types';
import TargetDialog from '../../organisms/dialogs/TargetDialog/TargetDialog';
import Logger from '../../../helpers/generals/logger';

enum ETab {
  category,
  target,
}

const LABELS = ['Record Category', 'Record Target'];

const getRows = (tabIndex: number, data: { categories: TCategory[]; targets: TTarget[] }): any[] => {
  const categories = data.categories
    .filter(v => !v.hasDeleted) // TODO:論理削除もあとで表示できるようにする
    .map((v, i) => ({
      _docId: v.id,
      id: i + 1,
      ...pickKeysObject(v, ['name']),
    }));
  const targets = data.targets.map((v, i) => ({
    _docId: v.id,
    id: i + 1,
    ...pickKeysObject(v, ['category', 'count', 'term']),
    category: (data.categories.find(vv => vv.id === v.category) || { name: '' }).name,
  }));
  return tabIndex === 0 ? categories : targets;
};

const getYesNoDialogData = (context: string, onYes: () => void, onNo: () => void, onClose: () => void) => ({
  hasOpen: true,
  title: '確認',
  context,
  onYes,
  onNo,
  onClose,
});

type TProps = TPageProps;

const SettingPage: React.FC<TProps> = (props: TProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  // Category
  const [hasOpenedCategory, setHasOpenedCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Nullable<TCategory>>(null);
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
    if (tabIndex === ETab.category) {
      setSelectedCategory(null);
      setHasOpenedCategory(true);
    } else {
      setSelectedTarget(null);
      setHasOpenedTarget(true);
    }
  };

  const onActionTable = (mode: TMode, id: string) => {
    if (mode === Mode.edit) {
      if (tabIndex === ETab.category) {
        const category = props.categories.find(v => v.id === id) || null;
        setSelectedCategory(category);
        setHasOpenedCategory(true);
      } else {
        const target = props.targets.find(v => v.id === id) || null;
        setSelectedTarget(target);
        setHasOpenedTarget(true);
      }
    } else {
      if (tabIndex === ETab.category) {
        Logger.log('delete', id);
        const { name } = props.categories.find(v => v.id === id) || { name: '' };
        const onDelete = () => {
          props.deleteCategory({ id });
        };
        const onClose = () => {
          props.onCloseYesNoDialog();
        };
        const data = getYesNoDialogData(`${name}を削除しますか？`, onDelete, onClose, onClose);
        props.onShowYesNoDialog(data);
      } else {
        Logger.log('delete', id);
      }
    }
  };

  const onActionCategory = (v: TCategory) => {
    if (v.id !== null && v.id !== '') {
      props.updateCategory({ id: String(v.id), name: v.name });
    } else {
      props.createCategory({ name: v.name });
    }
  };

  const onActionTarget = (v: TTarget) => {
    const { id, count, category, term } = v;
    if (id !== null && id !== '') {
      props.updateTarget({ id, data: { count, category, term } });
    } else {
      props.createTarget({ count, category, term });
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
            <SettingTable rows={rows} onAction={onActionTable} />
          </div>
        </div>
      </div>
      <CategoryDialog
        hasOpen={hasOpenedCategory}
        onClose={onCloseCategoryDialog}
        onAction={onActionCategory}
        category={selectedCategory}
      />
      <TargetDialog
        hasOpen={hasOpenedTarget}
        onClose={onCloseTargetDialog}
        categories={props.categories}
        target={selectedTarget}
        onAction={onActionTarget}
      />
    </React.Fragment>
  );
};

export default SettingPage;
