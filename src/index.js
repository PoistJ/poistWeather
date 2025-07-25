// const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Toronto?unitGroup=us&key=G4JWU9YA3CRVXWHA2GFSM6LT8&contentType=json"

async function getWeather() {
  const weatherFile = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Toronto?unitGroup=us&key=G4JWU9YA3CRVXWHA2GFSM6LT8&contentType=json",
    { method: "get" },
    { mode: "cors" },
  ).catch((err) => {
    console.log(err);
  });

  const weatherData = await weatherFile.json();

  console.log(weatherData);

  logWeatherData(weatherData);
};

function logWeatherData(data) {
    console.log(`Location: ${data.resolvedAddress}`);
    console.log(`Date: ${data.days[0].datetime}`);
    const feelsTemp = convertToCelsius(data.days[0].feelslike);
    console.log(`Feels Like: ${feelsTemp}`);
    console.log(data.description);
};

function convertToCelsius(temp) {
    return ((temp - 32) * (5/9));
};

getWeather();