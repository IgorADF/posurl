/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ["my-gray"]: {
          100: "#E1E1E6",
          200: "#C4C4CC",
          300: "#8D8D99",
          400: "#7C7C8A",
          500: "#323238",
          600: "#202024",
          700: "#121214",
        }
      }
    },
  },
  plugins: [],
}