import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "./Components/data";
import "./index";
import LineChart from "./Components/LineChart";
import MonthScroll from './Components/MonthScroll'
 import EstimatAverage from './Components/EsimentAverage'
import SortData from './Components/SortData'
import "./App.css";
Chart.register(CategoryScale);

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  });

  const [chartData] = useState({


    labels: Data.map((data) => data.date),
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
 <SortData/>
      <LineChart chartData={chartData} />
      <EstimatAverage />
      <MonthScroll />
    </div>

  );
}
export default App;
