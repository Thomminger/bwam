/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#FF0000',
        'brand-red-dark': '#CC0000',
        'gray-light': '#F5F5F5'
      },
    },
  },
  plugins: [],
} 