const GoogleMaps = require('@google/maps');
const googleMapsClient = GoogleMaps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

module.exports = {
  client: googleMapsClient,
  getDirections: getDirections
};

function getDirections(origin, destination) {
  return new Promise((resolve, reject) => {
    googleMapsClient.directions({
      origin: origin,
      destination: destination
    }, (err, response) => {
      if (!err) {
        resolve(response);
      } else {
        reject(err);
      }
    });
  });
}
