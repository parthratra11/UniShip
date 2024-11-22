/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          // Primary colors
          dark: '#232F3E',     // Dark blue (header/primary background)
          light: '#FFFFFF',    // White
          orange: '#FF9900',   // Amazon Orange
          yellow: '#FED914',   // Amazon Yellow
          
          // Secondary colors
          hover: '#394759',    // Hover state for dark background
          button: '#F0C14B',   // Button yellow
          'button-hover': '#F4D078', // Button hover state
          
          // Text colors
          text: {
            primary: '#232F3E',   // Dark blue text
            secondary: '#666666', // Secondary text
            light: '#CCCCCC',    // Light text for dark backgrounds
          },
          
          // Border colors
          border: {
            light: '#DDDDDD',    // Light border
            dark: '#232F3E',     // Dark border
            input: '#A6A6A6',    // Input border
          },
          
          // Background colors
          background: {
            light: '#FAFAFA',    // Light background
            secondary: '#EAEDED', // Secondary background
          }
        }
      },
      spacing: {
        'nav': '56px',  // Standard Amazon header height
      },
      boxShadow: {
        'amazon': '0 2px 5px 0 rgba(213,217,217,.5)',  // Amazon's typical shadow
        'button': '0 2px 5px 0 rgba(213,217,217,.5)',  // Button shadow
        'hover': '0 0 0 3px #c8f3fa',                  // Focus/hover shadow
      },
    },
  },
  plugins: [],
}