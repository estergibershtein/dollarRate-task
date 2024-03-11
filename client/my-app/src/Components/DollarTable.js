import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DollarTable = () => {
    const [dollarData, setDollarData] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:8080/data')
            .then(response => {
                setDollarData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Average</th>
                </tr>
            </thead>
            <tbody>
                {dollarData.map((dollar, index) => (
                    <tr key={index}>
                        <td>{dollar.month}</td>
                        <td>{dollar.average}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DollarTable;