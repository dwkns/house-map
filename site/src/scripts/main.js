// Initialize and add the map
async function initMap() {
  // Start Location for the map
  const startLatLong = { lat: 52.07829, lng: 0.51447 };
  const startZoom = 10;

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

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let searchMarkers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    searchMarkers.forEach((marker) => {
      marker.setMap(null);
    });
    searchMarkers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      searchMarkers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // create a marker for the current location
  const geoMarker = new google.maps.Marker({
    map,
    position: startLatLong,
    visible: false, // start invisible
    icon: "/images/dot.png",
  });

  // Function to update the current location marker
  const setGeoMarkerPosition = () => {
    const success = (position) => {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      geoMarker.setPosition(currentPosition);
      geoMarker.setVisible(true); // make marker visible
    };

    const error = (err) => {
      console.log(`Error (${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(
      success, // success callback
      error // error callback
    );
  };

  // update the
  window.setInterval(setGeoMarkerPosition, 1000);

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: startLatLong,
  });

  let keyIsDown = false;

  map.addListener("click", (mapsMouseEvent) => {
    if (keyIsDown) {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });

      let location = mapsMouseEvent.latLng.toJSON();
      let locationString = `${location.lat.toFixed(5)},${location.lng.toFixed(
        5
      )}`;

      infoWindow.setContent(
        `<div>
        <p>Location: ${locationString}</p>
        <p>Coppied to Clipboard</p>
        </div>
         `
      );
      infoWindow.open(map);

      // location = JSON.stringify(location, null, 2);
      navigator.clipboard.writeText(locationString);
    } else {
    }
  });

  // map.addListener("keyDown", function (event) { });

  window.addEventListener("keydown", (e) => {
    // console.log(`[ e.shiftKey down]:`);
    if (e.key === "Shift") {
      keyIsDown = true;
    }
    if (e.keyCode == 27) {
      infoWindow.close();
      e.preventDefault();
      e.stopPropagation();
    }
  });

  window.addEventListener("keyup", (e) => {
    // console.log(`[ e.shiftKey up ]:`);
    if (e.key === "Shift") {
      keyIsDown = false;
    }
  });

  const allHouseMarkers = [];

  console.log(`[ markerLocations ]:`, markerLocations);

  markerLocations.forEach((location, index) => {
    var myLatlng = new google.maps.LatLng(location.lat, location.lng);

    const createMarkerHTML = (location, whichVersion = "marker") => {
      let houseMarkerContainer = document.createElement("div");

      let googleUrlPrefix = "https://google.com/maps";
      target = "_blank";
      if (iOS) {
        googleUrlPrefix = "comgooglemaps://";
        target = "_self";
      }

      if (whichVersion === "infoWindow") {
        houseMarkerContainer.className = "";
        houseMarkerContainer.innerHTML = `
        <div class="w-full max-w-md">
        <div class="flex flex-row justify-between items-center">
          <div>
           <a href="${location.url}" target="_blank">
            <p class="font-semibold text-lg">${location.title}</p>
            <p class="text-base">${location.address}</p>
            <p class="text-base">£${location.price.toLocaleString()}</p>
            </a>
          </div>
          <a href="${googleUrlPrefix}?saddr=My+Location&daddr=${
          location.location
        }" target="${target}" class="flex items-center justify-self-end bg-blue-800 font-semibold text-white rounded px-2 h-8"><p class="">Directions</p></a>
        </div>
        <a href="${location.url}" target="_blank"><img src="${
          location.imageURL
        }"  class="object-fill w-full" /></a>
        </div>`;
      } else {
        houseMarkerContainer.className =
          "p-0.5 speech-bubble bg-blue-800 opacity-80 text-white font-semibold rounded-full";
        houseMarkerContainer.innerHTML = `
        <div class="w-20 flex flex-col items-center justify-center">
        <img src="${location.imageURL}" class="object-fill w-full" />
        <p class="text-lg">${location.number}</p>
        </div>`;
      }

      return houseMarkerContainer;
    };

    const marker = new google.maps.marker.AdvancedMarkerView({
      map: location.showInFrontEnd ? map : null, // only show markers that are set to show in front end
      position: myLatlng,
      content: createMarkerHTML(location),
    });

    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow.close();
      infoWindow.setPosition(myLatlng);
      infoWindow.setContent(createMarkerHTML(location, "infoWindow"));
      infoWindow.setZIndex(999);
      infoWindow.open(marker.map, marker);
    });

    allHouseMarkers.push(marker);
  });
}

window.initMap = initMap;
