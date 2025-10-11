/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          yellow: '#FBBF24',
          black: '#1F2937',
          'light-blue': '#EFF6FF',
        },
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
       boxShadow: {
        'main': '0px 4px 16px rgba(0, 0, 0, 0.1)',
        'inner-strong': 'inset 0px 2px 4px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
