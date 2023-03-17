/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xsm: [{
          min: '280px',
          max: '575px',
        }],
        sm: [
          {
            min: '576px',
            max: '767px',
          },
        ],
        md: [
          {
            min: '768px',
            max: '991px',
          },
        ],
        lg: [
          {
            min: '992px',
            max: '1199px',
          },
        ],
      },
    },
  },
  plugins: [],
};
