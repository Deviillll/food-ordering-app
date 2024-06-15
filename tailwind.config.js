/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out ',
        'wiggleHeader': 'wiggleHeader 1s ease-in ',
        'pulse-slow': 'pulse 5s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        
      },
      keyframes: {
        wiggle: {
          '0%': { opacity: 0 },
          // '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
        wiggleHeader: {
          '0%': { opacity: 0.8 },
          '0%': { opacity: 0.8 },
          '0%': { opacity: 0.9 },
          '50%': { opacity: 0.9 },
          '100%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
};
