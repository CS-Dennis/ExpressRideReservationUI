/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navyBlue: '#273238',
        primaryGreen: '#19ae47',
      },
    },
  },
  plugins: [],
};
