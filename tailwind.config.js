/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EDF5FF',
          100: '#E1EFFF',
          200: '#CEE4FE',
          300: '#B7D5F8',
          400: '#96C1F2',
          500: '#0070F0',
          600: '#0057D0',
          700: '#004BB0',
          800: '#003B90',
          900: '#002970',
        },
        success: {
          50: '#E8FFF3',
          100: '#D1FFE7',
          200: '#A7FDD1',
          300: '#73F8B7',
          400: '#40F09E',
          500: '#00E085',
          600: '#00C06F',
          700: '#00A05C',
          800: '#00804A',
          900: '#006039'
        },
        warning: {
          50: '#FFF8E5',
          100: '#FFEFCC',
          200: '#FFE099',
          300: '#FFD066',
          400: '#FFC033',
          500: '#FFB000',
          600: '#CC8C00',
          700: '#996900',
          800: '#664600',
          900: '#332300'
        },
        danger: {
          50: '#FFE8E8',
          100: '#FFD1D1',
          200: '#FFA3A3',
          300: '#FF7575',
          400: '#FF4747',
          500: '#FF1919',
          600: '#CC1414',
          700: '#990F0F',
          800: '#660A0A',
          900: '#330505'
        }
      }
    },
  },
  plugins: [],
}