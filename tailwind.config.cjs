/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    width: ["responsive", "hover", "focus"]
},
  plugins: [],
};

module.exports = config;
