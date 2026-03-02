/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      },
      colors: {
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        background: {
          DEFAULT: '#F8F7F4',
          dark: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}
