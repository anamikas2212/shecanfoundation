/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        shecan_orange: "#FF551D",
        shecan_blue: "#040815",
      },
    },
  },
  plugins: [],
};
