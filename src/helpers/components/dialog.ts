import { IProps as IButtonProps } from '../../components/atoms/Button/Button';
import { PropTypes } from '@material-ui/core';

export function voidFunc() {
  return () => {
    // Logger.log('void func called');
  };
}

export function createButtonProps(label: string, action: () => void, color?: PropTypes.Color): IButtonProps {
  return {
    label,
    onClick: action,
    color,
  };
}
