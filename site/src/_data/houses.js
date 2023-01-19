const { Client } = require("@notionhq/client");

const getHouses = async function () {
  // create client
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  let houses = [];
  // call the Notion API
  try {
    const response = await notion.databases.query({
      database_id: "21b39a3add684fb7b598328d81a72318", // Articles database ID
    });

    console.log(`[ response ]:`, response.results.length); // how many results?

    // loop through the results
    // add each result to the houses array
    response.results.forEach((page) => {
      // console.log(`[ page properties ]:`, page.properties.Location.rich_text);

      // locations can be a single value or an array of values
      // make them all arrays
      let location = page.properties.Location.rich_text
        .map((val) => val.plain_text)
        .join("")
        .split(",");

      houses.push({
        title: page.properties.Name.title.map((val) => val.plain_text).join(""),
        lat: Number(location[0]),
        lng: Number(location[1]),
        location: location.join(","),
        description: "",
        showInFrontEnd: true,
        price: page.properties.Price.number,

        imageURL:
          page.cover?.external?.url ||
          "https://assets.savills.com/properties/GBCHRSCHS220131/CHS220131_10_l_gal.jpg",
        url:
          page.properties["Estate agent URL"]?.url ||
          page.properties["Rightmove URL"]?.url,
      });
    });
    console.log(`[ how many houses ]:`, houses.length);
  } catch (error) {
    console.log("error!");
    console.error(error.body);
  }
  return houses;
};

module.exports = getHouses;
