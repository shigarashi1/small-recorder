import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './SettingTable.module.scss';
import { TMode, Mode, ESettingTableTab } from '../../../types';
import { TCategory, TTarget, TDocIdOrObject } from '../../../types/firebase';
import { by } from '../../../helpers/generals';
import { getDocId } from '../../../helpers/firebase';

type TProps = {
  categories: TCategory[];
  targets: TTarget[];
  tab: ESettingTableTab;
  canShowDeleted: boolean;
  onAction: (mode: TMode, id: string) => void;
};

type TRow = {
  docId: string;
  cells: string[];
};

const findCategory = (categories: TCategory[]) => (id: TDocIdOrObject<TCategory>) =>
  categories.find(by('id')(getDocId(id))) || { name: '', hasDeleted: true };

const getTableData = (data: Omit<TProps, 'onAction'>): { headers: string[]; rows: TRow[] } => {
  const { tab, categories, targets, canShowDeleted } = data;
  if (tab === ESettingTableTab.category) {
    const rows = categories
      .filter(v => canShowDeleted || !v.hasDeleted)
      .map((v, i) => {
        const cells = [String(i + 1), v.name];
        return {
          docId: String(v.id),
          cells: canShowDeleted ? [...cells, v.hasDeleted ? '済' : ''] : cells,
        };
      });
    const headers = ['No.', 'カテゴリ名'];
    return { rows, headers: canShowDeleted ? [...headers, '削除済'] : headers };
  }
  if (tab === ESettingTableTab.target) {
    const getCategory = findCategory(categories);
    const rows = targets
      .filter(v => canShowDeleted || !getCategory(v.category).hasDeleted)
      .map((v, i) => ({
        docId: String(v.id),
        cells: [String(i + 1), getCategory(v.category).name, v.term, String(v.count)],
      }));
    const headers = ['No.', 'カテゴリ名', '期間', '目標回数'];
    return { rows, headers };
  }
  return { headers: [], rows: [] };
};

const SettingTable: React.FC<TProps> = (props: TProps) => {
  const { headers, rows } = getTableData({ ...props });

  const onAction = (mode: TMode, docId: string) => () => {
    props.onAction(mode, docId);
  };

  return (
    <div id={styles.container}>
      <Paper className={styles.paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <TableCell key={i}>{header}</TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
                <TableCell className={styles.actionCell}>
                  <Fab onClick={onAction(Mode.edit, row.docId)} size="small" color="primary">
                    <Icon>edit</Icon>
                  </Fab>
                  <Fab onClick={onAction(Mode.delete, row.docId)} size="small" color="secondary">
                    <Icon>delete</Icon>
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default SettingTable;
