const initMap = async () => {
  // Start Location for the map
  const startLatLong = { lat: 51.837129340445784, lng: -0.41132528533835977 };
  const startZoom = 9;

  // Create new map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: startZoom,
    center: startLatLong,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    options: {
      gestureHandling: "greedy",
    },
    mapId: "9419e1cf4b872245",
  });
};

export { initMap };
