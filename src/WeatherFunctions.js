async function getWeather(location) {
  const weatherFile = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=G4JWU9YA3CRVXWHA2GFSM6LT8&contentType=json`,
    { method: "get" },
    { mode: "cors" },
  ).catch((err) => {
    console.log(err);
  });

  const parsedWeatherData = await parseWeatherData(weatherFile);

  const processedWeatherData = processWeatherData(parsedWeatherData);

  logWeatherData(processedWeatherData);

  return processedWeatherData;
};

function parseWeatherData(data) {
    return data.json();
};

function processWeatherData(parsedData) {
    const weatherData = {};
    weatherData.address = parsedData.address;
    weatherData.currentConditions = parsedData.currentConditions;
    weatherData.days = parsedData.days;
    return weatherData;
};

function logWeatherData(data) {
    console.log(`Location: ${data.address}`);
    console.log(`Date: ${data.days[0].datetime}`);
    const feelsTemp = convertToCelsius(data.days[0].feelslike);
    console.log(`Feels Like: ${feelsTemp}`);
};

function convertToCelsius(temp) {
    return ((temp - 32) * (5/9));
};

export { getWeather };