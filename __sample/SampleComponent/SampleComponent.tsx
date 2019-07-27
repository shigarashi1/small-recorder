import React from 'react';

import styles from './SampleComponent.module.scss';

interface IProps {
  title: string;
}

const SampleComponent: React.FC<IProps> = (props: IProps) => {
  return <div id={styles.container}>{props.title}</div>;
};

export default SampleComponent;
