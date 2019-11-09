import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import styles from './TargetDialog.module.scss';

import BaseDialog from '../BaseDialog/BaseDialog';
import { TTarget, TCategory } from '../../../../types/firebase';
import { Nullable } from '../../../../types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

interface IProps {
  hasOpen: boolean;
  categories: TCategory[];
  target: Nullable<TTarget>;
  onClose: () => void;
  onAction: (v: TTarget) => void;
}

const getTitle = (id: Nullable<string>) => (!!id ? 'Edit' : 'Create');

const getTarget = (v: Nullable<TTarget>) => v || ({ id: '', count: 0, term: 'day', category: '' } as TTarget);

const TargetDialog: React.FC<IProps> = (props: IProps) => {
  const [target, setTarget] = useState(getTarget(props.target));
  const { hasOpen, onClose } = props;

  useEffect(() => {
    setTarget(getTarget(props.target));
  }, [props.target]);

  const onChangeValue = (key: keyof TTarget) => (e: React.ChangeEvent<any>) => {
    const value = e.target.value || '';
    setTarget({ ...target, [key]: value });
  };

  // FIXME: onChangeValueに統合
  const onChangeNumber = (key: keyof TTarget) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value || 0;
    setTarget({ ...target, [key]: value });
  };

  const onAction = () => {
    props.onAction(target);
    onClose();
  };

  const buttonChildren = (
    <div className={styles.btnWrapper}>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onAction}>{getTitle(target.id)}</Button>
    </div>
  );

  return (
    <div id={styles.container}>
      <BaseDialog
        hasOpen={hasOpen}
        onClose={onClose}
        title={`${getTitle(target.id)} Target`}
        areaLabeledby="dialog-target"
        buttonChildren={buttonChildren}
      >
        <div id={styles.contents}>
          {/* category */}
          <FormControl className={styles.formControl}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={target.category}
              onChange={onChangeValue('category')}
              inputProps={{
                name: 'Category',
                id: 'category',
              }}
            >
              {props.categories.map((v, i) => (
                <MenuItem key={i} value={String(v.id)}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* count */}
          <FormControl className={styles.formControl}>
            <TextField className={styles.text} value={target.count} onChange={onChangeNumber('count')} label="Count" />
          </FormControl>
          {/* term */}
          <FormControl className={styles.formControl}>
            <InputLabel htmlFor="term">Term</InputLabel>
            <Select
              value={target.term}
              onChange={onChangeValue('term')}
              inputProps={{
                name: 'Term',
                id: 'term',
              }}
            >
              {['day', 'week', 'month'].map((v, i) => (
                <MenuItem key={i} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </BaseDialog>
    </div>
  );
};

export default TargetDialog;
