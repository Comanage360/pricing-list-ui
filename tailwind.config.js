/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",   // Angular templates & TS files
    // If using SCSS: "./src/**/*.{scss}"
  ],
  theme: {
    extend: {
      // your custom theme stuff
    }
  },
  plugins: [
    // any Tailwind plugins you want
  ]
};
