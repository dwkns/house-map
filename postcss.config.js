// postcss.config.js
const tailwindcss = require('tailwindcss') 
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const site  = require('./src/_data/site.js') // import our site data

let minifyCSS = false

// Look for the CURRENT_ENV enviroment variable and warn if it's not there.
if (!site.currentEnv) {
  brightRed = "\x1b[31m"
  reset = "\x1b[0m"
  console.log(`${brightRed}
The ${reset}CURRENT_ENV ${brightRed}enviroment variable is not set. Things may not work as expected. 
Check your enviroment variables or ${reset}.env ${brightRed}file. See ${reset}.env-template ${brightRed}for details${reset}
`);
} else {
  minifyCSS = site[site.currentEnv].minifyCSS
}

// load some plugins
const postCSSplugins = [
  tailwindcss,
  autoprefixer,
    ...( minifyCSS ? [cssnano()] : []) // minify based on site config
]

module.exports = {
  plugins: postCSSplugins,
}