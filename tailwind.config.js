/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#262B41",
        customPink: "#F936A9",
        customGreen: "#31BCB5",
        customPurple: "#7947C1",
        customLightGray: "#F7F7FF",
        customLightPink: "#F7D9F2",
      },
    },
  },
  plugins: [],
};
