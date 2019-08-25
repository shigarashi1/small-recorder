import React from 'react';

import styles from './RecordCategoryForm.module.scss';
import TextField from '../../atoms/TextField/TextField';
import { onChangedValue } from '../../../helpers/components/text-field';

interface IProps {
  category: string;
  onChange: ReturnType<typeof onChangedValue>;
}

const RecordCategoryForm: React.FC<IProps> = (props: IProps) => {
  const { category, onChange } = props;

  return (
    <div id={styles.container}>
      <div className={styles.formGroup}>
        <div className={styles.username}>
          <TextField label="Username" value={category} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default RecordCategoryForm;
