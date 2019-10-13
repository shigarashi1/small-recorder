import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './OkCancelDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

interface IProps {
  hasOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onOk: () => void;
  onCancel: () => void;
}

const OkCancelDialog: React.FC<IProps> = (props: IProps) => {
  const { hasOpen, onClose, title, content } = props;

  const onOk = () => {
    props.onOk();
    props.onClose();
  };

  const onCancel = () => {
    props.onCancel();
    props.onClose();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onOk}>OK</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        buttonChildren={buttonChildren}
        title={title}
        areaLabeledby="dialog-ok-cancel"
      >
        <p>{content}</p>
      </BaseDialog>
    </div>
  );
};

export default OkCancelDialog;
