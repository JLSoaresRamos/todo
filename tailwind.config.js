/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'default-desktop': "url('/images/bg-desktop-light.jpg')",
        'default-mobile': "url('/images/bg-mobile-light.jpg')",
        'dark-desktop': "url('/images/bg-desktop-dark.jpg')",
        'dark-mobile': "url('/images/bg-mobile-dark.jpg')",
      },
      colors: {
        primary: {
          'bright-blue': 'hsl(220, 98%, 61%)',
          'very-light-blue': 'hsl(192, 100%, 67%)',
          'dark-purple': 'hsl(280, 87%, 65%)',
        },
        default: {
          'very-light-gray': 'hsl(0, 0%, 98%)',
          'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
          'light-grayish-blue': 'hsl(233, 11%, 84%)',
          'dark-grayish-blue': 'hsl(236, 9%, 61%)',
          'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',
        },
        dark: {
          'very-dark-blue': 'hsl(235, 21%, 11%)',
          'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
          'light-grayish-blue': 'hsl(234, 39%, 85%)',
          'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
          'dark-grayish-blue': 'hsl(234, 11%, 52%)',
          'very-dark-grayish-blue-1': 'hsl(233, 14%, 35%)',
          'very-dark-grayish-blue-2': 'hsl(237, 14%, 26%)',
        },
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
      },
      fontSize: {
        'default': '1.125rem',
      }
    },
  },
  plugins: [], 
}