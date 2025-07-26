import { getCurrentHour, getWeekday, timeConvert } from "./WeatherFunctions";
import cloudImg from "./images/cloud.svg";
import rainImg from "./images/cloud-rain.svg";
import sunImg from "./images/sun-high.svg";
// import moonImg from "./images/moon.svg";
import hazyMoonImg from "./images/haze-moon.svg";
import moonImg from "./images/moon-stars.svg";

const locationDiv = document.querySelector(".locationDiv");

function hourlyForecast(data) {
  const currentHour = getCurrentHour();

  for (let i = 0; i < 13; i++) {
    let j = 0;
    let hourCount = i + currentHour;

    if (i + currentHour < 24) {
      j = 0;
    } else if (i + currentHour >= 24) {
      j = 1;
      hourCount -= 24;
    }

    var hourDiv = document.querySelector(`.hour${i}`);
    const temp =
      Math.round(data.days[j].hours[hourCount].temp * 10) / 10 + "°C";

    const hour = document.createElement("div");
    const time = timeConvert(data.days[j].hours[hourCount].datetime).replace(":00:00", " ");
    hour.innerText = time;
    hourDiv.appendChild(hour);

    const weatherIcon = document.createElement("img");
    weatherIcon.src = getWeatherImg(data.days[j].hours[hourCount].icon);
    hourDiv.appendChild(weatherIcon);

    const hourlyConditionsDiv = document.createElement("div");
    hourlyConditionsDiv.innerHTML =
      temp +
      "<br />Feels like " +
      data.days[i].hours[hourCount].feelslike +
      "°C";
    hourDiv.appendChild(hourlyConditionsDiv);
  }
}

function weeklyForecast(data) {
  for (let i = 0; i < 8; i++) {
    var dayDiv = document.querySelector(`.day${i}`);
    const temp = Math.round(data.days[i].temp * 10) / 10 + "°C";
    const day = getWeekday(data.days[i].datetime, "en-US");

    const weekday = document.createElement("div");
    weekday.innerText = day;
    dayDiv.appendChild(weekday);

    const weatherIcon = document.createElement("img");
    weatherIcon.src = getWeatherImg(data.days[i].icon);
    dayDiv.appendChild(weatherIcon);

    const conditionsDiv = document.createElement("div");
    conditionsDiv.innerHTML =
      temp +
      "<br />Feels like " +
      data.days[i].feelslike +
      "°C<br />Humidity: " +
      data.days[i].humidity +
      "%";
    dayDiv.appendChild(conditionsDiv);
  }
}

function getWeatherImg(conditions) {
  switch (conditions) {
    case "rain":
      return rainImg;
    case "partly-cloudy-day":
      return cloudImg;
    case "partly-cloudy-night":
      return hazyMoonImg;
    case "cloudy":
      return cloudImg;
    case "overcast":
      return cloudImg;
    case "clear-day":
      return sunImg;
    case "clear-night":
        return moonImg;
    default:
      return;
  }
}

function displayLocation(data) {
  locationDiv.innerHTML =
    data.days[0].datetime + "<br />" + data.resolvedAddress;
}

function clearPage() {
    for (let i = 0; i < 13; i++) {
        var hourDiv = document.querySelector(`.hour${i}`);
        hourDiv.innerHTML = "";
    }

    for (let i = 0; i < 8; i++) {
        var dayDiv = document.querySelector(`.day${i}`);
        dayDiv.innerHTML = "";
    }
}

export { hourlyForecast, weeklyForecast, displayLocation, clearPage };
