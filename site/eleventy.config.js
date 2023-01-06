const { logToConsole } = require("dwkns-eleventy-plugins");
// const { logToConsole, inlineSVG, htmlMinifer, readableDate, prependAnOrA } = require('../dwkns-eleventy-plugins') // local version
const util = require("util");

const sanityClient = require("./src/_data/_sanityClient.js");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(logToConsole, {
    logToHtml: false,
    logToConsole: false,
    colorizeConsole: true,
  });

  eleventyConfig.addAsyncShortcode("markersAsJsObject", async () => {
    const query = `*[_type == "houses"]{
        "title": name,
        "price": price,
        "url": rightMoveUrl,
        "imageURL": imageAsUrl,
        "lat": location.lat,
        "lng": location.lng,
        "description": description,
        "visited": hasBeenVisited,
        "showInFrontEnd": show,
        "estateAgentName": estateAgent->{name,office,url,contactName,contactNumber,description},
      }`;

    const params = {};
    let res = await sanityClient.fetch(query, params);

    let str = util.inspect(
      res,
      (showHidden = false),
      (depth = 4),
      (colorize = false)
    );
    return unescape(`<script>const markerLocations =${str}</script>`);
  });

  // eleventyConfig.addAsyncShortcode("doSomething", async (a) => {
  //   console.log(`[ doiung ]:`, doiung);
  //   return "something";
  // });

  // eleventyConfig.addAsyncShortcode("single", async function (myName) {
  //   return "something";
  // });

  // watch our script folder for changes.
  eleventyConfig.addWatchTarget("./src/scripts/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");

  eleventyConfig.addPassthroughCopy({
    "src/fonts": "./fonts",
    "src/images": "./images",
    "src/styles/compiled.css": "./styles/compiled.css",
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setServerOptions({
    domdiff: false, // reload instead of domdiff
    port: 8080,
    showAllHosts: false,
    showVersion: false,
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_partials/",
      layouts: "_partials/_layouts",
      data: "_data",
    },
  };
};
