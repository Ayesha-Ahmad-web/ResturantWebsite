/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        char: { DEFAULT: '#0C0B0A', 900: '#0C0B0A', 800: '#141210', 700: '#1C1916', 600: '#26221E', 500: '#3A342E' },
        cream: { DEFAULT: '#F6EBD9', dim: '#C9BBA4', mute: '#8F8472' },
        ember: { DEFAULT: '#FF4D1F', dark: '#D93A10', glow: '#FF7A4D' },
        gold: { DEFAULT: '#E8A83A', light: '#F6CF7A' },
        leaf: { DEFAULT: '#6FB33C', dark: '#4C8A25' },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};