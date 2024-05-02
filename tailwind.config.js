/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {animation: {
      'heartbeat': 'heartbeat 1s infinite',
    },
    keyframes: {
      heartbeat: {
        '0%, 100%': {
          transform: 'scale(1)',
        },
        '50%': {
          transform: 'scale(1.05)',
        },
      },
    },},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "light", "dark",
      {
        light: {

          "primary": "#D60000",

          "secondary": "#000000",

          "accent": "#D0D0D0",

          "neutral": "#565656",

          "base-100": "#ffffff",

          "info": "#959595",

          "success": "#21B66F",

          "warning": "#fbbd23",

          "error": "#f87272",

          "base-200": "#515151",

          "base-300": "#F5F5F5",

          "neutral-content": "#9AA0A6",

          "neutral-focus": "#000000",

          "primary-content": "#ffffff",

          "info-content": "#E6E6E6",

          "success-content": "#fff",

          "secondary-content": "#000000",

          "base-content": "#000000",
          
          "error-content": "#ffffff",

          "warning-content": "#565656",



        },
      },
      {
        dark: {

          "primary": "#FF4646",

          "secondary": "#ffffff",

          "accent": "#ffffff",

          "neutral": "#565656",

          "base-100": "#cccc",

          "info": "#ffffff",

          "success": "#21B66F",

          "warning": "#fbbd23",

          "error": "#f87272",

          "base-200": "#cccccc",

          "base-300": "#181818",

          "neutral-content": "#9AA0A6",

          "neutral-focus": "#ffffff",

          "primary-content": "#353352",

          "info-content": "#E6E6E6",

          "success-content": "#000",
          
          "secondary-content": "#050129",

          "base-content": "#181818",

          "error-content": "#ffffff",

          "warning-content": "#F5F5F5",


        },
      },
    ],
  },
}

