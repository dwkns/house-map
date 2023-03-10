const { Client } = require("@notionhq/client");
const fetch = require("node-fetch");
require("dotenv").config();

const getHouses = async function () {
  const andover = "51.210819198888764, -1.481561776063715";
  const norwich = "52.62183610081735, 1.3086142996577774";

  // create client
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  // get the viewing date from notion or set it to far in the future
  let farFuture = new Date("01/01/2029").toISOString();

  let houses = [];
  // call the Notion API
  try {
    const response = await notion.databases.query({
      database_id: "21b39a3add684fb7b598328d81a72318", // Articles database ID
    });

    console.log(`[ houses in response ]:`, response.results.length); // how many results?

    // loop through the results
    // add each result to the houses array
    response.results.forEach(async (page) => {
      // locations can be a single value or an array of values
      // make them all arrays
      // console.log(
      //   `[ page.properties ]:`,
      //   page.properties["Estate Agents"].relation
      // );

      // let estateAgentRelationId = page.properties["Estate Agents"]?.relation[0];

      // console.log(`[ estateAgentRelationId ]:`, estateAgentRelationId);

      let location = page.properties.Location.rich_text
        .map((val) => val.plain_text)
        .join("")
        .split(",");

      let viewingDateString =
        page.properties["Viewing Date"].date?.start || farFuture;

      if (
        ["Viewing Confirmed", "Asked for Viewing", "In Queue"].includes(
          page.properties?.Status?.select?.name
        )
      ) {
        houses.push({
          title: page.properties.Name.title
            .map((val) => val.plain_text)
            .join(""),
          lat: Number(location[0]),
          lng: Number(location[1]),
          location: location.join(","),
          description: "",
          address: page.properties.Address.rich_text
            .map((val) => val.plain_text)
            .join(""),
          showInFrontEnd: true,
          // shownBy: page.properties["Shown By"].rich_text
          price: page.properties.Price.number,
          viewingDate: viewingDateString,
          andover: andover,
          norwich: norwich,
          colour:
            page.properties?.Status?.select?.name == "Viewing Confirmed"
              ? "grey"
              : "blue",
          imageURL: page.cover?.external?.url || "/images/house.png",
          url:
            page.properties["Rightmove URL"]?.url ||
            page.properties["Estate agent URL"]?.url,
        });
      }
    });
    console.log(`[ houses on map ]:`, houses.length);

    // Sort the houses by viewing date earliest first
    houses.sort(function (a, b) {
      return new Date(a.viewingDate) - new Date(b.viewingDate);
    });

    // add a number to each house
    // but only if it doesn't have a viewing date in the far future
    let houseNumber = 1;
    houses.forEach((house, index) => {
      if (house.viewingDate != farFuture) {
        house.number = houseNumber;
        houseNumber++;
      }
    });

    // so number 1 is at thte top of the list
    houses.reverse();

    const getTimeToLocation = async (origin, destination) => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const resJson = await res.json();
      const timeToLocation = resJson.routes[0].legs[0].duration.text;
      return timeToLocation;
    };

    for await (let house of houses) {
      house.drivingTimeToAndover = await getTimeToLocation(
        house.location,
        andover
      );
      house.drivingTimeToNorwich = await getTimeToLocation(
        house.location,
        norwich
      );
    }

    // console.log(`[ houses ]:`, houses);
  } catch (error) {
    console.log("Error! in the call to the Notion API");
    console.error(error.body);
  }
  return houses;
};

module.exports = getHouses;
