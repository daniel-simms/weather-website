const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "https://api.darksky.net/forecast/702655c7ebfeedadd46ef70c1d43da32/" +
    lat +
    "," +
    lon +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature}C, with a ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

// // Weather
// const weatherURL =
//   "https://api.darksky.net/forecast/702655c7ebfeedadd46ef70c1d43da32/51.621330,-0.152680?units=si";

// request({ url: weatherURL, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.code) {
//     console.log(response.body.error);
//   } else {
//     console.log(
//       `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}C out. There is a ${response.body.currently.precipProbability}% chance of rain.`
//     );
//   }
// });
