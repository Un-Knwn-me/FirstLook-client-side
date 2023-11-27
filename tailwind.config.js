// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      metal: "#D9D9D9",
    },
    extend: {},
  },
  plugins: [],
});

