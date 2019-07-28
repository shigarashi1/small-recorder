import React from 'react';

import cssStyles from './Label.module.scss';
import { Nullable } from '../../../types';

interface IProps {
  label?: Nullable<string>;
  styles?: string[];
}

const Label: React.FC<IProps> = (props: IProps) => {
  const { label, styles } = props;
  return (
    <div className={getStyles(styles)}>
      <p>{label}</p>
    </div>
  );

  function getStyles(values: string[] = []) {
    const classes = [cssStyles.base];
    if (values.find(v => v === 'textField')) {
      classes.push(cssStyles.textField);
    }
    return classes.join(' ');
  }
};

Label.defaultProps = {
  label: null,
};

export default Label;
