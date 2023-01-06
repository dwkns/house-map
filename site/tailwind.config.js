const tailwindTheme = require('tailwindcss/defaultTheme');
const tailwindTypography =  require('@tailwindcss/typography');
const tailwindForms = require('@tailwindcss/forms')
const debugScreens = require('tailwindcss-debug-screens');

let minWidth = 320
let maxWidth = 1280
let contentWidth = 92.9

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.njk',
    './src/**/*.js',
    './src/**/*.md',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '600px',
      lg: ' 950px'
    },
    fontFamily: {
      'sans': ['Plex', ...tailwindTheme.fontFamily.sans],
    },
    extend: {

      width: {
        '93%': `clamp(${minWidth}px, ${contentWidth}vw, ${maxWidth}px)`,
        '100%': `${maxWidth}px`,
        '125%': `${maxWidth * 1.25}px`,
      },
      spacing: {
      },
      boxShadow: {
        'brand': '0 0 15px rgba(0, 0, 0, 0.15)',
      },
      maxWidth: {
        '100%': `${maxWidth}px`,
        '125%': `${maxWidth * 1.25}px`,
        '93%': `clamp(${minWidth}px, ${contentWidth}vw, ${maxWidth}px)`,
      },
      colors: {
        'brand': '#0B86EB',
        'brand-alt': '#15609F',
      },
      spacing: {
        'u2-pad': 'clamp(1rem, 4vw, 8rem)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [debugScreens,tailwindForms, tailwindTypography],
}
