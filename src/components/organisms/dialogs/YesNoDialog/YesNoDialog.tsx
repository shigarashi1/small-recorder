import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import styles from './YesNoDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

import { TYesNoDialogProps } from '../../../../containers/components/dialogs/YesNoDialog';

type TProps = TYesNoDialogProps;

const YesNoDialog: React.FC<TProps> = (props: TProps) => {
  const [state, setState] = useState(props);
  useEffect(() => {
    setState(props);
  }, [props]);

  const { hasOpen, onClose, title, context } = state;

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
        <p>{context}</p>
      </BaseDialog>
    </div>
  );
};

export default YesNoDialog;
