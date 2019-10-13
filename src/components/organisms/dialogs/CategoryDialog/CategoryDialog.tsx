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

const getLabel = (id: Nullable<string>) => (id !== null && id !== '' ? 'Edit' : 'Create');

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
    onClose();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onAction}>{getLabel(category.id)}</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title={`${getLabel(category.id)} Category`}
        areaLabeledby="dialog-category"
        buttonChildren={buttonChildren}
      >
        <TextField
          className={styles.text}
          label="Category Name"
          value={category.name}
          onChange={onChangeValue('name')}
        />
      </BaseDialog>
    </div>
  );
};

export default CategoryDialog;
