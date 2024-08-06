// src/components/DataGrid.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchData } from '../api';
import styles from './DataGrid.module.scss';

const columns = [
  { field: 'client', headerName: 'Client', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'chg-',
    headerName: 'Change (-)',
    width: 150,
    renderCell: (params) => renderBar(params.value, 'chg-negative'),
  },
  {
    field: 'chg',
    headerName: 'Change',
    width: 150,
    renderCell: (params) => renderBar(params.value, 'chg-neutral'),
  },
  {
    field: 'chg+',
    headerName: 'Change (+)',
    width: 150,
    renderCell: (params) => renderBar(params.value, 'chg-positive'),
  },
];

const renderBar = (value, styleClass) => {
  const barWidth = Math.abs(value) * 10;
  const barClass = styles[styleClass];
  return (
    <div className={styles.cellContainer}>
      <div className={`${styles.bar} ${barClass}`} style={{ width: `${barWidth}%` }}></div>
      <span className={styles.cellValue}>{value}</span>
    </div>
  );
};

const DataGridComponent = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
        fetchData()
        .then((data) => {
          // Add unique id to each row if not present
          const rowsWithId = data.data.map((row, index) => ({ ...row, id: index }));
          setRows(rowsWithId);
        })
        .catch((err) => setError(err.message));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.datagrid}>
      <h2>Market Monitor</h2>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
      </div>
    </div>
  );
};

export default DataGridComponent;
