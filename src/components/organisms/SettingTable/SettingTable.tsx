import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './SettingTable.module.scss';

import IconButton from '../../atoms/IconButton/IconButton';

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
        <IconButton onClick={handleActionClick} icon="edit" color="primary" size="small" />
        <IconButton onClick={handleActionClick} icon="delete" color="secondary" size="small" />
      </TableCell>
    );
  }
};

export default SettingTable;
