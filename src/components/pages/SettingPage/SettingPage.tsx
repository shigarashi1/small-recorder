import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//
import styles from './SettingPage.module.scss';
//
import SettingTable from '../../organisms/SettingTable/SettingTable';
import TargetDialog from '../../organisms/dialogs/TargetDialog/TargetDialog';
//
import { TPageProps } from '../../../containers/pages/SettingPage';
import { TTarget } from '../../../types/firebase';
import { Nullable, TMode, Mode, ESettingTableTab } from '../../../types';
import { by } from '../../../helpers/generals';

const LABELS = ['Record Category', 'Record Target'];

type TProps = TPageProps;

const SettingPage: React.FC<TProps> = (props: TProps) => {
  const [tabIndex, setTabIndex] = useState(ESettingTableTab.category);
  // dialogs
  const [hasOpenedTarget, setHasOpenedTarget] = useState(false);
  // checkbox
  const [canShowDeleted, setCanShowDeleted] = useState(false);
  // filteredData
  const [selectedTarget, setSelectedTarget] = useState<Nullable<TTarget>>(null);

  const onCloseTargetDialog = () => {
    setHasOpenedTarget(false);
  };

  const onCloseYesNoDialog = () => {
    props.onCloseYesNoDialog();
  };

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (tabIndex !== newValue) {
      setTabIndex(newValue);
    }
  };

  const onShowCreateMode = () => {
    if (tabIndex === ESettingTableTab.category) {
      props.showCategoryDialog();
    } else {
      setSelectedTarget(null);
      setHasOpenedTarget(true);
    }
  };

  const getYesNoDialogData = (id: string) => {
    if (tabIndex === ESettingTableTab.category) {
      const { name } = props.categories.find(by('id')(id)) || { name: '' };
      return {
        hasOpen: true,
        title: 'confirmation',
        context: `${name}を削除しますか`,
        onYes: () => {
          props.deleteCategory({ id });
        },
        onNo: onCloseYesNoDialog,
        onClose: onCloseYesNoDialog,
      };
    } else {
      const { term, count } = props.targets.find(by('id')(id)) || { term: '', count: '' };
      return {
        hasOpen: true,
        title: 'confirmation',
        context: `${term} ${count}を削除しますか`,
        onYes: () => {
          props.deleteTarget({ id });
        },
        onNo: onCloseYesNoDialog,
        onClose: onCloseYesNoDialog,
      };
    }
  };

  const onActionTable = (mode: TMode, id: string) => {
    if (mode === Mode.edit) {
      if (tabIndex === ESettingTableTab.category) {
        props.showCategoryDialog(id);
      } else {
        const target = props.targets.find(v => v.id === id) || null;
        setSelectedTarget(target);
        setHasOpenedTarget(true);
      }
    } else {
      const data = getYesNoDialogData(id);
      props.onShowYesNoDialog(data);
    }
  };

  const onActionTarget = (v: TTarget) => {
    const { id, count, category, term } = v;
    if (id) {
      props.updateTarget({ id, data: { count, category, term } });
    } else {
      props.createTarget({ count, category, term });
    }
  };

  const onChangeCanShowDeleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanShowDeleted(!canShowDeleted);
  };

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
            <FormControlLabel
              control={<Checkbox checked={canShowDeleted} onChange={onChangeCanShowDeleted} value="canShowDeleted" />}
              label="Show deleted categories"
            />
            <Button onClick={onShowCreateMode} color="primary" variant="contained">
              create
            </Button>
          </div>
          <div className={styles.table}>
            <SettingTable {...props} tab={tabIndex} canShowDeleted={canShowDeleted} onAction={onActionTable} />
          </div>
        </div>
      </div>
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
