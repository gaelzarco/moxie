// /** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakartaSans)', ...fontFamily.sans],
      },
      width: {
        '750': '750px',
      },
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"]
},
  plugins: [],
};

module.exports = config;
