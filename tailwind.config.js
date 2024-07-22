/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    daisyui: {
      themes: ["light", "dark"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
