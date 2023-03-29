/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "bright-orange": "#FFA500",
        "dark-orange": "#FF8C00",
        "light-orange": "#FFB347 "
      },
      textColor: {
        "bright-orange": "#FFA500",
        "dark-orange": "#FF8C00",
        "light-orange": "#FFB347 "
      },
      maxWidth: {
        "max": "1200px"
      }
    },
  },
  plugins: [],
}

