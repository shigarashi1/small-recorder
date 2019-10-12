import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import styles from './SettingTable.module.scss';

interface IProps {
  rows: any[];
}

const SettingTable: React.FC<IProps> = (props: IProps) => {
  const { rows } = props;
  const headers = Object.keys(rows[0]).map(v => v);

  return (
    <div id={styles.container}>
      <Paper className={styles.paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
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
                {renderActionCell(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );

  function renderActionCell(row: any) {
    const handleActionClick = () => {
      console.log(row._id);
    };

    return (
      <TableCell className={styles.actionCell}>
        <Fab id={styles.root} onClick={handleActionClick} size="small" color="primary">
          <Icon>edit</Icon>
        </Fab>
        <Fab id={styles.root} onClick={handleActionClick} size="small" color="secondary">
          <Icon>delete</Icon>
        </Fab>
      </TableCell>
    );
  }
};

export default SettingTable;
