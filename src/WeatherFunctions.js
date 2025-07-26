async function getWeather(location) {
  const weatherFile = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=G4JWU9YA3CRVXWHA2GFSM6LT8&contentType=json`,
    { method: "get" },
    { mode: "cors" },
  ).catch((err) => {
    console.log(err);
  });

  const parsedWeatherData = await parseWeatherData(weatherFile);

  const processedWeatherData = processWeatherData(parsedWeatherData);

  return processedWeatherData;
}

function parseWeatherData(data) {
  return data.json();
}

function processWeatherData(parsedData) {
  const weatherData = {};
  weatherData.address = parsedData.address;
  weatherData.currentConditions = parsedData.currentConditions;
  weatherData.days = parsedData.days;
  weatherData.resolvedAddress = parsedData.resolvedAddress;
  return weatherData;
}

function getWeekday(dateStr, locale) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function getCurrentHour() {
    const currentDate = new Date();
    return currentDate.getHours();
}


function timeConvert (time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    time = time.slice (1)
    time[5] = +time[0] < 12 ? 'AM' : 'PM';
    time[0] = +time[0] % 12 || 12;
  }
  return time.join (''); // return adjusted time or original string
}

export { getWeather, getWeekday, getCurrentHour, timeConvert };
