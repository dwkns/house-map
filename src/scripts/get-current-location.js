function getPosition() {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res, rej);
    } else {
      console.log(`Your browser doesn't support geolocation.`);
    }
  }).catch((error) => {
    // console.log(`[ Error getting location]:`, error.message);
  });
}

const getCurrentLocation = async () => {
  let position = await getPosition(); // wait for getPosition to complete
  if (position) {
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }
};

export { getCurrentLocation };
