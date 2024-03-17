import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState ,useEffect } from "react";
const CahrtData = () => {

    const [data, setData] = useState();
    useEffect(() => {
      fetch("http://localhost:8080/data")
        .then((res) => res.json())
        .then((data) => setData(data));
    });
 
    return (

        <BarChart width={1000} height={250} data={data}>   
            <Bar dataKey="average" fill="" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
           <Legend />
        </BarChart>
    );
};
 
export default CahrtData;
