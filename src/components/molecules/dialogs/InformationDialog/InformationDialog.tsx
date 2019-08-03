import React from 'react';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { voidFunc } from '../../../../helpers/components/dialog';

interface IProps {
  hasOpen: boolean;
  onClose: () => void;
  title: string;
  information: string;
}

const InformationDialog: React.FC<IProps> = (props: IProps) => {
  const { hasOpen, onClose, title, information } = props;
  const buttons = {
    right: {
      label: '閉じる',
      onClick: voidFunc(),
    },
  };
  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttons={buttons} title={title}>
        <p>{information}</p>
      </BaseDialog>
    </div>
  );
};

export default InformationDialog;
