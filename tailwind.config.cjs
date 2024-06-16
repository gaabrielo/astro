/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx,jsx,css}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        secondary: '#616263',
      },
      fontFamily: {
        caprasimo: ['Caprasimo'],
        'passion-one': ['"Passion One"'],
      },
    },
  },
  plugins: [],
};
