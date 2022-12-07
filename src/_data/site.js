require('dotenv').config();

let site = {
  name: "comapny name",
  locale: "en_GB",
  legalName: "comapny name ltd",
  url: "https://someurl.com",
  logo: "https://someurl.com/images/logo.png",
  foundingDate: "2019",
  privacyEmail: "default_privacy@esomeurl.com",
  address: {
    type: "default_PostalAddress",
    streetAddress: "default_streetAddress",
    addressRegion: "default_addressRegion",
    postalCode: "default_postalCode",
    addressCountry: "default_addressCountry"
  },
  theme: {
   colour: '#93C5FD'
  },
  twitterURL: "https://twitter.com/yourTwitter",
  linkedInURL: "https://www.linkedin.com/company/yourCompany/",
  author: {
    twitterHandle: "@default_twitter_handle",
    name: "dazza"
  },
  metadata: {
    default_og_image: '/images/default_og_image.png',
    default_og_type: 'article'
  },
  development: {
    domain: 'localhost',
    baseURL: 'https://localhost:8080',
    debug: true,
    minifyCSS: false,
  },
  staging: {
    domain: 'staging-tiny-start.netlify.app',
    baseURL: 'https://staging-tiny-start.netlify.app',
    debug: true,
    minifyCSS: true,
  },
  production: {
    domain: 'tiny-start.netlify.app',
    baseURL: 'https://tiny-start.netlify.app',
    debug: false,
    minifyCSS: true,
  },
  currentYear: new Date().getFullYear(),
  currentDate: new Date(),
  version: Math.random().toString(36).substr(2, 8),
  currentEnv: process.env.CURRENT_ENV
}
module.exports = site
