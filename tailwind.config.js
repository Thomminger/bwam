/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'brand-red': 'var(--brand-red)',
        'brand-red-dark': 'var(--brand-red-dark)',
      },
    },
  },
  plugins: [],
} 