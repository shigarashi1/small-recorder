import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import styles from './SnackStacker.module.scss';

import { TSnackStackerProps } from '../../../containers/components/SnackStacker';

type TProps = TSnackStackerProps;

const SnackStacker: React.FC<TProps> = (props: TProps) => {
  const [errors, setErrors] = useState(props.errors);
  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const onClose = (v: number) => () => {
    props.onClearSnack(v);
  };

  const hasOpen = (id: number): boolean => {
    return errors.map(v => v.id).includes(id);
  };

  // FIXME: 複数表示できないのね。。。
  return (
    <div className={styles.container}>
      {errors.map((err, i) => (
        <Snackbar
          key={i}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={hasOpen(err.id)}
          autoHideDuration={3000}
          onClose={onClose(err.id)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{`${err.error.code} ${err.error.message}`}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={onClose(err.id)}>
              OK
            </Button>,
            <IconButton key="close" aria-label="close" color="secondary" onClick={onClose(err.id)}>
              <Icon>close</Icon>
            </IconButton>,
          ]}
        />
      ))}
    </div>
  );
};

export default SnackStacker;
