import { convertToCelsius } from "./WeatherFunctions";

// const weatherDiv = document.querySelector(`.weatherInfo`);

function todaysForecast(data) {
  // weatherDiv.textContent = data.address;
  for (let i = 0; i < 8; i++ ) {
    var dayDiv = document.querySelector(`.day${i}`);
    const temp = Math.round(convertToCelsius(data.days[i].temp)) + "°C";
    const day = data.days[i].datetime;
    dayDiv.innerHTML = day + "<br />" + temp;
  }
}

export { todaysForecast };
