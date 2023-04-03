/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./vue/index.html",
    "./vue/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
