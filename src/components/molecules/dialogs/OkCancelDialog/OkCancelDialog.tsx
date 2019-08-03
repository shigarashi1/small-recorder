import React from 'react';

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
  const { hasOpen, onClose, title, content, onOk, onCancel } = props;
  const buttons = {
    left: {
      label: 'キャンセル',
      onClick: onCancel,
    },
    right: {
      label: 'OK',
      onClick: onOk,
    },
  };

  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttons={buttons} title={title}>
        <p>{content}</p>
      </BaseDialog>
    </div>
  );
};

export default OkCancelDialog;
