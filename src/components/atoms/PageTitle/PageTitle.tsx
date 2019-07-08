import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './PageTitle.module.scss';

interface IProps {
  title: string;
}

const PageTitle: React.FC<IProps> = (props: IProps) => {
  return (
    <Typography id={styles.container} variant="h4" color="inherit">
      {props.title}
    </Typography>
  );
};

export default PageTitle;
