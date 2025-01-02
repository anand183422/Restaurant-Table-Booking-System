/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f39c12',
        secondary: '#2c3e50',
        accent: '#e74c3c',
      },
    },
  },
  plugins: [],
}
