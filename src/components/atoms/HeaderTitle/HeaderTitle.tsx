import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './HeaderTitle.module.scss';

interface IProps {
  title: string;
}

const HeaderTitle: React.FC<IProps> = (props: IProps) => {
  return (
    <Typography id={styles.container} variant="h6" color="inherit">
      {props.title}
    </Typography>
  );
};

export default HeaderTitle;
