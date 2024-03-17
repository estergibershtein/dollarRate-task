import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./index";
import EstimatAverage from './Components/EsimentAverage'
import SortData from './Components/SortData'
import MyDatePickerComponent from './Components/MyDatePickerComponent'
import ChartData from "./Components/ChrtData";
import "./App.css";
Chart.register(CategoryScale);

function App() {

  return (
    <div className="App">
      Average graph by months 
      <ChartData />
      <SortData />
      <EstimatAverage />
      <MyDatePickerComponent />
    </div>

  );
}
export default App;
