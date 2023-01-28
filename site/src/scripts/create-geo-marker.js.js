import { getCurrentLocation } from "./get-current-location.js";

const createGeoMarker = (
  map,
  startLatLong = { lat: 52.07829, lng: 0.51447 },
  updateFrequency = 2000
) => {
  // create a marker for the current location
  const geoMarker = new google.maps.Marker({
    map,
    position: startLatLong,
    visible: false, // start invisible
    icon: "/images/dot.png",
  });

  // set the market position
  const setGeoMarkerPosition = async () => {
    // console.log(`[ getCurrentLocation ]:`, );
    let currentPosition = await getCurrentLocation();
    if (currentPosition) {
      geoMarker.setPosition(currentPosition);
      geoMarker.setVisible(true); // make marker visible
    }
  };
  // update the location marker every 2 seconds
  window.setInterval(setGeoMarkerPosition, updateFrequency);
};

export { createGeoMarker };
