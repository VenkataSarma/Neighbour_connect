/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          400: '#1F9C71',
          500: '#167D5A',
          600: '#125E44',
        },
        surface: {
          light: '#FAFAF7',
          dark: '#111512',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1A1E1B',
        },
        border: {
          light: '#E5E7E5',
          dark: '#2A2F2B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
