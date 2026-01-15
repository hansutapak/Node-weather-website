import request from "request";

export const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9395699dad0588f3fe4a18f46bd16a8a&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the weather service!!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.location.country +
          ", " +
          body.location.name +
          " is " +
          body.current.weather_descriptions[0] +
          ", It is currently " +
          body.current.temperature +
          " Fahrenheit" +
          ". It feels like " +
          body.current.feelslike +
          " Fahrenheit out."
      );
    }
  });
};
