import React from 'react';

const PredictionTable = ({ dollarpredict }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>PREDICTAVERAGE</th>
                </tr>
            </thead>
            <tbody>
                {dollarpredict.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.PredictedAverage}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PredictionTable;