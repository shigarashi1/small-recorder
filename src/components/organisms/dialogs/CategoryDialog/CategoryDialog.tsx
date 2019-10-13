import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './CategoryDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TCategory } from '../../../../types/firebase';
import { Nullable } from '../../../../types';

interface IProps {
  hasOpen: boolean;
  category: Nullable<TCategory>;
  onClose: () => void;
  onAction: (v: TCategory) => void;
}

const getCategory = (v: Nullable<TCategory>) => v || ({ id: '', name: '' } as TCategory);

const CategoryDialog: React.FC<IProps> = (props: IProps) => {
  const [category, setCategory] = useState(getCategory(props.category));
  const { hasOpen, onClose } = props;

  useEffect(() => {
    setCategory(getCategory(props.category));
  }, [props.category]);

  const onChangeValue = (key: keyof TCategory) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setCategory({ ...category, [key]: value });
  };

  const onAction = () => {
    props.onAction(category);
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onAction}>{category.id !== '' ? 'edit' : 'create'}</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title={category.id !== '' ? 'edit' : 'create'}
        areaLabeledby="dialog-category"
        buttonChildren={buttonChildren}
      >
        <TextField
          className={styles.text}
          label="category name"
          value={category.name}
          onChange={onChangeValue('name')}
        />
      </BaseDialog>
    </div>
  );
};

export default CategoryDialog;
