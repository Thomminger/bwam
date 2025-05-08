/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': 'var(--brand-red)',
        'brand-red-dark': 'var(--brand-red-dark)',
        'gray-light': 'var(--gray-light)',
      },
    },
  },
  plugins: [],
} 