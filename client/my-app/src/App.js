import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./index";
import EstimatAverage from './Components/EsimentAverage'
import SortData from './Components/SortData'
import DatePickerComponent from './Components/DatePickerComponent'
import ChartData from "./Components/ChrtData";
import PredictionMatrix from "./Components/PredictionMatrix"
import "./App.css";
Chart.register(CategoryScale);

function App() {

  return (
    <div className="App">
      <SortData />
      <PredictionMatrix />
      <EstimatAverage />
      <DatePickerComponent />
      <ChartData />
    </div>
  );
}

export default App;
