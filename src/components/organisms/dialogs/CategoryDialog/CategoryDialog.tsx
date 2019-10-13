import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TCategory } from '../../../../types/firebase';
import Logger from '../../../../helpers/generals/logger';

interface IProps {
  hasOpen: boolean;
  category: TCategory;
  onClose: () => void;
  onAction: () => void;
  mode: 'create' | 'update';
}

const CategoryDialog: React.FC<IProps> = (props: IProps) => {
  const [category, setCategory] = useState(props.category.name);
  const { hasOpen, onClose, mode } = props;

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setCategory(value);
  };

  const onAction = () => {
    Logger().log(category, props.category.name);
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onAction}>{mode}</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title={mode}
        areaLabeledby="dialog-category"
        buttonChildren={buttonChildren}
      >
        <TextField className={styles.text} label="category name" value={category} onChange={onChangeValue} />
      </BaseDialog>
    </div>
  );
};

export default CategoryDialog;
