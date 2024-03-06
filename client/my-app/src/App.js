import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "./Components/data";
import "./index";
import LineChart from "./Components/LineChart";
import './App.css';

import React, { useState, useEffect } from "react";
import "./App.css";
Chart.register(CategoryScale);

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const [chartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "avarege dollar Rate",
        data: Data.map((data) => data.avarege),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  })
  return (
    <div className="App">

      <div className="App">
        <LineChart chartData={chartData} />
      </div>
      <h1>{message}</h1>
    </div>
  );
}
export default App;
