import React, { useState } from 'react';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../dialogs/BaseDialog/BaseDialog';
import { voidFunc, createButtonProps } from '../../../helpers/components/dialog';
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

  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttons={buttons} title={mode}/>
    </div>
  );
};

export default RecordCategoryDialog;
