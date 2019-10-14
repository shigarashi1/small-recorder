import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import styles from './ErrorDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';

import { TErrorDialogProps } from '../../../../containers/components/dialogs/ErrorDialog';
import { IError } from '../../../../types/error';

type TProps = TErrorDialogProps;

const ErrorDialog: React.FC<TProps> = (props: TProps) => {
  const [errors, setError] = useState<IError[]>(props.errors);

  useEffect(() => {
    setError(props.errors);
  }, [props.errors]);

  const onClose = () => {
    props.onClearError();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
    </div>
  );

  const hasOpen = errors.length > 0;

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title="システムエラーが発生しました"
        areaLabeledby="dialog-error"
        buttonChildren={buttonChildren}
      >
        {errors.map((err, i) => (
          <p key={i}>
            {err.code}: {err.message}
          </p>
        ))}
      </BaseDialog>
    </div>
  );
};

export default ErrorDialog;
