import React, { useState } from 'react';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../../molecules/dialogs/BaseDialog/BaseDialog';
import { voidFunc, createButtonProps } from '../../../helpers/components/dialog';
import RecordCategoryForm from '../../molecules/RecordCategoryForm/RecordCategoryForm';
import { onChangedValue } from '../../../helpers/components/text-field';
import { TCategory } from '../../../types/firebase';

interface IProps {
  hasOpen: boolean;
  category: TCategory;
  onClose: () => void;
  onAction: () => void;
  mode: 'create' | 'update';
}

const RecordCategoryDialog: React.FC<IProps> = (props: IProps) => {
  const [category, setCategory] = useState(props.category.name);
  const { hasOpen, onClose, onAction, mode } = props;

  const buttons = {
    left: createButtonProps('cancel', voidFunc),
    right: createButtonProps(mode, onAction),
  };

  const setCategoryName = (v: string) => {
    setCategory(v);
  };

  const onChangeCategoryName = onChangedValue(category, setCategoryName);

  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttons={buttons} title={mode}>
        <RecordCategoryForm category={category} onChange={onChangeCategoryName} />
      </BaseDialog>
    </div>
  );
};

export default RecordCategoryDialog;
