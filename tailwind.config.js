/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070C1F',
          surface: '#101730',
          accent: '#00E5FF',
          heading: '#FFFFFF',
          secondary: '#8A94B8',
          border: 'rgba(0, 229, 255, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 229, 255, 0.15)',
        'glow': '0 0 15px rgba(0, 229, 255, 0.35)',
        'glow-lg': '0 0 25px rgba(0, 229, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
