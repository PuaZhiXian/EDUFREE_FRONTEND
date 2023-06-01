/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'danger': '#F0951C',
        'warning': '#F55D53',
        'theme': '#2453EE',
        'primary': '#2453EE',
        'success': '#27C468'
      },
    },
  },
  plugins: [],
}
