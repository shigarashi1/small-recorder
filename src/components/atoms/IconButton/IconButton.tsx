import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import styles from './IconButton.module.scss';

import { PropTypes } from '@material-ui/core';

interface IProps {
  icon: string;
  onClick: () => void;
  variant?: 'round' | 'extended';
  size?: 'small' | 'medium' | 'large';
  color?: PropTypes.Color;
}

const IconButton: React.FC<IProps> = (props: IProps) => {
  const { icon, onClick, variant, size, color } = props;
  return (
    <Fab id={styles.root} onClick={onClick} variant={variant} size={size} color={color}>
      <Icon>{icon}</Icon>
    </Fab>
  );
};

export default IconButton;
