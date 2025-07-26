import { getWeather } from "./WeatherFunctions";
import {
  hourlyForecast,
  weeklyForecast,
  displayLocation,
  clearPage,
} from "./DisplayController";
import "./style.css";

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", async () => {
  const location = document.querySelector("#location").value;
  const processedData = await getWeather(location);
  clearPage();
  hourlyForecast(processedData);
  weeklyForecast(processedData);
  displayLocation(processedData);
});
