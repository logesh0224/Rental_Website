/** @type {import('tailwindcss').Config} */
//import { defineConfig } from 'tailwindcss';

export default{

    content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: {
      screens:{
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra-large screens
      },},},

    variants:{
      extend:{}
    },
  
  plugins: [],
}
