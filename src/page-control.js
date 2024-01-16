import { setDisplay } from "./display";
import { requestFromWeatherAPI } from "./weather-api";

const searchBar = document.querySelector("#search");
const submitBtn = document.querySelector("button");
const tempCheckbox = document.querySelector('input[type="checkbox"]');
console.dir(tempCheckbox);

export const weatherData = {
  current: {},
  location: {},

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
};

export const setListeners = () => {
  submitBtn.addEventListener("click", async () => {
    await requestFromWeatherAPI(searchBar.value);
    setDisplay.city(weatherData.getCityAndCountry());
    setDisplay.weatherInfo();
    console.dir(weatherData.getLocationData());
    console.dir(weatherData.getCurrentData());
  });

  tempCheckbox.addEventListener("click", () => {
    if (weatherData.hasData()) {
      console.log("hello");
      setDisplay.weatherInfo();
    }
  });
};
