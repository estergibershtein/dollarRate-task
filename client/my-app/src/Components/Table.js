import React, { useState, useEffect } from "react";

const [data, setData] = useState("");

useEffect(() => {
  fetch("http://localhost:8080/data")
    .then((res) => res.json())
    .then((data) => setData(data.data));
}, []);

 const Table = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>avarage</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.avarege}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
