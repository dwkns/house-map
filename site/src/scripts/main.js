// Initialize and add the map

async function initMap() {
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
      location["title"] = "Name";
      location["description"] = "";
      location["price"] = "Price";
      location["url"] = "URL";
      location["imageURL"] = "image";

      infoWindow.setContent(
        `<div>
        <p className="">Location: ${location.lat.toFixed(
          5
        )}, ${location.lng.toFixed(5)}</p>
        <p className="">Coppied to Clipboard</p>
        </div>
         `
      );
      infoWindow.open(map);

      location = JSON.stringify(location, null, 2);
      navigator.clipboard.writeText(location);
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

  markerLocations.forEach((location) => {
    var myLatlng = new google.maps.LatLng(location.lat, location.lng);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: location.title,
    });

    //Attach click event to the marker.
    (function (marker, location) {
      google.maps.event.addListener(marker, "click", function (e) {
        //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
        infoWindow.setContent(
          `<a href="${location.url}" target="_blank">
            <div class="w-[450px]">
              <p class="text-xl font-semibold hover:underline">${location.title}</p>
              <p class="text-lg">${location.price}</p>
              <p class="py-2">${location.description}</p>
              <img src="${location.imageURL}" class="object-fill w-full" />
            </div>
          </a>`
        );
        infoWindow.open(map, marker);
      });
    })(marker, location);
  });
}

window.initMap = initMap;
