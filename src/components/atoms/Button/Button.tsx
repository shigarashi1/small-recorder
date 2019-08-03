import React from 'react';
import { PropTypes } from '@material-ui/core';
import MButton from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import styles from './Button.module.scss';
import { Nullable } from '../../../types';

type TIconType = 'right' | 'left' | 'none';

export interface IProps {
  label: Nullable<string>;
  onClick: () => void;
  iconType?: TIconType;
  icon?: Nullable<string>;
  disabled?: boolean;
  color?: PropTypes.Color;
  isFullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  autoFocus?: boolean;
}

const Button: React.FC<IProps> = (props: IProps) => {
  const { label, onClick, iconType, icon, disabled, color, isFullWidth, size, variant, autoFocus } = props;
  return (
    <div id={styles.container}>
      <MButton
        className={styles.container}
        onClick={onClick}
        disabled={disabled}
        color={color}
        fullWidth={isFullWidth}
        size={size}
        variant={variant}
        autoFocus={autoFocus}
      >
        {renderIcon('left')}
        {label}
        {renderIcon('right')}
      </MButton>
    </div>
  );

  function renderIcon(iconPosition: TIconType) {
    if (iconPosition !== iconType) {
      return null;
    }
    return <Icon>{icon}</Icon>;
  }
};

Button.defaultProps = {
  iconType: 'none',
  icon: '',
  disabled: false,
  color: 'default',
  isFullWidth: false,
  size: 'medium',
  variant: 'contained',
  autoFocus: false,
};

export default Button;
