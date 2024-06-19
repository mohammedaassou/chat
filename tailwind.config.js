/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx , css , html}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom color here
        main: '#023F3A', // Example color code
      },
    },
  },
  plugins: [],
}