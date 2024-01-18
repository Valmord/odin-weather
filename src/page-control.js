import { updateDisplay, displayNewSearch } from "./display";
import {
  apiRequestCurrentWeather,
  apiRequestForecastWeather,
} from "./weather-api";
import { weatherData } from "./weatherData";

const searchBar = document.querySelector("#search");
const submitBtn = document.querySelector(".search-button");
const tempCheckbox = document.querySelector('input[type="checkbox"]');

export const setListeners = () => {
  submitBtn.addEventListener("click", async () => {
    await apiRequestCurrentWeather(searchBar.value);
    await apiRequestForecastWeather(searchBar.value, 3);
    displayNewSearch();
  });

  searchBar.addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      await apiRequestCurrentWeather(searchBar.value);
      await apiRequestForecastWeather(searchBar.value, 3);
      displayNewSearch();
    }
  });

  tempCheckbox.addEventListener("click", () => {
    if (weatherData.hasData()) {
      displayNewSearch();
    }
  });
};
