import { weatherData } from "./weatherData";

const apiKey = "1c7a72e69ff54592af805808241401";

export const apiRequestCurrentWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
    const apiData = await response.json();
    weatherData.current = apiData.current;
    weatherData.location = apiData.location;
    return apiData;
  } catch {
    console.error("An Error Occurred", response);
    weatherData.deleteData();
  }
};

export const apiRequestForecastWeather = async (location, days = 1) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`
    );
    const apiData = await response.json();
    saveForecastTemps(apiData);
    return apiData;
  } catch {
    console.error("An Error Occurred", response);
    weatherData.deleteData();
  }
};

const saveForecastTemps = (data) => {
  const tempArray = [];
  data.forecast.forecastday.forEach((day) => {
    const dayObj = {};
    dayObj.date = day.date;
    dayObj.minTempC = day.day.mintemp_c;
    dayObj.minTempF = day.day.mintemp_f;
    dayObj.maxTempC = day.day.maxtemp_c;
    dayObj.maxTempF = day.day.maxtemp_f;
    dayObj.avgTempC = day.day.avgtemp_c;
    dayObj.avgTempF = day.day.avgtemp_f;
    tempArray.push(dayObj);
  });
  weatherData.updateForecasts(tempArray);
};
