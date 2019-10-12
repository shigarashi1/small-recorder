import React from 'react';

import styles from './RecordCategoryForm.module.scss';

interface IProps {
  category: string;
}

const RecordCategoryForm: React.FC<IProps> = (props: IProps) => {
  const { category } = props;

  return (
    <div id={styles.container}>
      <div className={styles.formGroup}>
        <div className={styles.username}>
          {category}
          {/* <TextField label="Username" value={category} onChange={onChange} /> */}
        </div>
      </div>
    </div>
  );
};

export default RecordCategoryForm;
