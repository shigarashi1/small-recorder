import React from 'react';
//
import styles from './SearchTable.module.scss';
//
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//
import { TRecord, TTarget, TCategory } from '../../../types/firebase';
import { toDisplayDate } from '../../../helpers/generals';
import { findDocObj } from '../../../helpers/firebase';
import { INITIAL_CATEGORY } from '../../../lookups/initial-object';

type TProps = {
  categories: TCategory[];
  targets: TTarget[];
  records: TRecord[];
};

const HEADERS = ['No.', 'Date', 'Category', 'Record'];
const getData = (categories: TCategory[]) => (record: TRecord, rowIndex: number) => [
  rowIndex + 1,
  toDisplayDate(record.date),
  findDocObj(categories, INITIAL_CATEGORY)(record.category).name,
  record.record,
];

const SearchTable: React.FC<TProps> = props => {
  return (
    <div id={styles.container}>
      <Paper className={styles.paper}>
        <Table className={styles.table} size="small">
          <TableHead>
            <TableRow>
              {HEADERS.map((v, i) => (
                <TableCell key={i} align={v === 'No.' ? 'right' : 'left'}>
                  {v}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.records.map(getData(props.categories)).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, i) => (
                  <TableCell key={i} align={typeof cell === 'number' ? 'right' : 'left'}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default SearchTable;
