import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './InformationDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TInfoDialogProps } from '../../../../containers/components/dialogs/InfoDialog';

type TProps = TInfoDialogProps;

const InformationDialog: React.FC<TProps> = ({ hasOpen, title, context, onCloseInfoDialog }) => {
  const onClose = () => {
    onCloseInfoDialog();
  };

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
