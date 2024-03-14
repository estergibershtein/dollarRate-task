import React, { useState, useEffect } from 'react';
import axios from 'axios';


const SortData = () => {

  const [data, setDollarData] = useState([]);

  let maxData = 0
  let minData = 100


  data.forEach(element => {
    maxData = Math.max(element.average, maxData)
  });
  data.forEach(element => {
    minData = Math.min(element.average, minData)

  });

  const sortByDate = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortByAvaerage = [...data].sort((a, b) => b.average - a.average);

  const handleMonthClick = (option) => {

    option === 'date' ? setDollarData(sortByDate) : setDollarData(sortByAvaerage)

  }

  useEffect(() => {

    axios.get('http://localhost:8080/data')
      .then(response => {
        setDollarData(response.data)

      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {<h2>sort data By</h2>}
      <button onClick={() => handleMonthClick('date')}>Date</button>
      <button onClick={() => handleMonthClick('average')}>Average</button>

      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dollar, index) => (
            <tr key={index}>
              <td>{dollar.date}</td>
              <td style={{ 'backgroundColor': dollar.average === maxData ? 'green' : dollar.average === minData ? 'red' : 'white' }}>{dollar.average}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SortData;