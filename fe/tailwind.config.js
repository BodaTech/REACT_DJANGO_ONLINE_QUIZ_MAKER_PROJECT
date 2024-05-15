/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        linear_bounce: {
          '0%': {transform: 'translateX(-20px)'},
          '25%': {transform: 'translateX(20px)'},
          '50%': {transform: 'translateX(-10px)'},
          '75%': {transform: 'translateX(10px)'},
          '100%': {transform: 'translateX(0)'},
        }
      },
      animation:{
        linear_bounce: 'linear_bounce .3s ease-in-out'
      }
    },
  },
  plugins: [],
}