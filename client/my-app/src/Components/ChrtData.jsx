import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from "react";
import './../App.css'

const URL = process.env.REACT_APP_URL;

const CahrtData = () => {
    const url = `${URL}/data`
    const [data, setData] = useState();
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
    });

    return (
        <div className="CharData">
            <h2 >Israeli Shekel per 1 US Dollar Monthly average</h2>

            <BarChart width={1000} height={250} data={data}>
                <Bar dataKey="average" fill="" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
            </BarChart></div>
    );
};

export default CahrtData;
