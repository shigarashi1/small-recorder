import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './SampleComponent.module.scss';

interface IProps {
  title: string;
}

const SampleComponent: React.FC<IProps> = (props: IProps) => {
  return (
    <Typography id={styles.container} variant="h4" color="inherit">
      {props.title}
    </Typography>
  );
};

export default SampleComponent;
