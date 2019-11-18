import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './CategoryDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

import { TCategoryDialogProps } from '../../../../containers/components/dialogs/CategoryDialog';
import { TCategoryDialog } from '../../../../store-observable/utilities/dialogs/category/action-reducers';

type TProps = TCategoryDialogProps;

const CategoryDialog: React.FC<TProps> = ({ hasOpen, id, name, create, update, setState, close }) => {
  const isEdit = !!id;
  const label = isEdit ? 'Edit' : 'Create';

  const onClose = () => {
    close();
  };

  const onAction = () => {
    if (isEdit) {
      update();
    } else {
      create();
    }
  };

  const onChangeValue = (key: keyof TCategoryDialog) => (e: React.ChangeEvent<any>) => {
    setState({ key, value: e.target.value || '' });
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onAction} disabled={!name}>
        {label}
      </Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title={`${label} Category`}
        areaLabeledby="dialog-category"
        buttonChildren={buttonChildren}
      >
        <TextField
          className={styles.text}
          label="Category Name"
          placeholder="Please Input Category"
          value={name}
          onChange={onChangeValue('name')}
        />
      </BaseDialog>
    </div>
  );
};

export default CategoryDialog;
