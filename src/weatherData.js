import { format } from "date-fns";

const tempCheckbox = document.querySelector('input[type="checkbox"]');

export const weatherData = {
  current: {},
  location: {},
  forecasts: [],

  deleteData() {
    this.current = {};
    this.location = {};
  },

  updateForecasts(forecastArray) {
    this.forecasts = forecastArray;
  },

  hasData() {
    return this.location?.name !== undefined;
  },

  getForecasts() {
    return this.forecasts;
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

  getCurrentTime() {
    const currentTime = new Date(this.location.localtime);
    return format(currentTime, "h:mm aaaa");
  },

  getCurrentHour() {
    const currentTime = new Date(this.location.localtime);
    return currentTime.getHours();
  },
};
