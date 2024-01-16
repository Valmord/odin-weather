import { weatherData } from "./page-control";

const apiKey = "1c7a72e69ff54592af805808241401";

export const requestFromWeatherAPI = async (location) => {
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

// export const updateWeatherData = async (searchValue) => {
//   try {
//     await requestFromWeatherAPI(searchValue);
//   } catch {
//     //nothing happened
//   }
// };

// export const getCityData = async (location) => {
//   try {
//     weatherData = await requestFromWeatherAPI(location);

//     return data;
//   } catch (err) {
//     // Error was already handled.
//   }
// };

// export const getData = (location) => {
//   const data = getCityData(location).then()
// }

// const requestFromWeatherAPI = async (location) => {
//   return new Promise( async (resolve, reject) => {
//     {
//       const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
//       if (response.status === 200) {
//         const weatherData = await response.json();
//         resolve(weatherData);
//       } else {
//         reject(response);
//       }
//     }
//   })

// }

// export const getCityData = async (location) => {
//   const data = await requestFromWeatherAPI(location)
//   .catch(err => console.log('Error Occured', err));
//   const locationData = data.location;
//   const currentData = data.current;
//   console.log(locationData);
//   console.log(currentData);
// }
