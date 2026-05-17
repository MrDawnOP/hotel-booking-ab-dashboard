/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5A70C3',
          DEFAULT: '#3B5BDB',
          dark: '#2C4684'
        }
      }
    },
  },
  plugins: [],
};