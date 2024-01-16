import { weatherData } from "./page-control";

const cityHeader = document.querySelector(".country-city");
const weather = document.querySelector(".weather");

export const setDisplay = (() => {
  const city = (newCity) => {
    cityHeader.textContent = newCity;
  };

  const weatherInfo = () => {
    const currentTemp = document.createElement("h4");
    currentTemp.textContent = weatherData.getCurrentTemp();

    const weatherIcon = document.createElement("img");
    weatherIcon.src = weatherData.getWeatherIcon();

    const weatherCondition = document.createElement("span");
    weatherCondition.textContent = weatherData.getWeatherCondition();

    weather.textContent = "";
    weather.appendChild(currentTemp);
    weather.appendChild(weatherIcon);
    weather.appendChild(weatherCondition);
  };
  return { city, weatherInfo };
})();
