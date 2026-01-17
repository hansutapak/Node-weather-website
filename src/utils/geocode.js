import request from "request";

//geocoding API(mapbox) using request
export const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoiZ2FtY2hpYzgiLCJhIjoiY21rNDM5NWJ0MDMyeTNxczlhYzBxaHpneSJ9.CQ1O9X619eq1m-vHWruuVw&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      console.log("error", error);
      callback("Unable to connect to the geocoding service!!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!, try searching again!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        full_address: body.features[0].properties.full_address,
        region: body.features[0].properties.context?.region?.name || "N/A",
        country_code:
          body.features[0].properties.context?.country.country_code || "N/A",
      });
    }
  });
};

// pk.eyJ1IjoiZ2FtY2hpYzgiLCJhIjoiY21rNDM5NWJ0MDMyeTNxczlhYzBxaHpneSJ9
//   .CQ1O9X619eq1m - vHWruuVw;

//https://api.mapbox.com/search/geocode/v6/forward?q=Newyork&access_token=pk.eyJ1IjoiZ2FtY2hpYzgiLCJhIjoiY21rNDM5NWJ0MDMyeTNxczlhYzBxaHpneSJ9.CQ1O9X619eq1m-vHWruuVw&limit=1
