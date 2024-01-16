import { updateDisplay, displayNewSearch } from "./display";
import { requestFromWeatherAPI } from "./weather-api";
import { format } from "date-fns";

const searchBar = document.querySelector("#search");
const submitBtn = document.querySelector(".search-button");
const tempCheckbox = document.querySelector('input[type="checkbox"]');

// searchIcon.addEventListener("click", () => alert("test"));
// console.dir(searchIcon);

export const weatherData = {
  current: {},
  location: {},

  deleteData() {
    this.current = {};
    this.location = {};
  },

  hasData() {
    return this.location?.name !== undefined;
  },

  getCityAndCountry() {
    return `${this.location.name}, ${this.location.country}`;
  },

  getCurrentData() {
    return this.current;
  },

  getLocationData() {
    return this.location;
  },

  getWeatherCondition() {
    return this.current.condition.text;
  },

  getWeatherIcon() {
    return this.current.condition.icon;
  },

  getCurrentTemp() {
    return tempCheckbox.checked
      ? `${this.current.temp_f}°F`
      : `${this.current.temp_c}°C`;
  },

  getCurrentHour() {
    const currentTime = new Date(this.location.localtime);
    console.log(currentTime.getHours());
    return currentTime.getHours();
  },
};

export const setListeners = () => {
  submitBtn.addEventListener("click", async () => {
    await requestFromWeatherAPI(searchBar.value);
    displayNewSearch();
    console.dir(weatherData.getLocationData());
    console.dir(weatherData.getCurrentData());
    weatherData.getCurrentHour();
  });

  searchBar.addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      await requestFromWeatherAPI(searchBar.value);
      displayNewSearch();
    }
  });

  tempCheckbox.addEventListener("click", () => {
    if (weatherData.hasData()) {
      console.log("hello");
      updateDisplay.weatherInfo();
    }
  });
};
