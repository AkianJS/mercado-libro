/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '152': '40rem',
        '10vh': '10vh',
        '90vh': '90vh',
        '100vh': '100vh'
      }
    },
  },
  plugins: [],
}