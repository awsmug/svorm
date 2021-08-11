const production = !process.env.ROLLUP_WATCH;

const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      "./src/**/*.svelte",
    ],
    enabled: true // disable purge in dev
  },
  enabled: false, // disable purge in dev
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        'warm-gray': colors.warmGray,
        teal: colors.teal,
      },
    },
  },
  plugins: [
  ],
}
