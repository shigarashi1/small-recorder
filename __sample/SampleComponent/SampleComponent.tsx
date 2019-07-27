import React from 'react';

import styles from './SampleComponent.module.scss';

interface IProps {
  title: string;
}

const SampleComponent: React.FC<IProps> = (props: IProps) => {
  return (
    <div id={styles.container}>
      <p>{props.title}</p>
    </div>
  );
};

export default SampleComponent;
