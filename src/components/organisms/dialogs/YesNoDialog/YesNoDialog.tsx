import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './YesNoDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

import { TYesNoDialogProps } from '../../../../containers/components/dialogs/YesNoDialog';

type TProps = TYesNoDialogProps;

const YesNoDialog: React.FC<TProps> = ({ hasOpen, title, context, onCloseYesNoDialog, onYes, onNo }) => {
  const onClose = () => {
    onCloseYesNoDialog();
  };

  const onSelectYes = () => {
    onYes();
    onClose();
  };

  const onSelectNo = () => {
    onNo();
    onClose();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onSelectNo}>No</Button>
      <Button onClick={onSelectYes}>Yes</Button>
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
        <p>{context}</p>
      </BaseDialog>
    </div>
  );
};

export default YesNoDialog;
