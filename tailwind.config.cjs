/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx,jsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        caprasimo: ['Caprasimo'],
        'passion-one': ['"Passion One"'],
      },
    },
  },
  plugins: [],
};
