import React from 'react';

import styles from './OkCancelDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { createButtonProps } from '../../../../helpers/components/dialog';

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
    left: createButtonProps('キャンセル', onCancel),
    right: createButtonProps('OK', onOk, 'primary'),
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
