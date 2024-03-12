import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DollarTable = () => {
    const [dollarData, setDollarData] = useState([]);

    let maxData = 0
    let minData = 100

    for (let index = 0; index < dollarData.length - 1; index++) {
        if (dollarData[index].average > maxData) {
            maxData = dollarData[index].average
        }
    }
    for (let index = 0; index < dollarData.length - 1; index++) {
        if (dollarData[index].average < minData) {
            minData = dollarData[index].average
        }
    }
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

                        <td style={{ 'backgroundColor': dollar.average == maxData ? 'green' : dollar.average == minData ? 'red' : 'white' }}>{dollar.average}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
};



export default DollarTable;
