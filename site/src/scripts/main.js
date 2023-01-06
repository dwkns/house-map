// Initialize and add the map
function initMap() {
  // Start Location
  const startLatLong = { lat: 51.837129340445784, lng: -0.41132528533835977 };
  const startZoom = 9;

  // var markerLocations = [
  //   // {
  //   //   lat: 51.988267380766715,
  //   //   lng: 0.30761366202888496,
  //   //   title: "Howlett End, Wimbish, Saffron Walden, CB10",
  //   //   description: "Some notes on this",
  //   //   price: "£1,000,000",
  //   //   url: "https://www.rightmove.co.uk/properties/127358543#/",
  //   //   imageURL:
  //   //     "https://media.rightmove.co.uk/55k/54334/127358543/54334_IFC220050_IMG_16_0000.jpeg",
  //   // },

  //   // {
  //   //   lat: 52.01961619732615,
  //   //   lng: 0.3372007328155391,
  //   //   title: "Water Lane, Radwinter, Saffron Walden, CB10",
  //   //   description: "",
  //   //   price: "£1,150,000",
  //   //   url: "https://www.rightmove.co.uk/properties/129287261#/",
  //   //   imageURL:
  //   //     "https://media.rightmove.co.uk/29k/28922/129287261/28922_SWA200326_IMG_00_0000.jpeg",
  //   // },
  //   // {
  //   //   lat: 51.919906589476945,
  //   //   lng: 0.10500958627474244,
  //   //   title:
  //   //     "Hixham Cottage & Barnfield Cottage, Furneux Pelham, Hertfordshire, SG9",
  //   //   description: "Two cottages in one",
  //   //   price: "£1,450,000",
  //   //   url: "https://www.rightmove.co.uk/properties/85574340#/",
  //   //   imageURL:
  //   //     "https://media.rightmove.co.uk/29k/28901/85574340/28901_BSO210247_IMG_00_0000.jpeg",
  //   // },
  //   {
  //     lat: 52.21266337905095,
  //     lng: -0.4478263157203588,
  //     title: "Robins Folly, Thurleigh, Bedford",
  //     description: "2.5acres",
  //     price: "£795,000",
  //     url: "https://www.rightmove.co.uk/properties/126873152#/",
  //     imageURL:
  //       "https://media.rightmove.co.uk/5k/4188/126873152/4188_31780984_IMG_00_0000.jpeg",
  //   },
  //   {
  //     lat: 52.19677578708384,
  //     lng: -0.0739195315818364,
  //     title: "Caxton End, Bourn, Cambridgeshire",
  //     description: "",
  //     price: "£950,000",
  //     url: "https://www.rightmove.co.uk/properties/126909788#/",
  //     imageURL:
  //       "https://media.rightmove.co.uk/35k/34529/126909788/34529_CAM220412_IMG_21_0000.jpeg",
  //   },
  //   // {
  //   //   lat: 52.01518992840244,
  //   //   lng: 0.3753487264879851,
  //   //   title:
  //   //     "THATCH COTTAGE, Hill Road, Hempstead, Nr Saffron Walden, Essex, CB10",
  //   //   description: "",
  //   //   price: "£775,000",
  //   //   url: "https://www.rightmove.co.uk/properties/127318898#/",
  //   //   imageURL:
  //   //     "https://media.rightmove.co.uk/29k/28922/127318898/28922_SWA180230_IMG_00_0000.jpeg",
  //   // },

  //   {
  //     lat: 52.246948476066876,
  //     lng: -0.1860016060863634,
  //     title: "High Street, Toseland, St Neots, Cambridgeshire, PE19",
  //     description: "",
  //     price: "£760,000",
  //     url: "https://www.rightmove.co.uk/properties/119349539#/",
  //     imageURL:
  //       "https://media.rightmove.co.uk/51k/50428/119349539/50428_FCY210018_IMG_19_0001.jpeg",
  //   },

  //   {
  //     lat: 52.23721890618891,
  //     lng: -0.41658028211800424,
  //     title: "Wychtree Farm, Keysoe, MK44",
  //     description: "",
  //     price: "£950,000",
  //     url: "https://www.rightmove.co.uk/properties/124471898#/media?id=media0&ref=photoCollage&channel=RES_BUY",
  //     imageURL:
  //       "https://media.rightmove.co.uk/173k/172790/124471898/172790_RS2338_IMG_00_0000.jpeg",
  //   },

  //   // {
  //   //   lat: 51.93203173850478,
  //   //   lng: 0.10193618323999232,
  //   //   title: "The Wash, Furneux Pelham, Buntingford, Hertfordshire, SG9",
  //   //   description: "",
  //   //   price: "£1,060,000",
  //   //   url: "https://www.rightmove.co.uk/properties/124050278#/",
  //   //   imageURL:
  //   //     "https://media.rightmove.co.uk/49k/48551/124050278/48551_BIS170079_IMG_00_0000.jpeg",
  //   // },

  //   {
  //     lat: 52.04598746309256,
  //     lng: -0.9182846965196778,
  //     title: "Wicken Wood Cottage, Leckhampstead Road, Wicken",
  //     description: "",
  //     price: "£1,050,000",
  //     url: "https://www.rightmove.co.uk/properties/128712860#/",
  //     imageURL:
  //       "https://media.rightmove.co.uk/118k/117145/128712860/117145_1395_HWEB_IMG_00_0000.jpeg",
  //   },
  // //   {
  // //     lat: 51.962840590929304,
  // //     lng: 0.23752354400586206,
  // //     title: "The Green, Widdington",
  // //     description: "",
  // //     price: "£1,025,000",
  // //     url: "https://www.rightmove.co.uk/properties/127934582#/",
  // //     imageURL:
  // //       "https://media.rightmove.co.uk/10k/9528/127934582/9528_100539081571_IMG_00_0001.jpeg",
  // //   },
  // // ];

  // Create new map at start
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: startZoom,
    center: startLatLong,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    options: {
      gestureHandling: "greedy",
    },
  });

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
