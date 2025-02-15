/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'next.config.{js,ts}',
    'src/components/**/*.js',
    'styles-safelist.txt',
    'src/assets/**/*.svg',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {},
  },

  plugins: [],

  corePlugins: {
    container: false,
  },
};
