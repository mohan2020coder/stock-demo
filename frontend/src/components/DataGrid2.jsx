// src/components/DataGrid.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import styles from './DataGrid.module.scss';

const DataGrid = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData()
                .then((data) => setData(data.data))
                .catch((err) => setError(err.message));
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

        return <div>Error: {error}</div>;
    }

    const renderBar = (value) => {
        const barWidth = Math.abs(value) * 10;
        const barClass = value > 0 ? styles.barPositive : value < 0 ? styles.barNegative : styles.barNeutral;
        return (
            <div className={styles.barContainer}>
                <div className={`${styles.bar} ${barClass}`} style={{ width: `${barWidth}%` }}></div>
            </div>
        );
    };

    return (
        <div className={styles.datagrid}>
            <h2>Market Monitor</h2>
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Name</th>
                        <th>Change (-)</th>
                        <th>Change</th>
                        <th>Change (+)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.client}</td>
                            <td>{row.name}</td>
                            <td className={`${row['chg-'] < 0 ? styles.chgNegative : row['chg-'] > 0 ? styles.chgPositive : styles.chgNeutral}`}>
                                {row['chg-']}
                                {renderBar(row['chg-'])}
                            </td>
                            <td className={`${row.chg < 0 ? styles.chgNegative : row.chg > 0 ? styles.chgPositive : styles.chgNeutral}`}>
                                {row.chg}
                                {renderBar(row.chg)}
                            </td>
                            <td className={`${row['chg+'] < 0 ? styles.chgNegative : row['chg+'] > 0 ? styles.chgPositive : styles.chgNeutral}`}>
                                {row['chg+']}
                                {renderBar(row['chg+'])}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataGrid;
