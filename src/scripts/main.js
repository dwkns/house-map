// import { getCurrentLocation } from "./get-current-location.js";
import { createGeoMarker } from "./create-geo-marker.js";
import {
  createPanToCurrentLocationButton,
  createSearchMapField,
} from "./map-ui-controls.js";
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

  createPanToCurrentLocationButton(map); // Add pan to location button
  createSearchMapField(map); // Add search box
  createGeoMarker(map); // creae a marker for the current location

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

  // console.log(`[ markerLocations ]:`, markerLocations);

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

      let date = new Date(location.viewingDate).toLocaleDateString("en-gb", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      let time = new Date(location.viewingDate).toLocaleTimeString("en-gb", {
        hour: "2-digit",
        minute: "2-digit",
      });

      let number = location.number ? location.number : "";
      let colour =
        location.colour != "blue" ? "opacity-80 bg-blue-800" : "bg-gray-300";
      let btColour =
        location.colour != "blue" ? "speech-bubble-blue" : "speech-bubble-gray";

      let viewingDetails = `<p class="text-base"><span class="font-semibold">Viewing:</span> <span class="">${time}</span> on ${date}</p>`;

      if (location.viewingDate == farFuture) {
        viewingDetails = "";
      }

      if (whichVersion === "infoWindow") {
        houseMarkerContainer.className = "";
        houseMarkerContainer.innerHTML = `
        <div class="w-full max-w-lg">
        <div class="flex flex-row justify-between ">
          <div>
           <a href="${location.url}" target="_blank">
            <p class="font-semibold text-lg">${location.title}</p>
            <p class="text-base">${location.address}</p>
            <p class="text-base">£${location.price.toLocaleString()}</p>
            ${viewingDetails}
            <p class="text-base">
            <a href="${googleUrlPrefix}?saddr=${location.location}&daddr=${
          location.andover
        }&travelmode=driving" target="_blank" ><span class="font-semibold">Andover:</span> ${
          location.drivingTimeToAndover
        }</a>,
               <a href="${googleUrlPrefix}?saddr=${location.location}&daddr=${
          location.norwich
        }&travelmode=driving" target="_blank" ><span class="font-semibold">Norwich:</span> ${
          location.drivingTimeToNorwich
        }</a>,
            </p>
            </a>
          </div>
          <a href="${googleUrlPrefix}?saddr=Current+Location&daddr=${
          location.location
        }&travelmode=driving" target="${target}" class="flex items-center justify-self-end ${colour} font-semibold text-white rounded px-2 h-8"><p class="">Directions</p></a>
        </div>
        <a href="${location.url}" target="_blank"><img src="${
          location.imageURL
        }"  class="object-fill w-full" /></a>
        </div>`;
      } else {
        houseMarkerContainer.className = `p-0.5 speech-bubble ${colour} ${btColour} text-white font-semibold rounded-full `;
        houseMarkerContainer.innerHTML = `
        <div class="w-20 flex flex-col items-center justify-center">
        <img src="${location.imageURL}" class="object-fill w-full" />
        <p class="text-lg min-h-[1.5rem]">${number}</p>
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
