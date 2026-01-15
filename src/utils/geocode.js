import request from "request";

//geocoding API(mapbox) using request
export const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoiZ2FtY2hpYzgiLCJhIjoiY21rNDM5NWJ0MDMyeTNxczlhYzBxaHpneSJ9.CQ1O9X619eq1m-vHWruuVw&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the geocoding service!!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!, try searching again!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        full_address: body.features[0].properties.full_address,
      });
    }
  });
};
