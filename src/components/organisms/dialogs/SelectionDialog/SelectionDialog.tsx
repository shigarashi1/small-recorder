import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './SelectionDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

interface IProps {
  hasOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onYes: () => void;
  onNo: () => void;
}

const SelectionDialog: React.FC<IProps> = (props: IProps) => {
  const { hasOpen, onClose, title, content } = props;

  const onYes = () => {
    props.onYes();
    props.onClose();
  };

  const onNo = () => {
    props.onNo();
    props.onClose();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onNo}>No</Button>
      <Button onClick={onYes}>Yes</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        buttonChildren={buttonChildren}
        title={title}
        areaLabeledby="dialog-selection"
      >
        <p>{content}</p>
      </BaseDialog>
    </div>
  );
};

export default SelectionDialog;
