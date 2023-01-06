require("dotenv").config();
const sanityClient = require("@sanity/client");

const projectId = process.env.SANITY_PROJECT;
const apiToken = process.env.SANITY_TOKEN;
const dataset = process.env.SANITY_DATASET;

const client = sanityClient({
  projectId,
  dataset: dataset,
  token: apiToken,
  apiVersion: "2022-08-01",
  useCdn: false,
});

module.exports = client;
