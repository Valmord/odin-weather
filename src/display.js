import { weatherData } from "./weatherData";
import { format } from "date-fns";

const body = document.querySelector("body");
const cityHeader = document.querySelector(".country-city");
const weather = document.querySelector(".weather");
const tempCheckbox = document.querySelector('input[type="checkbox"]');
const forecastContainer = document.querySelector(".forecasts-container");

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
    const currentTime = document.createElement("h4");
    const currentTemp = document.createElement("h4");
    const weatherIcon = document.createElement("img");
    const weatherCondition = document.createElement("span");

    currentTime.textContent = weatherData.getCurrentTime();
    currentTemp.textContent = weatherData.getCurrentTemp();
    weatherIcon.src = weatherData.getWeatherIcon();
    weatherCondition.textContent = weatherData.getWeatherCondition();

    weather.textContent = "";
    weather.appendChild(currentTime);
    weather.appendChild(currentTemp);
    weather.appendChild(weatherIcon);
    weather.appendChild(weatherCondition);
  };
  return { city, weatherInfo, updateTopSection };
})();

const createMinMaxAvgElements = (forecast) => {
  const unit = tempCheckbox.checked === true ? "F" : "C";
  const avgTemp = document.createElement("p");
  const minTemp = document.createElement("span");
  const maxTemp = document.createElement("span");

  [avgTemp.textContent, minTemp.textContent, maxTemp.textContent] = [
    forecast[`avgTemp${unit}`] + `°${unit}`,
    forecast[`minTemp${unit}`] + `°${unit}`,
    forecast[`maxTemp${unit}`] + `°${unit}`,
  ];

  return [avgTemp, minTemp, maxTemp];
};

const createTempSubscript = () => {
  const maxText = document.createElement("sub");
  const avgText = document.createElement("sub");
  const minText = document.createElement("sub");
  [minText.textContent, maxText.textContent, avgText.textContent] = [
    " min",
    " max",
    " avg",
  ];
  return [avgText, minText, maxText];
};

const createForecastContainer = (forecast) => {
  const container = document.createElement("div");
  const date = document.createElement("p");
  container.classList.add("forecast");
  date.textContent = format(forecast.date, "LLL do");

  const [avg, min, max] = createMinMaxAvgElements(forecast);
  const [avgSubText, minSubText, maxSubText] = createTempSubscript();

  container.appendChild(date);
  container.appendChild(avg).appendChild(avgSubText);
  container.appendChild(min).appendChild(minSubText);
  container.appendChild(max).appendChild(maxSubText);
  return container;
};

const displayForecasts = () => {
  forecastContainer.textContent = "";
  const forecasts = weatherData.getForecasts();
  forecasts.forEach((forecast) => {
    const container = createForecastContainer(forecast);
    forecastContainer.appendChild(container);
  });
};

export const displayNewSearch = () => {
  if (weatherData.hasData()) {
    updateDisplay.city(weatherData.getCityAndCountry());
    updateDisplay.weatherInfo();
    updateDisplay.updateTopSection();
    displayForecasts();
  }
};
