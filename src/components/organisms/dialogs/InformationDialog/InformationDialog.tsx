import React from 'react';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { voidFunc, createButtonProps } from '../../../../helpers/components/dialog';

interface IProps {
  hasOpen: boolean;
  onClose: () => void;
  title: string;
  context: string;
}

const InformationDialog: React.FC<IProps> = (props: IProps) => {
  const { hasOpen, onClose, title, context } = props;
  const buttons = {
    right: createButtonProps('Close', voidFunc),
  };
  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttons={buttons} title={title}>
        <p>{context}</p>
      </BaseDialog>
    </div>
  );
};

export default InformationDialog;
