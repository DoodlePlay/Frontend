// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '5px': '5px',
      },
      borderRadius: {
        '5px': '5px',
      },
      colors: {
        primary: {
          50: '#fffee7',
          100: '#fffcc1',
          200: '#fff686',
          300: '#ffe999',
          400: '#ffd70d',
          default: '#ffc700',
          600: '#d19100',
          700: '#a66702',
          800: '#89500a',
          900: '#74410f',
        },
        secondary: {
          50: '#f1fcf1',
          100: '#e0f9df',
          200: '#BBE6BB',
          300: '#92e491',
          400: '#5acf59',
          500: '#34b433',
          default: '#228b22',
          700: '#207521',
          800: '#1e5d1f',
          900: '#1a4d1b',
          950: '#092a0b',
        },
        neutral: {
          50: '#f6f6f6',
          100: '#eeeeee',
          200: '#d1d1d1',
          300: '#b0b0b0',
          default: '#999999',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        black: '#222222',
        disabled: '#dddddd',
        fuschia: '#EF5DA8',
      },
    },
  },
  plugins: [],
};
