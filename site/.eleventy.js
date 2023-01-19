const { logToConsole } = require("dwkns-eleventy-plugins");
const util = require("util");

const sanityClient = require("./src/_data/_sanityClient.js");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(logToConsole, {
    logToHtml: false,
    logToConsole: false,
    colorizeConsole: true,
  });

  eleventyConfig.addAsyncShortcode(
    "markersToScriptTag",
    async (arrayOfMarkerLocations) => {
      const str = util.inspect(
        arrayOfMarkerLocations,
        (showHidden = false),
        (depth = 4),
        (colorize = false)
      );

      return `<script>${"\n"} const markerLocations=${str} ${"\n"}</script>`;
    }
  );

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
