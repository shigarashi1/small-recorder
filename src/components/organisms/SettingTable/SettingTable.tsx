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

interface IProps {
  rows: any[];
}

const SettingTable: React.FC<IProps> = (props: IProps) => {
  const { rows } = props;
  const headers =
    rows.length > 0
      ? Object.keys(rows[0])
          .map(v => v)
          .filter(v => v !== '_docId')
      : [];

  const onAction = (mode: 'edit' | 'delete', row: any) => () => {
    console.log(mode, row._docId);
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
                {headers.map((header, index) => (
                  <TableCell key={index}>{row[header]}</TableCell>
                ))}
                <TableCell className={styles.actionCell}>
                  <Fab id={styles.root} onClick={onAction('edit', row)} size="small" color="primary">
                    <Icon>edit</Icon>
                  </Fab>
                  <Fab id={styles.root} onClick={onAction('delete', row)} size="small" color="secondary">
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
