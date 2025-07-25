import { getWeather } from "./WeatherFunctions";
import { todaysForecast } from "./DisplayController";

const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', async () => {
    const location = document.querySelector('#location').value;
    const processedData = await getWeather(location);
    todaysForecast(processedData);
});