import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './BaseDialog.module.scss';

import Button, { IProps as IButtonProps } from '../../../atoms/Button/Button';

interface IProps {
  hasOpen: boolean;
  onClose: () => void;
  title?: string;
  buttons: {
    left?: IButtonProps;
    center?: IButtonProps;
    right: IButtonProps;
  };
}

const BaseDialog: React.FC<IProps> = props => {
  const { hasOpen, onClose, title, children } = props;

  return (
    <Dialog
      id={styles.dialog}
      open={hasOpen}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog"
    >
      {renderTitle()}
      <DialogContent className={styles.content}>{renderContent()}</DialogContent>
      <DialogActions className={styles.actions}>{renderActions()}</DialogActions>
    </Dialog>
  );

  function renderTitle() {
    if (!title) {
      return null;
    }
    return <DialogTitle id="dialog-title">{title}</DialogTitle>;
  }

  function renderContent() {
    if (!children) {
      return null;
    }
    return children;
  }

  function renderActions() {
    const { left, center, right } = props.buttons;
    const buttons = [left, center, right];
    const isRight = (i: number): boolean => i === buttons.length - 1;
    return buttons.map((v, i) => renderButton(i, isRight(i), v));
  }

  function renderButton(key: number, isRight: boolean, buttonProps?: IButtonProps) {
    if (!buttonProps) {
      return null;
    }
    const onClick = () => {
      buttonProps.onClick();
      onClose();
    };

    return (
      <div className={styles.buttonWrapper} key={key}>
        <Button {...buttonProps} onClick={onClick} autoFocus={isRight} />
      </div>
    );
  }
};

export default BaseDialog;
