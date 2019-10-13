import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

interface IProps {
  hasOpen: boolean;
  onClose: () => void;
  title: string;
  context: string;
}

const InformationDialog: React.FC<IProps> = (props: IProps) => {
  const { hasOpen, onClose, title, context } = props;

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog hasOpen={hasOpen} onClose={onClose} buttonChildren={buttonChildren} title={title}>
        <p>{context}</p>
      </BaseDialog>
    </div>
  );
};

export default InformationDialog;
