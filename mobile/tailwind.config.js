/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C42', // Soft Orange
        secondary: '#FCAF58', // Ligher Orange
        accent: '#99C24D', // Fresh Green
        background: '#FFFFFF', // White
        surface: '#FFFFFF',
        text: '#2D3748', // Dark Gray
      },
    },
  },
  plugins: [],
}
