// @type {import('tailwindcss').Config}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-light': '#f7f7f7',
        'background-dark': '#242323',
        'text-light': '#000000',
        'text-dark': '#ffffff',
      },
    },
  },
  plugins: [],
}

