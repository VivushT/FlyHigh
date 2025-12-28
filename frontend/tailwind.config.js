/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1F44',
          50: '#E8EEF8',
          100: '#D1DCF1',
          200: '#A3B9E3',
          300: '#7596D5',
          400: '#4773C7',
          500: '#2855A8',
          600: '#1F4186',
          700: '#0A1F44',
          800: '#081835',
          900: '#051126',
        },
        sky: {
          DEFAULT: '#4DA8DA',
          50: '#F0F8FC',
          100: '#E1F1F9',
          200: '#C3E3F3',
          300: '#A5D5ED',
          400: '#87C7E7',
          500: '#4DA8DA',
          600: '#2A90CA',
          700: '#2177A6',
          800: '#195A7A',
          900: '#103D4E',
        },
        gold: {
          DEFAULT: '#F5C16C',
          50: '#FEF9F0',
          100: '#FDF3E1',
          200: '#FBE7C3',
          300: '#F9DBA5',
          400: '#F7CF87',
          500: '#F5C16C',
          600: '#F3AD3D',
          700: '#E89614',
          800: '#B9760F',
          900: '#8A570B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(77, 168, 218, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
