import { weatherData } from "./page-control";

const body = document.querySelector("body");
const cityHeader = document.querySelector(".country-city");
const weather = document.querySelector(".weather");

export const updateDisplay = (() => {
  const city = (newCity) => {
    cityHeader.textContent = newCity;
  };

  const timePictures = {
    morning: "/images/pexels-no-name-66997.jpg",
    afternoon: "./images/pexels-lukas-296234.jpg",
    evening: "./images/pexels-pixabay-163255.jpg",
    night: "./images/pexels-pixabay-433155.jpg",
  };

  const getDayPeriod = () => {
    const hour = weatherData.getCurrentHour();
    switch (true) {
      case hour < 6 || hour >= 20:
        return timePictures.night;
      case hour < 10:
        return timePictures.morning;
      case hour < 18:
        return timePictures.afternoon;
      case hour < 20:
        return timePictures.evening;
      default:
        throw new Error("Fatal Error");
    }
  };

  const updateTopSection = () => {
    body.style.backgroundImage = `url(${getDayPeriod()})`;
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
  return { city, weatherInfo, updateTopSection };
})();

export const displayNewSearch = () => {
  if (weatherData.hasData()) {
    updateDisplay.city(weatherData.getCityAndCountry());
    updateDisplay.weatherInfo();
    updateDisplay.updateTopSection();
  }
};
